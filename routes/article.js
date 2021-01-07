const fs = require("fs");
const querystring = require("querystring");
const crypto = require("crypto");
const midwares = require("../midwares/midwares");
const { fileExist, writeFile, readFile, unlink, rename } = require("../utils");


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
            let { title, path, markdowntext, htmltext } = querystring.parse(req.body);
            title = title.trim();
            path = path.trim();
            markdowntext = markdowntext.trim();
            if(title===""||path===""||markdowntext==="") {
                res.statusCode = 400;
                res.end("BAD REQUEST");
                return;
            }
            const article_temp = await readFile("pages/article.html");
            htmltext = article_temp.replace("@TITLE@", title).replace("@HTMLTEXT@", htmltext);

            path = encodeURIComponent(path);
            let id = crypto.createHash("sha1").update(title).digest("hex");
            let publish_time = new Date().getTime();
            let new_article = {
                id,
                title,
                path,
                publish_time
            }

            let list = JSON.parse(await readFile("db/list.json"));
            let dupi = list.findIndex(x => x.title===title);
            if(dupi!==-1) list.splice(dupi, 1);
            list.push(new_article)

            
            try {
                await Promise.all([
                    writeFile(`db/markdowns/${path}.md`, markdowntext),
                    writeFile(`db/htmls/${path}.html`, htmltext),
                    writeFile("db/new.list.json", JSON.stringify(list))
                ]); 
            } catch (error) {
                    fs.unlink(`db/markdowns/${path}.md`, (err) => {console.log(err)}),
                    fs.unlink(`db/htmls/${path}.html`, (err) => {console.log(err)}),
                    fs.unlink("db/new.list.json", (err) => {console.log(err)})
                    res.statusCode = 500;
                    res.end("error...");
                    return;
            }

            if(await fileExist("db/backup.list.json")) await unlink("db/backup.list.json");
            await rename("db/list.json", "db/backup.list.json");
            await rename("db/new.list.json", "db/list.json");
            res.setHeader("Location", `/articles/${path}.html`);
            res.statusCode = 301;
            res.end("redirect...");
        }
    }else if(method==="DELETE"&&route==="/articles/") {
        if(midwares.check_authorization_midware(req, res)) {
            await midwares.parse_body_midware(req);
            let { id } = querystring.parse(req.body);
            res.end(id);
        }
    }else {
        if(midwares.check_authorization_midware(req, res)) {
            res.end("OTHER METHOD");
        }
    }
}