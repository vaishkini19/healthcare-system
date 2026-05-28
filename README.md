# Digital Healthcare Records & Appointment System

## Project Overview
This is a backend healthcare management system built using Node.js, Express.js, MongoDB, and JWT authentication.

The system supports:
- User registration and login
- JWT authentication
- Electronic Medical Records (EMR)
- Appointment booking
- Prescription management

---

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Postman

---

## Installation Steps

### 1. Clone Repository

git clone https://github.com/YOUR_USERNAME/healthcare-system.git

### 2. Open Project Folder

cd healthcare-system

### 3. Install Dependencies

npm install

### 4. Create .env File

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=mysecretkey

### 5. Run Server

npm run dev

---

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### EMR
- POST /api/emr
- GET /api/emr

### Appointments
- POST /api/appointments
- GET /api/appointments

### Prescriptions
- POST /api/prescriptions
- GET /api/prescriptions

---

## Features
- Secure JWT Authentication
- MongoDB Database Integration
- RESTful APIs
- Appointment Scheduling
- Prescription Storage
- EMR Management

---

## Test Commands

### Start Server

npm run dev

### Register User

POST /api/auth/register

### Login User

POST /api/auth/login

### Create EMR

POST /api/emr

### Book Appointment

POST /api/appointments

### Create Prescription

POST /api/prescriptions
## Author
Sameeksha