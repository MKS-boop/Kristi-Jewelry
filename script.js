document.write('<script src="/script-base.js?v=20260817-eleven"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  const greenPieces=[
    {product:1,src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green-final',name:'Green Gemstone Ring'},
    {product:0,src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green-final',name:'Green Gemstone Necklace'},
    {product:4,src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green-final',name:'Green Gemstone Crown'},
    {product:2,src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green-final',name:'Green Gemstone Earrings'},
    {product:3,src:'19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet-final-20260817',name:'Infinity Bracelet'}
  ];
  const conceptPieces=[
    {product:6,src:'product-07.png?v=concept-final-4',name:'Chip Core Necklace'},
    {product:8,src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=concept-final-4',name:'DNA Helix Pendant'},
    {product:5,src:'product-06.png?v=concept-final-4',name:'Humanoid Circuit Pendant'},
    {product:9,src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=concept-final-4',name:'DNA Helix Bracelet'},
    {product:7,src:'product-08.png?v=concept-final-4',name:'Chip Signature Brooch'}
  ];

  function card(piece){
    const el=document.createElement('article');el.className='product-card';el.dataset.product=piece.product;
    el.innerHTML='<div class="product-image-wrap"><img class="product-image" src="'+piece.src+'" alt="'+piece.name+'"></div><div class="product-card-body"><h2 class="product-name">'+piece.name+'</h2><p class="product-status">Concept design · Not for sale</p><button class="concept-button" type="button" data-product="'+piece.product+'">View Concept</button></div>';
    return el;
  }
  function styleGrid(grid){grid.style.gridTemplateColumns=window.innerWidth<=760?'1fr':'repeat(5,minmax(0,1fr))';grid.style.gap=window.innerWidth<=760?'18px':'14px';}
  function render(){
    const original=document.getElementById('productGrid');if(!original)return;
    let concept=document.getElementById('conceptProductGrid');
    if(!concept){
      const heading=document.createElement('div');heading.className='section-heading concept-second-heading';heading.innerHTML='<p class="eyebrow">Concept Preview</p><h1>Future Concepts</h1>';
      concept=document.createElement('div');concept.id='conceptProductGrid';concept.className='product-grid';
      original.insertAdjacentElement('afterend',heading);heading.insertAdjacentElement('afterend',concept);
    }
    original.replaceChildren(...greenPieces.map(card));
    concept.replaceChildren(...conceptPieces.map(card));
    styleGrid(original);styleGrid(concept);
  }
  function schedule(){[40,150,400,900,1700].forEach(ms=>setTimeout(render,ms));}
  document.addEventListener('DOMContentLoaded',schedule,{once:true});if(document.readyState!=='loading')schedule();window.addEventListener('load',schedule,{once:true});
  window.addEventListener('resize',()=>{const a=document.getElementById('productGrid'),b=document.getElementById('conceptProductGrid');if(a)styleGrid(a);if(b)styleGrid(b);},{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')setTimeout(render,0);});
  document.addEventListener('click',e=>{
    const btn=e.target.closest&&e.target.closest('.concept-button');if(!btn)return;
    const p=[...greenPieces,...conceptPieces].find(x=>x.product===Number(btn.dataset.product));if(!p)return;
    setTimeout(()=>{const img=document.getElementById('conceptImage');if(img)img.src=p.src;const t=document.getElementById('conceptTitle');if(t)t.textContent=p.name;},0);
  });
})();
