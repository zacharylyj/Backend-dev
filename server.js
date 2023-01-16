//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var express = require('express');
var serveStatic = require('serve-static');
var app = require('./controller/app');

var port = 8081;
var host = "localhost";

app.use(serveStatic(__dirname + '/public')); 


app.listen(port, host, function () {
    console.log(`Server hosted at http://${host}:${port}/`);
});