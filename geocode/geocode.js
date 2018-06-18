const request = require('request');

var geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent( address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyB2aUdjfWWFLxbaiuGMOeEd8g7dcQKrABE`,
    json: true
  }, (error, response, body) => {
    //console.log(JSON.stringify(body, undefined, 2));
    if ( error ) {
      // console.log('Unable to connect to Google Servers.');
      callback('Unable to connect to Google Servers.');
    } else if ( body.status === 'ZERO_RESULTS' ) {
      // console.log('Unable to find that address');
      callback('Unable to find that address');
    } else if ( body.status === 'OK' ) {
      callback( undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
        /*  console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Lat: ${body.results[0].geometry.location.lat}`);
            console.log(`Long: ${body.results[0].geometry.location.lng}`); */
      });
      
    }
    
  });
};

module.exports.geocodeAddress = geocodeAddress;