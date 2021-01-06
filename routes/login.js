const fs = require("fs");
const querystring = require("querystring");
const crypto = require("crypto");
const midwares = require("../midwares/midwares");
const config = require("../config");
const hash = crypto.createHash('sha256').update(config.secret).digest('hex');

module.exports = async (req, res) => {
    const method = req.method;
    if(method==="GET") {
        fs.createReadStream("pages/login.html").pipe(res);
    }else if(method==="POST") {
        await midwares.parse_body_midware(req);
        let { username, password } = querystring.parse(req.body);
        if(username===config.username&&password===config.password) {
            res.setHeader("Set-Cookie", "authorized=true|"+hash);
            res.setHeader("Cache-Control", "max-age=259200");
            res.statusCode = 301;
            res.setHeader("Location", "/admin");
            res.end("signed in, redirect now...");
        }else {
            res.end("username and password not match...");
        }
    }else {
        res.statusCode = 400;
        res.end("Wrong method: " + method);
    }
}