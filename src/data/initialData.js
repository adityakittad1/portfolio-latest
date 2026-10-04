// Initial seed data — serves as fallback when Supabase is not connected
// All data is editable through the admin CMS

export const profileData = {
  name: 'Aditya Mallappa Kittad',
  displayName: 'Aditya Kittad',
  headline: 'Founder • Cloud & DevOps Engineer • AI Builder',
  bio: `Computer Science & Engineering student at MIT Chhatrapati Sambhaji Nagar, focused on Cloud Computing, Linux/Red Hat, DevOps, Cybersecurity, AI Automation, and Software Engineering. Founder of Rexora Media, Vice President of CSI MIT CSN, and TPEC Lead — building systems, products, and teams.`,
  location: 'Chhatrapati Sambhaji Nagar, Maharashtra, India',
  email: 'adityakittad1054@gmail.com',
  phone: '+91 9112646267',
  availability: 'Open to opportunities',
  resumeUrl: '#',
  profileImageUrl: null,
};

export const socialLinks = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-kittad-bbb9532ba', icon: 'linkedin' },
  { platform: 'GitHub', url: 'https://github.com/adityakittad1', icon: 'github' },
  { platform: 'Email', url: 'mailto:adityakittad1054@gmail.com', icon: 'mail' },
  { platform: 'Phone', url: 'tel:+919112646267', icon: 'phone' },
];

export const experienceData = [
  {
    id: 'rexora',
    organization: 'Rexora Media',
    role: 'Founder',
    type: 'founder',
    startDate: '2025',
    endDate: 'Present',
    description: 'A technology and creative solutions agency delivering software development, branding, AI automation, UI/UX, cloud-hosted applications, and digital solutions.',
    achievements: [
      'Built production client applications using Node.js/Express, Supabase, Vercel and cloud infrastructure',
      'Established a network of 700+ freelancers across disciplines',
      'Assembled and leads a core team of 8 members',
      'Delivers end-to-end digital solutions from branding to deployment',
    ],
    metrics: [
      { value: '700+', label: 'Freelancer Network' },
      { value: '8', label: 'Core Members' },
    ],
    featured: true,
    published: true,
  },
  {
    id: 'csi',
    organization: 'Computer Society of India, MIT CSN',
    role: 'Vice President',
    type: 'leadership',
    startDate: '2026',
    endDate: 'Present',
    description: 'Leading strategic technical initiatives, directing major events, and building industry-faculty collaborations.',
    achievements: [
      'Directed Technophilia 2K26 — a major national-level technical festival',
      'Organized Technophilia 2026, a national event with 2500+ participants',
      'Organized technical workshops engaging 130+ participants',
      'Coordinated executive workshops with Intelligence Research Institute, USA',
      'Built industry-faculty collaborations across 10+ initiatives',
      '1,500+ students reached through large-scale events and initiatives',
    ],
    metrics: [
      { value: '1,500+', label: 'Students Reached' },
      { value: '10+', label: 'Initiatives' },
      { value: '130+', label: 'Workshop Participants' },
      { value: '2', label: 'Major National Events' },
    ],
    featured: true,
    published: true,
  },
  {
    id: 'tpec',
    organization: 'TPEC, MIT CSN',
    role: 'Lead — Marketing, Outreach & Institutional Branding',
    type: 'leadership',
    startDate: 'Nov 2025',
    endDate: 'Present',
    description: 'Designing and executing marketing strategies, managing corporate communications for campus placements, and driving digital campaigns for institutional visibility.',
    achievements: [
      'Designed and executed marketing strategies impacting 2,000+ students',
      'Managed corporate communications for campus placements',
      'Drove digital campaigns increasing institutional visibility and participation',
    ],
    metrics: [
      { value: '2,000+', label: 'Students Impacted' },
    ],
    featured: true,
    published: true,
  },
];

