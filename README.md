# ⭐ Store Rating App

A full-stack web application that allows users to view stores and submit ratings from **1 to 5 stars**.

The application supports three roles:

- 👨‍💼 Admin
- 👤 Normal User
- 🏪 Store Owner

---

# 🚀 About Project

Developed as a **Full Stack Internship Coding Challenge**.

Implemented a complete store rating system with:
- JWT authentication
- Role-based authorization
- Protected routes
- REST APIs
- Store management
- Rating submission system
- Responsive UI

Admins manage users and stores, normal users can rate stores, and store owners can monitor ratings.

---

# ✨ Features

## 👨‍💼 Admin
- Dashboard statistics
- Add users and stores
- View users and stores
- Manage application data

## 👤 Normal User
- Signup/Login
- View and search stores
- Submit and update ratings
- Change password

## 🏪 Store Owner
- Owner dashboard
- View average rating
- View users who rated the store

---

# 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- DaisyUI
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT

### Database
- PostgreSQL

---

# ⚙️ Setup

## Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL="your_postgres_url"
JWT_SECRET="your_secret"
```

Run:

```bash
npx prisma db push
npm start
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🧪 Test Accounts

### 👨‍💼 Admin

```
Email: admin@gmail.com
Password: Admin@123
```

### 👤 User

```
Email: user@gmail.com
Password: User@123
```

### 🏪 Store Owner

```
Email: owner@gmail.com
Password: Owner@123
```

---

# 📂 Structure

```
Store Rating App

├── backend
│   ├── routes
│   ├── controllers
│   ├── prisma
│   └── server.js
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   └── api
    └── package.json
```

---

# 👩‍💻 Developer

**Dhrishti Shetty**  
Full Stack Developer | MERN Stack Developer
