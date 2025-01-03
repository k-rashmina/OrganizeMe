# OraganizeMe App

The Task Management System is a full-stack web application designed to help users efficiently manage and organize their daily tasks. It provides a simple and intuitive interface for creating, updating, deleting, and viewing tasks, allowing users to stay productive. The app includes user authentication features, task sorting by priority and due date, and an overview dashboard where users can track their progress. Built using React on the frontend and Node.js with Express on the backend, the system offers seamless user experience with a modern and responsive design.

###### _Version: 1.0.0_

## Features

- User registration and login.
- Password management functionality.
- Task management (Create, Read, Update, Delete tasks).
- Task filtering and sorting (by priority, due date).
- Dashboard view for listing current tasks.
- User profile page with current task overview.
- Search and filter tasks by status or priority.
- Responsive design and intuitive user interface.

---

## Technologies

**Frontend**:

- React.js
- React Router for navigation
- Axios for making API calls
- CSS Modules for styling

**Backend**:

- Node.js with Express.js
- MongoDB (Database)
- Mongoose for database interaction
- JSON Web Token (JWT) for authentication
- bcrypt for password hashing

**Others**:

- REST API
- Postman for API testing

---

## Version Details

1. Node - v20.17.0
2. NPM - 10.8.2
3. Other NPM Modules - The latest versions have been used in the semantic versioning format.

## Installation

1. Project Setup

You will need node and npm installed globally on your machine.

2. Clone OrganizeMe

Clone down the repository and switch to the OrganizeMe directory.

3. Install modules:
   switch to both orgme-frontend and orgme-backend, and install the npm packages using below command
   ```bash
   npm install

4. Set up environment variables:
   Create a .env file in the root of the orgme-backend folder and add the following:

   ```bash
   MONGODB_URI = your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   EMAIL_USER = your_email
   EMAIL_PASS = your_email_app_password
   FRONTEND_PORT = your_frontend_port_number

5. Start development servers:
   Start both frontend and backend servers by typing below command
   ```bash
   npm start

6. Visit the app:
   http://localhost:5173/

## Screens
![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20030951.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031035.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031115.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031137.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031226.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031254.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031334.png?raw=true)

![image alt](https://github.com/k-rashmina/OrganizeMe/blob/main/orgme-frontend/public/Screenshot%202024-12-25%20031415.png?raw=true)
