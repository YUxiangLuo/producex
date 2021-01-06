const { readFile } = require("../utils");

module.exports = async (res) => {
    let html = await readFile("pages/home.html");
    let list = JSON.parse(await readFile("db/list.json"));

    let list_html = "";

    for (const a of list) {
        list_html += `<a href="/articles/${a.file_name}">${a.title}</a><br>`;
    }

    res.end(html.replace("@LIST_HTML@", list_html));
}