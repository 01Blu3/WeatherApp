const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=INSERT-KEY=${lat},${lng}&units=f`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) callback('Unable to connect to weather service!', undefined);
    else if (body.error) callback('Unable to find location', undefined);
    else {
      const current = body.current;
      callback(undefined, {
        temp: current.temperature,
        description: current.weather_descriptions[0],
        precip: current.precip,
        tempUnit: '°F',
        dayReport: `Todays Forecast: It is currently ${current.temperature}°F but feels like ${current.feelslike}°F with ${current.weather_descriptions[0]} weather and ${current.precip}% chance of rain!`,
        airhum: `The humidity in the air is ${current.humidity} %`,
      });
    }
  });
};

module.exports = forecast;
