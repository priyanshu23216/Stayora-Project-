<div align="center">

  <h1>🏨 Stayora</h1>

  <h3>A Modern Hotel Booking Platform</h3>

  <p>
    Discover hotels, explore rooms, and book your next stay.
  </p>

  <img src="https://img.shields.io/badge/Project-Under%20Development-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Database-MySQL-blue?style=for-the-badge">

  <br><br>

  <p>
    <strong>Stayora</strong> is a hotel booking web application
    currently under development, designed to provide users
    with a convenient platform to discover hotels, explore
    room categories, and manage their reservations.
  </p>

  <p>
    The project focuses on backend engineering, relational
    database design, authentication, booking management,
    and building scalable full-stack web applications.
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
PORT=8080</code></pre>

<h3>5. Initialize the database</h3>

<p>
  Start your MySQL server and create the
  <code>STAYORA</code> database.
  Execute the database schema queries to initialize
  the required tables.
</p>

<h3>6. Start the application</h3>

<pre><code>node app.js</code></pre>

<p>
  Open <code>http://localhost:8080</code> in your browser.
</p>

<h2>📂 Project Goals</h2>

<ul>
  <li>Build a complete hotel booking application.</li>
  <li>Strengthen backend development fundamentals.</li>
  <li>Understand relational database design and optimization.</li>
  <li>Implement secure authentication and authorization.</li>
  <li>Develop reliable booking and payment workflows.</li>
  <li>Explore caching, containerization, and deployment.</li>
</ul>

<h2>📈 Project Status</h2>

<p>
  <strong>Current Phase:</strong> Database Design Completed.
</p>

<p>
  <strong>Next Phase:</strong> Backend Architecture and
  Authentication Implementation.
</p>

<p>
  Stayora is actively being developed, and additional
  features will be introduced progressively.
</p>

---

<div align="center">

  <h3>Built with 💻 and ☕</h3>

  <p>
    Learning, building, debugging, and improving —
    one feature at a time.
  </p>

  <strong>Stayora - Your Stay, Simplified.</strong>

</div>
