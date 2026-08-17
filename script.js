document.write('<script src="/script-base.js?v=20260817-ten"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  const pieces = [
    {product:6, src:'product-07.png?v=concept-final-3', name:'Chip Core Necklace'},
    {product:8, src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=concept-final-3', name:'DNA Helix Pendant'},
    {product:5, src:'product-06.png?v=concept-final-3', name:'Humanoid Circuit Pendant'},
    {product:9, src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=concept-final-3', name:'DNA Helix Bracelet'},
    {product:7, src:'product-08.png?v=concept-final-3', name:'Chip Signature Brooch'}
  ];

  function makeCard(piece){
    const card=document.createElement('article');
    card.className='product-card';
    card.dataset.product=String(piece.product);
    card.innerHTML='<div class="product-image-wrap"><img class="product-image" src="'+piece.src+'" alt="'+piece.name+'"></div><div class="product-card-body"><h2 class="product-name">'+piece.name+'</h2><p class="product-status">Concept design · Not for sale</p><button class="concept-button" type="button" data-product="'+piece.product+'">View Concept</button></div>';
    return card;
  }

  function renderApprovedGrid(){
    const grid=document.getElementById('productGrid');
    if(!grid)return;
    grid.replaceChildren(...pieces.map(makeCard));
    grid.style.gridTemplateColumns=window.innerWidth<=760?'1fr':'repeat(5,minmax(0,1fr))';
    grid.style.gap=window.innerWidth<=760?'18px':'14px';
  }

  function schedule(){[30,120,350,800,1600].forEach(ms=>setTimeout(renderApprovedGrid,ms));}
  document.addEventListener('DOMContentLoaded',schedule,{once:true});
  if(document.readyState!=='loading')schedule();
  window.addEventListener('load',schedule,{once:true});
  window.addEventListener('resize',renderApprovedGrid,{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')setTimeout(renderApprovedGrid,0);});

  document.addEventListener('click',e=>{
    const button=e.target.closest&&e.target.closest('.concept-button');if(!button)return;
    const piece=pieces.find(x=>x.product===Number(button.dataset.product));if(!piece)return;
    setTimeout(()=>{
      const modalImg=document.getElementById('conceptImage');if(modalImg)modalImg.src=piece.src;
      const title=document.getElementById('conceptTitle');if(title)title.textContent=piece.name;
    },0);
  });
})();
