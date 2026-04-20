# Premium Portfolio Platform

A production-style full-stack portfolio platform built from your uploaded codebase and reference MERN project.

## What this project includes

- `apps/web` — premium public portfolio built with React, Vite, Tailwind, React Query, React Hook Form, and Zod
- `apps/admin` — secure admin dashboard for managing portfolio content and messages
- `server` — Express + MongoDB API with JWT auth, httpOnly cookies, rate limiting, validation, and Cloudinary-ready uploads

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
- richer profile fields such as languages, specializations, preferred roles, current learning focus, and project metadata

### Admin dashboard
- secure admin login/logout
- singleton content editing for profile, hero, about, contact info, and site settings
- CRUD for projects, services, social links, skill categories, skills, experience, education, certifications, and achievements
- inbox for portfolio messages
- image and PDF upload endpoint
- Cloudinary support for images and resume uploads

### Backend
- Express API
- MongoDB + Mongoose
- httpOnly cookie auth
- zod validation
- rate limiting for auth and public message routes
- Cloudinary-first uploads with local fallback when Cloudinary env vars are missing
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

### 3) Configure Cloudinary in `server/.env`

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=premium-portfolio-platform
```

If Cloudinary values are present, image and resume uploads go to Cloudinary.
If they are missing, uploads fall back to `server/uploads` locally.

### 4) Start MongoDB

Make sure MongoDB is running locally.

Default URI used by the server:

```bash
mongodb://127.0.0.1:27017/premium_portfolio
```

### 5) Seed the database (recommended)

```bash
npm run seed
```

The server also auto-seeds default content on first boot.

### 6) Run the apps

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
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `DEFAULT_ADMIN_EMAIL`
- `DEFAULT_ADMIN_PASSWORD`

### Frontends
Deploy `apps/web` and `apps/admin` separately as Vite apps.

Update:
- `apps/web/.env`
- `apps/admin/.env`

Use your deployed API URL for `VITE_API_URL`.

## Main improvements over the original uploaded code

- replaced hardcoded portfolio content with database-driven content
- removed insecure client-side EmailJS usage
- added backend API and admin authentication
- introduced CRUD content operations
- added richer professional profile fields such as languages, specializations, current learning focus, project type, status, and experience stack
- added Cloudinary support for image and resume uploads
- created a premium one-page portfolio and project detail flow
- added setup structure for professional maintenance and future extension

## Notes

- The code is modular so you can extend it to add testimonials, blog posts, or analytics later.
- Cloudinary is the recommended production upload provider and is already wired into the server.
