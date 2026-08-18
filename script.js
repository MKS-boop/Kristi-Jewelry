document.write('<script src="/script-base.js?v=20260817-fourteen"><\/script>');

(function(){
  if(!window.location.pathname.includes('/green/')) return;

  const greenPieces=[
    {id:'green-ring',src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png?v=green-audit-1',name:'Orbit Ring'},
    {id:'green-necklace',src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png?v=green-audit-1',name:'Aurora Drop Necklace'},
    {id:'green-tiara',src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png?v=green-audit-1',name:'Kristi Tiara'},
    {id:'green-earrings',src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png?v=green-audit-1',name:'Lumina Earrings'},
    {id:'green-bracelet',src:'Kristi%20bracelet.jpeg?v=20260818-bracelet-crop3',name:'Infinity Bracelet'}
  ];

  const conceptPieces=[
    {id:'chip-core',src:'product-07.png?v=concept-audit-1',name:'Chip Core Necklace'},
    {id:'dna-bracelet',src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png?v=concept-audit-1',name:'DNA Helix Bracelet'},
    {id:'humanoid',src:'product-06.png?v=concept-audit-1',name:'Humanoid Circuit Pendant'},
    {id:'dna-pendant',src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png?v=concept-audit-1',name:'DNA Helix Pendant'},
    {id:'chip-brooch',src:'product-08.png?v=concept-audit-1',name:'Chip Signature Brooch'}
  ];

  function installStyle(){
    if(document.getElementById('kristiPublicCatalogStyle')) return;
    const style=document.createElement('style');
    style.id='kristiPublicCatalogStyle';
    style.textContent=`
      .product-card{display:flex;flex-direction:column;height:100%}
      .product-card-body{display:flex;flex:1;flex-direction:column}
      .concept-button{margin-top:auto;align-self:flex-start}
      .product-image-wrap{position:relative;overflow:hidden;aspect-ratio:1/1;background:#073c2e}
      .product-image-wrap>.product-image{display:block;width:100%;height:100%;margin:0;object-fit:cover}
      .product-card[data-piece-id="green-bracelet"] .product-image{width:100%;height:100%;object-fit:cover;object-position:50% 19%;transform:scale(1.48);transform-origin:50% 19%}

      .hotspot-collections::after,.hotspot-shop::after{display:none!important;pointer-events:none!important}
      .hero-frame::before,.hero-frame::after{pointer-events:none!important}
      .hero-link,.kristi-hero-control{position:absolute!important;display:block!important;background:transparent!important;border:0!important;padding:0!important;margin:0!important;z-index:160!important;cursor:pointer!important;pointer-events:auto!important;box-shadow:none!important;outline:none!important}
      .hero-link:hover,.hero-link:focus,.hero-link:focus-visible,.hero-link:active,.kristi-hero-control:hover,.kristi-hero-control:focus,.kristi-hero-control:focus-visible,.kristi-hero-control:active{background:transparent!important;border:0!important;box-shadow:none!important;outline:none!important}
      .hero-link-home{left:12.5%!important;top:4.7%!important;width:6.0%!important;height:4.4%!important}
      .hero-link-shop{left:20.4%!important;top:4.7%!important;width:5.8%!important;height:4.4%!important}
      .hero-link-collections{left:28.6%!important;top:4.7%!important;width:10.8%!important;height:4.4%!important}
      .hero-link-about{left:41.7%!important;top:4.7%!important;width:6.2%!important;height:4.4%!important}
      .hero-link-contact{left:49.8%!important;top:4.7%!important;width:7.4%!important;height:4.4%!important}
      .hero-link-search{left:77.1%!important;top:4.7%!important;width:3.0%!important;height:4.8%!important}
      .hero-link-account{left:82.2%!important;top:4.7%!important;width:3.1%!important;height:4.8%!important}
      .hero-link-cart{left:87.4%!important;right:auto!important;top:4.7%!important;width:3.4%!important;height:4.8%!important}
      .hero-link-menu{left:92.9%!important;top:4.7%!important;width:3.5%!important;height:4.8%!important}
      .hero-link-browse{left:11.0%!important;top:67.2%!important;width:18.7%!important;height:6.6%!important}
      .hero-link-shopnow{left:32.5%!important;top:67.2%!important;width:15.0%!important;height:6.6%!important}

      .kristi-hero-panel{position:absolute;z-index:220;display:none;background:rgba(3,43,32,.96);border:1px solid rgba(224,177,83,.55);box-shadow:0 16px 36px rgba(0,0,0,.3);color:#f1d28e}
      .kristi-hero-panel.is-open{display:block}
      .kristi-search-panel{right:13%;top:12%;width:min(330px,72vw);padding:12px}
      .kristi-search-input{width:100%;height:38px;padding:0 11px;border:1px solid rgba(224,177,83,.55);background:#082f26;color:#fff;outline:none}
      .kristi-menu-panel{right:2.5%;top:12%;width:180px;padding:8px}
      .kristi-menu-panel a{display:block;padding:10px 12px;color:#f1d28e;border-bottom:1px solid rgba(224,177,83,.18)}
      .kristi-menu-panel a:last-child{border-bottom:0}
      .kristi-menu-panel a:hover{background:rgba(224,177,83,.1)}
      @media(max-width:760px){
        .hero-link-home{left:12.3%!important}.hero-link-shop{left:20.2%!important}.hero-link-collections{left:28.4%!important}.hero-link-about{left:41.5%!important}.hero-link-contact{left:49.6%!important}
        .hero-link-search{left:76.9%!important}.hero-link-account{left:82.0%!important}.hero-link-cart{left:87.2%!important}.hero-link-menu{left:92.7%!important}
        .hero-link-browse{left:10.7%!important;top:66.8%!important;width:19.2%!important;height:7.2%!important}.hero-link-shopnow{left:32.3%!important;top:66.8%!important;width:15.4%!important;height:7.2%!important}
      }
    `;
    document.head.appendChild(style);
  }

  function scrollToId(id){const target=document.getElementById(id);if(target) target.scrollIntoView({behavior:'smooth',block:'start'});}

  function ensureHeroControl(frame, cls, label, href){let el=frame.querySelector('.'+cls);if(!el){el=document.createElement(href?'a':'button');el.className='kristi-hero-control '+cls;if(href)el.href=href;else el.type='button';el.setAttribute('aria-label',label);frame.appendChild(el);}return el;}

  function setupHeroControls(){
    const frame=document.querySelector('.hero-frame');
    if(!frame || frame.dataset.controlsReady==='1') return;
    frame.dataset.controlsReady='1';
    ensureHeroControl(frame,'hero-link-home','Home','#home');
    const search=ensureHeroControl(frame,'hero-link-search','Search');
    const account=ensureHeroControl(frame,'hero-link-account','Jeweler account','/jeweler/');
    const menu=ensureHeroControl(frame,'hero-link-menu','Menu');
    const anchors={'.hero-link-home':'home','.hero-link-shop':'shop','.hero-link-collections':'productGrid','.hero-link-about':'about','.hero-link-contact':'contact','.hero-link-browse':'productGrid','.hero-link-shopnow':'shop','.hero-link-cart':'shop'};
    Object.entries(anchors).forEach(([selector,id])=>{const el=frame.querySelector(selector);if(!el)return;el.style.pointerEvents='auto';el.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();scrollToId(id);});});
    account.addEventListener('click',ev=>{ev.stopPropagation();});
    let searchPanel=frame.querySelector('.kristi-search-panel');
    if(!searchPanel){searchPanel=document.createElement('div');searchPanel.className='kristi-hero-panel kristi-search-panel';searchPanel.innerHTML='<input class="kristi-search-input" type="search" placeholder="Search jewelry" aria-label="Search jewelry">';frame.appendChild(searchPanel);}
    let menuPanel=frame.querySelector('.kristi-menu-panel');
    if(!menuPanel){menuPanel=document.createElement('nav');menuPanel.className='kristi-hero-panel kristi-menu-panel';menuPanel.innerHTML='<a href="#home">Home</a><a href="#shop">Shop</a><a href="#productGrid">Collections</a><a href="#about">About</a><a href="#contact">Contact</a><a href="/jeweler/">Jeweler Portal</a>';frame.appendChild(menuPanel);menuPanel.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();scrollToId(a.getAttribute('href').slice(1));menuPanel.classList.remove('is-open');}));}
    search.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();menuPanel.classList.remove('is-open');searchPanel.classList.toggle('is-open');if(searchPanel.classList.contains('is-open'))setTimeout(()=>searchPanel.querySelector('input').focus(),0);});
    menu.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();searchPanel.classList.remove('is-open');menuPanel.classList.toggle('is-open');});
    const input=searchPanel.querySelector('input');
    input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();document.querySelectorAll('.product-card').forEach(card=>{card.style.display=!q||card.textContent.toLowerCase().includes(q)?'':'none';});const crown=document.querySelector('.published-static-card');if(crown)crown.style.display=!q||crown.textContent.toLowerCase().includes(q)?'':'none';});
    document.addEventListener('click',ev=>{if(!searchPanel.contains(ev.target)&&ev.target!==search)searchPanel.classList.remove('is-open');if(!menuPanel.contains(ev.target)&&ev.target!==menu)menuPanel.classList.remove('is-open');});
  }

  function conceptCard(piece){const el=document.createElement('article');el.className='product-card';el.dataset.pieceId=piece.id;el.innerHTML='<div class="product-image-wrap"><img class="product-image" src="'+piece.src+'" alt="'+piece.name+'"></div><div class="product-card-body"><h2 class="product-name">'+piece.name+'</h2><p class="product-status">Concept design · Not for sale</p><button class="concept-button" type="button" data-piece-id="'+piece.id+'">View Concept</button></div>';return el;}
  function styleGrid(grid){grid.style.gridTemplateColumns=window.innerWidth<=760?'1fr':'repeat(5,minmax(0,1fr))';grid.style.gap=window.innerWidth<=760?'18px':'14px';}
  function render(){installStyle();setupHeroControls();const green=document.getElementById('productGrid');if(!green)return;let heading=document.querySelector('.concept-second-heading');let concept=document.getElementById('conceptProductGrid');if(!heading){heading=document.createElement('div');heading.className='section-heading concept-second-heading';heading.innerHTML='<p class="eyebrow">Concept Preview</p><h1>Future Concepts</h1>';green.insertAdjacentElement('afterend',heading);}if(!concept){concept=document.createElement('div');concept.id='conceptProductGrid';concept.className='product-grid';heading.insertAdjacentElement('afterend',concept);}green.replaceChildren(...greenPieces.map(conceptCard));concept.replaceChildren(...conceptPieces.map(conceptCard));styleGrid(green);styleGrid(concept);}

  function openConcept(piece){
    const modal=document.getElementById('conceptModal');
    if(!modal)return;
    const img=document.getElementById('conceptImage');if(img){img.src=piece.src;img.alt=piece.name;}
    const title=document.getElementById('conceptTitle');if(title)title.textContent=piece.name;
    const desc=document.getElementById('conceptDescription');if(desc)desc.textContent='Concept design preview · Not for sale';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeConcept(){const modal=document.getElementById('conceptModal');if(!modal)return;modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}

  function schedule(){[40,150,400,900,1700].forEach(ms=>setTimeout(render,ms));}
  document.addEventListener('DOMContentLoaded',schedule,{once:true});if(document.readyState!=='loading')schedule();window.addEventListener('load',schedule,{once:true});
  window.addEventListener('resize',()=>{const a=document.getElementById('productGrid'),b=document.getElementById('conceptProductGrid');if(a)styleGrid(a);if(b)styleGrid(b);},{passive:true});
  document.addEventListener('change',e=>{if(e.target&&e.target.id==='languageSelect')setTimeout(render,0);});
  document.addEventListener('click',e=>{
    const close=e.target.closest&&e.target.closest('[data-close-modal]');if(close){e.preventDefault();closeConcept();return;}
    const btn=e.target.closest&&e.target.closest('.concept-button');if(!btn)return;
    e.preventDefault();e.stopPropagation();
    const id=btn.dataset.pieceId;const p=[...greenPieces,...conceptPieces].find(x=>x.id===id);if(p)openConcept(p);
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeConcept();});
})();
