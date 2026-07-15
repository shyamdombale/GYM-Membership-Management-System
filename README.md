# IronGrid — React Full-Stack Gym Membership Management System

## Stack
React + Vite, Recharts, Lucide React, Node.js, Express, MySQL, JWT, bcrypt.

## Included modules
Member registration/login architecture, role-based Member/Trainer/Admin UI, membership plans, class schedule/filtering, booking and capacity checks, waitlist promotion, trainer plans, nutrition plans, progress logs/charts, attendance endpoint for QR check-in, lockers, multi-branch data model, notifications table and renewal cron, analytics API, payment-order backend boundary, responsive UI foundation, and subtle UI animation.

## Run
### Database
Import `server/sql/schema.sql` into MySQL.

### Backend
Copy `server/.env.example` to `server/.env`, set credentials:
`cd server`
`npm install`
`npm run dev`

### Frontend
Copy `client/.env.example` to `client/.env`:
`cd client`
`npm install`
`npm run dev`

## Important integration note
The polished dashboard supplied by the user is preserved as `client/src/App.jsx`. It currently demonstrates interactions using local React state and mock arrays. `client/src/services/api.js` contains the real API client, and the Express/MySQL endpoints are included. Replace each mock operation with the corresponding API call as you connect screens to persistent data.

## Payment safety
The payment endpoint creates an internal pending payment record only. Production Razorpay/Stripe integration must use the provider's official server SDK, signature verification, and webhooks before marking a payment Paid. Auto-renewal requires provider-side mandates/subscriptions.

## QR safety
For production, generate short-lived signed QR tokens server-side and validate them at staff scanners. Do not treat a static client-generated visual code as proof of attendance.
