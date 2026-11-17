// Smooth, weighted scrolling with Lenis (vendor/lenis/, MIT licence).
//
// Only on desktops with a mouse or trackpad. Phones and tablets keep their own
// native scrolling, which already feels right there, and so does anyone whose
// system asks for reduced motion.
//
// index.js uses window.rahathLenis (when it exists) to pause scrolling behind
// the booking confirmation and to glide back to the top.

(() => {
  const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (typeof window.Lenis !== "function" || !desktopPointer.matches || reducedMotion.matches) {
    return;
  }

  const lenis = new window.Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    autoRaf: true,
    stopInertiaOnNavigate: true,
  });

  window.rahathLenis = lenis;

  // Links to a section on the same page (#packages, #testimonials, #privacy)
  // glide there instead of jumping. Lenis respects each section's
  // scroll-margin-top, so headings stay clear of the floating nav.
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest('a[href*="#"]');
    if (!link || link.target === "_blank") return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    lenis.scrollTo(target);
    history.pushState(null, "", url.hash);
  });

  // If someone turns on reduced motion while the page is open, stop smoothing.
  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) {
      lenis.destroy();
      delete window.rahathLenis;
    }
  });
})();
