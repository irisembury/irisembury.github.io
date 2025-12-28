"use strict"
const HTML = document.documentElement;
const leftRightArrowsIconSvg = `<svg style="transform:rotate(90deg)" aria-hidden="true" focusable="false" class="octicon octicon-arrow-switch" viewBox="0 0 16 16" width="16" height="16" fill="currentcolor" display="inline-block" overflow="visible" style="vertical-align: text-bottom;"><path d="M5.22 14.78a.75.75 0 0 0 1.06-1.06L4.56 12h8.69a.75.75 0 0 0 0-1.5H4.56l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3a.75.75 0 0 0 0 1.06l3 3Zm5.56-6.5a.75.75 0 1 1-1.06-1.06l1.72-1.72H2.75a.75.75 0 0 1 0-1.5h8.69L9.72 2.28a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3Z"></path></svg>`;
const fontOptions = "Georgia,Lora,Roboto,Roboto Slab,Segoe UI,Trebuchet MS".split(",").map(o => `<option value="${ o }">${ o }</option>` );




window.addEventListener("load", function() {
    const index = document.getElementById("index") != null;
    const pathToRoot = index ? "" : "../../";
    document.head.innerHTML += "<link rel=\"stylesheet\" href=\"" + pathToRoot + "assets/fonts.css\">";
    
    document.body.innerHTML =
    `<nav class="main-nav no-select">
        <span><div class="page-name-display text-select"><a href="${ pathToRoot }index.html">Index</a> &#47; ${ document.title || "This page" }</div></span>
        ${ index ? "" : `<span class="hide-at-top"><span style="height: 9px; border-left: 1px solid currentcolor; display: inline-block;"></span></span> <a class="to-top-button hide-at-top">Jump to Top</a>` }
        <a style="margin-left:auto" class="gear-icon icon"><svg class="Xy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></a>
    </nav>
    <div class="c1">
        <div class="c3">
            <div id="article">${ document.body.innerHTML }</div>
            <div id="page-footer">${ index ? "" : `<div><a href="../../index.html">Link back to index (front page)</a></div>` }<div>Everything on this domain (irisembury.github.io) is my personal work (except for some images where otherwise stated). I have no association with any other person or organization.</div></div>
        </div>
        ${ HTML.classList.contains("include-toc") ? `<nav id="toc"></nav>` : "" }
    </div>
    <div class="menu hidden">
        <h3>Display preferences:</h3>
        <table>
            <tbody>
                <tr>
                    <td>Theme:</td>
                    <td>
                        <select class="menu-select" id="brightness-select">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        ${ index ? "" : `<hr><div class="menu-right"><label class="no-select" for="page-full-width">Full page width:</label><input type="checkbox" class="menu-checkbox" id="page-full-width"></div>` }
        ${ HTML.classList.contains("include-toc") ? `<div class="menu-right"><label for="show-toc">Show table of contents:</label><input type="checkbox" class="menu-checkbox" checked id="show-toc"></div>` : "" }
        <hr>
        <h3>Fonts override:</h3>
        <table id="fonts">
            <tbody>
                <tr><td>Headings:</td><td><select class="menu-select" id="heading-font-select">
                    <option value="Georgia Pro">Georgia Pro</option>
                    <option value="Lora">Lora</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Roboto Slab">Roboto Slab</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                </select></td></tr>
                <tr><td>Body:</td><td><select class="menu-select" id="body-font-select">
                    <option value="Georgia">Georgia Pro</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Roboto Slab">Roboto Slab</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                </select></td></tr>
                <tr><td>Tables:</td><td><select class="menu-select" id="table-font-select">
                    <option value="Roboto">Roboto</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                </select></td></tr>
            </tbody>
        </table>
        <div class="menu-right"><span class="pseudo-link" onclick="menuRestoreDefaults()">restore defaults</span></div>
        <hr>
        <span class="menu-bottom">These options are saved in session storage, not cookies, meaning they&rsquo;re cleared automatically when you close your browser.</span>
    </div>
    <div class="lb-container">
        <div id="lb-top-left"></div>
        <div class="lb-wrapper"><img id="lightbox"></div>
        <div class="lb-bottom-panel"><div id="lb-caption"></div></div>
    </div>
    <style id="user-styles"></style>`;

    HTML.classList.add("layout");
    Array.from(document.getElementById("fonts").getElementsByTagName("option")).forEach(o => o.style.fontFamily = `"${ o.value }",system-ui` );
    
    const article_ = document.getElementById("article");
    interpreter(article_);
    
    document.querySelector(".lb-wrapper").addEventListener("click", () => {
        setLightbox("close")
    })
    
    Array.from(document.getElementsByClassName("quote-expand")).forEach(quoteExpandElement => {
        quoteExpandElement.classList.add("collapsed")
        quoteExpandElement.title = "Click to expand";
        
        quoteExpandElement.addEventListener("click", function() {
            this.classList.remove("collapsed");
            quoteExpandElement.title = "";
        })
        let btnContainer = quoteExpandElement.appendChild(document.createElement("div"));
        btnContainer.innerHTML = `<div class="collapse-button-container"><input type="button" class="flat-button" value="minimize this"></div>`;
        btnContainer.querySelector(".flat-button").addEventListener("click", function(click) {
            quoteExpandElement.classList.add("collapsed");
            quoteExpandElement.title = "Click to expand";
            click.stopPropagation();
            if (quoteExpandElement.getBoundingClientRect().top + window.scrollY < pageYOffset) {
                quoteExpandElement.scrollIntoView({ behavior: "smooth" });
            }
        })
    })
    
    /* ---------------------- setting up menu: ---------------------- */
    const gearIcon = document.querySelector(".gear-icon");
    const menu = document.querySelector(".menu");
    
    function menuToggle(option) {
        if (option == "close" || option == "open") {
            menu.classList.toggle("hidden", option == "close");
        }
        else {
            menu.classList.toggle("hidden", !menu.classList.contains("hidden"));
        }
    }
    gearIcon.addEventListener("click", menuToggle);
    window.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !gearIcon.contains(e.target)) {
            menuToggle("close");
        }
    })
    
    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            menuToggle("close");
            setLightbox("close");
        }
    })

    /* ---- ---- ---- ---- ---- ---- ---- set-up for menu items: ---- ---- ---- ---- ---- ---- ---- */
    setBrightness();
    document.getElementById("brightness-select").addEventListener("change", function() {
        setBrightness(this.value);
    });
    updateFonts();
    document.getElementById("heading-font-select").addEventListener("change", function() {
        localStorage.setItem("headingFont", this.value);
        updateFonts();
    });
    document.getElementById("body-font-select").addEventListener("change", function() {
        localStorage.setItem("bodyFont", this.value);
        updateFonts();
    });
    document.getElementById("table-font-select").addEventListener("change", function() {
        localStorage.setItem("tableFont", this.value);
        updateFonts();
    });
    if (!index && localStorage.getItem(window.location.href + "-full-width") == "true") {
        HTML.classList.add("full-width");
        document.getElementById("page-full-width").checked = true;
    }
    if (!index) {
        document.getElementById("page-full-width").addEventListener("change", function() {
            HTML.classList.toggle("full-width", this.checked);
            localStorage.setItem(window.location.href + "-full-width", this.checked ? "true" : "false");
        });
    }
    /* ---- ---- ---- ---- ---- ---- ---- table of contents ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    if (HTML.classList.contains("include-toc")) {
        document.getElementById("show-toc").addEventListener("change", function() {
            if (this.checked) {
                HTML.classList.add("include-toc");
                window.addEventListener("scroll", tocHighlightUpdateAttempt);
            } else {
                HTML.classList.remove("include-toc");
                window.removeEventListener("scroll", tocHighlightUpdateAttempt);
            }
        });
        const toc = document.getElementById("toc");
        const headings = Array.from(document.getElementById("article").getElementsByClassName("--for-toc"));
        toc.innerHTML = `<h3>Table of contents</h3><div class="toc-row"><a onclick="scrollToTop()" style="cursor: pointer;">(Top)</a></div>` + headings.slice(1).map ( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join("");
        
        const rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
        let lastHeading = -1;
        
        let canTocHighlightUpdate = true;
        function tocHighlightUpdateAttempt() {
            if (!canTocHighlightUpdate) { return; }
            canTocHighlightUpdate = false;
            setTimeout(() => {
                canTocHighlightUpdate = true;
                tocHighlightUpdate();
            }, 500);
            tocHighlightUpdate();
        }
        function tocHighlightUpdate() {
            let currentHeading = -1;
            for (let i = 0; i < headings.length; i += 1) {
                let elementDistanceFromPageTop = window.scrollY + headings[i].getBoundingClientRect().top;
                if (pageYOffset < elementDistanceFromPageTop - (0.4 * window.innerHeight)) {
                    break;
                }
                // if (pageYOffset < headings[i].offsetTop - (0.4 * window.innerHeight)) {
                    // break;
                // }
                currentHeading = i;
            }
            if (currentHeading != lastHeading) {
                rowsInToc.forEach( (row, n) => {
                    if (n == currentHeading) {
                        row.classList.add("active-heading");
                        let rRect = row.getBoundingClientRect();
                        let tRect = toc.getBoundingClientRect();
                        if (rRect.bottom + 20 > tRect.bottom) {
                            toc.scrollTo(
                                { top: row.offsetTop + row.offsetHeight - toc.clientHeight + 20, behavior: "smooth" }
                            );
                        }
                        /* To make it also scroll up: */
                        /*
                        else if (rRect.top < tRect.top) {
                            toc.scrollTo(
                                { top: row.offsetTop, behavior: "smooth" }
                            );
                        }
                        */
                    }
                    else {
                        row.classList.remove("active-heading");
                    }
                })
            }
            lastHeading = currentHeading;
        }
        
        /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
        let canTocFadeCheck = true;
        function tocFadeCheck() {
            if (canTocFadeCheck) {
                canTocFadeCheck = false;
                setTimeout(() => {
                    canTocFadeCheck = true;
                    toc.classList.toggle("hide-mask", (toc.scrollTop + 30 > toc.scrollHeight - toc.offsetHeight));
                }, 250);
                toc.classList.toggle("hide-mask", (toc.scrollTop + 30 > toc.scrollHeight - toc.offsetHeight));
            }
        }
        toc.addEventListener("resize", tocFadeCheck);
        toc.addEventListener("scroll", tocFadeCheck);
        window.addEventListener("scroll", tocHighlightUpdateAttempt);
        setTimeout(() => {
            tocHighlightUpdateAttempt();
        }, 100);
    }
    /* ---- ---- ---- ---- ---- /table of contents ---- ---- ---- ---- ---- ---- ---- */

    if (!document.getElementById("index")) {
        document.querySelector(".to-top-button").addEventListener("click", scrollToTop);
    }
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    const mainNav = document.querySelector(".main-nav");
    let canNavStickyCheck = true;
    function navStickyCheck() {
        if (canNavStickyCheck) {
            canNavStickyCheck = false;
            setTimeout(() => {
                canNavStickyCheck = true;
                mainNav.classList.toggle("sticky-active", pageYOffset > 180);
            }, 333);
            mainNav.classList.toggle("sticky-active", pageYOffset > 180);
        }
    }
    navStickyCheck();
    window.addEventListener("scroll", navStickyCheck);
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */

    if (document.title == "") {
        document.title = "Iris Embury";
    } else if (!document.title.endsWith("Iris Embury")) {
        document.title += " | Iris Embury";
    }
})

