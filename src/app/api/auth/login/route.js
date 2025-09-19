import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from 'jose' 
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();
    try{
        const {email, password } = await request.json();
        if (!email || !password) {
      return new NextResponse('Email and password are required', { status: 400 })
    }
    const user = await User.findOne({ email }).select('+password')
     if (!user) {
      return new NextResponse('Invalid credentials', { status: 401 })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return new NextResponse('Invalid Credentials', { status: 401 })
    }
    const payload = {
         id: user._id.toString(),
        email: user.email,
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

       const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);



  
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    })

    // Set the token in an httpOnly cookie
    response.cookies.set('farmersAitoken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    // console.log("Decoded payload:", payload);

    return response
       
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}