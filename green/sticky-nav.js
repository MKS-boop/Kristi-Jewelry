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

  const syncStickyNav=()=>{
    if(!hero){header.style.display='';return;}
    const rect=hero.getBoundingClientRect();
    const onHome=rect.bottom>Math.max(96,window.innerHeight*.18);
    header.style.display=onHome?'none':'';
    if(onHome){searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');}
  };
  syncStickyNav();
  window.addEventListener('scroll',syncStickyNav,{passive:true});
  window.addEventListener('resize',syncStickyNav);

  const scrollToTarget=(selector)=>{
    let el=$(selector);
    if(selector==='#productGrid') el=$('.concept-second-heading') || el;
    if(!el) return;
    const navHeight=header.getBoundingClientRect().height || 68;
    const extraGap=selector==='#contact' ? 28 : 0;
    const top=window.scrollY+el.getBoundingClientRect().top-navHeight-extraGap;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  };

  $$('[data-sticky-target]',header).forEach(link=>link.addEventListener('click',e=>{
    e.preventDefault();
    scrollToTarget(link.dataset.stickyTarget);
    searchBox?.classList.remove('is-open');
    menuBox?.classList.remove('is-open');
    setTimeout(syncStickyNav,80);
  }));
  searchBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();menuBox?.classList.remove('is-open');searchBox?.classList.toggle('is-open');if(searchBox?.classList.contains('is-open'))setTimeout(()=>searchInput?.focus(),0);});
  menuBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();searchBox?.classList.remove('is-open');menuBox?.classList.toggle('is-open');});
  searchInput?.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();$$('.product-card').forEach(card=>{card.hidden=!!q&&!String(card.dataset.search||'').includes(q);});const crown=$('.published-static');if(crown)crown.hidden=!!q&&!crown.textContent.toLowerCase().includes(q);if(q)scrollToTarget('#shop');});
  document.addEventListener('click',e=>{if(searchBox&&!searchBox.contains(e.target)&&e.target!==searchBtn)searchBox.classList.remove('is-open');if(menuBox&&!menuBox.contains(e.target)&&e.target!==menuBtn)menuBox.classList.remove('is-open');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');}});
})();
