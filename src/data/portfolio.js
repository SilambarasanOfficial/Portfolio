export const personalInfo = {
  name: "V. Silambarasan",
  shortName: "Sila",
  roles: [
    "Senior Software Developer",
    "Backend & AI Systems Engineer",
    "Full Stack Developer",
    "LLM Integration Specialist",
    "Mobile App Developer",
  ],
  tagline: "Architecting high-performance systems — from schema design to deployment.",
  email: "silambarasanofficial001@gmail.com",
  phone: "+91 6384349387",
  phone2: "+91 6384349387",
  location: "Akshayanagar, Bengaluru, Karnataka",
  permanentLocation: "P.velur, Namakkal, Tamil Nadu",
  github: "https://github.com/silambarasan",
  linkedin: "https://linkedin.com/in/silambarasan",
  summary:
    "Results-driven Senior Software Developer with 3+ years of experience architecting high-performance backend systems, AI-powered analytics engines, enterprise ERP platforms, and cross-platform mobile applications. Promoted from Junior to Senior Developer, demonstrating rapid technical growth and the ability to own complex, multi-product delivery. Specializes in Python, PHP, Django, Angular, React and JavaScript ecosystems with deep expertise in LLM integration, scalable API design, and cloud infrastructure.",
};

export const skillCategories = [
  {
    category: "Languages",
    icon: "Code",
    color: "#6366f1",
    skills: ["Python", "PHP", "Java", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    icon: "Server",
    color: "#8b5cf6",
    skills: ["Django", "FastAPI", "Flask", "Laravel"],
  },
  {
    category: "Frontend & Mobile",
    icon: "Monitor",
    color: "#06b6d4",
    skills: ["Angular", "React Native CLI", "Android", "iOS", "Html"],
  },
  {
    category: "AI / ML",
    icon: "Brain",
    color: "#f59e0b",
    skills: ["LLM Integration", "OpenAI", "Claude", "Gemini", "Prompt Engineering", "AI Analytics"],
  },
  {
    category: "Integrations",
    icon: "Plug",
    color: "#10b981",
    skills: ["REST APIs", "WhatsApp Business API", "Telephony", "Voice-to-Text", "Payment APIs", "Banking APIs"],
  },
  {
    category: "DevOps & Cloud",
    icon: "Cloud",
    color: "#3b82f6",
    skills: ["Docker", "AWS", "Nginx", "CI/CD"],
  },
  {
    category: "Databases",
    icon: "Database",
    color: "#ef4444",
    skills: ["MySQL", "PostgreSQL", "Vector DB", "MongoDB"],
  },
  {
    category: "AI Tools",
    icon: "Sparkles",
    color: "#a78bfa",
    skills: ["Cursor", "GitHub Copilot", "Claude", "Trae", "Lovable"],
  },
];

export const experiences = [
  {
    title: "Senior Software Application Engineer",
    subtitle: "Full Stack & Mobile Developer",
    company: "Dream & Magic Media Pvt. Ltd.",
    location: "Bengaluru, India",
    period: "Apr 2023 – Apr 2026",
    type: "Full-time",
    highlights: [
      "Promoted from Junior to Senior Developer, assuming architectural ownership across 5+ concurrent production systems.",
      "Designed and delivered end-to-end backend services, REST APIs, AI analytics platforms, and React Native mobile apps serving thousands of daily active users.",
      "Led integration of WhatsApp Business API and telephony systems into a multi-module ERP, reducing lead response time by ~40%.",
      "Maintained 99.9% uptime across microservice-style backends (Django · FastAPI · Laravel) deployed on AWS with Docker and Nginx.",
      "Mentored junior developers on API design, code review standards, and CI/CD deployment best practices.",
    ],
    tech: ["Python", "Django", "FastAPI", "Laravel", "Angular", "React Native", "AWS", "Docker"],
  },
  {
    title: "Software Developer",
    subtitle: "CRM & API Integrations",
    company: "Green Mark International",
    location: "Singapore",
    period: "Oct 2022 – Mar 2023",
    type: "Full-time",
    highlights: [
      "Developed and maintained a customer CRM system, streamlining client lifecycle management for an international operations team.",
      "Integrated payment gateway and banking APIs enabling secure, automated transaction processing and reconciliation.",
      "Optimized REST API endpoints for CRM dashboards, improving data retrieval performance by ~30%.",
    ],
    tech: ["PHP", "Laravel", "MySQL", "REST APIs", "Payment Gateway"],
  },
];

export const projects = [
  {
    id: 1,
    title: "AI-Powered Campaign & Lead Analytics Engine",
    description:
      "End-to-end AI analytics engine processing 50,000+ lead records daily with sub-second query response times. Integrated LLM for natural language querying of business metrics, reducing analyst query time by ~60%. Built automated data pipelines eliminating 70% of manual reporting effort.",
    tech: ["Python", "Django", "FastAPI", "Angular", "PostgreSQL", "OpenAI", "LLM"],
    metrics: [
      { label: "Records/day", value: "50K+" },
      { label: "Query time reduced", value: "60%" },
      { label: "Manual effort saved", value: "70%" },
    ],
    category: "AI / ML",
    color: "#6366f1",
  },
  {
    id: 2,
    title: "Total SQFT – Enterprise ERP Platform",
    description:
      "Multi-module ERP covering lead management, billing & accounting, campaign analytics with ML-based predictions, and customer self-service portal. Integrated WhatsApp Business API and cold-calling systems, boosting sales team efficiency by ~35%. Campaign prediction models improved lead conversion forecasting accuracy by ~25%.",
    tech: ["PHP", "Laravel", "Django", "FastAPI", "Angular", "Docker", "Nginx", "AWS"],
    metrics: [
      { label: "Sales efficiency boost", value: "35%" },
      { label: "Forecast accuracy", value: "25%" },
      { label: "Modules", value: "5+" },
    ],
    category: "ERP",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Chatbot Automation Platform",
    description:
      "No-code chatbot builder enabling non-technical users to design conversational flows for WhatsApp & Web. Deployed across 10+ clients handling 5,000+ interactions/day. Reduced manual lead data entry by ~80% through form automation and CRM synchronization.",
    tech: ["Angular", "Python", "Django", "MySQL", "WhatsApp API"],
    metrics: [
      { label: "Interactions/day", value: "5K+" },
      { label: "Clients deployed", value: "10+" },
      { label: "Data entry reduced", value: "80%" },
    ],
    category: "Automation",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "Construction ERP System",
    description:
      "Full-featured construction ERP covering project, material, labor, and machinery tracking with financial forecasting models. Reduced material over-procurement by ~20% and improved multi-project budget accuracy through resource prediction algorithms.",
    tech: ["Django", "FastAPI", "Angular", "MySQL"],
    metrics: [
      { label: "Over-procurement reduced", value: "20%" },
      { label: "Budget accuracy", value: "Improved" },
      { label: "Modules", value: "4" },
    ],
    category: "ERP",
    color: "#10b981",
  },
  {
    id: 5,
    title: "E-Commerce Platform – Roxynivah",
    description:
      "Production e-commerce system with catalog, cart, order management, and real-time delivery tracking. Processes 500+ transactions/day with high availability and performance.",
    tech: ["Django", "Laravel", "Angular", "MySQL"],
    metrics: [
      { label: "Transactions/day", value: "500+" },
      { label: "Features", value: "Full-stack" },
    ],
    category: "E-Commerce",
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "ERP Mobile Application",
    description:
      "Cross-platform Android & iOS mobile ERP app with offline data sync, push notifications, and biometric authentication. Received 4.3/5 rating by internal users.",
    tech: ["React Native CLI", "Laravel", "Django", "Android", "iOS"],
    metrics: [
      { label: "User rating", value: "4.3/5" },
      { label: "Platforms", value: "Android & iOS" },
    ],
    category: "Mobile",
    color: "#ef4444",
  },
  {
    id: 7,
    title: "Corporate Website Backend – Kraheja Corp",
    description:
      "Scalable backend API layer for krahejacorp.com, a high-profile real estate corporate website, ensuring secure content management and high performance.",
    tech: ["Laravel", "PHP", "MySQL"],
    metrics: [
      { label: "Type", value: "Enterprise" },
      { label: "Domain", value: "Real Estate" },
    ],
    category: "Backend",
    color: "#3b82f6",
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Excel College for Commerce & Science",
    university: "Periyar University",
    period: "2019 – 2022",
    score: "85.33%",
    type: "Degree",
  },
  {
    degree: "Python Programming Certification",
    institution: "ETS Academy",
    university: "Ministry of MSME, Govt. of India",
    period: "Jun – Aug 2022",
    score: "95.2%",
    type: "Certification",
  },
];

export const achievements = [
  {
    icon: "FileText",
    title: "Research Paper Presenter",
    desc: "Presented a research paper on Internet of Things (IoT) at a collegiate technical symposium.",
  },
  {
    icon: "Trophy",
    title: "National Level Competitor",
    desc: "Competed in national-level game design competitions and multimedia IT & business events.",
  },
  {
    icon: "Heart",
    title: "NSS Volunteer",
    desc: "Served as an NSS (National Service Scheme) volunteer, contributing to community development programs.",
  },
];

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "5+", label: "Production Systems" },
  { value: "50K+", label: "Records / Day" },
  { value: "99.9%", label: "Uptime Maintained" },
];

export const projectCategories = ["All", "AI / ML", "ERP", "Automation", "E-Commerce", "Mobile", "Backend"];
