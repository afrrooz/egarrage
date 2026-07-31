# 🏎️ egarrage - 3-Tier Automotive Startup Application

Welcome to **egarrage** — a 3-tier automotive web application built for an imported car showroom, auto parts marketplace, garage service appointment booking, and next-generation EV & tuning technology showcase.

---

## 🏗️ Architecture Overview

The application consists of 3 dockerized tiers running on an isolated bridge network:

1. **Frontend Tier** (`frontend/`)
   - **Tech Stack:** React 18, Vite, TailwindCSS, JavaScript (JS), Lucide Icons
   - **Features:** Glassmorphism luxury UI, imported car showroom catalog with filter tabs & specs, searchable auto parts store, service appointment booking, EV tech showcase, live PostgreSQL health badge.
   - **Port:** `5173`

2. **Backend API Tier** (`backend/`)
   - **Tech Stack:** Node.js, Express.js, `pg` (PostgreSQL Client), CORS, Dotenv
   - **Features:** RESTful API endpoints for `/api/cars`, `/api/parts`, `/api/services`, `/api/tech`, `/api/health`.
   - **Port:** `5000`

3. **Database Tier** (`postgres_db`)
   - **Tech Stack:** Official `postgres:16-alpine` Docker Image
   - **Features:** Pre-configured schema with tables (`imported_cars`, `auto_parts`, `service_bookings`, `tech_innovations`) and auto-seeded mock data via `init.sql`.
   - **Port:** `5432`

---

## 🚀 How to Run with Docker Compose (Recommended)

From the project root directory (`egarrage/`), run:

```bash
docker-compose up --build
```

### Accessing Services:
- 🌐 **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- 🔌 **Backend REST API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
- 🗄️ **PostgreSQL Database:** `localhost:5432` (User: `egarrage_user`, Pass: `egarrage_pass`, DB: `egarrage_db`)

To stop all containers:
```bash
docker-compose down
```

---

## 🛠️ Running Locally (Without Docker)

### 1. Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
egarrage/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   ├── db.js
│   └── init.sql
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── index.css
        ├── main.jsx
        ├── App.jsx
        ├── services/api.js
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── CarShowroom.jsx
            ├── AutoPartsStore.jsx
            ├── ServiceBooking.jsx
            ├── TechShowcase.jsx
            └── Footer.jsx
```
# egarrage
#updated