<div align="center">

  <h1>🏨 Stayora</h1>

  <h3>A Modern, Resilient Hotel & Vacation Rental Booking Platform</h3>

  <p>
    Discover unique hotels, explore room categories, and book your next stay seamlessly.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-In%20Active%20Development-orange?style=for-the-badge">
    <img src="https://img.shields.io/badge/Node.js-20%2B-green?style=for-the-badge&logo=node.js">
    <img src="https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express">
    <img src="https://img.shields.io/badge/MySQL-8.x-blue?style=for-the-badge&logo=mysql">
    <img src="https://img.shields.io/badge/Redis-6.x-red?style=for-the-badge&logo=redis">
  </p>

  <p>
    <strong>Stayora</strong> is a production-focused, full-stack hotel booking platform built with an emphasis on backend engineering, data consistency, high-security authentication, and system scalability. Featuring an 11-table relational database architecture, distributed in-memory caching with Redis, social authentication, and transactional email automation, Stayora provides a reliable bridge between travelers and property hosts.
  </p>

</div>

---

## 📌 Table of Contents
- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [System Architecture & Flows](#-system-architecture--flows)
- [Security Engineering](#-security-engineering)
- [Database Schema (11 Relational Tables)](#-database-schema-11-relational-tables)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API & Route Specifications](#-api--route-specifications)
- [Project Roadmap](#-project-roadmap)
- [License & Authors](#-license--authors)

---

## 📌 About The Project

Stayora connects travelers with hotels and boutique stays through a clean, unified platform designed to handle complex relational business logic: multi-room inventory, dynamic pricing, host listings, verified reviews, and payment processing.

The platform enforces strict role-based access control (RBAC) across three primary user types:
1. **Guests:** Browse verified hotel properties, filter by category or amenities, inspect room availability in real-time, execute reservations, and leave verified ratings.
2. **Hosts:** Register and manage hotel properties, define room categories, manage pricing models, upload multi-angle photo galleries, and track guest check-in/out schedules.
3. **Admins:** Oversee platform safety, review host verification submissions, manage listings, and audit system integrity.

---

## 🚀 Key Features

### 🔐 Authentication & Session Engine
- **Multi-Provider Logins:** Native Local Strategy with 12-round `bcrypt` password hashing alongside seamless **Google OAuth 2.0** integration.
- **Two-Factor Email OTP Sign-Up:** Prospective accounts must verify a 6-digit one-time code sent via Nodemailer before account activation.
- **Distributed Redis Session Store:** Replaces default in-memory sessions with `connect-redis` + `ioredis`, keeping sessions persistent across server restarts, app crashes, and horizontal scale-outs.
- **Ephemeral Registrations:** Unverified signups are held strictly in Redis with automatic 10-minute TTL expiration, preventing junk or unverified user data from cluttering the MySQL database.
- **Brute-Force & Flood Protection:** Custom Redis-backed rate limiting per email and IP address to throttle rapid login attempts and OTP resend abuse (max 3 resends / 15 mins).

### 🏨 Property, Inventory & Cloud Media *(In Progress)*
- **Cloudinary CDN Integration:** Efficient, multi-photo file handling buffered in memory through Multer and streamed directly to Cloudinary.
- **Granular Room Inventories:** Differentiates hotel properties from distinct room tiers (Standard, Deluxe, Penthouse), each with unique capacities, prices, and amenities.
- **Automated Transactional Emails:** Pre-built responsive HTML email templates for OTP verification, booking confirmations, cancellation receipts, and password resets.

---

## 🏛️ System Architecture & Flows

### User Sign-Up & Redis OTP Verification Flow

```
[User Submits Form]
        │
        ▼
[Check Existing Email in MySQL] ──► (Exists) ──► [Flash Error & Redirect]
        │
     (New User)
        ▼
[Hash Password (Bcrypt) & Generate 6-digit OTP]
        │
        ▼
[Cache SHA-256(OTP) & Pending Data in Redis (TTL: 600s)]
        │
        ▼
[Dispatch HTML Email via Nodemailer] ──► [Render OTP Verification Screen]
        │
        ▼
[User Submits OTP] ──► [Compare SHA-256 Hashes]
        │
     (Valid)
        ▼
[Commit User to MySQL USERS Table] ──► [Passport req.login()] ──► [Redirect to Home]
```

---

## 🛡️ Security Engineering

- **HTTP Protection Headers (`helmet`):** Secures HTTP response headers to protect against Clickjacking, MIME-type sniffing, cross-site scripting (XSS), and disables `X-Powered-By: Express`.
- **Hashed Ephemeral OTPs:** OTPs are SHA-256 hashed before saving into Redis, ensuring zero plaintext verification secrets exist in Redis memory.
- **Password Salting:** High-entropy password hashing using `bcrypt` with a cost factor of 12.
- **SQL Injection Immunization:** 100% prepared parameterized queries via `mysql2/promise` execution protocol (`db.execute`).
- **Insecure Direct Object Reference (IDOR) Mitigation:** All private resource mutations (bookings, listings, profile updates) strictly check ownership against session context (`req.user.ID`).
- **Hardened Cookies:** Session cookies configured with `httpOnly: true` (prevents client-side script theft) and environment-aware `secure: true` for HTTPS in production.

---

## 🗄️ Database Schema (11 Relational Tables)

All primary keys throughout the database are non-sequential **UUIDv4** strings, preventing enumeration and ID scraping attacks:

| Table | Description | Key Columns / Constraints |
|---|---|---|
| `USERS` | Stores guest, host, and admin profiles. | `ID` (PK, UUID), `EMAIL` (Unique), `PASSWORD`, `ROLE` (`guest`, `host`, `admin`), `GOOGLE_ID`, `IS_VERIFIED` |
| `HOTELS` | Hotel properties listed on the platform. | `ID` (PK, UUID), `HOST_ID` (FK -> `USERS`), `NAME`, `DESCRIPTION`, `ADDRESS`, `CITY`, `STATE`, `COUNTRY` |
| `HOTEL_IMAGES` | High-res photo galleries for hotels. | `ID` (PK, UUID), `HOTEL_ID` (FK -> `HOTELS`), `IMAGE_URL`, `IS_PRIMARY` |
| `ROOMS` | Room categories, capacities, and pricing. | `ID` (PK, UUID), `HOTEL_ID` (FK -> `HOTELS`), `CATEGORY_NAME`, `BASE_PRICE`, `CAPACITY`, `TOTAL_ROOMS` |
| `ROOM_IMAGES` | Photo galleries dedicated to room categories. | `ID` (PK, UUID), `ROOM_ID` (FK -> `ROOMS`), `IMAGE_URL` |
| `BOOKINGS` | Reservation records and date intervals. | `ID` (PK, UUID), `USER_ID` (FK -> `USERS`), `ROOM_ID` (FK -> `ROOMS`), `HOTEL_ID` (FK -> `HOTELS`), `CHECK_IN`, `CHECK_OUT`, `STATUS` |
| `PAYMENTS` | Transaction records for reservations. | `ID` (PK, UUID), `BOOKING_ID` (FK -> `BOOKINGS`), `AMOUNT`, `PAYMENT_METHOD`, `STATUS`, `TRANSACTION_ID` |
| `REVIEW` | Verified guest ratings and written reviews. | `ID` (PK, UUID), `USER_ID` (FK -> `USERS`), `HOTEL_ID` (FK -> `HOTELS`), `RATING` (1-5), `COMMENT` |
| `AMENITIES` | Master catalog of facilities. | `ID` (PK, UUID), `NAME` (Unique, e.g., 'Free Wi-Fi', 'Swimming Pool', 'Air Conditioning') |
| `HOTEL_AMENITIES` | Many-to-Many junction for hotel amenities. | Composite PK (`HOTEL_ID`, `AMENITY_ID`), FKs -> `HOTELS`, `AMENITIES` |
| `ROOM_AMENITIES` | Many-to-Many junction for room amenities. | Composite PK (`ROOM_ID`, `AMENITY_ID`), FKs -> `ROOMS`, `AMENITIES` |

---

## 🛠️ Tech Stack

### Core Technologies
- **Runtime:** Node.js (v20+ LTS, ES Modules `"type": "module"`)
- **Backend Framework:** Express.js 5.x
- **Primary Database:** MySQL 8.x via `mysql2/promise` connection pool
- **Cache & Memory Store:** Redis 6+ via `ioredis`
- **View Engine:** EJS with `express-ejs-layouts`

### Libraries & Utilities
- **Authentication:** `passport`, `passport-local`, `passport-google-oauth20`
- **Security & Sessions:** `express-session`, `connect-redis`, `helmet`, `bcrypt`, `connect-flash`, `express-rate-limit`
- **Validation:** `zod`
- **Media & File Handling:** `multer` (memory storage), `cloudinary`
- **Mailing:** `nodemailer` (Gmail SMTP with custom HTML templates)
- **Identifiers:** `uuid` (v4)

---

## 📂 Folder Structure

```
Stayora/
├── config/
│   ├── cloudinary.js       # Cloudinary SDK client configuration
│   ├── db.js               # MySQL connection pool & connection lifecycle
│   ├── multer.js           # Multer in-memory upload handler & size limits
│   ├── passport.js         # Local & Google OAuth strategy configurations
│   ├── redis.js            # ioredis client connection & error listeners
│   └── session.js          # Express session configuration backed by RedisStore
├── public/
│   └── css/                # Global styles, navbar, and footer rules
├── routes/
│   └── authentication.js   # Login, signup, OTP, Google OAuth & logout routes
├── utils/
│   └── mailer.js           # Branded transactional email templates (OTP, Booking, etc.)
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Master boilerplate with header, alerts, and footer
│   ├── partials/
│   │   ├── navbar.ejs      # Dynamic navbar responding to user session state
│   │   └── footer.ejs      # Standard responsive footer with branding
│   ├── enter-otp.ejs       # OTP verification view with 60s resend countdown
│   ├── forgot-password.ejs # Password reset initiation form
│   ├── index.ejs           # Landing page
│   ├── login.ejs           # Sign-in form with Google OAuth button
│   └── signup.ejs          # Registration form with Google OAuth button
├── app.js                  # Application server entrypoint and middleware pipeline
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed locally or accessible via cloud services:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [MySQL Server](https://www.mysql.com/) (v8.0+)
- [Redis Server](https://redis.io/) (Local or managed instance like Upstash/Aiven)
- [Cloudinary Account](https://cloudinary.com/) (For photo uploads)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Stayora.git
cd Stayora
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
# Application Server
PORT=8080
NODE_ENV=development
SESSION_SECRET=your_super_secret_session_key

# MySQL Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=STAYORA

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/authenticate/google/callback

# Nodemailer Service (Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Setup Database
Start your MySQL server and create the database:
```sql
CREATE DATABASE STAYORA;
```
Execute the DDL schema queries to generate all 11 tables.

### 5. Start the application
```bash
# Start standard Node server
node app.js

# Or start with live reload (if nodemon is installed)
npx nodemon app.js
```
Visit **`http://localhost:8080`** in your browser.

---

## 🚦 API & Route Specifications

### Authentication Routes (`/authenticate`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/authenticate/login` | Renders user login interface. |
| `POST` | `/authenticate/login/verify` | Authenticates credentials with local strategy & rate-limiting. |
| `GET` | `/authenticate/signup` | Renders registration form. |
| `POST` | `/authenticate/signup/add` | Validates input, hashes OTP, sets Redis cache, and emails code. |
| `POST` | `/authenticate/signup/verify-otp` | Compares OTP hash, creates user in MySQL, and establishes session. |
| `POST` | `/authenticate/signup/resend-otp` | Re-generates OTP with a 15-minute abuse limit (max 3 resends). |
| `GET` | `/authenticate/google` | Triggers Google OAuth 2.0 consent screen. |
| `GET` | `/authenticate/google/callback` | Callback endpoint for Google identity exchange. |
| `GET` | `/authenticate/forgot-password` | Renders password recovery form. |
| `GET` | `/authenticate/logout` | Terminates Passport session and clears cookies. |

---

## 📈 Project Roadmap

- [x] Comprehensive 11-table relational database architecture with UUIDv4 primary keys
- [x] Redis-backed session store using `connect-redis` + `ioredis`
- [x] Local email/password authentication with 12-round `bcrypt` salting
- [x] Google OAuth 2.0 integration
- [x] Two-factor email OTP account verification with SHA-256 hashing
- [x] Security hardening: `helmet` HTTP headers, rate limiters, and `httpOnly` cookies
- [ ] Hotel property listing, editing, and host dashboard routes
- [ ] Room category inventory management with Cloudinary multi-image uploads
- [ ] Real-time date-range availability check engine (`CHECK_IN` / `CHECK_OUT`)
- [ ] Payment gateway integration (Stripe / Razorpay)
- [ ] Verified-stay review and rating system
- [ ] Admin management portal and host verification workflow
- [ ] Docker containerization for one-command deployment

---

<div align="center">

  <p>
    <strong>Stayora</strong> - Your Stay, Simplified.
  </p>

  <p>
    © 2026 Stayora. All rights reserved.
  </p>

  <p>
    <strong>Founder and CEO</strong> - <a href="https://github.com/PriyanshuSingh-Dev" target="_blank"><strong>Priyanshu Singh</strong></a>
  </p>

</div>
