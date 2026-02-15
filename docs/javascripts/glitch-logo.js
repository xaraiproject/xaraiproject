(function () {
  const DURATION_MS = 700;

  function getLogoEl() {
    return document.querySelector(".md-header__button.md-logo img");
  }

  function pulse() {
    const logo = getLogoEl();
    if (!logo) return;

    logo.classList.remove("tri-glitch");
    void logo.offsetWidth;          // force reflow to restart animation
    logo.classList.add("tri-glitch");

    window.setTimeout(() => {
      logo.classList.remove("tri-glitch");
    }, DURATION_MS);
  }

  // Run once on first entry
  window.addEventListener("load", () => {
    window.setTimeout(pulse, 250);
  });

  // Run on every internal navigation (Material instant loading)
  // Material documents this pattern for custom JS
  if (typeof document$ !== "undefined" && document$?.subscribe) {
    document$.subscribe(() => {
      // Small delay so header/logo is present after DOM swap
      window.setTimeout(pulse, 60);
    });
  }
})();
