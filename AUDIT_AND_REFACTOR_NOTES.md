# Audit and refactor notes

## Audit of the uploaded portfolio

### Hardcoded content found
- Hero content was hardcoded in `Home.jsx`
- About section content was hardcoded in `About.jsx`
- Skills data was hardcoded in `Skills.jsx`
- Projects were hardcoded in `Projects.jsx`
- Experience, education, and achievements were hardcoded in separate page files
- Contact details were hardcoded in `Contact.jsx`
- Resume link was hardcoded in header and about sections
- Contact form logic and service credentials were hardcoded in the client

### Architecture issues
- frontend-only project with no backend or database
- content changes required code edits and redeployments
- no admin panel
- no API layer or server-side validation
- no auth or content management system

### Security issues
- EmailJS identifiers were exposed in the client code
- no rate limiting for contact submission
- no server-side validation or sanitization
- no auth-protected content operations

### UX / product issues
- design was clean but still looked like a portfolio starter project
- no centralized content control
- no message inbox
- no project detail experience

## What was rebuilt
- added a modular Express + MongoDB backend
- added secure admin authentication using JWT in httpOnly cookies
- replaced client-side EmailJS flow with backend-powered message storage
- introduced dynamic public content API
- created a premium one-page public portfolio plus project detail pages
- created an admin dashboard with CRUD support across major content areas
- added uploads for images and PDFs using Multer and a local storage flow
- seeded the database with your original portfolio information and assets

## Intentional engineering decisions
- local upload storage was used for easy local setup and a fully runnable version
- content is split between singleton models and collection models for cleaner admin UX
- React Query was used for server state in both apps
- React Hook Form + Zod was used for validation in the frontends
- the dashboard is config-driven where practical to reduce duplicated CRUD code

## Next recommended upgrades
- move file uploads to Cloudinary or S3 in production
- add refresh token rotation if you want longer-lived admin sessions
- add image optimization and SEO enhancements
- add testimonials, blog, and analytics modules if desired
