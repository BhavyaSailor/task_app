# Task Management System

A full-stack Task Management System built with the MERN stack. The application provides secure JWT-based authentication, role-based access control (RBAC), task management APIs, input validation, API versioning, logging, and interactive API documentation using Swagger.

## Features

### Authentication & Authorization

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes
* Role-Based Access Control (User/Admin)

### Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task
* Users can access only their own tasks
* Admin can view all tasks

### Admin Features

* View all registered users
* View all tasks
* Access restricted using role middleware

### API Features

* RESTful API Design
* API Versioning (`/api/v1`)
* Input Validation using express-validator
* Centralized Error Handling
* Request Logging using Morgan
* Swagger API Documentation

### Database

* MongoDB with Mongoose ODM

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator
* Morgan
* Swagger

### Frontend

* React.js
* Axios
* React Router

---

## Project Structure

backend/

├── config/

│ ├── db.js

│ └── swagger.js

├── controllers/

├── middleware/

│ ├── auth.middleware.js

│ ├── role.middleware.js

│ ├── validate.middleware.js

│ └── error.middleware.js

├── models/

│ ├── user.models.js

│ └── task.models.js

├── routes/

│ ├── auth.routes.js

│ └── task.routes.js

├── validators/

│ ├── auth.validator.js

│ └── task.validator.js

├── server.js

└── .env

frontend/

├── src/

├── components/

├── pages/

└── services/

---

## API Versioning

All APIs are versioned using URL-based versioning.

Example:

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/tasks

This allows future versions (v2, v3, etc.) without breaking existing clients.

---

## Authentication Flow

1. User registers.
2. Password is hashed using bcrypt.
3. User logs in.
4. JWT token is generated.
5. Token is sent in Authorization header.

Authorization: Bearer <JWT_TOKEN>

---

## Role-Based Access Control

### User

* Create tasks
* View own tasks
* Update own tasks
* Delete own tasks

### Admin

* View all users
* View all tasks
* Manage application resources

---

## API Endpoints

### Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

### Tasks

POST /api/v1/tasks

GET /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id

### Admin

GET /api/v1/tasks/allTasks

GET /api/v1/tasks/allUsers

---

## Swagger Documentation

Interactive API documentation is available at:

http://localhost:5000/api-docs

Swagger provides:

* Endpoint information
* Request body examples
* Response formats
* Authentication testing

---

## Logging

Morgan middleware is used to log:

* HTTP Requests
* Status Codes
* Response Times

Example:

POST /api/v1/auth/login 200 123ms

---

## Environment Variables

Create a .env file inside the backend folder.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

---

## Installation

### Clone Repository

git clone <repository-url>

cd task-management-system

### Install Backend Dependencies

cd backend

npm install

### Install Frontend Dependencies

cd ../frontend

npm install

### Start Backend

cd backend

npm run dev

### Start Frontend

cd frontend

npm run dev

---

## Scalability Considerations

The application is designed with scalability in mind:

* Modular folder structure
* API versioning
* Stateless JWT authentication
* Role-based authorization middleware
* Centralized error handling
* Validation layer
* Logging support
* Easy integration with Redis caching
* Docker deployment ready
* Can be extended into microservices architecture

---

## Future Improvements

* Redis Caching
* Refresh Tokens
* Docker Containerization
* CI/CD Pipeline
* Unit & Integration Testing




