# Teslo Shop

## Start the project

- `npx create-next-app@latest 04-teslo-shop`
- Go to 04-teslo-shop directory:
  - Leave only the main HTML tag in src/app/page.tsx and modify global.css according to the requirements
  - Run: `npm run dev`
  - Go to http://localhost:3000

## Nextjs Fonts

- You can create a folder in the src directory, called fonts.ts, with:

```
import { Inter, Montserrat_Alternates } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const titleFont = Montserrat_Alternates({ subsets: ["latin"], weight: ['500', '700'] })
```

- And there declare the fonts we want to use in our project

## Installations

### React Icons

- https://react-icons.github.io/react-icons/
- `npm install react-icons`

### Lodash

- To create a slug for the url from the name of the cards
- https://www.npmjs.com/package/lodash
- `npm install lodash`
- `npm install --save @types/lodash`
- Use:

```
import lodash from "lodash"
.
.
.
lodash.kebabCase(card.name)
```

### Zustand

- https://zustand-demo.pmnd.rs/
- `npm install zustand`

### CLSX

- To include or not include tailwindcss classes according to logical expressions
- https://www.npmjs.com/package/clsx
- `npm install clsx`

### Swiper

- https://swiperjs.com/
- `npm install swiper`
- https://swiperjs.com/demos#thumbs-gallery -> Implement slider

### TS-Node

- [ts-node](https://www.npmjs.com/package/ts-node)
- `npm install ts-node --save-dev`

## Info

- @ -> It is used to refer to the base route of the application

- Tailwind components:
  - [Pagination](https://tailwindcomponents.com/component/pagination-3)

## Database

- First you need to install docker-desktop, and run it.
- Create a docker-compose.yml o docker-compose.yaml file in the root of the project
- Run:

  - `docker compose up -d`

- This will create a container with 2 services, postresql and pgadmin

- Credentials(This are stablish in docker-compose file)

  - Url: http://localhost:8080
  - User: user@domain.com
  - Password: 123456

- To connect to the database(Register a Server) in pgAdmin, use the name of the container(or the name of the services) as a host:
- postgres-db is a arbitrary name

  - Name: postgres -> Arbitrary name of the server
  - Host: postgres-db(container or service name of docker)
  - User: ${DB_USER} -> Obtain from .env
  - Password: ${DB_PASSWORD} -> Obtain from .env

- For the environment variables of postgres, we create a .env file in the project root

### Seed

- We need to create a file that populate the database, for this, in ./src/seed, we run
  - `npx tsc --init`
- Then we create a file called seed-db.ts, and add to script of package.json the following line:
- We use the ts-node library

```
"seed": "ts-node .\\src\\seed\\seed-db.ts",
```

### Prisma

- https://www.prisma.io/
- [Relational Database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

- `npm install prisma --save-dev`
- `npx prisma init --datasource-provider PostgreSQL`

- This will add the environment variable DATABASE_URL in the .env file, we need to change the user, password and db name

- To generate the schema from the database, run:

  - `npx prisma db pull`

- The schema is created and added to /prisma/schema.prisma

- To generate a migration:

  - `npx prisma migrate dev --name CardTypeOfCard`

- To generate a Prisma client

  - `npx prisma generate`
  - This generate a code, which we can copy to a file(/src/lib/prisma.ts) and export it

  - Or also, we can use the following code for [Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

  - To visualize the data
  - `npx prisma studio`

  - Transactions
  - https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions

### Ngrok

- For testing the app with a public url
- https://ngrok.com/
- Install the app for windows, then run:
- `ngrok config add-authtoken [authtoken]`

- Then use the Forwarding url

### Opengraph

- https://opengraph.dev/
- https://www.opengraph.xyz/

### Next Auth

- https://nextjs.org/learn/dashboard-app/adding-authentication
- https://authjs.dev/reference/next-auth
- `npm install next-auth`
- `npm install next-auth@beta` -> Use this

- Now you need to create a secret key, so run:
- `openssl rand -base64 32` in your git bash terminal, also you can use: https://generate-secret.vercel.app/32
- And add that to the environment variable AUTH_SECRET

- Then you to create a auth.config.ts file in the src directory

```
import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
pages: {
  signIn: '/auth/login',
  newUser: '/auth/new-account'
},
providers: []
}
```

### Zod

- https://zod.dev/
- `npm install zod`

### bcryptjs

- https://www.npmjs.com/package/bcryptjs
- `npm install bcryptjs`
- `npm i --save-dev @types/bcryptjs`

### React Hook Form

- https://react-hook-form.com/get-started
- `npm install react-hook-form`

### Paypal

  - https://developer.paypal.com/home/

  - Go to App & Credentials, click in Create App, select merchant.
  - Copy the Client ID and Secret Key 1 and copy them into the .env file
  - In Testing Tools -> Sandbox Accounts, create a new Sandbox account, personal type.(Optional)

  - We will use the account: 
    - sb-zcupl30713415@personal.example.com

### React - Paypal
  - https://www.npmjs.com/package/@paypal/react-paypal-js
  - `npm install @paypal/react-paypal-js`

### Cloudinary

  - https://cloudinary.com/
  - `npm install cloudinary`

  - Also you need to add the hostname to next.config.js file