(() => {
  'use strict';

  const DNA_BRACELET_SRC = 'DNA-Helix-BRACELET.PNG?v=20260818-dna-bracelet';

  function syncCardImage() {
    const cardImage = document.querySelector('[data-piece-id="dna-bracelet"] .product-image');
    if (cardImage && cardImage.getAttribute('src') !== DNA_BRACELET_SRC) {
      cardImage.src = DNA_BRACELET_SRC;
      cardImage.alt = 'DNA Helix Bracelet';
    }
  }

  function syncModalImage() {
    const modal = document.getElementById('conceptModal');
    const title = document.getElementById('conceptTitle');
    const image = document.getElementById('conceptImage');
    if (modal?.classList.contains('is-open') && title?.textContent.trim() === 'DNA Helix Bracelet' && image) {
      if (image.getAttribute('src') !== DNA_BRACELET_SRC) image.src = DNA_BRACELET_SRC;
      image.alt = 'DNA Helix Bracelet';
    }
  }

  function sync() {
    syncCardImage();
    syncModalImage();
  }

  document.addEventListener('DOMContentLoaded', () => {
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  });
})();