import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";   
import User from "@/models/User";  


export async function GET(request) {
  await connectDB();
  try {
    const token = request.cookies.get("farmersAitoken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret).catch(err => {
      console.error("JWT verification failed:", err);
      throw new Error("Invalid token");
    });

    const user = await User.findById(payload.id).select("name email");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("API /me error:", error); // 👈 log actual error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
