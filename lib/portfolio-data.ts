export const personalInfo = {
  name: 'Kiruthiga S',
  role: 'Full-Stack Web Developer',
  focus: 'AI-Assisted Development',
  location: 'Namakkal, Tamil Nadu, India',
  phone: '9360013623',
  phoneInternational: '919360013623',
  email: 'kiruthigas2208@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kiruthiga-s-553138314/',
  whatsapp: 'https://wa.me/919360013623',
  available: true,
};

export const heroContent = {
  eyebrow: 'FULL-STACK WEB DEVELOPER • AI-ASSISTED DEVELOPMENT',
  headline: 'I Build Digital Experiences That Turn Ideas Into Working Solutions.',
  supportingCopy:
    "I'm Kiruthiga S — a Full-Stack Web Developer specializing in PHP, MySQL, JavaScript and AI-assisted development. I build practical, responsive web applications designed to solve real-world problems.",
  primaryCta: 'View My Work',
  secondaryCta: "Start a Project",
  availability: 'Available for freelance projects',
};

export const aboutContent = {
  heading: 'More Than Just Code.',
  paragraphs: [
    "I'm an MCA graduate and Full-Stack Web Developer with hands-on experience building practical web applications and management systems. My development experience spans PHP, MySQL, JavaScript, HTML and CSS, supported by AI-assisted development workflows.",
    "I enjoy turning real-world requirements into simple, functional and user-friendly digital solutions. Alongside development, I have practical exposure to Generative AI and Prompt Engineering — using AI for code generation, debugging, problem-solving, content creation and workflow improvement.",
  ],
  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Vellalar College for Women, Erode',
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Vellalar College for Women, Erode',
    },
  ],
  highlights: [
    { label: 'Full-Stack Development', value: 'PHP • MySQL • JavaScript' },
    { label: 'AI Workflow', value: 'Prompt Engineering & Code Generation' },
    { label: 'Real-World Projects', value: 'Hospital & Internship Systems' },
    { label: 'Approach', value: 'Practical, User-Focused Solutions' },
  ],
};

export const services = [
  {
    number: '01',
    title: 'Business Websites',
    icon: 'Globe',
    description:
      'Modern, responsive websites for businesses, professionals and organizations.',
  },
  {
    number: '02',
    title: 'Landing Pages',
    icon: 'LayoutTemplate',
    description:
      'Focused landing pages designed around a clear business goal.',
  },
  {
    number: '03',
    title: 'Custom Web Applications',
    icon: 'Code2',
    description:
      'Practical web applications built around specific requirements.',
  },
  {
    number: '04',
    title: 'Management Systems',
    icon: 'Database',
    description:
      'Custom systems for managing users, records and workflows.',
  },
  {
    number: '05',
    title: 'E-Commerce Websites',
    icon: 'ShoppingCart',
    description:
      'Online shopping platforms with authentication and administration functionality.',
  },
  {
    number: '06',
    title: 'Website Redesign',
    icon: 'RefreshCw',
    description:
      'Modernizing outdated websites and improving usability.',
  },
  {
    number: '07',
    title: 'AI-Assisted Development',
    icon: 'Sparkles',
    description:
      'Modern AI-assisted workflows for coding, debugging, ideation, problem-solving and productivity.',
  },
];

export type Project = {
  id: string;
  title: string;
  badge: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  role: string;
  approach: string;
  confidential?: boolean;
  large?: boolean;
  problem: string;
  solution: string;
};

