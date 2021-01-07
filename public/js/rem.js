
function setRem() {
    let w = window.innerWidth;
    if(w<=800) {
        let rem_px = (20*(w/800)) + "px";
        console.log(rem_px);
        document.documentElement.style.fontSize = rem_px;
    } 
}
setRem();

window.addEventListener("resize", setRem);