const request = require('request');

function getForecast(location, callback) {
  
  const url = `http://api.weatherstack.com/current?access_key=727998673ce1cbb2d6b2b2d96b5604ef&query=${location}`

  request({url, json: true}, (err, {body}) => {
    if(err) {
      callback('unable to connect', undefined);
    } else if(body.error) {
      callback('Invalid search query', undefined);
    } else {
      callback(undefined, body.current)
    }
  })
}

module.exports = getForecast;