# Real-Time Event Check-In App

## Requirements
- Node.js, Expo CLI, PostgreSQL/Supabase

## Backend Setup
1. `cd backend && npm install`
2. Create `.env` with `DATABASE_URL=postgresql://...`
3. `npx prisma generate && npx prisma migrate dev --name init`
4. `node index.ts` → Backend runs at port 4000

## Frontend Setup
1. `cd frontend && npm install`
2. `npx expo start` → Opens on Metro
3. Use Login → Event List → Detail → Join → see real-time updates

## How It Works
- Backend GraphQL & Prisma manage events/users.
- Frontend uses Apollo Client to fetch data.
- Socket.io sends `userJoined` → triggers refetch in real time.
