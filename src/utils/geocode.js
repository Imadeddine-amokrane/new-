const request = require('request');
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaW1hZC0wOCIsImEiOiJjbGVuOHBia20xN2p0M3ZuOGlxd2Vta3poIn0.0LBWk7wKwodBBusGZUj3Nw&limit=1`;

  request(url, { method: 'GET', json: true }, (err, _, body) => {
    if (err) return callback(err, undefined);
    if (body.features.length === 0)
      return callback('Please enter a valid address', undefined);

    const [longitude, latitude] = body.features[0].center;
    callback(undefined, {
      longitude,
      latitude,
      location: body.features[0].place_name,
    });
  });
};

module.exports = geocode;
