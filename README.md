# Library Management System

## Overview
The Library Management System is a comprehensive application designed to manage book inventories, track borrower details, and handle transactions efficiently. This system allows users to manage books, borrow and return books, receive notifications for due dates, and generate various reports.

## Features
### User Management
- Login/Logout functionality for Admin and Users.
- Role-based access control: Admin, Librarian, and User roles.

### Book Inventory Management
- Add, update, delete, and search for books.
- Book details: ISBN, title, author, publisher, year, genre, quantity.
- Real-time availability status.
- Fetch book details using Google Books API.

### Borrowing System
- Checkout process for borrowing books.
- Return process including due dates and late fees calculation.
- History tracking for each user's borrowed and returned books.

### Search and Recommendations
- Advanced search options (by title, author, genre, etc.).
- Book recommendations based on user history or popular trends.

### Notifications and Alerts
- Email or SMS notifications for due dates, new arrivals, etc.
- Alerts for overdue books and outstanding fees.

### Reporting
- Generate reports on book usage, overdue items, user activity, etc.
- Dashboard for admins and librarians to see real-time statistics.

## Setup and Installation
### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd LibraryManagementSystem
    ```

2. Install server dependencies:
    ```sh
    cd server
    npm install
    ```

3. Set up the environment variables:
    Create a `.env` file in the `server` directory and add the following:
    ```env
    PORT=4000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

4. Start the server:
    ```sh
    npm start
    ```

### API Endpoints
#### Authentication
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login for existing users.

#### Users
- `GET /api/users`: Get all users (Admin and Librarian access only).

#### Borrowing
- `POST /api/borrow`: Borrow a book.

## Project Structure
LibraryManagementSystem
├── server
│ ├── config
│ │ └── database.js
│ ├── controllers
│ │ ├── Auth.js
│ │ ├── borrowController.js
│ │ └── userController.js
│ ├── middleware
│ │ └── auth.js
│ ├── models
│ │ ├── Account.js
│ │ ├── Book.js
│ │ ├── LibraryDatabase.js
│ │ └── User.js
│ ├── routes
│ │ ├── Auth.js
│ │ ├── Borrow.js
│ │ └── user.js
│ ├── .env
│ ├── .gitignore
│ ├── index.js
│ ├── package-lock.json
│ └── package.json
├── README.md


## Usage
- Use Postman or any other API testing tool to test the API endpoints.
- Ensure the server is running and the database is connected.

## Contribution
Contributions are welcome. Please fork the repository and create a pull request with detailed comments.

## License
This project is licensed under the MIT License.

## Contact
- **Aditya Uttarwar** - adityauttarwar29@gmail.com
- **Hemil Dudhat** - hemildudhat36@gmail.com
- **Rajat Agrawal** - agrawalarajat357@gmail.com
- **Siddharth Rajesh Jiyani** - sidjiyani2003@gmail.com

Powered by Odoo Combat - Final Round
