import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Chat from "@/models/Chat";

const FASTAPI_URL = "http://localhost:8000/rag"; // FastAPI RAG endpoint

export async function POST(request) {
  await connectDB();

  try {
    // 1️⃣ Verify user token
    const token = request.cookies.get("farmersAitoken")?.value;
    if (!token)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findById(payload.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2️⃣ Parse input message
    const { message } = await request.json();
    if (!message)
      return NextResponse.json({ error: "Message required" }, { status: 400 });

    // 3️⃣ Call FastAPI RAG backend
    const ragResponse = await fetch(FASTAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user._id, query: message }),
    });

    if (!ragResponse.ok) {
      const errorText = await ragResponse.text();
      console.error("RAG backend error:", errorText);
      return NextResponse.json(
        { error: "FastAPI RAG backend failed", detail: errorText },
        { status: 502 }
      );
    }

    const data = await ragResponse.json();
    const { answer, context_used } = data;

    // 4️⃣ Store chat history in MongoDB
    const savedChat = await Chat.create({
      user: user._id,
      message,
      answer,
      context_used,
    });

    // 5️⃣ Return to frontend
    return NextResponse.json({ success: true, chat: savedChat }, { status: 200 });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await connectDB();
  try {
    // 1️⃣ Verify token
    const token = request.cookies.get("farmersAitoken")?.value;
    if (!token)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findById(payload.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2️⃣ Fetch chat history
    const chats = await Chat.find({ user: user._id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, chats }, { status: 200 });
  } catch (err) {
    console.error("Chat API GET error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
  }
}