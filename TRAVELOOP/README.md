# Traveloop - Professional Hackathon Monorepo

Welcome to **Traveloop**, a scalable, production-ready travel planning platform built for the ODDO Hackathon. This project follows a monorepo architecture designed for high-performance teams to work in parallel across Frontend, Backend, AI, and Infrastructure.

---

## 🏗️ Architecture Overview

```text
Traveloop/
│
├── client/              # Next.js 15 Frontend (Member A)
│   ├── src/app/         # Routes: Dashboard, Trip Planning, Auth
│   ├── src/components/  # Atomic Design: UI, Layouts, Features
│   ├── src/hooks/       # Real-time Collaboration & Auth Hooks
│   └── src/services/    # API Client & Data Fetching
│
├── server/              # Node.js & Express Backend (Member B)
│   ├── src/controllers/ # Core Business Logic
│   ├── src/routes/      # REST API Endpoints
│   ├── src/services/    # Database Operations (Prisma)
│   └── src/sockets/     # Real-time Collaboration (Socket.io)
│
├── ai-service/          # Python AI Engine (Member C)
│   ├── app/services/    # AI Recommendations & OpenAI Integration
│   ├── app/api/         # FastAPI Endpoints
│   └── data/            # Knowledge Base & Prompt Templates
│
├── infrastructure/      # DevOps & Realtime (Member D)
│   ├── docker/          # Containerization (Postgres, Redis, App)
│   ├── nginx/           # Reverse Proxy & Load Balancing
│   └── .github/         # CI/CD Workflows
│
└── README.md            # Root Project Documentation
```

---

## 👥 Teammate Assignments

| Teammate | Focus Area | Responsibility |
| :--- | :--- | :--- |
| **A (Frontend)** | `client/` | Next.js 15, ShadCN UI, Framer Motion, State Management |
| **B (Backend)** | `server/` | Express.js API, Prisma ORM, JWT Auth, Sockets |
| **C (AI)** | `ai-service/` | FastAPI, OpenAI SDK, Recommendation Logic |
| **D (Infra)** | `infrastructure/` | Docker Compose, Redis Caching, Nginx, CI/CD Pipelines |

---

## 🚀 Startup Sequence

To get the full system running locally:

1. **Infrastructure**: 
   ```bash
   cd infrastructure/docker
   docker-compose up -d
   ```
2. **Backend**:
   ```bash
   cd server
   npm install && npx prisma generate && npm run dev
   ```
3. **AI Service**:
   ```bash
   cd ai-service
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
4. **Client**:
   ```bash
   cd client
   npm install && npm run dev
   ```

---

## 🛠️ Best Practices

- **Strict Folder Isolation**: Only work in your assigned directory to avoid merge conflicts.
- **Git Flow**:
  - `main`: Production (Ready for demo)
  - `develop`: Shared integration branch
  - `feat/feature-name`: Personal branch for specific tasks
- **Shared Contracts**: Use TypeScript interfaces or a shared `contracts/` folder to define API responses early.
- **Micro-commits**: Push small, functional changes frequently to `develop`.

---

## ✨ Features to Implement

- [ ] **Auth**: JWT-based login with role management.
- [ ] **Trip Planning**: Interactive multi-city itinerary builder.
- [ ] **AI Engine**: Personalized recommendations based on user preferences.
- [ ] **Realtime**: Collaboration on trip planning using Socket.io and Redis.
- [ ] **Analytics**: Dashboard for budget tracking and trip stats.
