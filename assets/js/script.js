// Main JavaScript for VEGA IT Website - Glass & Neon Theme

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
    effect: 'fade',
    fadeEffect: {
      crossFade: true
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
  
  // Parallax Effect for Hero Section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const parallaxSpeed = 0.5;
      hero.style.backgroundPositionY = `${scrollPosition * parallaxSpeed}px`;
    });
  }
  
  // Add neon glow effect to icons on hover
  const serviceIcons = document.querySelectorAll('.service-icon i');
  serviceIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.filter = 'drop-shadow(0 0 15px rgba(0, 247, 255, 0.8))';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.filter = 'drop-shadow(0 0 8px rgba(0, 247, 255, 0.3))';
    });
  });
  
  // Create floating particles effect
  createParticles();
});

// Function to create floating particles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container');
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '0';
  
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  
  // Randomize particle properties
  const size = Math.random() * 3 + 1;
  const colors = ['rgba(0, 247, 255, 0.7)', 'rgba(255, 0, 229, 0.7)', 'rgba(112, 0, 255, 0.7)'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 10;
  
  // Set particle styles
  particle.style.position = 'absolute';
  particle.style.left = `${posX}vw`;
  particle.style.top = `${posY}vh`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.backgroundColor = color;
  particle.style.borderRadius = '50%';
  particle.style.filter = `blur(${size > 2 ? 1 : 0}px)`;
  particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
  particle.style.opacity = Math.random() * 0.5 + 0.3;
  
  // Set animation
  particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
  
  // Add keyframes for floating animation
  if (!document.querySelector('#particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(-${Math.random() * 100 + 50}px) translateX(${Math.random() * 40 - 20}px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  container.appendChild(particle);
}