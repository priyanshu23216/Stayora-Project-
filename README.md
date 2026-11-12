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

<h2>📌 About The Project</h2>

<p>
  Stayora aims to connect guests with hotels through a
  centralized booking platform.
</p>

<p>
  Users will be able to explore hotel listings, view room
  details, check amenities, make reservations, and manage
  their bookings.
</p>

<p>
  The platform will support multiple user roles:
</p>

<ul>
  <li><strong>Guest:</strong> Explore hotels and book rooms.</li>
  <li><strong>Host:</strong> List and manage hotels and rooms.</li>
  <li><strong>Admin:</strong> Manage and monitor the platform.</li>
</ul>

<h2>🚧 Current Development Progress</h2>

<h3>Database Initialization - Completed</h3>

<p>
  The initial MySQL database architecture has been designed
  and initialized with 11 relational tables.
</p>

<h3>Database Structure</h3>

<table>
  <thead>
    <tr>
      <th>Table</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>USERS</code></td>
      <td>Stores guest, host, and admin information.</td>
    </tr>
    <tr>
      <td><code>HOTELS</code></td>
      <td>Stores hotel details and property information.</td>
    </tr>
    <tr>
      <td><code>HOTEL_IMAGES</code></td>
      <td>Stores multiple images associated with hotels.</td>
    </tr>
    <tr>
      <td><code>ROOMS</code></td>
      <td>Manages room categories, capacity, and pricing.</td>
    </tr>
    <tr>
      <td><code>ROOM_IMAGES</code></td>
      <td>Stores multiple images for room categories.</td>
    </tr>
    <tr>
      <td><code>BOOKINGS</code></td>
      <td>Stores guest reservations and booking details.</td>
    </tr>
    <tr>
      <td><code>REVIEW</code></td>
      <td>Stores guest reviews and ratings.</td>
    </tr>
    <tr>
      <td><code>AMENITIES</code></td>
      <td>Maintains a centralized amenities catalogue.</td>
    </tr>
    <tr>
      <td><code>HOTEL_AMENITIES</code></td>
      <td>Connects hotels with their amenities.</td>
    </tr>
    <tr>
      <td><code>ROOM_AMENITIES</code></td>
      <td>Connects room categories with their amenities.</td>
    </tr>
    <tr>
      <td><code>PAYMENTS</code></td>
      <td>Stores booking payment and transaction records.</td>
    </tr>
  </tbody>
</table>

<h3>Database Design Concepts Implemented</h3>

<ul>
  <li>Relational database architecture.</li>
  <li>Primary keys and foreign key relationships.</li>
  <li>One-to-many relationships.</li>
  <li>Many-to-many relationships using junction tables.</li>
  <li>Unique constraints and data integrity.</li>
  <li>ENUM and CHECK constraints.</li>
  <li>Timestamp defaults and automatic updates.</li>
  <li>Separate hotel and room image management.</li>
</ul>

<h2>🛠️ Technology Stack</h2>

<h3>Frontend</h3>

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black">
</p>

<h3>Backend</h3>

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white">
</p>

<h3>Database & Data Storage</h3>

<p>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white">
</p>

<h3>DevOps & Development Tools</h3>

<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white">
</p>

<h3>Additional Libraries & Tools</h3>

<ul>
  <li>MySQL2</li>
  <li>UUID</li>
  <li>Method Override</li>
  <li>Express Session</li>
  <li>Bcrypt</li>
  <li>Dotenv</li>
</ul>

<p>
  <em>
    Redis and Docker are planned integrations and have not
    yet been implemented in the current application.
  </em>
</p>

<h2>🗺️ Planned Features</h2>

<ul>
  <li>User registration, login, and authentication.</li>
  <li>Role-based access control.</li>
  <li>Hotel listing and management for hosts.</li>
  <li>Room category and inventory management.</li>
  <li>Multiple hotel and room image uploads.</li>
  <li>Hotel search and filtering.</li>
  <li>Hotel and room amenities management.</li>
  <li>Real-time room availability checking.</li>
  <li>Booking and reservation management.</li>
  <li>Payment gateway integration.</li>
  <li>Verified-stay reviews and ratings.</li>
  <li>Admin dashboard and hotel verification.</li>
  <li>Redis caching and performance optimization.</li>
  <li>Docker-based application deployment.</li>
</ul>

<h2>⚙️ Getting Started</h2>

<h3>1. Clone the repository</h3>

<pre><code>git clone YOUR_GITHUB_REPOSITORY_URL</code></pre>

<h3>2. Navigate to the project directory</h3>

<pre><code>cd Stayora</code></pre>

<h3>3. Install dependencies</h3>

<pre><code>npm install</code></pre>

<h3>4. Configure environment variables</h3>

<p>
  Create a <code>.env</code> file in the root directory:
</p>

<pre><code>DB_HOST=localhost
DB_USER=your_mysql_username
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

  <h3>Built with 💻 and ☕</h3>

  <p>
    © 2026 Stayora. All rights reserved.
  </p>

  <strong>Stayora - Your Stay, Simplified.</strong>

</div>
