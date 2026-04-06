# Finance Backend

## Description

The Finance Backend is a robust and scalable backend application built using Node.js, Express, and MongoDB. It provides APIs for user authentication, role-based access control, user management, and financial record management. The application also includes dashboard APIs for insightful financial analytics, ensuring a seamless experience for managing and analyzing financial data.

## Tech Stack

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing financial and user data.
- **JWT**: JSON Web Tokens for secure user authentication.
- **express-validator**: Middleware for validating and sanitizing user input.

## Features

- **User Authentication**: Secure login and token-based authentication using JWT.
- **Role-Based Access Control**: Viewer, Analyst, and Admin roles with specific permissions.
- **User Management**: APIs to create, update, and retrieve user details.
- **Financial Records Management**: CRUD operations for financial records.
- **Filtering**: Filter records by date, category, and type.
- **Dashboard Analytics**:
  - Total income
  - Total expenses
  - Net balance
  - Category-wise totals
  - Recent activity
  - Monthly trends
- **Validation**: Input validation using express-validator.
- **Error Handling**: Comprehensive error handling with appropriate status codes.

## API Endpoints

### User Management

- `POST /users` - Create a new user.
- `GET /users` - Retrieve all users.
- `PATCH /users/:id` - Update user details.

### Authentication

- `POST /user/login` - User login.
- `POST /users` - User registration.

### Financial Records

- `POST /records` - Create a financial record.
- `GET /records` - Retrieve financial records with filtering options.
- `PATCH /records/:id` - Update a financial record.
- `DELETE /records/:id` - Delete a financial record.

### Dashboard

- `GET /dashboard/summary` - Get financial summary (income, expenses, net balance).
- `GET /dashboard/trends` - Get monthly financial trends.
- `GET /dashboard/recent` - Get recent financial activity.
- `GET /dashboard/categories` - Get category wise totals

## Roles & Permissions

- **Viewer**: Can view records and dashboard data
- **Analyst**: Can view records and access insights
- **Admin**: Full access (manage users and records)

## Authentication

All protected routes require a JWT token in headers:

Authorization: Bearer <your_token>

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd finance-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## How to Run

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the APIs at `http://localhost:3000`.

## Example Requests

### Create a Financial Record

**Request:**

```json
POST /records
{
  "amount": 50,
  "type": "expense",
  "category": "Food",
  "date": "2026-04-06",
  "notes": "Grocery shopping"
}
```

**Response:**

```json
{
  "message": "Record created successfully",
  "record": {
    "id": "12345",
    "title": "Grocery Shopping",
    "amount": 50,
    "type": "expense",
    "category": "Food",
    "date": "2026-04-06"
  }
}
```

## Deployment

The backend is deployed and accessible at the following URL:

[Finance Backend Deployment](https://finance-backend-ehgm.onrender.com/)
