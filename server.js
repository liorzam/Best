

var express = require('express');

var env = 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')(config);

require('./server/config/routes')(app, config, config.encrypt);

var server = app.listen(config.port);

console.log('Listening on port ' + config.port + '...');