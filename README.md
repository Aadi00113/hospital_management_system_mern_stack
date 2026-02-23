# 🏥 Nexora Health — Hospital Management System

A full-stack MERN hospital management system with a patient-facing frontend, an admin dashboard, and a REST API backend.

---

## 🔗 Live Demo

- **Patient Website:** [hospital-management-system-mern-sta-peach.vercel.app](https://hospital-management-system-mern-sta-peach.vercel.app/)
- **Admin Dashboard:** [nexorahealth-admin-dashboard.vercel.app](https://nexorahealth-admin-dashboard.vercel.app/)

---

## 🚀 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Dashboard** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Auth** | JWT + HTTP-only cookies |
| **Storage** | Cloudinary (doctor avatars) |

---

## 📁 Project Structure

```
hms/
├── backend/       # Express REST API (port 5000)
├── frontend/      # Patient-facing website (port 5173)
└── dashboard/     # Admin dashboard (port 5174)
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/Aadi00113/hospital_management_system_mern_stack.git
cd hospital_management_system_mern_stack
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Dashboard
cd ../dashboard && npm install
```

### 3. Configure environment variables

Create `backend/config.env` (this file is gitignored):

```env
PORT = 5000
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.mongodb.net/nexorahealth?appName=Cluster0
FRONTEND_URL_ONE = http://localhost:5173
FRONTEND_URL_TWO = http://localhost:5174
JWT_SECRET_KEY = your_jwt_secret_here
JWT_EXPIRES = 7D
COOKIE_EXPIRE = 7
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

### 4. Seed the first admin

```bash
cd backend
node seed.js   # creates admin@nexorahealth.com / Admin@1234
```

> ⚠️ Delete `seed.js` after running it.

### 5. Start all three servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev

# Terminal 3 — Dashboard
cd dashboard && npm run dev
```

---

## 🌐 Pages

### Frontend (http://localhost:5173)
- `/` — Home / Hero
- `/about` — About Us
- `/appointment` — Book Appointment
- `/login` — Patient Login
- `/register` — Patient Register

### Dashboard (http://localhost:5174)
- `/login` — Admin Login
- `/` — Dashboard Overview
- `/doctors` — Manage Doctors
- `/messages` — Patient Messages
- `/admin/addnew` — Add Admin
- `/doctor/addnew` — Add Doctor

---

## 🎨 Theme

The app uses **Ocean Blue** as its fixed color theme, defined via CSS custom properties in `App.css`.

---

## 📜 License

MIT
