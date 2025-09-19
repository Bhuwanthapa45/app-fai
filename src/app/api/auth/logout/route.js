import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    })

    // Expire the cookie by setting maxAge to 0
    response.cookies.set('farmersAitoken', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}