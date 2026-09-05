const STORE_KEY='kristiJewelerPortalV01';
const state={submissions:JSON.parse(localStorage.getItem(STORE_KEY)||'[]')};
const tabs=[...document.querySelectorAll('.tab')];
const views=[...document.querySelectorAll('.view')];
const form=document.getElementById('jewelryForm');
const photoInput=document.getElementById('photoInput');
const photoPreview=document.getElementById('photoPreview');
const formMessage=document.getElementById('formMessage');
let selectedPhotos=[];
let editingId=null;
const photoFiles=new Map();

function persist(){localStorage.setItem(STORE_KEY,JSON.stringify(state.submissions));}
function go(view){tabs.forEach(t=>t.classList.toggle('is-active',t.dataset.view===view));views.forEach(v=>v.classList.toggle('is-active',v.id===view));window.scrollTo({top:0,behavior:'smooth'});}
tabs.forEach(t=>t.addEventListener('click',()=>go(t.dataset.view)));
document.addEventListener('click',e=>{const target=e.target.closest('[data-go]');if(target)go(target.dataset.go);});

function escapeHTML(value=''){return String(value).replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));}
function money(value){return Number(value).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function counts(){
  document.getElementById('draftCount').textContent=state.submissions.filter(x=>x.status==='Draft').length;
  document.getElementById('pendingCount').textContent=state.submissions.filter(x=>x.status==='Pending Review').length;
  const publishedCount=document.getElementById('publishedCount');
  if(publishedCount) publishedCount.textContent=state.submissions.filter(x=>x.status==='Published').length;
}
function render(){
  counts();
  const list=document.getElementById('submissionList');
  const review=document.getElementById('reviewList');
  if(!state.submissions.length) list.innerHTML='<p class="empty">No submissions yet. Add the first jewelry piece to begin.</p>';
  else list.innerHTML=[...state.submissions].reverse().map(x=>{
    const retail=x.status==='Published'&&x.retailPrice?` · $${money(x.retailPrice)} retail price`:'';
    const editable=['Draft','Returned'].includes(x.status)?`<button class="button secondary" data-edit="${escapeHTML(x.id)}">Edit / Continue Draft</button>`:'';
    return `<article class="submission"><div><h3>${escapeHTML(x.name||'Untitled draft')}</h3><p>${escapeHTML(x.brand)} · ${escapeHTML(x.material)} · $${money(x.basePrice)} base price${retail}</p></div><div class="review-actions"><span class="status-badge">${escapeHTML(x.status)}</span>${editable}</div></article>`;
  }).join('');
  const pending=state.submissions.filter(x=>x.status==='Pending Review');
  if(!pending.length) review.innerHTML='<p class="empty">No jewelry is waiting for review.</p>';
  else review.innerHTML=pending.map(x=>`<article class="review-card" data-id="${x.id}"><div><h3>${escapeHTML(x.name)}</h3><p>${escapeHTML(x.brand)} · ${escapeHTML(x.country)} · ${escapeHTML(x.availability)}<br>Jeweler base price: $${money(x.basePrice)}</p></div><div class="review-actions"><input class="retail-input" type="number" min="0" step="0.01" placeholder="Retail USD" aria-label="Retail price"><button class="button secondary" data-action="reject">Return</button><button class="button" data-action="approve">Approve</button></div></article>`).join('');
}

function renderPhotos(){
  photoPreview.innerHTML='';
  selectedPhotos.forEach((file,index)=>{
    const box=document.createElement('div');box.className='photo-thumb';
    const img=document.createElement('img');img.alt='Jewelry preview';img.src=URL.createObjectURL(file);box.appendChild(img);
    const remove=document.createElement('button');remove.type='button';remove.className='photo-remove';remove.textContent='×';remove.title='Remove photo';remove.addEventListener('click',()=>{selectedPhotos.splice(index,1);renderPhotos();validatePhotos();});box.appendChild(remove);
    photoPreview.appendChild(box);
  });
}
function validatePhotos(){
  const existing=state.submissions.find(x=>x.id===editingId);
  const count=selectedPhotos.length||(existing?.photoNames||[]).length;
  if(count && count<3) formMessage.textContent=`${count} photo${count===1?'':'s'} selected — add ${3-count} more.`;
  else if(count>8) formMessage.textContent='Maximum 8 photos are allowed.';
  else formMessage.textContent='';
  return count>=3&&count<=8;
}
photoInput.addEventListener('change',()=>{
  const incoming=[...photoInput.files];
  const room=8-selectedPhotos.length;
  if(room>0) selectedPhotos.push(...incoming.slice(0,room));
  photoInput.value='';
  renderPhotos();validatePhotos();
});

function dataFromForm(status){
  const data=new FormData(form);
  const existing=state.submissions.find(x=>x.id===editingId);
  return {id:existing?.id||(crypto.randomUUID?crypto.randomUUID():String(Date.now())),name:data.get('name'),brand:data.get('brand'),country:data.get('country'),material:data.get('material'),weight:data.get('weight'),dimensions:data.get('dimensions'),quantity:data.get('quantity'),availability:data.get('availability'),basePrice:data.get('basePrice'),description:data.get('description'),photoNames:selectedPhotos.length?selectedPhotos.map(f=>f.name):(existing?.photoNames||[]),status,createdAt:existing?.createdAt||new Date().toISOString()};
}
function save(status){
  if(status==='Pending Review'&&!form.reportValidity()) return;
  if(status==='Pending Review'&&!validatePhotos()){formMessage.textContent='3 to 8 photos are required for a submission.';return;}
  const item=dataFromForm(status);
  const index=state.submissions.findIndex(x=>x.id===item.id);
  if(index===-1) state.submissions.push(item);else state.submissions[index]=item;
  if(selectedPhotos.length) photoFiles.set(item.id,[...selectedPhotos]);
  persist();render();
  form.reset();selectedPhotos=[];photoPreview.innerHTML='';
  editingId=null;
  formMessage.textContent=status==='Draft'?'Draft saved in this browser.':'Submitted to Pending Review in this v0.1 prototype.';
  setTimeout(()=>go('dashboard'),650);
}
document.getElementById('saveDraft').addEventListener('click',()=>save('Draft'));
form.addEventListener('submit',e=>{e.preventDefault();save('Pending Review');});

document.getElementById('submissionList').addEventListener('click',e=>{
  const button=e.target.closest('[data-edit]');if(!button)return;
  const item=state.submissions.find(x=>x.id===button.dataset.edit);if(!item||!['Draft','Returned'].includes(item.status))return;
  editingId=item.id;form.reset();
  Object.entries(item).forEach(([name,value])=>{const field=form.elements.namedItem(name);if(field&&!field.disabled)field.value=value??'';});
  selectedPhotos=[...(photoFiles.get(item.id)||[])];renderPhotos();validatePhotos();go('add');
});

document.getElementById('reviewList').addEventListener('click',e=>{
  const button=e.target.closest('[data-action]');if(!button)return;
  const card=button.closest('.review-card');const item=state.submissions.find(x=>x.id===card.dataset.id);if(!item)return;
  if(button.dataset.action==='approve'){
    const retailInput=card.querySelector('.retail-input');const retail=retailInput.value;
    if(!retail||!retailInput.checkValidity()){retailInput.reportValidity();retailInput.focus();return;}
    item.retailPrice=retail;item.status='Published';
  }else item.status='Returned';
  persist();render();
});

render();
