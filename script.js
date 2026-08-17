document.write('<script src="/script-base.js?v=20260817-six"><\/script>');

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
    {product:1, src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green8'},
    {product:0, src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green8'},
    {product:4, src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green8'},
    {product:2, src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green8'},
    {product:3, src:'19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet3'}
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
    setTimeout(applyFivePieceLayout, 700);
  }

  function installHeroCTAButtons(){
    const frame = document.querySelector('.hero-frame');
    if(!frame || frame.querySelector('.green-hero-cta')) return;

    const buttons = [
      {label:'Discover Collection', target:'productGrid', left:'9.7%', top:'81.8%', width:'20.7%', height:'12.5%'},
      {label:'Shop Now', target:'shop', left:'31.6%', top:'81.8%', width:'15.8%', height:'12.5%'}
    ];

    buttons.forEach(spec => {
      const link = document.createElement('a');
      link.className = 'green-hero-cta';
      link.href = '#';
      link.setAttribute('aria-label', spec.label);
      Object.assign(link.style, {
        position:'absolute', left:spec.left, top:spec.top, width:spec.width, height:spec.height,
        zIndex:'47', display:'block', background:'transparent', border:'0', cursor:'pointer',
        textDecoration:'none', WebkitTapHighlightColor:'transparent'
      });
      link.addEventListener('click', event => {
        event.preventDefault();
        const target = document.getElementById(spec.target);
        if(!target) return;
        target.scrollIntoView({behavior:'smooth', block:'start'});
        const hash = spec.target === 'productGrid' ? '#productGrid' : '#shop';
        history.replaceState(null, '', window.location.pathname + window.location.search + hash);
      });
      frame.appendChild(link);
    });
  }

  document.addEventListener('DOMContentLoaded', () => { scheduleLayout(); installHeroCTAButtons(); }, {once:true});
  if(document.readyState !== 'loading'){ scheduleLayout(); installHeroCTAButtons(); }

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
