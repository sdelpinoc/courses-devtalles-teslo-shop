import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { z } from 'zod';

import prisma from './lib/prisma';

import bcryptjs from 'bcryptjs'

const authenticatedRoutes = [
  'checkout/address'
]

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  providers: [
    credentials({
      async authorize (credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        // console.log({ email, password })
        // Search the user by email
        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase()
          }
        })

        if (!user) return null

        // Checking password
        if (!bcryptjs.compareSync(password, user.password)) return null

        const { password: passwordDB, ...userDB } = user
        // console.log({ userDB })
        return userDB
      },
    }),
  ],
  callbacks: {
    // async signIn ({ user, account }) {
    //   console.log({ user, account })
    //   return true
    // },
    jwt ({ account, token, user }) {
      // console.log({ token, user })
      // user contains the information obtained from the database, in the authorize function of credentials
      if (user) {
        token.data = user
      }

      return token
    },
    session ({ session, token, user }) {
      // console.log({ session, token, user })
      session.user = token.data as any
      return session
    },
    authorized ({ auth, request: { nextUrl } }) {
      // console.log({ auth })
      // console.log(nextUrl.pathname)
      const isLoggedIn = !!auth?.user;
      const isOnCheckout = nextUrl.pathname.startsWith('/checkout');
      if (isOnCheckout) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL('/cart', nextUrl));
        return true
      }

      return true;
    }
  }
  // secret: process.env.AUTH_SECRET
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)