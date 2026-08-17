document.write('<script src="/script-base.js?v=20260817-five"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  const nativeRemove = Element.prototype.remove;
  Element.prototype.remove = function(){
    const parent = this.parentElement;
    if(parent && parent.id === 'productGrid'){
      const siblings = Array.from(parent.children);
      if(siblings.indexOf(this) === 4) return;
    }
    return nativeRemove.call(this);
  };

  const pieces = [
    {product:1, src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green7'},
    {product:0, src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green7'},
    {product:4, src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green7'},
    {product:2, src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green7'},
    {product:3, src:'19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet1'}
  ];

  function applyFivePieceLayout(){
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    if(cards.length < 5) return;
    const byProduct = new Map(cards.map(card => [Number(card.dataset.product), card]));
    const ordered = pieces.map(piece => byProduct.get(piece.product)).filter(Boolean);
    if(ordered.length !== 5) return;

    ordered.forEach(card => grid.appendChild(card));

    setTimeout(() => {
      pieces.forEach(piece => {
        const card = Array.from(grid.querySelectorAll('.product-card')).find(c => Number(c.dataset.product) === piece.product);
        const img = card && card.querySelector('.product-image');
        if(img) img.src = piece.src;
      });
    }, 0);
  }

  function scheduleLayout(){
    setTimeout(applyFivePieceLayout, 80);
    setTimeout(applyFivePieceLayout, 240);
  }

  document.addEventListener('DOMContentLoaded', scheduleLayout, {once:true});
  if(document.readyState !== 'loading') scheduleLayout();

  document.addEventListener('change', e => {
    if(e.target && e.target.id === 'languageSelect') scheduleLayout();
  });

  document.addEventListener('click', e => {
    const button = e.target.closest && e.target.closest('.concept-button');
    if(!button) return;
    const card = button.closest('.product-card');
    const product = Number(card && card.dataset.product);
    const piece = pieces.find(item => item.product === product);
    if(!piece) return;
    setTimeout(() => {
      const modalImg = document.getElementById('conceptImage');
      if(modalImg) modalImg.src = piece.src;
    }, 0);
  });
})();
