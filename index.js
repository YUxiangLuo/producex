const http = require("http");
const routes = require("./routes/routes");
const midwares = require("./midwares/midwares");

const server = http.createServer(async (req, res) => {
    let route = req.url;
    if(route.includes("/public/")) route = "PUBLIC";
    if(route.includes("/articles/")) route = "ARTICLE";
    switch (route) {
        case "ARTICLE":
            routes.article_route(req, res);
            break;
        case "PUBLIC":
            routes.public_route(req, res);
            break;
        case "/":
            routes.home_route(res);
            break;
        case "/login":
            routes.login_route(req, res);
            break;
        case "/admin":
            if(midwares.check_authorization_midware(req, res)) {
                routes.admin_route(res);
            }
            break;
        case "/favicon.ico":
            routes.favicon_route(res);
            break;
        default:
            res.statusCode = 404;
            res.end("404 NOT FOUND");
            break;
    }
});

server.listen(3000, () => {
    console.log("listen on http://localhost:3000");
});