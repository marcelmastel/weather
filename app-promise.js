const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: ['address', 'indirizzo'],
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias( {'help': ['h', 'g']} )
  .argv;

  var encodedAddress = encodeURIComponent( argv.address);
  var geocodeAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyB2aUdjfWWFLxbaiuGMOeEd8g7dcQKrABE`;

  axios.get(geocodeAddress).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find tht address.');
    } 
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/96ee862ad02aeb995f8150e609978617/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
  }).catch( (e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Enable to connect to API servers.');  
    } else {
      console.log(e.message);
    }
  }); 