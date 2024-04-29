'use client'

import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

import { authenticate } from "@/actions/auth/login"
import { IoInformationOutline } from "react-icons/io5"
import clsx from "clsx"

export const LoginForm = () => {
  const searchParams = useSearchParams()
  // console.log({ searchParams })
  const callbackUrl = searchParams.get('callbackUrl')
  const [status, dispatch] = useFormState(authenticate, undefined)
  const router = useRouter()
  
  // console.log({ status })
  useEffect(() => {
    if (status === 'Success') {
      // router.replace('/')
      window.location.href = (callbackUrl !== null) ? callbackUrl : '/'
    }
  }, [status, router, callbackUrl])

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password" id="password" name="password" />
      <div
        className="flex h-8 space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {status && status !== 'Success' && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{status}</p>
          </>
        )}
      </div>
      {/* <button type="submit" className="btn-primary">
        Log in
      </button> */}
      <LoginButton />
      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Create a new account
      </Link>
    </form>
  )
}

function LoginButton () {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx({
      "btn-primary": !pending,
      "btn-disabled": pending
    })} aria-disabled={pending} disabled={pending}>
      Log in
    </button>
  );
}