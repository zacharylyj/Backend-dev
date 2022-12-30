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
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`)

        } else {
            if (results.length == 1) {
                res.status(200);
                res.type('application/json');
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
        res.type('application/json');
        res.send(`{"error_msg" : "Internal server error"}`);
    }

    userDB.getActors(limit, offset, function (err, results) {
        if (err) {
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`)

        } else {
            res.status(200);
            res.type('application/json');
            res.send(results)

        };
    });
});
//////////////////////////////////////////////////////////////////////////
//3rd endpoint
app.post('/actors', function (req, res) {

    if (req.body.first_name == null || req.body.last_name == null) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    userDB.addActor(req.body, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            res.status(201);
            res.type('application/json');
            res.send(`{"actor_id": "${results.insertId}"}`)
        }
    });
});
//////////////////////////////////////////////////////////////////////////
//4th endpoint
app.put('/actors/:id', function (req, res) {
    var actor_id = req.params.id;

    if (req.body.first_name == undefined && req.body.last_name == undefined) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
        return
    }
    userDB.updateActor(req.body, actor_id, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            if (results.affectedRows >= 1) {
                res.status(200);
                res.type('application/json');
                res.send(`{"success_msg": "record updated"}`)
            }

            else {
                res.status(204);
                res.send();
            };

        }
    });
});
//////////////////////////////////////////////////////////////////////////
//5th endpoint
app.delete('/actors/:id', function (req, res) {
    var actor_id = req.params.id;
    userDB.deleteActor(actor_id, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            if (results.affectedRows >= 1) {
                res.status(200);
                res.type('application/json');
                res.send(`{"success_msg": "actor deleted"}`)
            }
            else {
                res.status(204);
                res.send();
            };

        }
    });
});

//////////////////////////////////////////////////////////////////////////
//6th endpoint
app.get("/film_categories/:category_id/films", function (req, res) {
    const category_id = req.params.category_id;
    userDB.innerjoin(category_id, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ "Message": "internal server error" });
        } else {
            res.status(200);
            res.send(result);
        }
    });
});

//////////////////////////////////////////////////////////////////////////
//7th endpoint
app.get("/customer/:customer_id/payment", (req, res) => {
    let customer_id = req.params.customer_id;
    let { start_date, end_date } = req.query;
    let total = 0;
    userDB.innerjoin2(customer_id, start_date, end_date, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ Message: "Internal server error" });
        }

        for (let i = 0; i < result.length; i++) {
            total += parseFloat(result[i].amount);
        }

        return res.status(200).send({ rental: result, total: total.toFixed(2) });
    });
});

//////////////////////////////////////////////////////////////////////////
//8th endpoint
app.post('/customers', function (req, res) {

    if (req.body.store_id == null ||
        req.body.first_name == null ||
        req.body.last_name == null ||
        req.body.email == null ||
        req.body.address_line1 == null ||
        req.body.address_line2 == null ||
        req.body.district == null ||
        req.body.city_id == null ||
        req.body.postal_code == null ||
        req.body.phone == null
    ) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    if (results.length == 0) {
        res.status(409);
        res.type('application/json');
        res.send(`{“error_msg”: “email already exist”}`);
    }
    address = [req.body.address_line1, req.body.address_line2, req.body.district, req.body.city_id, req.body.postal_code, req.body.phone]
    userDB.addCustomer(
        req.body.store_id,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        address,
        function (err, results) {
            if (err) {
                res.status(500);
                res.type('application/json');
                res.send(`{"error_msg":"Internal server error"}`);
            }
            else {
                res.status(201);
                res.type('application/json');
                res.send(`{"customer_id": "${results.insertId}"}`)
            }
        });
});


module.exports = app;