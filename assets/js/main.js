/**
* Template Name: iPortfolio - v3.9.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * GSAP animations
   */
  const initGsapAnimations = () => {
    if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const { gsap } = window

    if (window.ScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger)
    }

    gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    })
      .from('#hero .hero-copy', {
        autoAlpha: 0,
        y: 40,
        duration: 0.9
      })
      .from('#hero .hero-eyebrow', {
        autoAlpha: 0,
        y: 16,
        duration: 0.45
      }, '-=0.55')
      .from('#hero h1', {
        autoAlpha: 0,
        y: 22,
        duration: 0.58
      }, '-=0.28')
      .from('#hero p', {
        autoAlpha: 0,
        y: 18,
        duration: 0.5
      }, '-=0.32')
      .from('#hero .hero-buttons a', {
        autoAlpha: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.45
      }, '-=0.28')
      .from('#hero .hero-socials a', {
        autoAlpha: 0,
        y: 14,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.35
      }, '-=0.22')
      .from('#hero .hero-visual', {
        autoAlpha: 0,
        x: 28,
        scale: 0.92,
        duration: 0.72
      }, '-=0.72')

    if (select('#hero .hero-visual')) {
      gsap.to('#hero .hero-visual', {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    if (!window.ScrollTrigger) {
      return
    }

    const createScrollReveal = (selector, options = {}) => {
      gsap.utils.toArray(selector).forEach((element, index) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: options.y ?? 32,
          duration: options.duration ?? 0.8,
          ease: options.ease ?? 'power3.out',
          delay: Math.min(index * (options.staggerStep ?? 0.08), options.maxDelay ?? 0.24),
          scrollTrigger: {
            trigger: element,
            start: options.start ?? 'top 84%',
            once: true
          }
        })
      })
    }

    createScrollReveal('.section-title', { y: 26, duration: 0.75 })
    createScrollReveal('.stats-card', { y: 38, staggerStep: 0.1 })
    createScrollReveal('.resume-card', { y: 38, staggerStep: 0.08 })
    createScrollReveal('.portfolio-item', { y: 42, staggerStep: 0.08, start: 'top 88%' })
    createScrollReveal('.feedback-widget', { y: 24, duration: 0.6, maxDelay: 0 })

    gsap.utils.toArray('.resume-timeline-line').forEach((line) => {
      gsap.to(line, {
        scaleY: 1,
        duration: 1.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line.closest('.resume-column') || line,
          start: 'top 76%',
          once: true
        }
      })
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  initGsapAnimations()

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
          if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh()
          }
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Dark/Light Mode Toggle
   */
  const themeCheckbox = document.getElementById('theme-checkbox');
  const body = document.body;

  // Load theme preference from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeCheckbox.checked = true;
  }

  // Toggle theme
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', function() {
      body.classList.toggle('dark-mode');
      const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }

  /**
   * Feedback Widget
   */
  const feedbackToggle = document.getElementById('feedbackToggle');
  const feedbackPopup = document.getElementById('feedbackPopup');
  const feedbackClose = document.getElementById('feedbackClose');
  const emojiOptions = document.querySelectorAll('.emoji-option');
  const skipBtn = document.getElementById('skipBtn');
  const nextBtn = document.getElementById('nextBtn');
  let selectedRating = null;

  // Toggle feedback popup
  if (feedbackToggle) {
    feedbackToggle.addEventListener('click', function() {
      feedbackPopup.classList.toggle('active');
    });
  }

  // Close feedback popup
  if (feedbackClose) {
    feedbackClose.addEventListener('click', function() {
      feedbackPopup.classList.remove('active');
    });
  }

  // Handle emoji rating selection
  emojiOptions.forEach(option => {
    option.addEventListener('click', function() {
      emojiOptions.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      selectedRating = this.getAttribute('data-rating');
      nextBtn.disabled = false;
    });
  });

  // Skip feedback
  if (skipBtn) {
    skipBtn.addEventListener('click', function() {
      feedbackPopup.classList.remove('active');
      selectedRating = null;
      emojiOptions.forEach(opt => opt.classList.remove('selected'));
      nextBtn.disabled = true;
    });
  }

  // Submit feedback
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (selectedRating) {
      
        console.log('User rating:', selectedRating);
        
        // Close popup and reset
        feedbackPopup.classList.remove('active');
        selectedRating = null;
        emojiOptions.forEach(opt => opt.classList.remove('selected'));
        nextBtn.disabled = true;

        // Optional: Show success message
        alert('Thank you for your feedback!');
      }
    });
  }

  /**
   * GitHub stats auto-fill
   */
  const githubStatsCard = document.querySelector('[data-github-user]');

  const updateGitHubStats = async () => {
    if (!githubStatsCard || !window.fetch) {
      return;
    }

    const username = githubStatsCard.getAttribute('data-github-user');
    if (!username) {
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('GitHub API request failed');
      }

      const profile = await response.json();

      const reposLink = document.getElementById('github-repos-link');
      const gistsLink = document.getElementById('github-gists-link');
      const followersLink = document.getElementById('github-followers-link');
      const avatar = document.getElementById('github-avatar');

      if (reposLink) {
        reposLink.textContent = `${profile.public_repos} Public Repos`;
        reposLink.href = `${profile.html_url}?tab=repositories`;
      }

      if (gistsLink) {
        gistsLink.textContent = `${profile.public_gists} Gists`;
        gistsLink.href = `https://gist.github.com/${username}`;
      }

      if (followersLink) {
        followersLink.textContent = `${profile.followers} Followers`;
        followersLink.href = `${profile.html_url}?tab=followers`;
      }

      if (avatar && profile.avatar_url) {
        avatar.src = profile.avatar_url;
      }
    } catch (error) {
      console.warn('Unable to update GitHub stats:', error);
    }
  };

  updateGitHubStats();

  /**
   * Medium profile auto-link
   */
  const mediumStatsCard = document.querySelector('[data-medium-url]');
  const mediumProfileLink = document.getElementById('medium-profile-link');

  if (mediumStatsCard && mediumProfileLink) {
    const mediumUrl = mediumStatsCard.getAttribute('data-medium-url');

    if (mediumUrl) {
      mediumProfileLink.href = mediumUrl;
      mediumProfileLink.textContent = 'View Articles';
    }
  }

  /**
   * Schedule popup modal
   */
  const scheduleModal = document.getElementById('scheduleModal');
  const scheduleBackdrop = document.getElementById('scheduleModalBackdrop');
  const scheduleModalClose = document.getElementById('scheduleModalClose');
  const scheduleIframe = document.getElementById('scheduleIframe');
  const scheduleFallbackLink = document.getElementById('scheduleFallbackLink');
  const scheduleTriggers = document.querySelectorAll('.js-open-schedule');

  const scheduleUrl = document.body.getAttribute('data-schedule-url') || 'https://calendar.google.com/calendar/appointments/schedules';

  const openScheduleModal = () => {
    if (!scheduleModal) {
      return;
    }

    scheduleModal.classList.add('active');
    scheduleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (scheduleIframe && !scheduleIframe.src) {
      scheduleIframe.src = scheduleUrl;
    }

    if (scheduleFallbackLink) {
      scheduleFallbackLink.href = scheduleUrl;
    }

    if (window.gsap) {
      window.gsap.fromTo(scheduleModal.querySelector('.schedule-modal-dialog'), {
        autoAlpha: 0,
        y: 28,
        scale: 0.96
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'power3.out'
      });
    }
  };

  const closeScheduleModal = () => {
    if (!scheduleModal) {
      return;
    }

    scheduleModal.classList.remove('active');
    scheduleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (scheduleTriggers.length) {
    scheduleTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openScheduleModal();
      });
    });
  }

  if (scheduleModalClose) {
    scheduleModalClose.addEventListener('click', closeScheduleModal);
  }

  if (scheduleBackdrop) {
    scheduleBackdrop.addEventListener('click', closeScheduleModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && scheduleModal && scheduleModal.classList.contains('active')) {
      closeScheduleModal();
    }
  });

})()
