

window.addEventListener("load", function() {
    
    function hideElement(s) { Array.from(document.querySelectorAll(s)).forEach( i => i.classList.add("hidden-item")) }
    function startPresentation() {
        btn.remove();
        setTimeout(() => msg.style.opacity = "0", 100);
        msg.addEventListener("transitionend", ()=>{ msg.remove(); });
        [".auto-heading", ".article > p", ".article > .fine", ".image-span img", ".captioned-gallery figure", "li", ".auto-table", ".auto-table td"].forEach(
            e => hideElement(e)
        )
        
        const pageElements = Array.from(document.querySelector(".article").getElementsByClassName("hidden-item"));
        
        let n = 0;
        function keyControl(e) {
            if (n < pageElements.length) {
                if (e.keyCode == 70) {
                    pageElements[n++].classList.remove("hidden-item");
                }
                else if (e.keyCode == 68) {
                    pageElements[--n].classList.add("hidden-item");
                }
            }
        }
        window.addEventListener("keydown", keyControl);
    }
    
    let article = document.querySelector(".article");
    let msg = article.parentNode.insertBefore(document.createElement("div"), article);
    msg.style = "margin-top: 1em; display:block; color:var(--grey-5) !important; font-family: sans-serif; padding: 0.1em 0.5em; font-size: 2rem; transition: opacity 1s; opacity: 1; text-align: center;"
    msg.innerHTML = "This is a presentation. Press F to go foward, D to go back.";
    
    let btn = article.parentNode.insertBefore(document.createElement("div"), article);
    btn.innerHTML = '<input type="button" value="start" style="margin:1em auto; display:block; padding:2px 5px; cursor:pointer;">';
    btn.addEventListener("click",startPresentation);
})



