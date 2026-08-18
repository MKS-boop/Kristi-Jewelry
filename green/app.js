(() => {
  'use strict';

  const pieces = [
    {id:'green-ring',group:'green',src:'E457D36E-5F1A-4B9F-81D8-C728FC636D9C.png',name:'Orbit Ring'},
    {id:'green-necklace',group:'green',src:'7962FDDD-FF5A-4621-85D1-BAA0AE1BD508.png',name:'Aurora Drop Necklace'},
    {id:'green-tiara',group:'green',src:'61AC2F61-DDC9-4E44-AB54-A99A268A681D.png',name:'Kristi Tiara'},
    {id:'green-earrings',group:'green',src:'4907FEF0-19B9-4690-8B51-5B2FA320AD58.png',name:'Lumina Earrings'},
    {id:'green-bracelet',group:'green',src:'Kristi%20bracelet.jpeg?v=20260818-rebuild',name:'Infinity Bracelet'},
    {id:'chip-core',group:'future',src:'product-07.png',name:'Chip Core Necklace'},
    {id:'dna-bracelet',group:'future',src:'1D449C53-DEDC-4DEA-8242-B01BFD074D65.png',name:'DNA Helix Bracelet'},
    {id:'humanoid',group:'future',src:'product-06.png',name:'Humanoid Circuit Pendant'},
    {id:'dna-pendant',group:'future',src:'3DD180E7-34C3-4CF7-BCF8-A7DD275AC341.png',name:'DNA Helix Pendant'},
    {id:'chip-brooch',group:'future',src:'product-08.png',name:'Chip Signature Brooch'}
  ];

  const copy = {
    en:{status:'Concept design · Not for sale',view:'View Concept',modalEyebrow:'Kristi Concept Study',modalNotice:'This is a visual concept preview and is not currently offered for sale.',shopEyebrow:'KRISTI collection',shopTitle:'Shop Kristi',shopIntro:'Approved jewelry is presented first with confirmed KRISTI retail pricing. Concept studies remain clearly identified below as visual previews and are not offered for sale.',contactEyebrow:'Contact',contactTitle:'Order or ask a question',contactP:'Instagram, WhatsApp and email details will be added here when they are ready.',contactButton:'Contact Kristi',tagline:'Jewelry from the Future.'},
    hy:{status:'Կոնցեպտ դիզայն · Վաճառքի չէ',view:'Դիտել կոնցեպտը',modalEyebrow:'KRISTI կոնցեպտ',modalNotice:'Սա տեսողական կոնցեպտ է և այս պահին վաճառքի չի առաջարկվում։',shopEyebrow:'KRISTI collection',shopTitle:'Shop Kristi',shopIntro:'Հաստատված զարդերը ներկայացվում են առաջինը, իսկ կոնցեպտները՝ առանձին preview ձևաչափով։',contactEyebrow:'Կապ',contactTitle:'Պատվիրել կամ հարց տալ',contactP:'Instagram, WhatsApp և email տվյալները կավելացվեն պատրաստ լինելուց հետո։',contactButton:'Կապվել Kristi-ի հետ',tagline:'Jewelry from the Future.'},
    ru:{status:'Концепт · Не продаётся',view:'Открыть концепт',modalEyebrow:'Концепт KRISTI',modalNotice:'Это визуальный концепт, который сейчас не предлагается к продаже.',shopEyebrow:'Коллекция KRISTI',shopTitle:'Shop Kristi',shopIntro:'Подтверждённые изделия показаны первыми, а концепты отмечены отдельно.',contactEyebrow:'Контакт',contactTitle:'Заказать или задать вопрос',contactP:'Instagram, WhatsApp и email будут добавлены позже.',contactButton:'Связаться с Kristi',tagline:'Jewelry from the Future.'},
    de:{status:'Konzept · Nicht zum Verkauf',view:'Konzept ansehen',modalEyebrow:'KRISTI Konzept',modalNotice:'Dies ist eine visuelle Konzeptvorschau und derzeit nicht zum Verkauf.',shopEyebrow:'KRISTI Kollektion',shopTitle:'Shop Kristi',shopIntro:'Bestätigte Schmuckstücke werden zuerst gezeigt; Konzepte sind separat gekennzeichnet.',contactEyebrow:'Kontakt',contactTitle:'Bestellen oder fragen',contactP:'Instagram, WhatsApp und E-Mail werden später ergänzt.',contactButton:'Kristi kontaktieren',tagline:'Jewelry from the Future.'},
    es:{status:'Concepto · No está a la venta',view:'Ver concepto',modalEyebrow:'Concepto KRISTI',modalNotice:'Esta es una vista conceptual y actualmente no está a la venta.',shopEyebrow:'Colección KRISTI',shopTitle:'Shop Kristi',shopIntro:'Las piezas aprobadas aparecen primero y los conceptos se identifican por separado.',contactEyebrow:'Contacto',contactTitle:'Pedir o preguntar',contactP:'Instagram, WhatsApp y email se añadirán más adelante.',contactButton:'Contactar con Kristi',tagline:'Jewelry from the Future.'},
    tr:{status:'Konsept · Satılık değil',view:'Konsepti gör',modalEyebrow:'KRISTI Konsept',modalNotice:'Bu görsel bir konsept önizlemesidir ve şu anda satışta değildir.',shopEyebrow:'KRISTI koleksiyonu',shopTitle:'Shop Kristi',shopIntro:'Onaylı parçalar önce gösterilir; konseptler ayrı olarak işaretlenir.',contactEyebrow:'İletişim',contactTitle:'Sipariş verin veya sorun',contactP:'Instagram, WhatsApp ve e-posta daha sonra eklenecek.',contactButton:'Kristi ile iletişim',tagline:'Jewelry from the Future.'},
    ar:{status:'تصميم تصوري · غير معروض للبيع',view:'عرض التصور',modalEyebrow:'تصور KRISTI',modalNotice:'هذه معاينة تصورية بصرية وليست معروضة للبيع حالياً.',shopEyebrow:'مجموعة KRISTI',shopTitle:'Shop Kristi',shopIntro:'تظهر القطع المعتمدة أولاً، وتُعرض التصورات بشكل منفصل.',contactEyebrow:'اتصال',contactTitle:'اطلب أو اسأل',contactP:'ستتم إضافة Instagram وWhatsApp والبريد الإلكتروني لاحقاً.',contactButton:'اتصل بـ Kristi',tagline:'Jewelry from the Future.'},
    fa:{status:'طرح مفهومی · برای فروش نیست',view:'مشاهده طرح',modalEyebrow:'طرح KRISTI',modalNotice:'این یک پیش‌نمایش مفهومی است و در حال حاضر برای فروش نیست.',shopEyebrow:'مجموعه KRISTI',shopTitle:'Shop Kristi',shopIntro:'قطعات تأییدشده ابتدا نمایش داده می‌شوند و طرح‌ها جدا مشخص می‌شوند.',contactEyebrow:'تماس',contactTitle:'سفارش یا پرسش',contactP:'Instagram، WhatsApp و ایمیل بعداً اضافه می‌شوند.',contactButton:'تماس با Kristi',tagline:'Jewelry from the Future.'},
    zh:{status:'概念设计 · 暂不出售',view:'查看概念',modalEyebrow:'KRISTI 概念',modalNotice:'这是视觉概念预览，目前不出售。',shopEyebrow:'KRISTI 系列',shopTitle:'Shop Kristi',shopIntro:'已确认的珠宝优先展示，概念作品单独标注。',contactEyebrow:'联系',contactTitle:'订购或提问',contactP:'Instagram、WhatsApp 和电子邮件信息稍后添加。',contactButton:'联系 Kristi',tagline:'Jewelry from the Future.'},
    hi:{status:'कॉन्सेप्ट डिज़ाइन · बिक्री के लिए नहीं',view:'कॉन्सेप्ट देखें',modalEyebrow:'KRISTI कॉन्सेप्ट',modalNotice:'यह एक विज़ुअल कॉन्सेप्ट प्रीव्यू है और अभी बिक्री के लिए नहीं है।',shopEyebrow:'KRISTI संग्रह',shopTitle:'Shop Kristi',shopIntro:'स्वीकृत ज्वेलरी पहले दिखाई जाती है और कॉन्सेप्ट अलग चिह्नित हैं।',contactEyebrow:'संपर्क',contactTitle:'ऑर्डर या प्रश्न',contactP:'Instagram, WhatsApp और email बाद में जोड़े जाएंगे।',contactButton:'Kristi से संपर्क करें',tagline:'Jewelry from the Future.'},
    az:{status:'Konsept dizayn · Satışda deyil',view:'Konseptə bax',modalEyebrow:'KRISTI Konsept',modalNotice:'Bu vizual konsept önizləməsidir və hazırda satışda deyil.',shopEyebrow:'KRISTI kolleksiyası',shopTitle:'Shop Kristi',shopIntro:'Təsdiqlənmiş zinət əşyaları əvvəl göstərilir, konseptlər ayrıca qeyd olunur.',contactEyebrow:'Əlaqə',contactTitle:'Sifariş və ya sual',contactP:'Instagram, WhatsApp və email daha sonra əlavə ediləcək.',contactButton:'Kristi ilə əlaqə',tagline:'Jewelry from the Future.'}
  };

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  let language = localStorage.getItem('kristiLanguage') || 'en';

  function t(){ return copy[language] || copy.en; }

  function card(piece){
    const c=t();
    return `<article class="product-card" data-piece-id="${piece.id}" data-search="${piece.name.toLowerCase()}">
      <div class="product-image-wrap"><img class="product-image" src="${piece.src}" alt="${piece.name}"></div>
      <div class="product-card-body"><h2 class="product-name">${piece.name}</h2><p class="product-status">${c.status}</p><button class="text-button concept-button" type="button" data-piece-id="${piece.id}">${c.view}</button></div>
    </article>`;
  }

  function renderCatalog(){
    const green=$('#productGrid');
    const future=$('#conceptProductGrid');
    if(green) green.innerHTML=pieces.filter(p=>p.group==='green').map(card).join('');
    if(future) future.innerHTML=pieces.filter(p=>p.group==='future').map(card).join('');
  }

  function applyLanguage(){
    const c=t();
    document.documentElement.lang=language;
    document.documentElement.dir=['ar','fa'].includes(language)?'rtl':'ltr';
    const selector=$('#languageSelect'); if(selector) selector.value=language;
    const map={shopEyebrow:'shopEyebrow',shopTitle:'shopTitle',shopIntro:'shopIntro',contactEyebrow:'contactEyebrow',contactTitle:'contactTitle',contactP:'contactP',contactButton:'contactButton',tagline:'tagline',modalEyebrow:'modalEyebrow',modalNotice:'modalNotice'};
    Object.entries(map).forEach(([key,id])=>{const el=document.querySelector(`[data-i18n="${id}"]`);if(el)el.textContent=c[key];});
    renderCatalog();
  }

  function scrollTo(target){ const el=$(target); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }

  function openConcept(id){
    const piece=pieces.find(p=>p.id===id); if(!piece) return;
    const modal=$('#conceptModal'); if(!modal) return;
    const image=$('#conceptImage'); const title=$('#conceptTitle'); const desc=$('#conceptDescription');
    if(image){image.src=piece.src;image.alt=piece.name;image.classList.toggle('bracelet-modal-image',piece.id==='green-bracelet');}
    if(title) title.textContent=piece.name;
    if(desc) desc.textContent=t().status;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  }

  function closeConcept(){ const modal=$('#conceptModal'); if(!modal)return; modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }

  function setupHero(){
    $$('.hero-control[data-target]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();scrollTo(el.dataset.target);}));
    const searchBtn=$('.hero-search'); const menuBtn=$('.hero-menu'); const searchPanel=$('#searchPanel'); const menuPanel=$('#menuPanel');
    if(searchBtn&&searchPanel) searchBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();menuPanel?.classList.remove('is-open');searchPanel.classList.toggle('is-open');if(searchPanel.classList.contains('is-open'))setTimeout(()=>$('#siteSearch')?.focus(),0);});
    if(menuBtn&&menuPanel) menuBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();searchPanel?.classList.remove('is-open');menuPanel.classList.toggle('is-open');});
    $$('#menuPanel a[data-target]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();scrollTo(a.dataset.target);menuPanel?.classList.remove('is-open');}));
    document.addEventListener('click',e=>{if(searchPanel&&!searchPanel.contains(e.target)&&e.target!==searchBtn)searchPanel.classList.remove('is-open');if(menuPanel&&!menuPanel.contains(e.target)&&e.target!==menuBtn)menuPanel.classList.remove('is-open');});
  }

  function setupSearch(){
    const input=$('#siteSearch'); if(!input)return;
    input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();$$('.product-card').forEach(card=>{card.hidden=!!q&&!card.dataset.search.includes(q);});const crown=$('.published-static');if(crown)crown.hidden=!!q&&!crown.textContent.toLowerCase().includes(q);});
  }

  function setupGallery(){
    const main=$('#crownMainImage');
    $$('.crown-thumb').forEach(btn=>btn.addEventListener('click',()=>{if(main)main.src=btn.dataset.src;}));
  }

  function setupEvents(){
    document.addEventListener('click',e=>{
      const concept=e.target.closest('.concept-button'); if(concept){e.preventDefault();openConcept(concept.dataset.pieceId);return;}
      if(e.target.closest('[data-close-modal]')) closeConcept();
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeConcept();});
    const selector=$('#languageSelect'); if(selector)selector.addEventListener('change',e=>{language=e.target.value;localStorage.setItem('kristiLanguage',language);applyLanguage();});
  }

  function init(){
    const year=$('#year'); if(year)year.textContent=new Date().getFullYear();
    if(!copy[language])language='en';
    applyLanguage();
    setupHero(); setupSearch(); setupGallery(); setupEvents();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
