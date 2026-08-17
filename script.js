document.write('<script src="/script-base.js?v=20260817-six"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  const pieces = [
    {product:6, src:'product-07.png', name:'Chip Core Necklace'},
    {product:8, src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=dna1', name:'DNA Helix Pendant'},
    {product:5, src:'product-06.png', name:'Humanoid Circuit Pendant'},
    {product:9, src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=dna1', name:'DNA Helix Bracelet'},
    {product:7, src:'product-08.png', name:'Chip Signature Brooch'}
  ];

  function setGridColumns(grid){
    const w=window.innerWidth;
    grid.style.gridTemplateColumns=w<=760?'1fr':'repeat(5,minmax(0,1fr))';
    grid.style.gap=w<=760?'18px':'14px';
  }

  function makeDnaCard(piece, template){
    const card=template.cloneNode(true);
    card.dataset.product=String(piece.product);
    const img=card.querySelector('.product-image');
    if(img){img.src=piece.src;img.alt=piece.name;}
    const title=card.querySelector('.product-name');
    if(title){title.textContent=piece.name;title.removeAttribute('data-i18n');}
    const button=card.querySelector('.concept-button');
    if(button) button.dataset.product=String(piece.product);
    return card;
  }

  function applyConceptLayout(){
    const grid=document.getElementById('productGrid');
    if(!grid) return;
    const cards=Array.from(grid.querySelectorAll('.product-card'));
    if(cards.length<8) return;
    const byProduct=new Map(cards.map(c=>[Number(c.dataset.product),c]));
    const template=byProduct.get(6)||cards[0];
    if(!template) return;

    let dnaPendant=grid.querySelector('[data-product="8"]');
    let dnaBracelet=grid.querySelector('[data-product="9"]');
    if(!dnaPendant) dnaPendant=makeDnaCard(pieces[1],template);
    if(!dnaBracelet) dnaBracelet=makeDnaCard(pieces[3],template);
    byProduct.set(8,dnaPendant);byProduct.set(9,dnaBracelet);

    Array.from(grid.querySelectorAll('.product-card')).forEach(c=>c.remove());
    pieces.forEach(piece=>{
      const card=byProduct.get(piece.product);
      if(!card) return;
      const img=card.querySelector('.product-image'); if(img) img.src=piece.src;
      if(piece.product>=8){const title=card.querySelector('.product-name');if(title) title.textContent=piece.name;}
      grid.appendChild(card);
    });
    setGridColumns(grid);
  }

  function scheduleLayout(){[80,240,700].forEach(ms=>setTimeout(applyConceptLayout,ms));}

  function installHeroCTAButtons(){
    const frame=document.querySelector('.hero-frame');
    if(!frame||frame.querySelector('.green-hero-cta')) return;
    const fixStyle=document.createElement('style');
    fixStyle.textContent='.hotspot-collections::after,.hotspot-shop::after{content:none!important;display:none!important;pointer-events:none!important}';
    document.head.appendChild(fixStyle);
    [
      {label:'Discover Collection',target:'productGrid',left:'7.8%',top:'64.0%',width:'20.0%',height:'9.5%'},
      {label:'Shop Now',target:'shop',left:'29.0%',top:'64.0%',width:'15.5%',height:'9.5%'}
    ].forEach(spec=>{
      const link=document.createElement('a');link.className='green-hero-cta';link.href=spec.target==='productGrid'?'#productGrid':'#shop';link.setAttribute('aria-label',spec.label);
      Object.assign(link.style,{position:'absolute',left:spec.left,top:spec.top,width:spec.width,height:spec.height,zIndex:'70',display:'block',background:'transparent',border:'0',cursor:'pointer',textDecoration:'none',WebkitTapHighlightColor:'transparent',pointerEvents:'auto'});
      link.addEventListener('click',e=>{e.preventDefault();const target=document.getElementById(spec.target);if(!target)return;target.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',window.location.pathname+window.location.search+(spec.target==='productGrid'?'#productGrid':'#shop'));});
      frame.appendChild(link);
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{scheduleLayout();installHeroCTAButtons();},{once:true});
  if(document.readyState!=='loading'){scheduleLayout();installHeroCTAButtons();}
  window.addEventListener('resize',()=>{const grid=document.getElementById('productGrid');if(grid)setGridColumns(grid);},{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')scheduleLayout();});
  document.addEventListener('click',e=>{
    const button=e.target.closest&&e.target.closest('.concept-button');if(!button)return;
    const card=button.closest('.product-card');const product=Number(card&&card.dataset.product);const piece=pieces.find(x=>x.product===product);if(!piece)return;
    setTimeout(()=>{const modalImg=document.getElementById('conceptImage');if(modalImg)modalImg.src=piece.src;const title=document.getElementById('conceptTitle');if(title&&product>=8)title.textContent=piece.name;},0);
  });
})();
