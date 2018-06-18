const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

  // console.log(argv);

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if ( errorMessage ) {
    console.log('Unable to connect to Google Servers.');
  } else {
    console.log(JSON.stringify(results, undefined, 2));
    weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
      if ( errorMessage ) {
        console.log('Unable to connect to Google Servers.');
      } else {
        console.log(`It's currently ${results.temperature}. It feels like ${results.apparentTemperature}`);
      }
    });
  }
});

