var app = require('./app');
const config = require('./config');

app.listen(config.port, function () {
  console.log('App is running on port ' + config.port + ' ...')
});