module.exports = (req) => {
    return new Promise((resolve, reject) => {
        let body_data = "";
        req.on("data", (chunk) => {
            body_data+=chunk.toString();
        });
        req.on("end", () => {
            req.body = body_data;
            resolve(true);
        });
    })
}