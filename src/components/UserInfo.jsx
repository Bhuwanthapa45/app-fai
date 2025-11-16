"use client";

import useStore from "@/hooks/useStore";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserData = useUserStore((state) => state.setUser);
  const clearUserData = useUserStore((state) => state.clearUser);
  const storedUser = useStore(useUserStore, (state) => state.user);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.user) {
          setUser(data.user);
          setUserData(data.user);
        } else {
          clearUserData();
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  /* ----------------------
      LOADING SKELETON
  ----------------------- */
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 shadow-sm animate-pulse space-y-4">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  /* ----------------------
      MAIN PROFILE CARD
  ----------------------- */
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 shadow-sm">
      {user ? (
        <div className="space-y-4">
          {/* Top Profile Row */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 flex items-center justify-center text-xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>

            {/* Name + Email */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Status</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Active
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Role</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Farmer
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center">
          Not logged in
        </h2>
      )}
    </div>
  );
}