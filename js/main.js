document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // --- 0. Startup Loader ---
  const initStartupLoader = () => {
    const loader = document.getElementById("startup-loader");
    const body = document.body;
    const progressBar = document.getElementById("new-loader-bar");

    // Animate progress bar
    let percentage = 0;
    const percentageInterval = setInterval(() => {
      percentage += Math.floor(Math.random() * 5) + 2; // Slower increment for smoothness
      if (percentage >= 100) {
        percentage = 100;
        clearInterval(percentageInterval);
        
        // Hide loader after completion
        setTimeout(() => {
          loader.classList.add("loader-hide");
          body.classList.remove("loading");
        }, 500);
      }
      if (progressBar) {
        progressBar.style.width = percentage + "%";
      }
    }, 50);
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
      "a, button, .project-card, .color-swatch, .neo-box, .neo-btn",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("hover");
        hoverSound.currentTime = 0;
        hoverSound.play().catch((e) => {});
      });
      el.addEventListener("mouseleave", () =>
        cursorOutline.classList.remove("hover"),
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
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
      showCursor: false, // Hide default cursor, we'll use block cursor if needed or just text
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
      { threshold: 0.1 },
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
        document.getElementById("modal-title").textContent = card.dataset.title;
        document.getElementById("modal-description").textContent =
          card.dataset.description;

        const techContainer = document.getElementById("modal-tech");
        techContainer.innerHTML = "";
        card.dataset.tech.split(",").forEach((tech) => {
          const techPill = document.createElement("span");
          techPill.className =
            "bg-yellow-300 text-black border-2 border-black font-bold text-sm px-3 py-1 mr-2 mb-2 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
          techPill.textContent = tech.trim();
          techContainer.appendChild(techPill);
        });

        const linksContainer = document.getElementById("modal-links");
        linksContainer.innerHTML = `
              <a href="${card.dataset.liveUrl}" target="_blank" class="bg-[var(--primary-color)] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">Live Demo</a>
              <a href="${card.dataset.githubUrl}" target="_blank" class="bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">GitHub</a>
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
    const invertBtn = document.getElementById("invert-mode-btn");

    toggleBtn.addEventListener("click", () => {
      customizer.classList.toggle("-right-48");
      customizer.classList.toggle("right-0");
    });

    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const color = swatch.dataset.color;
        root.style.setProperty("--primary-color", color);
      });
    });
  };

  // --- Scroll Progress ---
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }
  });

  // --- Draggable Skills (Fridge Magnets) ---
  const skills = document.querySelectorAll(".skill-pill");
  
  skills.forEach((skill) => {
    // Random rotation for "messy" look
    const randomRot = Math.random() * 10 - 5;
    skill.style.transform = `rotate(${randomRot}deg)`;
    skill.style.position = "relative"; 

    let isDragging = false;
    let startX, startY;
    let currentX = 0;
    let currentY = 0;

    const startDrag = (e) => {
      isDragging = true;
      skill.style.cursor = "grabbing";
      skill.style.zIndex = "100";
      skill.style.transition = "none";

      if (e.type === "mousedown") {
        startX = e.clientX;
        startY = e.clientY;
      } else {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const drag = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      let clientX, clientY;
      if (e.type === "mousemove") {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const dx = clientX - startX;
      const dy = clientY - startY;

      skill.style.transform = `translate(${currentX + dx}px, ${currentY + dy}px) rotate(${randomRot}deg) scale(1.1)`;
    };

    const stopDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      skill.style.cursor = "grab";
      skill.style.zIndex = "";
      skill.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      let clientX, clientY;
      if (e.type === "mouseup") {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.changedTouches) {
         clientX = e.changedTouches[0].clientX;
         clientY = e.changedTouches[0].clientY;
      } else {
         clientX = startX; 
         clientY = startY;
      }

      const dx = clientX - startX;
      const dy = clientY - startY;
      
      currentX += dx;
      currentY += dy;

      skill.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${randomRot}deg) scale(1)`;
    };

    skill.addEventListener("mousedown", startDrag);
    skill.addEventListener("touchstart", startDrag, { passive: false });

    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag, { passive: false });

    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
  });

  // --- Contact Stamp Logic ---
  const contactBtn = document.querySelector("#contact button[type='submit']");
  const stamp = document.getElementById("contact-stamp");

  if (contactBtn && stamp) {
    contactBtn.addEventListener("mouseenter", () => {
      stamp.classList.remove("opacity-0");
      stamp.classList.add("stamp-active");
    });
    contactBtn.addEventListener("mouseleave", () => {
      stamp.classList.remove("stamp-active");
      stamp.classList.add("opacity-0");
    });
  }

  // Initialize all features
  initStartupLoader();
  // initThreeJS(); // REMOVED
  initCursorAndSounds();
  initTyped();
  initScrollReveal();
  initProjectModal();
  initMobileMenu();
  initThemeCustomizer();
});
