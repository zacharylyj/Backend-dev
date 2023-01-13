//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var express = require('express');
var bodyParser = require('body-parser');
var userDB = require('../model/user');
var verificationLib = require('../auth/verifyToken');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());
//////////////////////////////////////////////////////////////////////////
//login
app.post('/user', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    userDB.loginUser(email, password, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);

        } else {
            if (results.length == 1) {
                res.status(200);
                res.type('application/json');
                res.send(results);
            }
            else {
                res.status(200);
                res.type('application/json');
                res.send(results);
            }
        }
    });
});

//////////////////////////////////////////////////////////////////////////
//1st endpoint
app.get('/actors/:id', verificationLib.verifyToken, function (req, res) {
    var actor_id = req.params.id;
    userDB.getActor(actor_id, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);

        } else {
            if (results.length == 1) {
                res.status(200);
                res.type('application/json');
                res.send[0];
                res.send(results[0]);
            }
            else {
                res.status(204);
                res.send();
            }
        }
    });
});

//////////////////////////////////////////////////////////////////////////
//2nd endpoint
app.get('/actors', function (req, res) {
    var limit = req.query.limit;
    var offset = req.query.offset;

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
            res.send(`{"error_msg":"Internal server error"}`);

        } else {
            res.status(200);
            res.type('application/json');
            res.send(results);

        }
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
            res.send(`{"actor_id": "${results.insertId}"}`);
        }
    });
});
//////////////////////////////////////////////////////////////////////////
//4th endpoint
app.put('/actors/:id', function (req, res) {
    var actor_id = req.params.id;

    if (Object.keys(req.body.first_name).length == 0 && Object.keys(req.body.last_name).length == 0) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    userDB.updateActor(req.body, actor_id, function (err, results) {
        if (err) {
            console.log(err);
            res.type('application/json');
            res.send(`{"error_msg":"Internal server error"}`);
        }
        else {
            if (results.affectedRows >= 1) {
                res.status(200);
                res.type('application/json');
                res.send(`{"success_msg": "record updated"}`);
            }

            else {
                res.status(204);
                res.send();
            }

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
                res.send(`{"success_msg": "actor deleted"}`);
            }
            else {
                res.status(204);
                res.send();
            }

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
            res.send({ "Message": "Internal server error" });
        } else {
            res.status(200);
            res.send(result);
        }
    });
});

//////////////////////////////////////////////////////////////////////////
//7th endpoint
app.get("/customer/:customer_id/payment", function (req, res) {
    let customer_id = req.params.customer_id;
    let { start_date, end_date } = req.query;
    let total = 0;
    userDB.innerjoin2(customer_id, start_date, end_date, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ "Message": "Internal server error" });
        }

        for (let i = 0; i < result.length; i++) {
            total += parseFloat(result[i].amount);
        }
        res.status(200);
        return res.send({ rental: result, total: total.toFixed(2) });
    });
});

//////////////////////////////////////////////////////////////////////////
//8th endpoint
app.post('/customers', function (req, res) {
    if (req.body.address2 == undefined) {
        var address2 = null;
    }
    else {
        address2 = req.body.address.address_line2;
    }
    if (req.body.store_id == null ||
        req.body.first_name == null ||
        req.body.last_name == null ||
        req.body.email == null ||
        req.body.address.address_line1 == null ||
        req.body.address.district == null ||
        req.body.address.city_id == null ||
        req.body.address.postal_code == null ||
        req.body.address.phone == null
    ) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }
    addressList = [req.body.address.address_line1, address2, req.body.address.district, req.body.address.city_id, req.body.address.postal_code, req.body.address.phone];
    userDB.addCustomer(
        req.body.store_id,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        addressList,
        function (err, results) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(409);
                    res.type('application/json');
                    res.send(`{"error_msg":"data already exists"}`);
                } else {
                    res.status(500);
                    res.type('application/json');
                    res.send(`{"error_msg":"Internal server error"}`);
                }
            }
            else {
                res.status(201);
                res.type('application/json');
                res.send(`{"customer_id": "${results.insertId}"}`);
            }
        });
});

