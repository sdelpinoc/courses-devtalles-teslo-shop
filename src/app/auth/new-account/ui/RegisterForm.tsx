'use client'

import { useState } from "react"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import clsx from "clsx"

import { login } from "@/actions/auth/login"
import { registerUser } from "@/actions/auth/register-user"

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { email, name, password } = data
    // console.log({ email, name, password })
    // Server
    const response = await registerUser(name, email, password)
    console.log({ response })

    if (!response.ok) {
      setErrorMessage(response.message)
      return
    }

    await login(email.toLowerCase(), password)

    window.location.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Name</label>
      {errors.name?.type == 'required' && <span className="text-sm text-red-500">This field is required</span>}
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            'border-red-500': errors.name
          }
        )}
        type="text"
        {...register('name', { required: true })}
        autoFocus
      />
      <label htmlFor="email">Email</label>
      {errors.email?.type == 'required' && <span className="text-sm text-red-500">This field is required</span>}
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            'border-red-500': errors.email
          }
        )}
        type="email"
        {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
      />
      <label htmlFor="password">Password</label>
      {errors.password?.type == 'required' && <span className="text-sm text-red-500">This field is required</span>}
      {errors.password?.type == 'minLength' && <span className="text-sm text-red-500">Password is very short, minimum 6 characters</span>}
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          {
            'border-red-500': errors.password
          }
        )}
        type="password"
        {...register('password', { required: true, minLength: 6 })}
      />
      <button
        className="btn-primary">
        Create
      </button>
      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      {
        errorMessage && <span className="text-sm text-red-500">{errorMessage}</span>
      }
      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Login
      </Link>
    </form>
  )
}