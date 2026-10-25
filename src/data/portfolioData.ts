export const identity = {
  monogram: "DK",
  fullName: "Dhineshkumar J",
  headline: "Full Stack Developer & GenAI Enthusiast",
  subheadline: "B.E. Computer Science Engineering · Class of 2027",
  bio: "I am a final-year Computer Science Engineering student interested in full-stack development, Java backend engineering, modern web applications, and Generative AI. I enjoy solving logical problems and building practical applications that combine responsive frontend interfaces with backend services and database integration.",
  email: "dhineshdeveloper001@gmail.com",
  phone: "+91 87547 34490",
  github: { handle: "dhineshdeveloper001-sketch", url: "https://github.com/dhineshdeveloper001-sketch" },
  leetcode: { handle: "dhineshkumar_0001", url: "https://leetcode.com/u/dhineshkumar_0001/" },
  linkedin: null, // STRICT: never render
} as const;

export const education = {
  degree: "B.E. — Computer Science and Engineering",
  college: "Government College of Engineering, Srirangam",
  cgpa: "7.76",
  graduation: "Expected 2027",
  status: "Final-year undergraduate student",
} as const;

export const experience = {
  role: "Java Full Stack Intern",
  company: "The Mind IT Company",
  duration: "1 Month",
  bullets: [
    "Gained practical exposure to Java full-stack development.",
    "Developed understanding of frontend and backend application workflows.",
    "Strengthened Java programming and web-development fundamentals.",
  ],
} as const;

export const skills = [
  {
    index: "01",
    category: "PROGRAMMING LANGUAGES",
    items: ["Java", "Python", "C"]
  },
  {
    index: "02",
    category: "FRONTEND DEVELOPMENT",
    items: ["HTML", "CSS", "Tailwind CSS", "React"]
  },
  {
    index: "03",
    category: "BACKEND DEVELOPMENT",
    items: ["Java", "Spring Boot"]
  },
  {
    index: "04",
    category: "DATABASES",
    items: ["MySQL", "PostgreSQL"]
  },
  {
    index: "05",
    category: "CORE STRENGTHS",
    items: ["Logical Thinking", "Problem Solving", "DSA Practice"]
  }
] as const;

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly desc: string;
  readonly stack: readonly string[];
  readonly github: string;
  readonly liveUrl: string;
  readonly liveLabel?: string;
  readonly status: "VERIFIED BUILD" | "CONCEPT · SPEC PENDING";
  readonly previewType: "workflow" | "dashboard" | "calculator" | "cashflow" | "auth" | "game";
  readonly localImage: string;
}

