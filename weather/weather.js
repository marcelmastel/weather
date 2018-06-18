const request = require('request');



var getWeather = (lat, lng, callback) => {
  
  request({
    url: `https://api.darksky.net/forecast/96ee862ad02aeb995f8150e609978617/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if ( error ) {
      callback('Unable to connect to Google Servers.');
    } else if ( response.statusCode === 400 ) {
      callback('Unable to fetch weather');
    } else if ( response.statusCode === 200 ) {
      callback( undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
      
    }
    
  });
};

module.exports.getWeather = getWeather;