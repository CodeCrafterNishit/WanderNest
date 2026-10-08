# WanderNest 🏡

A full-stack accommodation listing web application inspired by modern property rental platforms. WanderNest allows users to explore properties, view detailed listings, manage their own properties, upload images, leave reviews, and interact with property locations through an interactive map.

The project was built to strengthen practical skills in **full-stack web development, REST APIs, authentication, database management, image handling, geolocation, validation, and deployment**.

## 🚀 Live Demo

**Live Application:**
https://wandernest-nnp4.onrender.com/listings

**GitHub Repository:**
https://github.com/CodeCrafterNishit/WanderNest

---

## ✨ Features

* 🔐 **User Authentication**

  * User registration and login
  * Session-based authentication using Passport.js
  * Protected routes and user authorization

* 🏠 **Property Listings**

  * Create, view, edit, and delete property listings
  * Detailed property pages
  * Property categories and information
  * Ownership-based access control

* 🖼️ **Image Uploads**

  * Upload property images using Cloudinary
  * Cloud-based image storage and management

* ⭐ **Reviews & Ratings**

  * Users can submit ratings and reviews
  * Users can manage their own reviews
  * Ratings displayed with property information

* 🗺️ **Interactive Maps**

  * Property locations displayed using Leaflet
  * Address-to-coordinate conversion using Nominatim
  * Interactive map markers

* 💰 **Dynamic Pricing**

  * Property pricing displayed dynamically
  * Optional tax calculation
  * Price breakdown for users

* 🛡️ **Validation & Security**

  * Server-side input validation using Joi
  * Authentication and authorization middleware
  * Protected CRUD operations
  * Secure session management

* 📱 **Responsive Interface**

  * Responsive layouts for different screen sizes
  * Bootstrap-based UI
  * Clean and user-friendly property browsing experience

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js
* REST APIs
* Passport.js
* Express Session

### Database

* MongoDB
* Mongoose

### Third-Party Services & Libraries

* Cloudinary — Image storage
* Leaflet — Interactive maps
* Nominatim — Geocoding
* Joi — Server-side validation
* EJS-Mate — EJS layout management

### Tools

* Git
* GitHub
* Render
* VS Code

---

## 🏗️ Project Architecture

WanderNest follows an MVC-inspired architecture that separates routes, business logic, database models, and views.

```text
WanderNest
│
├── controllers/       # Application and business logic
├── models/            # Mongoose database models
├── routes/            # Application routes
├── views/             # EJS templates
├── public/            # CSS, JavaScript and static assets
├── middleware/        # Authentication, authorization and validation
├── utils/             # Utility functions
├── init/              # Database initialization / seed data
│
├── app.js             # Application entry point
├── schema.js          # Joi validation schemas
├── cloudConfig.js     # Cloudinary configuration
└── package.json
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
EJS / Frontend
  │
  ▼
Express Routes
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Authorization
  └── Validation
  │
  ▼
Controllers
  │
  ▼
Mongoose Models
  │
  ▼
MongoDB
```

### Location Flow

```text
Property Address
       │
       ▼
   Nominatim
       │
       ▼
Latitude / Longitude
       │
       ▼
     Leaflet
       │
       ▼
Interactive Property Map
```

---

## 🔐 Authentication & Authorization

WanderNest uses **Passport.js** with session-based authentication.

Authenticated users can:

* Create property listings
* Edit their own listings
* Delete their own listings
* Add reviews
* Delete their own reviews

Authorization middleware ensures users cannot modify resources that do not belong to them.

---

## 🗄️ Database

MongoDB is used as the primary database, with Mongoose providing schema definition and database interaction.

The application manages relationships between:

* Users
* Listings
* Reviews

This allows listings to reference their owners and reviews to reference both users and listings.

---

## ☁️ Image Management

Property images are uploaded and stored using **Cloudinary** rather than being stored directly on the application server.

This provides:

* Cloud-based image storage
* Reliable image access
* Reduced server-side storage requirements
* Better support for deployment environments

---

## 🗺️ Geolocation

WanderNest uses **Nominatim** for geocoding property addresses into geographic coordinates.

These coordinates are then passed to **Leaflet** to display the property's location on an interactive map.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas account
* Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/CodeCrafterNishit/WanderNest.git
```

### 2. Navigate to the project

```bash
cd WanderNest
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add the required environment variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Start the application

```bash
node app.js
```

For development with Nodemon:

```bash
nodemon app.js
```

The application will be available at:

```text
http://localhost:8080
```

---

## 🔒 Environment Variables

Sensitive credentials should never be committed to GitHub.

| Variable           | Description               |
| ------------------ | ------------------------- |
| `ATLASDB_URL`      | MongoDB connection string |
| `SECRET`           | Session secret            |
| `CLOUD_NAME`       | Cloudinary cloud name     |
| `CLOUD_API_KEY`    | Cloudinary API key        |
| `CLOUD_API_SECRET` | Cloudinary API secret     |

Make sure `.env` is included in `.gitignore`.

---

## 🚀 Deployment

The application is deployed on **Render** with:

* MongoDB Atlas for database management
* Cloudinary for image storage
* Render for application hosting
* Environment variables for sensitive configuration

**Live Demo:**
https://wandernest-nnp4.onrender.com/listings

---

## 🧠 Key Learnings

Building WanderNest provided practical experience with the complete lifecycle of a full-stack web application.

### Technical Learning

* Designing RESTful routes and APIs
* Structuring an Express application
* Implementing MVC architecture
* Working with MongoDB and Mongoose
* Implementing authentication and authorization
* Managing user sessions
* Validating server-side data using Joi
* Handling image uploads with Cloudinary
* Integrating third-party APIs
* Implementing geolocation and interactive maps
* Managing relationships between database models
* Deploying a full-stack application

### Development Learning

The project also helped improve my understanding of:

* Debugging frontend and backend issues
* Designing application flow before implementation
* Handling edge cases and validation
* Managing environment variables
* Structuring maintainable backend code
* Connecting multiple services into a single application

---

## 🔮 Future Improvements

Potential improvements for future versions include:

* Advanced property search and filtering
* Booking and reservation functionality
* Payment integration
* Wishlist functionality
* Email notifications
* User booking dashboard
* React-based frontend
* Improved notification system

---

## 👨‍💻 Author

### Nishit Jain

BCA Student | Full-Stack Web Development & Software Development

**GitHub:**
https://github.com/CodeCrafterNishit

**LinkedIn:**
https://www.linkedin.com/in/nishitjaindev/

---

## ⭐ Project

If you found WanderNest useful or interesting, consider giving the repository a ⭐.

**WanderNest — Explore. Stay. Experience.**
