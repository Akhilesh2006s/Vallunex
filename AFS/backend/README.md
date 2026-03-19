# AFS Backend API

Backend API for the AFS Infrastructure Management System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (or use the default MongoDB URI in config.js):
```
MONGO_URI=mongodb+srv://amenity:forge2025@cluster0.eiramxt.mongodb.net/AFS?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=development
```

3. Initialize the super admin user:
```bash
npm run init-admin
```

This will create a super admin with:
- Email: amenityforge@gmail.com
- Password: AmenityForge123

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

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

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens are valid for 7 days.
