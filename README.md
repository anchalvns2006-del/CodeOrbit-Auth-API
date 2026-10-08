# 🔐 CodeOrbit Authentication API

A secure and beginner-friendly **User Authentication REST API** built with **Node.js, Express.js, bcryptjs, JWT, and JSON file storage**.

This project was developed as part of my **CodeOrbit Tech Full Stack Development Internship** to implement user registration, secure password handling, login authentication, JWT-based authorization, and protected API routes.

---

## 🚀 Features

* 👤 User Registration / Signup
* 🔑 User Login
* 🔒 Password Hashing using bcryptjs
* 🎟️ JWT Authentication
* 🛡️ Protected Profile Route
* 🚫 Unauthorized Access Handling
* 💾 JSON File-based User Storage
* ✅ Input Validation
* 📡 RESTful API Architecture
* 🧪 Postman API Testing

---

## 🛠️ Tech Stack

| Technology           | Purpose                        |
| -------------------- | ------------------------------ |
| Node.js              | JavaScript Runtime             |
| Express.js           | REST API Framework             |
| bcryptjs             | Password Hashing               |
| JSON Web Token (JWT) | Authentication & Authorization |
| File System (fs)     | JSON Data Storage              |
| Postman              | API Testing                    |

---

## 📁 Project Structure

```text
CodeOrbit-Auth-API/
│
├── data/
│   └── users.json
│
├── node_modules/
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/anchalvns2006-del/CodeOrbit-Auth-API.git
```

### 2. Open the project

```bash
cd CodeOrbit-Auth-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### 🏠 Home

**GET**

```text
/
```

Returns API information and available endpoints.

---

### 📝 Signup

**POST**

```text
/api/auth/signup
```

#### Request Body

```json
{
  "name": "Anchal Patel",
  "email": "anchal@example.com",
  "password": "Anchal@123"
}
```

#### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Anchal Patel",
    "email": "anchal@example.com"
  }
}
```

---

### 🔑 Login

**POST**

```text
/api/auth/login
```

#### Request Body

```json
{
  "email": "anchal@example.com",
  "password": "Anchal@123"
}
```

#### Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

The returned JWT token is required to access protected routes.

---

### 👤 Profile

**GET**

```text
/api/auth/profile
```

This is a **protected endpoint**.

Add the JWT token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Anchal Patel",
    "email": "anchal@example.com"
  }
}
```

---

## 🔐 Authentication Flow

```text
User
  │
  ▼
Signup
  │
  ▼
Password hashed with bcryptjs
  │
  ▼
User stored in users.json
  │
  ▼
Login
  │
  ▼
Credentials verified
  │
  ▼
JWT Token generated
  │
  ▼
Protected API Request
  │
  ▼
JWT verified
  │
  ▼
Profile Data
```

---

## 🧪 API Testing

The API was tested using **Postman**.

### Test Cases

| Test                     | Expected Result    |
| ------------------------ | ------------------ |
| Successful Signup        | `201 Created`      |
| Duplicate Email          | `409 Conflict`     |
| Successful Login         | `200 OK`           |
| Invalid Login            | `401 Unauthorized` |
| Profile with Valid Token | `200 OK`           |
| Profile without Token    | `401 Unauthorized` |
| Invalid/Expired Token    | `403 Forbidden`    |

---

## 🔒 Security

This project implements basic authentication security practices:

* Passwords are never stored as plain text.
* Passwords are hashed using **bcryptjs**.
* JWT is used for authentication.
* Protected routes require a valid Bearer token.
* Invalid credentials return an authentication error.
* Sensitive configuration can be supplied using environment variables.

---

## 📦 Dependencies

```text
express
bcryptjs
jsonwebtoken
nodemon
```

---

## 🎯 Internship Task

**Program:** CodeOrbit Tech Full Stack Development Internship

**Task:** User Authentication API

### Implemented

* Signup
* Login
* Password hashing
* JWT authentication
* Protected route
* Unauthorized request handling
* Postman testing

---

## 👨‍💻 Author

**Anchal Patel**

B.Tech Computer Science Engineering
Babu Banarasi Das University, Lucknow

### Connect With Me

* GitHub: https://github.com/anchalvns2006-del
* LinkedIn: https://www.linkedin.com/in/anchal-patel-59385a329
* X: https://x.com/royal01patel

---

## ⭐ Project Status

**Completed ✅**

Built as part of the CodeOrbit Tech Full Stack Development Internship.
