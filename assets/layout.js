"use strict"
const HTML = document.documentElement;

const pageData = `The potential end of the American period | thoughts-on-the-potential-end-of-the-american-period | 2026-01-28
Give yourself credit | give-yourself-credit | 2026-01-23
Nick Shirley and Somali day cares | somali-day-cares | 2026-01-02
Why is Reddit so hated? | why-is-reddit-so-hated | 2025-12-30
Stay the trenches | stay-the-trenches | 2025-12-17
Derangement | derangement | 2025-12-12
Thoughts on immigration | immigration | 2025-11-06
What is prejudice? | what-is-prejudice | 2025-10-30
India | india | 2025-10-24
Liberalism, not extremism | liberalism-not-extremism | 2025-09-19
The path of normalization | the-path-of-normalization | 2025-09-08
Lies about Ilhan Omar | ilhan-omar | 2025-08-25
Israel–Palestine notes | israel-palestine | 2025-07-27
The lies of Pierre Poilievre | pierre-poilievre | 2025-03-15
Trump and Russia | trump-and-russia | 2025-03-06
Why get bottom surgery? | why-get-bottom-surgery | 2025-02-09
Politics | conservatism | 2025-01-30
Elon Musk and the Nazi Salute | elon-musk-nazi-salute | 2025-01-24
What is therapy? | what-is-therapy | 2025-01-09
Enduring falsehoods (Elizabeth Warren and Hillary Clinton) | enduring-falsehoods | 2024-12-19
Mark Robinson | mark-robinson | 2024-12-15
The standard relationship model | standard-relationship-model | 2024-12-08
The Trump appeal | the-trump-appeal | 2024-12-03
The default politician | the-default-politician | 2024-11-26
Sex, gender, &amp; transsexuals | sex-gender-transsexuals | 2024-11-19
Fetishism &amp; politics | fetishism-politics | 2024-11-14
Types of masculinity | types-of-masculinity | 2024-11-08
The trans prison stats argument | the-trans-prison-stats-argument | 2024-10-19`;

const videoData = `give yourself credit | mM5fcuJnfZQ | 2026-01-23
Potential issues with our elections | 509Q_HUp8CE | 2026-01-19
Why is Reddit so hated? | jPVl5cfVP1k | 2026-01-13
thoughts and plans | _zePgOyNPt4 | 2026-01-06
trying to use a camera | iLR3pd8hmVY  | 2026-01-06
Nick Shirley has farty pants | aQcGUiISQQk | 2026-01-05
Looking at the recent Somali day care video | Btuz_P5WcyY | 2026-01-03
Unfortunately, we should keep using bad social media | vDFmEAb2S4A | 2025-12-22
The issues that break people's minds | NQPbvAdfsMY | 2025-12-19
it's ok guys we don't have to fix them | NSajyW3l_vE | 2025-12-15
In the fight for democracy, be wary of the far left | 7mKdVYVdqKs | 2025-12-10
What even is therapy? | -lboA4v0Dvg | 2025-12-09
Why do people say "ax" instead of ask? | c2StWa6z1zE | 2025-11-30
today I learned how Danish people make numbers | nHdDW8ydjjc |2025-11-28
Immigration | 6MEkIZQFV6w | 2025-11-23
Marjorie Taylor Greene | Ak2DnmW6Vlg | 2025-11-21
What is prejudice? | BzahVdIEYpA | 2025-11-03
Notes on India | Pz0Oq1rb14E | 2025-10-24
Notes on Saudi Arabia | 9RhaYU21Qag | 2025-10-17
Jon Stewart is part of the problem | yYF2n0PDDRE | 2025-10-11
The internet's latest over-reaction \\| Riyadh Comedy Festival | XXXisl9wOC0 | 2025-10-08
Ilhan Omar makes waves after Charlie Kirk shooting | JDseBrbtp6E | 2025-10-04
The path of normalization | TYoe1jxBYPY | 2025-09-19
Why do people like Trump? | tcF0f-Dtgic | 2025-09-14
My thoughts after the Charlie Kirk assassination | AjPF8pGv37U | 2025-09-12
How to fix America in a few simple steps | iFHmA32NZAs | 2025-08-22
Unpacking lies about Ilhan Omar | zgE4L-e9yg0 | 2025-09-03
What just happened? A recap of all Trump news from Jan 20 to July 4 | n355Q15CX8g | 2025-08-18
The problems with Pierre Poilievre | BZ-ztjpRchE | 2025-07-11
The default politician is a normal white guy | GDjIBEq16zY | 2025-03-29
What is with Trump and Russia? | G-sLZaP7oOA | 2025-03-18
Reflections on Pride 2025 (in Toronto) | PL3u9OOGxew | 2025-06-05
I don't like fireworks | tzJEv4jjKHM | 2025-06-23
Rorschach tests | K3A1g1274Kc | 2025-08-20
Are trans people more likely to be sex offenders? | ZKglpuBen-w | 2025-07-12
Are trans people delusional? | o_t7xQJSYHk | 2025-06-28
Trans fetishism & politics | vk57rvM1zWo | 2025-04-02
Sex, gender, & transsexuals | Hgh3r7gJoWU | 2025-05-29
Lies people still believe (Elizabeth Warren, Hillary Clinton) | LPQD6sxlWOs | 2025-04-09
Bernie Sanders and the military industrial complex | yt6O0OMdIT0 | 2025-03-22
Types of masculinity | lOQSqMhjwZY | 2025-06-12`;

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
    let lightbox = document.querySelector(".lightbox");
    if (action == "close") {
        lightbox.src = "";
        lightbox.alt = "";
        HTML.classList.remove("lb-enabled");
    }
    else {
        lightbox.src = action.src;
        lightbox.alt = action.alt;
        HTML.classList.add("lb-enabled");
        document.querySelector(".lb-top-left").innerHTML = `<a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        document.querySelector(".lb-caption").innerHTML = action.alt=="" ? "" : action.alt;
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
    let headingFont = localStorage.getItem("headingFont") || defaultHeadingFont;
    let bodyFont = localStorage.getItem("bodyFont") || defaultBodyFont;
    let tableFont = localStorage.getItem("tableFont") || defaultTableFont;

    document.getElementById("heading-font-select").value = headingFont;
    document.getElementById("body-font-select").value = bodyFont;
    document.getElementById("table-font-select").value = tableFont;

    let styleText = "";

    if (headingFont != defaultHeadingFont) {
        if (headingFont == "Georgia") {
            styleText += ` --fw-h1: 600; --fw-h2: 600;`
            headingFont = "Georgia Pro";
        }
        styleText += ` --ff-heading: ${ headingFont },sans-serif;`;
    }
    if (bodyFont == "Georgia") {
        bodyFont = "Georgia Pro Digits, Georgia";
    }
    if (tableFont == "Georgia") {
        tableFont = "Georgia Pro Digits, Georgia";
    }

    if (bodyFont != defaultBodyFont) {
        styleText += ` --ff-article: ${ bodyFont },sans-serif;`;
    }
    if (tableFont != defaultTableFont) {
        styleText += ` --ff-table: ${ tableFont },sans-serif;`;
    }

    if (styleText != "") {
        styleText = `body { ${ styleText } }`
    }
    
    document.getElementById("pref-styles").innerHTML = styleText;
}

const defaultHeadingFont = "Lora";
const defaultBodyFont    = "Georgia";
const defaultTableFont   = "Roboto";

function menuRestoreDefaults() {
    localStorage.setItem("headingFont", defaultHeadingFont);
    localStorage.setItem("bodyFont", defaultBodyFont);
    localStorage.setItem("tableFont", defaultTableFont);
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
        
        return `<figure><img loading="lazy" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }">${ figCaption }</figure>`;
    });
    return `<div class="image-float ${direction}">${ lines.join("") }</div>`;
}

