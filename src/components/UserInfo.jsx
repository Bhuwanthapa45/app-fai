"use client";
import useStore from "@/hooks/useStore";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setUserData = useUserStore((state) => state.setUser)
  const clearUserData = useUserStore((state) => state.clearUser)
  const storedUser = useStore(useUserStore, (state) => state.user)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include", // important: send cookies
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setUserData(data.user);
        } 
        else{
          clearUserData()
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <h1 className="text-xl font-bold">Loading...</h1>;

  return (
    <div className="p-4">
      {user ? ( <div>
       <h1 className="text-xl font-bold">Hello {user.name}</h1>
         <h6 className="text-xl font-bold">Hello {user.email}</h6>
         {/* {storedUser.name}
         {storedUser.email} */}
      
      </div>
       
        
      ) : (
        <h1 className="text-xl font-bold">Not logged in</h1>
      )}
    </div>
  );
}