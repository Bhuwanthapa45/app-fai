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

/* ---------------------------
   Logout button (logic unchanged)
   --------------------------- */
const LogoutButton = ({ className = "" }) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onLogout = async () => {
    try {
      setBusy(true);
      await axios.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error?.message || error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition ${className} ${busy ? "opacity-60" : ""}`}
      aria-label="Logout"
      title="Logout"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">{busy ? "Signing out..." : "Logout"}</span>
    </button>
  );
};

/* ---------------------------
   Main dashboard page
   --------------------------- */
export default function DashboardPage() {
  // client state for sidebar open (mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Topbar onMenu={() => setSidebarOpen((s) => !s)} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* SIDEBAR / NAV */}
          <aside
            className={`lg:col-span-3 transition-transform transform ${sidebarOpen ? "translate-x-0" : "translate-x-0"} z-20`}
            aria-label="Sidebar"
          >
            <div className="sticky top-6 space-y-6">
              <div className="hidden lg:block bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Leaf className="text-emerald-600 w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Farmers AI</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Farmer Dashboard</p>
                  </div>
                </div>

                <nav className="mt-6 space-y-1">
                  <NavItem href="/" icon={<Home className="w-4 h-4" />}>Overview</NavItem>
                  <NavItem href="/dashboard" icon={<BarChart2 className="w-4 h-4" />}>Analytics</NavItem>
                  <NavItem href="#location" icon={<MapPin className="w-4 h-4" />}>Location Tools</NavItem>
                  <NavItem href="#profile" icon={<User className="w-4 h-4" />}>Profile</NavItem>
                  <NavItem href="/settings" icon={<Settings className="w-4 h-4" />}>Settings</NavItem>
                </nav>

                <div className="mt-6">
                  <LogoutButton className="w-full justify-center" />
                </div>
              </div>

              {/* Mobile condensed header + logout */}
              <div className="lg:hidden bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Leaf className="text-emerald-600 w-6 h-6" />
                  <div>
                    <h4 className="font-semibold text-sm">Farmers AI</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
                  </div>
                </div>
                <LogoutButton className="!px-3 !py-1" />
              </div>

            </div>
          </aside>

          {/* MAIN CONTENT */}
          <section className="lg:col-span-9 space-y-6">

            {/* Header / greeting + quick actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  Welcome back, Farmer
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Here's what's happening on your farm today.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 font-semibold shadow-sm transition">
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
                <Link href="/settings" className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Settings
                </Link>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Field Area" value="12.4 ha" subtitle="Total pinned area" />
              <StatCard title="Soil Moisture" value="23%" subtitle="Average last 24h" />
              <StatCard title="Weather Alerts" value="2" subtitle="Active warnings" />
              <StatCard title="Yield Estimate" value="3.2 t/ha" subtitle="Current season" />
            </div>

            {/* MAIN PANELS: Map/Image + Controls & Components */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Big map / image */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow">
                <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 className="text-lg font-bold">Farm Overview</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Satellite preview & quick insights</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">Refresh</button>
                    <Link href="/map" className="text-sm px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">Open Map</Link>
                  </div>
                </div>

                {/* Map / image placeholder */}
                <div className="h-72 md:h-96 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1400&q=60"
                    alt="farm preview"
                    className="w-full h-full object-cover opacity-95"
                  />
                </div>

                {/* small metrics row */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-4">
                  <MiniStat label="Last sync" value="12m ago" />
                  <MiniStat label="Sensors online" value="6 / 8" />
                  <MiniStat label="Avg temp" value="28°C" />
                </div>
              </div>

              {/* Right: Controls + small cards */}
              <aside className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Quick Actions</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Tools</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Link href="/alerts" className="btn-outline">View Alerts</Link>
                  <Link href="/sensors" className="btn-outline">Sensor Health</Link>
                  <Link href="/recommendations" className="btn-outline">Get Recommendations</Link>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-semibold mb-2">Profile</h4>
                  <div id="profile" className="space-y-2">
                    <UserInfo />
                  </div>
                </div>

                <div id="location" className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-semibold mb-2">Location & Weather</h4>
                  <LocationFetcher />
                </div>

              </aside>
            </div>

            {/* Activity / Feed */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow">
              <h3 className="text-lg font-bold mb-3">Recent Activity</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li>• Irrigation scheduled for Field A — <span className="text-gray-500">2 hours ago</span></li>
                <li>• Pest alert cleared — <span className="text-gray-500">1 day ago</span></li>
                <li>• Satellite data synced — <span className="text-gray-500">3 days ago</span></li>
              </ul>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Small reusable UI pieces
   --------------------------- */
const Topbar = ({ onMenu }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/75 dark:bg-gray-900/75 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onMenu} className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <Leaf className="w-7 h-7 text-emerald-600" />
            <div>
              <h2 className="text-lg font-bold">Farmers AI</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Smart farming dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Home className="w-4 h-4" /> Home
            </Link>

            <div className="hidden sm:flex items-center gap-3">
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>

              <Link href="/profile" className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <User className="w-4 h-4" />
                <span className="text-sm">Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ href = "#", icon, children }) => {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm">
      <span className="text-gray-600 dark:text-gray-300">{icon}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100">{children}</span>
    </Link>
  );
};

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </div>
  </div>
);

const MiniStat = ({ label, value }) => (
  <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/60 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700 text-sm">
    <div className="w-2 h-2 rounded-full bg-emerald-500" />
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  </div>
);

/* ---------------------------
   Button utility classes (for readability)
   You can replicate in your global styles / tailwind config
   --------------------------- */
/* Example usage (already used above):
   <Link href="/alerts" className="btn-outline">View Alerts</Link>
   You can keep them as inline classes or extract to components.
*/