function imageSpan(chunk) {
    /* !image-span maxHeight */
    /* imgUrl | alt-text/title */
    const rows = chunk.split("\n");
    let homeRow = rows.shift().substring("!image-span".length).trim();
    const galleryFigures = rows.map( line => {
        const parts = line.split("|");
        while (parts.length < 2) {
            parts.push("");
        }
        let imgUrl = parts[0].trim();
        let altText = textFormat(parts[1].trim().replace(/"/g,"&quot;"));
        return `<div><img loading="lazy" style="max-height: ${homeRow || 300}px;" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }"></div>`;
    });
    return `<div class="image-span">${ galleryFigures.join("") }</div>`;
}

function gallery(chunk) {
    /* !image-span maxHeight */
    /* imgUrl | caption | alt-text/title */
    const rows = chunk.split("\n");
    let homeRow = rows.shift().substring("!gallery".length).trim();
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
            <img loading="lazy" style="max-height: ${ homeRow || 300 }px;" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }">
            <figcaption>${ caption }</figcaption>
        </figure>
        `;
    });
    return `<div class="captioned-gallery">${ galleryFigures.join("") }</div>`;
}

function squareGallery(chunk) {
    /* !square-gallery gridHeight */
    /* imgUrl | caption | hover text (alt/title) */
    const rows = chunk.split("\n");
    let homeRow = rows.shift().substring("!image-span".length).trim();
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
        
        return `<figure><div class="img-wrapper"><img loading="lazy" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }"></div>${ caption }</figure>`;
    });
    return `<div class="square-gallery">${ lines.join("") }</div>`;
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
    return `<div class="auto-video"><video controls height="${ maxHeight }"><source src="${ fileUrl }" type="video/${ fileType }"></video></div>`;
}

function ytGallery(chunk) {
    let rows = chunk.split("\n");
    let gInfo = rows.shift().substring("!yt-gallery".length);
    let sortInput = gInfo.includes("sort");
    rows = rows.map(
        row => {
            row = row.replace(/\\\|/g, "&verbar;").split("|").map(
                c => c.trim()
            );
            while (row.length < 3) {
                row.push("");
            }
            return row;
        }
    );
    if (sortInput) {
        rows.sort((a, b) => {
            a = parseInt(a[2].replace(/\D/g, "")) || 0;
            b = parseInt(b[2].replace(/\D/g, "")) || 0;
            return b - a;
        })
    }
    let numToInclude = parseInt(gInfo.replace(/\D/g, "")) || rows.length;
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

        let videoThumb = `<a style="min-width:100%" href="${ videoUrl }"><img loading="lazy" src="${ thumbUrl }"></a>`;

        return `<figure>
            <div>${ videoThumb }</div>
            <figcaption><div class="yt-title"><a href="${ videoUrl }">${ title }</a></div> <div class="yt-date">${ date }</div></figcaption>
        </figure>`;
    });
    return `<div class="table-wrapper"><div class="yt-gallery">${ rows.join("") }</div></div>`;
}

