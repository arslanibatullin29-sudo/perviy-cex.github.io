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
  if(lightbox&&lightboxImage){
    document.querySelectorAll('[data-project-src]').forEach(button=>{
      button.addEventListener('click',()=>{
        lightboxImage.src=button.dataset.projectSrc||'';
        lightboxImage.alt=button.dataset.projectCaption||'Фотография проекта';
        if(lightboxCaption) lightboxCaption.textContent=button.dataset.projectCaption||'';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden','false');
        document.body.classList.add('lightbox-open');
        lightboxClose?.focus();
      });
    });
    lightboxClose?.addEventListener('click',closeLightbox);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
  }

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      setMenu(false);
      closeLightbox();
    }
  });

  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){
    let idleTimer=null;
    let idleStep=0;
    let active=null;
    const selectors=['.btn-attention','.btn-slide','.price-card','.phone-ring','.btn-call'];
    const isVisible=el=>{
      if(!el) return false;
      const style=getComputedStyle(el);
      if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0) return false;
      const r=el.getBoundingClientRect();
      return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
    };
    const clearActive=()=>{
      if(active){active.classList.remove('idle-active');active=null;}
    };
    const runIdleCue=()=>{
      clearActive();
      const candidates=selectors.flatMap(s=>[...document.querySelectorAll(s)]).filter(isVisible);
      if(candidates.length){
        active=candidates[idleStep%candidates.length];
        active.classList.remove('idle-active');
        void active.offsetWidth;
        active.classList.add('idle-active');
        const cue=active;
        setTimeout(()=>{cue.classList.remove('idle-active');if(active===cue)active=null;},1500);
        idleStep++;
      }
      idleTimer=setTimeout(runIdleCue,10500);
    };
    const resetIdle=()=>{
      clearTimeout(idleTimer);
      clearActive();
      idleTimer=setTimeout(runIdleCue,7500);
    };
    ['pointerdown','keydown','wheel','touchstart'].forEach(evt=>window.addEventListener(evt,resetIdle,{passive:true}));
    document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(idleTimer);clearActive();}else resetIdle();});
    resetIdle();
  }
})();