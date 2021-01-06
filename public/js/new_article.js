console.log("this is new article edit page");
let markdown_text = document.getElementById("markdowntext");
let html_text = document.getElementById("htmltext");

console.log(markdown_text, html_text);

markdown_text.addEventListener("input", () => {
    console.log("change change");
    html_text.value = marked(markdown_text.value);
})