function codeblock(chunk) {
    let lines = chunk.split("\n");
    let syntaxClass = "", customKeywords = [];
    let firstLine = lines.shift().substring("!codeblock".length).trim();
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
                    <img loading="lazy" onclick="setLightbox(this)" class="profile-grid-img" src="${ entryImageUrl }">
                </div>
                <div>
                    <div class="entry-name">${ entryName }${ entryBirthdate == "" ? "" : " <span class=\"entry-age\">| " + ageFromISO(entryBirthdate) + "</span>" }</div>
                    <div class="entry-title">${ textFormat(entryTitle) }</div>
                </div>
            </div>
            <div>
                <div class="entry-description">${ textFormat(entryDescription) }</div>
            </div>
        </div>`;
    })
    return `<div class="profile-grid">${ data.join("") }</div>`;
}

function autoTable(chunk) {
    chunk = chunk.replace(/\n +/g, " ");
    const rows = chunk.split("\n");
    let firstRow = rows.shift().substring("!table".length).trim();
    /* make tbody cells */
    for (let r = 0; r < rows.length; r += 1) {
        let rowNum = r + 1;
        let cells = rows[r].replaceAll("\\|", "&verbar;").split("|");
        for (let c = 0; c < cells.length; c += 1) {
            let cellNum = c + 1;
            cells[c] = `<td class="cell col-${ cellNum + " col-" + (cellNum % 2 == 1 ? "odd" : "even") }">${ textFormat(cells[c].trim()) }</td>`;
        }
        rows[r] = `<tr class="row row-${ rowNum + " row-" + ((rowNum % 2 == 1) ? "odd" : "even") }">${ cells.join("") }</tr>`;
    }
    /* if !table declaration had styling included: */
    let customTableStyle = "";
    if (firstRow.replace(/\s/g, "").length > 1) {
        customTableStyle = `<style>${ firstRow.replace(/this/g, ".auto-table-" + tableNum).replace(/;/g, " !important;") }</style>`;
    }
    let table = `${ customTableStyle }<div class="table-wrapper"><table class="auto-table auto-table-${ tableNum }"><tbody>${ rows.join("") }</tbody></table></div>`;
    tableNum += 1;
    return table;
}

function autoRows(chunk) {
    let rows = chunk.split("\n");
    let firstRow = rows.shift().substring("!rows".length).trim();
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
    /* if !rows declaration had styling included (same as !table logic): */
    let customTableStyle = "";
    if (firstRow.replace(/\s/g, "").length > 1) {
        customTableStyle = `<style>${ firstRow.replace(/this/g, ".auto-rows-"+tableNum).replace(/;/g, " !important;") }</style>`;
    }
    let table = `${ customTableStyle }<div class="table-wrapper"><div class="auto-rows auto-rows-${ tableNum }">${ rows.join("") }</div></div>`;
    tableNum += 1;
    return table;
}

function autoList(list) {
    let prevIndent = -1;
    const closeTags = [];
    return list.split("\n").map(
        li => {
            const initpad = li.match(/^ */)[0].length;
            li = textFormat(li.substring(initpad));
            const indent = Math.floor(initpad * 0.25);
            const liType = /^[\*\-] /.test(li) ?"ul" :(/^\d+\. /.test(li) ?"ol" :"none");
            const listType = (liType =="ol") ?"ol" :"ul";
            let startNum = (liType =="ol") ?li.substring(0, li.indexOf(".")) :1;
            li = (liType) =="none" ?li.trimStart() :li.substring(li.indexOf(" ")).trimStart();
            li = " ".repeat(indent * 4 + 2) + ( liType =="none" ?"<p>"+li+"</p>\n" :"<li>"+li+"</li>\n");
            if (indent > prevIndent) {
                li = " ".repeat(indent * 4) + "<" + listType + (liType =="ol" ?' start="'+startNum+'"' :'') + ">\n" + li;
                closeTags.push(" ".repeat(indent * 4) + "</"+ listType +">\n");
            } else if (indent < prevIndent) {
                li = closeTags.splice(-(prevIndent - indent)).reverse().join('') + li;
            }
            prevIndent = indent;
            return li;
        }
    ).join("") + closeTags.join("");
}

function autoIndent(chunk) {
    const lines = chunk.split("\n").map(
        line => {
            line = line.trim();
            if (line != "") {
                if (line.startsWith("---")) {
                    return `<p class="attribution">${ line }</p>`;
                }
                return "<p>"+ line +"</p>";
            }
        }
    )
    return `<blockquote>${ textFormat(lines.join("")) }</blockquote>`;
}

function articleMeta(chunk) {
    chunk = chunk.split("\n").slice(1);
    const articleTop = document.querySelector(".article-top");
    if (articleTop == null) {
        return;
    }
    const otherSources = [];
    
    for (let line of chunk) {
        const lCol = line.indexOf(":");
        if (lCol == -1) {
            continue;
        }
        const mKey = line.substring(0, lCol).toLowerCase().trim();
        const mVal = line.substring(lCol + 1).trim();
        
        if (mKey == "title") {
            const mTitle = mVal.replaceAll("---", "—").replaceAll("--", "–");
            document.title = mTitle.replaceAll("&amp;", "&");
            let pageNameDisplay = document.querySelector(".page-name-display");
            if (pageNameDisplay) {
                pageNameDisplay.innerHTML = mTitle;
            }
            const articleTitle = articleTop.querySelector(".article-title");
            if (articleTitle == null) {
                articleTop.insertAdjacentHTML('beforeend', '<h1 class="article-title --for-toc">'+ textFormat(mVal) +'</h1>')
            }
            else {
                articleTitle.innerHTML = textFormat(mTitle);
            }
        }
        else if (mKey == "subtitle") {
            const articleSubtitle = articleTop.querySelector(".article-subtitle")
            if (articleSubtitle == null) {
                articleTop.insertAdjacentHTML("beforeend", '<h2 class="article-subtitle">'+ textFormat(mVal) +'</h2>')
            }
            else {
                articleSubtitle.innerHTML = textFormat(mVal);
            }
        }
        else if (mKey == "date") {
            const articleDate = articleTop.querySelector(".article-date")
            if (articleDate == null) {
                articleTop.insertAdjacentHTML("beforeend", '<div class="article-date">'+ isoFormat(mVal) +'</div>')
            }
            else {
                articleDate.innerHTML = isoFormat(mVal);
            }
        }
        else if (mKey == "last-updated") {
            const articleDate = articleTop.querySelector(".article-date")
            if (articleDate == null) {
                articleTop.insertAdjacentHTML("beforeend", '<div class="article-date">Last updated: '+ isoFormat(mVal) +'</div>')
            }
            else {
                articleDate.innerHTML = isoFormat(mVal);
            }
        }
        else if (mKey == "see-also") {
            const addr = mVal.toLowerCase().split("|").map(c => c.trim());
            if (addr[0] == "tumblr") {
                otherSources.push(`<a title="This was also posted on Tumblr" href="https://tumblr.com/irisembury/${ addr[1] }"><svg title="Tumblr" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 530"><path fill="var(--c-tumblr)" d="M260,0 C403.1,0 520,116.9 520,260 C520,403.1 403.1,520 260,520 C116.9,520 0,403.1 0,260 C0,116.9 116.9,0 260,0 Z"/><path fill="var(--c-tumblr-white)" d="M222.5 113.9h55.8v71.1h48.3v55.8h-48.3v91.5c0 24.1 13.6 31.6 32.2 31.6 9.5 0 20.6-1.4 28.5-3.9v51.9c-9.9 4.7-27.8 9.4-47.3 9.4-47.6 0-78.5-29.3-78.5-82.7V240.8h-38.9v-55.8h38.9v-71.1z"/></svg><span>Tumblr</span></a>`)
            }
            else if (addr[0] == "substack") {
                otherSources.push(`<a title="This was also posted on Substack" href="https://irisembury.substack.com/p/${ addr[1] }"><svg title="Substack" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="var(--c-substack)" d="M8 10 H56 V16 H8 Z" /><path fill="var(--c-substack)" d="M8 22 H56 V28 H8 Z" /><path fill="var(--c-substack)" d="M8 34 H56 V62 L32 50 L8 62 Z" /></svg><span>Substack</span></a>`)
            }
        }
    }
    
    if (otherSources.length > 0) {
        otherSources.sort();
        const seeAlso = articleTop.querySelector(".article-see-also");
        if (seeAlso == null) {
            articleTop.insertAdjacentHTML("beforeend", '<div class="article-see-also">'+ otherSources.join("") +'</div>');
        }
        else {
            seeAlso.innerHTML = otherSources.join("");
        }
    }
    
    let metaItemsVisible = 0;
    Array.from(articleTop.children).forEach(
        c => {
            c.classList.toggle("hidden", c.innerHTML == "")
            if (c.innerHTML != "") {
                metaItemsVisible += 1;
            }
            
        }
    )
    articleTop.classList.toggle("hidden", metaItemsVisible == 0);
}

