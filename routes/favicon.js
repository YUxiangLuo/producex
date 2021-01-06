const fs = require("fs");

module.exports = (res) => {
    try {
        res.setHeader("Content-Type", "image/x-icon");
        res.setHeader("Cache-Control", "public, max-age=691200");
        fs.createReadStream("favicon.ico").pipe(res);
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end("503");
    }
}