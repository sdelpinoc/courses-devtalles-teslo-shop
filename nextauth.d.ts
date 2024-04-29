import NextAuth, { DefaultSession } from "next-auth";

// To type the user of the session callback in auth.config.ts
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerified?: boolean
      role: string
      image?: string
    } & DefaultSession['user']
  }
}