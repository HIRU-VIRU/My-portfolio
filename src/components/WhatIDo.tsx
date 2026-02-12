import { useEffect } from "react";
import "./styles/WhatIDo.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatIDo = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".education-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      ".education-section h2",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      ".edu-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="education-section" id="education">
      <h2>
        My <span>Education</span>
      </h2>
      <div className="edu-grid">
        {config.education.map((edu, index) => (
          <div 
            key={index} 
            className="edu-card"
            onClick={() => edu.link && window.open(edu.link, '_blank')}
            style={{ cursor: edu.link ? 'pointer' : 'default' }}
          >
            <div className="edu-card-accent"></div>
            <div className="edu-card-content">
              <span className="edu-period">{edu.period}</span>
              <h3>{edu.degree}</h3>
              <h4>{edu.institution}</h4>
              {edu.cgpa && <p className="edu-cgpa">CGPA: {edu.cgpa}</p>}
              <ul className="edu-highlights">
                {edu.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
