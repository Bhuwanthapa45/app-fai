"use client"

import { useRouter } from 'next/navigation'
import axios from 'axios'
import UserInfo from '@/components/UserInfo'
import LocationFetcher from '@/components/LocationFetcher'



// We need a logout API endpoint
const LogoutButton = () => {
  const router = useRouter()
  const onLogout = async () => {
    try {
      await axios.get('/api/auth/logout')
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error.message)
    }
  }
  return (
     <button
        onClick={onLogout}
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Logout
      </button>
  )
}

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Welcome to your Dashboard</h1>
        <p className="mt-4 text-lg">You are successfully logged in.</p>
        <UserInfo />
        <div className="mt-8">
          <LogoutButton />
        </div>
        <LocationFetcher/>
      </div>
    </main>
  )
}
