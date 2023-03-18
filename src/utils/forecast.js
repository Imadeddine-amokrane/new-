const request = require('request');

// const url =
//   'http://api.weatherstack.com/current?access_key=0cc8cc25eaef69b7846eeda2b5bc4d2f&query=constantine';

// const options = { method: 'GET', json: true }; // set json: true <==> console.log(JSON.parse(response.body));

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0cc8cc25eaef69b7846eeda2b5bc4d2f&query=${latitude},${longitude}`;
  request(url, { method: 'GET', json: true }, (err, { body }) => {
    if (err) return callback('No internet conection', undefined);
    if (body.error) return callback(body.error, undefined);
    callback(
      undefined,
      `${body.current.weather_descriptions[0]}.It's ${body.current.temperature} degree outside but it feels Like ${body.current.feelslike} degree `
    );
  });
};

module.exports = forecast;
