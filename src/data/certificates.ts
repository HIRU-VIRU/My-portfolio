export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  image: string;
  link?: string;
}

export const certificates: Certificate[] = [
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
  },
  // HackerRank Certificates
  {
    id: 19,
    title: "Java (Basic)",
    issuer: "HackerRank",
    image: "/images/My-Certifications/java_basic_hackerrank.png",
    link: "/images/My-Certifications/java_basic_hackerrank.png"
  },
  {
    id: 20,
    title: "Python (Basic)",
    issuer: "HackerRank",
    image: "/images/My-Certifications/python_basic_hackerrank.png",
    link: "/images/My-Certifications/python_basic_hackerrank.png"
  },
  {
    id: 21,
    title: "SQL (Basic)",
    issuer: "HackerRank",
    image: "/images/My-Certifications/sql_basic_hackerrank.png",
    link: "/images/My-Certifications/sql_basic_hackerrank.png"
  },
  {
    id: 22,
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    image: "/images/My-Certifications/sql_intermediate_hackerrank.png",
    link: "/images/My-Certifications/sql_intermediate_hackerrank.png"
  },
  {
    id: 23,
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    image: "/images/My-Certifications/sql_advanced_hackerrank.png",
    link: "/images/My-Certifications/sql_advanced_hackerrank.png"
  }
];
