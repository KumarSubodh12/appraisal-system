# AppraisalAI — ML-Based Employee Appraisal System

<div align="center">

![AppraisalAI](https://img.shields.io/badge/AppraisalAI-ML_Powered_Performance-gold?style=for-the-badge)

**A premium, ML-powered employee performance appraisal system built with Next.js**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-appraisal--system--theta.vercel.app-gold?style=for-the-badge)](https://appraisal-system-theta.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-KumarSubodh12-black?style=for-the-badge&logo=github)](https://github.com/KumarSubodh12/appraisal-system)
[![Made By](https://img.shields.io/badge/Made_by-Kumar_Subodh-gold?style=for-the-badge)](https://github.com/KumarSubodh12)

</div>

---

## ✨ Features

- 🧠 **ML Score Engine** — Weighted ensemble model evaluating 6 performance dimensions
- 📊 **Real-time Dashboard** — Live charts with Radar, Line, Bar & Pie visualizations
- 🔒 **Role-Based Auth** — Admin, Manager & Employee roles via NextAuth
- 📧 **Email Notifications** — Automated appraisal emails via Resend
- 📁 **File Uploads** — Secure document management via Uploadthing
- 💳 **Stripe Integration** — Payment gateway ready
- ⚡ **Real-time Updates** — Live notifications via Pusher
- 🎨 **Premium UI** — Custom gold cursor, particle animations, scroll effects
- 🌑 **Dark Theme** — Obsidian + Gold premium design system
- 💧 **Watermark** — "Made by Kumar Subodh" on every page

---

## 🚀 Live Demo

🔗 **[https://appraisal-system-theta.vercel.app](https://appraisal-system-theta.vercel.app)**

**Demo Credentials:**
| Field | Value |
|-------|-------|
| Email | `admin@company.com` |
| Password | `admin123` |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) + TypeScript |
| **Styling** | Tailwind CSS + Custom Design System |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Auth** | NextAuth.js |
| **Charts** | Recharts |
| **Real-time** | Pusher |
| **Email** | Resend |
| **File Upload** | Uploadthing |
| **Payments** | Stripe |
| **Deployment** | Vercel |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
appraisal-system/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth routes
│   │   ├── appraisals/    # Appraisal CRUD APIs
│   │   ├── employees/     # Employee management APIs
│   │   ├── ml/score/      # ML scoring engine
│   │   ├── email/         # Email notifications
│   │   └── notify/        # Pusher real-time
│   ├── dashboard/         # Main dashboard
│   ├── employees/         # Employee listing
│   ├── appraisals/        # Appraisal management
│   ├── analytics/         # Advanced analytics
│   ├── profile/           # User profile
│   └── settings/          # App settings
├── components/
│   ├── layout/Sidebar.tsx # Navigation sidebar
│   └── ui/                # Reusable UI components
├── lib/prisma.ts          # Database client
├── prisma/schema.prisma   # Database schema
└── types/index.ts         # TypeScript types
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL database (Neon recommended)

### 1. Clone the repository
```bash
git clone https://github.com/KumarSubodh12/appraisal-system.git
cd appraisal-system/appraisal-system
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

Fill in your `.env`:
```env
DATABASE_URL="your-neon-postgresql-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="your-resend-key"
UPLOADTHING_SECRET="your-uploadthing-secret"
STRIPE_SECRET_KEY="your-stripe-key"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="ap2"
```

### 4. Setup database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧠 ML Scoring Algorithm

The ML engine uses a **weighted ensemble model** across 6 dimensions:

| Dimension | Weight |
|-----------|--------|
| Performance | 25% |
| Productivity | 20% |
| Teamwork | 15% |
| Leadership | 15% |
| Innovation | 15% |
| Communication | 10% |

**Grade Scale:**
- 🌟 **Outstanding** — 90-100
- ✅ **Excellent** — 80-89
- 👍 **Good** — 70-79
- 📈 **Satisfactory** — 60-69
- ⚠️ **Needs Improvement** — Below 60

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| Landing | Premium hero with particle animations |
| Dashboard | Real-time charts and KPI cards |
| Appraisals | ML-scored employee appraisals |
| Analytics | Advanced data visualizations |
| New Appraisal | Interactive ML scoring form |

---

## 🚀 Deployment

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

```bash
# Deploy manually
git add .
git commit -m "your changes"
git push
# Vercel auto-deploys!
```

---

## 👨‍💻 Author

<div align="center">

**Kumar Subodh**

[![GitHub](https://img.shields.io/badge/GitHub-KumarSubodh12-black?style=flat&logo=github)](https://github.com/KumarSubodh12)

*Made with ❤️ and lots of ☕*

</div>

---

<div align="center">
<sub>© 2025 AppraisalAI — Made by Kumar Subodh</sub>
</div>
