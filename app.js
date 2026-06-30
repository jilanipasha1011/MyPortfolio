// ----- PREMIUM INTERACTIVE PORTFOLIO ENGINE -----
document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.className = "fas fa-times";
        // Simple slide down transition style
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "70px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "rgba(10, 10, 25, 0.95)";
        navLinks.style.padding = "24px";
        navLinks.style.borderRadius = "20px";
        navLinks.style.border = "1px solid rgba(99, 102, 241, 0.2)";
        navLinks.style.gap = "16px";
      } else {
        icon.className = "fas fa-bars";
        navLinks.removeAttribute("style");
      }
    });

    // Close mobile nav when link clicked
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.querySelector("i").className = "fas fa-bars";
          navLinks.removeAttribute("style");
        }
      });
    });
  }

  // 2. NAVBAR SCROLL STYLING
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Highlight active link based on scroll section
    highlightActiveSection();
  });

  function highlightActiveSection() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
          document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  }

  // 3. TYPEWRITER EFFECT
  const typedSpan = document.getElementById("typed-text");
  if (typedSpan) {
    const roles = [
      "Agentic AI Developer",
      "Full-Stack SaaS Engineer",
      "Data Scientist & AI/ML Engineer",
      "Automation Solutions Architect"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex--);
      } else {
        typedSpan.textContent = currentRole.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentRole.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Wait on completed word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 400); // Pause before next word
      } else {
        setTimeout(typeEffect, isDeleting ? 40 : 80);
      }
    }
    typeEffect();
  }

  // 4. SERVICES TABS SWAPPER
  const tabBtns = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".services-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPanel = btn.getAttribute("data-tab");

      tabBtns.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const activePanel = document.getElementById(targetPanel);
      if (activePanel) activePanel.classList.add("active");
    });
  });

  // 5. TESTIMONIALS SLIDER
  const sliderTrack = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");

  if (sliderTrack && prevBtn && nextBtn) {
    let index = 0;
    const cards = sliderTrack.children;
    const totalSlides = Math.ceil(cards.length / 2); // Two cards per view on wide, but adjusts

    function updateSlider() {
      const isMobile = window.innerWidth <= 768;
      const step = isMobile ? 100 : 50; // shift 100% on mobile, 50% on desktop
      const maxIndex = isMobile ? cards.length - 1 : cards.length - 2;

      if (index < 0) index = 0;
      if (index > maxIndex) index = maxIndex;

      const translateX = -index * (isMobile ? 100 : 51.5); // align with spacing
      sliderTrack.style.transform = `translateX(${translateX}%)`;
    }

    nextBtn.addEventListener("click", () => {
      const isMobile = window.innerWidth <= 768;
      index += isMobile ? 1 : 2;
      const maxIndex = isMobile ? cards.length - 1 : cards.length - 2;
      if (index > maxIndex) index = 0; // wrap around
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      const isMobile = window.innerWidth <= 768;
      index -= isMobile ? 1 : 2;
      const maxIndex = isMobile ? cards.length - 1 : cards.length - 2;
      if (index < 0) index = maxIndex; // wrap around
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
  }

  // 6. 3D TILT EFFECT ON CARDS
  const tiltCards = document.querySelectorAll(".case-card");
  const maxRotate = 8;

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxRotate;
      const rotateX = ((centerY - y) / centerY) * maxRotate;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  // 7. PARTICLES BACKGROUND (HTML5 CANVAS)
  const canvas = document.getElementById("particlesCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    // Set sizing
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle Blueprints
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = Math.random() > 0.5 ? "rgba(99, 102, 241, 0.2)" : "rgba(6, 182, 212, 0.2)";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary checks
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize Particle Arrays
    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 100);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener("resize", initParticles);

    // Connect close nodes
    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            opacityValue = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 8. CONTACT FORM SUBMIT ANIMATION
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Allow Formspree redirect to happen normally, but we can log or trigger custom transition.
      const submitBtn = contactForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.innerHTML = "Deploying Message... <i class='fas fa-circle-notch fa-spin'></i>";
        submitBtn.style.opacity = "0.8";
      }
    });
  }
});
