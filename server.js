// DEPENDENCIES
var express = require('express');
var app = express();

var port = process.env.PORT || process.argv[2] || 8080;

app.use(express.static('public'));

app.listen(port);
console.log(`I can hear you on port ${port}!`);
