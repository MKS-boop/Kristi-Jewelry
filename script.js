document.write('<script src="/script-base.js?v=20260817-fourteen"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  const publishedPieces=[
    {
      id:'emerald-crown',
      name:'Emerald Crown',
      brand:'Kristi & G',
      country:'Armenia',
      material:'18K Gold, Emerald and Diamonds',
      weight:'700 g',
      dimensions:'54–57 cm',
      retailPrice:2500,
      description:'Handcrafted 18K gold crown set with emeralds and diamonds. A unique statement piece created with traditional fine-jewelry craftsmanship.',
      images:[]
    }
  ];

  const greenPieces=[
    {id:'green-ring',src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green-audit-1',name:'Orbit Ring'},
    {id:'green-necklace',src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green-audit-1',name:'Aurora Drop Necklace'},
    {id:'green-tiara',src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green-audit-1',name:'Kristi Tiara'},
    {id:'green-earrings',src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green-audit-1',name:'Lumina Earrings'},
    {id:'green-bracelet',src:'19CE06DF-C75C-4676-9477-ADB000875EB6.png?v=bracelet-verified-final-20260817',name:'Infinity Bracelet'}
  ];

  const conceptPieces=[
    {id:'chip-core',src:'product-07.png?v=concept-audit-1',name:'Chip Core Necklace'},
    {id:'dna-bracelet',src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=concept-audit-1',name:'DNA Helix Bracelet'},
    {id:'humanoid',src:'product-06.png?v=concept-audit-1',name:'Humanoid Circuit Pendant'},
    {id:'dna-pendant',src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=concept-audit-1',name:'DNA Helix Pendant'},
    {id:'chip-brooch',src:'product-08.png?v=concept-audit-1',name:'Chip Signature Brooch'}
  ];

  function money(value){return Number(value).toLocaleString(undefined,{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2});}

  function installStyle(){
    if(document.getElementById('kristiPublicCatalogStyle')) return;
    const style=document.createElement('style');
    style.id='kristiPublicCatalogStyle';
    style.textContent=`
      .product-image-wrap{position:relative;overflow:hidden}
      .concept-preview-badge,.published-badge{position:absolute;left:11px;top:11px;z-index:5;display:inline-flex;align-items:center;justify-content:center;min-width:78px;height:20px;padding:0 7px;box-sizing:border-box;background:#11100d;color:#d7ad5b;border:1px solid rgba(215,173,91,.72);font:600 7px/1 Arial,sans-serif;letter-spacing:.8px;text-transform:uppercase;box-shadow:0 0 0 2px #11100d;white-space:nowrap;pointer-events:none}
      .published-badge{background:#123629;color:#f0d89b;border-color:#c9a85b;box-shadow:0 0 0 2px #123629}
      .published-heading{margin-bottom:18px}
      .published-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;margin-bottom:52px}
      .published-card{display:grid;grid-template-columns:minmax(260px,.95fr) minmax(300px,1.05fr);gap:28px;background:rgba(255,255,255,.035);border:1px solid rgba(215,173,91,.24);border-radius:18px;overflow:hidden}
      .published-media{min-height:360px;background:linear-gradient(135deg,#0d1712,#1c3a2c);display:flex;align-items:center;justify-content:center;position:relative}
      .published-media img{width:100%;height:100%;object-fit:cover;display:block}
      .published-photo-placeholder{padding:30px;text-align:center;color:#d8caa5;font:500 12px/1.5 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
      .published-body{padding:34px 34px 34px 6px;display:flex;flex-direction:column;justify-content:center}
      .published-body h2{margin:0 0 8px;font-size:clamp(28px,4vw,48px)}
      .published-brand{margin:0 0 22px;color:#bcae8b;font-size:13px;letter-spacing:.06em;text-transform:uppercase}
      .published-price{font-size:24px;margin:0 0 18px;color:#e3c575}
      .published-description{line-height:1.65;margin:0 0 20px;max-width:650px}
      .published-specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px;margin:0;padding:0;list-style:none;font-size:13px}
      .published-specs strong{display:block;color:#bcae8b;font-size:10px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}
      @media(max-width:760px){.concept-preview-badge,.published-badge{left:10px;top:10px;min-width:76px;height:20px;font-size:7px}.published-card{grid-template-columns:1fr}.published-media{min-height:300px}.published-body{padding:24px}.published-specs{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function conceptCard(piece){
    const el=document.createElement('article');
    el.className='product-card';el.dataset.pieceId=piece.id;
    el.innerHTML='<div class="product-image-wrap"><img class="product-image" src="'+piece.src+'" alt="'+piece.name+'"><span class="concept-preview-badge">Concept Preview</span></div><div class="product-card-body"><h2 class="product-name">'+piece.name+'</h2><p class="product-status">Concept design · Not for sale</p><button class="concept-button" type="button" data-piece-id="'+piece.id+'">View Concept</button></div>';
    return el;
  }

  function publishedCard(piece){
    const el=document.createElement('article');
    el.className='published-card';
    const media=piece.images&&piece.images.length?'<img src="'+piece.images[0]+'" alt="'+piece.name+'">':'<div class="published-photo-placeholder">Official product photography<br>pending publication</div>';
    el.innerHTML='<div class="published-media">'+media+'<span class="published-badge">Published</span></div><div class="published-body"><p class="eyebrow">Available through KRISTI</p><h2>'+piece.name+'</h2><p class="published-brand">'+piece.brand+' · '+piece.country+'</p><p class="published-price">'+money(piece.retailPrice)+'</p><p class="published-description">'+piece.description+'</p><ul class="published-specs"><li><strong>Material</strong>'+piece.material+'</li><li><strong>Weight</strong>'+piece.weight+'</li><li><strong>Size</strong>'+piece.dimensions+'</li><li><strong>Status</strong>Published</li></ul></div>';
    return el;
  }

  function styleGrid(grid){grid.style.gridTemplateColumns=window.innerWidth<=760?'1fr':'repeat(5,minmax(0,1fr))';grid.style.gap=window.innerWidth<=760?'18px':'14px';}

  function render(){
    installStyle();
    const green=document.getElementById('productGrid');if(!green)return;
    let pubHeading=document.querySelector('.published-heading');
    let pubGrid=document.getElementById('publishedProductGrid');
    if(!pubHeading){pubHeading=document.createElement('div');pubHeading.className='section-heading published-heading';pubHeading.innerHTML='<p class="eyebrow">KRISTI Approved</p><h1>Published Jewelry</h1><p>Jewelry approved by KRISTI with confirmed retail pricing.</p>';green.insertAdjacentElement('beforebegin',pubHeading);}
    if(!pubGrid){pubGrid=document.createElement('div');pubGrid.id='publishedProductGrid';pubGrid.className='published-grid';pubHeading.insertAdjacentElement('afterend',pubGrid);}
    pubGrid.replaceChildren(...publishedPieces.map(publishedCard));

    let heading=document.querySelector('.concept-second-heading');
    let concept=document.getElementById('conceptProductGrid');
    if(!heading){heading=document.createElement('div');heading.className='section-heading concept-second-heading';heading.innerHTML='<p class="eyebrow">Concept Preview</p><h1>Future Concepts</h1>';green.insertAdjacentElement('afterend',heading);}
    if(!concept){concept=document.createElement('div');concept.id='conceptProductGrid';concept.className='product-grid';heading.insertAdjacentElement('afterend',concept);}
    green.replaceChildren(...greenPieces.map(conceptCard));
    concept.replaceChildren(...conceptPieces.map(conceptCard));
    styleGrid(green);styleGrid(concept);
  }

  function schedule(){[40,150,400,900,1700].forEach(ms=>setTimeout(render,ms));}
  document.addEventListener('DOMContentLoaded',schedule,{once:true});if(document.readyState!=='loading')schedule();window.addEventListener('load',schedule,{once:true});
  window.addEventListener('resize',()=>{const a=document.getElementById('productGrid'),b=document.getElementById('conceptProductGrid');if(a)styleGrid(a);if(b)styleGrid(b);},{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')setTimeout(render,0);});
  document.addEventListener('click',e=>{const btn=e.target.closest&&e.target.closest('.concept-button');if(!btn)return;const id=btn.dataset.pieceId;const p=[...greenPieces,...conceptPieces].find(x=>x.id===id);if(!p)return;setTimeout(()=>{const img=document.getElementById('conceptImage');if(img)img.src=p.src;const t=document.getElementById('conceptTitle');if(t)t.textContent=p.name;},0);});
})();
