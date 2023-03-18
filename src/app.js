const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for express config
const staticFolder = path.join(__dirname, '../public'); //Join all arguments together and normalize the resulting path.
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = 3000;

//Setup hbs engine and customize the views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath); //views : default folder
hbs.registerPartials(partialsPath);

app.use(express.static(staticFolder)); //Setup Express to serve static assets

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Imadeddine',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Imadeddine',
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact',
    name: 'Imadeddine',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Imadeddine',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: 'Please provide an address for your research' });
  }

  geocode(address, (err, { longitude, latitude, location } = {}) => {
    if (err) return res.send({ error: err });

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) return res.send({ error: err });
      console.log(location);
      console.log(forecastData);
      res.send({
        location: location,
        forecast: forecastData,
        address: address,
      });
    });
  });
});
// res.send([{ location: 'Boston', forecast: 'forecast' }]);
// res.send(['andrew', 'andy']);

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Imadeddine',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Imadeddine',
    errorMessage: 'Page not found',
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