export const projectsData = [
  {
    id: '1',
    slug: 'freedomops',
    title: 'FreedomOps',
    category: 'AI / DevOps',
    shortDescription: 'Self-hosted AI DevOps assistant using local Ollama LLM for infrastructure troubleshooting and operational automation.',
    fullDescription: 'Built a self-hosted AI DevOps assistant using a local Ollama LLM for infrastructure troubleshooting and operational automation. Developed container recovery and automation workflows using Podman, Ansible playbooks and Linux shell scripts.',
    problem: 'DevOps teams often rely on cloud-based AI tools for troubleshooting, creating dependency on external services and raising data privacy concerns. Infrastructure issues require rapid response, but context-switching between documentation and terminals slows resolution.',
    solution: 'FreedomOps provides a fully self-hosted AI assistant that runs locally using Ollama, ensuring data never leaves the infrastructure. It integrates with Podman for container management and Ansible for automated recovery workflows.',
    architecture: 'Local Ollama LLM instance → REST API layer → Container management via Podman → Automated playbooks via Ansible → Linux shell scripts for system operations',
    features: 'AI-powered infrastructure troubleshooting, Container recovery automation, Ansible playbook execution, Shell script automation, Local LLM — no cloud dependency, Privacy-first architecture',
    challenges: 'Optimizing LLM inference on limited hardware, Building reliable container recovery without cloud orchestration, Creating useful automation without over-engineering',
    results: 'Successfully demonstrated self-hosted AI DevOps capabilities with fully local inference and automated recovery workflows.',
    technologies: ['Ollama', 'Podman', 'Ansible', 'Linux', 'Python', 'Bash'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    displayOrder: 1,
    published: true,
  },
  {
    id: '2',
    slug: 'network-security-compliance-auditor',
    title: 'AI-Driven Multi-Vendor Network Security Compliance Auditor',
    category: 'AI / Cybersecurity',
    shortDescription: 'AI-powered security compliance auditing solution for multi-vendor network environments, developed as an SIH-focused concept.',
    fullDescription: 'An AI-driven security solution concept for auditing compliance across multi-vendor network environments. Designed for the Smart India Hackathon, addressing the challenge of maintaining security standards across diverse network infrastructure.',
    problem: 'Organizations with multi-vendor network equipment face fragmented security compliance. Different vendors use different configuration standards, making unified auditing extremely difficult.',
    solution: 'An AI-assisted compliance auditor that normalizes configurations across vendors and analyzes them against security standards, providing unified compliance reports and remediation recommendations.',
    architecture: 'Multi-vendor config ingestion → Normalization layer → AI analysis engine → Compliance mapping → Report generation → Remediation suggestions',
    features: 'Multi-vendor configuration parsing, AI-assisted compliance analysis, Unified security reporting, Remediation recommendations, Standards-based auditing',
    challenges: 'Handling diverse vendor configuration formats, Building accurate AI compliance analysis, Designing a scalable multi-vendor architecture',
    results: 'Concept developed and presented as an SIH-focused security solution.',
    technologies: ['AI', 'Python', 'Cybersecurity', 'Network Security'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    displayOrder: 2,
    published: true,
  },
  {
    id: '3',
    slug: 'ttz-gym-management',
    title: 'TTZ Gym Management System',
    category: 'Full-Stack / SaaS',
    shortDescription: 'Production gym management system with memberships, attendance, payments, analytics, and automated WhatsApp reminders.',
    fullDescription: 'A production-oriented business management system built for a gym client, handling memberships, attendance tracking, payment management, analytics dashboards, and automated WhatsApp reminder notifications.',
    problem: 'Small gym businesses struggle with manual member tracking, payment follow-ups, and attendance records. Paper-based systems lead to lost data and missed revenue.',
    solution: 'A comprehensive digital management system that automates membership tracking, attendance, payments, and client communications through WhatsApp integration.',
    architecture: 'React frontend → Node.js/Express API → Supabase PostgreSQL → WhatsApp API integration → Analytics dashboard',
    features: 'Membership management, Attendance tracking, Payment processing and tracking, Analytics dashboard, Automated WhatsApp reminders, Member profiles and history',
    challenges: 'Building a reliable WhatsApp integration, Designing intuitive UX for non-technical gym staff, Handling payment state management',
    results: 'Deployed as a production client system, automating gym operations and reducing manual tracking effort.',
    technologies: ['React', 'Node.js', 'Express', 'Supabase', 'WhatsApp API'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    displayOrder: 3,
    published: true,
  },
  {
    id: '4',
    slug: 'resumate-ai',
    title: 'Resumate AI',
    category: 'AI / Product',
    shortDescription: 'AI resume builder and ATS analyzer powered by the Gemini API for intelligent resume optimization.',
    fullDescription: 'An AI-powered resume builder and ATS (Applicant Tracking System) analyzer that helps users create optimized resumes. Uses the Gemini API for intelligent content suggestions and ATS compatibility analysis.',
    problem: 'Job seekers struggle to create ATS-friendly resumes. Generic templates fail to highlight relevant skills, and most users lack understanding of ATS parsing requirements.',
    solution: 'An AI-driven tool that analyzes resumes against ATS requirements and provides intelligent suggestions for content optimization, keyword inclusion, and formatting improvements.',
    architecture: 'React frontend → Node.js API → Gemini API integration → Resume parsing → ATS analysis engine → Suggestion generator',
    features: 'AI-powered resume building, ATS compatibility analysis, Intelligent content suggestions, Keyword optimization, Multiple format export, Real-time feedback',
    challenges: 'Designing effective prompts for Gemini API, Building accurate ATS simulation, Balancing AI suggestions with user intent',
    results: 'Functional AI resume tool demonstrating practical Gemini API integration for career technology.',
    technologies: ['React', 'Node.js', 'Gemini API', 'JavaScript'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    displayOrder: 4,
    published: true,
  },
  {
    id: '5',
    slug: 'ai-automation-workflow',
    title: 'AI Automation Workflow System',
    category: 'AI / Automation',
    shortDescription: 'Automated workflow system using Docker, n8n, and Gemini API, reducing manual processing effort by approximately 80%.',
    fullDescription: 'An AI-powered automation workflow system that connects Gmail with Gemini API through n8n orchestration, automating email processing and response workflows. Containerized with Docker for reliable deployment.',
    problem: 'Manual email processing and response workflows consume significant time. Repetitive tasks like classification, summarization, and routing require human attention for each message.',
    solution: 'An automated pipeline that ingests emails via Gmail, processes them through n8n workflows with Gemini AI for intelligent analysis, and executes automated actions based on content.',
    architecture: 'Gmail → n8n workflow engine → Gemini API processing → Automated actions → Docker containerization',
    features: 'Gmail integration, AI-powered email processing, Automated response generation, Workflow orchestration via n8n, Docker containerization, Configurable automation rules',
    challenges: 'Reliable email parsing across formats, Designing robust n8n workflows, Handling API rate limits and failures gracefully',
    results: 'Reduced manual processing effort by approximately 80%.',
    technologies: ['Docker', 'n8n', 'Gemini API', 'Gmail API'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    displayOrder: 5,
    published: true,
  },
  {
    id: '6',
    slug: 'serverless-ai-content-moderation',
    title: 'Serverless AI Content Moderation Tool',
    category: 'Cloud / AI',
    shortDescription: 'Scalable serverless content moderation pipeline designed to handle 1,000+ concurrent requests.',
    fullDescription: 'A serverless AI content moderation tool designed for scalable, real-time content analysis. Built on Vultr cloud infrastructure with REST API endpoints, designed to handle high-concurrency moderation workloads.',
    problem: 'Platforms handling user-generated content need real-time moderation that scales with demand. Traditional server-based solutions struggle with traffic spikes and cost efficiency.',
    solution: 'A serverless moderation pipeline that leverages cloud functions for on-demand scaling, processing content through AI analysis and returning moderation decisions via REST API.',
    architecture: 'REST API ingestion → Serverless functions (Vultr) → AI content analysis → Moderation decision → Response pipeline',
    features: 'Serverless architecture, REST API endpoints, AI content analysis, Scalable to 1000+ concurrent requests, Real-time moderation decisions, Cost-efficient scaling',
    challenges: 'Designing for high concurrency, Minimizing cold start latency, Building reliable moderation logic',
    results: 'Designed a scalable moderation pipeline capable of handling 1,000+ concurrent requests.',
    technologies: ['Vultr', 'REST APIs', 'Serverless', 'AI'],
    githubUrl: null,
    liveUrl: null,
    featured: false,
    displayOrder: 6,
    published: true,
  },
  {
    id: '7',
    slug: 'demand-forecasting',
    title: 'Product Demand Forecasting System',
    category: 'Data Science / ML',
    shortDescription: 'Machine learning forecasting system analyzing 50,000+ data points with 85% prediction accuracy using ARIMA and regression.',
    fullDescription: 'A product demand forecasting system using statistical and machine learning models including ARIMA and regression analysis. Processes 50,000+ data points to predict product demand with 85% accuracy.',
    problem: 'Businesses lose revenue through either overstocking or stockouts. Accurate demand prediction requires processing large datasets and identifying complex seasonal patterns.',
    solution: 'A forecasting system that applies ARIMA time-series analysis and regression models to historical sales data, generating demand predictions that help optimize inventory decisions.',
    architecture: 'Data ingestion → Preprocessing (Pandas) → Feature engineering (NumPy) → ARIMA modeling → Regression analysis (Scikit-Learn) → Prediction output → Visualization',
    features: 'ARIMA time-series analysis, Regression modeling, 50,000+ data point processing, Demand prediction visualization, Accuracy metrics tracking, Historical pattern analysis',
    challenges: 'Handling noisy historical data, Selecting optimal ARIMA parameters, Balancing model complexity with interpretability',
    results: 'Achieved 85% prediction accuracy across 50,000+ data points.',
    technologies: ['Python', 'ARIMA', 'Scikit-Learn', 'Pandas', 'NumPy'],
    githubUrl: null,
    liveUrl: null,
    featured: false,
    displayOrder: 7,
    published: true,
  },
  {
    id: '8',
    slug: 'rexora-media-website',
    title: 'Rexora Media Website',
    category: 'Full-Stack / Web',
    shortDescription: 'Production website for Rexora Media — a technology and creative solutions agency.',
    fullDescription: 'The production website for Rexora Media, built with React, Supabase, and deployed on Vercel. Represents the digital presence of the agency founded by Aditya.',
    problem: 'A new agency needs a professional digital presence that communicates credibility, showcases services, and generates client inquiries.',
    solution: 'A modern, responsive website built with React and backed by Supabase for dynamic content management, deployed on Vercel for performance and reliability.',
    features: 'Responsive design, Service showcases, Contact integration, Dynamic content via Supabase, Vercel deployment, Performance optimized',
    technologies: ['React', 'Supabase', 'Vercel', 'JavaScript'],
    githubUrl: null,
    liveUrl: null,
    featured: false,
    displayOrder: 8,
    published: true,
  },
  {
    id: '9',
    slug: 'educational-institution-website',
    title: 'Educational Institution Website',
    category: 'Web Development',
    shortDescription: 'Responsive educational website for ZPPS Mangegaon with focus on UI/UX and accessibility.',
    fullDescription: 'A responsive educational institution website built for ZPPS Mangegaon, focusing on clean UI/UX design, accessibility, and mobile-first responsive layout.',
    problem: 'Educational institutions, especially in smaller communities, often lack a digital presence. Parents and students need accessible information about the school.',
    solution: 'A clean, accessible, mobile-first website that presents institutional information clearly and works well on all devices.',
    features: 'Responsive design, Accessibility-focused, Mobile-first layout, Clean UI/UX, Information architecture, Multi-device support',
    technologies: ['React', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: null,
    liveUrl: null,
    featured: false,
    displayOrder: 9,
    published: true,
  },
];

export const certificationsData = [
  {
    id: '1',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    issueDate: '2026',
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'System administration certification for Red Hat Enterprise Linux 10, covering essential system administration tasks including installation, configuration, and management.',
    skills: ['Linux', 'Red Hat Enterprise Linux', 'System Administration', 'Shell Scripting', 'User Management', 'Storage Management'],
    featured: true,
    displayOrder: 1,
    published: true,
  },
  {
    id: '2',
    title: 'Oracle Cloud Infrastructure Foundations Associate',
    issuer: 'Oracle',
    issueDate: '2026',
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'Cloud infrastructure fundamentals certification covering Oracle Cloud core services, architecture, and best practices.',
    skills: ['Oracle Cloud', 'Cloud Infrastructure', 'Networking', 'Compute', 'Storage'],
    featured: true,
    displayOrder: 2,
    published: true,
  },
  {
    id: '3',
    title: 'Oracle AI Foundations Associate',
    issuer: 'Oracle',
    issueDate: '2026',
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'AI foundations certification covering artificial intelligence concepts, machine learning, and Oracle AI services.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Oracle AI Services'],
    featured: true,
    displayOrder: 3,
    published: true,
  },
  {
    id: '4',
    title: 'Tata Cybersecurity Analyst',
    issuer: 'Forage',
    issueDate: null,
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'Cybersecurity analysis simulation covering threat identification, incident response, and security best practices.',
    skills: ['Cybersecurity', 'Threat Analysis', 'Incident Response'],
    featured: false,
    displayOrder: 4,
    published: true,
  },
  {
    id: '5',
    title: 'Belkasoft Advanced Digital Forensics',
    issuer: 'Belkasoft',
    issueDate: null,
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'Advanced digital forensics certification covering forensic investigation techniques and evidence analysis.',
    skills: ['Digital Forensics', 'Evidence Analysis', 'Investigation'],
    featured: false,
    displayOrder: 5,
    published: true,
  },
  {
    id: '6',
    title: 'Google Cloud Arcade Trooper',
    issuer: 'Google Cloud',
    issueDate: null,
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'Google Cloud skills badge earned through hands-on cloud labs and challenges.',
    skills: ['Google Cloud Platform', 'Cloud Computing'],
    featured: false,
    displayOrder: 6,
    published: true,
  },
  {
    id: '7',
    title: 'Decodex 2025 Round 2 Qualifier',
    issuer: 'Decodex',
    issueDate: '2025',
    credentialId: null,
    verificationUrl: null,
    certificateImageUrl: null,
    description: 'Qualified for Round 2 of Decodex 2025 competition.',
    skills: ['Problem Solving', 'Competitive Programming'],
    featured: false,
    displayOrder: 7,
    published: true,
  },
];

export const skillCategoriesData = [
  {
    id: '1',
    name: 'Cloud',
    displayOrder: 1,
    skills: [
      { name: 'AWS', icon: 'cloud' },
      { name: 'Oracle Cloud Infrastructure', icon: 'cloud' },
      { name: 'Google Cloud Platform', icon: 'cloud' },
      { name: 'Vercel', icon: 'triangle' },
      { name: 'Render', icon: 'server' },
    ],
  },
  {
    id: '2',
    name: 'DevOps & Infrastructure',
    displayOrder: 2,
    skills: [
      { name: 'Linux', icon: 'terminal' },
      { name: 'Red Hat Enterprise Linux', icon: 'shield' },
      { name: 'Docker', icon: 'box' },
      { name: 'Podman', icon: 'box' },
      { name: 'Ansible', icon: 'settings' },
      { name: 'Kubernetes', icon: 'layers' },
      { name: 'OpenShift', icon: 'hexagon' },
      { name: 'Git', icon: 'git-branch' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Bash', icon: 'terminal-square' },
    ],
  },
  {
    id: '3',
    name: 'Cybersecurity',
    displayOrder: 3,
    skills: [
      { name: 'Network Security', icon: 'shield' },
      { name: 'Security Compliance', icon: 'check-circle' },
      { name: 'Digital Forensics', icon: 'search' },
      { name: 'Linux Security', icon: 'lock' },
      { name: 'REST/API Security', icon: 'key' },
    ],
  },
  {
    id: '4',
    name: 'Programming',
    displayOrder: 4,
    skills: [
      { name: 'Python', icon: 'code' },
      { name: 'Java', icon: 'coffee' },
      { name: 'C', icon: 'code' },
      { name: 'JavaScript', icon: 'braces' },
      { name: 'SQL', icon: 'database' },
      { name: 'HTML', icon: 'file-code' },
      { name: 'CSS', icon: 'palette' },
      { name: 'Bash', icon: 'terminal' },
    ],
  },
  {
    id: '5',
    name: 'Development',
    displayOrder: 5,
    skills: [
      { name: 'React.js', icon: 'atom' },
      { name: 'Vite', icon: 'zap' },
      { name: 'Tailwind CSS', icon: 'wind' },
      { name: 'Material UI', icon: 'layout' },
      { name: 'Framer Motion', icon: 'move' },
      { name: 'Node.js', icon: 'server' },
      { name: 'Express.js', icon: 'server' },
      { name: 'REST APIs', icon: 'globe' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'SQLite', icon: 'database' },
      { name: 'Supabase', icon: 'database' },
    ],
  },
  {
    id: '6',
    name: 'AI & Automation',
    displayOrder: 6,
    skills: [
      { name: 'Gemini API', icon: 'sparkles' },
      { name: 'n8n', icon: 'workflow' },
      { name: 'Ollama', icon: 'bot' },
      { name: 'Pandas', icon: 'table' },
      { name: 'NumPy', icon: 'calculator' },
      { name: 'Scikit-Learn', icon: 'brain' },
    ],
  },
];

export const educationData = [
  {
    id: '1',
    institution: 'Maharashtra Institute of Technology',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    description: 'Chhatrapati Sambhaji Nagar',
    focusAreas: 'Cloud Computing, DevOps, Cybersecurity, AI, Software Engineering',
    achievements: 'Selected for B.Tech Honours with Research Programme — 2026',
    startDate: '2023',
    endDate: 'Expected May 2027',
    displayOrder: 1,
  },
];

export const achievementsData = [
  {
    id: '1',
    title: 'B.Tech Honours with Research Programme',
    description: 'Selected for the Honours with Research Programme at MIT CSN — 2026.',
    category: 'Academic',
    featured: true,
  },
  {
    id: '2',
    title: 'Red Hat Certified System Administrator',
    description: 'Earned RHCSA certification for Red Hat Enterprise Linux 10.',
    category: 'Certification',
    featured: true,
  },
  {
    id: '3',
    title: 'Technophilia 2K26 Director',
    description: 'Directed Technophilia 2K26, a major national-level technical festival at MIT CSN.',
    category: 'Leadership',
    featured: true,
  },
  {
    id: '4',
    title: 'Technophilia 2026 Organizer',
    description: 'Organized Technophilia 2026, a national-level event with 2500+ student participants as Vice President of CSI MIT CSN.',
    category: 'Leadership',
    featured: true,
  },
  {
    id: '5',
    title: 'IRI Executive Workshop Coordinator',
    description: 'Coordinated executive workshops with Intelligence Research Institute, USA.',
    category: 'Leadership',
    featured: true,
  },
  {
    id: '6',
    title: 'Technical Workshop Leader',
    description: 'Led peer-learning workshops engaging 130+ participants across technical domains.',
    category: 'Leadership',
    featured: false,
  },
];

export const timelineData = [
  {
    year: '2025',
    items: [
      { title: 'Founded Rexora Media', description: 'Launched a technology and creative solutions agency', category: 'founder' },
      { title: 'TPEC Lead — Marketing & Branding', description: 'Led marketing, outreach, and institutional branding at MIT CSN', category: 'leadership' },
      { title: 'Engineering Growth', description: 'Deep-dived into cloud computing, Linux, and full-stack development', category: 'engineering' },
    ],
  },
  {
    year: '2026',
    items: [
      { title: 'RHCSA Certification', description: 'Red Hat Certified System Administrator — RHEL 10', category: 'certification' },
      { title: 'CSI Vice President', description: 'Elected Vice President of Computer Society of India, MIT CSN', category: 'leadership' },
      { title: 'Technophilia 2K26', description: 'Directed a major national-level technical festival', category: 'leadership' },
      { title: 'Technophilia 2026', description: 'Organized and executed a national-level event with 2500+ participants', category: 'leadership' },
      { title: 'Cloud & DevOps Focus', description: 'AWS, OCI, Docker, Kubernetes, Ansible — building infrastructure', category: 'engineering' },
      { title: 'AI & Cybersecurity Projects', description: 'FreedomOps, Network Security Auditor, AI automation systems', category: 'engineering' },
      { title: 'B.Tech Honours Selection', description: 'Selected for B.Tech Honours with Research Programme', category: 'academic' },
    ],
  },
  {
    year: '2027',
    items: [
      { title: 'B.Tech Completion', description: 'Expected graduation — B.Tech CSE from MIT CSN', category: 'academic' },
    ],
  },
];

export const currentlyBuildingData = [
  { title: 'Cloud Infrastructure', description: 'Building with AWS, OCI, and GCP — designing scalable systems', active: true },
  { title: 'DevOps Pipelines', description: 'Docker, Kubernetes, Ansible — automating infrastructure', active: true },
  { title: 'Linux & Red Hat', description: 'RHEL system administration and enterprise Linux operations', active: true },
  { title: 'Cybersecurity', description: 'Network security, compliance auditing, and security automation', active: true },
  { title: 'AI & Automation', description: 'Gemini API, n8n workflows, and AI-powered DevOps tools', active: true },
  { title: 'Product Development', description: 'Shipping production software through Rexora Media', active: true },
];

export const siteSettings = {
  siteName: 'Aditya Kittad',
  siteTitle: 'Aditya Kittad — Cloud, DevOps, Cybersecurity & AI Engineer',
  siteDescription: 'Founder, Cloud & DevOps Engineer, AI Builder. Specializing in cloud infrastructure, Linux/Red Hat, cybersecurity, AI automation, and full-stack engineering.',
  accentColor: '#3b82f6',
  theme: 'dark',
};

export const terminalCommands = {
  help: `Available commands:
  whoami     — identity
  focus      — current areas
  stack      — tech ecosystem
  projects   — featured work
  certs      — certifications
  leadership — roles & impact
  rexora     — founder story
  contact    — reach out
  clear      — clear terminal`,
  whoami: `aditya-kittad
  founder · cloud-devops-engineer · ai-builder
  @rexora-media | @csi-mit-csn | @tpec-mit-csn`,
  focus: `current focus:
  → cloud / aws / oci / gcp
  → devops / docker / kubernetes / ansible
  → linux / rhel / system-administration
  → cybersecurity / network-security / compliance
  → ai / automation / gemini / ollama
  → systems / products / teams`,
  stack: `primary stack:
  cloud:     aws · oci · gcp · vercel
  devops:    docker · podman · ansible · k8s
  security:  network-sec · compliance · forensics
  languages: python · javascript · java · c · sql
  frontend:  react · vite · tailwind · framer-motion
  backend:   node · express · supabase · postgresql
  ai:        gemini-api · n8n · ollama · scikit-learn`,
  projects: `featured projects:
  [01] freedomops          — self-hosted ai devops assistant
  [02] security-auditor    — ai multi-vendor compliance
  [03] ttz-gym             — production saas system
  [04] resumate-ai         — ai resume builder
  [05] ai-automation       — workflow automation (80% effort reduction)
  [06] content-moderation  — serverless ai (1000+ concurrent)
  [07] demand-forecasting  — ml prediction (85% accuracy)

  type 'explore my work' or scroll to projects section`,
  certs: `certifications:
  → rhcsa — red hat enterprise linux 10
  → oci foundations associate — oracle
  → oracle ai foundations associate
  → tata cybersecurity analyst — forage
  → belkasoft advanced digital forensics
  → google cloud arcade trooper
  → decodex 2025 round 2 qualifier`,
  leadership: `leadership roles:
  ★ vice president — csi, mit csn (2026—present)
    → 1,500+ students reached
    → 10+ initiatives
    → technophilia 2k26 · national tech event
  
  ★ lead marketing & branding — tpec, mit csn (2025—present)
    → 2,000+ students impacted
    → corporate communications
    → digital campaigns`,
  rexora: `rexora media — founded 2025
  technology & creative solutions agency
  
  → software development
  → branding & design
  → ai automation
  → cloud-hosted applications
  
  network: 700+ freelancers · 8 core members
  stack: node.js · express · supabase · vercel`,
  contact: `reach out:
  email:    adityakittad1054@gmail.com
  phone:    +91 9112646267
  linkedin: linkedin.com/in/aditya-kittad-bbb9532ba
  github:   github.com/adityakittad1
  
  open to engineering opportunities, technical collaborations,
  product work, and technology partnerships.`,
};
