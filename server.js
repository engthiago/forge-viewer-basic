var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
app.set('port', port);

app.use('/', express.static(__dirname + '/www'));
// app.use('/cube', express.static(__dirname + '/www/cube'));

app.listen(port, function(){
    console.log('Server is up on port ' + port);
});