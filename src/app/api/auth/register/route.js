import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'


import { SignJWT } from 'jose'

export async function POST(request) {
  await connectDB()
  try {
    const { name, email, password } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please fill all the fields' },
        { status: 400 }
      )
    }
    //check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    //create payload for jwt
    const payload = {
       id: user._id.toString(),
      email: user.email,
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    //create and sign the token
     const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const response = NextResponse.json({
      message: 'User registered and logged in successfully',
      success: true,
    })
    //set the token in httpOnly cookie
    response.cookies.set('farmersAitoken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return response
  } catch (error) {
    return new NextResponse(error.message, { status: 500 })
  }
}
