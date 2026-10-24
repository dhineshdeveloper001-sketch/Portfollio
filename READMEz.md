# 🎬 DK — Cinematic 3D Portfolio · Master Build README

**Owner:** Dhineshkumar J (DK) · Full Stack Developer & GenAI Enthusiast
**Concept:** *The Director's Cut* — a scroll-driven 3D portfolio that plays like a short film. You are the camera, scroll is the timeline, and every section is a scene.
**Derived from:** `deepseek_markdown_20261022_97f3a1.md` (Master Build Specification)

---

## 📑 Contents

1. [Quick Start](#1-quick-start)
2. [What Changed From the Original Spec](#2-what-changed-from-the-original-spec)
3. [Creative Direction — What Makes It Unique](#3-creative-direction--what-makes-it-unique)
4. [MASTER PROMPT (paste into your agent)](#4-master-prompt-paste-into-your-agent)
5. [Project Structure](#5-project-structure)
6. [Where to Drop Real Assets](#6-where-to-drop-real-assets)
7. [Verification Checklist](#7-verification-checklist)
8. [Design Tokens](#8-design-tokens)
9. [Troubleshooting](#9-troubleshooting)
10. [Credits & License](#10-credits--license)

---

## 1. Quick Start

```bash
# 1. Create an empty folder, open it in Google Antigravity, Cursor, or Claude Code (agent mode)
# 2. Copy everything inside the MASTER PROMPT block (Section 4) and paste it as the first message
# 3. Let the agent finish. It must end with a build report.

npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # production build
npx tsc --noEmit   # type check
```

Drop real assets into `public/` (Section 6) at any time. The site auto-detects them and falls back gracefully when they are missing.

---

## 2. What Changed From the Original Spec

The original spec is strong. The following corrections were made so the agent does not stall on conflicts:

| Area | Original spec | This README |
|---|---|---|
| Acts | Sections labelled 00–08 (9 items) but described as "8 Acts" | **One boot sequence + 8 Acts**, numbered `01`–`08` to match the `// 01` section headers |
| Camera keyframe IDs | `ACT_00_HERO`…`ACT_07_CONTACT` in one place, `ACT_01_HERO` in another | **`ACT_01_HERO` … `ACT_08_CONTACT`**, used everywhere |
| Smooth scroll | `@studio-freight/lenis` | **`lenis`** (current package name), used via `lenis/react` |
| Lenis wrapper | `<ReactLenis>` (no import path) | `import { ReactLenis } from 'lenis/react'` |
| Emoji in README | Used | Not used in the app. Lucide icons only |
| Versions | "Install exact" with no versions | Agent installs latest stable, then **pins exact versions** in `package.json` |
| Concept | Strong but generic dark-and-red | Adds the **Director's Cut** layer (Section 3) without changing any data or the palette |

---

## 3. Creative Direction — What Makes It Unique

Most 3D portfolios are "dark page with a spinning object." This one is a **film**. These signature devices are required, on top of the spec:

1. **Scroll Timecode.** A bottom-left HUD shows `TC 00:00:00:00` that maps scroll progress to a 02:30:00 runtime, with a frame counter. Scrolling literally runs the reel.
2. **Scene Slates.** Each act opens with a clapperboard-style slate for about 0.8s when it enters the viewport: `SCENE 03 · TAKE 01 · TECH ARSENAL`. Respect reduced motion (show the slate statically).
3. **Shot Labels.** The HUD names the current camera shot from the keyframe: `WIDE · DOLLY IN`, `CLOSE-UP · RACK FOCUS`, `PULL BACK · REVEAL`. Shot names come from `cameraScript.ts`.
4. **Per-Act Grade.** The final post-process pass applies a subtle colour grade per act (lift, gamma, gain tint, max ±6% strength). Obsidian and red stay dominant. Hero leans deep red, About leans cool slate, Vault leans cold white, Contact fades to near-black.
5. **Rack Focus.** DOF focus distance is driven by the keyframes, so the in-focus object shifts as the user moves between sections.
6. **Credits Roll.** The Contact act ends with a scrolling mono credit roll: role, stack, and "Written, built, and directed by Dhineshkumar J."

All of these read from the single data file and the keyframe file. No copy is invented.

---

## 4. MASTER PROMPT (paste into your agent)

```text
# ROLE

You are an elite Staff Creative Technologist, WebGL/Three.js Architect, and Full-Stack React
Engineer. You operate autonomously. You write 100% complete, production-grade code with NO TODOs,
NO placeholder comments, NO "rest of file here". You verify the build compiles before finishing.

# MISSION

Build "The Director's Cut": a cinematic, scroll-driven 3D portfolio for Dhineshkumar J (DK).
The site is a short film. The visitor is the camera. Scroll is the timeline. Every section is a
distinct Scene (an "Act") inside ONE continuous 3D world. The camera dollies, lights shift, fog
thickens, and particles react. It must load fast (LCP < 3s on desktop), degrade gracefully on
mobile, and never trap the user behind a long intro.

Core promise: "0% layout clutter. 100% elevation through cinematic motion, WebGL, and
micro-engineering."

# TECH STACK (install latest stable, then PIN exact versions in package.json)

- vite, react, typescript
- three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, postprocessing
- framer-motion
- lenis (smooth scroll; import ReactLenis from "lenis/react")
- maath (provides damp3 from "maath/easing")
- lucide-react
- clsx, tailwind-merge
- Tailwind CSS v4 via @tailwindcss/vite (index.css starts with @import "tailwindcss";)
- troika-three-text (comes with drei Text; use it for extruded/flat 3D text)

Fonts (Google Fonts, preloaded in index.html via <link rel="preload">):
- Plus Jakarta Sans (400, 500, 600, 700, 800) for UI
- JetBrains Mono (400, 500, 600) for technical labels

Document title: "Dhineshkumar J (DK) | Full Stack Developer & GenAI Enthusiast"
<body> background #050505. No white flash on load. overscroll-behavior: none on html and body.

# DESIGN SYSTEM

Color tokens (use CSS variables on :root and mirror them in Tailwind theme):
- --bg-obsidian: #050505            (page background)
- --bg-surface: #0A0A0E             (cards, panels)
- --accent-primary: #FF1E1E         (Electric Red: buttons, glows, active states)
- --accent-secondary: #DC2626       (Crimson: hover, gradients)
- --border-idle: rgba(255,255,255,0.08)
- --border-active: rgba(255,30,30,0.65)
- --glow-shadow: 0 0 25px -5px rgba(255,30,30,0.35)
- --text-primary: #F8FAFC
- --text-secondary: #94A3B8
- --text-muted: #64748B

Layout:
- Every 2D section container: max-w-6xl mx-auto px-6 md:px-10
- Vertical rhythm: py-14 md:py-20. Dense, precise, SaaS-grade. Not airy marketing padding.
- Section header pattern: monospace "// 01 — SECTION_NAME" in #FF1E1E, then
  text-2xl md:text-3xl font-bold tracking-tight text-white.

Typography rules:
- Kinetic display type for the hero name only (characters stagger in with Framer Motion).
- Mono for all labels, telemetry, timecodes, and metadata.
- Never use emoji anywhere in the app. Icons come from lucide-react only.

# ARCHITECTURE: "ONE WORLD"

The entire site lives inside ONE persistent <Canvas> fixed behind the DOM (WorldCanvas.tsx,
fixed inset-0, z-0, pointer-events-none on the wrapper). DOM sections scroll over it. The 3D
camera is scroll-synced through keyframes.

## Scroll pipeline
- useScrollProgress() reads window.scrollY / (document height - viewport) and returns a
  normalized value in [0, 1]. It works because Lenis drives the native window scroll.
- CameraRig (inside the Canvas) runs in useFrame. It finds the two adjacent keyframes for the
  current progress and eases position, lookAt, fov, and focusDistance toward them with
  maath/easing damp3 (lambda 2.5 for position, 4 for lookAt).
- Keyframes live in src/three/cameraScript.ts. Each entry has: id, scrollStart, scrollEnd,
  position, lookAt, fov, focusDistance, shot (shot label string).
- The camera always stays on a continuous path. It never jump-cuts.

## Camera motion extras
- Handheld feel: sine-noise shake at 0.3 Hz, amplitude 0.02 on position x/y. Disabled under
  reduced motion.
- Dolly-zoom: fov eases 55 → 65 across the full scroll, combined with the per-act keyframe fov.
- Mouse parallax: rig rotation lerps toward state.pointer with a 0.15 damp.

## Act ranges (scroll progress; the ranges sum to 1.0)

| Key | Act | Scroll range | Shot label | Focus distance |
|---|---|---|---|---|
| ACT_01_HERO | 01 Origin | 0.00 – 0.10 | WIDE · DOLLY IN | 0.02 |
| ACT_02_ABOUT | 02 Observatory | 0.10 – 0.22 | ORBIT · SLOW | 0.12 |
| ACT_03_STACK | 03 Data Cathedral | 0.22 – 0.34 | PUSH IN · CORRIDOR | 0.18 |
| ACT_04_PROJECTS | 04 Gallery | 0.34 – 0.52 | TRACK · LATERAL | 0.25 |
| ACT_05_EXPERIENCE | 05 Chronicle | 0.52 – 0.62 | CLOSE-UP · RACK FOCUS | 0.10 |
| ACT_06_CREDENTIALS | 06 Vault | 0.62 – 0.74 | CRANE · UP | 0.30 |
| ACT_07_EDUCATION | 07 Foundation | 0.74 – 0.84 | SPOTLIGHT · PILLAR | 0.08 |
| ACT_08_CONTACT | 08 Signal | 0.84 – 1.00 | PULL BACK · REVEAL | 0.40 |

All world coordinates (scene object positions and camera positions) are defined in one file,
src/three/world.ts, and cameraScript.ts imports them. This prevents drift between scenes and
camera framing.

## Post-processing (EffectComposer from @react-three/postprocessing, in fx/PostFX.tsx)
1. Bloom: intensity 0.9, luminanceThreshold 0.2, mipmapBlur
2. DepthOfField: focusDistance from the active keyframe (lerped), bokehScale 4
3. ChromaticAberration: offset [0.0008, 0.0008]
4. Noise (film grain): opacity 0.035
5. Vignette: offset 0.35, darkness 0.7
6. ColorGrade pass (custom, fx/GradePass.ts): per-act lift/gamma/gain tint, max ±6% strength
7. SMAA
8. Optional custom GLSL scanline (fx/ScanlineShader.ts) at opacity 0.02

## Performance
- <Canvas dpr={[1, 1.75]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
- Adaptive quality: sample FPS. If FPS < 45 for 2 consecutive seconds, drop dpr to 1.0 and
  disable DepthOfField. Log the change once in dev only.
- Particles use InstancedMesh or Points. Never create per-frame allocations in useFrame.
  Reuse Vector3 and Color objects.
- Dispose geometries and materials on unmount.

## Graceful degradation
- prefers-reduced-motion OR (pointer: coarse): do NOT mount the persistent full scene.
  Render a static Hero-only canvas (HeroCore with particles off, no shake, no DOF, bloom at
  half intensity). All DOM content and navigation remain fully functional.
- Canvas is aria-hidden="true". Every meaningful piece of information also exists in the DOM.

# SCENE SPECIFICATION

## BOOT — Title Sequence (IntroSequence.tsx, about 2.6s hard cap)
Full-screen obsidian overlay. Three micro-phases:
1. 0.0–0.9s: SVG stroke-draw of the "DK" monogram in electric red. Corner telemetry counters
   (FPS, LAT, ALT) tick. Low bass swell via SoundEngine.introReveal().
2. 0.9–1.9s: Monogram slides left. A laser scanline expands to reveal "DHINESHKUMAR J" in
   Plus Jakarta Sans ExtraBold. Then a JetBrains Mono typewriter types
   "FULL STACK DEVELOPER · GENAI ENTHUSIAST".
3. 1.9–2.6s: Two obsidian panels split vertically along a glowing red seam with a volumetric
   light bleed, revealing Act 01. The camera is already dollying forward.
- Always show a top-right "[ SKIP · ESC ]" button.
- Persist introSeen in sessionStorage. Returning visitors skip the intro.
- The intro never blocks interaction for longer than 2.6s.

## ACT 01 — ORIGIN (HeroCore.tsx + HeroSection.tsx)
3D set piece: pitch-black void with volumetric red fog
(<fog attach="fog" color="#0a0000" near={6} far={22} />).
- Centerpiece: dark brushed-metal icosahedron core, radius about 1.1, metallic 0.95,
  roughness 0.18.
- Holographic "DK" emblem floats in front. Use extruded 3D text (drei Text / troika) OR
  <Html transform>. Pick one and be consistent.
- 3 concentric torus rings with independent rotation axes. The inner ring is emissive #FF1E1E.
- Wireframe icosahedron cage (detail 2, thin glowing red lines).
- 180 instanced glowing particles on a Fibonacci sphere, drifting slowly inward.
- 2 volumetric light cones sweeping across the scene on a 12s loop.
- If /models/dk_core.glb exists, load it with useGLTF and use it instead of the procedural
  core. Otherwise render the procedural core. The procedural fallback is the default.
- Scroll reactivity: rings spin up on scroll. Each act boundary fires a red shockwave pulse
  from the core through a small pulse event bus (a tiny typed emitter in utils/pulseBus.ts).

HUD (bottom-right, DOM overlay, glassmorphic) with three modes:
- [ CYBER CORE ]: default metallic and emissive
- [ WIREFRAME ]: all meshes switch to MeshBasicMaterial with wireframe and additive blending
- [ OVERCLOCK ]: 3× orbital speed, bloom intensity 2.0, chromatic aberration 0.004

Left column (DOM, split layout):
- Mono tag: "// 01 — ORIGIN"
- Kinetic headline: "DHINESHKUMAR J" (characters stagger in)
- Sub: "Full Stack Developer & GenAI Enthusiast"
- Line: "B.E. Computer Science Engineering · Class of 2027"
- CTA row: [ View Projects → ] [ ↓ Scroll ]
- Bottom: scroll chevron, fades after first scroll.

## ACT 02 — PROFILE / OBSERVATORY (AboutSphere.tsx + AboutSection.tsx)
3D set piece: a large holographic wireframe icosahedron sphere, slowly rotating. Behind it, a
starfield of 800 points (size 0.02) with subtle scroll parallax.
- Left column (DOM): "// 02 — PROFILE" heading and the exact bio (Section 7).
- Right column (DOM): terminal-styled "live telemetry" panel with a blinking red cursor:
  LAT 12.00°N · LON 78.60°E · STATUS AVAILABLE · MODE BUILDING · BUILD v2027.1

## ACT 03 — TECH ARSENAL / DATA CATHEDRAL (TechCathedral.tsx + TechStackSection.tsx)
3D set piece: a corridor lined with vertical holographic columns of glowing glyphs (InstancedMesh
of thin emissive planes). Each skill category is a pillar.
STYLE RULE: no bulky cards. Render skills as a precision 5-row spec table (DOM overlay,
2 columns: [mono index + category] | [inline pill nodes separated by red micro-dots]).
- 01 PROGRAMMING LANGUAGES: Java · Python · C
- 02 FRONTEND DEVELOPMENT: HTML · CSS · Tailwind CSS · React
- 03 BACKEND DEVELOPMENT: Java · Spring Boot
- 04 DATABASES: MySQL · PostgreSQL
- 05 CORE STRENGTHS: Logical Thinking · Problem Solving · DSA Practice
- Row hover: border turns #FF1E1E. A radial red spotlight tracks the cursor within the row.

## ACT 04 — FEATURED PROJECTS / GALLERY (ProjectsGallery.tsx + ProjectsCarousel.tsx)
3D set piece: six floating "data slabs" (thin box meshes with emissive edges) in a horizontal
line. A spot light follows the active project.

Carousel interaction (critical, this is the recruiter's wow moment):
- Clicking → or ← (or pressing the arrow keys) advances ONE project. Spring physics
  (stiffness 260, damping 28) via Framer Motion. Use AnimatePresence with keys unique per index.
- Step counter "01 / 06" and a 6-segment red progress bar under the arrows.
- Clickable quick tabs along the top jump directly to any project.
- Card layout: 50% interactive preview (left) | 50% specs and links (right).
- On hover: 3D perspective tilt (rotateX/Y from pointer, max ±8°).
- Badges: "VERIFIED BUILD" (green tick) or "CONCEPT · SPEC PENDING" (amber).
- Arrow key handlers attach in useEffect and clean up on unmount.

Previews (ProjectPreviewVisuals.tsx): bespoke interactive previews, never stock images. If
/projects/project-N.png exists (detected with fetch HEAD), show the screenshot. Otherwise show
the live mini-sim.

P01 · Hostel Mess Reduction System · [VERIFIED]
  Subtitle: Workflow automation · Full stack
  Desc: A hostel mess-reduction request management system with student submissions, staff
        review, approval stages, and status tracking.
  Stack: React, Tailwind CSS, Motion, Java, Spring Boot, Hibernate/JPA, DB Integration
  GitHub: https://github.com/dhineshdeveloper001-sketch/MessReduction
  Live: disabled pill "Live Demo Not Provided"
  Preview: 3-stage workflow simulator, [Submitted] → [Warden Review] → [Approved]. "Advance
           Stage" animates a red energy pipe filling between nodes.

P02 · ScholarLink Hub · [VERIFIED]
  Subtitle: Education technology · Collaboration
  Desc: A faculty–student collaboration platform for academic communication, attendance
        tracking, grade management, and reporting.
  Stack: React, Modern Web UI, Backend & Database Integration
  GitHub: https://github.com/dhineshdeveloper001-sketch/Scholarlink-hub
  Live: "Open ScholarLink Hub" → SCHOLARLINK_LIVE_URL (placeholder "#"). When it is "#",
        open the GitHub repo instead and show a toast "Live URL pending — opening repo".
  Preview: mini dashboard. Attendance ring toggles 75 / 85 / 92%. Grade bars animate.

P03 · Billing Software · [VERIFIED]
  Subtitle: Business software · Billing automation
  Desc: A retail billing application for invoice generation, GST calculations, and dynamic
        pricing.
  Stack: Web Application, Invoice Engine, GST Calculation, Dynamic Pricing
  GitHub: https://github.com/dhineshdeveloper001-sketch/Billing_Software
  Live: "Open Billing Software" → BILLING_LIVE_URL (placeholder "#"), same logic as P02.
  Preview: LIVE GST calculator. "+ Add Item" appends items. Base Price, 18% GST, and Total
           Invoice recompute in real time with animated counters.

P04 · LedgerFlow Pro · [CONCEPT]
  Subtitle: Finance · Backend engineering
  Desc: A double-entry ledger application concept for managing financial transactions and
        presenting account activity through a dashboard.
  Stack (planned): Java, Spring Boot, MySQL, Chart.js
  GitHub/Live: pill "Repository & Live Demo Pending Confirmation"
  Preview: animated hand-rolled SVG cashflow curve, plus Debit/Credit double-entry rows that
           visibly balance.

P05 · Gatekeeper Auth · [CONCEPT]
  Subtitle: Authentication · Application security
  Desc: An authentication-focused project concept for secure sign-in and user-access workflows.
  Stack: Authentication Workflows, Application Security, Access Control (Stack Confirmation Pending)
  GitHub/Live: pill "Implementation Stack, Repo & Demo Pending Confirmation"
  Preview: "Simulate Auth Handshake" button. Credentials → Hash Verify → JWT Issued →
           Access Granted. Each stage lights a node in a red circuit.

P06 · Binary Logic Game · [CONCEPT]
  Subtitle: Interactive game · Logical reasoning
  Desc: A logic-oriented game concept that demonstrates interactive UI behaviour, pattern
        recognition, and problem solving.
  Stack: Interactive UI, Pattern Recognition, Logical Problem Solving (Spec Confirmation Pending)
  GitHub/Live: pill "Final Rules, Repo & Demo Pending Confirmation"
  Preview: PLAYABLE 4-bit binary puzzle. Show a target decimal (for example 11). Four
           clickable bit switches [8][4][2][1]. Live binary sum. On a match: electric-red
           "LOGIC MATCHED!" burst, then a new random target. Track the best streak.

## ACT 05 — EXPERIENCE / THE CHRONICLE (ExperienceMonolith.tsx + ExperienceSection.tsx)
3D set piece: a corridor with one illuminated monolith (tall thin box, emissive edges).
DOM card to the right:
- Role: "Java Full Stack Intern"
- Company: "The Mind IT Company"
- Duration: "1 Month"
- Bullets (verbatim):
  - Gained practical exposure to Java full-stack development.
  - Developed understanding of frontend and backend application workflows.
  - Strengthened Java programming and web-development fundamentals.

## ACT 06 — CREDENTIALS & LEADERSHIP / THE VAULT (VaultRings.tsx + CertificatesVault.tsx + LeadershipSection.tsx)
A) Certifications: render as a compact credential matrix (2-column grid of thin horizontal
   rows: mono index + title + category pill).
   01 Java Certification            · Backend & Core Programming
   02 Spring Boot Certification     · Enterprise Java Framework
   03 Web Development Certificate   · Full-Stack Web Engineering
   04 Bug Bounty Certificate        · Application Security & Vulnerability Analysis
   05 Treasure Hunt Certificate     · Analytical & Team Event
   06 Connections Certificate       · Technical / Logical Event

   Clicking a row opens CredentialInspectionModal:
   - Title, category, green verification badge, issuer metadata.
   - Preview frame: loads /certificates/<slug>.jpg if it exists. Otherwise renders a
     high-fidelity vector credential placeholder that shows the exact filename to drop into
     /public/certificates/.
   - ESC closes. Focus is trapped while open and restored on close. Framer Motion morphs from
     the row into the modal.

B) Leadership card:
   Symposium: Non-Technical Event Coordinator
   "Coordinated non-technical symposium event activities, supporting event organization and
    participant coordination."

## ACT 07 — EDUCATION / THE FOUNDATION (EducationPillar.tsx + EducationSection.tsx)
The 3D world dims to a spotlight on a single pillar. DOM card:
- Degree: B.E. — Computer Science and Engineering
- College: Government College of Engineering, Srirangam
- CGPA: 7.76 / 10.0, shown with an animated precision progress bar that counts up when it
  scrolls into view
- Graduation: Expected 2027
- Status: Final-year undergraduate student

## ACT 08 — CONTACT / THE SIGNAL (ContactBeacon.tsx + ContactSection.tsx)
The camera pulls back to a wide shot. Black void with one red beacon pulsing rhythmically.
DOM overlay:
- Headline: "Let's build something."
- One-click COPY buttons with a success toast:
  Email: dhineshdeveloper001@gmail.com
  Phone: +91 87547 34490
- External link tiles (target="_blank" rel="noopener noreferrer"):
  GitHub: https://github.com/dhineshdeveloper001-sketch
  LeetCode: https://leetcode.com/u/dhineshkumar_0001/ (handle: dhineshkumar_0001)
- [ Preview Resume ] button → ResumeManagerModal:
  - HEAD-check /Dhineshkumar_J_Resume.pdf.
  - If present: download link and inline PDF iframe preview.
  - If absent: formatted, print-ready Executive Resume Summary built from the data file, a
    disabled "Download Resume (Coming Soon)" pill, and the line "Drop Dhineshkumar_J_Resume.pdf
    into /public/".
- LinkedIn: STRICTLY OMITTED. Do not invent it. Do not render it.
- Credit roll (mono, muted, slow vertical scroll): role, stack, and
  "Written, built, and directed by Dhineshkumar J."
- Footer line (mono, muted): Built with React · Tailwind CSS · Framer Motion · Three.js · Vite · Lucide

# SIGNATURE FEATURES (all required)

1. SparkleCursor (components/SparkleCursor.tsx). Canvas overlay: fixed inset-0,
   pointer-events-none, z-50.
   - Tight electric-red crosshair ring that lerps toward the pointer.
   - Light red and white sparks on move, with velocity and gravity decay.
   - Disabled on (pointer: coarse) and prefers-reduced-motion.

2. SoundEngine (utils/soundEngine.ts). Zero external audio files. Web Audio API synthesis only.
   - Exposes: hover(), click(), toggle(), whoosh(), pulse(), introReveal(), match().
   - Short envelopes, filtered noise, detuned sine. Subtle and clean.
   - Master gain default 0.35.
   - AudioContext is created lazily on the first user gesture (autoplay policy).
   - Mute state persists in localStorage. The Navbar holds the toggle.

3. CommandPalette (Ctrl/Cmd + K).
   - Fuzzy filter over: jump to any Act (8 entries), copy email, copy phone, open GitHub, open
     LeetCode, preview resume, toggle sound, trigger OVERCLOCK.
   - Keyboard first: ↑ ↓ to navigate, ↵ to select, Esc to close. Glassmorphic dark panel.
   - Trigger button in the Navbar with a ⌘K badge.

4. EnergyScrollSpine (components/EnergyScrollSpine.tsx). Left-margin SVG circuit trace that
   fills with a red energy gradient as scroll progresses. Node dots at each Act. The active node
   pulses.

5. Navbar (components/Navbar.tsx). Floating glass header (fixed top, glassmorphic, thin border).
   - Left: DK monogram.
   - Center: About · Work · Stack · Contact.
   - Right: Sound toggle · ⌘K button · "Available" status pill (green dot, pulsing).
   - On mobile, the center nav collapses to a sheet with the same items.

6. Timecode HUD and Scene Slates (see Creative Direction, Section 3 of the README).

7. Easter eggs (must not interfere with UX):
   - Konami code → WIREFRAME EVERYTHING for 8s.
   - Triple-click the DK monogram → OVERCLOCK for 10s.
   - Typing "dk" anywhere → short sound() chirp (ignored inside inputs and textareas).

# FILE ARCHITECTURE (must match exactly)

public/
  models/dk_core.glb                  (optional, Blender export)
  projects/project-1.png … project-6.png  (optional, auto-detected)
  certificates/<slug>.jpg             (optional, six files, see the asset table)
  Dhineshkumar_J_Resume.pdf           (optional, auto-detected)

scripts/
  build_dk_blender_core.py            (headless Blender asset generator)

src/
  data/portfolioData.ts               (SINGLE source of truth)
  utils/soundEngine.ts
  utils/useScrollProgress.ts
  utils/pulseBus.ts
  three/
    world.ts                          (all scene and camera coordinates)
    WorldCanvas.tsx
    CameraRig.tsx
    cameraScript.ts                   (keyframes: id, scroll range, position, lookAt, fov, focus, shot)
    scenes/HeroCore.tsx
    scenes/AboutSphere.tsx
    scenes/TechCathedral.tsx
    scenes/ProjectsGallery.tsx
    scenes/ExperienceMonolith.tsx
    scenes/VaultRings.tsx
    scenes/EducationPillar.tsx
    scenes/ContactBeacon.tsx
    fx/PostFX.tsx
    fx/GradePass.ts
    fx/ScanlineShader.ts
  components/
    IntroSequence.tsx
    SparkleCursor.tsx
    EnergyScrollSpine.tsx
    TimecodeHUD.tsx
    SceneSlate.tsx
    Navbar.tsx
    HeroSection.tsx
    AboutSection.tsx
    TechStackSection.tsx
    ProjectsCarousel.tsx
    ProjectPreviewVisuals.tsx
    ExperienceSection.tsx
    CertificatesVault.tsx
    CredentialInspectionModal.tsx
    LeadershipSection.tsx
    EducationSection.tsx
    ContactSection.tsx
    CommandPalette.tsx
    ResumeManagerModal.tsx
    Toast.tsx
  App.tsx
  main.tsx
  index.css

App.tsx render order MUST be:
  <IntroSequence />
  <WorldCanvas />                      (fixed, z-0, pointer-events-none wrapper)
  <Navbar />
  <EnergyScrollSpine />
  <TimecodeHUD />
  <SparkleCursor />
  <CommandPalette />
  <Toast />
  <main className="relative z-10">
    <HeroSection /> <AboutSection /> <TechStackSection /> <ProjectsCarousel />
    <ExperienceSection /> <CertificatesVault /> <LeadershipSection />
    <EducationSection /> <ContactSection />
  </main>
Wrap everything in <ReactLenis root> from "lenis/react".

# BLENDER SCRIPT (scripts/build_dk_blender_core.py — complete and runnable)

Headless bpy script that:
- Purges the default scene.
- Builds "DK" 3D text (extrude 0.18, bevel depth 0.03, resolution 4), converts it to mesh,
  and centres the origin at (0,0,0).
- Creates 3 gyroscopic torus rings tilted 30°, -45°, and 60°.
- Adds an outer wireframe icosphere (subdivisions 2, wireframe thickness 0.015).
- Creates two Principled BSDF materials:
  ObsidianMetal: base (0.03, 0.03, 0.04, 1), metallic 0.95, roughness 0.18
  ElectricRedEmissive: base (1, 0.08, 0.08, 1), emission (1, 0.05, 0.05, 1), strength 8
- Assigns materials correctly.
- Exports public/models/dk_core.glb with bpy.ops.export_scene.gltf(export_format='GLB').
- Prints "[DK] exported → public/models/dk_core.glb" on success.

After writing it, run: command -v blender && blender -b -P scripts/build_dk_blender_core.py
If Blender is absent, do NOT block. HeroCore.tsx renders the procedural core.

# DATA (src/data/portfolioData.ts): single source of truth. DO NOT alter. DO NOT invent links.

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

export const skills = [ /* the 5 categories from Act 03, exact wording */ ] as const;
export const projects = [ /* the 6 entries from Act 04, exact wording and status */ ] as const;
export const certificates = [ /* the 6 entries from Act 06A, with slug = kebab-case of title */ ] as const;
export const leadership = [ /* Symposium entry from Act 06B */ ] as const;

export const SCHOLARLINK_LIVE_URL = "#"; // placeholder, do not invent
export const BILLING_LIVE_URL = "#";     // placeholder, do not invent

# HARD RULES (violating any of these = task failure)

- NO placeholder comments. Every file complete and type-safe.
- NO fake metrics. NO invented URLs. NO LinkedIn anywhere.
- Every external link: target="_blank" rel="noopener noreferrer".
- No emoji anywhere in the app. Lucide icons only.
- Reduced motion or coarse pointer: static Hero-only canvas. Disable particles, DOF, and shake.
  Bloom at half intensity. Keep all DOM content and navigation intact.
- All 2D sections keyboard-navigable and screen-reader friendly. Visible focus rings.
- Fonts preloaded in index.html.
- No horizontal overflow at any width ≥ 360px.
- CLS < 0.02 on initial load.
- No localStorage or sessionStorage calls without try/catch wrappers.

# BUILD & VERIFY (required before finishing)

1. npx tsc --noEmit → 0 errors
2. npm run build → 0 errors. Report the gzipped bundle size of the initial JS chunk (target < 350 KB).
3. npm run dev, then, if a browser preview is available, verify:
   - Intro plays once. SKIP works. Hero 3D mounts without WebGL context loss.
   - Camera dollies smoothly across all 8 Acts.
   - Arrow keys and the → button advance 01 → 06 with spring motion.
   - Binary Logic Game in P06 is playable and shows "LOGIC MATCHED!".
   - ⌘K opens the palette and jumps to each Act.
   - Sound toggle mutes and unmutes. AudioContext created on the first gesture only.
   - No console errors.
4. Final report: build time, gzipped bundle size, estimated hero FPS, Blender result
   (ran or skipped), and any item you could not verify and why.

Begin. Do not stop until the build passes and the report is written.
```

---

## 5. Project Structure

The agent generates the structure in Section 4. The tree below is the reference. The full
listing is in the MASTER PROMPT's FILE ARCHITECTURE block.

```
dk-cinematic-portfolio/
├── public/
│   ├── models/dk_core.glb
│   ├── projects/project-1.png … project-6.png
│   ├── certificates/<six>.jpg
│   └── Dhineshkumar_J_Resume.pdf
├── scripts/build_dk_blender_core.py
├── src/ (data, utils, three, components, App.tsx, main.tsx, index.css)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 6. Where to Drop Real Assets

Drop files into the paths below. Each system detects its file with `fetch(..., { method: 'HEAD' })` and swaps in the real asset. If a file is missing, the fallback stays active.

| Asset | Exact path | Detected by | Fallback if missing |
|---|---|---|---|
| Resume PDF | `public/Dhineshkumar_J_Resume.pdf` | ResumeManagerModal.tsx | Formatted resume summary |
| Project 1 screenshot | `public/projects/project-1.png` | ProjectPreviewVisuals.tsx | Live workflow simulator |
| Project 2 screenshot | `public/projects/project-2.png` | ProjectPreviewVisuals.tsx | Live dashboard preview |
| Project 3 screenshot | `public/projects/project-3.png` | ProjectPreviewVisuals.tsx | Live GST calculator |
| Project 4 screenshot | `public/projects/project-4.png` | ProjectPreviewVisuals.tsx | Animated cashflow SVG |
| Project 5 screenshot | `public/projects/project-5.png` | ProjectPreviewVisuals.tsx | Auth handshake visual |
| Project 6 screenshot | `public/projects/project-6.png` | ProjectPreviewVisuals.tsx | Playable binary puzzle |
| Java certificate | `public/certificates/java-certification.jpg` | CertificatesVault.tsx | Vector credential placeholder |
| Spring Boot certificate | `public/certificates/spring-boot-certification.jpg` | CertificatesVault.tsx | Vector credential placeholder |
| Web Dev certificate | `public/certificates/web-development-certificate.jpg` | CertificatesVault.tsx | Vector credential placeholder |
| Bug Bounty certificate | `public/certificates/bug-bounty-certificate.jpg` | CertificatesVault.tsx | Vector credential placeholder |
| Treasure Hunt certificate | `public/certificates/treasure-hunt-certificate.jpg` | CertificatesVault.tsx | Vector credential placeholder |
| Connections certificate | `public/certificates/connections-certificate.jpg` | CertificatesVault.tsx | Vector credential placeholder |
| 3D DK core | `public/models/dk_core.glb` | HeroCore.tsx | Procedural R3F core |

---

## 7. Verification Checklist

### Build and type safety
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `npm run build` → 0 errors
- [ ] Initial JS chunk (gzipped) under 350 KB
- [ ] No console errors on first load

### Cinematic experience
- [ ] Intro plays once, honours SKIP · ESC, and never blocks past 2.6s
- [ ] Hero 3D mounts without WebGL context loss
- [ ] Camera dollies smoothly across all 8 Acts
- [ ] Timecode HUD tracks scroll; shot labels change per act
- [ ] Scene slates appear on act entry (static under reduced motion)
- [ ] Post stack renders: Bloom, DOF, Grain, Vignette, Grade, SMAA
- [ ] Scroll spine fills with red energy as you scroll
- [ ] SparkleCursor works on desktop and is hidden on touch

### Interactions
- [ ] Projects carousel: → / ← / arrow keys advance 01 → 06 with spring motion
- [ ] Binary Logic Game (P06) is playable and shows "LOGIC MATCHED!"
- [ ] GST calculator (P03) updates totals in real time
- [ ] Workflow simulator (P01) advances Submitted → Warden Review → Approved
- [ ] Command palette opens on ⌘K / Ctrl+K and jumps to all 8 Acts
- [ ] Sound toggle mutes and unmutes (AudioContext on first gesture only)
- [ ] Copy email and copy phone work, with a success toast
- [ ] Resume modal shows the PDF if present, otherwise the formatted summary

### Data integrity
- [ ] All GitHub URLs use https://github.com/dhineshdeveloper001-sketch
- [ ] LeetCode link is https://leetcode.com/u/dhineshkumar_0001/
- [ ] No LinkedIn link rendered anywhere
- [ ] CGPA shown as 7.76 / 10.0 with an animated meter
- [ ] Internship bullets match verbatim

### Accessibility and performance
- [ ] prefers-reduced-motion: static Hero-only canvas, no particles
- [ ] All sections keyboard-navigable, focus rings visible
- [ ] No horizontal overflow at width ≥ 360px
- [ ] CLS < 0.02
- [ ] LCP < 3s on desktop

---

## 8. Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg-obsidian` | `#050505` | Page background |
| `--bg-surface` | `#0A0A0E` | Card backgrounds |
| `--accent-primary` | `#FF1E1E` | Electric red: buttons, links, glows |
| `--accent-secondary` | `#DC2626` | Crimson: hover, gradients |
| `--border-idle` | `rgba(255,255,255,0.08)` | Default borders |
| `--border-active` | `rgba(255,30,30,0.65)` | Hover and focus borders |
| `--glow-shadow` | `0 0 25px -5px rgba(255,30,30,0.35)` | Active glow |
| `--text-primary` | `#F8FAFC` | Headings and body |
| `--text-secondary` | `#94A3B8` | Subtitles |
| `--text-muted` | `#64748B` | Mono labels, footer |

**Fonts:** Plus Jakarta Sans (UI) and JetBrains Mono (technical).
**Container:** `max-w-6xl mx-auto px-6 md:px-10`. **Section rhythm:** `py-14 md:py-20`.

---

## 9. Troubleshooting

**The 3D scene is blank or black.** Check the console for WebGL context loss. Make sure WorldCanvas is mounted at z-0 with pointer-events-none, and that the DOM overlay is not covering it. Keep `three`, `@react-three/fiber`, and `@react-three/drei` on compatible versions. Check the compatibility table in each library's README.

**Blender didn't run.** If `blender` is not on PATH, the build skips the `.glb` and uses the procedural core. This is intended. To install: `brew install --cask blender` (macOS), `sudo apt install blender` (Linux), or download from https://www.blender.org/download/.

**No sound.** AudioContext needs a user gesture. Click anywhere once, then try again. Confirm the Navbar sound toggle is ON.

**Camera doesn't move with scroll.** Confirm `lenis` is installed and `<ReactLenis root>` wraps the app. Confirm useScrollProgress reads `window.scrollY`. Confirm CameraRig is mounted inside WorldCanvas and reads cameraScript.ts.

**Carousel doesn't advance.** Confirm arrow-key listeners are attached in useEffect and removed in cleanup. Confirm AnimatePresence keys are unique per project index.

**`npm run build` fails on types.** Run `npx tsc --noEmit` first to see the exact error. Confirm portfolioData.ts exports match their imports. `@types/three` installs with `three` in most setups; add it manually if the build reports it missing.

**Mobile feels heavy.** The coarse-pointer path should already be using the static Hero canvas. If it is not, check the media query and the pointer detection.

---

## 10. Credits & License

**Portfolio owner:** Dhineshkumar J (DK)
**Built with:** React · TypeScript · Three.js · React Three Fiber · Drei · Postprocessing · Framer Motion · Tailwind CSS · Vite · Lucide · Lenis · Maath

**License:** Personal portfolio. All rights reserved by Dhineshkumar J.
**Data integrity:** All links, metrics, and personal details are taken from the verified data file. LinkedIn is intentionally omitted per the owner's specification.

---

> **Ready to ship?** Run the checklist, drop your real assets into `public/`, and share the live URL. The camera will do the rest of the talking.
