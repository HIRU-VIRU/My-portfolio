import { useState, useEffect, useCallback, useRef } from "react";
import "./styles/Career.css";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const Career = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const dot = dotRef.current;
    const line = timelineRef.current;
    const boxes = boxRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !dot || !line || boxes.length === 0) return;

    const ctx = gsap.context(() => {
      // Scroll-based highlighting (not expansion)
      boxes.forEach((box, index) => {
        ScrollTrigger.create({
          trigger: box,
          start: "top 75%",
          end: "bottom 25%",
          invalidateOnRefresh: true,
          onEnter: () => setHighlightedIndex(index),
          onLeave: () => setHighlightedIndex(null),
          onEnterBack: () => setHighlightedIndex(index),
          onLeaveBack: () => setHighlightedIndex(null),
        });
      });

      // Fade-in animation for each box
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: box,
              start: "top 90%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // The dot + filled line: scrub from first box to last box
      const firstBox = boxes[0];
      const lastBox = boxes[boxes.length - 1];

      // Get the vertical center of first and last marker relative to .career-info
      const getNodePositions = () => {
        const infoRect = line.parentElement!.getBoundingClientRect();
        const firstRect = firstBox.querySelector(".career-marker")!.getBoundingClientRect();
        const lastRect = lastBox.querySelector(".career-marker")!.getBoundingClientRect();
        const startY = firstRect.top + firstRect.height / 2 - infoRect.top;
        const endY = lastRect.top + lastRect.height / 2 - infoRect.top;
        return { startY, endY, infoHeight: infoRect.height };
      };

      // Use a scrub timeline for the ball rolling
      // Trigger on .career-info so range = actual timeline content
      ScrollTrigger.create({
        trigger: line.parentElement!,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const { startY, endY, infoHeight } = getNodePositions();
          const currentY = startY + (endY - startY) * self.progress;
          // Position dot
          dot.style.top = `${currentY}px`;
          // Fill the line up to dot
          line.style.setProperty("--timeline-progress", `${(currentY / infoHeight) * 100}%`);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" id="career" ref={sectionRef}>
      <div className="career-container">
        <h2>
         <span></span>
          <br /> Hiru's Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={timelineRef}>
            <div className="career-dot" ref={dotRef}></div>
          </div>
          {config.experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedIndex === index;
            const isHighlighted = highlightedIndex === index;
            return (
              <div
                key={index}
                ref={(el) => { boxRefs.current[index] = el; }}
                className={`career-info-box ${isLeft ? "career-left" : "career-right"} ${isExpanded ? "career-expanded" : ""} ${isHighlighted ? "career-highlighted" : ""}`}
                onClick={() => handleBoxClick(index)}
              >
                {/* The marker on the timeline */}
                <div className="career-marker"></div>

                {/* Collapsed preview */}
                <div className="career-preview">
                  <h4>{exp.title}</h4>
                  <span className="career-date">{exp.date}</span>
                  {isHighlighted && !isExpanded && (
                    <span className="career-click-prompt">Click to view details</span>
                  )}
                </div>

                {/* Expanded detail panel */}
                <div className="career-detail">
                  <div className="career-detail-text">
                    <h4>{exp.title}</h4>
                    <h5>{exp.event}</h5>
                    <span className="career-date">{exp.date}</span>
                    <p>{exp.description}</p>
                    {exp.github && (
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
                    )}
                  </div>
                  {exp.images.length > 0 && (
                    <div className="career-detail-carousel">
                      <ImageCarousel images={exp.images} />
                    </div>
                  )}
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
