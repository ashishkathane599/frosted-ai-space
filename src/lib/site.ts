/**
 * Site-wide identity + shared content.
 * Edit this file to update name, socials, and stats everywhere.
 */

export const SITE = {
  name: "Ashish Kathane",
  role: "AI/ML Engineer",
  headline: "AI/ML Engineer · Agentic AI & LLM Systems",
  location: "Nagpur, Maharashtra, India",
  email: "kathaneashish599@gmail.com",
  phone: "+91-8767954639",
  pitch:
    "I build retrieval-augmented, tool-using AI systems — RAG pipelines, LangChain agents, and production APIs on FastAPI, Django and Flask.",
} as const;

export const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/ashishkathane599",              icon: "github"    as const },
  { label: "LinkedIn",  href: "https://linkedin.com/in/ashish-kathane-48bb3726a", icon: "linkedin"  as const },
  { label: "Instagram", href: "https://instagram.com/",                            icon: "instagram" as const },
  { label: "LeetCode",  href: "https://leetcode.com/",                             icon: "leetcode"  as const },
  { label: "Email",     href: "mailto:kathaneashish599@gmail.com",                 icon: "mail"      as const },
];

export const STATS = [
  { value: "8.5",  label: "CGPA" },
  { value: "7+",   label: "AI/ML Projects" },
  { value: "1",    label: "Internship" },
  { value: "5+",   label: "Certifications" },
];

export const EXPERIENCE = [
  {
    role: "AI Engineering Intern",
    company: "Infosys Springboard",
    period: "Oct 2025 – Dec 2025",
    location: "Remote / Nagpur, India",
    bullets: [
      "Designed and implemented an Aadhaar fraud detection system using XGBoost + Random Forest, achieving 94% precision on identity verification patterns.",
      "Built an end-to-end ML pipeline covering data preparation, feature engineering, training, evaluation, and REST API deployment via FastAPI.",
      "Developed interactive Streamlit dashboards to visualize fraud signals; documented architecture and led knowledge-sharing sessions.",
      "Participated in code reviews and sprint reviews, staying current with software development trends through self-directed research.",
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Freelance / Personal AI Projects",
    period: "Jan 2025 – Present",
    location: "Remote",
    bullets: [
      "Designed scalable AI-powered applications using FastAPI, LangChain, HuggingFace Transformers, and vector databases.",
      "Built RAG systems enabling contextual document-based question answering with semantic search.",
      "Implemented NLP pipelines for resume analysis, job matching, ATS scoring, and automated content evaluation.",
      "Integrated MongoDB, PostgreSQL and ChromaDB for scalable AI-application data management and embedding storage.",
      "Deployed AI APIs and full-stack applications with Docker-based environments, optimizing for production readiness.",
    ],
  },
];

export const CERTIFICATIONS = [
  { title: "IBM Data Science Professional Certificate", issuer: "Coursera (5 courses)", tag: "Program" },
  { title: "LangChain for LLM Application Development",  issuer: "DeepLearning.AI",     tag: "Course"  },
  { title: "Machine Learning with Python",                issuer: "Kaggle",              tag: "Course"  },
  { title: "Python Programming",                          issuer: "Kaggle",              tag: "Course"  },
  { title: "AI Engineering Program",                      issuer: "Infosys Springboard", tag: "Program", year: "2025" },
];

export const SKILL_GROUPS = [
  {
    name: "Languages",
    items: ["Python", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    name: "AI/ML & GenAI",
    items: [
      "Machine Learning", "Deep Learning", "NLP", "Generative AI", "RAG",
      "Agentic AI", "LangGraph", "Multi-Agent Systems", "Tool-Using Agents",
      "Fine-Tuning", "Embeddings", "Prompt Engineering", "LangChain (LCEL)",
      "HuggingFace Transformers", "Whisper ASR", "OpenAI API", "Mistral API",
      "Ollama (LLaMA 3.1)", "Sentence-Transformers", "NLTK", "SpaCy",
    ],
  },
  {
    name: "ML Frameworks & Data",
    items: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "XGBoost", "pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    name: "Computer Vision",
    items: ["OpenCV", "MediaPipe", "Tesseract OCR"],
  },
  {
    name: "Vector Databases",
    items: ["ChromaDB", "FAISS"],
  },
  {
    name: "Backend & APIs",
    items: ["FastAPI", "Flask", "Django", "REST APIs"],
  },
  {
    name: "Databases",
    items: ["MongoDB", "PostgreSQL", "SQLite", "Oracle Database"],
  },
  {
    name: "DevOps & Tools",
    items: ["Docker", "Git", "GitHub", "MLflow", "Streamlit", "Jupyter", "VS Code", "Postman", "Google Colab", "Render", "Vercel"],
  },
];

export const TOP_PROFICIENCIES = [
  { name: "Python",              level: 92 },
  { name: "LangChain / RAG",     level: 88 },
  { name: "FastAPI",             level: 86 },
  { name: "Machine Learning",    level: 84 },
  { name: "Vector Databases",    level: 82 },
  { name: "PyTorch / HuggingFace", level: 80 },
];
