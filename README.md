<div align="center">

  <h1>🏨 Stayora</h1>

  <h3>A Modern, Resilient Hotel & Hospitality Booking Platform</h3>

  <p>
    Discover unique hotels, explore room categories, and book your next stay seamlessly.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-In%20Active%20Development-orange?style=for-the-badge">
    <img src="https://img.shields.io/badge/Node.js-20%2B-green?style=for-the-badge&logo=node.js">
    <img src="https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express">
    <img src="https://img.shields.io/badge/MySQL-8.x-blue?style=for-the-badge&logo=mysql">
    <img src="https://img.shields.io/badge/Redis-6.x-red?style=for-the-badge&logo=redis">
    <img src="https://img.shields.io/badge/Validation-Zod-3E67B1?style=for-the-badge&logo=zod">
  </p>

  <p>
    <strong>Stayora</strong> is a production-focused, full-stack hospitality & hotel booking platform built with an emphasis on backend engineering, data consistency, high-security authentication, and system scalability. Featuring an 11-table relational database architecture, distributed in-memory caching with Redis, enterprise-grade schema validation via Zod & Regex, social authentication, and transactional email automation.
  </p>

</div>

---

## 📌 Architectural Highlights

- **Relational Integrity:** 11-table MySQL schema with foreign keys, junction tables, and strict constraints for users, hotels, rooms, reviews, bookings, and amenities.
- **Enterprise Input Validation:** End-to-end schema validation powered by **Zod** and granular **Regular Expressions (Regex)** for password complexity (minimum 8 characters, capital & lowercase letters, numbers, and special characters) and email sanitization.
- **Session & Caching Layer:** Distributed session store and temporary token caching using `ioredis` and `connect-redis` with automatic TTL (Time-To-Live) expiration.
- **Robust Authentication:** Multi-layered auth pipeline supporting:
  - Local credentials with 12-round `bcrypt` salting.
  - Google OAuth 2.0 via Passport.js.
  - Cryptographic password recovery and email OTP flows.
- **Transactional Email Automation:** Dynamic notifications (welcome emails, booking confirmations, cancellation notices, and password reset flows) using `nodemailer`.
- **Media Management:** Cloudinary CDN integration for multi-image uploads for hotel properties and individual room categories.
- **Security Hardening:** Layered defense using `helmet` HTTP headers, `express-rate-limit` against brute-force attacks, and `httpOnly` secure cookies.

---

## 🚧 Database Architecture (11 Relational Tables)

| Table | Purpose |
|---|---|
| `USERS` | Stores guests, hosts, and administrator credentials and profiles. |
| `HOTELS` | Stores property descriptions, locations, and host associations. |
| `HOTEL_IMAGES` | Multi-image support for hotel properties. |
| `ROOMS` | Manages room tiers, inventory count, capacity, and nightly pricing. |
| `ROOM_IMAGES` | Multiple high-resolution images for specific room categories. |
| `BOOKINGS` | Reservation lifecycles with check-in/out dates and booking states. |
| `REVIEW` | Verified guest ratings, reviews, and feedback. |
| `AMENITIES` | Centralized master catalogue of amenities (WiFi, Pool, AC, etc.). |
| `HOTEL_AMENITIES` | Junction table mapping amenities to specific hotel properties. |
| `ROOM_AMENITIES` | Junction table mapping amenities to individual room categories. |
| `PAYMENTS` | Transaction records, payment statuses, and gateway references. |

---

## 🛠️ Technology Stack

### Frontend
- **Templating:** EJS (Embedded JavaScript) with `express-ejs-layouts`
- **Styling:** Custom CSS3 with Airbnb-inspired hospitality design tokens (Plus Jakarta Sans)
- **Client Scripts:** Vanilla JavaScript (ES6+) for interactive UI components

### Backend
- **Runtime:** Node.js (v20+)
- **Framework:** Express.js (v5.x)
- **Validation:** **Zod** schema validation + **Regex** pattern matching
- **Authentication:** Passport.js (`passport-local`, `passport-google-oauth20`), `bcrypt`
- **Session Management:** `express-session`, `connect-redis`, `ioredis`
- **Security:** `helmet`, `express-rate-limit`
- **File Uploads:** `multer`, `cloudinary`
- **Mailing:** `nodemailer`