function scrollToTop() {
    window.scrollTo({ behavior: "instant", top: 0 });
    history.replaceState(null, "", window.location.pathname + window.location.search);
    let toc = document.getElementById("toc");
    if (toc) {
        toc.scrollTo({ behavior: "instant", top: 0 });
    }
    
}

function setLightbox(action) {
    let lightbox = document.getElementById("lightbox");
    if (action == "close") {
        lightbox.src = "";
        lightbox.alt = "";
        HTML.classList.remove("lb-enabled");
    }
    else {
        let lbTopLeft = document.getElementById("lb-top-left");
        let lbCaption = document.getElementById("lb-caption");
        lightbox.src = action.src;
        lightbox.alt = action.alt;
        HTML.classList.add("lb-enabled");
        lbTopLeft.innerHTML = `<a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        if (action.alt == "") {
            lbCaption.innerHTML = "";
        } else {
            lbCaption.innerHTML = action.alt;
        }
    }
}

/* -------------------------------- menu preference setters -------------------------------- */
function setBrightness(setValue) {
    let brightness = setValue || localStorage.getItem("brightness") || "light";
    HTML.classList.remove(...Array.from(document.getElementById("brightness-select").children).map(o => o.value).filter(o => o != brightness));
    HTML.classList.add(brightness);
    localStorage.setItem("brightness", brightness);
    document.getElementById("brightness-select").value = brightness;
}
function updateFonts() {
    let headingFont = localStorage.getItem("headingFont") || "Lora";
    let bodyFont = localStorage.getItem("bodyFont") || "Georgia";
    let tableFont = localStorage.getItem("tableFont") || "Roboto";
    document.getElementById("heading-font-select").value = headingFont;
    document.getElementById("body-font-select").value = bodyFont;
    document.getElementById("table-font-select").value = tableFont;
    document.getElementById("user-styles").innerHTML = `body {
        --ff-heading: ${ headingFont=="Georgia" ? "Georgia Pro,Georgia":headingFont },sans-serif;
        --ff-article: ${ bodyFont=="Georgia" ? "Georgia Pro Digits,Georgia":bodyFont },sans-serif;
        --ff-table: ${ tableFont=="Georgia" ? "Georgia Pro Digits,Georgia":tableFont },sans-serif;
        ${ headingFont=="Georgia" ? "--fw-h1: 600; --fw-h2: 600;" :"" }
    }`;
}
function menuRestoreDefaults() {
    localStorage.setItem("headingFont", "Lora");
    localStorage.setItem("bodyFont", "Georgia");
    localStorage.setItem("tableFont", "Roboto");
    updateFonts();
}
/* ------------------------------- main interpreter for article content ------------------------------- */
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
        return;
    }
    let input = argValue.replace(/\n\n+/g, "\n\n")
        .replace(/\r/g, "") /* for safety, probably no effect */
        .trim()
        .split("\n\n");

    let tableNum = 1;
    let galleryNum = 1;
    let linkNum = 1;
    let firstParagraph = true;
    let firstHeading = true;
    
    input = input.map( chunk => {
    
        if (chunk.startsWith("\\")) {
            return chunk.slice(1);
        }
        if (chunk == "---") {
            return "<hr>";
        }
        
        /* ------------------------------------ images ------------------------------------ */
        if (chunk.startsWith("||image-float-left")) {
            /* imgUrl | caption | alt-text/title */
            const lines = chunk.split("\n").slice(1).map( line => {
                const parts = line.split("|");
                while (parts.length < 3) {
                    parts.push("");
                }
                const imgUrl = parts[0].trim();
                let figCaption = textFormat(parts[1].trim());
                let altText = textFormat(parts[2].trim().replace(/"/g,"&quot;"));
                if (figCaption && !altText) { altText = figCaption }
                if (figCaption) { figCaption = `<figcaption>${ figCaption }</figcaption>`; }
                
                return `<figure><img onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }">${ figCaption }</figure>`;
            });
            return `<div class="image-float left">${ lines.join("") }</div>`;
        }
        if (chunk.startsWith("||image-float")) {
            /* imgUrl | caption | alt-text/title */
            const lines = chunk.split("\n").slice(1).map( line => {
                const parts = line.split("|");
                while (parts.length < 3) {
                    parts.push("");
                }
                const imgUrl = parts[0].trim();
                let figCaption = textFormat(parts[1].trim());
                let altText = textFormat(parts[2].trim().replace(/"/g,"&quot;"));
                if (figCaption && !altText) { altText = figCaption }
                if (figCaption) { figCaption = `<figcaption>${ figCaption }</figcaption>`; }
                
                return `<figure><img onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }">${ figCaption }</figure>`;
            });
            return `<div class="image-float">${ lines.join("") }</div>`;
        }

        if (chunk.startsWith("||image-span")) {
            /* ||image-span maxHeight */
            /* imgUrl | alt-text/title */
            const rows = chunk.split("\n");
            let homeRow = rows.shift().substring("||image-span".length).trim();
            const galleryFigures = rows.map( line => {
                const parts = line.split("|");
                while (parts.length < 2) {
                    parts.push("");
                }
                let imgUrl = parts[0].trim();
                let altText = textFormat(parts[1].trim().replace(/"/g,"&quot;"));
                return `<div><img style="max-height: ${homeRow || 300}px;" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }"></div>`;
            });
            return `<div class="image-span">${ galleryFigures.join("") }</div>`;
        }

        if (chunk.startsWith("||gallery")) {
            /* ||image-span maxHeight */
            /* imgUrl | caption | alt-text/title */
            const rows = chunk.split("\n");
            let homeRow = rows.shift().substring("||gallery".length).trim();
            let galleryFigures = rows.map( line => {
                const parts = line.split("|");
                while (parts.length < 3) {
                    parts.push("");
                }
                let imgUrl = parts[0].trim();
                let caption = textFormat(parts[1].trim());
                let altText = textFormat(parts[2].trim().replace(/"/g,"&quot;"));
                return `
                <figure>
                <img style="max-height: ${ homeRow || 300 }px;" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }">
                <figcaption>${ caption }</figcaption>
                </figure>
                `;
            });
            return `<div class="captioned-gallery">${ galleryFigures.join("") }</div>`;
        }

        if (chunk.startsWith("||square-gallery")) {
            /* ||square-gallery gridHeight */
            /* imgUrl | caption | hover text (alt/title) */
            const rows = chunk.split("\n");
            let homeRow = rows.shift().substring("||image-span".length).trim();
            const lines = chunk.split("\n").slice(1).map( line => {
                const parts = line.split("|");
                while (parts.length < 3) {
                    parts.push("");
                }
                const imgUrl = parts[0].trim();
                let caption = textFormat(parts[1].trim());
                let altText = textFormat(parts[2].trim().replace(/"/g,"&quot;"));
                if (!altText) {
                    altText = caption;
                }
                if (caption) {
                    caption = `<figcaption>${ caption }</figcaption>`;
                }
                
                return `<figure><div class="img-wrapper"><img onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }"></div>${ caption }</figure>`;
            });
            return `<div class="square-gallery">${ lines.join("") }</div>`;
        }

        /* ------------------------------------ video ------------------------------------ */
        if (chunk.startsWith("||video")) {
            let data = chunk.split("\n").slice(1)[0].split("|").map(c => c.trim());
            let fileUrl = data[0];
            let dot = fileUrl.indexOf(".");
            if (dot == -1) {
                return;
            }
            let fileType = fileUrl.substring(dot + 1);
            let maxHeight = (data.length == 2) ? data[1] : 300;
            return `<div class="auto-video"><video controls height="${maxHeight}"><source src="${fileUrl}" type="video/${fileType}"></video></div>`;
        }

        if (chunk.startsWith("||yt-gallery")) {
            let rows = chunk.split("\n");
            let galleryInfo = rows.shift().substring("||yt-gallery".length);
            let sortInput = galleryInfo.includes("sort");
            rows = rows.map(row => {
                row = row.replace(/\\\|/g, "&verbar;").split("|").map(d => d.trim());
                while (row.length < 3) {
                    row.push("");
                }
                return row;
            });
            if (sortInput) {
                rows.sort((a, b) => {
                    a = parseInt(a[2].replace(/\D/g, "")) || 0;
                    b =parseInt(b[2].replace(/\D/g, "")) || 0;
                    return b - a;
                });
            }
            let numToInclude = parseInt(galleryInfo.replace(/\D/g, "")) || rows.length;
            rows = rows.slice(0, numToInclude).map( row => {
                let title = row[0];
                let videoCode = row[1];
                let date = row[2];

                while (videoCode.charAt(videoCode.length - 1) == "/") {
                    videoCode = videoCode.substring(0, videoCode.length - 1);
                }
                videoCode = videoCode.split("/").slice(-1);

                let videoUrl = `https://www.youtube.com/watch?v=${ videoCode }`;
                let thumbUrl = `https://i.ytimg.com/vi/${ videoCode }/hqdefault.jpg`;

                let videoLink = `<a href="${ videoUrl }"><img src="${ thumbUrl }"></a>`;

                return `<figure>
                    <div>${ videoLink }</div>
                    <figcaption><span class="yt-title"><a href="${ videoUrl }">${ title }</a></span> <span class="yt-date">${ date }</span></figcaption>
                </figure>`;
            });
            return `<div class="table-wrapper"><div class="yt-gallery">${ rows.join("") }</div></div>`;
        }

        chunk = chunk.replaceAll("\\`", "&#96;");

        /* ------------------------------------- code ------------------------------------- */
        if (chunk.startsWith("||codeblock")) {
            let lines = chunk.split("\n");
            let syntaxClass = "", customKeywords = [];
            let firstLine = lines.shift().substring("||codeblock".length).trim();
            if (firstLine) {
                let words = firstLine.split(" ");
                syntaxClass = words.shift();
                customKeywords = words;
            }
            
            if (syntaxClass) {
                lines = lines.map(line => syntaxHighlight(line, syntaxClass, customKeywords).replaceAll("\\\\", "&#92;").replaceAll("\\<","&lt;").replaceAll("\\>","&gt;"));
            }
            
            return `<div class="codeblock">${ lines.map(line => `<div>${ line }</div>`).join("") }</div>`;
        }

        chunk = chunk.replace(/`(.+?)`/g, (match, captured) => {
            return `<code>${ captured.replaceAll("\"", "&quot;")
                .replaceAll("'", "&apos;")
                .replaceAll("-", "&hyphen;")
                .replaceAll("(", "&lpar;")
                .replaceAll(")", "&rpar;")
                .replaceAll("[", "&lbrack;")
                .replaceAll("]", "&rbrack;")
                .replaceAll("*", "&ast;")
                .replaceAll("\n", "<br>") }</code>`;
        });
        
        let pStyle = [];
        
        if (chunk.startsWith(".")) {
            chunk = chunk.slice(1);
            pStyle.push("fine");
        } /* .first-paragraph = first paragraph that is not .fine */
        else if (firstParagraph) {
            pStyle.push("first-paragraph");
            firstParagraph = false;
        }
        
        /* ------------------------------------- links ------------------------------------- */
        /*
            [text to be displayed](https://irisembury.github.io/)
        */
        chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, address) => {
            address = address.replaceAll("\\)", ")");
            
            let link;
            if (!address.startsWith("http")) {
                if (displayText == "") {
                    link = `<a href="${ address }>[internal]</a>`;
                }
                else {
                    link = `<a href="${ address }">${ displayText }</a>`
                }
            }
            else {
                if (displayText == "") {
                    link = `<a href="${ address }" title="${ address }" class="autoref">[${ linkNum++ }]</span></a>`;
                }
                else {
                    link = `<a href="${ address }" title="${ address }">${ displayText }</a>`;
                }
            }
            
            return link;
        });
        
        /* link to section on this page: */
        chunk = chunk.replace(/\[\[(.+?)\]\]/g, (match, displayText) => {
            return `<a title="Jump to section" href="#${ displayText.replaceAll(" ", "_") }">${ displayText }</a>`
        });

        if (chunk.startsWith("||profile-grid")) {
            let data = chunk.split("\n").slice(1).filter(c => c.length > 3).map(row => {
                let rowData = row.replaceAll("\\|","&verbar;").split("|").map(c => c.trim());
                while (rowData.length < 6) { rowData.push(""); }
                let entryImageUrl = rowData[0];
                let entryName = rowData[1];
                let entryBirthdate = rowData[2];
                let entryTitle = rowData[3];
                let entryDescription = rowData[4].split(" - ").map(p => "<div>" + p + "</div>").join("");
                let entryIcon = rowData[5];

                return `<div class="grid-entry">
                    <div class="gap-10 align-center">
                        <div>
                            <img onclick="setLightbox(this)" class="profile-grid-img" src="${ entryImageUrl }">
                        </div>
                        <div>
                            <div class="entry-name">${ entryName }${ entryBirthdate == "" ? "" : " <span class=\"entry-age\">| " + ageFromISODateString(entryBirthdate) + "</span>" }</div>
                            <div class="entry-title">${ textFormat(entryTitle) }</div>
                        </div>
                    </div>
                    <div>
                        <div class="entry-description">${ textFormat(entryDescription) }</div>
                    </div>
                    ${ entryIcon != "" ? `<div style="float:right" title="belongs in jail"><img width="20" height="20" src="${ entryIcon }"></div>` : "" }
                </div>`;
            })
            return `<div class="profile-grid">${ data.join("") }</div>`;
        }

        /* ------------------------------------- table ------------------------------------- */
        if (chunk.startsWith("||table")) {
            let rows = chunk.split("\n");
            let firstRow = rows.shift().substring("||table".length).trim();
            /* make tbody cells */
            let tableWidth = 1;
            for (let r = 0; r < rows.length; r += 1) {
                let rowNum = r + 1;
                let cells = rows[r].replace(/\\\|/g, "&verbar;").split("|");
                for (let c = 0; c < cells.length; c += 1) {
                    let cellNum = c + 1;
                    cells[c] = `<td class="cell col-${ cellNum + " col-" + ((cellNum % 2 == 1) ? "odd" : "even") }">${ textFormat(cells[c].trim()) }</td>`;
                    if (c + 1 > tableWidth) {
                        tableWidth = c + 1;
                    }
                }
                rows[r] = `<tr class="row-${ rowNum + " row-" + ((rowNum % 2 == 1) ? "odd" : "even") }">${ cells.join("") }</tr>`;
            }
            /* if ||table declaration had styling included: */
            let customTableStyle = "";
            if (firstRow.replace(/\s/g, "").length > 1) {
                customTableStyle = `<style>${ firstRow.replace(/this/g, ".auto-table-"+tableNum).replace(/;/g, " !important;") }</style>`;
            }

            let table = `${ customTableStyle }<div class="table-wrapper"><table class="auto-table auto-table-${ tableNum }"><tbody>${ rows.join("") }</tbody></table></div>`;
            tableNum += 1;

            return table;
        }

        /* -------- technically not a table -------- */
        if (chunk.startsWith("||rows")) {
            let rows = chunk.split("\n").slice(1);
            for (let i = 0; i < rows.length; i += 1) {
                rows[i] = rows[i].replace(/\\\|/g, "&verbar;");
                let cells = rows[i].split("|");
                if (cells.length == 1) { cells.push(""); }
                for (let j = 0; j < cells.length; j += 1) {
                    cells[j] = `<div class="cell col-${ j + 1 } col-${ (j + 1) % 2 == 1 ? "odd" : "even" }">${ textFormat(cells[j]) }</div>`;
                }
                rows[i] = `<div class="row row-${ i + 1 } row-${ (i + 1) % 2 == 1 ? "odd" : "even" }">${ cells.join("") }</div>`;
            }
            return `<div class="table-wrapper"><div class="rows auto-table-${ tableNum++ }">${ rows.join("") }</div></div>`;
        }

        /* ---------------------------------- blockquote ---------------------------------- */
        if (chunk.startsWith("||indent")) {
            const lines = chunk.split("\n").slice(1).map( line => {
                if (line.startsWith("---")) {
                    return `<p class="attribution">${line}</p>`;
                }
                if (line.startsWith(".")) {
                    return `<div class="fine">${ line.substring(1) }</div>`;
                }
                return `<p>${line}</p>`;
            })

            return `<blockquote>${ textFormat(lines.join("")) }</blockquote>`;
        }

        /* ------------------------------------- lists ------------------------------------- */
        /* Not a perfect handler but whatever it'll do. */
        if ( chunk.startsWith("* ") || /^\d+\. /.test(chunk) ) {
            
            const listTag = chunk.startsWith("* ") ? "ul" : "ol";
            let startNumber = "";
            if (listTag == "ol") {
                startNumber = chunk.slice(0, chunk.indexOf(" ") - 1);
            }
            const lines = chunk.split("\n").map( line => {
                let li_ = "<li";

                if (line.startsWith("* ")) {
                    line = line.substring(1).trim();
                }
                else if (/^\d+\. /.test(line)) {
                    li_ += ` value="${line.slice(0, line.indexOf(" ") - 1)}"`;
                    line = line.slice(line.indexOf(" ")).trim();
                }
                else {
                    li_ += ` class="no-marker"`;
                }
                return li_ + `>${ textFormat(line) }</li>`;
            })
            let list = `<${listTag} class="auto-list"`;
            if (startNumber) {
                list += ` start="${startNumber}"`;
            }
            list += `>${lines.join("")}</${listTag}>`;
            if (pStyle.includes("fine")) {
                list = `<div class="fine">${ list }</div>`;
            }
            return list;
        }

        if ( chunk.startsWith("-- ")) {
            return `<ul class="auto-list short">${ chunk.split("\n").map(li => `<li>${ textFormat(li.replace(/^\-\-/, "").trim()) }</li>`).join("") }</ul>`;
        }
        
        /* ----------------------------------- headings ----------------------------------- */
        if (/^\#{1,4} /.test(chunk)) {
            const hType = chunk.indexOf(" ");
            const hTag = "h" + hType;
            chunk = chunk.slice(hType + 1);
            const headingId = chunk.replaceAll(" ", "_").replaceAll("---", "&mdash;").replaceAll("--", "&ndash;").replace(/[\*<>]/g ,"");

            const hClass = hType < 4 ? "article-heading --for-toc" : "article-heading";
            const heading = `<${ hTag } id="${ headingId }" class="${ hClass }">${ textFormat(chunk) }</${ hTag }>`;
            return heading;
        }

        /* ----------------------------------- see also ----------------------------------- */
        if (chunk.startsWith("||see-also")) {
            document.getElementById("page-footer").appendChild(document.createElement("div")).innerHTML = "<div>The specific content on this page was also posted in these other places:</div>" + chunk.split("\n").slice(1)
                .map( line => {
                    const url = line .replace(/substack\|(\w+)/, "https://irisembury.substack.com/p/$1")
                        .replace(/tumblr\|(\d+)/, "https://irisembury.tumblr.com/post/$1");
                    return `<div><a href="${ url }" target="_blank">${ url }</a></div>`;
                }).join("");
            return;
        }

        /* ------------------------ finalizing for normal paragraphs ------------------------ */
        
        chunk = textFormat(chunk);
        
        if (pStyle.includes("fine")) {
            chunk = chunk.replaceAll("\n", "<br>");
        }
        
        if (pStyle.length > 0) {
            return `<p class="${ pStyle.join(' ') }">${ chunk }</p>`;
        }
        return `<p>${ chunk }</p>`;
    })
    
    return input.join("");
}

function ageFromISODateString(argDate) {
    /* assumes ISO format YYYY-MM-DD */
    argDate = argDate.replace(/\D/g, "");
    if (argDate.length < 8) {
        return argDate;
    }
    const entryYear  = parseInt(argDate.substring(0, 4));
    const entryMonth = parseInt(argDate.substring(4, 6));
    const entryDay   = parseInt(argDate.substring(6, 8));
    if (entryYear < 999 || entryMonth > 12 || entryDay > 31) {
        console.error("date-format-error");
        return "";
    }
    const todaysDate = new Date();
    let age = todaysDate.getFullYear() - entryYear;
    
    // not birth-month yet
    if (todaysDate.getMonth() < entryMonth) {
        age -= 1;
    } else {
        // in birth-month, but not birthday yet:
        if (todaysDate.getMonth() == entryMonth && todaysDate.getDate < entryDay) {
            age -= 1;
        }
    }
    return age;
}

function textFormat(input_string) {
    input_string = input_string.trim();
    if (input_string == "") { return input_string; }
    let output = "";
    
    /* first: replacements that shouldn't affect inside of tags */
    while (true) {
        let openTag = input_string.indexOf("<");
        let closeTag = openTag + input_string.substring(openTag).indexOf(">");
        
        if (openTag == -1 || closeTag == -1) {
            break;
        }
        /* 
            This version makes curly-quote replacements easier by including
            triangle tags in the string we then apply replacements to.
            i.e. when given:
                "a b <c> d e"
            this creates:
                "a b <"  "c"  "> d e"
            Then we apply auxFormat to "a b <" and "> d e", but not "c", which is protected.
            
            This is useful because it allows auxFormat to see that "b" is not truly the
            end of the string, and "d" is not truly the start of the string.
            That would have been the impression if it were instead tokenized as:
                "a b" "<c>" "d e"
            
            In practical terms this means a tag doesn't interrupt the quotes within the
            same chunk, allowing you to quote bold, links, etc.
       */
        output += auxFormat(input_string.substring(0, openTag + 1)) + input_string.substring(openTag + 1, closeTag);
        input_string = input_string.substring(closeTag);
        /*
            If that functionality wasn't desired, you would
        */
    }
    return (output + auxFormat(input_string)).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/\*(.+?)\*/g, "<i>$1</i>");
}

function auxFormat(input_string) {
    if (input_string == "") { return input_string; }
    /* escaped symbols */
    input_string = input_string.replaceAll("\\*", "&ast;")
        .replaceAll('\\"', "&quot;")
        .replaceAll("\\'", "&apos;")
        .replaceAll("\|", "&verbar;")
        .replaceAll("\\(", "&lpar;")
        .replaceAll("\\)", "&rpar;")
        .replaceAll("\\[", "&lbrack;")
        .replaceAll("\\]", "&rbrack;")
        .replaceAll("\\", "&#92;")
        .replaceAll("\\^", "&Hat;");
    
    /* curly quotes: */
    if (input_string.indexOf("'") != -1 || input_string.indexOf("\"") != -1) {
        // console.log(input_string)
        input_string = input_string
            .replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1") /* like for saying '95 to indicate a year */
            .replaceAll(/(>|^| |\()'/g, "$1&lsquo;")
            .replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2")
            .replaceAll(/'/g, "&rsquo;")
            
            .replaceAll(/(>|^| |\()"/g, "$1&ldquo;")
            .replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2")
            .replaceAll(/"(,|\.)/g, "<span style='margin-right:-2px'>&rdquo;</span>$1")
            .replaceAll(/"/g, "&rdquo;")
            
            .replaceAll(/&rsquo;(T|l)/g, "<span class=\"rsquo\">&rsquo;</span>$1");
    }
    /* dashes */
    input_string = input_string.replaceAll("---", "<span class='mdash'>&mdash;</span>")
        .replaceAll("--", "&ndash;");
    input_string = input_string.replace(/@([^\s\/]+)\./g, "<span class=\"text-$1\">").replace(/@[^\s]+\./g, "</span>");
    
    return input_string;
}

function tokenizeByWordChar(stringData) {
    const result = [];
    while (stringData.length > 0) {
        let point = stringData.search( /[a-zA-Z0-9_$]/.test(stringData[0]) ? /[^a-zA-Z0-9_$]/ : /[a-zA-Z0-9_$]/ );
        if (point == -1) {
            result.push(stringData);
            break;
        }
        result.push(stringData.substring(0, point));
        stringData = stringData.substring(point);
    }
    return result;
}

function colorizeKeywords(stringInput, syntaxClass, customKeywords) {
    return tokenizeByWordChar(stringInput).map(word => {
        if (KEYWORDS[syntaxClass] && KEYWORDS[syntaxClass].includes(word)) {
            return `<span class="code-keyword">${ word }</span>`;
        }
        else if (customKeywords && customKeywords.includes(word)) {
            return `<span class="code-cust-keyword">${ word }</span>`;
        }
        else if (/^\d+$/.test(word)) {
            return `<span class="code-number">${ word }</span>`;
        }
        return word;
    }).join("");
}

const KEYWORDS = {
    cpp: "alignas alignof and and_eq asm auto bitand bitor bool break case catch char char16_t char32_t char8_t class co_await co_return co_yield compl concept const const_cast consteval constexpr constinit continue decltype default delete do double dynamic_cast else enum explicit export extern false final float for friend goto if inline int import long module mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq".split(" "),
    cs: "abstract add alias allows and args as ascending async await base bool break by byte case catch char checked class const continue decimal default delegate descending do double dynamic else enum equals event explicit extension extern false field file finally fixed float for foreach from get global goto group if implicit in init int interface internal into is join let lock long managed nameof namespace new nint not notnull nuint null object on operator or orderby out override params partial partial private protected public readonly record ref remove required return sbyte scoped sealed select set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unmanaged unmanaged unsafe ushort using value var virtual void volatile when where where while with yield".split(" "),
    java: "String abstract continue for new switch assert default goto package synchronized boolean do if private this break double implements protected throw byte else import public throws case enum instanceof return transient catch extends int short try char final interface static void class finally long strictfp volatile const float native super while".split(" "),
    js: "await break case catch class const constructor continue debugger default delete do else enum export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof var void while with yield implements interface package private protected public static setInterval".split(" ")
};

function syntaxHighlight(stringInput, syntaxClass, customKeywords) {
    let output = "";
    let overflow = 0;
    /* strings in code: */
    stringInput = stringInput.replace(/"(.+?)"/g, "<span class=\"code-string\">\"$1\"</span>")
    
    /* this finds code keywords, while ignoring html tags: */
    while (true) {
        const openTag = stringInput.indexOf("<");
        const closeTag = stringInput.indexOf(">");
        if (openTag == -1 || closeTag == -1) {
            break;
        }

        let display_text = stringInput.substring(0, openTag);
        let tag_and_attributes = stringInput.substring(openTag, closeTag + 1);

        output += colorizeKeywords(display_text, syntaxClass, customKeywords);
        output += tag_and_attributes;

        stringInput = stringInput.substring(closeTag + 1);
        /* prevents recursion while testing */
        if (overflow++ > 199) {
            break;
        }
    }
    output += colorizeKeywords(stringInput, syntaxClass, customKeywords);
    
    /* line comment: */
    output = output.replace(/(\/\/.*)/, "<span class=\"code-comment\">$1</span>")
        .replace(/(#.*)/, "<span class=\"code-macro\">$1</span>")

    return output;
}





