var app = require('./app');
const config = require('./config');

// app.listen(config.port, function () {
//   console.log('App is running on port ' + config.port + ' ...')
// });

app.listen(process.env.PORT || 3000, function () {
  console.log('App is running ...')
});