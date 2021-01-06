const querystring = require("querystring");
const crypto = require("crypto");
const { secret } = require("../config");
const hash = crypto.createHash('sha256').update(secret).digest('hex');

module.exports = (req, res) => {
    let cookie_text = req.headers.cookie;
    if(cookie_text) {
        let cookie = querystring.parse(cookie_text.replace("; ", "&"));
        if(cookie.authorized!==`true|${hash}`) {
            res.statusCode = 403;
            res.end("permission denied");
            return false;
        }else {
            return true;
        }
    }else {
        res.statusCode = 403;
        res.end("permission denied");
        return false;
    }
}