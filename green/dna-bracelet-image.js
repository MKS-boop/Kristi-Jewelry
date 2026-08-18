(() => {
  'use strict';

  const VISUALS = {
    'dna-bracelet': {src:'DNA-Helix-BRACELET.PNG?v=20260818-future', name:'DNA Helix Bracelet'},
    'dna-ring': {src:'DNA-Helix-Ring.PNG?v=20260818-future', name:'DNA Helix Ring'},
    'humanoid': {src:'Humanoid-Circuit-Pendant.PNG?v=20260818-future', name:'Humanoid Circuit Pendant'},
    'dna-pendant': {src:'DNA-Helix-Pendant.PNG?v=20260818-future', name:'DNA Helix Pendant'},
    'chip-brooch': {src:'Chip-Signature-Brooch.PNG?v=20260818-future', name:'Chip Signature Brooch'}
  };

  const $ = (s, r=document) => r.querySelector(s);

  function setCardVisual(card, id) {
    const visual = VISUALS[id];
    if (!card || !visual) return;
    card.dataset.pieceId = id;
    card.dataset.search = visual.name.toLowerCase();
    const img = $('.product-image', card);
    const title = $('.product-name', card);
    const view = $('.concept-button', card);
    if (img && img.getAttribute('src') !== visual.src) { img.src = visual.src; img.alt = visual.name; }
    if (title && title.textContent !== visual.name) title.textContent = visual.name;
    if (view) view.dataset.pieceId = id;
  }

  function ensureRingCard() {
    const grid = $('#conceptProductGrid');
    if (!grid || $('[data-piece-id="dna-ring"]', grid)) return;
    const source = $('[data-piece-id="dna-bracelet"]', grid);
    if (!source) return;
    const ring = source.cloneNode(true);
    ring.dataset.pieceId = 'dna-ring';
    setCardVisual(ring, 'dna-ring');
    source.insertAdjacentElement('afterend', ring);
  }

  function ensurePendantFlip() {
    const grid = $('#conceptProductGrid');
    if (!grid) return;
    const humanoid = $('[data-piece-id="humanoid"]', grid);
    const dna = $('[data-piece-id="dna-pendant"]', grid);
    if (!humanoid) return;

    if (dna) dna.remove();
    if (!humanoid.dataset.pendantMode) humanoid.dataset.pendantMode = 'humanoid';
    setCardVisual(humanoid, humanoid.dataset.pendantMode);

    const body = $('.product-card-body', humanoid);
    if (body && !$('.pendant-switch', body)) {
      const sw = document.createElement('button');
      sw.type = 'button';
      sw.className = 'text-button pendant-switch';
      sw.textContent = '↻ Switch Pendant';
      sw.setAttribute('aria-label', 'Switch between Humanoid and DNA pendant');
      sw.style.marginTop = '8px';
      sw.style.cursor = 'pointer';
      sw.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        humanoid.classList.add('is-flipping');
        setTimeout(() => {
          humanoid.dataset.pendantMode = humanoid.dataset.pendantMode === 'humanoid' ? 'dna-pendant' : 'humanoid';
          setCardVisual(humanoid, humanoid.dataset.pendantMode);
          humanoid.classList.remove('is-flipping');
        }, 170);
      });
      body.appendChild(sw);
    }
  }

  function syncExistingCards() {
    Object.entries(VISUALS).forEach(([id]) => {
      if (id === 'dna-ring' || id === 'dna-pendant') return;
      const card = document.querySelector(`[data-piece-id="${id}"]`);
      if (card) setCardVisual(card, id);
    });
  }

  function openRingModal() {
    const modal = $('#conceptModal');
    const image = $('#conceptImage');
    const title = $('#conceptTitle');
    const desc = $('#conceptDescription');
    if (!modal || !image || !title) return;
    image.src = VISUALS['dna-ring'].src;
    image.alt = VISUALS['dna-ring'].name;
    image.classList.remove('bracelet-modal-image');
    title.textContent = VISUALS['dna-ring'].name;
    if (desc && !desc.textContent.trim()) desc.textContent = 'Concept design · Not for sale';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function syncModal() {
    const modal = $('#conceptModal');
    const title = $('#conceptTitle');
    const image = $('#conceptImage');
    if (!modal?.classList.contains('is-open') || !title || !image) return;
    const match = Object.values(VISUALS).find(v => v.name === title.textContent.trim());
    if (match && image.getAttribute('src') !== match.src) {
      image.src = match.src;
      image.alt = match.name;
    }
  }

  function sync() {
    syncExistingCards();
    ensureRingCard();
    ensurePendantFlip();
    syncModal();
  }

  document.addEventListener('click', (e) => {
    const ringButton = e.target.closest('[data-piece-id="dna-ring"].concept-button');
    if (ringButton) {
      e.preventDefault();
      e.stopImmediatePropagation();
      openRingModal();
    }
  }, true);

  const style = document.createElement('style');
  style.textContent = '.product-card.is-flipping .product-image{transform:rotateY(90deg);opacity:.35}.product-card .product-image{transition:transform .34s ease,opacity .34s ease}.pendant-switch{font-size:.82rem;opacity:.82}';
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', () => {
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
  });
})();