function isoFormat(datestring) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(datestring)) {
        const iso = datestring;
        const [y, m, d] = iso.split("-").map(Number);
        let fdate = new Date(y, m - 1, d);
        fdate = new Intl.DateTimeFormat(undefined,{ year: "numeric", month:"long", day:"numeric"}).format(fdate);
        datestring = '<time title="ISO: '+ iso +'" datetime="'+ iso +'">'+ fdate +'</time>';
    }
    return datestring;
}

function autoHeading(chunk) {
    const tag = "h" + chunk.indexOf(" ");
    chunk = chunk.slice(chunk.indexOf(" ") + 1);
    const id = chunk.replaceAll(" ", "_").replaceAll("---", "&mdash;").replaceAll("--", "&ndash;").replace(/[\*<>]/g ,"");
    chunk = textFormat(chunk);
    if (tag == "h1" || tag == "h2" || tag == "h3") {
        return `<${ tag } id="${ id }" class="auto-heading --for-toc">${ chunk }</${ tag }>`;
    }
    return `<h4 id="${ id }" class="auto-heading">${ chunk }</h4>`;
}

/* ------------------------------- main interpreter for #article content ------------------------------- */
var tableNum = 1;
var linkNum = 1;
var contentLinks = [];
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
        return;
    }
    let input = argValue.replace(/\n\n+/g, "\n\n")
        .replace(/\r/g, "") /* for safety, probably no effect */
        .trim()
        .split("\n\n");

    input = input.map(
        chunk => {
            chunk = chunk.replace(/\t/g, "    "); /* probably no effect */
            if (chunk.startsWith("\\")) { chunk = chunk.substring(1); }
            else if (chunk.startsWith("<")) { return chunk; }
            if (chunk == "---") { return "<hr>"; }
            if (chunk.startsWith("!meta")) { articleMeta(chunk); return ""; }
            if (chunk.startsWith("!image-float-left")) { return imageFloat(chunk, "left"); }
            if (chunk.startsWith("!image-float")) { return imageFloat(chunk, "right"); }
            if (chunk.startsWith("!image-span")) { return imageSpan(chunk); }
            if (chunk.startsWith("!gallery")) { return gallery(chunk); }
            if (chunk.startsWith("!square-gallery")) { return squareGallery(chunk); }
            if (chunk.startsWith("!video")) { return autoVideo(chunk); }
            if (chunk.startsWith("!yt-gallery")) { return ytGallery(chunk); }
            chunk = chunk.replaceAll("\\`", "&#96;");
            if (chunk.startsWith("!codeblock")) { return codeblock(chunk) ; }
            chunk = chunk.replace(/`(.+?)`/g, codeReplace);
            
            let isFine = false;
            if (chunk.startsWith(".")) {
                chunk = chunk.slice(1).trimStart();
                isFine = true;
            }
            let isInfo = false;
            if (chunk.startsWith("!info")) {
                chunk = chunk.substring(chunk.indexOf("\n"));
                isInfo = true;
            }
            
            /* ------------------------------------- links ------------------------------------- */
            /*
                [text to be displayed](https://irisembury.github.io/)
            */
            chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkAddress) => {
                linkAddress = linkAddress.replaceAll("\\)", ")");
                
                let linkIndex = contentLinks.indexOf(linkAddress);
                if (linkIndex == -1) {
                    linkIndex = contentLinks.push(linkAddress);
                }
                
                if (linkAddress.startsWith("http")) {
                    if (displayText == "") {
                        return `<a href="${ linkAddress }" class="autoref" title="${ linkAddress }">[${ linkIndex }]</a>`;
                    }
                    else {
                        return `<a href="${ linkAddress }" title="${ linkAddress }">${ displayText }</a><sup class="inline-link-index no-select">${ linkIndex }</sup>`;
                    }
                }
                else {
                    if (displayText == "") {
                        return `<a href="${ linkAddress }" class="autoref">[${ linkIndex }]</a>`;
                    }
                    else {
                        return `<a href="${ linkAddress }">${ displayText }</a><sup class="inline-link-index no-select">${ linkIndex }</sup>`;
                    }
                }
            });

            if (chunk.startsWith("!profile-grid")) { return profileGrid(chunk); }
            if (chunk.startsWith("!table")) { return autoTable(chunk); }
            if (chunk.startsWith("!rows")) { return autoRows(chunk); }
            if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) {
                const class_ = isFine ?"auto-list fine" :"auto-list"
                return `<div class="${ class_ }">${ autoList(chunk) }</div>`;
            }
            if (chunk.startsWith("    ")) { return autoIndent(chunk); }
            if (/^\#{1,4} /.test(chunk)) { return autoHeading(chunk); }

            chunk = `<p>${ textFormat(chunk) }</p>`;
            if (isFine) {
                return `<div class="fine">${ chunk.replace(/[^>]\n/g, "<br>") }</div>`;
            }
            if (isInfo) {
                return `<div class="info">${ chunk }</div>`;
            }
            return chunk;
        }
    )
    return input.join("");
}

