# 🛍️ Nexora — Full-Stack E-Commerce Platform

Nexora is a modern full-stack e-commerce application featuring a seamless shopping experience, high-performance architecture, and a powerful admin dashboard for complete store management.

🔗 [Live Demo](https://nexora-kzt.vercel.app) 
📦 [GitHub](https://github.com/CodyK-779/Nexora.git)

---

## 🚀 What This Project Delivers

- End-to-end e-commerce workflow from product discovery to checkout  
- High-performance rendering with optimized data fetching and caching  
- Scalable architecture supporting both customers and admin operations  
- Secure authentication with role-based access control  

---

## 🧩 Core Functionality

### Product Discovery
- Dynamic product catalog with **advanced filtering and search**
- Fully responsive UI for consistent experience across devices
- Optimized image delivery using Cloudinary

### Shopping Experience
- Persistent **shopping cart and wishlist system**
- Streamlined and secure checkout flow
- Smooth client-server interactions using Server Actions

### Admin System
- Centralized dashboard for managing:
  - Products  
  - Categories  
  - Inventory  
  - Orders  
  - Users  
- Real-time updates for inventory and order management

---

## ⚡ Performance & Architecture

- Achieved **~50% faster page load times** through:
  - Next.js Server Actions  
  - Data caching strategies  
- Designed efficient backend logic using **Prisma ORM**
- Structured relational database with **PostgreSQL**
- Optimized asset handling with **Cloudinary CDN**

---

## 🔐 Security & Data Handling

- Implemented **secure authentication** using BetterAuth  
- Enforced **role-based access control (RBAC)**  
- Protected admin routes and sensitive operations  
- Ensured consistent data integrity across transactions  

---

## ⚙️ Tech Stack

- **Frontend:** Next.js(App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Prisma ORM, PostgreSQL, BetterAuth  
- **Media Storage:** Cloudinary  

---

## 📸 Screenshots

![image alt](https://github.com/CodyK-779/Nexora/blob/dcb445c213e62548a7fc05dbbf1b372db07370af/nexora_screenshot.png)

---

## Installation

```bash
git clone https://github.com/CodyK-779/Nexora.git
cd nexora
npm install
cp .env.example .env
npm run dev
```
