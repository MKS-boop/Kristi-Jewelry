document.write('<script src="/script-base.js?v=20260817-eight"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  // Verified Green Infinity Bracelet asset retained for future green collection use.
  const verifiedGreenBracelet='19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet-final-20260817';

  const pieces=[
    {product:6,src:'product-07.png?v=concept-final-1',name:'Chip Core Necklace'},
    {product:8,src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=concept-final-1',name:'DNA Helix Pendant'},
    {product:5,src:'product-06.png?v=concept-final-1',name:'Humanoid Circuit Pendant'},
    {product:9,src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=concept-final-1',name:'DNA Helix Bracelet'},
    {product:7,src:'product-08.png?v=concept-final-1',name:'Chip Signature Brooch'}
  ];

  function setGridColumns(grid){
    const w=window.innerWidth;
    grid.style.gridTemplateColumns=w<=760?'1fr':'repeat(5,minmax(0,1fr))';
    grid.style.gap=w<=760?'18px':'14px';
  }

  function makeCard(piece,template){
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

    const byProduct=new Map(cards.map(card=>[Number(card.dataset.product),card]));
    const template=byProduct.get(6)||cards[0];
    if(!template) return;

    if(!byProduct.get(8)) byProduct.set(8,makeCard(pieces[1],template));
    if(!byProduct.get(9)) byProduct.set(9,makeCard(pieces[3],template));

    Array.from(grid.querySelectorAll('.product-card')).forEach(card=>card.remove());

    pieces.forEach(piece=>{
      const card=byProduct.get(piece.product);
      if(!card) return;
      card.dataset.product=String(piece.product);
      const img=card.querySelector('.product-image');
      if(img){img.src=piece.src;img.alt=piece.name;}
      const title=card.querySelector('.product-name');
      if(title){title.textContent=piece.name;title.removeAttribute('data-i18n');}
      const button=card.querySelector('.concept-button');
      if(button) button.dataset.product=String(piece.product);
      grid.appendChild(card);
    });

    setGridColumns(grid);
  }

  function scheduleLayout(){[50,150,350,800,1400].forEach(ms=>setTimeout(applyConceptLayout,ms));}

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
      const link=document.createElement('a');
      link.className='green-hero-cta';
      link.href=spec.target==='productGrid'?'#productGrid':'#shop';
      link.setAttribute('aria-label',spec.label);
      Object.assign(link.style,{position:'absolute',left:spec.left,top:spec.top,width:spec.width,height:spec.height,zIndex:'70',display:'block',background:'transparent',border:'0',cursor:'pointer',textDecoration:'none',WebkitTapHighlightColor:'transparent',pointerEvents:'auto'});
      link.addEventListener('click',e=>{e.preventDefault();const target=document.getElementById(spec.target);if(!target)return;target.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',window.location.pathname+window.location.search+(spec.target==='productGrid'?'#productGrid':'#shop'));});
      frame.appendChild(link);
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{scheduleLayout();installHeroCTAButtons();},{once:true});
  if(document.readyState!=='loading'){scheduleLayout();installHeroCTAButtons();}
  window.addEventListener('load',scheduleLayout,{once:true});
  window.addEventListener('resize',()=>{const grid=document.getElementById('productGrid');if(grid)setGridColumns(grid);},{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')scheduleLayout();});
  document.addEventListener('click',e=>{
    const button=e.target.closest&&e.target.closest('.concept-button');
    if(!button) return;
    const card=button.closest('.product-card');
    const product=Number(card&&card.dataset.product);
    const piece=pieces.find(item=>item.product===product);
    if(!piece) return;
    setTimeout(()=>{
      const modalImg=document.getElementById('conceptImage');
      if(modalImg) modalImg.src=piece.src;
      const title=document.getElementById('conceptTitle');
      if(title) title.textContent=piece.name;
    },0);
  });

  void verifiedGreenBracelet;
})();
