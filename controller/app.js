var express = require('express');
var bodyParser = require('body-parser');
var userDB = require('../model/user');
var app = express()

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
                res.send[0]
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
//2nd endpoint
app.get('/actors', function (req, res) {
    var limit = req.query.limit;
    var offset = req.query.limit;

    limit = limit ? parseInt(limit) : 20;
    offset = offset ? parseInt(offset) : 0;

    if (isNaN(limit) || isNaN(offset)) {
        res.status(500);
        res.type('json');
        res.send(`{"error_msg" : "Internal server error"}`);
    }

    userDB.getActors(limit, offset, function (err, results) {
        if (err) {
            res.status(500);
            res.type('json');
            res.send(`{"error_msg":"Internal server error"}`)

        } else {
            res.status(200);
            res.type('json');
            res.send(results)

        };
    });
});
//////////////////////////////////////////////////////////////////////////
//3rd endpoint
app.post('/actors', function (req, res) {

    if (req.body.first_name == null || req.body.last_name == null) {
        res.status(400);
        res.type('json');
        res.send(`{"error_msg":"missing data [key]"}`);
    }
    userDB.addActor(req.body, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"error_msg":"Error ocurred"}`);
        }
        else {
            res.status(201);
            res.type('json');
            res.send(`{"actor_id": "${results.insertId}"}`)
        }
    });
});
module.exports = app;