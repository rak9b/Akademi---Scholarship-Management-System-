# 🎓 Akademi - Premium Scholarship Management System

<div align="center">

![Akademi Banner](https://img.shields.io/badge/Akademi-Signature%20Edition-16a34a?style=for-the-badge&logo=googlescholar&logoColor=white)

[![Status](https://img.shields.io/badge/Status-Zero_Error-success?style=for-the-badge&logo=checkmarx)](https://scholarship-management-sys.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

**The "Signature Edition" scholarship orchestration platform.**
*Designed for Elite Academic Institutions & Aspiring Scholars.*

[Live Demo](https://scholarship-management-sys.vercel.app/) • [Features](#-key-features) • [Tech Stack](#-technology-stack) • [Installation](#-installation) • [The Signature Aesthetic](#-the-signature-aesthetic)

</div>

---

## 📖 **Project Overview**

**Akademi** is a state-of-the-art scholarship management platform designed to bridge the gap between world-class institutions and high-potential researchers. This "Signature Edition" release features a complete UI/UX overhaul, focusing on cinematic realism, glassmorphic interfaces, and a sophisticated **Neo-Classical** design language.

It is a full-stack MERN application (MongoDB, Express, React, Node.js) with robust authentications, role-based dashboards, and integrated payment processing.

---

## ✨ **The Signature Aesthetic**

This project is defined by its unique **Signature Edition** visual identity:

- **🎨 Deep Emerald & Obsidian Palette**: A color scheme that evokes prestige, wealth, and academic tradition.
- **🏛️ Neo-Classical Typography**: Using **Spectral** (Serif) for headers and **Bricolage Grotesque** for body text to balance history with modernity.
- **🎥 Cinematic Motion**: Powered by `Framer Motion`, pages feature staggered reveals, cinematic parallax banners, and smooth micro-interactions.
- **🔮 Glassmorphism**: High-end frosted glass effects on cards, navigation, and modals for a modern, depth-rich feel.
- **🎞️ Realistic Imagery**: Every scholarship card features high-fidelity university photography and authentic accredited logos.

---

## 🎯 **Key Features**

### 🌍 **Public Modules**

| Feature | Description |
|---------|-------------|
| **Immersive Landing** | A cinematic entry point with animated stats, featured scholarships, and emotional storytelling. |
| **Smart Registry** | The `All Scholarships` page features a floating glassmorphic search dock, advanced filtering, and realistic card grids. |
| **Dossier View** | The `Scholarship Details` page acts as a cinematic "Dossier," featuring university visuals, verified logos, and clear metric badges. |
| **Verified Testimonials** | A "Peer Insights" section showcasing reviews from verified scholars with star ratings. |
| **Secure Authentication** | Zod-validated Login/Register flows with role selection and JWT-based security. |

### 🎓 **Student Dashboard**

- **My Applications**: Real-time tracking of submitted dossiers with status badges (Pending, Processing, Completed).
- **Edit/Delete Controls**: Full CRUD capabilities for managing own applications.
- **Review Engine**: Submit testimonials for scholarships won.
- **Profile Manager**: Manage personal academic data and contact details.

### ⚖️ **Moderator/Staff Dashboard**

- **Scholarship Architect**: Create and edit scholarship listings with rich text descriptions and image uploads.
- **Application Processor**: Review incoming student applications, create feedback loops, and manage approvals/rejections.
- **Live Feedback**: Send direct feedback messages to applicants regarding their submission status.

### 👨‍💼 **Admin Dashboard**

- **System Analytics**: High-level visualizations (Charts/Heatmaps) of revenue, application volume, and user growth.
- **User Orchestration**: Manage all user accounts, creating or banning Moderators and Users as needed.
- **Role Management**: Promote highly active users to Moderator status.

---

## 🛠️ **Technology Stack**

### **Frontend Architecture**
- **Framework**: React 18.3 + Vite 6.0 (High Performance)
- **Styling**: Tailwind CSS + Custom Design Tokens (Emerald/Slate/Gold)
- **Animations**: Framer Motion 12 (Cinematic Transitions)
- **State/Data**: TanStack Query v5 (Caching & Sync)
- **Forms**: React Hook Form + Zod (Strict Validation)
- **Payments**: Stripe Elements (Secure Checkout)

### **Backend Infrastructure**
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB Atlas (Cloud Native)
- **Authentication**: Firebase Auth + JWT (Hybrid Security)
- **API**: RESTful Architecture

---

## 🚀 **Installation & Setup**

Follow these steps to deploy the Signature Edition locally.

### **1. Prerequisites**
- Node.js (v18+)
- MongoDB Connection String
- Firebase Project Credentials
- Stripe Test API Keys

### **2. Clone Repository**
```bash
git clone https://github.com/rak9b/Akademi---Scholarship-Management-System-.git
cd Akademi---Scholarship-Management-System-
```

### **3. Backend Setup**
```bash
cd server
npm install
# Create .env file with:
# DB_USER=your_db_user
# DB_PASS=your_db_pass
# ACCESS_TOKEN_SECRET=your_jwt_secret
# STRIPE_SECRET_KEY=your_stripe_secret
npm run dev
```

### **4. Frontend Setup**
```bash
cd client
npm install
# Create .env.local file with:
# VITE_apiKey=firebase_api_key
# VITE_authDomain=firebase_auth_domain
# VITE_projectId=firebase_project_id
# VITE_storageBucket=firebase_storage_bucket
# VITE_messagingSenderId=sender_id
# VITE_appId=app_id
# VITE_API_URL=http://localhost:5000
# VITE_publishableKey=stripe_publishable_key
# VITE_image_hosting_key=imgbb_api_key
npm run dev
```

---

## 🔗 **URL Reference Guide**

### **Public Access**
- `Home`: `/`
- `Directory`: `/all-scholarships`
- `Details`: `/scholarship-details/:id`
- `Pricing`: `/pricing`
- `Contact`: `/contact-us`
- `Auth`: `/login`, `/register`

### **Protected Dashboards**
- **Student**: `/dashboard/my-profile`, `/dashboard/my-application`, `/dashboard/my-reviews`
- **Moderator**: `/dashboard/add-scholarship`, `/dashboard/manage-scholarships`, `/dashboard/all-reviews`
- **Admin**: `/dashboard/admin-profile`, `/dashboard/add-scholarship`, `/dashboard/manage-users`, `/dashboard/manage-applications`

---

## 🛡️ **Test Credentials**

Access the full suite of features with these verified test accounts:

| Role | Email | Password | Access Scope |
|------|-------|----------|--------------|
| **Admin** | `admin@akademi.com` | `123456` | Full System Control (Analytics, Users) |
| **Moderator** | `mod@akademi.com` | `123456` | Content & Application Management |
| **Student** | `student@akademi.com` | `123456` | Application Submission & History |

---

<div align="center">

**Akademi Signature Edition**
*Built with ❤️ for the global research community.*

</div>