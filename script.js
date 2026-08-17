document.write('<script src="/script-base.js?v=20260817-nine"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  // Keep the fifth Green collection card from being removed by the legacy inline Green-page lock.
  const nativeRemove = Element.prototype.remove;
  Element.prototype.remove = function(){
    const parent = this.parentElement;
    if(parent && parent.id === 'productGrid'){
      const siblings = Array.from(parent.children);
      if(siblings.indexOf(this) === 4) return;
    }
    return nativeRemove.call(this);
  };

  // Approved Green collection order: Ring → Necklace → Crown → Earrings → Bracelet.
  const pieces = [
    {product:1, src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green-final-1'},
    {product:0, src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green-final-1'},
    {product:4, src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green-final-1'},
    {product:2, src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green-final-1'},
    {product:3, src:'19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet-final-20260817-2'}
  ];

  function setGridColumns(grid){
    const w = window.innerWidth;
    grid.style.gridTemplateColumns = w <= 760 ? '1fr' : 'repeat(5,minmax(0,1fr))';
    grid.style.gap = w <= 760 ? '18px' : '14px';
  }

  function applyFivePieceLayout(){
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    if(cards.length < 5) return;

    const byProduct = new Map(cards.map(card => [Number(card.dataset.product), card]));
    const ordered = pieces.map(piece => byProduct.get(piece.product)).filter(Boolean);
    if(ordered.length !== 5) return;

    ordered.forEach(card => grid.appendChild(card));
    setGridColumns(grid);

    pieces.forEach(piece => {
      const card = Array.from(grid.querySelectorAll('.product-card')).find(c => Number(c.dataset.product) === piece.product);
      const img = card && card.querySelector('.product-image');
      if(img) img.src = piece.src;
    });
  }

  function scheduleLayout(){
    [50,150,350,800,1400,2200].forEach(ms => setTimeout(applyFivePieceLayout, ms));
  }

  function installHeroCTAButtons(){
    const frame = document.querySelector('.hero-frame');
    if(!frame || frame.querySelector('.green-hero-cta')) return;

    const fixStyle = document.createElement('style');
    fixStyle.textContent = '.hotspot-collections::after,.hotspot-shop::after{content:none!important;display:none!important;pointer-events:none!important}';
    document.head.appendChild(fixStyle);

    [
      {label:'Discover Collection', target:'productGrid', left:'7.8%', top:'64.0%', width:'20.0%', height:'9.5%'},
      {label:'Shop Now', target:'shop', left:'29.0%', top:'64.0%', width:'15.5%', height:'9.5%'}
    ].forEach(spec => {
      const link = document.createElement('a');
      link.className = 'green-hero-cta';
      link.href = spec.target === 'productGrid' ? '#productGrid' : '#shop';
      link.setAttribute('aria-label', spec.label);
      Object.assign(link.style, {
        position:'absolute', left:spec.left, top:spec.top, width:spec.width, height:spec.height,
        zIndex:'70', display:'block', background:'transparent', border:'0', cursor:'pointer',
        textDecoration:'none', WebkitTapHighlightColor:'transparent', pointerEvents:'auto'
      });
      link.addEventListener('click', event => {
        event.preventDefault();
        const target = document.getElementById(spec.target);
        if(!target) return;
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', window.location.pathname + window.location.search + (spec.target === 'productGrid' ? '#productGrid' : '#shop'));
      });
      frame.appendChild(link);
    });
  }

  document.addEventListener('DOMContentLoaded', () => { scheduleLayout(); installHeroCTAButtons(); }, {once:true});
  if(document.readyState !== 'loading'){ scheduleLayout(); installHeroCTAButtons(); }
  window.addEventListener('load', scheduleLayout, {once:true});
  window.addEventListener('resize', () => {
    const grid = document.getElementById('productGrid');
    if(grid) setGridColumns(grid);
  }, {passive:true});
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
