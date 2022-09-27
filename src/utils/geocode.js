const request = require('request');

// address ? = "CRASH!" vs. encodeURIComponent(address) ? =%3F
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=INSERT-TOKEN`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) callback(`Could not connect to ${err.hostname}`, undefined);
    else if (body.features.length === 0)
      callback(`Unable to find ${address}. Try another search.`, undefined);
    else {
      const feat = body.features[0];
      callback(undefined, {
        latitude: feat.center[1],
        longitude: feat.center[0],
        location: feat.place_name,
      });
    }
  });
};

module.exports = geocode;
