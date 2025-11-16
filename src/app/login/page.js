"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  Leaf,
  Menu,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const response = await axios.post("/api/auth/login", user);

      if (response.data?.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* LEFT SIDE — FORM */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
              {loading ? "Logging in..." : "Welcome Back"}
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Log in to access your personalized farming dashboard
            </p>

            {/* Error Message */}
            {errorMsg && (
              <p className="mb-4 text-center text-red-500 font-medium">{errorMsg}</p>
            )}

            <input
              className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-green-600 focus:outline-none"
              type="email"
              placeholder="Email address"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <input
              className="mb-6 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-green-600 focus:outline-none"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
              onClick={onLogin}
              disabled={loading}
              className="w-full rounded-lg bg-green-600 py-3 text-white font-bold text-lg hover:bg-green-700 disabled:opacity-50 transition"
            >
              {loading ? "Please wait..." : "Login"}
            </button>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-green-600 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div className="hidden md:block bg-green-700">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
              alt="Farmer in field"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </main>
    </>
  );
}

/* ------------------------------------------------
   HEADER COMPONENT
------------------------------------------------- */
const Header = () => (
  <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-100/80 border-b border-green-600/20">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Leaf className="text-green-700 text-3xl" />
          <h2 className="text-green-700 text-2xl font-bold tracking-tight">
            Farmers AI
          </h2>
        </div>

        {/* Sign Up Button */}
        <Link
          href="/signup"
          className="hidden md:flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden 
                     rounded-lg h-10 px-4 bg-[#F7D720] text-[#593E31] text-sm font-bold 
                     hover:opacity-90 transition"
        >
          Sign Up for Free
        </Link>

        {/* Mobile Menu */}
        <button className="md:hidden text-green-600">
          <Menu className="text-3xl" />
        </button>
      </div>
    </div>
  </header>
);