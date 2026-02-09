/* ===== BLADE RECORDS - script.js ===== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- HERO LOAD-IN ---------- */
  const loadTargets = document.querySelectorAll(".load-trigger");
  setTimeout(() => {
    loadTargets.forEach((el) => el.classList.add("loaded"));
  }, 300);

  /* ---------- MOUSE SPOTLIGHT ---------- */
  const spotlight = document.getElementById("hero-spotlight");
  if (spotlight) {
    window.addEventListener("mousemove", (e) => {
      spotlight.style.left = e.clientX - 192 + "px";
      spotlight.style.top = e.clientY - 192 + "px";
    });
  }

  /* ---------- NAV SCROLL ---------- */
  const nav = document.getElementById("main-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("mobile-menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ---------- INTERSECTION OBSERVER (scroll reveals) ---------- */
  const observerOptions = { threshold: 0.15 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add visible class to the element itself
        entry.target.classList.add("visible");

        // Also reveal any children with data-reveal
        const children = entry.target.querySelectorAll("[data-reveal]");
        children.forEach((child, i) => {
          const delay = child.dataset.revealDelay
            ? parseInt(child.dataset.revealDelay)
            : i * 200;
          setTimeout(() => child.classList.add("visible"), delay);
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-observe]").forEach((el) => {
    revealObserver.observe(el);
  });

  /* ---------- ARTIST ROW STAGGER ---------- */
  const artistObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.artistDelay || 0;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, parseInt(delay));
          artistObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".artist-row").forEach((row) => {
    artistObserver.observe(row);
  });

  /* ---------- FOOTER CLOCK ---------- */
  const clockEl = document.getElementById("footer-clock");
  function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  updateClock();
  setInterval(updateClock, 1000);
});
