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
                return callback(err, null);
            }
            else {
                var sql = "delete from actor where actor_id=?";
                dbConn.query(sql, [actor_id], function (err, results) {
                    dbConn.end();
                    return callback(err, results);
                });
            }
        });
    }








}
module.exports = user;