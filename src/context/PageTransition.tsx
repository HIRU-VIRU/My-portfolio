import {
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Link, LinkProps, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../components/effects/motion";
import "../components/styles/PageTransition.css";

const LABELS: Record<string, string> = {
  "/": "Home",
  "/myworks": "All Works",
  "/play": "Play",
};

type Go = (to: string) => void;
const TransitionContext = createContext<Go | null>(null);

/**
 * Curtain wipe between routes: a panel rises over the page showing the next
 * page's name, the route changes underneath, then the panel lifts away.
 */
export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [label, setLabel] = useState("");

  const go = useCallback<Go>(
    (to) => {
      const el = curtain.current;
      if (!el || busy.current) return;
      if (prefersReducedMotion()) {
        navigate(to);
        window.scrollTo(0, 0);
        return;
      }
      busy.current = true;
      setLabel(LABELS[to] ?? "");
      const words = el.querySelector(".page-curtain-label");

      gsap
        .timeline({ onComplete: () => void (busy.current = false) })
        .set(el, { display: "flex", yPercent: 100 })
        .set(words, { yPercent: 120, opacity: 0 })
        .to(el, { yPercent: 0, duration: 0.65, ease: "power4.inOut" })
        .to(words, { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.2")
        .add(() => {
          navigate(to);
          window.scrollTo(0, 0);
        })
        // Give the lazy route a moment to mount before revealing it
        .to({}, { duration: 0.35 })
        .to(words, { yPercent: -120, opacity: 0, duration: 0.35, ease: "power2.in" })
        .to(el, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.1")
        .set(el, { display: "none" });
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div className="page-curtain" ref={curtain} aria-hidden="true">
        <span className="page-curtain-label">{label}</span>
      </div>
    </TransitionContext.Provider>
  );
};

export const usePageTransition = () => useContext(TransitionContext);

/** Drop-in replacement for <Link> that plays the curtain transition. */
export const TransitionLink = ({ to, onClick, ...rest }: LinkProps & { to: string }) => {
  const go = usePageTransition();
  const { pathname } = useLocation();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // Let new-tab / modified clicks behave like normal links
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!go || to === pathname) return;
    e.preventDefault();
    go(to);
  };
  return <Link to={to} onClick={handle} {...rest} />;
};
