import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Hourlyweather from '@/models/Hourlyweather'

export async function POST(request) {
  await connectDB()
  try {
    // Getting token from the cookies
    const token = request.cookies.get('farmersAitoken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret).catch((err) => {
      console.error('JWT verification failed:', err)
      throw new Error('Invalid token')
    })

    // Fetching user from db to confirm
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

    // Parsing request body
    const { lat, lon } = await request.json()
    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Fetch hourly weather forecast data from API
    const apiKey = process.env.OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    
    console.log('Fetching from OpenWeather API:', url.replace(apiKey, 'HIDDEN'))
    
    const res = await fetch(url)
    if (!res.ok) {
      console.error('OpenWeather API failed:', res.status, res.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch hourly weather data' },
        { status: res.status }
      )
    }
    const data = await res.json()
    console.log('OpenWeather API success, city:', data.city?.name, 'entries:', data.cnt)

    // Save or update hourly weather data in DB
    const hourlyWeatherEntry = await Hourlyweather.findOneAndUpdate(
      { 
        user: user._id,
        'city.id': data.city.id  // Filter by user and city to avoid duplicates
      },
      {
        user: user._id,
        ...data,
      },
      {
        new: true, // return the updated document
        upsert: true, // create if doesn't exist
        setDefaultsOnInsert: true,
      }
    )

    console.log('Saved to database, entries:', hourlyWeatherEntry.cnt)

    // Return hourly weather + user info
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        hourlyWeather: data,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Hourly Weather API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  await connectDB()
  try {
    // Getting token from cookies
    const token = request.cookies.get('farmersAitoken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret).catch((err) => {
      console.error('JWT verification failed:', err)
      throw new Error('Invalid token')
    })

    // Fetch user from database
    const user = await User.findById(payload.id).select('name email')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get URL parameters for optional city filtering
    const { searchParams } = new URL(request.url)
    const cityId = searchParams.get('cityId')

    // Build query
    let query = { user: user._id }
    if (cityId) {
      query['city.id'] = parseInt(cityId)
    }

    console.log('Searching database with query:', query)

    // Fetch hourly weather data for this user from the database
    const hourlyWeather = cityId 
      ? await Hourlyweather.findOne(query).sort({ createdAt: -1 })
      : await Hourlyweather.find(query).sort({ createdAt: -1 }).limit(5)

    console.log('Database result:', {
      found: !!hourlyWeather,
      isArray: Array.isArray(hourlyWeather),
      count: Array.isArray(hourlyWeather) ? hourlyWeather.length : (hourlyWeather ? 1 : 0)
    })

    if (!hourlyWeather || (Array.isArray(hourlyWeather) && hourlyWeather.length === 0)) {
      return NextResponse.json(
        { error: 'No hourly weather data found for this user' },
        { status: 404 }
      )
    }

    // Return stored hourly weather data
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        hourlyWeather,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Hourly Weather API GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}