function ageFromISO(argDate) {
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
        input_string = input_string
            .replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1") /* like for saying '95 to indicate a year */
            .replaceAll(/(>|^| |\()'/g, "$1&lsquo;")
            .replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2")
            .replaceAll(/'/g, "&rsquo;")
            
            .replaceAll(/(>|^| |\()"/g, "$1&ldquo;")
            .replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2")
            .replaceAll(/"(,|\.)/g, "<span style='margin-right:-2px'>&rdquo;</span>$1")
            .replaceAll(/"/g, "&rdquo;")
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

const allFonts = "Consolas,Verdana,Cambria,Libre Caslon Text,Arial,Epilogue,Calibri,Lexend,Lora,Times New Roman,Georgia,Inter,Open Sans,Roboto Slab,Roboto,Segoe UI,Trebuchet MS".split(",").map(o => `<option value="${o}">${o}</option>`).sort();

window.addEventListener("load", function() {
    const index = document.getElementById("index") != null;
    const pathToRoot = index ? "" : "../../";
    document.head.insertAdjacentHTML("beforeend", '<meta charset="utf-8"><link rel="stylesheet" href="' + pathToRoot + 'assets/fonts.css">');

    document.body.innerHTML = `<nav id="navbar">
        <div class="align-center gap-8">
            <div class="hamburger icon"><svg viewBox="0 0 24 24"><path fill="currentcolor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div>
            <div class="gap-5">${ index ? "<span>Iris Embury</span>" : `<a href="${ pathToRoot }index.html">Iris Embury</a>` }${ index ? "" : '&verbar;<div title="This page" class="page-name-display">' + document.title + "</div>" }</div>
        </div>
        <div class="align-center gap-8">
             ${ index ? "" : `<a class="jump-to-top no-select" onclick="scrollToTop()">Jump to Top</a>` }
            <div class="gear icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></div>
        </div>
    </nav>
    <nav class="left-panel closed">
        <div class="nav-row page-title">Links</div>
        <div class="nav-row"><a href="https://youtube.com/channel/UCXadODjAtT72eYW6xCGyuUA"><svg title="YouTube" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 30 30"><path  fill="var(--c-youtube-red)" d="M29.2 8.6c-.3-1.6-1.6-2.8-3.2-3C23 5.2 15 5.2 15 5.2s-8 0-11 .4c-1.6.2-2.9 1.4-3.2 3C.4 11.6.4 15 .4 15s0 3.4 .4 6.4c.3 1.6 1.6 2.8 3.2 3C7 24.8 15 24.8 15 24.8s8 0 11-.4c1.6-.2 2.9-1.4 3.2-3 .4-3 .4-6.4 .4-6.4s0-3.4-.4-6.4z"/><path fill="var(--c-youtube-white)" d="M12 19.2V10.8l7.8 4.2-7.8 4.2z"/></svg>YouTube</a></div>
        <div class="nav-row"><a href="https://bsky.app/profile/irisembury.bsky.social"><svg title="Bluesky" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 57" width="18" height="18"><path fill="var(--c-bluesky)" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>Bluesky</a></div>
        <div class="nav-row"><a href="https://irisembury.tumblr.com/"><svg title="Tumblr" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 530 530"><path fill="var(--c-tumblr)" d="M260,0 C403.1,0 520,116.9 520,260 C520,403.1 403.1,520 260,520 C116.9,520 0,403.1 0,260 C0,116.9 116.9,0 260,0 Z"/><path fill="var(--c-tumblr-white)" d="M222.5 113.9h55.8v71.1h48.3v55.8h-48.3v91.5c0 24.1 13.6 31.6 32.2 31.6 9.5 0 20.6-1.4 28.5-3.9v51.9c-9.9 4.7-27.8 9.4-47.3 9.4-47.6 0-78.5-29.3-78.5-82.7V240.8h-38.9v-55.8h38.9v-71.1z"/></svg>Tumblr</a></div>
        <div class="nav-row"><a href="https://x.com/irisembury"><svg title="Twitter/X" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="-1 -1 25 25"><path fill="var(--c-twitter)" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>Twitter/X</a></div>
        <div class="nav-row"><a href="https://irisembury.substack.com/"><svg title="Substack" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 64 64"><path fill="var(--c-substack)" d="M8 10 H56 V16 H8 Z" /><path fill="var(--c-substack)" d="M8 22 H56 V28 H8 Z" /><path fill="var(--c-substack)" d="M8 34 H56 V62 L32 50 L8 62 Z" /></svg>Substack</a></div>
        <div class="nav-row"><a href="https://discord.gg/fGdV7x5dk2"><svg title="Discord" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="var(--c-discord)" d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/></svg>Invite to my Discord</a></div>
        <div class="nav-row page-title">Latest pages uploaded</div>
        ${
            pageData.split("\n").filter(
                entry => entry.length > 2
            ).map(
                entry => {
                    entry = entry.replaceAll("\\|","&verbar;").split("|").map(
                        c => c.trim()
                    );
                    while (entry.length < 3) {
                        entry.push("");
                    }
                    entry = {
                        title: entry[0],
                        url:   entry[1],
                        date:  entry[2]
                    }
                    return `<div class="nav-row"><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.title }</a></div>`;
                }
            ).join("")
        }
    </nav>
    <div class="screen"></div>
    <div class="right-panel closed">
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
        <hr>
        <div class="menu-options">
            <div>
                <label for="page-full-width">Span page width</label>
                <input type="checkbox" class="menu-checkbox" id="page-full-width">
            </div>
            <div>
                <label for="hide-toc-checkbox"${ HTML.classList.contains("include-toc") ?"" :' style="cursor:help" title="This page has no TOC, but you can change the site-wide preference"' }>Hide table of contents</label>
                <input type="checkbox" class="menu-checkbox" id="hide-toc-checkbox">
            </div>
            <div>
                <label for="indent-justify-checkbox">Text align justify</label>
                <input type="checkbox" class="menu-checkbox" id="indent-justify-checkbox">
            </div>
        </div>
        <hr>
        <h3>Fonts override:</h3>
        <table id="fonts">
            <tbody>
                <tr><td>Headings:</td><td>
                    <select class="menu-select" id="heading-font-select">
                        ${
                            `
                                Cambria
                                Epilogue
                                Georgia
                                Inter
                                Libre Caslon Text
                                Lora
                                Open Sans
                                Roboto
                                Roboto Slab
                                Segoe UI
                                Trebuchet MS
                            `.split("\n").filter(
                                o => o.trim().length > 2
                            ).map(
                                o => {
                                    o = o.trim();
                                    return `<option value="${ o }">${ o }</option>`;
                                }
                            ).join("")
                        }
                    </select>
                </td></tr>
                <tr><td>Body:</td><td>
                    <select class="menu-select" id="body-font-select">
                        ${
                            `
                                Amethysta
                                Arial
                                Georgia
                                Inter
                                PT Serif
                                Roboto
                                Trebuchet MS
                            `.split("\n").filter(
                                o => o.trim().length > 2
                            ).map(
                                o => {
                                    o = o.trim();
                                    return `<option value="${ o }">${ o }</option>`;
                                }
                            ).join("")
                        }
                    </select>
                </td></tr>
                <tr><td>Tables:</td><td>
                    <select class="menu-select" id="table-font-select">
                        ${
                            `
                                Arial
                                Open Sans
                                Roboto
                                Segoe UI
                                Trebuchet MS
                                Ubuntu
                            `.split("\n").filter(
                                o => o.trim().length > 2
                            ).map(
                                o => {
                                    o = o.trim();
                                    return `<option value="${ o }">${ o }</option>`;
                                }
                            ).join("")
                        }
                    </select>
                </td></tr>
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
            <div class="article-top hidden"></div>
            <div class="article">
                ${ document.body.innerHTML }
            </div>
            <div class="article-footer">
            </div>
        </div>
    </div>
    <div class="lb-container">
        <div class="lb-top-left"></div>
        <div class="lb-wrapper"><img class="lightbox"></div>
        <div class="lb-bottom-panel"><div class="lb-caption"></div></div>
    </div>
    <style id="pref-styles"></style>`;

    interpreter(document.querySelector(".article"));

    /* ---- irisembury.github.io (front page) ---- */
    if (index) {
        let pdata = pageData.split("\n").filter(
            entry => entry.length > 2
        ).map(
            entry => {
                entry = entry.replaceAll("\\|", "&verbar;").split("|").map( c => c.trim() );
                while (entry.length < 3) {
                    entry.push("");
                }
                /* entry[0] = title, entry[1] = url, entry[2] = date */
                return `<a href="page/${ pathToRoot + entry[1] }/index.html">${ entry[0] }</a>|<span class="date">${ entry[2] }</span>`;
            }
        ).join("\n");
        document.getElementById("index").innerHTML = autoRows("!rows\n" + pdata);
    }
    else {
        /* no citelist for front page */
        const citeData = contentLinks.map(
            (x, n) => {
                return `<tr>
                    <td>${ n+1 }.</td>
                    <td><a href="${ x }">${ x }</a></td>
                </tr>`
            }
        ).join("");
        
        let citelist = `<div class="footer-back-to-index"><a href="../../index.html">&larr; Back to index (front page)</a></div>
        <div>
            <div>Links on this page:</div>
            <table class="citelist">${ citeData }</table>
        </div>`;
        document.querySelector(".article-footer").insertAdjacentHTML("beforeend", citelist);
    }
    const videosIndex = document.getElementById("videos-index");
    if (videosIndex != null) {
        let lnum = videosIndex.className.replace(/\D/g,"") || 3;
        videosIndex.innerHTML = ytGallery("!yt-gallery sort"+ lnum +" \n" + videoData);
    }
    /* ---- irisembury.github.io/videos ---- */
    const allVideoIndex = document.getElementById("all-videos-index");
    if (allVideoIndex != null) {
        allVideoIndex.innerHTML = ytGallery("!yt-gallery\n" + videoData);
    }

    HTML.classList.add("layout");
    Array.from(document.getElementById("fonts").getElementsByTagName("option")).forEach(o => o.style.fontFamily = `"${ o.value }",system-ui` );

    document.querySelector(".lb-wrapper").addEventListener("click", () => {
        setLightbox("close")
    })

    const navbar = document.getElementById("navbar");
    let canNavCheck = true;
    function navCheck() {
        if (!canNavCheck) {
            return;
        }
        canNavCheck = false;
        setTimeout(
            function() {
                canNavCheck = true;
                navbar.classList.toggle("sticky-active", pageYOffset > 180);
            },
            500
        )
        navbar.classList.toggle("sticky-active", pageYOffset > 180);
    }
    navCheck();
    window.addEventListener("scroll", navCheck);

    /* ---- ---- ---- ---- ---- ---- ---- gearMenu ---- ---- ---- ---- ---- ---- ---- */
    const gearIcon = document.querySelector(".gear");
    const gearMenu = document.querySelector(".right-panel");
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
    /*
        connect elements, enable toggles for click handler
    */
    const hamburgerIcon = document.querySelector(".hamburger");
    const hamburgerMenu = document.querySelector(".left-panel");
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

    /* ---- ---- ---- ---- ---- ---- items inside gear menu ---- ---- ---- ---- ---- ---- */

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

    if (localStorage.getItem("indent-justify") == "true") {
        HTML.classList.add("indent-justify");
        document.getElementById("indent-justify-checkbox").checked = true;
    } else {
        document.getElementById("indent-justify-checkbox").checked = false;
    }
    document.getElementById("indent-justify-checkbox").addEventListener("change", function() {
        localStorage.setItem("indent-justify", this.checked);
        HTML.classList.toggle("indent-justify", this.checked);
    });
    
    /* other options are site-wide, this one is page-specific: */
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
    
    /* ---- ---- ---- ---- ---- ---- quote expand element ---- ---- ---- ---- ---- ---- ---- ---- */
    Array.from(document.getElementsByClassName("expando")).forEach(expando => {
        expando.innerHTML = '<span class="expando-triangle no-select"></span>' + expando.innerHTML.split("<br>").map(o => `<p>${ o }</p>`).join("") + '<span class="expando-collapse-button no-select">[ collapse ▲ ]</span>';
        const triangle = expando.querySelector(".expando-triangle");
        function expandoToggle(click) {
            click.stopPropagation();
            // expanding:
            if (expando.classList.contains("collapsed")) {
                expando.classList.remove("collapsed");
                expando.removeAttribute("title");
                triangle.innerHTML = "[▲]";
            }
            // collapsing:
            else {
                expando.classList.add("collapsed");
                expando.title = "Click to expand";
                triangle.innerHTML = "[▼]";
            }
        }
        triangle.addEventListener("click", expandoToggle);
        if (expando.classList.contains("collapsed")) {
            expando.title = "Click to expand";
            triangle.innerHTML = "[▼]";
        }
        else {
            triangle.innerHTML = "[▲]";
        }
        expando.addEventListener("click", function(click) {
            expando.classList.remove("collapsed");
            expando.removeAttribute("title");
            triangle.innerHTML = "[▲]";
        })
        const bottomButton = expando.querySelector(".expando-collapse-button");
        bottomButton.addEventListener("click", function(click) {
            click.stopPropagation();
            expando.classList.add("collapsed");
            expando.title = "Click to expand";
            triangle.innerHTML = "[▼]";
            if (expando.getBoundingClientRect().top + window.scrollY < pageYOffset) {
                expando.scrollIntoView({ behavior: "smooth" });
            }
        })
    })

    /* ---- ---- ---- ---- ---- ---- ---- ---- table of contents ---- ---- ---- ---- ---- ---- ---- ---- */

    if (HTML.classList.contains("include-toc")) {
        const headings = Array.from(document.getElementsByClassName("--for-toc"));
        if (headings.length > 0) {
            const hideTocCheckbox = document.getElementById("hide-toc-checkbox");
            if (!hideTocCheckbox.checked) {
                window.addEventListener("scroll", tocHighlightUpdateAttempt)
            }
            hideTocCheckbox.addEventListener("change", function() {
                HTML.classList.toggle("include-toc", !this.checked);
                if (!this.checked) {
                    window.addEventListener("scroll", tocHighlightUpdateAttempt);
                } else {
                    window.removeEventListener("scroll", tocHighlightUpdateAttempt);
                }
            });
            
            const toc = document.getElementById("toc");
            toc.innerHTML = '<div class="toc-title">Table of contents</div>' + headings.map(
                heading =>
                    `<div class="toc-row ${heading.tagName.toLowerCase()}"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>`
            ).join("");
            toc.scrollTo({ behavior: "instant", top: 0 })
            const rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
            rowsInToc[0].className = "toc-row";
            rowsInToc[0].innerHTML = '<a class="pseudo-link" onclick="scrollToTop()">(Top)</a>';

            let canTocHighlightUpdate = true;
            function tocHighlightUpdateAttempt() {
                if (!canTocHighlightUpdate) {
                    return;
                }
                canTocHighlightUpdate = false;
                setTimeout(() => {
                    canTocHighlightUpdate = true;
                    tocHighlightUpdate();
                }, 500);
                tocHighlightUpdate();
            }
            let lastHeading = -1;

            function tocHighlightUpdate() {
                let currentHeading = -1;
                for (let heading = 0; heading < headings.length; heading += 1) {
                    let elementDistanceFromPageTop = window.scrollY + headings[heading].getBoundingClientRect().top;
                    if (pageYOffset < elementDistanceFromPageTop - (0.4 * window.innerHeight)) {
                        break;
                    }
                    currentHeading = heading;
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
                                )
                            }
                            else if (rRect.top < tRect.top) {
                                toc.scrollTo(
                                    { top: row.offsetTop - 4, behavior: "smooth" }
                                )
                            }
                        }
                        else {
                            row.classList.remove("active-heading");
                        }
                    })
                }
                lastHeading = currentHeading;
            }
        }
    }
    else {
        let toc = document.getElementById("toc");
        if (toc != null) {
            toc.parentNode.removeChild(toc);
        }
    }
})


