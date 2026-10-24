# 🚀 Dhineshkumar J — High-Performance Full Stack Developer Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-v12.4-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Java](https://img.shields.io/badge/Java-v21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-v3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

A modern, high-performance, interactive digital portfolio built for **Dhineshkumar J**, Full Stack Developer & Gen AI Enthusiast. Featuring glassmorphism design, GPU-accelerated micro-animations, 5-layer interactive project architecture cards, a tabbed technology stack explorer, an interactive Git branch timeline, and recruiter discovery tools.

---

## 🌟 Key Features

- **⚡ Modern Dark Glassmorphic Aesthetic**: Deep dark theme (`#030303`) featuring electric red glow accents (`#ff0a2d`), subtle grid background, and custom cursor trail animations.
- **🛡️ Candidate Credibility Vault**: Recruiter discovery memo accessible directly from the top navigation bar or via keyboard shortcut (`V` / `Esc`).
- **📁 5-Layer Project Architecture Showcase**: Snap-to-center interactive project carousel with live demo previews, key feature lists, tech stack badges, and touch/keyboard arrow controls.
- **💻 Tabbed Technology Stack Explorer**: Dynamic categorized view filtering engineering competencies across **Languages**, **Frontend**, **Backend**, **Databases**, and **Tools & AI**.
- **🌿 Git Branch Interactive Timeline**: Visual Git commit node timeline showcasing professional experience, B.E. CSE education, LeetCode problem solving, and verified credentials.
- **📬 Interactive Contact Hub**: Direct contact form powered by Web3Forms API, automatic `mailto:` fallback, and a single-click **Copy Email** action with real-time feedback.
- **📱 Mobile-First Responsive Design**: Fluid layouts optimized across all viewport sizes (mobile, tablet, desktop) with accessible touch menu navigation.

---

## 🛠️ Technology Stack

### Frontend & UI
- **Framework**: React 19, Vite 5
- **Styling**: Tailwind CSS v4, Vanilla CSS3 (Custom Glassmorphism, CSS Variables)
- **Motion & Animations**: Framer Motion 12, GSAP 3, Three.js
- **Iconography**: Lucide React

### Backend & Engineering Core (Projects Ecosystem)
- **Primary Languages**: Java (v21), Python (v3.12), C (v11), JavaScript (ES2024)
- **Frameworks**: Spring Boot (v3.2), Node.js (v20), Express
- **Databases**: MySQL (v8.0), PostgreSQL (v16.1), MongoDB (v7.0)
- **Tooling & DevOps**: Git, Docker, JWT Authentication, Web3Forms API

---

## 🚀 Projects Showcase

| Project | Category | Key Tech Stack | Live Demo | Repository |
| :--- | :--- | :--- | :---: | :---: |
| **Billing Software** | Enterprise SaaS | Java 21, Spring Boot 3.2, MySQL 8.0, React 18.2 | [Live Demo](https://billingsoftware-iota.vercel.app/) | [GitHub](https://github.com/dhineshdeveloper001-sketch) |
| **Nexus Cart** | E-Commerce | React 18.2, Node.js 20, MongoDB 7.0, Stripe 14.0 | [Live Demo](https://shopping-psi-ten.vercel.app/) | [GitHub](https://github.com/dhineshdeveloper001-sketch) |
| **Smart File Organizer** | Full Stack | React 18.2, Spring Boot 3.2, MySQL 8.0, JWT 0.12 | [Live Demo](https://smartfileorganizer-7dmr.onrender.com/) | [GitHub](https://github.com/dhineshdeveloper001-sketch) |
| **Binary Logic Game** | Interactive Learning | JavaScript ES6, Canvas API v2, CSS3, HTML5 | [Live Demo](https://binary-game-ten.vercel.app/) | [GitHub](https://github.com/dhineshdeveloper001-sketch) |

---

## 💻 Local Development Setup

Follow these steps to run the portfolio locally on your machine:

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dhineshdeveloper001-sketch/Portfollio.git
   cd Portfollio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   *The application will open on `http://localhost:3000/` or `http://localhost:5173/`.*

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
PORTFOLIO NEW/
├── public/
│   ├── assets/              # WebP/PNG project screenshots & images
│   ├── favicon.ico
│   └── resume.pdf           # Downloadable resume document
├── src/
│   ├── components/
│   │   ├── About.jsx               # Section wrapper for Git log & experience
│   │   ├── BracketTitle.jsx        # Code-style title wrapper component
│   │   ├── Contact.jsx             # Contact form with Web3Forms & copy email
│   │   ├── CursorTrail.jsx         # Custom glowing cursor trail effect
│   │   ├── DataFlowBackground.jsx  # Ambient background data flow canvas
│   │   ├── Footer.jsx              # Footer copyright & quick links
│   │   ├── GitBranchTimeline.jsx   # Visual Git commit branch timeline
│   │   ├── Hero.jsx                # Hero section with typewriter & counter stats
│   │   ├── IntroScreen.jsx         # Initial loading screen animation
│   │   ├── Navbar.jsx              # Sticky header with active pill & Vault CTA
│   │   ├── NeuralBackground.jsx    # Neural network background canvas
│   │   ├── Projects.jsx            # 5-Layer interactive project carousel
│   │   ├── ScrollProgress.jsx      # Global top scroll progress indicator bar
│   │   ├── Skills.jsx              # Tabbed Technology Arsenal explorer
│   │   └── TerminalPrompt.jsx      # Developer terminal prompt component
│   ├── context/                # React Context providers
│   ├── data/
│   │   └── portfolioData.js    # Personal details, metrics, stack & project data
│   ├── hooks/                  # Custom React hooks
│   ├── App.jsx                 # Main layout & intersection observers
│   ├── index.css               # Design tokens, CSS variables & keyframe animations
│   ├── main.jsx                # React root mount
│   └── style.css               # Secondary theme utilities
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚡ Keyboard Shortcuts

- `V` : Toggle Candidate Credibility Vault Modal
- `Esc` : Close open modals (Vault / Menus)
- `←` / `→` : Navigate previous/next projects in the showcase carousel

---

## 👤 Developer Profile & Contact

**Dhineshkumar J**  
*Full Stack Developer & Gen AI Enthusiast*

- 📧 **Email**: [dhineshdeveloper001@gmail.com](mailto:dhineshdeveloper001@gmail.com)
- 📞 **Phone**: [+91 8754734490](tel:+918754734490)
- 🐙 **GitHub**: [dhineshdeveloper001-sketch](https://github.com/dhineshdeveloper001-sketch)
- 🧩 **LeetCode**: [dhineshkumar_0001](https://leetcode.com/u/dhineshkumar_0001/)
- 🎓 **Education**: B.E. Computer Science Engineering — Government College of Engineering, Srirangam (CGPA: 7.76)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).  
© 2026 Dhineshkumar J. All Rights Reserved.
