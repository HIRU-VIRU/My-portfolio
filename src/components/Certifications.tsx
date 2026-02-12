import { useState, useEffect } from "react";
import "./styles/Certifications.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdOpenInNew } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  image: string;
  link?: string;
}

const certificates: Certificate[] = [
  // Top 3 featured certificates
  {
    id: 1,
    title: "Foundation Certificate - IIT Madras BS Degree",
    issuer: "IIT Madras",
    image: "/images/My-Certifications/foundation_iitm_certificate.png",
    link: "/images/My-Certifications/foundation_iitm_certificate.png"
  },
  {
    id: 2,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/natural_language_processing_career_certificate.png",
    link: "/images/My-Certifications/natural_language_processing_career_certificate.png"
  },
  {
    id: 3,
    title: "Deep Learning with PyTorch Specialization",
    issuer: "Coursera",
    image: "/images/My-Certifications/pytorch_DL_career_certificate.png",
    link: "/images/My-Certifications/pytorch_DL_career_certificate.png"
  },
  // NLP Course Certificates
  {
    id: 4,
    title: "NLP with Classification and Vector Spaces",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/nlp_with_classification_vector_spaces.png",
    link: "/images/My-Certifications/nlp_with_classification_vector_spaces.png"
  },
  {
    id: 5,
    title: "NLP with Probabilistic Models",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/nlp_with_probablistic_models.png",
    link: "/images/My-Certifications/nlp_with_probablistic_models.png"
  },
  {
    id: 6,
    title: "NLP with Sequence Models",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/nlp_with_sequence_models.png",
    link: "/images/My-Certifications/nlp_with_sequence_models.png"
  },
  {
    id: 7,
    title: "NLP with Attention Models",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/nlp_with_attention_models.png",
    link: "/images/My-Certifications/nlp_with_attention_models.png"
  },
  // Deep Learning Course Certificates
  {
    id: 8,
    title: "Introduction to Deep Learning with PyTorch",
    issuer: "Coursera",
    image: "/images/My-Certifications/foundational_concepts_of_pytorch.png",
    link: "/images/My-Certifications/foundational_concepts_of_pytorch.png"
  },
  {
    id: 9,
    title: "Building Deep Learning Models with PyTorch",
    issuer: "Coursera",
    image: "/images/My-Certifications/pytorch_building_neural_networks.png",
    link: "/images/My-Certifications/pytorch_building_neural_networks.png"
  },
  {
    id: 10,
    title: "Deep Neural Networks with PyTorch",
    issuer: "Coursera",
    image: "/images/My-Certifications/advanced_pytorch_applications.png",
    link: "/images/My-Certifications/advanced_pytorch_applications.png"
  },
  // AWS Certificates
  {
    id: 11,
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    image: "/images/My-Certifications/aws_cloud_practitioner_essentials.png",
    link: "/images/My-Certifications/aws_cloud_practitioner_essentials.png"
  },
  {
    id: 12,
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    image: "/images/My-Certifications/aws_cloud_tehnical_essentials.png",
    link: "/images/My-Certifications/aws_cloud_tehnical_essentials.png"
  },
  {
    id: 13,
    title: "AWS Certified Cloud Practitioner - Exam Prep",
    issuer: "Amazon Web Services",
    image: "/images/My-Certifications/aws_exam_prep.png",
    link: "/images/My-Certifications/aws_exam_prep.png"
  },
  // Other Certificates
  {
    id: 14,
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    image: "/images/My-Certifications/nptel_intro_to_iot.png",
    link: "/images/My-Certifications/nptel_intro_to_iot.png"
  },
  {
    id: 15,
    title: "Theory of Computation",
    issuer: "NPTEL",
    image: "/images/My-Certifications/nptel_theory_of_computation.png",
    link: "/images/My-Certifications/nptel_theory_of_computation.png"
  },
  {
    id: 16,
    title: "EF SET English Certificate",
    issuer: "EF Standard English Test",
    image: "/images/My-Certifications/efset_english_certificate.png",
    link: "/images/My-Certifications/efset_english_certificate.png"
  },
  {
    id: 17,
    title: "Pythonic Sprint Certificate",
    issuer: "IIT Madras",
    image: "/images/My-Certifications/pythonic_sprint_certificate.png",
    link: "/images/My-Certifications/pythonic_sprint_certificate.png"
  },
  {
    id: 18,
    title: "IIT Madras BS Degree - Topper Badges",
    issuer: "IIT Madras",
    image: "/images/My-Certifications/iitm_topper_badges.png",
    link: "/images/My-Certifications/iitm_topper_badges.png"
  }
];

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
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
      
      <div className="cert-grid">
        {displayedCerts.map((cert) => (
          <div key={cert.id} className="cert-card" data-cursor="disable">
            <div className="cert-image">
              {cert.image.endsWith('.pdf') ? (
                <div className="cert-pdf-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V12" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15H15" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>PDF Certificate</p>
                </div>
              ) : (
                <img src={cert.image} alt={cert.title} />
              )}
            </div>
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
