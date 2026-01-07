"use strict"
const HTML = document.documentElement;

let pageData = `
Nick Shirley and Somali day cares | somali-day-cares | 2026-01-02
Why do people hate Reddit so much? | why-do-people-hate-reddit | 2025-12-30
Stay the trenches | stay-the-trenches | 2025-12-17
Derangement | derangement | 2025-12-12
Thoughts on immigration | immigration | 2025-11-06
What is prejudice? | what-is-prejudice | 2025-10-30
Learn about India | learn-about-india | 2025-10-24
Liberalism, not extremism | liberalism-not-extremism | 2025-09-19
The path of normalization | the-path-of-normalization | 2025-09-08
Lies about Ilhan Omar | ilhan-omar | 2025-08-25
Israel–Palestine notes | israel-palestine | 2025-07-27
The lies of Pierre Poilievre | pierre-poilievre | 2025-03-15
Trump and Russia | trump-and-russia | 2025-03-06
Why get bottom surgery? | why-get-bottom-surgery | 2025-02-09
Political philosophy | conservatism | 2025-01-30
Elon Musk and the Nazi Salute | elon-musk-nazi-salute | 2025-01-24
What is therapy? | what-is-therapy | 2025-01-09
Enduring falsehoods (about Elizabeth Warren and Hillary Clinton) | enduring-falsehoods | 2024-12-19
Mark Robinson | mark-robinson | 2024-12-15
The standard relationship model | standard-relationship-model | 2024-12-08
The Trump appeal | the-trump-appeal | 2024-12-03
The default politician | the-default-politician | 2024-11-26
Sex, gender, &amp; transsexuals | sex-gender-transsexuals | 2024-11-19
Fetishism &amp; politics | fetishism-politics | 2024-11-14
Types of masculinity | types-of-masculinity | 2024-11-08
Anime reviews | anime-reviews | 2024-11-02
Poor things (2023 film) | poor-things | 2024-10-31
The trans prison stats argument | the-trans-prison-stats-argument | 2024-10-19
`.split("\n").filter(
    line => line.trim().split("|").length == 3
).map(
    line => {
        line = line.replace("\\|", "|").split("|").map(c => c.trim());
        return {
            title: line[0],
            url:   line[1],
            date:  line[2]
        }
    }
)

