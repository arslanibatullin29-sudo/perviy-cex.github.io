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
    mobilePanel.inert=!open;
    document.querySelector('main').inert=open;
    document.querySelector('footer').inert=open;
    document.body.classList.toggle('menu-open',open);
  };
  if(menuBtn&&mobilePanel){
    menuBtn.addEventListener('click',()=>setMenu(menuBtn.getAttribute('aria-expanded')!=='true'));
    mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
    window.addEventListener('resize',()=>{if(innerWidth>1120)setMenu(false)});
  }

  const form=document.getElementById('leadForm');
  if(form){
    const phoneInput=form.elements.phone;
    const areaInput=form.elements.area;
    const validate=()=>{
      const digits=phoneInput.value.replace(/\D/g,'');
      phoneInput.setCustomValidity(digits.length>=10 && digits.length<=15 ? '' : 'Введите телефон: от 10 до 15 цифр с кодом страны.');
      const raw=areaInput.value.trim();
      const area=Number(raw.replace(',','.'));
      areaInput.setCustomValidity(!raw || (/^\d+(?:[.,]\d+)?$/.test(raw) && area>0 && area<=100000) ? '' : 'Введите положительную площадь в м².');
    };
    form.addEventListener('input',validate);
    form.querySelector('button[type=submit]').addEventListener('click',validate);
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const f=new FormData(this);
      const name=String(f.get('name')||'').trim();
      const phone=String(f.get('phone')||'').trim();
      const area=String(f.get('area')||'').trim();
      validate();
      if(!name || !this.checkValidity()){this.reportValidity();return;}
      const msg='Здравствуйте! Хочу получить предварительный расчёт.\nИмя: '+name+'\nТелефон: '+phone+'\nПлощадь стен: '+(area ? area+' м²' : 'не указана');
      window.location.assign('https://wa.me/79964033063?text='+encodeURIComponent(msg));
    });
  }

  const lightbox=document.getElementById('projectLightbox');
  const lightboxImage=document.getElementById('lightboxImage');
  const lightboxCaption=document.getElementById('lightboxCaption');
  const lightboxClose=document.getElementById('lightboxClose');
  const closeLightbox=()=>{
    if(!lightbox || !lightbox.classList.contains('open')) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightbox.inert=true;
    document.querySelectorAll('header,main,footer').forEach(el=>el.inert=false);
    document.body.classList.remove('lightbox-open');
    lastPhoto?.focus();
    lightboxImage?.removeAttribute('src');
  };
  const openLightbox=(src,caption)=>{
    if(!lightbox||!lightboxImage||!src) return;
    lightboxImage.src=src;
    lightboxImage.alt=caption||'Фотография проекта';
    if(lightboxCaption) lightboxCaption.textContent=caption||'';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    lightbox.inert=false;
    document.querySelectorAll('header,main,footer').forEach(el=>el.inert=true);
    document.body.classList.add('lightbox-open');
    lightboxClose?.focus();
  };
  lightboxClose?.addEventListener('click',closeLightbox);
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});

  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let lastPhoto=null;
  document.querySelectorAll('.collage-shot').forEach(photo=>{
    photo.addEventListener('click',()=>{
      lastPhoto=photo;
      openLightbox(photo.dataset.photoSrc,photo.dataset.photoCaption);
    });
  });

  if(!reduced&&'IntersectionObserver' in window){
    document.body.classList.add('motion-ready');
    const revealTargets=[...document.querySelectorAll('.wall-story-copy,.wall-stack-card,.compare-v3-head,.compare-v3-card,.section-head,.project-gallery,.process-grid,.guarantee-grid,.reviews-grid,.cta-in')];
    revealTargets.forEach(el=>el.classList.add('reveal-item'));
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    revealTargets.forEach(el=>observer.observe(el));
  }

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(lightbox?.classList.contains('open')) closeLightbox();
      else if(menuBtn?.getAttribute('aria-expanded')==='true'){setMenu(false);menuBtn.focus();}
    }
    if(e.key==='Tab' && lightbox?.classList.contains('open')){e.preventDefault();lightboxClose.focus();}
    if(e.key==='Tab' && menuBtn?.getAttribute('aria-expanded')==='true'){
      const items=[menuBtn,...mobilePanel.querySelectorAll('a')];
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
})();
