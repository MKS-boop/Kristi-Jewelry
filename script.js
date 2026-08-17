document.write('<script src="/script-base.js?v=20260817-twelve"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  // Approved Green row: preserve original names and verified image files.
  const greenPieces=[
    {id:'green-ring',src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green-audit-1',name:'Orbit Ring'},
    {id:'green-necklace',src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green-audit-1',name:'Aurora Drop Necklace'},
    {id:'green-tiara',src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green-audit-1',name:'Kristi Tiara'},
    {id:'green-earrings',src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green-audit-1',name:'Lumina Earrings'},
    {id:'green-bracelet',src:'19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet-verified-final-20260817',name:'Infinity Bracelet'}
  ];

  // Approved Future Concepts row: Chip → DNA bracelet → Humanoid → DNA pendant → Chip.
  // The visual subjects in the two DNA source files were audited against the live screenshot.
  const conceptPieces=[
    {id:'chip-core',src:'product-07.png?v=concept-audit-1',name:'Chip Core Necklace'},
    {id:'dna-bracelet',src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=concept-audit-1',name:'DNA Helix Bracelet'},
    {id:'humanoid',src:'product-06.png?v=concept-audit-1',name:'Humanoid Circuit Pendant'},
    {id:'dna-pendant',src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=concept-audit-1',name:'DNA Helix Pendant'},
    {id:'chip-brooch',src:'product-08.png?v=concept-audit-1',name:'Chip Signature Brooch'}
  ];

  function card(piece){
    const el=document.createElement('article');
    el.className='product-card';el.dataset.pieceId=piece.id;
    el.innerHTML='<div class="product-image-wrap"><img class="product-image" src="'+piece.src+'" alt="'+piece.name+'"></div><div class="product-card-body"><h2 class="product-name">'+piece.name+'</h2><p class="product-status">Concept design · Not for sale</p><button class="concept-button" type="button" data-piece-id="'+piece.id+'">View Concept</button></div>';
    return el;
  }
  function styleGrid(grid){grid.style.gridTemplateColumns=window.innerWidth<=760?'1fr':'repeat(5,minmax(0,1fr))';grid.style.gap=window.innerWidth<=760?'18px':'14px';}
  function render(){
    const green=document.getElementById('productGrid');if(!green)return;
    let heading=document.querySelector('.concept-second-heading');
    let concept=document.getElementById('conceptProductGrid');
    if(!heading){heading=document.createElement('div');heading.className='section-heading concept-second-heading';heading.innerHTML='<p class="eyebrow">Concept Preview</p><h1>Future Concepts</h1>';green.insertAdjacentElement('afterend',heading);}
    if(!concept){concept=document.createElement('div');concept.id='conceptProductGrid';concept.className='product-grid';heading.insertAdjacentElement('afterend',concept);}
    green.replaceChildren(...greenPieces.map(card));
    concept.replaceChildren(...conceptPieces.map(card));
    styleGrid(green);styleGrid(concept);
  }
  function schedule(){[40,150,400,900,1700].forEach(ms=>setTimeout(render,ms));}
  document.addEventListener('DOMContentLoaded',schedule,{once:true});if(document.readyState!=='loading')schedule();window.addEventListener('load',schedule,{once:true});
  window.addEventListener('resize',()=>{const a=document.getElementById('productGrid'),b=document.getElementById('conceptProductGrid');if(a)styleGrid(a);if(b)styleGrid(b);},{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')setTimeout(render,0);});
  document.addEventListener('click',e=>{
    const btn=e.target.closest&&e.target.closest('.concept-button');if(!btn)return;
    const id=btn.dataset.pieceId;const p=[...greenPieces,...conceptPieces].find(x=>x.id===id);if(!p)return;
    setTimeout(()=>{const img=document.getElementById('conceptImage');if(img)img.src=p.src;const t=document.getElementById('conceptTitle');if(t)t.textContent=p.name;},0);
  });
})();
