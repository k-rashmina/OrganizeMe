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

## Project Setup

You will need node and npm installed globally on your machine.

### Clone OrganizeMe

Clone down the repository and switch to the OrganizeMe directory.

1. Install modules:
   switch to both orgme-frontend and orgme-backend, and install the npm packages using below command
   npm install

2. Set up environment variables:
   Create a .env file in the root of the orgme-backend folder and add the following:

MONGODB_URI = your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_jwt_secret_key

EMAIL_USER = your_email
EMAIL_PASS = your_email_app_password

3. Start development servers:
   Start both frontend and backend servers by typing below command
   npm start

4. Visit the app:
   http://localhost:5173/

## Screens

![Screenshot_24-12-2024_231215_localhost](https://github.com/user-attachments/assets/7a8365bf-5eb0-4489-9463-91e3c1f6f421)

![Screenshot_24-12-2024_231320_localhost](https://github.com/user-attachments/assets/3e4e66f1-8bd1-4f69-a2ae-93f53d078541)

![Screenshot_24-12-2024_231448_localhost](https://github.com/user-attachments/assets/8bd26846-351a-4210-81fd-f1b2b8ab1a66)

![Screenshot_24-12-2024_231519_localhost](https://github.com/user-attachments/assets/ef983a66-109d-437d-a0b6-efa1c441d31d)

![Screenshot_24-12-2024_231714_localhost](https://github.com/user-attachments/assets/b7553ef2-401a-4039-88af-b8fd646ddad0)