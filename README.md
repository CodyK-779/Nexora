# 🎮 Noxus — Game Discovery Platform

Noxus is a modern full-stack game discovery platform that allows users to explore, filter, and track video games across multiple platforms and genres. It is built with performance, scalability, and clean UI/UX in mind using the latest Next.js App Router architecture.

---

## 🚀 Features

- 🔎 Advanced game discovery with filters (platforms, genres, tags, ratings, release date)
- ♾ Infinite scrolling with optimized data fetching
- ⚡ Debounced search for real-time results with recent-searches feature in mobile stored with local storage
- 🎬 Detailed game pages (screenshots, trailers, platforms, achievements, system requirements)
- ❤️ Wishlist system with authentication
- 📱 Fully responsive design (desktop & mobile)
- 🧠 Smart caching and optimized rendering using Server Components

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Prisma ORM
- PostgreSQL
- BetterAuth (authentication)

### APIs
- RAWG Video Games Database API

---

## ⚡ Performance & Architecture

- Server Components for efficient data fetching
- React `cache()` to prevent duplicate server requests
- Suspense for streaming UI sections
- Intersection Observer for infinite scrolling
- Debounced search to reduce API load
- Optimized image loading with Next.js Image

---

## 🧩 Key Technical Challenges

### 1. Infinite Scroll with Dynamic Filters
Managing pagination alongside changing filters required careful state control to prevent duplicate or stale data.

**Solution:**
- Reset pagination state on filter change
- Guard requests using refs to avoid race conditions
- Deduplicate results from API responses

---

### 2. Avoiding Over-Fetching User Data
Multiple components required access to user session data (e.g., Navbar, Wishlist).

**Solution:**
- Used React `cache()` to ensure the user session is fetched only once per request
- Shared the promise across server components

---

### 3. Handling Inconsistent API Data
Some API responses (e.g., system requirements) were unstructured or inconsistent.

**Solution:**
- Built custom parsing utilities to normalize and display clean UI sections

---

## 📸 Screenshots

> Add screenshots here (homepage, browse page, game details, wishlist)

---

## 🌐 Live Demo

👉 [Live Site](#)  
👉 [GitHub Repository](#)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/noxus.git
cd noxus
npm install
