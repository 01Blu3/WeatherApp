const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const locationQuery = (inquiry, callback) =>
  readline.question(inquiry, location => {
    callback(location);
    readline.close();
  });

// module.exports = locationQuery;

// const locationQuery = require('./utils/query');
/* locationQuery('Please Enter your location!\n', location => {
  if (!location)
    return console.log('Please input a location!\nApp now exiting...');
  geocode(location, (err, data) => {
    if (err) return console.log('Error ->', err);

    forecast(data.latitude, data.longitude, (err, forecastData) => {
      if (err) return console.log('Error ->', err);

      console.log(data.location);
      console.log(forecastData.dayReport);
    });
  });
});
 */
