# Initialization Guide

This guide will help you set up and run the User Management App.

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your PostgreSQL credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/user_management
# JWT_SECRET=your_jwt_secret_key_here

# Start the server (it will auto-create the users table)
npm run dev
```

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Database Setup

Before running the backend, make sure PostgreSQL is installed and running:

```bash
# Create a new database
createdb user_management
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## First Time Usage

1. Go to http://localhost:3000
2. Click "Register" to create an account
3. Fill in your details and submit
4. You'll be redirected to your profile page
5. View your profile information and logout when done

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL in .env is correct
- Ensure JWT_SECRET is set

### Frontend won't connect
- Check backend is running on port 5000
- Verify NEXT_PUBLIC_API_URL in frontend/.env.local (if needed)
- Clear browser cache and cookies

### Database errors
- Make sure the database exists: `createdb user_management`
- The users table will be created automatically when the backend starts
