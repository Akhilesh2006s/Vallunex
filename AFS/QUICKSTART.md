# Quick Start Guide

## Step 1: Start the Backend

Open a terminal and run:
```bash
cd backend
npm install
npm run init-admin
npm run dev
```

The backend will start on `http://localhost:5000`

## Step 2: Start the Frontend

Open another terminal and run:
```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:8080`

## Step 3: Login

1. Go to `http://localhost:8080/login`
2. Use these credentials:
   - **Email**: amenityforge@gmail.com
   - **Password**: AmenityForge123

## Step 4: Add Your First Client

1. Click on "Clients" in the sidebar
2. Click "Add Client"
3. Fill in the form:
   - Company Name: Your client's company name
   - Contact Email: Client's email (will create their account)
   - Plan Type: Choose Starter, Professional, or Enterprise
   - Server Config: Set CPU, RAM, Storage, and Hosting Provider
   - Database Config: Choose database type, storage size, region, and optionally add connection string
4. Click "Create Client"

That's it! You can now manage clients, assign databases, and configure servers with a simple WordPress-like interface.
