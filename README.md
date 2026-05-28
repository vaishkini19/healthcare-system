# 🏥 Digital Healthcare Records & Appointment System

## 📌 Overview
A backend healthcare management system built using Node.js, Express.js, MongoDB, and JWT authentication.

It provides secure authentication, role-based access control, and management of electronic medical records, appointments, and prescriptions.

---

## ⚙️ Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js
- Postman

---

## 🚀 Features
- User Registration & Login
- JWT Authentication
- Role-Based Access Control (Admin / Doctor / Patient)
- Electronic Medical Records (EMR)
- Appointment Booking System
- Prescription Management System
- RESTful API Design

---

## 📥 Installation

### 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/healthcare-system.git

### 2. Navigate to Project Folder
cd healthcare-system

### 3. Install Dependencies
npm install

### 4. Create .env File
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### 5. Run Server
npm run dev

---

## 🔐 Authentication

### Register User
POST /api/auth/register

### Login User
POST /api/auth/login

### JWT Token Usage
After login, use the token in headers for protected routes:

Authorization: Bearer <token>

---

## 🏥 EMR (Electronic Medical Records)

POST /api/emr
GET /api/emr

---

## 📅 Appointments

POST /api/appointments
GET /api/appointments
PUT /api/appointments/:id
DELETE /api/appointments/:id

---

## 💊 Prescriptions

POST /api/prescriptions
GET /api/prescriptions
PUT /api/prescriptions/:id
DELETE /api/prescriptions/:id

---

## 🔒 Role-Based Access Control

- Admin → Full access to all modules
- Doctor → Manage appointments and prescriptions
- Patient → Book appointments and view own records

---

## 🧪 Testing Steps (Postman Flow)

1. Register user → /api/auth/register
2. Login user → /api/auth/login
3. Copy JWT token
4. Add token to headers:
   Authorization: Bearer <token>
5. Test all protected routes

---

## 👨‍💻 Author
Sameeksha