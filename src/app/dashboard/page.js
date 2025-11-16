"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import {
  Leaf,
  Menu,
  LogOut,
  Home,
  MapPin,
  Settings,
  BarChart2,
  User,
  Bell,
} from "lucide-react";

import UserInfo from "@/components/UserInfo";
import LocationFetcher from "@/components/LocationFetcher";

/* LOGOUT BUTTON (UNCHANGED) */
const LogoutButton = ({ className = "" }) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onLogout = async () => {
    try {
      setBusy(true);
      await axios.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition ${className} ${busy && "opacity-50"}`}
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">{busy ? "Signing out..." : "Logout"}</span>
    </button>
  );
};

/* ---------------------------
   MAIN DASHBOARD PAGE (UPDATED)
----------------------------- */
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar onMenu={() => setSidebarOpen(!sidebarOpen)} />

      <div className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* -------------------------
            SIDEBAR (fixed width)
        --------------------------- */}
        <aside className="lg:col-span-3 space-y-6">

          {/* DESKTOP SIDEBAR CARD */}
          <div className="hidden lg:block sticky top-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow space-y-6">

            {/* Branding */}
            <div className="flex items-center gap-3">
              <Leaf className="text-emerald-600 w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">Farmers AI</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
              <NavItem href="/" icon={<Home className="w-4 h-4" />}>Overview</NavItem>
              <NavItem href="/dashboard" icon={<BarChart2 className="w-4 h-4" />}>Analytics</NavItem>
              <NavItem href="#weather" icon={<MapPin className="w-4 h-4" />}>Weather</NavItem>
              <NavItem href="#profile" icon={<User className="w-4 h-4" />}>Profile</NavItem>
              <NavItem href="/settings" icon={<Settings className="w-4 h-4" />}>Settings</NavItem>
            </nav>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                Notifications
              </button>
            </div>

            {/* Profile Card */}
            <div id="profile">
              <UserInfo />
            </div>

            <LogoutButton className="w-full justify-center" />
          </div>

          {/* Mobile Sidebar */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Leaf className="text-emerald-600 w-6 h-6" />
                <div>
                  <h3 className="text-sm font-semibold">Farmers AI</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
                </div>
              </div>
              <LogoutButton className="!px-3 !py-1" />
            </div>
          </div>
        </aside>

        {/* -------------------------
            MAIN CONTENT AREA
        --------------------------- */}
        <section className="lg:col-span-9 space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Welcome back, Farmer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Here's what's happening today.
              </p>
            </div>

            <div className="flex gap-3 mt-3 md:mt-0">
              <button className="rounded-lg bg-emerald-600 text-white px-4 py-2 shadow">
                <Bell className="w-4 h-4 mr-1 inline" /> Notifications
              </button>
              <Link
                href="/settings"
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Settings
              </Link>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Field Area" value="12.4 ha" subtitle="Pinned area" />
            <StatCard title="Soil Moisture" value="27%" subtitle="Last 24h" />
            <StatCard title="Weather Alerts" value="0" subtitle="Active" />
            <StatCard title="Yield Estimate" value="N/A t/ha" subtitle="Coming Soon" />
          </div>

          {/* Farm Overview Map */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
              <div>
                <h2 className="font-bold text-lg">Farm Overview</h2>
                <p className="text-sm text-gray-500">Satellite preview & insights</p>
              </div>
            </div>

            <div className="h-72 md:h-96 bg-gray-100 dark:bg-gray-700">
              <img
                src="https://geosciencesi.com/wp-content/uploads/2025/06/how-to-use-Satellite-Remote-Sensing-for-Agriculture.jpg"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 🌦 FULL WEATHER INTELLIGENCE */}
          <div id="weather">
            <LocationFetcher />
          </div>

        </section>
      </div>
    </div>
  );
}

/* ----------------------------------
    SUPPORT COMPONENTS
----------------------------------- */

const Topbar = ({ onMenu }) => (
  <header className="sticky top-0 bg-white/75 dark:bg-gray-900/75 backdrop-blur-sm border-b dark:border-gray-800 z-30">
    <div className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Leaf className="w-7 h-7 text-emerald-600" />
          <div>
            <h2 className="font-bold text-lg">Farmers AI</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Smart Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const NavItem = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className="text-sm text-gray-400">{subtitle}</p>
  </div>
);