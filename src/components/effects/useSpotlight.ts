import { RefObject, useEffect } from "react";
import { canHover } from "./motion";

/**
 * Moves a soft accent light across every `.spotlight-card` inside the
 * container, lighting each card's border relative to the cursor.
 * Styles live in styles/effects.css.
 */
const useSpotlight = (containerRef: RefObject<HTMLElement>, deps: unknown[] = []) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canHover()) return;

    const onMove = (e: PointerEvent) => {
      container.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      });
    };
    const onLeave = () => {
      container.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
        card.style.setProperty("--spot-x", "-999px");
        card.style.setProperty("--spot-y", "-999px");
      });
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useSpotlight;
