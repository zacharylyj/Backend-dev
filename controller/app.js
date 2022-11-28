//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var express = require('express');
var bodyParser = require('body-parser');
var userDB = require('../model/user');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////
//1st endpoint
app.get('/actors/:id', function (req, res) {
    var actor_id = req.params.id;
    userDB.getActor(actor_id, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"error_msg":"Internal server error"}`)

        } else {
            if (results.length == 1) {
                res.status(200);
                res.type('json');
                res.send[0];
                res.send(results[0]);
            }

            else {
                res.status(204);
                res.send();
            };
        };
    });
});
//////////////////////////////////////////////////////////////////////////
//3rd endpoint
app.post('/actors', function (req, res) {

    if (req.body.first_name == null || req.body.last_name == null) {
        res.status(400);
        res.type('json');
        res.send(`{"error_msg":"missing data"}`);
    }
    userDB.addActor(req.body, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            res.status(201);
            res.type('json');
            res.send(`{"actor_id": "${results.insertId}"}`);
        }
    });
});
module.exports = app;