function scrollToTop() {
    window.scrollTo({
        behavior: "smooth",
        top: 0
    });
    history.replaceState(null, "", window.location.pathname + window.location.search);
    let toc = document.getElementById("toc");
    if (toc) {
        toc.scrollTo({
            behavior: "smooth",
            top: 0
        });
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
        lightbox.src = action.src;
        lightbox.alt = action.alt;
        HTML.classList.add("lb-enabled");
        document.getElementById("lb-top-left").innerHTML = `<a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        document.getElementById("lb-caption").innerHTML = action.alt=="" ? "" : action.alt;
    }
}

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
        --ff-heading: ${ headingFont=="Georgia Pro" ? "Georgia Pro,Georgia":headingFont },sans-serif;
        --ff-article: ${ bodyFont=="Georgia" ? "Georgia Pro Digits,Georgia":bodyFont },sans-serif;
        --ff-table: ${ tableFont=="Georgia" ? "Georgia Pro Digits,Georgia":tableFont },sans-serif;
        ${ (headingFont=="Georgia Pro"||headingFont=="Georgia") ? "--fw-h1: 600; --fw-h2: 600;" :"" }
    }`;
}

function menuRestoreDefaults() {
    localStorage.setItem("headingFont", "Lora");
    localStorage.setItem("bodyFont", "Georgia");
    localStorage.setItem("tableFont", "Roboto");
    updateFonts();
}

function imageFloat(chunk, direction) {
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
    return `<div class="image-float auto-image-container ${direction}">${ lines.join("") }</div>`;
}

function imageSpan(chunk) {
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
    return `<div class="image-span auto-image-container">${ galleryFigures.join("") }</div>`;
}

function gallery(chunk) {
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
    return `<div class="captioned-gallery auto-image-container">${ galleryFigures.join("") }</div>`;
}

function squareGallery(chunk) {
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
    return `<div class="square-gallery auto-image-container">${ lines.join("") }</div>`;
}

function autoVideo(chunk) {
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

function ytGallery(chunk) {
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

function codeblock(chunk) {
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

function codeReplace(match, captured) {
    return `<code>${ captured.replaceAll("\"", "&quot;").replaceAll("'", "&apos;").replaceAll("-", "&hyphen;").replaceAll("(", "&lpar;").replaceAll(")", "&rpar;").replaceAll("[", "&lbrack;").replaceAll("]", "&rbrack;").replaceAll("*", "&ast;").replaceAll("\n", "<br>") }</code>`;
}

function profileGrid(chunk) {
    let data = chunk.split("\n").slice(1).filter(c => c.length > 3).map(row => {
        let rowData = row.replaceAll("\\|","&verbar;").split("|").map(c => c.trim());
        while (rowData.length < 6) { rowData.push(""); }
        let entryImageUrl    = rowData[0];
        let entryName        = rowData[1];
        let entryBirthdate   = rowData[2];
        let entryTitle       = rowData[3];
        let entryDescription = rowData[4].split(" - ").map(p => "<div>" + p + "</div>").join("");
        let entryIcon        = rowData[5];

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

function autoTable(chunk) {
    let rows = chunk.split("\n");
    let firstRow = rows.shift().substring("||table".length).trim();
    /* make tbody cells */
    let tableWidth = 1;
    for (let r = 0; r < rows.length; r += 1) {
        let rowNum = r + 1;
        let cells = rows[r].replaceAll("\\|", "&verbar;").split("|");
        for (let c = 0; c < cells.length; c += 1) {
            let cellNum = c + 1;
            cells[c] = `<td class="cell col-${ cellNum + " col-" + ((cellNum % 2 == 1) ? "odd" : "even") }">${ textFormat(cells[c].trim()) }</td>`;
            if (c + 1 > tableWidth) {
                tableWidth = c + 1;
            }
        }
        rows[r] = `<tr class="row row-${ rowNum + " row-" + ((rowNum % 2 == 1) ? "odd" : "even") }">${ cells.join("") }</tr>`;
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

function autoRows(chunk) {
    let rows = chunk.split("\n");
    let firstRow = rows.shift().substring("||table".length).trim();
    /* make tbody cells */
    let colWidth = 1;
    for (let r = 0; r < rows.length; r += 1) {
        let rowNum = r + 1;
        let cells = rows[r].replaceAll("\\|", "&verbar;").split("|");
        for (let c = 0; c < cells.length; c += 1) {
            let cellNum = c + 1;
            cells[c] = `<div class="cell col-${ cellNum + " col-" + ((cellNum % 2 == 1) ? "odd" : "even") }">${ textFormat(cells[c].trim()) }</div>`;
            if (c + 1 > colWidth) {
                colWidth = c + 1;
            }
        }
        rows[r] = `<div class="row row-${ rowNum + " row-" + ((rowNum % 2 == 1) ? "odd" : "even") }">${ cells.join("") }</div>`;
    }
    /* if ||rows declaration had styling included: */
    let customTableStyle = "";
    if (firstRow.replace(/\s/g, "").length > 1) {
        customTableStyle = `<style>${ firstRow.replace(/this/g, ".auto-rows-"+tableNum).replace(/;/g, " !important;") }</style>`;
    }
    let table = `${ customTableStyle }<div class="table-wrapper"><div class="auto-rows auto-rows-${ tableNum }">${ rows.join("") }</div></div>`;
    tableNum += 1;
    return table;
}

function indent(chunk) {
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

function autoList(chunk, fine) {
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
    if (fine) {
        list = `<div class="fine">${ list }</div>`;
    }
    return list;
}

function autoHeading(chunk) {
    const tag = "h" + chunk.indexOf(" ");
    chunk = chunk.slice(chunk.indexOf(" ") + 1);
    const id = chunk.replaceAll(" ", "_").replaceAll("---", "&mdash;").replaceAll("--", "&ndash;").replace(/[\*<>]/g ,"");
    chunk = textFormat(chunk);
    if (tag == "h1" && document.title == "") {
        document.title = chunk;
        document.getElementById("page-name-display").innerHTML = chunk;
    }
    if (tag == "h1" || tag == "h2" || tag == "h3") {
        return `<${ tag } id="${ id }" class="article-heading --for-toc">${ chunk }</${ tag }>`;
    }
    return `<h4 id="${ id }" class="article-heading">${ chunk }</h4>`;
}

function seeAlso(chunk) {
    const article = document.getElementById("article");
    const node = document.createElement("div");
    node.className = "see-also";
    article.parentNode.appendChild(node)
    
    chunk = chunk.split("\n").slice(1);
    chunk.forEach(line => {
        line = line.split("|");
        if (line[0] == "substack") {
            node.insertAdjacentHTML("beforeend", '<a title="This was also posted on Substack" href="https://substack.com/"><svg title="Substack" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64"><path fill="var(--c-substack)" d="M8 10 H56 V16 H8 Z" /><path fill="var(--c-substack)" d="M8 22 H56 V28 H8 Z" /><path fill="var(--c-substack)" d="M8 34 H56 V62 L32 50 L8 62 Z" /></svg></a>');
            console.log(node)
        }
        else if (line[0] == "tumblr") {
            node.insertAdjacentHTML("afterbegin", '<a title="This was also posted on Tumblr" href="https://tumblr.com/"><svg title="Tumblr" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 530 530"><path fill="var(--c-tumblr)" d="M260,0 C403.1,0 520,116.9 520,260 C520,403.1 403.1,520 260,520 C116.9,520 0,403.1 0,260 C0,116.9 116.9,0 260,0 Z"/><path fill="var(--c-tumblr-white)" d="M222.5 113.9h55.8v71.1h48.3v55.8h-48.3v91.5c0 24.1 13.6 31.6 32.2 31.6 9.5 0 20.6-1.4 28.5-3.9v51.9c-9.9 4.7-27.8 9.4-47.3 9.4-47.6 0-78.5-29.3-78.5-82.7V240.8h-38.9v-55.8h38.9v-71.1z"/></svg></a>');
        }
    })
    return "";
}
/* ------------------------------- main interpreter for #article content ------------------------------- */
var tableNum = 1, linkNum = 1;
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
        return;
    }
    let input = argValue.replace(/\n\n+/g, "\n\n")
        .replace(/\r/g, "") /* for safety, probably no effect */
        .trim()
        .split("\n\n");
    
    input = input.map( chunk => {
        if (chunk.startsWith("<")) { return chunk; }
        if (chunk.startsWith("\\")) { chunk = chunk.substring(1); }
        if (chunk == "---") { return "<hr>"; }
        if (chunk.startsWith("||image-float-left")) { return imageFloat(chunk, "left"); }
        if (chunk.startsWith("||image-float")) { return imageFloat(chunk, "right"); }
        if (chunk.startsWith("||image-span")) { return imageSpan(chunk); }
        if (chunk.startsWith("||gallery")) { return gallery(chunk); }
        if (chunk.startsWith("||square-gallery")) { return squareGallery(chunk); }
        if (chunk.startsWith("||video")) { return autoVideo(chunk); }
        if (chunk.startsWith("||yt-gallery")) { return ytGallery(chunk); }
        chunk = chunk.replaceAll("\\`", "&#96;");
        if (chunk.startsWith("||codeblock")) { return codeblock(chunk) ; }
        chunk = chunk.replace(/`(.+?)`/g, codeReplace);
        
        let fine = chunk.startsWith(".");
        if (fine) { chunk = chunk.slice(1).trimStart(); }
        
        /* ------------------------------------- links ------------------------------------- */
        /*
            [text to be displayed](https://irisembury.github.io/)
        */
        chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, address) => {
            address = address.replaceAll("\\)", ")");
            let title = address.startsWith("http") ? `title="${address}"` : "";
            let link;
            if (displayText == "") { link = `<a href="${ address }" title="${ address }" class="autoref">[${ linkNum }]</span></a>`; }
            else { link = `<a href="${ address }" ${ title }>${ displayText }</a>`; }
            linkNum += 1;
            return link;
        });
        chunk = chunk.replace(/\[\[(.+?)\]\]/g, (match, displayText) => { return `<a title="Jump to section" href="#${ displayText.replaceAll(" ", "_") }">${ displayText }</a>` });

        if (chunk.startsWith("||profile-grid")) { return profileGrid(chunk); }
        if (chunk.startsWith("||table")) { return autoTable(chunk); }
        if (chunk.startsWith("||rows")) { return autoRows(chunk); }
        if (chunk.startsWith("||indent")) { return indent(chunk); }
        if ( chunk.startsWith("* ") || /^\d+\. /.test(chunk) ) { return autoList(chunk, fine); }
        if ( chunk.startsWith("-- ")) { return `<ul class="auto-list short">${ chunk.split("\n").map(li => `<li>${ textFormat(li.replace(/^\-\-/, "").trim()) }</li>`).join("") }</ul>`; }
        if (/^\#{1,4} /.test(chunk)) { return autoHeading(chunk); }
        if (chunk.startsWith("||see-also")) { return seeAlso(chunk); }

        chunk = textFormat(chunk);
        if (fine) {
            return `<div class="fine">${ chunk.replaceAll("\n", "<br>") }</div>`;
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

window.addEventListener("load", function() {
    const index = document.getElementById("index") != null;
    const pathToRoot = index ? "" : "../../";
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${ pathToRoot }assets/fonts.css">`);

    document.body.innerHTML = `<nav id="navbar">
        <div class="align-center gap-8">
            <div id="hamburger" class="icon"><svg viewBox="0 0 24 24"><path fill="currentcolor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div>
            <div>${index?`<span>Iris Embury</span>`:`<a href="${pathToRoot}index.html">Iris Embury</a>`}${ index ? "" : " &verbar; <span title=\"This page\" id=\"page-name-display\">" + document.title + "</span>"}</div>
        </div>
        <div id="gear" class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></div>
    </nav>
    <nav id="left" class="closed">
        <div class="nav-row page-title">Links</div>
        <div class="nav-row"><a href="https://youtube.com/channel/UCXadODjAtT72eYW6xCGyuUA"><svg title="YouTube" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30"><path  fill="var(--c-youtube)" d="M29.2 8.6c-.3-1.6-1.6-2.8-3.2-3C23 5.2 15 5.2 15 5.2s-8 0-11 .4c-1.6.2-2.9 1.4-3.2 3C.4 11.6.4 15 .4 15s0 3.4 .4 6.4c.3 1.6 1.6 2.8 3.2 3C7 24.8 15 24.8 15 24.8s8 0 11-.4c1.6-.2 2.9-1.4 3.2-3 .4-3 .4-6.4 .4-6.4s0-3.4-.4-6.4z"/><path fill="var(--c-youtube-white)" d="M12 19.2V10.8l7.8 4.2-7.8 4.2z"/></svg>YouTube</a></div>
        <div class="nav-row"><a href="https://bsky.app/profile/irisembury.bsky.social"><svg title="Bluesky" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 57" width="18" height="18"><path fill="var(--c-bluesky)" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>Bluesky</a></div>
        <div class="nav-row"><a href="https://irisembury.tumblr.com/"><svg title="Tumblr" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 530 530"><path fill="var(--c-tumblr)" d="M260,0 C403.1,0 520,116.9 520,260 C520,403.1 403.1,520 260,520 C116.9,520 0,403.1 0,260 C0,116.9 116.9,0 260,0 Z"/><path fill="var(--c-tumblr-white)" d="M222.5 113.9h55.8v71.1h48.3v55.8h-48.3v91.5c0 24.1 13.6 31.6 32.2 31.6 9.5 0 20.6-1.4 28.5-3.9v51.9c-9.9 4.7-27.8 9.4-47.3 9.4-47.6 0-78.5-29.3-78.5-82.7V240.8h-38.9v-55.8h38.9v-71.1z"/></svg>Tumblr</a></div>
        <div class="nav-row"><a href="https://x.com/irisembury"><svg title="Twitter/X" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="-1 -1 25 25"><path fill="var(--c-twitter)" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>Twitter/X</a></div>
        <div class="nav-row"><a href="https://irisembury.substack.com/"><svg title="Substack" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 64 64"><path fill="var(--c-substack)" d="M8 10 H56 V16 H8 Z" /><path fill="var(--c-substack)" d="M8 22 H56 V28 H8 Z" /><path fill="var(--c-substack)" d="M8 34 H56 V62 L32 50 L8 62 Z" /></svg>Substack</a></div>
        <div class="nav-row"><a href="https://discord.gg/fGdV7x5dk2"><svg title="Discord" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="var(--c-discord)" d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/></svg>Invite to my Discord</a></div>
        <div class="nav-row page-title">Latest pages uploaded</div>
        ${ pageData.map(entry => `<div class="nav-row"><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.title }</a></div>`).join("") }
    </nav>
    <div class="dark-screen"></div>
    <div id="right" class="closed">
        <h3>Display preferences:</h3>
        <table><tbody><tr><td>Theme:</td><td>
            <select class="menu-select" id="brightness-select">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </td></tr></tbody></table>
        <hr>
        <div class="menu-options">
            <div class="full-width-option">
                <label for="page-full-width">Page full width</label>
                <input type="checkbox" class="menu-checkbox" id="page-full-width">
            </div>
            <div class="hide-toc-option">
                <label for="hide-toc">Hide table of contents</label>
                <input type="checkbox" class="menu-checkbox" id="hide-toc">
            </div>
            <div class="book-text-option">
                <label for="book">Indent and justify</label>
                <input type="checkbox" class="menu-checkbox" id="book">
            </div>
        </div>
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
                    <option value="Georgia">Georgia</option>
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
        <div class="flex-end align-center"><span style="cursor: pointer; color: var(--grey-8);" onclick="menuRestoreDefaults()" title="restore font defaults">restore defaults</span></div>
        <hr>
        <div class="menu-bottom">
            <p>These options are saved in session storage, not cookies, meaning they&rsquo;re cleared automatically when you close your browser.</p>
        </div>
    </div>
    <div class="page-grid">
        ${ HTML.classList.contains("include-toc") ? `<nav id="toc"></nav>` : "" }
        <div class="main-container">
            <div id="article">${ document.body.innerHTML }</div>
            <div id="page-footer">${ index ? "" : `<div class="footer-back-to-index"><a href="../../index.html">Link back to index (front page)</a></div>` }<div>This repo domain (irisembury.github.io) is used to host my writing and opinions. I have no association with any other person or organization. For serious inquiries you can contact me at irisembury@gmail.com.</div></div>
        </div>
    </div>
    <div class="lb-container">
        <div id="lb-top-left"></div>
        <div class="lb-wrapper"><img id="lightbox"></div>
        <div class="lb-bottom-panel"><div id="lb-caption"></div></div>
    </div>
    <style id="user-styles"></style>`;
    
    interpreter(document.getElementById("article"));
    // <nav id="left" class="sidebar">${ pageData.map(entry => `<div class="nav-row"><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.title }</a></div>`).join("") }</nav>

    if (index) {
        HTML.style.setProperty("--main-width", "748px");
        document.getElementById("index").innerHTML = `<div class="table-wrapper">
            <div class="auto-rows">${
                pageData.map(entry => `<div class="row">
                        <div class="cell col-1"><a href="page/${ entry.url }/index.html">${ entry.title }</a></div>
                        <div class="cell col-2 dots-line"></div>
                        <div class="cell col-3">${ entry.date }</div>
                    </div>` ).join("")
        }</div>`;
    }

    HTML.classList.add("layout");
    Array.from(document.getElementById("fonts").getElementsByTagName("option")).forEach(o => o.style.fontFamily = `"${ o.value }",system-ui` );
    
    document.querySelector(".lb-wrapper").addEventListener("click", () => {
        setLightbox("close")
    })

    /* ---- ---- ---- ---- ---- ---- ---- gearMenu ---- ---- ---- ---- ---- ---- ---- */

    const gearIcon = document.getElementById("gear");
    const gearMenu = document.getElementById("right");
    function gearMenuToggle(option) {
        if (option == "close" || option == "open") {
            gearMenu.classList.toggle("closed", option == "close");
        }
        else {
            gearMenu.classList.toggle("closed", !gearMenu.classList.contains("closed"));
        }
    }
    gearIcon.addEventListener("click", gearMenuToggle);

    /* ---- ---- ---- ---- ---- ---- ---- hamburgerMenu ---- ---- ---- ---- ---- ---- ---- */

    const hamburgerIcon = document.getElementById("hamburger");
    const hamburgerMenu = document.getElementById("left");
    function hamburgerMenuToggle(option) {
        if (option == "close" || option == "open") {
            hamburgerMenu.classList.toggle("closed", option == "close");
        }
        else {
            hamburgerMenu.classList.toggle("closed", !hamburgerMenu.classList.contains("closed"));
        }
    }
    hamburgerIcon.addEventListener("click", hamburgerMenuToggle);
    
    /* ---- ---- ---- ---- ---- hamburger & gear close conditions ---- ---- ---- ---- ---- */
    
    window.addEventListener("click", function(e) {
        if (!gearMenu.contains(e.target) && !gearIcon.contains(e.target)) {
            gearMenuToggle("close");
        }
        if (!hamburgerMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
            hamburgerMenuToggle("close");
        }
    })
    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            hamburgerMenuToggle("close");
            gearMenuToggle("close");
            setLightbox("close");
        }
        else if (e.key === "Home") {
            let toc = document.getElementById("toc");
            if (toc) {
                toc.scrollTo({
                    behavior: "smooth",
                    top: 0
                });
            }
        }
    })

    /* ---- ---- ---- ---- ---- ---- ---- gear menu items: ---- ---- ---- ---- ---- ---- ---- */
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
    
    if (localStorage.getItem("book") == "true") {
        HTML.classList.add("book");
        document.getElementById("book").checked = true;
    } else {
        document.getElementById("book").checked = false;
    }
    document.getElementById("book").addEventListener("change", function() {
        localStorage.setItem("book", this.checked);
        HTML.classList.toggle("book", this.checked);
    });
    
    if (!index) {
        if (localStorage.getItem(window.location.href + "-full-width") == "true") {
            HTML.classList.add("full-width");
            document.getElementById("page-full-width").checked = true;
        }
        document.getElementById("page-full-width").addEventListener("change", function() {
            HTML.classList.toggle("full-width", this.checked);
            localStorage.setItem(window.location.href + "-full-width", this.checked ? "true" : "false");
        });
    }
    
    if (document.title == "") {
        document.title = "Iris Embury";
    } else if (!document.title.endsWith("Iris Embury")) {
        document.title += " | Iris Embury";
    }
    
    /* ---- ---- ---- ---- ---- ---- ---- quote expand element ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    
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
    
    /* ---- ---- ---- ---- ---- ---- ---- table of contents ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    
    if (!HTML.classList.contains("include-toc")) {
        let toc = document.getElementById("toc");
        if (toc != null) {
            toc.parentNode.removeChild(toc);
        }
    }
    else {
        document.getElementById("hide-toc").addEventListener("change", function() {
            if (this.checked) {
                HTML.classList.remove("include-toc");
                window.removeEventListener("scroll", tocHighlightUpdateAttempt);
            } else {
                HTML.classList.add("include-toc");
                window.addEventListener("scroll", tocHighlightUpdateAttempt);
            }
        });
        const toc = document.getElementById("toc");
        const headings = Array.from(document.getElementById("article").getElementsByClassName("--for-toc"));
        toc.innerHTML = `<div class="toc-row title">Table of contents</div>` + headings.map( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join("");
        toc.scrollTo({ behaviour: "instant", top: 0 });
        
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
        const rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
        let lastHeading = -1;
        function tocHighlightUpdate() {
            let currentHeading = -1;
            for (let i = 0; i < headings.length; i += 1) {
                let elementDistanceFromPageTop = window.scrollY + headings[i].getBoundingClientRect().top;
                if (pageYOffset < elementDistanceFromPageTop - (0.4 * window.innerHeight)) {
                    break;
                }
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
    }
})
