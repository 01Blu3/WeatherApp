const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// render hbs site for dynamic pages
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: '01Blu3',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: '01Blu3',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: '01Blu3',
    q1: 'Who is website for?',
    a1: 'For anyone interested in local weather forecasts!',
  });
});

app.get('/weather', (req, res) => {
  address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Unable to find location. Try another search',
    });
  }

  geocode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) return res.send({ err });

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) return res.send({ err });

      res.send({
        forecast: forecastData.dayReport,
        location,
        address,
        airhum: forecastData.airhum,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errType: 'Help page article not found.',
    name: '01Blu3',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errType: 'Page not found.',
    name: '01Blu3',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
