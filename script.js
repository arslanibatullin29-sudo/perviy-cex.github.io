(()=>{
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  if(!document.querySelector('link[href="sections-v2.css"]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='sections-v2.css';
    document.head.appendChild(link);
  }

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
      const msg='Здравствуйте! Хочу получить предварительный расчёт.\nИмя: '+name+'\nТелефон: '+phone+'\nПлощадь стен: '+(area ? area+' м²' : 'не указана');
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
    lastPhoto?.focus();
  };
  const openLightbox=(src,caption)=>{
    if(!lightbox||!lightboxImage||!src) return;
    lightboxImage.src=src;
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

  if(!reduced){
    let idleTimer=null;
    let cueIndex=0;
    let currentCue=null;
    const isVisible=el=>{
      if(!el) return false;
      const st=getComputedStyle(el);
      if(st.display==='none'||st.visibility==='hidden'||Number(st.opacity)===0) return false;
      const r=el.getBoundingClientRect();
      return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
    };
    const clearCue=()=>{if(currentCue){currentCue.classList.remove('is-calling','idle-active');currentCue=null;}};
    const runCue=()=>{
      clearCue();
      const ctas=[...document.querySelectorAll('.attention-cue')].filter(isVisible);
      const price=[...document.querySelectorAll('.price-card')].filter(isVisible);
      const candidates=[...ctas,...price];
      if(candidates.length){
        currentCue=candidates[cueIndex%candidates.length];
        cueIndex++;
        if(currentCue.classList.contains('price-card')) currentCue.classList.add('idle-active');
        else currentCue.classList.add('is-calling');
        const cue=currentCue;
        setTimeout(()=>{cue.classList.remove('is-calling','idle-active');if(currentCue===cue)currentCue=null;},1500);
      }
      idleTimer=setTimeout(runCue,11000);
    };
    const resetIdle=()=>{clearTimeout(idleTimer);clearCue();idleTimer=setTimeout(runCue,7000);};
    ['pointerdown','keydown','wheel','touchstart'].forEach(evt=>window.addEventListener(evt,resetIdle,{passive:true}));
    document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(idleTimer);clearCue();}else resetIdle();});
    resetIdle();
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);closeLightbox();}});
})();
