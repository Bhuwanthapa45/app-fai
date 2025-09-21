import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import SoilMoisture from '@/models/SoilMoisture'


function interpretSoilMoisture(value) {
  if (value < 0.1) return "Very dry → irrigation likely needed.";
  if (value >= 0.1 && value < 0.3) return "Moderately dry → monitor crops.";
  if (value >= 0.3 && value < 0.4) return "Good moisture → normal crop growth.";
  if (value >= 0.4) return "Very wet → risk of waterlogging.";
}

export async function POST(request){
    await connectDB()
    try{
           const token = request.cookies.get('farmersAitoken')?.value
           if(!token) {
            return NextResponse.json({
                error: 'Not authenticated'
            }, {
                status: 401
            })
           }

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
                        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=soil_moisture_0_to_10cm_mean&timezone=auto`;
               const response = await fetch(apiUrl)
               if(!response.ok){
                      return NextResponse.json({ error: "Failed to fetch soil moisture data" }, { status: 500 });

               }
                const apiData = await response.json();

    const dailyData = apiData.daily.time.map((date, index) => ({
      date: new Date(date),
      numericValue: apiData.daily.soil_moisture_0_to_10cm_mean[index],
      interpretedValue: interpretSoilMoisture(apiData.daily.soil_moisture_0_to_10cm_mean[index]),
    }));
    //saving the data to mongodb
     const soilDoc = await SoilMoisture.findOneAndUpdate(
      { user: user._id, "farmLocation.latitude": lat, "farmLocation.longitude": lon },
      {
        user: user._id,
        farmLocation: {
          lat,
          lon,
          elevation: apiData.elevation || null,
        },
        data: dailyData,
      },
      { upsert: true, new: true }
    );

     return NextResponse.json({ success: true, soilDoc });
    }
    catch(error)
{
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
}}

//fetch soil moisture data from user database
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

    //fetch soil moisture data for this user from the database
    const soilData = await SoilMoisture.findOne({ user: user._id }).sort({
      createdAt: -1,
    })

    if (!soilData) {
      return NextResponse.json(
        { error: 'No soil moisture data found for this user' },
        { status: 404 }
      )
    }

    //return stored soil moisture data
    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
        soilData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('SoilMoisture API GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}