import { useState, useEffect, useCallback, useRef } from "react";
import "./styles/Career.css";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./effects/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [images.length, next]);

  if (images.length === 0) return null;

  return (
    <div className="carousel" data-cursor="disable">
      <div className="carousel-track">
        {images.map((img, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? "active" : ""}`}
          >
            <img src={img} alt={`Slide ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className="carousel-btn carousel-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>
            ‹
          </button>
          <button className="carousel-btn carousel-next" onClick={(e) => { e.stopPropagation(); next(); }}>
            ›
          </button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`carousel-dot-indicator ${i === current ? "active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Show a big ghost year beside the first event of each year
const years = config.experiences.map((e) => e.sortDate.slice(0, 4));
const showYear = years.map((y, i) => i === 0 || y !== years[i - 1]);
const TITLE = "Hiru's Journey";

const Career = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Refresh ScrollTrigger after expand/collapse transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 550); // slightly after the 0.5s CSS transition
    return () => clearTimeout(timer);
  }, [expandedIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const dot = dotRef.current;
    const tail = tailRef.current;
    const line = timelineRef.current;
    const boxes = boxRefs.current.filter(Boolean) as HTMLDivElement[];
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !dot || !tail || !line || boxes.length === 0) return;

    const info = line.parentElement!;
    let nodeY: number[] = [];

    // Vertical centre of each card's marker, relative to .career-info
    const measure = () => {
      const infoTop = info.getBoundingClientRect().top;
      nodeY = boxes.map((box) => {
        const r = box.querySelector(".career-marker")!.getBoundingClientRect();
        return r.top + r.height / 2 - infoTop;
      });
      nodes.forEach((n, i) => (n.style.top = `${nodeY[i]}px`));
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 901px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };

        // Title: letters rise in one after another
        gsap.fromTo(
          ".career-title .ct-char",
          { yPercent: motion ? 110 : 0, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.035,
            scrollTrigger: { trigger: ".career-title", start: "top 85%", once: true },
          }
        );

        boxes.forEach((box, index) => {
          const isLeft = index % 2 === 0;
          const card = box.querySelector(".career-card");

          // Scroll-based highlighting (not expansion)
          ScrollTrigger.create({
            trigger: box,
            start: "top 75%",
            end: "bottom 25%",
            invalidateOnRefresh: true,
            onToggle: (self) => setHighlightedIndex((h) => (self.isActive ? index : h === index ? null : h)),
          });

          if (!motion) return;

          // Cards swing in from their own side, tied to scroll position
          gsap.fromTo(
            card,
            {
              x: desktop ? (isLeft ? -120 : 120) : 40,
              rotationY: desktop ? (isLeft ? 28 : -28) : 0,
              opacity: 0,
              filter: "blur(10px)",
              transformPerspective: 1200,
              transformOrigin: isLeft ? "right center" : "left center",
            },
            {
              x: 0,
              rotationY: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: box,
                start: "top 95%",
                end: "top 55%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );

          // Ghost year drifts at a different speed (parallax)
          const year = box.querySelector(".career-year");
          if (year && desktop) {
            gsap.fromTo(
              year,
              { yPercent: 60 },
              {
                yPercent: -60,
                ease: "none",
                scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          }
        });

        // Travelling dot + filled line, with a comet tail that stretches with speed
        measure();
        const tailTo = gsap.quickTo(tail, "height", { duration: 0.3, ease: "power2.out" });
        ScrollTrigger.create({
          trigger: info,
          start: "top 70%",
          end: "bottom 40%",
          scrub: motion ? 1.2 : true,
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate: (self) => {
            const startY = nodeY[0];
            const endY = nodeY[nodeY.length - 1];
            const currentY = startY + (endY - startY) * self.progress;
            const h = info.offsetHeight;
            dot.style.top = `${currentY}px`;
            tail.style.top = `${currentY}px`;
            line.style.setProperty("--timeline-progress", `${(currentY / h) * 100}%`);
            nodes.forEach((n, i) => n.classList.toggle("is-reached", currentY >= nodeY[i] - 1));
            if (motion) tailTo(gsap.utils.clamp(0, 140, Math.abs(self.getVelocity()) * 0.06));
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="career-section section-container" id="career" ref={sectionRef}>
      <div className="career-container">
        <h2 className="career-title" aria-label={TITLE}>
          {TITLE.split("").map((c, i) => (
            <span className="ct-mask" key={i} aria-hidden="true">
              <span className="ct-char">{c === " " ? " " : c}</span>
            </span>
          ))}
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={timelineRef}>
            {config.experiences.map((_, i) => (
              <div
                key={i}
                className="career-node"
                ref={(el) => { nodeRefs.current[i] = el; }}
              />
            ))}
            <div className="career-tail" ref={tailRef}></div>
            <div className="career-dot" ref={dotRef}></div>
          </div>
          {config.experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedIndex === index;
            const isHighlighted = highlightedIndex === index;
            const isNow = /present/i.test(exp.date);
            return (
              <div
                key={index}
                ref={(el) => { boxRefs.current[index] = el; }}
                className={`career-info-box ${isLeft ? "career-left" : "career-right"} ${isExpanded ? "career-expanded" : ""} ${isHighlighted ? "career-highlighted" : ""}`}
                onClick={() => handleBoxClick(index)}
              >
                {showYear[index] && (
                  <span className="career-year" aria-hidden="true">{years[index]}</span>
                )}

                {/* The marker on the timeline */}
                <div className="career-marker"></div>

                <div className="career-card">
                  {isNow && <span className="career-now">Now</span>}
                  {/* Collapsed preview */}
                  <div className="career-preview">
                    <span className="career-event-preview">{exp.event}</span>
                    <h4 className="career-card-title">{exp.title}</h4>
                    <span className="career-date">{exp.date}</span>
                    <span className="career-click-prompt">
                      {exp.images.length > 0 ? `${exp.images.length} photos · ` : ""}Click to view details
                    </span>
                  </div>

                  {/* Expanded detail panel */}
                  <div className="career-detail">
                    <div className="career-detail-text">
                      <h4 className="career-card-title-expanded">{exp.title}</h4>
                      <h5 className="career-event">{exp.event}</h5>
                      <span className="career-date-expanded">{exp.date}</span>
                      <p className="career-description">{exp.description}</p>
                      {exp.github && (
                        <Magnetic strength={0.25}>
                          <a
                            href={exp.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="career-github-link"
                            data-cursor="disable"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View on GitHub <MdArrowOutward />
                          </a>
                        </Magnetic>
                      )}
                    </div>
                    {exp.images.length > 0 && (
                      <div className="career-detail-carousel">
                        <ImageCarousel images={exp.images} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Career;
