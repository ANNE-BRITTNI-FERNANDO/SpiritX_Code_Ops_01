# SecureConnect

SecureConnect is a web application that implements secure user authentication using React for the frontend and Node.js with Express for the backend.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js and npm
- XAMPP (for MySQL database)
- Web browser

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd secureconnect
```

2. Install dependencies:
```bash
npm install
npm install express bcryptjs jsonwebtoken cors mysql2
```

## Database Setup

1. Start XAMPP and ensure MySQL service is running
2. Open your web browser and navigate to http://localhost/phpmyadmin
3. Log in with:
   - Username: root
   - Password: (leave empty)
4. To set up the database:
   - Click on 'Import' in the top menu
   - Choose the file from `src/config/schema.sql`
   - Click 'Go' to execute the SQL commands

This will create:
- The 'secureconnect' database
- 'users' table for user authentication
- 'sessions' table for managing user sessions

## Database Configuration

The database connection is configured in `src/config/db.js` with the following settings:
- Host: localhost
- Port: 3306
- User: root
- Password: (empty)
- Database: secureconnect

## Running the Application

1. Start the backend server:
```bash
node server.js
```
The server will run on http://localhost:3001

2. In a new terminal, start the React frontend:
```bash
npm start
```
The application will open in your browser at http://localhost:3000

## Features

### Core Features
- User registration with secure password hashing
- User login with JWT authentication
- Session management
- Protected routes

### Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Session management for secure user sessions
- Protected API endpoints
- SQL injection prevention through prepared statements

## Project Structure

```
secureconnect/
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── config/
│   │   ├── db.js
│   │   └── schema.sql
│   └── App.js
└── server.js
```

## Assumptions

1. The application assumes XAMPP is used for the MySQL database
2. Default MySQL credentials (root with no password) are used
3. The application runs on default ports (3000 for React, 3001 for backend)
4. Users have basic knowledge of React and Node.js

## Development Notes

- The project uses React 18 for the frontend
- Express.js is used for the backend API
- MySQL is used as the database through mysql2 package
- JWT is used for authentication tokens
- bcrypt is used for password hashing
