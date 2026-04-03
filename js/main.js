// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once visible, stop observing for performance
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with scroll-animate class
  document.querySelectorAll('.scroll-animate').forEach(el => {
    scrollObserver.observe(el);
  });

  // ===== ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const offset = 100; // Offset for when section is considered "active"

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Throttle scroll events for performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        highlightNavOnScroll();
        scrollTimeout = null;
      }, 50);
    }
  });

  // ===== FORM HANDLING =====
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email) {
        showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormMessage('Veuillez entrer une adresse email valide.', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        showFormMessage('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.', 'success');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Remove success message after 5 seconds
        setTimeout(() => {
          const successMsg = document.querySelector('.form-success');
          if (successMsg) {
            successMsg.classList.remove('show');
          }
        }, 5000);
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
      existingMsg.remove();
    }

    // Create message element
    const msgEl = document.createElement('div');
    msgEl.className = 'form-message';
    msgEl.setAttribute('role', 'alert');

    if (type === 'success') {
      msgEl.classList.add('form-success', 'show');
      msgEl.innerHTML = `<strong>✓</strong> ${message}`;
    } else {
      msgEl.classList.add('form-error');
      msgEl.style.cssText = 'padding: 1rem; background: hsl(0 60% 95%); border: 1px solid hsl(0 60% 70%); border-radius: 0.5rem; color: hsl(0 60% 30%); text-align: center; margin-top: 1rem; animation: fadeInUp 0.4s ease;';
      msgEl.innerHTML = `<strong>!</strong> ${message}`;
    }

    // Insert after form
    contactForm.insertAdjacentElement('afterend', msgEl);

    // Auto-remove error messages after 3 seconds
    if (type === 'error') {
      setTimeout(() => {
        msgEl.remove();
      }, 3000);
    }
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle && navToggle.checked) {
          navToggle.checked = false;
        }
      }
    });
  });

  // ===== FAQ ACCORDION ENHANCEMENT =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', function() {
      if (this.open) {
      }
    });
  });

  // ===== TESTIMONIAL READ MORE TOGGLE =====
  const CHAR_LIMIT = 100;
  const isSpanish = document.documentElement.lang === 'es';
  const labels = {
    readMore: isSpanish ? 'Leer más' : 'Lire plus',
    readLess: isSpanish ? 'Leer menos' : 'Lire moins'
  };

  document.querySelectorAll('.testimonial-text').forEach(textEl => {
    const fullHTML = textEl.innerHTML.trim();
    const plainText = textEl.textContent.trim();
    if (plainText.length <= CHAR_LIMIT) return;

    let cutIndex = 0;
    let charCount = 0;
    let inTag = false;
    for (let i = 0; i < fullHTML.length && charCount < CHAR_LIMIT; i++) {
      if (fullHTML[i] === '<') { inTag = true; cutIndex = i; continue; }
      if (fullHTML[i] === '>') { inTag = false; cutIndex = i + 1; continue; }
      if (!inTag) { charCount++; cutIndex = i + 1; }
    }

    while (cutIndex < fullHTML.length && fullHTML[cutIndex] === '<') {
      const tagEnd = fullHTML.indexOf('>', cutIndex);
      if (tagEnd === -1) break;
      cutIndex = tagEnd + 1;
    }

    let truncated = fullHTML.slice(0, cutIndex).replace(/\s+\S*$/, '');
    truncated += '...';

    textEl.innerHTML = truncated;

    const btn = document.createElement('button');
    btn.className = 'read-more-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = labels.readMore;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        textEl.innerHTML = truncated;
        btn.textContent = labels.readMore;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        textEl.innerHTML = fullHTML;
        btn.textContent = labels.readLess;
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    textEl.parentElement.appendChild(btn);
  });

  // ===== LAZY LOADING IMAGES =====
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== PARALLAX EFFECT ON HERO (subtle) =====
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
      }
    });
  }
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== HUBSPOT CALENDAR MODAL =====
const hubspotModal = document.getElementById('hubspotModal');
const openModalBtn = document.getElementById('openHubspotModal');
const closeModalBtn = document.querySelector('.modal-close');

if (hubspotModal && openModalBtn && closeModalBtn) {
  openModalBtn.addEventListener('click', function() {
    hubspotModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closeModalBtn.addEventListener('click', function() {
    hubspotModal.style.display = 'none';
    document.body.style.overflow = '';
  });

  window.addEventListener('click', function(event) {
    if (event.target === hubspotModal) {
      hubspotModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && hubspotModal.style.display === 'block') {
      hubspotModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}