### Database & In-Memory Store
- **Relational DB:** MySQL 8.x (`mysql2`)
- **Key-Value Cache:** Redis (`ioredis`)

---

## 📂 Project Directory Structure

```text
Stayora/
├── config/                 # Infrastructure and third-party service configs
│   ├── cloudinary.js       # Cloudinary SDK initialization
│   ├── db.js               # MySQL connection pool
│   ├── passport.js         # Passport authentication strategies (Local, Google)
│   ├── redis.js            # Redis client configuration
│   └── sendermail.js       # Nodemailer transporter and transactional email templates
├── utils/                  # Reusable utilities and validators
│   └── validation.js       # Zod schemas & Regex rules for signup, login, and reset
├── public/                 # Static assets
│   ├── css/                # Component styles (navbar.css, footer.css, etc.)
│   └── js/                 # Client-side scripts
├── routes/                 # Express route handlers
│   ├── auth.js             # Authentication routes (login, signup, OAuth, reset)
│   ├── listings.js         # Hotel & room listing management
│   └── bookings.js         # Reservation lifecycle routes
├── views/                  # EJS templates
│   ├── layouts/            # Master layout (boilerplate.ejs)
│   ├── partials/           # Shared components (navbar.ejs, footer.ejs)
│   ├── forgot-password.ejs # Password recovery interface
│   ├── enter-otp.ejs       # Verification view
│   ├── login.ejs           # Sign-in view
│   └── signup.ejs          # Registration view
├── app.js                  # Application server entrypoint and middleware pipeline
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher)
- [MySQL Server](https://www.mysql.com/) (v8.0+)
- [Redis Server](https://redis.io/) (Local or cloud-hosted)

### 1. Clone the repository
```bash
git clone https://github.com/priyanshu23216/stayora.git
cd stayora
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
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

### 4. Run the Application
```bash
# Using nodemon for hot-reloading
npx nodemon app.js

# Or standard Node
node app.js
```
Open **`http://localhost:8080`** in your browser.

---

## 🚦 API & Route Specifications

### Authentication & Account Recovery (`/authenticate`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/authenticate/login` | Renders user login interface. |
| `POST` | `/authenticate/login/verify` | Authenticates credentials with local strategy & rate-limiting. |
| `GET` | `/authenticate/signup` | Renders registration form with Zod/Regex criteria. |
| `POST` | `/authenticate/signup/add` | Validates input via Zod schema, sends OTP, and caches state in Redis. |
| `POST` | `/authenticate/signup/verify-otp` | Compares OTP, creates user in MySQL, and establishes session. |
| `GET` | `/authenticate/google` | Triggers Google OAuth 2.0 consent screen. |
| `GET` | `/authenticate/google/callback` | Callback endpoint for Google identity exchange. |
| `GET` | `/authenticate/forgot-password` | Renders password recovery form. |
| `POST` | `/authenticate/forgot-password` | Generates secure cryptographic reset token and dispatches email. |
| `GET` | `/authenticate/logout` | Terminates Passport session and clears cookies. |

---

## 📈 Project Roadmap

- [x] Comprehensive 11-table relational database architecture with foreign keys
- [x] Redis-backed session store using `connect-redis` + `ioredis`
- [x] Local email/password authentication with 12-round `bcrypt` salting
- [x] Google OAuth 2.0 integration
- [x] Enterprise input validation using **Zod** and strict **Regex** patterns
- [x] Security hardening: `helmet` HTTP headers, rate limiters, and `httpOnly` cookies
- [x] Transactional email automation using `nodemailer`
- [ ] Responsive Airbnb-style navigation bar & global footer
- [ ] Hotel property listing, editing, and host dashboard routes
- [ ] Room category inventory management with Cloudinary multi-image uploads
- [ ] Real-time date-range availability check engine (`CHECK_IN` / `CHECK_OUT`)
- [ ] Payment gateway integration (Stripe / Razorpay)
- [ ] Verified-stay review and rating system
- [ ] Admin management portal and host verification workflow

---

<div align="center">

  <p>
    <strong>Stayora</strong> - Your Stay, Simplified.
  </p>

  <p>
    © 2026 Stayora. All rights reserved.
  </p>

  <p>
    <strong>Founder and Developer</strong> - <a href="https://github.com/priyanshu23216" target="_blank"><strong>Priyanshu Singh</strong></a>
  </p>

</div>
