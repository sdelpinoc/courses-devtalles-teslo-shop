This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

- Install docker desktop

## Getting Started(development)

1. Clone the repository and then run:

   - `npm install`

2. Create a .env file, copying and creating a new environment variables from .env.template file

3. Start the database

- `docker compose up -d`

4. Run Prisma migrations

- `npx prisma migrate dev`

5. Execute seed

- `npm run seed` or `npm run seed-unix`

6. Run the development server:

   - `npm run dev`
   - Go to http://localhost:3000/

7. For the database administrator:
   - pgAdmin credencial:
     - Url: http://localhost:8080
     - User: user@domain.com
     - Password: 123456

## For production

1.
