# Hospital Admin Management System

A full-stack hospital administration web application built as a Final Year Project. It enables efficient management of patients, staff, appointments, and schedules with Firebase authentication and PostgreSQL as the database.

---

## 🧰 2. Prerequisites (Terminal section) 
"To run the system locally, you’ll need to install the following tools on your machine:
- Node.js – For running the backend server
- PostgreSQL – As the main database
- Firebase project – For authentication
- npm or yarn – To manage dependencies for the frontend and backend"

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

### 🔐 Authentication
- Firebase authentication (email/password login)
- Protected routes — only logged-in users can access the dashboard

### 📊 Dashboard Overview
- Shows staff on duty today
- Lists today’s scheduled appointments

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
node initDB.js       
node server.js       # Starts Express server on port 5000
```

### 2. Frontend Setup

```bash
cd hospital-frontend
npm install
npm start            # Runs app on http://localhost:3000
```

---

## 📃 License

This project is submitted for educational purposes and is not intended for commercial use.