# CivicDesk — AI-Based Smart Complaint Management System

A modern MERN Stack application for smart public complaint management with AI-powered complaint analysis, department recommendation, urgency detection, and automated responses.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [AI Features](#ai-features)
- [Authentication & Security](#authentication--security)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Deployment](#deployment)
- [Sample Complaint JSON](#sample-complaint-json)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

# Overview

CivicDesk is a full-stack AI-powered complaint management platform where users can:

- Register complaints online
- Track complaint status
- Filter and search complaints
- Receive AI-generated complaint analysis
- Get automatic department recommendations
- Detect complaint urgency levels
- View AI-generated summaries and responses

The system integrates React, Node.js, Express, MongoDB, and Claude AI to create an intelligent civic issue management platform.

---

# Features

## Complaint Management
- Complaint registration form
- Complaint listing page
- Complaint detail page
- Complaint status updates
- Complaint deletion (admin only)

## Search & Filtering
- Search complaints by location
- Filter by category
- Filter by status
- Pagination support

## AI Integration
- AI urgency detection
- Department recommendation
- Complaint summarization
- Automated response generation

## Authentication
- JWT authentication
- User login & signup
- Protected routes
- Role-based access control
- bcrypt password hashing

## UI Features
- Responsive modern UI
- Dark mode support
- Framer Motion animations
- Reusable components
- Tailwind CSS styling

---

# Architecture

| Module | Description |
|---|---|
| Authentication | JWT + bcrypt authentication system |
| Complaint Module | Complaint CRUD operations |
| AI Engine | Claude AI-powered analysis |
| Search System | Filtering and location search |
| Protected Routes | Secured API access |
| Database Layer | MongoDB Atlas integration |

---

# Tech Stack

## Frontend
- React 18
- React Router DOM
- Tailwind CSS v3
- Framer Motion
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## AI
- Anthropic Claude API
- claude-sonnet-4-20250514

## Deployment
- Render
- Vercel (optional)

---

# Project Structure

```bash
smart-complaint-system/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── index.js
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.css
│   └── tailwind.config.js
│
└── README.md
```

---

# AI Features

| Feature | Description |
|---|---|
| Urgency Detection | Detects complaint priority |
| Department Recommendation | Suggests responsible department |
| Complaint Summary | Summarizes long complaint text |
| Auto Response | Generates response for users |

---

# Authentication & Security

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Role-Based Authorization
- Secure API Access
- Token-Based Authentication

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/complaints` | Add complaint |
| GET | `/api/complaints` | Get complaints |
| GET | `/api/complaints/:id` | Get single complaint |
| PUT | `/api/complaints/:id` | Update complaint |
| DELETE | `/api/complaints/:id` | Delete complaint |
| GET | `/api/complaints/search` | Search by location |
| POST | `/api/ai/analyze` | AI complaint analysis |

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ANTHROPIC_API_KEY=your_anthropic_api_key

NODE_ENV=development
```

---

# Installation

## Clone Repository

```bash
git clone <your-repo-url>
cd smart-complaint-system
```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

## Frontend Setup

```bash
cd client
npm install
npm start
```

---

# Deployment

## Backend
Deploy backend on Render Web Service.

## Frontend
Deploy frontend on Render Static Site or Vercel.

---

# Sample Complaint JSON

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "title": "Water Leakage Issue",
  "description": "Water pipeline damaged near market area.",
  "category": "Water Supply",
  "location": "Ghaziabad"
}
```

---

# Screenshots

Add the following screenshots in your project documentation:

- Login Page
- Register Page
- Dashboard
- Complaint Form
- Complaint List
- AI Analysis Result
- MongoDB Database
- Postman API Testing
- Render Deployment

---

# Future Enhancements

- Real-time notifications
- Complaint analytics dashboard
- Email notifications
- AI chatbot support
- Image upload support
- Multi-language support
- Admin analytics panel

```