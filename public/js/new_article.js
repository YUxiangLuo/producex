console.log("this is new article edit page");
let markdown_text = document.getElementById("markdown-text");
let html_text = document.getElementById("html-text");

console.log(markdown_text, html_text);

markdown_text.addEventListener("input", () => {
    console.log("change change");
    console.log(markdown_text.value);
    html_text.value = markdown_text.value;
})