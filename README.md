# ✦ Cinematic MERN Portfolio
### Akhileshwar K. Singh — Healthcare Technologist & Visionary

A luxury animated portfolio experience built as a **Scene Engine** — each section is a cinematic chapter in an interactive story. Built with React + Vite, Three.js, GSAP, Framer Motion, and Node/Express/MongoDB.

---

## 🎬 Tech Stack

**Frontend**
- React + Vite (JavaScript)
- Framer Motion — scene transitions, card animations
- GSAP + ScrollTrigger + Flip — cinematic motion
- Three.js — ambient particle systems
- Lenis — smooth scroll (utility)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

---

## 🗂 Project Structure

```
portfolio/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx            # Scene Engine & navigation
│   │   ├── components/
│   │   │   ├── scenes/        # 9 cinematic scenes
│   │   │   │   ├── SceneIntro.jsx
│   │   │   │   ├── SceneHero.jsx
│   │   │   │   ├── SceneAbout.jsx
│   │   │   │   ├── SceneMilestone.jsx
│   │   │   │   ├── SceneAwards.jsx
│   │   │   │   ├── SceneBlogs.jsx
│   │   │   │   ├── SceneIUI.jsx
│   │   │   │   ├── SceneSecret.jsx
│   │   │   │   └── SceneContact.jsx
│   │   │   ├── three/
│   │   │   │   └── ThreeAmbient.jsx   # Three.js particle system
│   │   │   └── ui/
│   │   │       ├── SceneNav.jsx       # Bottom navigation
│   │   │       └── SceneMap.jsx       # Overlay scene map
│   │   └── styles/
│   │       └── globals.css            # Design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                    # Express API
    ├── index.js
    ├── models/
    │   ├── Blog.js
    │   ├── Award.js
    │   └── Milestone.js
    ├── routes/
    │   ├── blogs.js
    │   ├── awards.js
    │   └── milestones.js
    ├── seed/
    │   └── seed.js            # Database seed data
    └── package.json
```

---

## 🚀 Local Development

### 1. Clone & Install

```bash
# Install backend dependencies
cd portfolio/server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# Server
cp server/.env.example server/.env
# Edit server/.env → set MONGO_URI to your MongoDB connection string

# Client (optional)
cp client/.env.example client/.env
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

### 4. Start Development Servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open `http://localhost:5173`

---

## 🌐 Deployment

### Backend → Render

1. Push to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect your repo, set root directory to `server/`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add environment variable: `MONGO_URI=your_mongodb_atlas_uri`
7. Deploy

### Frontend → Vercel

1. Create account on [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set root directory to `client/`
4. Framework preset: **Vite**
5. Add environment variable: `VITE_API_URL=https://your-render-backend.onrender.com`
6. Deploy

### MongoDB → Atlas

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free M0 cluster
3. Create database user & whitelist IPs (0.0.0.0/0 for Render)
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`
5. Add to Render environment variables as `MONGO_URI`

---

## 🎭 Scenes Overview

| # | Scene | Description |
|---|-------|-------------|
| 0 | Intro | Cinematic particle intro with auto-enter |
| 1 | Hero | Editorial headline with Three.js mouse parallax |
| 2 | About | ~200-word word-reveal with glass card |
| 3 | Journey | Zig-zag milestone timeline |
| 4 | Awards | Museum gallery with modal + spotlight |
| 5 | Blogs | Editorial cards + Reader Mode |
| 6 | IUI Solutions | Capability tiles with 3D flip |
| 7 | Secret | Floating orbs teaser room |
| 8 | Contact | Glass form → mailto |

---

## 🧭 Navigation

| Method | Action |
|--------|--------|
| Mouse wheel | Next / previous scene |
| Arrow keys → ↓ | Forward |
| Arrow keys ← ↑ | Back |
| Swipe up/down | Scene change (mobile) |
| Dot navigation | Jump to scene |
| Map button | Open scene map overlay |

---

## 🎨 Design System

**Colors:** Deep cinematic black `#060608` · Luxury gold `#c9a84c` · Soft white `#f5f0e8`

**Fonts:**
- Headline: `Cormorant Garamond` (luxury serif)
- Body: `DM Sans` (modern sans-serif)
- UI: `JetBrains Mono` (monospace)

**Motion tokens:** `--ease-cinema`, `--ease-premium`, `--ease-gentle`, `--ease-confident`

---

## 📡 API Endpoints

```
GET  /api/blogs          → All blog posts
GET  /api/blogs/:slug    → Single blog by slug
GET  /api/awards         → All awards
GET  /api/milestones     → All milestones (sorted by order)
```

---

## ⚡ Performance

- Three.js particle count automatically halved on mobile
- GPU-friendly transforms only (no layout thrashing)
- `will-change: transform, opacity, filter` on scene elements
- `prefers-reduced-motion` respected
- Safari iOS safe-area insets supported

---

## 🔒 Security & Privacy

- No email APIs — all contact via `mailto:` links
- No tracking or analytics
- External links limited to: LinkedIn, Twitter, Facebook
- No hospital/RCM/external site links

---

*Built with 20+ years of creative technologist instinct.*
*This portfolio is not a retrospective — it is a prelude.*
