/**
 * @author Sebastián Daniel Tamayo Guzmán
 * @since 16/04/2021
 * @desc Basic web page server.
 */

'use strict';

const EXPRESS = require('express');
const PATH = require('path');
const APP = EXPRESS();

// Set the port
APP.set('port', 8080);

// Tell express which folder contains our static assets
APP.use(EXPRESS.static(PATH.join(__dirname, './assets')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
  console.log('The server is running. Port:' + APP.get('port'));
});