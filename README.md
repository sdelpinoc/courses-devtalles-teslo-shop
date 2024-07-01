This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

- Install docker desktop

## Getting Started(development)

1. Clone the repository and then run:

   - `npm install`

2. Create a .env file, copying and creating news environment variables from .env.template file

3. Generate the AUTH_SECRET environment variable

4. Start the database

- `docker compose up -d`

5. For the connection in pgAdmin, use DB_USER and DB_PASSWORD when creating a server,
   and in the host/address use the name of the service, in this case: postgres-db

6. Run Prisma migrations

- `npx prisma migrate dev`

7. Execute seed

- `npm run seed` or `npm run seed-unix`

8. Delete localStorage from browser

9. Run the development server:

   - `npm run dev`
   - Go to http://localhost:3000/

10. For the database administrator:
   - pgAdmin credencial:
     - Url: http://localhost:8080
     - User: ${PGADMIN_DEFAULT_EMAIL}
     - Password: ${PGADMIN_DEFAULT_PASSWORD}

   - ${PGADMIN_DEFAULT_EMAIL} and ${PGADMIN_DEFAULT_PASSWORD} are obtained from the .env file

## For production

1. --