//////////////////////////////////////////////////////////////////////////
//9th endpoint
app.post('/staff/store', function (req, res) {
    if (req.body.first_name == null ||
        req.body.last_name == null ||
        req.body.address_id == null ||
        req.body.email == null ||
        req.body.store_id == null ||
        req.body.active == null ||
        req.body.username == null ||
        req.body.password == null
    ) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }


    var usernamelen = Object.keys(req.body.username).length;
    var passwordlen = Object.keys(req.body.password).length;

    function checkun(username) {
        const unRegex = /^[a-zA-Z0-9]+$/;
        return unRegex.test(username);
    }
    function checkpw(password) {
        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/;
        return pwRegex.test(password);
    }
    if (usernamelen < 3) {
        res.status(422);
        res.type('application/json');
        res.send(`{"username_error":"Username needs to have 3 or more characters"}`);
    }
    else if (!(checkun(req.body.username))) {
        res.status(422);
        res.type('application/json');
        res.send(`{"username_error":"Only number and letters are allowed"}`);
    }
    else if (passwordlen < 8) {
        res.status(422);
        res.type('application/json');
        res.send(`{"password_error":"Password needs to have 8 or more characters"}`);
    }
    else if (!(checkpw(req.body.password))) {
        res.status(422);
        res.type('application/json');
        res.send(`{"password_error":"At least 1 Upper, Lower & Special Characters are required."}`);
    }


    else {
        userDB.addStaff(req.body.first_name, req.body.last_name, req.body.address_id, req.body.email, req.body.store_id, req.body.active, req.body.username, req.body.password, function (err, results) {
            if (err) {
                if (err.message === 'Email already in use') {
                    res.status(409);
                    res.type('application/json');
                    res.send(`{"error_msg": "data already exists"}`);
                } else {
                    res.status(500);
                    res.type('application/json');
                    res.send(`{"error_msg": "Internal server error"}`);
                }
            }
            else {
                res.status(201);
                res.type('application/json');
                res.send(`{"New staff_id": "${results.insertId}"}`);
            }
        });
    }
});

//////////////////////////////////////////////////////////////////////////
//10th endpoint
app.post('/flim/inventory', function (req, res) {
    if (req.body.original_language_id == undefined) {
        var original_language_id = null;
    } else {
        original_language_id = req.body.original_language_id;
    }
    if (req.body.title == null ||
        req.body.description == null ||
        req.body.release_year == null ||
        req.body.language_id == null ||
        req.body.rental_duration == null ||
        req.body.rental_rate == null ||
        req.body.length == null ||
        req.body.replacement_cost == null ||
        req.body.rating == null ||
        req.body.special_features == null
    ) {
        res.status(400);
        res.type('application/json');
        res.send(`{"error_msg":"missing data"}`);
    }

    userDB.addflim(req.body.title, req.body.description, req.body.release_year, req.body.language_id, original_language_id, req.body.rental_duration, req.body.rental_rate, req.body.length, req.body.replacement_cost, req.body.rating, req.body.special_features, req.body.inventory, function (err, results) {
        if (err) {
            if (err.message === 'Title in use') {
                res.status(409);
                res.type('application/json');
                res.send(`{"error_msg":"Movie Title already exists"}`);
            } else {
                res.status(500);
                res.type('application/json');
                res.send(`{"error_msg":"Internal server error"}`);
            }
        }
        else {
            var inventory = req.body.inventory;
            res.status(201);
            res.type('application/json');
            var strsend = `{{"flim_id": "${results.insertId}"}{`;
            for (let i = 0; i < inventory.length; i++) {
                strsend += `"Store_id: ${inventory[i][0]} | added ${inventory[i][1]} new dvd" \n\t\t`;

            }
            strsend += `}`;
            res.send(strsend);


        }
    });

});

module.exports = app;