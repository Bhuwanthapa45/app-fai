import mongoose from "mongoose";

const WeatherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coord: {
      lon: Number,
      lat: Number,
    },
    weather: [
      {
        id: Number,
        main: String,
        description: String,
        icon: String,
      },
    ],
    main: {
      temp: Number,
      feels_like: Number,
      temp_min: Number,
      temp_max: Number,
      pressure: Number,
      humidity: Number,
      sea_level: Number,
      grnd_level: Number,
    },
    visibility: Number,
    wind: {
      speed: Number,
      deg: Number,
      gust: Number,
    },
    rain: mongoose.Schema.Types.Mixed, // because sometimes rain/snow might not exist
    clouds: {
      all: Number,
    },
    sys: {
      country: String,
      sunrise: Number,
      sunset: Number,
    },
    timezone: Number,
    name: String,
    dt: Number,
    raw: mongoose.Schema.Types.Mixed, // in case you want to store full raw response
  },
  { timestamps: true }
);

export default mongoose.models.Weather ||
  mongoose.model("Weather", WeatherSchema);
  