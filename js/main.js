/* ===== Dr. Ziad El Hachem — site interactions ===== */
(function () {
  "use strict";

  /* Sticky nav shadow on scroll */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const toggleMenu = (open) => {
    const isOpen = open ?? !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu());
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* Reveal-on-scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // small stagger for siblings entering together
            setTimeout(() => entry.target.classList.add("is-visible"), (i % 4) * 90);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Current year in footer */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Share buttons on Updates posts */
  document.querySelectorAll(".share-btn[data-share]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const post = btn.closest(".post");
      const title = post ? (post.querySelector("h2") || {}).textContent || document.title : document.title;
      const url = window.location.href.split("#")[0];
      const type = btn.getAttribute("data-share");
      if (type === "facebook") {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank", "noopener");
      } else if (type === "whatsapp") {
        window.open("https://wa.me/?text=" + encodeURIComponent(title + " — " + url), "_blank", "noopener");
      } else if (type === "copy") {
        const done = () => {
          const original = btn.getAttribute("aria-label");
          btn.setAttribute("aria-label", "Link copied");
          btn.classList.add("is-copied");
          setTimeout(() => { btn.setAttribute("aria-label", original); btn.classList.remove("is-copied"); }, 1600);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(done);
        else done();
      }
    });
  });

  /* Feedback form */
  const fbForm = document.getElementById("feedbackForm");
  const fbThanks = document.getElementById("feedbackThanks");
  if (fbForm && fbThanks) {
    fbForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const showThanks = () => {
        fbForm.classList.add("is-hidden");
        fbThanks.classList.add("is-shown");
        fbThanks.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      // Send to the form handler (e.g. Netlify Forms) when deployed.
      // On a local file/preview with no handler, this fails quietly and we still thank the user.
      const data = new URLSearchParams(new FormData(fbForm)).toString();
      fetch(fbForm.getAttribute("action") || "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data
      }).then(showThanks).catch(showThanks);
    });
  }
})();
