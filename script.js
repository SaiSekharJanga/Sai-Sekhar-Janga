/* Kaiser Productions — Interaction Script */

(function () {

  // ------ INTRO SPLASH ------
  const splash = document.getElementById('introSplash');
  if (splash) {
    const canvas = document.getElementById('grainCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      function sizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
      sizeCanvas();
      function drawGrain() {
        const w = canvas.width, h = canvas.height;
        const imgData = ctx.createImageData(w, h);
        for (let i = 0; i < imgData.data.length; i += 4) {
          const v = Math.random() * 255;
          imgData.data[i] = v; imgData.data[i+1] = v; imgData.data[i+2] = v; imgData.data[i+3] = 22;
        }
        ctx.putImageData(imgData, 0, 0);
      }
      setInterval(drawGrain, 110);
    }

    let recSeconds = 0;
    const recTimeEl = document.getElementById('recTime');
    function formatTime(s) {
      return String(Math.floor(s/3600)).padStart(2,'0') + ':' +
             String(Math.floor((s%3600)/60)).padStart(2,'0') + ':' +
             String(Math.floor(s%60)).padStart(2,'0');
    }
    setTimeout(() => {
      setInterval(() => { recSeconds++; if (recTimeEl) recTimeEl.textContent = formatTime(recSeconds); }, 1000);
    }, 2600);

    setTimeout(() => {
      splash.classList.add('hidden');
      setTimeout(() => { splash.style.display = 'none'; }, 900);
    }, 4600);
  }

  // ------ CUSTOM CURSOR ------
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  // ------ NAV SCROLL EFFECT ------
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ------ MOBILE MENU ------
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ------ SCROLL REVEAL ------
  const revealEls = document.querySelectorAll(
    '.section-header, .film-card, .about-inner > *, .manifesto-item, .contact-inner > *, .about-stats .stat'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('js-reveal');
    if (i % 4 === 1) el.classList.add('js-reveal-delay-1');
    if (i % 4 === 2) el.classList.add('js-reveal-delay-2');
    if (i % 4 === 3) el.classList.add('js-reveal-delay-3');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));

  // ------ FILM CARD PARALLAX ON HOVER ------
  document.querySelectorAll('.film-card').forEach(card => {
    const bg = card.querySelector('.film-card-bg');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      if (bg) {
        bg.style.transform = `scale(1.04) translate(${x * 12}px, ${y * 8}px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (bg) bg.style.transform = '';
    });
  });

  // ------ SMOOTH ANCHOR SCROLL ------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ------ MARQUEE PAUSE ON HOVER ------
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const wrap = marqueeTrack.closest('.marquee-wrap');
    if (wrap) {
      wrap.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
      });
      wrap.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
      });
    }
  }

  // ------ STATEMENT SECTION PARALLAX ------
  const statement = document.querySelector('.statement');
  if (statement) {
    window.addEventListener('scroll', () => {
      const rect = statement.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const pseudo = statement.querySelector(':before');
        statement.style.setProperty('--parallax', `${(progress - 0.5) * 40}px`);
      }
    }, { passive: true });
  }

})();
