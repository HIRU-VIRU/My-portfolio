import { useState, useEffect, useRef } from "react";
import "./styles/Certifications.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdOpenInNew } from "react-icons/md";
import { certificates } from "../data/certificates";
import TiltCard from "./effects/TiltCard";
import useSpotlight from "./effects/useSpotlight";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  useSpotlight(gridRef, [showAll]);
  const displayedCerts = showAll ? certificates : certificates.slice(0, 3);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".certifications-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      ".certifications-section h2",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      ".cert-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [showAll]);

  return (
    <div className="certifications-section section-container" id="certifications">
      <h2>
        Certifications <span>({certificates.length})</span>
      </h2>
      
      <div className="cert-grid" ref={gridRef}>
        {displayedCerts.map((cert) => (
          <div key={cert.id} className="cert-card spotlight-card" data-cursor="disable">
            <TiltCard className="cert-tilt" max={8}>
            <div className="cert-image">
              {cert.image.endsWith('.pdf') ? (
                <div className="cert-pdf-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>PDF Certificate</p>
                </div>
              ) : (
                <img src={cert.image} alt={cert.title} />
              )}
            </div>
            </TiltCard>
            <div className="cert-content">
              <h3>{cert.title}</h3>
              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cert-link"
                  data-cursor="disable"
                >
                  View Certificate <MdOpenInNew />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {certificates.length > 3 && (
        <button 
          className="show-more-btn" 
          onClick={() => setShowAll(!showAll)}
          data-cursor="disable"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Certifications;
