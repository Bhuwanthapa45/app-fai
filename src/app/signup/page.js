"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const onSignup = async () => {
    try {
      setLoading(true)
      setErrorMsg("")
      setSuccessMsg("")

      const response = await axios.post('/api/auth/register', user)

      // ✅ Only redirect if backend confirms signup
      if (response.data?.success) {
        console.log('Signup success', response.data)
        setSuccessMsg("Account created successfully! Redirecting...")

        // Optional: save token in localStorage/cookies
        // localStorage.setItem("token", response.data.token)

        router.push('/dashboard')
      } else {
        setErrorMsg("Signup failed. Please try again.")
      }
    } catch (error) {
      console.error('Signup failed', error.response?.data || error.message)
      setErrorMsg(error.response?.data?.error || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-xs">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {loading ? 'Processing...' : 'Create an Account'}
        </h1>

        {/* Error / Success messages */}
        {errorMsg && <p className="mb-4 text-center text-red-500">{errorMsg}</p>}
        {successMsg && <p className="mb-4 text-center text-green-500">{successMsg}</p>}

        <input
          className="mb-4 w-full appearance-none rounded border bg-gray-800 px-3 py-2 leading-tight text-white focus:outline-none"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          className="mb-4 w-full appearance-none rounded border bg-gray-800 px-3 py-2 leading-tight text-white focus:outline-none"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="mb-6 w-full appearance-none rounded border bg-gray-800 px-3 py-2 leading-tight text-white focus:outline-none"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignup}
          disabled={loading}
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up & Go to Dashboard"}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Loginn
          </Link>
        </p>
      </div>
    </main>
  )
}