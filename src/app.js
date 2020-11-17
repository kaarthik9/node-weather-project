const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getForecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Kaarthik'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App',
    name: 'Kaarthik'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    help_text: 'This is some helpful test',
    name: 'Kaarthik'
  });
})

app.get('/weather', (req, res) => {

  const location = req.query.address;

  if(!location) {
    return res.send({error: 'Please provide address'});
  }
  
  getForecast(location, (err, response) => {
    if (err) {
      return res.send({
        error: err
      })
    } else {
      return res.send({
        forecast: response.temperature + ' celcius',
        location,
        observationTime: response.observation_time,
        feelsLike: response.feelslike
      });
    }
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help article not found'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found',
    title: '404',
    name: 'Kaarthik'
  });
})

app.listen(port, () => {
  console.log('Listening')
})