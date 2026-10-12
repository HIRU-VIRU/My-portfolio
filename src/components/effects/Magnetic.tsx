import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { canHover } from "./motion";

interface Props {
  children: ReactNode;
  /** How far the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps a button or link so it leans toward the cursor and springs back.
 * The wrapper is inline-block, so it can sit anywhere a button sits.
 */
const Magnetic = ({ children, strength = 0.35, className = "" }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const inner = el.firstElementChild as HTMLElement | null;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      if (inner) gsap.to(inner, { x: dx * strength * 0.3, y: dy * strength * 0.3, duration: 0.4 });
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
};

export default Magnetic;
