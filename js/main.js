(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    document.querySelectorAll(".reveal, .text-reveal, .divider--accent").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const header = document.querySelector(".top");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const revealEls = document.querySelectorAll(".reveal, .divider--accent");
  const textEls = document.querySelectorAll(".text-reveal");

  const showText = (container) => {
    const items = container.querySelectorAll(".text-reveal:not(.is-visible)");
    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.06}s`;
      el.classList.add("is-visible");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        if (el.classList.contains("reveal")) {
          showText(el);
        }
        observer.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
  );

  revealEls.forEach((el) => observer.observe(el));

  const intro = document.querySelector(".intro");
  if (intro) {
    intro.querySelectorAll(".text-reveal").forEach((el, i) => {
      el.style.transitionDelay = `${0.15 + i * 0.08}s`;
      requestAnimationFrame(() => el.classList.add("is-visible"));
    });
  }

  textEls.forEach((el) => {
    if (!el.closest(".reveal") && !el.closest(".intro")) {
      observer.observe(el);
    }
  });
})();
