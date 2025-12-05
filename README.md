# User Management App

A full-stack user management application built with Next.js 15, React, TypeScript, Node.js/Express backend, and PostgreSQL database.

## Features

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ View User Profile
- ✅ Secure password hashing with bcryptjs
- ✅ Token-based authentication
- ✅ Responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios for API calls
- js-cookie for token management

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
user-management-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── authController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   └── migrations.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── register/
    │   │   ├── login/
    │   │   └── profile/
    │   ├── components/
    │   │   └── ProtectedRoute.tsx
    │   └── utils/
    │       ├── api.ts
    │       └── auth.ts
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    └── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your PostgreSQL credentials:
```
DATABASE_URL=postgresql://user:password@localhost:5432/user_management
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Create PostgreSQL database:
```bash
createdb user_management
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "first_name": "string (optional)",
    "last_name": "string (optional)"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- `GET /api/auth/profile` - Get user profile (requires JWT token)
  - Header: `Authorization: Bearer <token>`

## Usage

1. Navigate to `http://localhost:3000`
2. Click "Register" to create a new account
3. Fill in the registration form and submit
4. You'll be automatically logged in and redirected to your profile
5. View your profile information
6. Click "Logout" to logout

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/user_management
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local) - Optional
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## License

MIT
