const ALLOWED_ORIGIN = "https://kristidesign.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return json({ ok: true, service: "kristi-stripe-worker" }, 200);
      }

      if (request.method === "POST" && url.pathname === "/webhook") {
        return await handleStripeWebhook(request, env);
      }

      if (request.method === "POST" && url.pathname === "/verify") {
        return await handleVerify(request, env);
      }

      return json({ error: "Not found" }, 404);
    } catch (error) {
      return json({ error: "Internal error" }, 500);
    }
  },
};

async function handleStripeWebhook(request, env) {
  requireSecret(env.STRIPE_WEBHOOK_SECRET, "STRIPE_WEBHOOK_SECRET");
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) return json({ error: "Missing Stripe signature" }, 400);

  const valid = await verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) return json({ error: "Invalid Stripe signature" }, 400);

  const event = JSON.parse(payload);

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object;
    // Intentionally stateless for v1. Stripe remains the source of truth.
    console.log("Verified checkout.session.completed", {
      id: session?.id,
      payment_status: session?.payment_status,
      customer_email: session?.customer_details?.email || null,
    });
  }

  return json({ received: true }, 200);
}

async function handleVerify(request, env) {
  requireSecret(env.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY");

  const body = await request.json().catch(() => null);
  const sessionId = body?.session_id;
  if (!sessionId || typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
    return json({ verified: false, error: "Invalid session_id" }, 400);
  }

  const stripeResponse = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      },
    },
  );

  const session = await stripeResponse.json();
  if (!stripeResponse.ok) {
    return json({ verified: false, error: "Stripe verification failed" }, 502);
  }

  const verified = session.status === "complete" && session.payment_status === "paid";

  return json(
    {
      verified,
      session_id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email || null,
    },
    200,
  );
}

async function verifyStripeSignature(payload, header, secret) {
  const parts = Object.fromEntries(
    header.split(",").map((entry) => {
      const [key, value] = entry.split("=");
      return [key.trim(), value?.trim()];
    }),
  );

  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const expected = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");

  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

function requireSecret(value, name) {
  if (!value) throw new Error(`${name} is not configured`);
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(),
    },
  });
}
