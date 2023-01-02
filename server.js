//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var app = require('./controller/app');

var port = 8081;
var host = "localhost";

app.listen(port, host, function () {
    console.log(`Server hosted at http://${host}:${port}/`);
});