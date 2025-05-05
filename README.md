 Rating System – FullStack Intern Coding Challenge

 Project Overview

This is a full-stack web application developed as part of the FullStack Intern Coding Challenge. The application enables users to sign up, log in, and rate various stores. It supports role-based access control, with different dashboards and permissions for Admin, Store Owner, and Normal User.

 Tech Stack

Frontend:** React.js, TypeScript, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)

 Features

- User Registration and Login
- Role-Based Dashboards:
  - **Admin:** Manage users, view ratings
  - **Store Owner:** View and manage ratings for their stores
  - **User:** Rate stores and leave comments
- JWT-based Authentication
- Secure and Protected Routes
- Responsive Frontend

## Folder Structure

![Screenshot 2025-05-05 100002](https://github.com/user-attachments/assets/76d5c6bc-e5e9-4867-a65f-e04786b5d0a4)


yaml
Copy
Edit

## Setup Instructions

### Prerequisites

- Node.js and npm
- PostgreSQL
- Git

---

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd rating-system-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root of the backend folder:

ini
Copy
Edit
PORT=5000
DATABASE_URL=postgresql://root:Y1012Jqkhkp@localhost:5432/rating_system_dev
JWT_SECRET=dc0c63e0e9640cefe72a657787677d83e551227bbd409125300d58a2f3d21d1ed37825434c2a5d66774f5d4f741802cd2ce5b60db5582b66a0e3d6d87a4a44e1
Start the backend server:

bash
Copy
Edit
npm run dev
Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd rating-system-frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend:

bash
Copy
Edit
npm start
API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login and receive token
GET	/api/stores	Get list of stores
POST	/api/ratings	Submit a rating

Database Schema
Refer to the database.sql file for table creation scripts and sample data.
