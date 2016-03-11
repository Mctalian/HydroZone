// DEPENDENCIES
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.all('*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port);
console.log(`I can hear you on port ${port}!`);

module.exports.port = port;
