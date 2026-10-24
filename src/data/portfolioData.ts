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

export const SCHOLARLINK_LIVE_URL = "#";
export const BILLING_LIVE_URL = "#";
export const CONTACT_FORM_ENDPOINT: string | null = null;

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly desc: string;
  readonly stack: readonly string[];
  readonly github: string | null;
  readonly liveUrl: string | null;
  readonly liveLabel?: string;
  readonly status: "VERIFIED BUILD" | "CONCEPT · SPEC PENDING";
  readonly previewType: "workflow" | "dashboard" | "calculator" | "cashflow" | "auth" | "game";
  readonly localImage: string;
}

export const projects: readonly ProjectItem[] = [
  {
    id: "01",
    title: "Hostel Mess Reduction System",
    subtitle: "Workflow automation · Full stack",
    desc: "A hostel mess-reduction request management system with student submissions, staff review, approval stages, and status tracking.",
    stack: ["React", "Tailwind CSS", "Motion", "Java", "Spring Boot", "Hibernate/JPA", "DB Integration"],
    github: "https://github.com/dhineshdeveloper001-sketch/MessReduction",
    liveUrl: null,
    liveLabel: "Live Demo Not Provided",
    status: "VERIFIED BUILD",
    previewType: "workflow",
    localImage: "/projects/project-1.png"
  },
  {
    id: "02",
    title: "ScholarLink Hub",
    subtitle: "Education technology · Collaboration",
    desc: "A faculty–student collaboration platform for academic communication, attendance tracking, grade management, and reporting.",
    stack: ["React", "Modern Web UI", "Backend & Database Integration"],
    github: "https://github.com/dhineshdeveloper001-sketch/Scholarlink-hub",
    liveUrl: SCHOLARLINK_LIVE_URL,
    liveLabel: "Open ScholarLink Hub",
    status: "VERIFIED BUILD",
    previewType: "dashboard",
    localImage: "/projects/project-2.png"
  },
  {
    id: "03",
    title: "Billing Software",
    subtitle: "Business software · Billing automation",
    desc: "A retail billing application for invoice generation, GST calculations, and dynamic pricing.",
    stack: ["Web Application", "Invoice Engine", "GST Calculation", "Dynamic Pricing"],
    github: "https://github.com/dhineshdeveloper001-sketch/Billing_Software",
    liveUrl: BILLING_LIVE_URL,
    liveLabel: "Open Billing Software",
    status: "VERIFIED BUILD",
    previewType: "calculator",
    localImage: "/projects/project-3.png"
  },
  {
    id: "04",
    title: "LedgerFlow Pro",
    subtitle: "Finance · Backend engineering",
    desc: "A double-entry ledger application concept for managing financial transactions and presenting account activity through a dashboard.",
    stack: ["Java", "Spring Boot", "MySQL", "Chart.js"],
    github: null,
    liveUrl: null,
    liveLabel: "Repository & Live Demo Pending Confirmation",
    status: "CONCEPT · SPEC PENDING",
    previewType: "cashflow",
    localImage: "/projects/project-4.png"
  },
  {
    id: "05",
    title: "Gatekeeper Auth",
    subtitle: "Authentication · Application security",
    desc: "An authentication-focused project concept for secure sign-in and user-access workflows.",
    stack: ["Authentication Workflows", "Application Security", "Access Control"],
    github: null,
    liveUrl: null,
    liveLabel: "Implementation Stack, Repo & Demo Pending Confirmation",
    status: "CONCEPT · SPEC PENDING",
    previewType: "auth",
    localImage: "/projects/project-5.png"
  },
  {
    id: "06",
    title: "Binary Logic Game",
    subtitle: "Interactive game · Logical reasoning",
    desc: "A logic-oriented game concept that demonstrates interactive UI behaviour, pattern recognition, and problem solving.",
    stack: ["Interactive UI", "Pattern Recognition", "Logical Problem Solving"],
    github: null,
    liveUrl: null,
    liveLabel: "Final Rules, Repo & Demo Pending Confirmation",
    status: "CONCEPT · SPEC PENDING",
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
