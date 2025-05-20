// Main JavaScript for VEGA IT Website

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Testimonial Slider
  const testimonialSlider = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        }
      }
    });
  });

  // Form Validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const formElements = contactForm.elements;
      
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== 'submit' && formElements[i].hasAttribute('required')) {
          if (!formElements[i].value.trim()) {
            isValid = false;
            formElements[i].classList.add('error');
          } else {
            formElements[i].classList.remove('error');
          }
        }
      }
      
      if (isValid) {
        // Show success message
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
          formMessage.textContent = 'Your message has been sent successfully!';
          formMessage.classList.add('success');
          contactForm.reset();
          
          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.textContent = '';
            formMessage.classList.remove('success');
          }, 5000);
        }
      }
    });
  }

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / (duration / 16); // Update every 16ms
        
        let count = 0;
        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Sticky Header
  const header = document.querySelector('header');
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
});