export const projects: readonly ProjectItem[] = [
  {
    id: "01",
    title: "Billing Software",
    subtitle: "Enterprise SaaS · POS & Invoicing",
    desc: "A comprehensive retail billing and invoice management system with real-time product tracking, dynamic pricing engines, automated GST calculation modules, and instant receipt generation.",
    stack: ["Java 21", "Spring Boot 3.2", "MySQL", "React", "GST Engine"],
    github: "https://github.com/dhineshdeveloper001-sketch/Billing_Software.git",
    liveUrl: "https://billingsoftware-iota.vercel.app/",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "calculator",
    localImage: "/projects/project-3.png"
  },
  {
    id: "02",
    title: "ScholarLink Hub",
    subtitle: "EdTech Platform · Academic Portal",
    desc: "A unified academic management platform enabling faculty-student collaboration, attendance monitoring, gradebook administration, and institutional reporting at scale.",
    stack: ["React", "Spring Boot", "PostgreSQL", "REST API", "RBAC"],
    github: "https://github.com/dhineshdeveloper001-sketch/Scholarlink-hub.git",
    liveUrl: "https://scholarlink-mocha.vercel.app/",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "dashboard",
    localImage: "/projects/project-2.png"
  },
  {
    id: "03",
    title: "ChikkoShare",
    subtitle: "Cloud File Sharing · WebRTC & Backblaze B2",
    desc: "A secure ShareIt-inspired file sharing platform supporting lightning-fast WebRTC transfers on local networks and direct cloud transfers using Backblaze B2 Signed URLs with QR pairing.",
    stack: ["React", "TypeScript", "Node.js", "Socket.IO", "WebRTC", "Backblaze B2"],
    github: "https://github.com/dhineshdeveloper001-sketch",
    liveUrl: "https://chikkoshare.onrender.com",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "auth",
    localImage: "/projects/project-4.png"
  },
  {
    id: "04",
    title: "Smart File Organizer",
    subtitle: "Full Stack SaaS · Storage Analytics",
    desc: "A full-stack file management application that automatically organizes uploaded files into categories such as Images, Documents, Videos, PDFs, Audio, and Archives with storage analytics.",
    stack: ["React", "Spring Boot", "MySQL", "JWT", "REST API"],
    github: "https://github.com/dhineshdeveloper001-sketch",
    liveUrl: "https://smart-file-organizer-zeta.vercel.app/",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "cashflow",
    localImage: "/projects/project-5.png"
  },
  {
    id: "05",
    title: "Nexus Cart",
    subtitle: "E-Commerce Engine · Full Stack",
    desc: "A full-featured e-commerce engine with product catalog management, cart lifecycle handling, payment gateway integration, and real-time inventory tracking.",
    stack: ["React", "Node.js", "MongoDB", "Stripe", "REST API"],
    github: "https://github.com/dhineshdeveloper001-sketch",
    liveUrl: "https://shopping-psi-ten.vercel.app/",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "calculator",
    localImage: "/projects/project-3.png"
  },
  {
    id: "06",
    title: "SyncTask / Mess Reduction",
    subtitle: "Workflow Automation · Task Management",
    desc: "An institutional workflow and distributed task scheduling platform featuring Kanban review stages, meal headcount forecasting to cut waste, and real-time approval pipelines.",
    stack: ["Java", "Spring Boot", "MySQL", "React", "Workflow Engine"],
    github: "https://github.com/dhineshdeveloper001-sketch/MessReduction",
    liveUrl: "https://naanmudhalvan-alpha.vercel.app/",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "workflow",
    localImage: "/projects/project-1.png"
  },
  {
    id: "07",
    title: "Binary Logic Game",
    subtitle: "Interactive Learning · Boolean Logic",
    desc: "An interactive visual learning platform for boolean logic gates featuring circuit simulation, real-time truth table validation, and progressive puzzle difficulty.",
    stack: ["JavaScript", "Canvas API", "CSS3", "HTML5", "AST Engine"],
    github: "https://github.com/dhineshdeveloper001-sketch",
    liveUrl: "https://binary-game-ten.vercel.app/",
    liveLabel: "Launch Live Demo",
    status: "VERIFIED BUILD",
    previewType: "game",
    localImage: "/projects/project-6.png"
  }
] as const;

export interface CertificateItem {
  readonly index: string;
  readonly title: string;
  readonly category: string;
  readonly slug: string;
  readonly issuer: string;
}

export const certificates: readonly CertificateItem[] = [
  {
    index: "01",
    title: "Java Certification",
    category: "Backend & Core Programming",
    slug: "java-certification",
    issuer: "Verified Credential Authority"
  },
  {
    index: "02",
    title: "Spring Boot Certification",
    category: "Enterprise Java Framework",
    slug: "spring-boot-certification",
    issuer: "Enterprise Framework Institute"
  },
  {
    index: "03",
    title: "Web Development Certificate",
    category: "Full-Stack Web Engineering",
    slug: "web-development-certificate",
    issuer: "Web Technology Board"
  },
  {
    index: "04",
    title: "Bug Bounty Certificate",
    category: "Application Security & Vulnerability Analysis",
    slug: "bug-bounty-certificate",
    issuer: "Security & Testing Guild"
  },
  {
    index: "05",
    title: "Treasure Hunt Certificate",
    category: "Analytical & Team Event",
    slug: "treasure-hunt-certificate",
    issuer: "State Level Engineering Meet"
  },
  {
    index: "06",
    title: "Connections Certificate",
    category: "Technical / Logical Event",
    slug: "connections-certificate",
    issuer: "Engineering Technical Symposium"
  }
] as const;

export const leadership = [
  {
    role: "Non-Technical Event Coordinator",
    event: "College Technical Symposium",
    description: "Coordinated non-technical symposium event activities, supporting event organization and participant coordination."
  }
] as const;
