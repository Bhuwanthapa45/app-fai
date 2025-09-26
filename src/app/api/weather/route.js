import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Weather from '@/models/Weather'

export async function POST(request) {
  await connectDB()
  try {
    ///getting token from the cookies
    const token = reequest.cookies.get('farmersAitokn')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    //verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret).catch((err) => {
      console.error('JWT verification failed:', err)
      throw new Error('Invalid token')
    })
    //fetching user from db to confirm
    const user = await User.findById(payload.id).select('name email')
    if (!user) {
      return NextResponse.json(
        {
          error: 'User not found',
        },
        {
          status: 404,
        }
      )
    }
    //parsing request  body
    const { lat, lon } = await request.json()
    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }
    //fetch weather data from api
    const apiKey = process.env.OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const res = await fetch(url)
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: res.status }
      )
    }
    const data = await res.json()

    //6 . saving the data into database and 
    // 6. Save or update weather data in DB
    const weatherEntry = await Weather.findOneAndUpdate(
      { user: user._id }, // filter by user
      {
        user: user._id,
        ...data,
        raw: data, // keep the full raw API response
      },
      {
        new: true, // return the updated document
        upsert: true, // create if doesn't exist
        setDefaultsOnInsert: true,
      }
    )
    // 7. Return weather + user info (optional)
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        weather: data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

//fetch weather data from user database
export async function GET(request) {
  await connectDB()
  try {
    //getting token from cookies
    const token = request.cookies.get('farmersAitoken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    //verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret).catch((err) => {
      console.error('JWT verification failed:', err)
      throw new Error('Invalid token')
    })
    //fetch user from database
    const user = await User.findById(payload.id).select('name email')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    //fetch weather data for this user  from the database
    const weather = await Weather.findOne({ user: user._id }).sort({
      createdAt: -1,
    })

    if (!weather) {
      return NextResponse.json(
        { error: 'No weather data found for this user' },
        { status: 404 }
      )
    }
    // 5. Return stored weather data
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        weather,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Weather API GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
