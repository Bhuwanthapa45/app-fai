import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import PestPredict from "@/models/PestPredict";

const FASTAPI_URL = "http://localhost:8000/predict"; // Update to your deployed URL if needed

// ==================== POST ====================
export async function POST(request) {
  await connectDB();
  try {
    // 1️⃣ Get token from cookies
    const token = request.cookies.get("farmersAitoken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2️⃣ Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret).catch((err) => {
      console.error("JWT verification failed:", err);
      throw new Error("Invalid token");
    });

    // 3️⃣ Get user from DB
    const user = await User.findById(payload.id).select("name email");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4️⃣ Parse request body (from frontend)
    const { temperature, humidity, rainfall, soil_moisture, wind_speed, location } =
      await request.json();

    if (
      temperature === undefined ||
      humidity === undefined ||
      rainfall === undefined ||
      soil_moisture === undefined ||
      wind_speed === undefined
    ) {
      return NextResponse.json(
        { error: "All environmental parameters are required" },
        { status: 400 }
      );
    }

    // 5️⃣ Send request to FastAPI for prediction
    const response = await fetch(FASTAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        temperature,
        humidity,
        rainfall,
        soil_moisture,
        wind_speed,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: "Failed to get prediction from FastAPI", detail: errText },
        { status: 502 }
      );
    }

    const prediction = await response.json();

    // 6️⃣ Save prediction result in MongoDB linked to user
    const savedPrediction = await PestPredict.findOneAndUpdate(
      { user: user._id }, // Each user keeps their latest record
      {
        user: user._id,
        
        risk_score: prediction.risk_score,
        risk_level: prediction.risk_level,
        advice: prediction.advice,
        rawResponse: prediction, // Keep the entire API response
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    // 7️⃣ Return the saved prediction + user info
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        prediction: savedPrediction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pest Predict API POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", detail: error.message },
      { status: 500 }
    );
  }
}

// ==================== GET ====================
export async function GET(request) {
  await connectDB();
  try {
    // 1️⃣ Get token from cookies
    const token = request.cookies.get("farmersAitoken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2️⃣ Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret).catch((err) => {
      console.error("JWT verification failed:", err);
      throw new Error("Invalid token");
    });

    // 3️⃣ Get user
    const user = await User.findById(payload.id).select("name email");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4️⃣ Fetch latest pest prediction from DB
    const prediction = await PestPredict.findOne({ user: user._id }).sort({
      createdAt: -1,
    });

    if (!prediction) {
      return NextResponse.json(
        { error: "No pest prediction found for this user" },
        { status: 404 }
      );
    }

    // 5️⃣ Return stored pest prediction
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        prediction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pest Predict API GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", detail: error.message },
      { status: 500 }
    );
  }
}