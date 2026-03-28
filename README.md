# JobSpheere (Job Opportunity Platform)

JobSpheere is a modern, full-stack web application designed to help users find their dream jobs with ease. It features a stunning user interface, MongoDB-backed user authentication, and live job data fetched and proxied from the public TheMuse API.

## Features

- **Modern UI/UX**: Beautifully designed hero section, dynamic search bars, and responsive complex flexbox layouts.
- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Live Job Listings**: Searches for jobs in real-time, pulling directly from TheMuse API through a custom backend proxy.
- **Advanced Filtering**: Filter jobs by location, job type, salary range, and experience level.
- **Save Jobs**: Easily bookmark your favorite jobs to access them later from the sidebar.

## Tech Stack

This project is built using the **MERN** stack:
- **MongoDB** & **Mongoose**: Database and object data modeling.
- **Express.js**: Backend web application framework.
- **React** (Vite): Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime environment.

## Project Structure

- `/backend` - Contains the Express.js server, MongoDB models, authentication middleware, and API routes.
- `/react` - Contains the Vite React frontend application.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally (or a MongoDB Atlas URI)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hanannur/Job-Opportunity.git
cd Job-Opportunity
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (if not already present):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/job-opp
JWT_SECRET=supersecretjwtkey123
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

### 3. Setup the Frontend

Open a new terminal window:
```bash
cd react
npm install
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Open the Application
Navigate to `http://localhost:5173` in your browser. The backend API is configured to run on `http://localhost:5000`.

## License
MIT License
