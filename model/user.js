//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var dbConfig = require('./databaseConfig');
//////////////////////////////////////////////////////////////////////////
//1st endpoint
var user = {
    getActor: function (actor_id, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {

                var sql = "select actor_id, first_name, last_name from actor where actor_id=?";
                dbConn.query(sql, [actor_id], function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //2nd endpoint
    getActors: function (limit, offset, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {

                var sql = "select actor_id, first_name, last_name from actor limit ? offset ?"
                dbConn.query(sql, [limit, offset], function (err, results) {
                    dbConn.end();
                    return callback(err, results)

                });
            };
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //3rd endpoint
    addActor: function (object, callback) {
        var dbConn = dbConfig.getConnection();
        var { first_name, last_name } = object;
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                var sql = "insert into actor(first_name, last_name) Values(?,?)";
                dbConn.query(sql, [first_name, last_name], function (err, results) {

                    dbConn.end();
                    return callback(err, results);


                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //4th endpoint
    updateActor: function (object, actor_id, callback) {
        var dbConn = dbConfig.getConnection();
        var { first_name, last_name } = object;
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                if (last_name == undefined) {
                    var sql = "update actor set first_name=? where actor_id=?";
                    var params = [first_name, actor_id]
                }
                else if (first_name == undefined) {
                    var sql = "update actor set last_name=? where actor_id=?";
                    var params = [last_name, actor_id]
                }
                else {
                    var sql = "update actor set first_name=?, last_name=? where actor_id=?";
                    var params = [first_name, last_name, actor_id]
                }
                dbConn.query(sql, params, function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //5th endpoint
    deleteActor: function (actor_id, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                let sql = "delete from film_actor where actor_id = ?";
                dbConn.query(sql, [actor_id], (err, results) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                });
                let sql1 = "delete from actor where actor_id = ?";
                dbConn.query(sql1, [actor_id], (err, results) => {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    return callback(null, results);
                });
                dbConn.end();
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //6th endpoint
    innerjoin: function (customer_id, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                var sql = "select f.film_id, f.title, fc.category_id, f.rating, f.release_year, f.length as duration FROM film as f INNER JOIN film_category as fc ON f.film_id = fc.film_id INNER JOIN category as c ON fc.category_id = c.category_id where c.category_id =? LIMIT 3"
                dbConn.query(sql, [customer_id], function (err, results) {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    console.log(results);
                    return callback(null, results);
                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //7th endpoint
    innerjoin2: function (customer_id, start_date, end_date, callback) {
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            } else {
                var sql = "select f.title, p.amount, p.payment_date from film as f inner join inventory as i on f.film_id = i.film_id inner join rental as r on i.inventory_id = r.inventory_id inner join payment as p on r.rental_id = p.rental_id where p.customer_id = ? and p.payment_date between ? and ?"
                dbConn.query(sql, [customer_id, start_date, end_date], function (err, results) {
                    dbConn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    console.log(results);
                    return callback(null, results);
                });
            }
        });
    },

    //////////////////////////////////////////////////////////////////////////
    //8th endpoint
    addCustomer: function (store_id, first_name, last_name, email, addressList, callback) {
        var dbConn = dbConfig.getConnection();
        var [address, address2, district, city_id, postal_code, phone] = addressList;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                let sql = `insert into address (address, address2, district, city_id, postal_code, phone) VALUES (?,?,?,?,?,?)`;
                dbConn.query(sql, [address, address2, district, city_id, postal_code, phone], function (err, results) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    let sql1 = `insert into customer (store_id, first_name, last_name, email, address_id) VALUES (?,?,?,?,?)`;
                    let address_id = results.insertId;
                    dbConn.query(sql1, [store_id, first_name, last_name, email, address_id], function (err, results) {
                        dbConn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                        console.log(results);
                        return callback(null, results);
                    });
                });
            }
        });
    },
}
module.exports = user;