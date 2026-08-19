(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const header=$('.site-sticky-nav');
  if(!header) return;
  const hero=$('#home');
  const searchBtn=$('[data-sticky-search]',header);
  const menuBtn=$('[data-sticky-menu]',header);
  const searchBox=$('.sticky-search-box',header);
  const menuBox=$('.sticky-menu-box',header);
  const searchInput=$('#stickySiteSearch',header);
  const cart=$('#cartDrawer');
  const cartContent=$('[data-cart-content]');
  const CART_KEY='kristiCart';
  const crownItem={id:'emerald-crown',name:'Emerald Crown',maker:'Kristi & G · Armenia',price:'$2,500.00'};

  const readCookie=()=>{
    const row=document.cookie.split('; ').find(v=>v.startsWith(CART_KEY+'='));
    if(!row) return [];
    try{const parsed=JSON.parse(decodeURIComponent(row.split('=').slice(1).join('=')));return Array.isArray(parsed)?parsed:[];}catch(_){return [];}
  };
  const readCart=()=>{
    try{
      const raw=localStorage.getItem(CART_KEY);
      if(raw){const parsed=JSON.parse(raw);if(Array.isArray(parsed)) return parsed;}
    }catch(_){}
    return readCookie();
  };
  const writeCart=(items)=>{
    const value=JSON.stringify(items);
    try{localStorage.setItem(CART_KEY,value);}catch(_){}
    document.cookie=CART_KEY+'='+encodeURIComponent(value)+'; Max-Age=2592000; Path=/; SameSite=Lax';
  };
  const renderCart=()=>{
    if(!cartContent) return;
    const items=readCart();
    if(!items.length){
      cartContent.innerHTML='<p>Your cart is currently empty.</p><a class="button secondary" href="#shop" data-cart-shop>Continue Shopping</a>';
    }else{
      const item=items[0];
      cartContent.innerHTML='<div class="cart-item"><strong>'+item.name+'</strong><p>'+item.maker+'</p><p>'+item.price+'</p></div><a class="button secondary" href="#shop" data-cart-shop>Continue Shopping</a>';
    }
    cartContent.querySelector('[data-cart-shop]')?.addEventListener('click',e=>{e.preventDefault();closeCart();scrollToTarget('#shop');});
  };

  if('scrollRestoration' in history) history.scrollRestoration='manual';
  const syncStickyNav=()=>{if(!hero){header.style.display='';return;}const rect=hero.getBoundingClientRect();const onHome=rect.bottom>Math.max(96,window.innerHeight*.18);header.style.display=onHome?'none':'';if(onHome){searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');}};
  syncStickyNav();window.addEventListener('scroll',syncStickyNav,{passive:true});window.addEventListener('resize',syncStickyNav);
  const setHash=(selector)=>{if(!selector||selector==='#home'){history.replaceState(null,'',location.pathname+location.search);return;}if(location.hash!==selector)history.replaceState(null,'',selector);};
  const scrollToTarget=(selector,{behavior='smooth',updateHash=true}={})=>{let el=$(selector);if(selector==='#productGrid')el=$('.concept-second-heading')||el;if(!el)return;if(updateHash)setHash(selector);el.scrollIntoView({behavior,block:'start'});};
  const openCart=()=>{if(!cart)return;renderCart();searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');document.body.classList.add('cart-open');cart.classList.add('is-open');cart.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
  const closeCart=()=>{if(!cart)return;cart.classList.remove('is-open');cart.setAttribute('aria-hidden','true');document.body.classList.remove('cart-open');document.body.style.overflow='';};
  $$('[data-sticky-target]',header).forEach(link=>link.addEventListener('click',e=>{e.preventDefault();scrollToTarget(link.dataset.stickyTarget);searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');setTimeout(syncStickyNav,80);}));
  $$('[data-cart-open]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();openCart();}));
  $$('[data-cart-close]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();closeCart();}));
  $('[data-cart-shop]')?.addEventListener('click',e=>{e.preventDefault();closeCart();scrollToTarget('#shop');});
  $('[data-view-crown]')?.addEventListener('click',()=>{$('#emeraldCrown')?.scrollIntoView({behavior:'smooth',block:'center'});});
  $('[data-add-crown]')?.addEventListener('click',()=>{writeCart([crownItem]);renderCart();openCart();});
  renderCart();
  document.addEventListener('click',e=>{const navTarget=e.target.closest?.('.hero-control[data-target], #menuPanel a[data-target]');if(navTarget?.dataset?.target)setHash(navTarget.dataset.target);if(searchBox&&!searchBox.contains(e.target)&&e.target!==searchBtn)searchBox.classList.remove('is-open');if(menuBox&&!menuBox.contains(e.target)&&e.target!==menuBtn)menuBox.classList.remove('is-open');},true);
  const restoreRoute=()=>{const hash=location.hash;if(hash&&$(hash)){requestAnimationFrame(()=>requestAnimationFrame(()=>scrollToTarget(hash,{behavior:'auto',updateHash:false})));}else{window.scrollTo({top:0,left:0,behavior:'auto'});}};window.addEventListener('pageshow',restoreRoute);
  searchBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();menuBox?.classList.remove('is-open');searchBox?.classList.toggle('is-open');if(searchBox?.classList.contains('is-open'))setTimeout(()=>searchInput?.focus(),0);});
  menuBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();searchBox?.classList.remove('is-open');menuBox?.classList.toggle('is-open');});
  searchInput?.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();$$('.product-card').forEach(card=>{card.hidden=!!q&&!String(card.dataset.search||'').includes(q);});const crown=$('.published-static');if(crown)crown.hidden=!!q&&!crown.textContent.toLowerCase().includes(q);if(q)scrollToTarget('#shop');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');closeCart();}});
})();