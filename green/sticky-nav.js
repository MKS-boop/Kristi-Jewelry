(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const header=$('.site-sticky-nav');
  if(!header) return;
  const searchBtn=$('[data-sticky-search]',header);
  const menuBtn=$('[data-sticky-menu]',header);
  const searchBox=$('.sticky-search-box',header);
  const menuBox=$('.sticky-menu-box',header);
  const searchInput=$('#stickySiteSearch',header);
  const scrollToTarget=(selector)=>{const el=$(selector);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});};
  $$('[data-sticky-target]',header).forEach(link=>link.addEventListener('click',e=>{e.preventDefault();scrollToTarget(link.dataset.stickyTarget);searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');}));
  searchBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();menuBox?.classList.remove('is-open');searchBox?.classList.toggle('is-open');if(searchBox?.classList.contains('is-open'))setTimeout(()=>searchInput?.focus(),0);});
  menuBtn?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();searchBox?.classList.remove('is-open');menuBox?.classList.toggle('is-open');});
  searchInput?.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();$$('.product-card').forEach(card=>{card.hidden=!!q&&!String(card.dataset.search||'').includes(q);});const crown=$('.published-static');if(crown)crown.hidden=!!q&&!crown.textContent.toLowerCase().includes(q);if(q)scrollToTarget('#shop');});
  document.addEventListener('click',e=>{if(searchBox&&!searchBox.contains(e.target)&&e.target!==searchBtn)searchBox.classList.remove('is-open');if(menuBox&&!menuBox.contains(e.target)&&e.target!==menuBtn)menuBox.classList.remove('is-open');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){searchBox?.classList.remove('is-open');menuBox?.classList.remove('is-open');}});
})();
