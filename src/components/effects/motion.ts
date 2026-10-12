export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True for mouse/trackpad users who haven't asked for reduced motion. */
export const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !prefersReducedMotion();
