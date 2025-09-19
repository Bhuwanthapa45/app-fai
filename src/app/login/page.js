"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const onLogin = async () => {
    try {
      setLoading(true)
      setErrorMsg("") // clear any previous error

      const response = await axios.post('/api/auth/login', user)

      // ✅ Only redirect if login is successful and token exists
      if (response.data?.success) {
        console.log('Login success', response.data)

        // Optional: save token to cookies/localStorage if needed
        // localStorage.setItem("token", response.data.token)

        router.push('/dashboard')
      } else {
        setErrorMsg("Invalid login credentials. Please try again.")
      }
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message)
      setErrorMsg(error.response?.data?.error || "Login failed, please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-xs">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {loading ? 'Logging in...' : 'Login'}
        </h1>

        {/* Error Message */}
        {errorMsg && (
          <p className="mb-4 text-center text-red-500">{errorMsg}</p>
        )}

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
          onClick={onLogin}
          disabled={loading}
          className="w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}