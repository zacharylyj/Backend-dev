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
                var sql = "update actor set first_name=?, last_name=? where actor_id=?";
                dbConn.query(sql, [first_name, last_name, actor_id], function (err, results) {
                    dbConn.end();
                    return callback(err, results);

                });
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////
    //5th endpoint
    deleteActor: function (actor_id, callback){
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
        if (err) {
            return callback(err, null);
        }
        else {
            var sql = "update actor set first_name=?, last_name=? where actor_id=?";
            dbConn.query(sql, [first_name, last_name, actor_id], function (err, results) {
                dbConn.end();
                return callback(err, results);
            });
        }
    });
}








}
module.exports = user;