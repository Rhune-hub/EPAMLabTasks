'use strict';

const { getRandomJoke } = require('one-liner-joke');
const weather = require('openweather-apis');

const cityName = process.argv[2] || 'Gomel';

weather.setLang('en');
weather.setCity(cityName);
weather.setUnits('metric');
weather.setAPPID('f62bd2b2675857698b6e58437473e520');

const getLocaleTimeStringFromUTCSeconds = secs =>
  new Date(secs * 1_000).toLocaleTimeString();

const weatherBlock = weatherObj => `\t--- Current Weather in ${cityName} ---
    Temp: ${weatherObj.main.temp}°C (feels like ${weatherObj.main.feels_like}°C)
    Humidity: ${weatherObj.main.humidity}%
    Visibility: ${(weatherObj.visibility / 1_000).toPrecision(2)} km
    Wind speed ${weatherObj.wind.speed} mps
    Pressure: ${weatherObj.main.pressure} mm Hg
    Weather condition: ${weatherObj.weather[0].description}
    Sunrise: ${getLocaleTimeStringFromUTCSeconds(weatherObj.sys.sunrise)}
    Sunset: ${getLocaleTimeStringFromUTCSeconds(weatherObj.sys.sunset)}
    Random joke: ${getRandomJoke().body}`;


weather.getAllWeather((err, JSONObj) => {
  if (err)
    console.error(err.message);
  else
    console.log(weatherBlock(JSONObj));
});
