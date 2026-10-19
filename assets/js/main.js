/**
 * DINH. STUDIO - High-End Photography Portfolio
 * Core Javascript Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scrolled State
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Audio Synthesizer (Realistic Camera Shutter Effect)
  let audioEnabled = false;
  let audioCtx = null;
  const audioToggleBtn = document.getElementById('audioToggle');

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playShutterSound() {
    if (!audioEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Shutter click 1 (mirror flip)
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.04);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);

      // Shutter click 2 (curtain close)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(260, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 0.1);

      gain2.gain.setValueAtTime(0.3, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.11);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      const icon = audioToggleBtn.querySelector('svg');
      if (audioEnabled) {
        audioToggleBtn.style.color = 'var(--accent-gold)';
        audioToggleBtn.style.borderColor = 'var(--accent-gold)';
        showToast('Camera Sound ON', 'Shutter click sound enabled for interactions');
        playShutterSound();
      } else {
        audioToggleBtn.style.color = '';
        audioToggleBtn.style.borderColor = '';
        showToast('Camera Sound OFF', 'Muted sound effects');
      }
    });
  }

  // 4. Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      playShutterSound();

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. Interactive Lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

  function openLightbox(index) {
    const visible = visibleGalleryItems();
    if (!visible.length) return;
    currentGalleryIndex = (index + visible.length) % visible.length;
    const targetItem = visible[currentGalleryIndex];
    const imgEl = targetItem.querySelector('img');
    const titleEl = targetItem.querySelector('.gallery-title');
    const metaEl = targetItem.querySelector('.gallery-meta');

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || 'Photography Showcase';
    lightboxTitle.textContent = titleEl ? titleEl.textContent : 'Editorial Capture';
    lightboxMeta.textContent = metaEl ? metaEl.textContent.trim().replace(/\s+/g, ' ') : 'Sony Alpha • 50mm f/1.2 GM';

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playShutterSound();
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const visible = visibleGalleryItems();
      const index = visible.indexOf(item);
      openLightbox(index >= 0 ? index : 0);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentGalleryIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentGalleryIndex + 1);
    });
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
  });

  // 6. Before / After Retouching Slider
  const sliderWrapper = document.getElementById('splitSlider');
  if (sliderWrapper) {
    const afterImage = sliderWrapper.querySelector('.split-image.after');
    const handle = sliderWrapper.querySelector('.slider-handle');

    let isSliding = false;

    function updateSlider(xPos) {
      const rect = sliderWrapper.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      afterImage.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    sliderWrapper.addEventListener('mousedown', (e) => {
      isSliding = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isSliding = false;
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      updateSlider(e.clientX);
    });

    // Touch support
    sliderWrapper.addEventListener('touchstart', (e) => {
      isSliding = true;
      updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isSliding = false;
    });

    sliderWrapper.addEventListener('touchmove', (e) => {
      if (!isSliding) return;
      updateSlider(e.touches[0].clientX);
    });
  }

  // 7. Dynamic Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-item .stat-number');
  let statsCounted = false;

  function countUp(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.innerHTML = `${target}<span>+</span>`;
        clearInterval(timer);
      } else {
        element.innerHTML = `${Math.floor(current)}<span>+</span>`;
      }
    }, stepTime);
  }

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(stat => countUp(stat));
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // 8. Package Selection & Smooth Scroll to Booking Form
  const packageBtns = document.querySelectorAll('.btn-package');
  const serviceSelect = document.getElementById('serviceSelect');
  const bookingSection = document.getElementById('contact');

  packageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package');
      if (serviceSelect && packageName) {
        serviceSelect.value = packageName;
      }
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 9. Booking Form Submission & Toast
  const bookingForm = document.getElementById('bookingForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(title, msg) {
    if (!toastNotification) return;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4500);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playShutterSound();
      const name = document.getElementById('clientName').value || 'Quý khách';
      showToast(
        'Yêu cầu đã được gửi thành công!',
        `Cảm ơn ${name}. DINH. Studio sẽ liên hệ lại với bạn trong vòng 2 giờ.`
      );
      bookingForm.reset();
    });
  }

  // 10. Nav Active Links on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