export const projects: Project[] = [
  {
    id: 'mothers-milk-bank',
    title: 'Mothers Milk Bank Management System',
    badge: 'CONFIDENTIAL • REAL-WORLD GOVERNMENT HOSPITAL PROJECT',
    description:
      'A real-world management system developed for Erode Government Hospital to support donor registration, milk collection, storage and distribution workflows.',
    longDescription:
      'Developed for Erode Government Hospital, this system manages the complete workflow of a human milk bank — from donor registration through milk collection, storage tracking, and distribution to recipients. The system was built to meet real operational requirements in a clinical setting.',
    technologies: ['Confidential'],
    features: [
      'Donor registration',
      'Milk collection tracking',
      'Storage management',
      'Distribution workflows',
    ],
    role: 'Full-Stack Developer',
    approach:
      'Developed based on real hospital requirements with a focus on data accuracy, workflow reliability, and ease of use for clinical staff. Due to confidentiality, implementation details are not publicly available.',
    confidential: true,
    large: true,
    problem:
      'The hospital needed a reliable digital system to manage the complex workflow of donor registration, milk collection, safe storage, and distribution — replacing manual, error-prone processes.',
    solution:
      'A dedicated management system was built to handle the full lifecycle of milk bank operations with structured data tracking and workflow management.',
  },
  {
    id: 'internsync',
    title: 'InternSync',
    badge: 'INTERNSHIP MANAGEMENT SYSTEM',
    description:
      'A complete intern management system developed during my internship at AIM Universse, with registration, attendance tracking and performance evaluation modules.',
    longDescription:
      'InternSync is a comprehensive intern management platform developed during my internship at AIM Universse. It streamlines the entire internship lifecycle — from intern registration to attendance tracking and performance evaluation, giving administrators a centralized system to manage and monitor intern progress.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Intern registration',
      'Attendance tracking',
      'Performance evaluation',
      'Intern management',
    ],
    role: 'Web Developer Intern',
    approach:
      'AI-assisted development was used for coding, debugging, problem-solving and feature implementation throughout the project.',
    large: true,
    problem:
      'Managing interns manually across registration, attendance, and performance was time-consuming and error-prone for the organization.',
    solution:
      'InternSync centralizes all intern management tasks into a single web-based system with structured modules for each workflow stage.',
  },
  {
    id: 'finance-management',
    title: 'Finance Management System',
    badge: 'LIVE WEB APPLICATION',
    description:
      'A web-based finance management application for tracking income, expenses and generating financial reports.',
    longDescription:
      'A web-based finance management application that helps users track their income and expenses, maintain financial records, and generate reports for better financial decision-making.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Income tracking',
      'Expense tracking',
      'Financial records',
      'Financial reports',
    ],
    role: 'Full-Stack Developer',
    approach:
      'Built with a practical PHP and MySQL stack, hosted on InfinityFree for live accessibility.',
    problem:
      'Individuals and small businesses need a simple, accessible way to track income and expenses without complex accounting software.',
    solution:
      'A straightforward web application for recording transactions and generating financial reports, accessible from any browser.',
  },
  {
    id: 'faculty-portal',
    title: 'Faculty Resource Portal',
    badge: 'ROLE-BASED PORTAL',
    description:
      'A role-based portal where faculty can upload study materials and students can access and download resources.',
    longDescription:
      'A role-based web portal that bridges faculty and students — faculty members can upload study materials and resources, while students can browse and download what they need. The system separates permissions by role for security and usability.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Role-based access (Faculty / Student)',
      'Material upload',
      'Resource browsing',
      'Download functionality',
    ],
    role: 'Full-Stack Developer',
    approach:
      'Implemented role-based access control to separate faculty and student capabilities within a single portal.',
    problem:
      'Students needed a centralized, organized way to access study materials uploaded by faculty, while faculty needed a simple upload workflow.',
    solution:
      'A role-based portal with distinct interfaces — faculty upload, students download — all managed through a single authentication system.',
  },
  {
    id: 'books-bytes',
    title: 'Books & Bytes',
    badge: 'E-COMMERCE PLATFORM',
    description:
      'An e-commerce platform for purchasing books and downloading e-books with user authentication and an admin panel.',
    longDescription:
      'Books & Bytes is an e-commerce platform that allows users to purchase physical books and download e-books. It includes user authentication for customers and an admin panel for managing products, orders, and content.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'User authentication',
      'Product browsing & purchase',
      'E-book downloads',
      'Admin management panel',
    ],
    role: 'Full-Stack Developer',
    approach:
      'Built with a PHP and MySQL backend, combining physical product commerce with digital download delivery.',
    problem:
      'There was a need for a platform that could handle both physical book sales and digital e-book downloads in one place.',
    solution:
      'An e-commerce platform with authentication, product management, and an admin panel — handling both physical and digital book distribution.',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    badge: 'DESKTOP APPLICATION',
    description:
      'A desktop application developed during my internship at Browzone Infotech based on real hospital requirements.',
    longDescription:
      'A desktop-based hospital management application developed during my internship at Browzone Infotech. The system was built around real hospital requirements, covering patient registration, appointment scheduling, and records management.',
    technologies: ['Visual Basic 6.0'],
    features: [
      'Patient registration',
      'Appointment scheduling',
      'Records management',
    ],
    role: 'Software Developer Intern',
    approach:
      'Built as a desktop application using Visual Basic 6.0, based on real-world hospital operational requirements gathered during the internship.',
    problem:
      'The hospital needed a desktop-based system to manage patient registration, appointments, and records efficiently.',
    solution:
      'A desktop application with modules for patient registration, appointment scheduling, and records management — built around actual hospital workflows.',
  },
];

