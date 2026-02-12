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
    title: "Foundation Certificate - IITM BS Degree",
    issuer: "IIT Madras",
    image: "/images/My-Certifications/Foundation-Certificate-IITM/Foundation-Certificate-IITM.png",
    link: "/images/My-Certifications/Foundation-Certificate-IITM/Foundation-Certificate-IITM.png"
  },
  {
    id: 2,
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/Natural -Language-Processing/Natural_langage_Processing_career_certificate.png",
    link: "/images/My-Certifications/Natural -Language-Processing/Natural_langage_Processing_career_certificate.png"
  },
  {
    id: 3,
    title: "Deep Learning with PyTorch Specialization",
    issuer: "Coursera",
    image: "/images/My-Certifications/Deep-Learning/Pytorch_career_certifiacte.png",
    link: "/images/My-Certifications/Deep-Learning/Pytorch_career_certifiacte.png"
  },
  // NLP Course Certificates
  {
    id: 4,
    title: "NLP - Classification & Vector Spaces",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/Natural -Language-Processing/NLP_with_classifications_vector_spaces.png",
    link: "/images/My-Certifications/Natural -Language-Processing/NLP_with_classifications_vector_spaces.png"
  },
  {
    id: 5,
    title: "NLP - Probabilistic Models",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/Natural -Language-Processing/NLP_with_probablistic_models.png",
    link: "/images/My-Certifications/Natural -Language-Processing/NLP_with_probablistic_models.png"
  },
  {
    id: 6,
    title: "NLP - Sequence Models",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/Natural -Language-Processing/NLP_with_sequence_models.png",
    link: "/images/My-Certifications/Natural -Language-Processing/NLP_with_sequence_models.png"
  },
  {
    id: 7,
    title: "NLP - Attention Models",
    issuer: "DeepLearning.AI",
    image: "/images/My-Certifications/Natural -Language-Processing/NLP_with_attention_models.png",
    link: "/images/My-Certifications/Natural -Language-Processing/NLP_with_attention_models.png"
  },
  // Deep Learning Course Certificates
  {
    id: 8,
    title: "PyTorch - Foundation Concepts",
    issuer: "Coursera",
    image: "/images/My-Certifications/Deep-Learning/foundation-concepts of pytorch.png",
    link: "/images/My-Certifications/Deep-Learning/foundation-concepts of pytorch.png"
  },
  {
    id: 9,
    title: "PyTorch - Building Neural Networks",
    issuer: "Coursera",
    image: "/images/My-Certifications/Deep-Learning/building-neuralnets.png",
    link: "/images/My-Certifications/Deep-Learning/building-neuralnets.png"
  },
  {
    id: 10,
    title: "PyTorch - Advanced Applications",
    issuer: "Coursera",
    image: "/images/My-Certifications/Deep-Learning/advanced-pytorch_applications.png",
    link: "/images/My-Certifications/Deep-Learning/advanced-pytorch_applications.png"
  },
  // AWS Certificates
  {
    id: 11,
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    image: "/images/My-Certifications/AWS-Cloud-Practitioner/AWS-Certification.png",
    link: "/images/My-Certifications/AWS-Cloud-Practitioner/AWS-Certification.png"
  },
  {
    id: 12,
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    image: "/images/My-Certifications/AWS-Cloud-Practitioner/cloud technical AWS.png",
    link: "/images/My-Certifications/AWS-Cloud-Practitioner/cloud technical AWS.png"
  },
  {
    id: 13,
    title: "AWS Exam Prep - Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "/images/My-Certifications/AWS-Cloud-Practitioner/examprep AWS.png",
    link: "/images/My-Certifications/AWS-Cloud-Practitioner/examprep AWS.png"
  },
  // Other Certificates
  {
    id: 14,
    title: "NPTEL - Introduction to IoT",
    issuer: "NPTEL",
    image: "/images/My-Certifications/NPTEL/Nptel_intro to IOT.png",
    link: "/images/My-Certifications/NPTEL/Nptel_intro to IOT.png"
  },
  {
    id: 15,
    title: "NPTEL - Theory of Computation",
    issuer: "NPTEL",
    image: "/images/My-Certifications/NPTEL/nptel_theory_of_computation.png",
    link: "/images/My-Certifications/NPTEL/nptel_theory_of_computation.png"
  },
  {
    id: 16,
    title: "EFSET English Certificate",
    issuer: "EF Standard English Test",
    image: "/images/My-Certifications/EFSET-English/EFSET-English-Certification.png",
    link: "/images/My-Certifications/EFSET-English/EFSET-English-Certification.png"
  },
  {
    id: 17,
    title: "Pythonic Sprint",
    issuer: "IIT Madras",
    image: "/images/My-Certifications/Pythonic-Sprint-IITM/Certificate.png",
    link: "/images/My-Certifications/Pythonic-Sprint-IITM/Certificate.png"
  },
  {
    id: 18,
    title: "IITM BS Degree - Topper Badges",
    issuer: "IIT Madras",
    image: "/images/My-Certifications/IITM-BS-Degree-Topper-Badges/Topper-Badges.png",
    link: "/images/My-Certifications/IITM-BS-Degree-Topper-Badges/Topper-Badges.png"
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
