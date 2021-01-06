const fs = require("fs");
const { fileExist } = require("../utils");

module.exports = async (req, res) => {
    const method = req.method;
    let route = req.url;
    const last_path = route.substr(route.lastIndexOf("/")+1);
    if(method==="GET") {
        if(route.includes("/css/")) {
            if(await fileExist("public/css/"+last_path)) {
                res.setHeader("Content-Type", "text/css");
                res.setHeader("Cache-Control", "max-age=86400");
                fs.createReadStream("public/css/"+last_path).pipe(res);
            } else {
                res.statusCode = 404;
                res.end("404 NOT FOUND");
            }
        }else if(route.includes("/js/")) {
            if(await fileExist("public/js/"+last_path)) {
                res.setHeader("Content-Type", "text/javascript");
                res.setHeader("Cache-Control", "max-age=86400");
                fs.createReadStream("public/js/"+last_path).pipe(res);
            } else {
                res.statusCode = 404;
                res.end("404 NOT FOUND");
            }
        }else if(route.includes("/image/")) {
            if(await fileExist("public/image/"+last_path)) {
                res.setHeader("Cache-Control", "max-age=86400");
                fs.createReadStream("public/image/"+last_path).pipe(res);
            } else {
                res.statusCode = 404;
                res.end("404 NOT FOUND");
            }
        }else {
            if(await fileExist("public/"+last_path)) {
                res.setHeader("Cache-Control", "max-age=86400");
                fs.createReadStream("public/"+last_path).pipe(res);
            } else {
                res.statusCode = 404;
                res.end("404 NOT FOUND");
            }
        }
    }else {
        res.statusCode = 403;
        res.end("BAD REQUEST");
    }
}