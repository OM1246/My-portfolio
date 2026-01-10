document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // --- 0. Startup Loader ---
  const initStartupLoader = () => {
    const loader = document.getElementById('startup-loader');
    const body = document.body;
    const percentageEl = document.getElementById('loader-percentage');
    const particlesContainer = document.getElementById('particles-container');
    
    // Generate floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'loader-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 3 + 's';
      particle.style.animationDuration = (2 + Math.random() * 2) + 's';
      particlesContainer.appendChild(particle);
    }
    
    // Animate percentage counter
    let percentage = 0;
    const percentageInterval = setInterval(() => {
      percentage += Math.floor(Math.random() * 10) + 3;
      if (percentage >= 100) {
        percentage = 100;
        clearInterval(percentageInterval);
      }
      percentageEl.textContent = percentage + '%';
    }, 150);
    
    // Hide loader after 4.5 seconds
    setTimeout(() => {
      loader.classList.add('hidden');
      body.classList.remove('loading');
    }, 4500);
  };

  // --- 1. 3D Background Animation ---
  const initThreeJS = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("bg-canvas"),
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: getComputedStyle(root).getPropertyValue("--primary-color"),
    });
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);
    let mouseX = 0,
      mouseY = 0;
    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      particlesMesh.rotation.y = elapsedTime * 0.1;
      particlesMesh.rotation.x = mouseY * 0.2;
      particlesMesh.rotation.y += mouseX * 0.2;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    document.addEventListener("themeChanged", (e) => {
      particlesMesh.material.color.set(e.detail.color);
    });
  };

  // --- 2. Custom Cursor & Sound Logic ---
  const initCursorAndSounds = () => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const hoverSound = document.getElementById("hover-sound");
    const clickSound = document.getElementById("click-sound");
    hoverSound.volume = 0.2;
    clickSound.volume = 0.3;

    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .color-swatch"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("hover");
        hoverSound.currentTime = 0;
        hoverSound.play().catch((e) => {});
      });
      el.addEventListener("mouseleave", () =>
        cursorOutline.classList.remove("hover")
      );
      el.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play().catch((e) => {});
      });
    });

    document.addEventListener("mouseenter", () => {
      cursorDot.classList.remove("hidden");
      cursorOutline.classList.remove("hidden");
    });
    document.addEventListener("mouseleave", () => {
      cursorDot.classList.add("hidden");
      cursorOutline.classList.add("hidden");
    });
  };

  // --- 3. Typed.js Animation ---
  const initTyped = () => {
    new Typed("#typed-text", {
      strings: [
        "Turning Ideas into Interactive Experiences.",
        "Building the Decentralized Future.",
        "Integrating Intelligence into Applications.",
        "Let's build something amazing together.",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
    });
  };

  // --- 4. Scroll Reveal Animations ---
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
  };

  // --- 5. Project Modal Logic ---
  const initProjectModal = () => {
    const modal = document.getElementById("project-modal");
    const modalContent = modal.querySelector(".modal-content");
    const closeBtn = document.getElementById("modal-close");
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      card.addEventListener("click", () => {
        document.getElementById("modal-image").src = card.dataset.image;
        document.getElementById("modal-title").textContent =
          card.dataset.title;
        document.getElementById("modal-description").textContent =
          card.dataset.description;

        const techContainer = document.getElementById("modal-tech");
        techContainer.innerHTML = "";
        card.dataset.tech.split(",").forEach((tech) => {
          const techPill = document.createElement("span");
          techPill.className =
            "bg-gray-700 text-sm text-[var(--primary-color)] px-3 py-1 rounded-full";
          techPill.textContent = tech.trim();
          techContainer.appendChild(techPill);
        });

        const linksContainer = document.getElementById("modal-links");
        linksContainer.innerHTML = `
              <a href="${card.dataset.liveUrl}" target="_blank" class="bg-[var(--primary-color)] text-[var(--bg-color)] px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition-opacity">Live Demo</a>
              <a href="${card.dataset.githubUrl}" target="_blank" class="bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 rounded-lg font-semibold hover:bg-[var(--primary-color)] hover:text-black transition-colors">GitHub</a>
          `;

        modal.classList.remove("invisible", "opacity-0");
        modalContent.classList.add("scale-100");
      });
    });

    const closeModal = () => {
      modal.classList.add("invisible", "opacity-0");
      modalContent.classList.remove("scale-100");
    };
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  };

  // --- 6. Mobile Menu Logic ---
  const initMobileMenu = () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("translate-x-full");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
      });
    });
  };

  const initThemeCustomizer = () => {
    const customizer = document.getElementById("theme-customizer");
    const toggleBtn = document.getElementById("customizer-toggle");
    const swatches = document.querySelectorAll(".color-swatch");

    toggleBtn.addEventListener("click", () => {
      customizer.classList.toggle("-right-48");
      customizer.classList.toggle("right-0");
    });

    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const color = swatch.dataset.color;
        root.style.setProperty("--primary-color", color);

        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        root.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`);

        document.dispatchEvent(
          new CustomEvent("themeChanged", { detail: { color: color } })
        );
      });
    });
    const initialColor = getComputedStyle(root)
      .getPropertyValue("--primary-color")
      .trim();
    const r = parseInt(initialColor.slice(1, 3), 16);
    const g = parseInt(initialColor.slice(3, 5), 16);
    const b = parseInt(initialColor.slice(5, 7), 16);
    root.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`);
  };

  // Initialize all features
  initStartupLoader();
  initThreeJS();
  initCursorAndSounds();
  initTyped();
  initScrollReveal();
  initProjectModal();
  initMobileMenu();
  initThemeCustomizer();
});