export const skills = {
  programming: ['Python', 'C', 'C++', 'Java', 'PHP', 'Visual Basic 6.0', 'ASP.NET'],
  web: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'SQL'],
  ai: [
    'Prompt Engineering',
    'Generative AI',
    'AI-Assisted Development',
    'Prompt Optimization',
    'AI Output Evaluation',
  ],
  aiTools: ['ChatGPT', 'Gemini', 'Claude', 'Qwen', 'DeepSeek'],
  tools: ['Visual Studio Code', 'XAMPP', 'Git', 'InfinityFree', 'Vercel'],
};

export const aiWorkflow = [
  { step: 'IDEA', icon: 'Lightbulb' },
  { step: 'PROMPT', icon: 'MessageSquare' },
  { step: 'GENERATE', icon: 'Sparkles' },
  { step: 'EVALUATE', icon: 'CheckCircle' },
  { step: 'REFINE', icon: 'RefreshCw' },
  { step: 'IMPLEMENT', icon: 'Code2' },
];

export const process = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understand your business, goals and requirements.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'PLAN',
    description: 'Define structure, features and user experience.',
    icon: 'ClipboardList',
  },
  {
    number: '03',
    title: 'BUILD',
    description: 'Develop the website or application with practical implementation.',
    icon: 'Hammer',
  },
  {
    number: '04',
    title: 'DELIVER',
    description: 'Test, refine and prepare the final product for launch.',
    icon: 'Rocket',
  },
];

export const experience = [
  {
    company: 'AIM Universse — Coimbatore',
    role: 'Web Developer Intern',
    period: 'Dec 2025 – Mar 2026',
    description:
      'Built InternSync, a complete Intern Management System with registration, attendance and performance modules.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    company: 'Browzone Infotech — Erode',
    role: 'Software Developer Intern',
    period: 'Dec 2023 – Jan 2024',
    description:
      'Built a Hospital Management System using Visual Basic 6.0 based on real hospital requirements.',
    technologies: ['Visual Basic 6.0'],
    points: [
      'Patient registration',
      'Appointment scheduling',
      'Records management',
    ],
  },
];

export const certifications = [
  { title: 'Deep Learning', issuer: 'NPTEL' },
  { title: 'Full Stack Development', issuer: 'OdugaaTech' },
  { title: 'AI for Business Professionals', issuer: 'HP LIFE' },
  { title: 'AI for Beginners', issuer: 'HP LIFE' },
];

export const projectTypes = [
  'Business Website',
  'Landing Page',
  'Web Application',
  'E-Commerce',
  'Management System',
  'Website Redesign',
  'Other',
];

export const budgetRanges = [
  'Under ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000+',
  'Not sure yet',
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
