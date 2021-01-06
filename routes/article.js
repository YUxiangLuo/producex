const fs = require("fs");
const midwares = require("../midwares/midwares");
const { fileExist } = require("../utils");

module.exports = async (req, res) => {
    const method = req.method;
    let route = req.url;
    const last_path = route.substr(route.lastIndexOf("/")+1);
    if(method==="GET"&&route.endsWith(".html")) {
        if(await fileExist("db/htmls/"+last_path)) {
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            fs.createReadStream("db/htmls/"+last_path).pipe(res);
        } else {
            res.statusCode = 404;
            res.end("404 NOT FOUND");
        }
            
    }else if(method==="GET"&&route==="/articles/new") {
        if(midwares.check_authorization_midware(req, res)) {
            fs.createReadStream("pages/new_article.html").pipe(res);
        }
    }else if(method==="POST"&&route==="/articles/") {
        if(midwares.check_authorization_midware(req, res)) {
            await midwares.parse_body_midware(req);
            console.log(req.body);
            res.end("ADD POST");
        }
    }else {
        if(midwares.check_authorization_midware(req, res)) {
            res.end("OTHER METHOD");
        }
    }
}