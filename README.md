# Premium Portfolio Platform

A production-style full-stack portfolio platform built from your uploaded codebase and reference MERN project.

## What this project includes

- `apps/web` — premium public portfolio built with React, Vite, Tailwind, React Query, React Hook Form, and Zod
- `apps/admin` — secure admin dashboard for managing portfolio content and messages
- `server` — Express + MongoDB API with JWT auth, httpOnly cookies, rate limiting, validation, uploads, and seed data

## Architecture

```text
premium-portfolio-platform/
├── apps/
│   ├── web/
│   └── admin/
├── server/
└── README.md
```

## Features

### Public portfolio
- premium modern landing page
- dynamic hero, about, services, skills, projects, experience, education, certifications, achievements, and contact sections
- project detail pages
- backend-powered contact form
- resume and social links managed from the admin panel

### Admin dashboard
- secure admin login/logout
- singleton content editing for profile, hero, about, contact info, and site settings
- CRUD for projects, services, social links, skill categories, skills, experience, education, certifications, and achievements
- inbox for portfolio messages
- image / PDF upload endpoint with local storage

### Backend
- Express API
- MongoDB + Mongoose
- httpOnly cookie auth
- zod validation
- rate limiting for auth and public message routes
- static file uploads
- seed script and default admin bootstrap

## Setup

### 1) Install dependencies

From the project root:

```bash
npm install
```

### 2) Configure environment variables

Copy these files and adjust values if needed:

```bash
cp server/.env.example server/.env
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
```

### 3) Start MongoDB

Make sure MongoDB is running locally.

Default URI used by the server:

```bash
mongodb://127.0.0.1:27017/premium_portfolio
```

### 4) Seed the database (optional but recommended)

```bash
npm run seed
```

The server also auto-seeds default content on first boot.

### 5) Run the apps

Open three terminals from the project root.

Server:

```bash
npm run dev:server
```

Public portfolio:

```bash
npm run dev:web
```

Admin dashboard:

```bash
npm run dev:admin
```

## Local URLs

- Public portfolio: `http://localhost:5173`
- Admin dashboard: `http://localhost:5174`
- API server: `http://localhost:4000`

## Default admin credentials

```text
Email: admin@example.com
Password: Admin@123456
```

Change these values through `server/.env` before deploying.

## Build commands

```bash
npm run build:web
npm run build:admin
npm run build:server
```

## Deployment guide

### Backend
Deploy the `server` app to a Node hosting provider.

Required environment variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `ADMIN_URL`
- `SERVER_URL`
- `DEFAULT_ADMIN_EMAIL`
- `DEFAULT_ADMIN_PASSWORD`

### Frontends
Deploy `apps/web` and `apps/admin` separately as Vite apps.

Update:
- `apps/web/.env`
- `apps/admin/.env`

Use your deployed API URL for `VITE_API_URL`.

### Uploads
Current implementation stores uploads locally in `server/uploads`.

For production, move uploads to durable cloud storage such as Cloudinary, S3, or similar.

## Main improvements over the original uploaded code

- replaced hardcoded portfolio content with database-driven content
- removed insecure client-side EmailJS usage
- added backend API and admin authentication
- introduced CRUD content operations
- created a premium one-page portfolio and project detail flow
- added setup structure for professional maintenance and future extension

## Notes

- The code is intentionally modular so you can extend it to add testimonials, blog posts, or analytics later.
- The upload flow is local-first for easier setup; cloud storage can be swapped in later.
