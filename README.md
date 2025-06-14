# Hospital Admin Management System

A full-stack hospital administration web application built as a Final Year Project. It enables efficient management of patients, staff, appointments, and schedules with Firebase authentication and PostgreSQL as the database.

---

## 🏗️ Project Structure

```
FYP/
├── hospital-backend/   # Node.js + Express backend with PostgreSQL
└── hospital-frontend/  # React + TailwindCSS frontend
```

---

## 🔑 Demo Login

Use the following credentials to log in as an admin:
- Email: admin@hospital.com
- Password: admin123

---

## ✨ Features

### 👨‍⚕️ Staff Management
- View, add, and delete staff
- Assign work schedules by weekday
- View detailed staff profiles

### 🧑‍🦽 Patient Management
- Add and manage patients
- View full appointment history per patient

### 📅 Appointment Scheduling
- Book appointments with available doctors (based on weekly schedule)
- View all upcoming, completed, or cancelled appointments
- Cancel appointments with status tracking

### 🔐 Authentication
- Firebase authentication (email/password login)
- Protected routes — only logged-in users can access the dashboard

### 📊 Dashboard Overview
- Shows staff on duty today
- Lists today’s scheduled appointments

---

## 🔧 Tech Stack

| Layer         | Technology                     |
|---------------|--------------------------------|
| Frontend      | React, TailwindCSS             |
| Backend       | Node.js, Express               |
| Database      | PostgreSQL                     |
| Auth          | Firebase Authentication        |
| Styling       | TailwindCSS                    |

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd hospital-backend
npm install
node initDB.js       # Creates tables and inserts sample data
node server.js       # Starts Express server on port 5000
```

### 2. Frontend Setup

```bash
cd hospital-frontend
npm install
npm start            # Runs app on http://localhost:3000
```


---

## 📸 Screenshots

- Dashboard showing staff on duty and today’s appointments
- Patient and staff detail pages
- Appointment booking with time restrictions
- Sidebar navigation with active state highlighting

---

## 🧑‍🎓 Author

This project was built by Zvan Guan as a Final Year Project (FYP).  
All source code is self-developed and submitted as part of academic work.

---

## ✅ Status

✅ All core features completed  
🚧 Optional features like treatment history or search/filter may be extended post-submission.

---

## 📃 License

This project is submitted for educational purposes and is not intended for commercial use.