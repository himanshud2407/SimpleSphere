# 🌐 SimpleSphere.in - Modern Learning Platform

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://www.sanity.io/)

**SimpleSphere** is a premium, high-performance online learning platform built for 2026. It features a sleek, responsive UI, dynamic course management, and a robust backend integrated with modern CMS and Database solutions.

---

## ✨ Key Features

- 🚀 **Modern UI/UX**: Built with React 19, Vite, and Tailwind CSS 4 for blazing fast performance and a premium feel.
- 🎓 **Course Catalog**: Dynamic course listing with advanced filtering by categories and levels.
- 🔐 **Admin Dashboard**: Secure management of courses and leads with JWT authentication.
- 📝 **Lead Capture**: Integrated contact forms that sync directly with Supabase.
- 📰 **Dynamic Blog**: CMS-powered blog system using Sanity.io.
- 🎭 **Smooth Animations**: Interactive elements powered by Framer Motion.
- 🤖 **AI Integration**: Prepared for Google Gemini AI capabilities.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Functional Components, Hooks)
- **Bundler**: Vite
- **Styling**: Tailwind CSS 4, Framer Motion (Animations)
- **Icons**: Lucide React, Tabler Icons
- **CMS**: Sanity.io

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT (JSON Web Tokens)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Environment Setup
Create a `.env.local` file in the root directory and add the following:

```env
# Backend Settings
PORT=5000
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@simplesphere.in
ADMIN_PASSWORD=admin123

# Supabase Settings
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Frontend Settings
VITE_API_URL=http://localhost:5000
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

### 3. Installation & Running

#### Step A: Backend Setup
```bash
cd server
npm install
node server.js
```

#### Step B: Frontend Setup
Open a new terminal in the root directory:
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 📂 Project Structure

```text
├── server/             # Express.js Backend
│   └── server.js       # Main server logic & API endpoints
├── src/                # React Frontend Source
│   ├── components/     # UI Components
│   ├── pages/          # Page views
│   ├── hooks/          # Custom React hooks
│   └── assets/         # Images, fonts, etc.
├── simplesphere/       # Sanity Studio (CMS)
├── public/             # Static assets
├── seed_courses.mjs    # Database seeding script
└── .env.local          # Environment variables
```

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the app for production |
| `npm run lint` | Runs TypeScript type checking |
| `node seed_courses.mjs` | Seeds the Supabase database with demo courses |

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Built with ❤️ by SimpleSphere Team</p>
