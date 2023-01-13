const jwt = require('jsonwebtoken')
const config = require('../config/config')


var verificationLib = {

    verifyToken: function (req, res, next) {
        var bearerToken = req.headers['authorization']

        if (bearerToken && bearerToken.includes("Bearer")) {
            console.log(bearerToken);
            jwtToken = bearerToken.split(" ")[1];

            jwt.verify(jwtToken, config.secretKey, function (err, decoded) {
                if (err) {
                    res.status(403);
                    res.send(`{"Message": "Not Authorized"}`);
                } 
                else {
                    req.role = decoded.role;
                    req.userid = decoded.userid;
                    req.username = decoded.username;
                    next()
                }
            });
        }
        else {
            res.status(403);
            res.send(`{"Message": "Not Authorized"}`)
        }
    }
}



module.exports = verificationLib;