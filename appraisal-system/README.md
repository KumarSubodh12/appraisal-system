# AppraisalAI — ML-Based Employee Appraisal System
**Made by Kumar Subodh**

## 🚀 Setup Instructions

### 1. Install dependencies
```bash
pnpm install
```

### 2. Setup environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — Your Neon PostgreSQL connection string
- `NEXTAUTH_SECRET` — Run `openssl rand -base64 32` to generate
- `NEXTAUTH_URL` — `http://localhost:3000` for development

### 3. Setup database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Login
- Email: `admin@company.com`
- Password: `admin123`

## 🧠 Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom premium theme
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Auth**: NextAuth.js
- **Charts**: Recharts
- **Animations**: Custom CSS + Framer Motion
- **Real-time**: Pusher
- **Email**: Resend
- **Files**: Uploadthing
- **Payments**: Stripe

## ✨ Features
- Custom gold cursor with trail effect
- Particle background animation
- Scroll reveal animations
- ML score computation engine
- Interactive appraisal form with live scoring
- Premium dark theme with gold accents
- "Made by Kumar Subodh" watermark
- Role-based access (Admin, Manager, Employee)
- Real-time dashboard with charts
