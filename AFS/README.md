# AFS - Infrastructure Management System

A full-stack application for managing client infrastructure, servers, and databases. Built with React (frontend) and Node.js/Express (backend), with MongoDB as the database.

## Project Structure

```
AFS/
├── backend/          # Node.js/Express API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   ├── db/          # Database connection
│   └── scripts/     # Utility scripts
└── src/             # React frontend
    ├── pages/       # Page components
    ├── components/  # Reusable components
    ├── contexts/    # React contexts
    └── lib/         # Utilities and API client
```

## Features

- **Super Admin Dashboard**: Manage clients, assign servers and databases
- **Client Management**: Add, edit, and delete clients with WordPress-like simplicity
- **Database Assignment**: Assign MongoDB, MySQL, or PostgreSQL databases to clients
- **Server Configuration**: Configure server specs (CPU, RAM, Storage) for each client
- **Authentication**: Secure JWT-based authentication

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The MongoDB connection string is already configured in `config.js`. If you need to change it, edit `backend/config.js`.

4. Initialize the super admin user:
```bash
npm run init-admin
```

This creates a super admin with:
- **Email**: amenityforge@gmail.com
- **Password**: AmenityForge123

5. Start the backend server:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional, defaults to localhost:5000):
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## Usage

### Super Admin Login

1. Navigate to `http://localhost:8080/login`
2. Login with:
   - Email: `amenityforge@gmail.com`
   - Password: `AmenityForge123`

### Adding Clients

1. After logging in as super admin, go to the "Clients" page
2. Click "Add Client" button
3. Fill in the form:
   - Company Name
   - Contact Email (this will create a client user account)
   - Plan Type (Starter, Professional, Enterprise)
   - Server Configuration (CPU, RAM, Storage, Hosting Provider)
   - Database Configuration (Type, Storage Size, Region, Connection String)
4. Click "Create Client"

### Editing Clients

1. Click the pencil icon next to any client in the clients table
2. Modify the fields as needed
3. Click "Save Changes"

### Assigning Database

When creating or editing a client, you can specify:
- Database Type (MongoDB Atlas, MySQL, PostgreSQL)
- Storage Size
- Region
- Connection String (optional, for existing databases)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Clients (Super Admin Only)
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client
- `POST /api/clients/:id/assign-database` - Assign database to client

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## Database

The application uses MongoDB Atlas. The connection string is configured in `backend/config.js`:
```
mongodb+srv://amenity:forge2025@cluster0.eiramxt.mongodb.net/AFS?appName=Cluster0
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with auto-reload
```

### Frontend Development
```bash
npm run dev  # Runs on port 8080
```

## Production Build

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
npm start
```

## Security Notes

- Change the JWT_SECRET in production
- Use environment variables for sensitive data
- Implement rate limiting in production
- Add HTTPS in production
- Consider adding input validation and sanitization

## License

This project is private and proprietary.
