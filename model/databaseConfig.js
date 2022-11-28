//Class : DAAA/FT/1B/01
//Group : nil (no group)
//Admission Number : P2201861
//Name : Zachary Leong Yao Jie

var mysql = require('mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "bed_dvd_root",
            password: "pa$$woRD123",
            database: "bed_dvd_db",
            dateStrings: "true"
        });
        return conn;
    }
};
module.exports = dbconnect;

