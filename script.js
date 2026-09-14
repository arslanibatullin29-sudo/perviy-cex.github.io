(()=>{
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
const menuBtn=document.getElementById('menuBtn');
const mobilePanel=document.getElementById('mobilePanel');
const setMenu=open=>{
if(!menuBtn||!mobilePanel) return;
menuBtn.setAttribute('aria-expanded',String(open));
mobilePanel.classList.toggle('open',open);
mobilePanel.setAttribute('aria-hidden',String(!open));
document.body.classList.toggle('menu-open',open);
};
if(menuBtn&&mobilePanel){
menuBtn.addEventListener('click',()=>setMenu(menuBtn.getAttribute('aria-expanded')!=='true'));
mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
window.addEventListener('resize',()=>{if(innerWidth>1120)setMenu(false)});
}
const form=document.getElementById('leadForm');
if(form){
form.addEventListener('submit',function(e){
e.preventDefault();
const f=new FormData(this);
const name=String(f.get('name')||'').trim();
const phone=String(f.get('phone')||'').trim();
const area=String(f.get('area')||'').trim();
if(!name||!phone){this.reportValidity();return;}
const msg='Здравствуйте! Хочу получить предварительный расчёт.\nИмя: '+name+'\nТелефон: '+phone+'\nПлощадь: '+(area||'не указана')+' м²';
window.open('https://wa.me/79964033063?text='+encodeURIComponent(msg),'_blank','noopener');
});
}
const lightbox=document.getElementById('projectLightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCaption=document.getElementById('lightboxCaption');
const lightboxClose=document.getElementById('lightboxClose');
const closeLightbox=()=>{
if(!lightbox) return;
lightbox.classList.remove('open');
lightbox.setAttribute('aria-hidden','true');
document.body.classList.remove('lightbox-open');
};
const openLightbox=(src,caption)=>{
if(!lightbox||!lightboxImage) return;
lightboxImage.src=src||'';
lightboxImage.alt=caption||'Фотография проекта';
if(lightboxCaption) lightboxCaption.textContent=caption||'';
lightbox.classList.add('open');
lightbox.setAttribute('aria-hidden','false');
document.body.classList.add('lightbox-open');
lightboxClose?.focus();
};
lightboxClose?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const gallery=document.getElementById('projectGallery');
const main=document.getElementById('projectMain');
const mainImage=document.getElementById('projectMainImage');
const eyebrow=document.getElementById('projectEyebrow');
const title=document.getElementById('projectTitle');
const count=document.getElementById('projectCount');
const thumbs=[...document.querySelectorAll('.project-thumb')];
let galleryIndex=Math.max(0,thumbs.findIndex(t=>t.classList.contains('is-active')));
let galleryTimer=null;
let galleryPaused=false;
const restartProgress=()=>{
if(!gallery||reduced) return;
gallery.classList.remove('is-playing');
void gallery.offsetWidth;
gallery.classList.add('is-playing');
};
const selectProject=(index,manual=false)=>{
if(!thumbs.length||!main||!mainImage) return;
galleryIndex=(index+thumbs.length)%thumbs.length;
const t=thumbs[galleryIndex];
thumbs.forEach((el,i)=>{
const active=i===galleryIndex;
el.classList.toggle('is-active',active);
el.setAttribute('aria-selected',String(active));
});
main.classList.add('is-changing');
setTimeout(()=>{
mainImage.src=t.dataset.src||'';
mainImage.alt=t.dataset.caption||'Фотография проекта';
if(eyebrow) eyebrow.textContent=t.dataset.eyebrow||'';
if(title) title.textContent=t.dataset.title||'';
if(count) count.textContent=String(galleryIndex+1).padStart(2,'0')+' / '+String(thumbs.length).padStart(2,'0');
main.dataset.projectSrc=t.dataset.src||'';
main.dataset.projectCaption=t.dataset.caption||'';
main.classList.remove('is-changing');
restartProgress();
},150);
if(manual) scheduleGallery();
};
const scheduleGallery=()=>{
clearTimeout(galleryTimer);
if(reduced||galleryPaused||!thumbs.length) return;
restartProgress();
galleryTimer=setTimeout(()=>selectProject(galleryIndex+1),4800);
};
thumbs.forEach((t,i)=>t.addEventListener('click',()=>selectProject(i,true)));
main?.addEventListener('click',()=>openLightbox(main.dataset.projectSrc,main.dataset.projectCaption));
gallery?.addEventListener('mouseenter',()=>{galleryPaused=true;clearTimeout(galleryTimer);gallery?.classList.remove('is-playing');});
gallery?.addEventListener('mouseleave',()=>{galleryPaused=false;scheduleGallery();});
gallery?.addEventListener('focusin',()=>{galleryPaused=true;clearTimeout(galleryTimer);gallery?.classList.remove('is-playing');});
gallery?.addEventListener('focusout',()=>{galleryPaused=false;scheduleGallery();});
scheduleGallery();
document.addEventListener('keydown',e=>{
if(e.key==='Escape'){
setMenu(false);
closeLightbox();
}
});
if(!reduced){
document.body.classList.add('motion-ready');
const revealTargets=[...document.querySelectorAll('.compare-card,.compare-punch,.project-stage,.project-thumb,.process-item,.metric,.review-point')];
revealTargets.forEach((el,i)=>{
el.classList.add('reveal-item');
el.style.transitionDelay=((i%4)*70)+'ms';
});
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}
});
},{threshold:.12,rootMargin:'0px 0px -5%'});
revealTargets.forEach(el=>observer.observe(el));
let idleTimer=null;
let idleStep=0;
let active=null;
const selectors=['.hero-actions .btn-attention','.price-card','.header-actions .btn-slide','.cta .btn-attention','.phone-ring','.btn-call'];
const isVisible=el=>{
if(!el) return false;
const style=getComputedStyle(el);
if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0) return false;
const r=el.getBoundingClientRect();
return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
};
const clearActive=()=>{if(active){active.classList.remove('idle-active');active=null;}};
const runIdleCue=()=>{
clearActive();
const candidates=selectors.flatMap(s=>[...document.querySelectorAll(s)]).filter(isVisible);
if(candidates.length){
active=candidates[idleStep%candidates.length];
active.classList.remove('idle-active');
void active.offsetWidth;
active.classList.add('idle-active');
const cue=active;
setTimeout(()=>{cue.classList.remove('idle-active');if(active===cue)active=null;},1600);
idleStep++;
}
idleTimer=setTimeout(runIdleCue,9000);
};
const resetIdle=()=>{
clearTimeout(idleTimer);
clearActive();
idleTimer=setTimeout(runIdleCue,5200);
};
['pointerdown','keydown','wheel','touchstart'].forEach(evt=>window.addEventListener(evt,resetIdle,{passive:true}));
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(idleTimer);clearActive();}else resetIdle();});
resetIdle();
}
})();