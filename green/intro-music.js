(() => {
  const intro = document.querySelector('[data-kristi-intro]');
  const enterButton = document.querySelector('[data-kristi-enter]');
  const audio = document.querySelector('[data-kristi-music]');
  const toggle = document.querySelector('[data-kristi-music-toggle]');

  if (!intro || !enterButton || !audio || !toggle) return;

  const TARGET_VOLUME = 0.07;
  const FADE_MS = 1500;
  let fadeTimer = null;

  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;

  const updateToggle = () => {
    const playing = !audio.paused && !audio.muted;
    toggle.setAttribute('aria-pressed', playing ? 'true' : 'false');
    toggle.setAttribute('aria-label', playing ? 'Mute background music' : 'Play background music');
    toggle.textContent = playing ? '♫' : '♩';
  };

  const fadeTo = (target, duration = FADE_MS) => {
    if (fadeTimer) cancelAnimationFrame(fadeTimer);
    const from = audio.volume;
    const started = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - started) / duration);
      audio.volume = from + (target - from) * p;
      if (p < 1) fadeTimer = requestAnimationFrame(tick);
    };
    fadeTimer = requestAnimationFrame(tick);
  };

  const startExperience = async () => {
    enterButton.disabled = true;
    try {
      audio.currentTime = 0;
      audio.muted = false;
      await audio.play();
      fadeTo(TARGET_VOLUME);
      toggle.hidden = false;
      updateToggle();
    } catch (err) {
      console.warn('KRISTI background music could not start:', err);
      toggle.hidden = false;
      updateToggle();
    }

    intro.classList.add('is-leaving');
    document.documentElement.classList.add('kristi-entered');
    window.setTimeout(() => intro.remove(), 1000);
  };

  enterButton.addEventListener('click', startExperience, { once: true });

  toggle.addEventListener('click', async () => {
    if (audio.paused || audio.muted) {
      audio.muted = false;
      try {
        await audio.play();
        fadeTo(TARGET_VOLUME, 700);
      } catch (err) {
        console.warn('KRISTI background music could not resume:', err);
      }
    } else {
      fadeTo(0, 450);
      window.setTimeout(() => audio.pause(), 470);
    }
    window.setTimeout(updateToggle, 500);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) audio.pause();
  });
})();
