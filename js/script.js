
    // Reveal on scroll con IntersectionObserver
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // Navbar transparente -> sólida con scroll
    const navbar = document.getElementById('navbar');
    const onScrollNav = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    onScrollNav();
    window.addEventListener('scroll', onScrollNav, { passive: true });

    // Active link dinámico
    const navLinks = [...document.querySelectorAll('#navLinks a')];
    const sections = navLinks.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const updateActive = () => {
      const current = window.scrollY + 130;
      let id = '#inicio';
      sections.forEach((section) => {
        if (current >= section.offsetTop) id = `#${section.id}`;
      });
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === id));
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });

    // Menú móvil fullscreen
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = [...mobileMenu.querySelectorAll('a')];

    const closeMenu = () => {
      mobileToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      mobileToggle.setAttribute('aria-label', 'Abrir menú móvil');
    };

    mobileToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      mobileToggle.setAttribute('aria-label', open ? 'Cerrar menú móvil' : 'Abrir menú móvil');
    });

    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
