var app = require('./controller/app');

var port = 8081;
var host = "localhost";

app.listen(port, host, function () {
    console.log(`server hosted at http://${host}:${port}/actors`);

})