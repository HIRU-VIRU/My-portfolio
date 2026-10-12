import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

// React StrictMode mounts twice in dev; splitting the text twice breaks it
let played = false;
let waits = 0;

export function initialFX() {
  if (played) return;
  // The landing page is lazy-loaded, so it may not be in the DOM yet
  if (!document.querySelector(".landing-intro h1") && waits++ < 100) {
    window.setTimeout(initialFX, 50);
    return;
  }
  played = true;

  document.body.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
  );

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const split = (selector: string) =>
    new TextSplitter(selector, { type: "chars,words" }).chars as HTMLElement[];

  const greeting = split(".landing-intro h2");
  const name = split(".landing-intro h1");
  const an = split(".landing-info h3");
  const ai = split(".landing-h2-1");
  const role = split(".landing-h2-info");

  if (reduced) {
    gsap.from([...greeting, ...name, ...an, ...ai, ...role], { opacity: 0, duration: 0.6, stagger: 0.01 });
    return;
  }

  const r = gsap.utils.random;
  // Each letter starts somewhere random in 3D space, spinning and blurred,
  // then flies to its slot and lands with a small overshoot.
  const flyIn = (chars: HTMLElement[], at: number, spread = 1) =>
    tl.fromTo(
      chars,
      {
        x: () => r(-700, 700) * spread,
        y: () => r(-450, 450) * spread,
        z: () => r(-900, 300),
        rotationX: () => r(-300, 300),
        rotationY: () => r(-300, 300),
        rotationZ: () => r(-120, 120),
        scale: () => r(0.2, 2.8),
        opacity: 0,
        filter: "blur(12px)",
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
        stagger: { each: 0.035, from: "random" },
      },
      at
    );

  const all = [...greeting, ...name, ...an, ...ai, ...role];
  gsap.set(all, { display: "inline-block", transformPerspective: 800, willChange: "transform, opacity, filter" });

  const tl = gsap.timeline({ delay: 0.25 });
  flyIn(greeting, 0, 0.6);
  flyIn(name, 0.15);
  flyIn(an, 0.5, 0.6);
  flyIn(ai, 0.65, 1.2);
  flyIn(role, 0.8);

  // "AI" lands hard: a squash, a glow and a shockwave ring
  tl.addLabel("impact", 1.75)
    .fromTo(
      ".landing-h2-1",
      { scale: 1.18 },
      { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.35)", transformOrigin: "left center" },
      "impact"
    )
    .fromTo(
      ".landing-shock",
      { scale: 0.2, opacity: 0.9 },
      { scale: 3.2, opacity: 0, duration: 1.1, ease: "power2.out" },
      "impact"
    )
    .fromTo(
      ai,
      { textShadow: "0 0 40px rgba(var(--accentRgb), 1)" },
      { textShadow: "0 0 0px rgba(var(--accentRgb), 0)", duration: 1.2, ease: "power2.out" },
      "impact"
    )
    .set(all, { clearProps: "filter,willChange" });

  // Afterwards the role does a small wave every few seconds so it stays alive
  tl.add(() => {
    gsap
      .timeline({ repeat: -1, repeatDelay: 5 })
      .to([...ai, ...role], {
        y: -10,
        duration: 0.25,
        ease: "power2.out",
        stagger: { each: 0.04, yoyo: true, repeat: 1 },
      });
  }, "+=2");
}
