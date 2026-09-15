(()=>{
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  /* Keep the hero intact; rebuild only the two sections below it. */
  if(!document.querySelector('link[href="sections-v2.css"]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='sections-v2.css';
    document.head.appendChild(link);
  }

  const wallsSection=document.getElementById('walls');
  const wallsWrap=wallsSection?.querySelector('.technology');
  if(wallsSection&&wallsWrap){
    wallsSection.classList.add('wall-explain');
    wallsWrap.className='wrap wall-explain-inner';
    wallsWrap.innerHTML=`
      <div class="wall-explain-head">
        <p class="eyebrow">Просто о технологии</p>
        <h2>Что такое <span class="gold">натяжная стена?</span></h2>
        <p><strong>Это отдельная ровная поверхность перед существующей стеной.</strong> По периметру крепится профиль, в него заправляется тканевое полотно — оно закрывает неровное основание и становится готовой декоративной поверхностью.</p>
      </div>
      <div class="wall-explain-flow" aria-label="Как устроена натяжная стена">
        <article class="wall-explain-card">
          <img src="assets/before.webp" loading="lazy" decoding="async" alt="Исходная стена до монтажа">
          <div class="wall-explain-copy"><b>1</b><h3>Есть исходная стена</h3><p>Её не нужно выводить в идеальную плоскость под покраску или обои.</p></div>
        </article>
        <article class="wall-explain-card">
          <img src="assets/process.webp" loading="lazy" decoding="async" alt="Монтаж профиля и тканевого полотна">
          <div class="wall-explain-copy"><b>2</b><h3>Ставим профиль и полотно</h3><p>Профиль задаёт геометрию, а тканевое полотно натягивается и фиксируется по периметру.</p></div>
        </article>
        <article class="wall-explain-card">
          <img src="assets/after.webp" loading="lazy" decoding="async" alt="Готовая натяжная стена в интерьере">
          <div class="wall-explain-copy"><b>3</b><h3>Получается готовая стена</h3><p>Ровная декоративная поверхность без долгого выведения основания штукатуркой и шпаклёвкой.</p></div>
        </article>
      </div>
      <div class="wall-explain-bottom">
        <div class="wall-definition"><strong>Главная разница с обоями и покраской</strong><p>Обои и краска наносятся на подготовленное основание. Натяжное полотно формирует собственную ровную плоскость и закрывает стену за собой.</p></div>
        <div class="wall-benefits">
          <span><b>1–2 дня</b><small>обычно занимает монтаж</small></span>
          <span><b>Без шлифовки</b><small>нет этапа пыльного выведения финишной поверхности</small></span>
          <span><b>Сразу готово</b><small>после монтажа можно заносить мебель</small></span>
        </div>
      </div>`;
  }

  const compareSection=document.getElementById('compare');
  const compareWrap=compareSection?.querySelector('.wrap');
  if(compareSection&&compareWrap){
    compareSection.classList.remove('compare-section','visual-compare');
    compareSection.classList.add('compare-two');
    compareWrap.innerHTML=`
      <div class="compare-two-head">
        <p class="eyebrow">Два способа получить ровную стену</p>
        <h2>Одна цель. <span class="gold">Совсем разный путь.</span></h2>
        <p>Слева — классическая подготовка основания. Справа — натяжная стена.</p>
      </div>
      <div class="compare-two-grid">
        <article class="compare-two-card bad">
          <img src="https://images.unsplash.com/photo-1764697757348-e3c87b076310?auto=format&fit=crop&fm=jpg&q=82&w=1600" loading="lazy" decoding="async" alt="Пыльная классическая отделка стены">
          <div class="compare-two-content">
            <span class="compare-two-label">Обычная отделка</span>
            <h3>Сначала подготовить стену</h3>
            <p>Чтобы получить ровный финиш, основание проходит несколько отдельных этапов.</p>
            <div class="compare-two-route" aria-label="Этапы обычной отделки"><span>Штукатурка</span><i>→</i><span>Шпаклёвка</span><i>→</i><span>Сушка</span><i>→</i><span>Шлифовка</span><i>→</i><span>Финиш</span></div>
            <div class="compare-two-badges"><span>Пыль</span><span>Мокрые процессы</span><span>Несколько этапов</span></div>
          </div>
        </article>
        <div class="compare-two-vs" aria-hidden="true">VS</div>
        <article class="compare-two-card good">
          <img src="assets/after.webp" loading="lazy" decoding="async" alt="Готовая натяжная стена в интерьере">
          <div class="compare-two-content">
            <span class="compare-two-label">Натяжная стена</span>
            <h3>Сразу создать новую плоскость</h3>
            <p>Профиль и полотно закрывают исходную стену и формируют готовую ровную поверхность.</p>
            <div class="compare-two-route" aria-label="Этапы натяжной стены"><span>Профиль</span><i>→</i><span>Полотно</span><i>→</i><span>Готовая поверхность</span></div>
            <div class="compare-two-badges"><span>1–2 дня</span><span>Без штукатурки и шлифовки</span><span>Можно заносить мебель</span></div>
          </div>
        </article>
      </div>
      <div class="compare-two-footer"><strong>Меньше строительных этапов. <span>Быстрее готовый интерьер.</span></strong><a class="btn btn-primary attention-cue" href="#measure">Рассчитать стоимость</a></div>`;

    const badPhoto=compareWrap.querySelector('.compare-two-card.bad img');
    badPhoto?.addEventListener('error',()=>{
      const card=badPhoto.closest('.compare-two-card');
      card?.classList.add('image-missing');
      badPhoto.src='assets/before.webp';
      badPhoto.style.display='block';
    },{once:true});
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
      const msg='Здравствуйте! Хочу получить предварительный расчёт.\nИмя: '+name+'\nТелефон: '+phone+'\nПлощадь: '+(area||'не указана')+' м²';
      window.open('https://wa.me/79964033063?text='+encodeURIComponent(msg),'_blank','noopener');
    });
  }

  document.querySelectorAll('.cmp-shot img').forEach(img=>{
    img.addEventListener('error',()=>{
      img.style.display='none';
      img.closest('.cmp-shot')?.classList.add('is-image-missing');
    },{once:true});
  });

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

  const gallery=document.getElementById('projectGallery');
  const stage=document.getElementById('projectMain');
  const mainImage=document.getElementById('projectMainImage');
  const count=document.getElementById('projectCount');
  const eyebrow=document.getElementById('projectEyebrow');
  const title=document.getElementById('projectTitle');
  const thumbs=[...document.querySelectorAll('.project-thumb')];
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let galleryIndex=Math.max(0,thumbs.findIndex(t=>t.classList.contains('is-active')));
  let galleryTimer=null;
  let galleryPaused=false;

  const restartGalleryProgress=()=>{
    if(!gallery||reduced) return;
    gallery.classList.remove('is-playing');
    void gallery.offsetWidth;
    gallery.classList.add('is-playing');
  };
  const scheduleGallery=()=>{
    clearTimeout(galleryTimer);
    if(reduced||galleryPaused||!thumbs.length) return;
    galleryTimer=setTimeout(()=>{showSlide(galleryIndex+1);scheduleGallery();},5400);
  };
  const showSlide=(index,{manual=false}={})=>{
    if(!stage||!mainImage||!thumbs.length) return;
    galleryIndex=(index+thumbs.length)%thumbs.length;
    const item=thumbs[galleryIndex];
    const src=item.dataset.src||'';
    if(!src) return;
    stage.classList.add('is-changing');
    const preload=new Image();
    preload.onload=()=>{
      mainImage.src=src;
      mainImage.alt=item.dataset.caption||item.dataset.title||'Фотография проекта';
      stage.dataset.projectSrc=src;
      stage.dataset.projectCaption=item.dataset.caption||item.dataset.title||'';
      if(count) count.textContent=String(galleryIndex+1).padStart(2,'0')+' / '+String(thumbs.length).padStart(2,'0');
      if(eyebrow) eyebrow.textContent=item.dataset.eyebrow||'';
      if(title) title.textContent=item.dataset.title||'';
      thumbs.forEach((t,i)=>{
        const active=i===galleryIndex;
        t.classList.toggle('is-active',active);
        t.setAttribute('aria-selected',String(active));
      });
      requestAnimationFrame(()=>stage.classList.remove('is-changing'));
      restartGalleryProgress();
    };
    preload.onerror=()=>{
      stage.classList.remove('is-changing');
      if(!manual) scheduleGallery();
    };
    preload.src=src;
    if(manual) scheduleGallery();
  };
  thumbs.forEach((thumb,i)=>thumb.addEventListener('click',()=>showSlide(i,{manual:true})));
  stage?.addEventListener('click',()=>openLightbox(stage.dataset.projectSrc||mainImage?.src||'',stage.dataset.projectCaption||title?.textContent||''));
  gallery?.addEventListener('mouseenter',()=>{galleryPaused=true;clearTimeout(galleryTimer)});
  gallery?.addEventListener('mouseleave',()=>{galleryPaused=false;scheduleGallery()});
  gallery?.addEventListener('focusin',()=>{galleryPaused=true;clearTimeout(galleryTimer)});
  gallery?.addEventListener('focusout',()=>{galleryPaused=false;scheduleGallery()});
  if(gallery){restartGalleryProgress();scheduleGallery();}

  if(!reduced&&'IntersectionObserver' in window){
    document.body.classList.add('motion-ready');
    const revealTargets=[...document.querySelectorAll('.wall-explain-head,.wall-explain-card,.wall-explain-bottom,.compare-two-head,.compare-two-card,.compare-two-footer,.section-head,.project-gallery,.process-grid,.guarantee-grid,.reviews-grid,.cta-in')];
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
