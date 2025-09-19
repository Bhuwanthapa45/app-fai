const mongoose = require('mongoose');

const HourlyweatherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cod: String,
  message: Number,
  cnt: Number,
  list: [{
    dt: Number,
    main: {
      temp: Number,
      feels_like: Number,
      temp_min: Number,
      temp_max: Number,
      pressure: Number,
      sea_level: Number,
      grnd_level: Number,
      humidity: Number,
      temp_kf: Number
    },
    weather: [{
      id: Number,
      main: String,
      description: String,
      icon: String
    }],
    clouds: {
      all: Number
    },
    wind: {
      speed: Number,
      deg: Number,
      gust: Number
    },
    rain: {
      '1h': Number,
      '3h': Number
    },
    snow: {
      '1h': Number,
      '3h': Number
    },
    visibility: Number,
    pop: Number,
    sys: {
      pod: String
    },
    dt_txt: String
  }],
  city: {
    id: Number,
    name: String,
    coord: {
      lat: Number,
      lon: Number
    },
    country: String,
    population: Number,
    timezone: Number,
    sunrise: Number,
    sunset: Number
  }
}, {
  timestamps: true
});

export default mongoose.models.Hourlyweather || mongoose.model('Hourlyweather', HourlyweatherSchema);
