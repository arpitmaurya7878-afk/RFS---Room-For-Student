# RFS - Room For Student

A full-stack web application where property owners can list rooms for rent and students can browse available rooms, contact owners, and chat in real time.

## Overview

This project helps connect room owners with students looking for affordable accommodation. The platform includes listing management, room search, user authentication, and chat features.

## Features

- User registration and login
- Room listing creation and management
- Room discovery for students
- Owner-student communication via chat
- Booking-related APIs and flows
- Secure authentication using JWT and cookies
- Cloudinary-based image uploads
- Responsive frontend built with Vite and Tailwind CSS

## Tech Stack

### Frontend
- Preact
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Cloudinary
- Cookie parser
- CORS
- Nodemon

## Repository Structure

```text
RFS---Room-For-Student/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── public/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance or MongoDB Atlas connection
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with variables similar to:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend app will run in development mode and can be accessed in the browser using the Vite local URL.

## Default Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Notes

- The backend is configured as an ES module project (`"type": "module"`).
- Static assets and uploads are handled using Cloudinary.
- The app is designed for room rental matching between owners and students.

## License

This project is currently unlicensed unless otherwise stated by the repository owner.

## Project Status

This repository is a working full-stack project for room listing and communication between room owners and tenants/students.
