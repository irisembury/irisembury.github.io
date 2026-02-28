"use strict"
const HTML = document.documentElement;

const pageData = `
The case for abortion | abortion | 2026-02-18
A synopsis of American decline | a-synopsis-of-american-decline | 2026-01-28
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
Poor Things (2023 film) | poor-things | 2024-10-31
The trans prison stats argument | the-trans-prison-stats-argument | 2024-10-19`.split("\n").filter(n => n).map(
    entry => {
        entry = entry.replaceAll("\\|","&verbar;").split("|").map(c => c.trim());
        while (entry.length < 3) entry.push("");
        entry = {
            name: entry[0],
            url: entry[1],
            date: entry[2]
        }
        return entry;
    }
);

const videoData = `
Abortion | CpjJ8TgOxJY | 2026-02-24
A synopsis of American decline | oUOsAdnK2zs | 2026-02-11
give yourself credit | mM5fcuJnfZQ | 2026-01-23
Potential issues with our elections | 509Q_HUp8CE | 2026-01-19
Why is Reddit so hated? | jPVl5cfVP1k | 2026-01-13
thoughts and plans | _zePgOyNPt4 | 2026-01-06
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
    const lightbox = document.querySelector(".lightbox");
    const lbCaption = document.querySelector(".lb-caption");
    const lbTopLeft = document.querySelector(".lb-top-left");
    if (lightbox == null || lbCaption == null || lbTopLeft == null) {
        return;
    }
    /* action is click from <img> object */
    if (action == "close") {
        lightbox.src = "";
        lightbox.alt = "";
        HTML.classList.remove("lb-enabled");
    }
    /* action is urlstring passed by function call */
    else if (typeof action == "string") {
        console.log("A: " + action)
        lightbox.src = action;
        lightbox.alt = action;
        HTML.classList.add("lb-enabled");
        lbCaption.innerHTML = action;
        lbTopLeft.innerHTML = `<a href="${ action }">${ action.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`
    }
    else {
        lightbox.src = action.src;
        lightbox.alt = action.alt;
        HTML.classList.add("lb-enabled");
        lbTopLeft.innerHTML = `<a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        lbCaption.innerHTML = action.alt;
    }
}

function setTheme(setValue) {
    let brightness = setValue || localStorage.getItem("brightness") || "light";
    HTML.classList.remove(...Array.from(document.getElementById("brightness-select").children).map(o => o.value).filter(o => o != brightness));
    HTML.classList.add(brightness);
    localStorage.setItem("brightness", brightness);
    document.getElementById("brightness-select").value = brightness;
}

function setCSS(mEle) {
    if (mEle != null && mEle instanceof Node) {
        localStorage.setItem(mEle.id, mEle.value);
    }
    let styleOverrides = [];
    const selects = Array.from(document.getElementsByClassName("drop-select"));
    selects.forEach(
        select => {
            select.value = localStorage.getItem(select.id) ||sdefaults[select.id];
            if (select.value != sdefaults[select.id]) { styleOverrides.push(select.id + ": " + select.value) }
        }
    )
    document.getElementById("__css_user_set").innerHTML = styleOverrides.length > 0 ?"html {\n" + styleOverrides.join("!important;\n") + "!important;\n}" :"";
}
const sdefaults = {
    "--ff-heading": "Inter",
    "--ff-article": "Georgia Pro Digits,Georgia",
    "--ff-secondary": "Roboto",
    "--ff-small": "Open Sans"
}
function resetCSS() {
    for (let k in sdefaults) {
        localStorage.setItem(k, sdefaults[k])
    }
    setCSS();
    setFormatting(false);
}
function setFormatting(bool) {
    bool = bool ?true :false;
    Array.from(document.querySelectorAll(".slide-checkbox.formatting")).forEach(
        checkbox => {
            checkbox.checked = bool;
            HTML.classList.toggle(checkbox.id, bool);
            localStorage.setItem(checkbox.id, bool);
        }
    )
}

function imageFloat(chunk) {
    const rows = chunk.split("\n");
        let firstRow = rows.shift();
        const direction = firstRow.split(" ").shift().endsWith("left") ?"left" :"right";
            firstRow = firstRow.substring(firstRow.indexOf(" "));
        const lazy = !firstRow.includes("nolazy");
        const maxHeight = firstRow.replace(/\D/g, "");
    
    return `<div class="image-float ${ direction }">${ rows.map(
        row => {
            const parts = row.split("|");
            while (parts.length < 3) { parts.push(""); }
            let caption = autoFormat(parts[1]);
            let altText = autoFormat(parts[2].replace(/"/g,"&quot;"));
            if (caption && !altText) { altText = caption }
            if (caption) { caption = `<figcaption>${ caption }</figcaption>`; }
            return `<figure><img ${ lazy ?'load="lazy"' :""} onclick="setLightbox(this)" src="${ parts[0].trim() }" title="${ altText }" alt="${ altText }">${ caption }</figure>`;
        }
    ).join('') }</div>`;
}

function imageSpan(chunk) {
    const rows = chunk.split("\n");
        let firstRow = rows.shift();
            firstRow = firstRow.substring(firstRow.indexOf(" "));
        const lazy = !firstRow.includes("nolazy");
        const maxHeight = firstRow.replace(/\D/g, "");
    
    return `<div class="image-span">${ rows.map(
        row => {
            const parts = row.split("|");
            while (parts.length < 3) { parts.push(""); }
            let imgUrl = parts[0].trim();
            let altText = autoFormat(parts[1].replace(/"/g,"&quot;"));
            return `<div><img ${ lazy ?'load="lazy"' :""} style="max-height: ${ maxHeight || 300 }px;" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }"></div>`;
        }
    ).join('') }</div>`;
}

function gallery(chunk) {
    const rows = chunk.split("\n");
        let firstRow = rows.shift();
            firstRow = firstRow.substring(firstRow.indexOf(" "));
        const lazy = !firstRow.includes("nolazy");
        const maxHeight = firstRow.replace(/\D/g, "");
    
    return `<div class="captioned-gallery">${ rows.map(
        row => {
            const parts = row.split("|");
            while (parts.length < 3) {
                parts.push("");
            }
            let imgUrl = parts[0].trim();
            let caption = autoFormat(parts[1]);
            let altText = autoFormat(parts[2].replace(/"/g,"&quot;"));
            return `<figure><img ${ lazy ?'load="lazy"' :""} style="max-height: ${ maxHeight || 300 }px;" onclick="setLightbox(this)" src="${ imgUrl }" title="${ altText }" alt="${ altText }"><figcaption>${ caption }</figcaption></figure>`;
        }
    ).join('') }</div>`;
}

function squareGallery(chunk) {
    const rows = chunk.split("\n");
        let firstRow = rows.shift();
            firstRow = firstRow.substring(firstRow.indexOf(" "));
        const lazy = !firstRow.includes("nolazy");
        const maxHeight = firstRow.replace(/\D/g, "");
    
    return `<div class="square-gallery">${ rows.map(
        row => {
            const parts = row.split("|");
            while (parts.length < 3) { parts.push(""); }
            let caption = autoFormat(parts[1]);
            let altText = autoFormat(parts[2].replace(/"/g,"&quot;"));
            if (!altText) { altText = caption; }
            if (caption) { caption = `<figcaption>${ caption }</figcaption>`; }
            return `<figure><div class="img-wrapper"><img loading="lazy" onclick="setLightbox(this)" src="${ parts[0].trim() }" title="${ altText }" alt="${ altText }"></div>${ caption }</figure>`;
        }
    ).join('') }</div>`;
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
    let firstRow = rows.shift();
        firstRow = firstRow.substring(firstRow.indexOf(" "))
    const sortInput = firstRow.includes("sort");
    const numToInclude = parseInt(firstRow.replace(/\D/g, "")) || rows.length;
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

function autoTable(chunk, table_number) {
    const table = `<div class="table-wrapper"><table class="auto-table auto-table-${ table_number }"><tbody>${
        chunk.replace(/\n +/g, "<br>").split("\n").slice(1).map(
            (row, row_index) => {
                return `<tr class="row row-${ (row_index + 1) + " row-" + (row_index % 2 ?"even" :"odd") }">${
                    row.replaceAll("\\|", "&verbar;").split("|").map(
                        (cell, cell_index) => {
                            return `<td class="cell col-${ cell_index + 1 } col-${ cell_index % 2 ?"even" :"odd" }">${
                                cell.split("<br>").map(
                                    p => {
                                        p = p.trim();
                                        if (p == "---") { p = '<hr>'; }
                                        
                                        else if (p.startsWith(".")) { p = '<p class="fine">' + p.substring(1).trimStart() + '</p>'; }
                                        else if (p.startsWith("#")) { p = '<blockquote><p>' + p.substring(1).trimStart() + '</p></blockquote>'; }
                                        else p = '<p>' + p + '</p>';
                                        return autoFormat(p);
                                    }
                                ).join('')
                            }</td>`
                        }
                    ).join('')
                }</tr>`
            }
        ).join('')
    }</tbody></table></div>`
    
    const firstRow = chunk.substring("!table".length, chunk.indexOf("\n")).trim();
    if (firstRow.replace(/\s/g, "").length > 1) {
        return table + `<style>${ firstRow.replace(/this/g, ".auto-table-" + table_number).replace(/;/g, " !important;") }</style>`;
    }
    return table;
}
/*
    above (autoTable): The even and odd is 'backwards' because row_index/cell_index are converting from being 0-indexed to being 1-indexed (rows[0] is the 1st row, rows[1] is the 2nd row, etc.)
*/

function autoRows(chunk, tnum) {
    let rows = chunk.split("\n");
    let firstRow = rows.shift().substring("!rows".length).trim();
    /* make tbody cells */
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
        let rowNum = rowIndex + 1;
        let cells = rows[rowIndex].replaceAll("\\|", "&verbar;").split("|");
        for (let cellIndex = 0; cellIndex < cells.length; cellIndex += 1) {
            let cellNum = cellIndex + 1;
            cells[cellIndex] = `<div class="cell col-${ cellNum + " col-" + (cellNum % 2 ? "odd" : "even") }">${ autoFormat(cells[cellIndex]) }</div>`;
        }
        rows[rowIndex] = `<div class="row row-${ rowNum + " row-" + (rowNum % 2 ? "odd" : "even") }">${ cells.join("") }</div>`;
    }
    /* if !rows declaration had styling included (same as !table logic): */
    let customTableStyle = "";
    if (firstRow.replace(/\s/g, "").length > 1) {
        customTableStyle = `<style>${ firstRow.replace(/this/g, ".auto-rows-"+tnum).replace(/;/g, " !important;") }</style>`;
    }
    let table = `${ customTableStyle }<div class="table-wrapper"><div class="auto-rows auto-rows-${ tnum }">${ rows.join("") }</div></div>`;
    return table;
}

function autoList(list, fine) {
    const closeTags = [];
    let prevIndent = -1;
    list = list.split("\n").map(
        li => {
            const initpad = li.match(/^ */)[0].length;
            li = autoFormat(li.substring(initpad));
            const indent = Math.floor(initpad * 0.25);
            const liType = /^[\*\-] /.test(li) ?"ul" :(/^\d+\. /.test(li) ?"ol" :"none");
            const listType = (liType =="ol") ?"ol" :"ul";
            let startNum = (liType =="ol") ?li.substring(0, li.indexOf(".")) :1;
            li = (liType) =="none" ?li.trimStart() :li.substring(li.indexOf(" ")).trimStart();
            li = " ".repeat(indent * 4) + ( liType =="none" ?"<p>"+li+"</p>\n" :"<li>"+li+"</li>\n");
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
    let lclass = fine ?' class="auto-list fine"' :' class="auto-list"';
    return list.substring(0,3) + lclass + list.substring(3);
}

function autoIndent(chunk) {
    return `<blockquote>${ chunk.split("\n").map(
        line => {
            line = autoFormat(line);
            if (line != "") {
                if (line == "---") { return "<hr>"; }
                if (line.startsWith("---")) {
                    return `<p class="attribution">${ line }</p>`;
                }
                return "<p>"+ line +"</p>";
            }
        }
    ).join('')}</blockquote>`;
}

function parseMeta(chunk) {
    const article = document.querySelector(".article");
    if (article == null) {
        return;
    }
    let articleTop = article.parentNode.insertBefore(document.createElement("div"), article);
    articleTop.className = "article-top";
    let mTitle = "", mSubtitle = "", mDate = "", mSeeAlso = [];
    
    chunk.split("\n").slice(1).forEach( line => {
        line = line.split(":", 2); if (line.length!=2) { return; }
        const mKey = line[0].trim(), mVal = line[1].trim();
        
        if (mKey == "title") {
            document.title = mVal.replaceAll("---", "—").replaceAll("--", "–");
            mTitle = '<h1 class="article-title --for-toc">' + autoFormat(mVal) + '</h1>';
        }
        else if (mKey == "subtitle") {
            mSubtitle = '<h2 class="article-subtitle">' + autoFormat(mVal) + '</h2>';
        }
        else if (mKey == "date") {
            mDate = '<div class="article-date">' + isoFormat(mVal) + '</div>';
        }
        else if (mKey == "see-also") {
            let addr = mVal.toLowerCase().split("|").map(c => c.trim());
            if (addr[0] =="tumblr") {
                mSeeAlso.push('<a class="see-also" title="This was also posted on Tumblr" href="https://irisembury.tumblr.com/'+ addr[1] +'"><svg title="Tumblr" role="img" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 530 530"><path fill="var(--c-tumblr)" d="M260,0 C403.1,0 520,116.9 520,260 C520,403.1 403.1,520 260,520 C116.9,520 0,403.1 0,260 C0,116.9 116.9,0 260,0 Z"/><path fill="var(--c-tumblr-white)" d="M222.5 113.9h55.8v71.1h48.3v55.8h-48.3v91.5c0 24.1 13.6 31.6 32.2 31.6 9.5 0 20.6-1.4 28.5-3.9v51.9c-9.9 4.7-27.8 9.4-47.3 9.4-47.6 0-78.5-29.3-78.5-82.7V240.8h-38.9v-55.8h38.9v-71.1z"/></svg><span>read on Tumblr</span></a>');
            }
            else if (addr[0] =="substack") {
                mSeeAlso.push('<a class="see-also" title="This was also posted on Substack" href="https://irisembury.substack.com/p/'+ addr[1] +'"><svg title="Substack" role="img" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 64 64"><path fill="var(--c-substack)" d="M8 10 H56 V16 H8 Z" /><path fill="var(--c-substack)" d="M8 22 H56 V28 H8 Z" /><path fill="var(--c-substack)" d="M8 34 H56 V62 L32 50 L8 62 Z" /></svg><span>read on Substack</span></a>');
            }
        }
    })
    articleTop.innerHTML = mTitle + mSubtitle + '<div class="info-space">' + mDate + mSeeAlso.join('') + '</div>'
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
    chunk = autoFormat(chunk);
    return `<${ tag } id="${ id }" class="auto-heading --for-toc">${ chunk }</${ tag }>`;
}

function linkReplace(chunk, externalLinksArray) {
    return chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkAddress) => {
        linkAddress = linkAddress.replaceAll("\\)", ")");
        if (linkAddress.startsWith("http")) {
            let linkIndex = externalLinksArray.indexOf(linkAddress);
            if (linkIndex == -1) {
                linkIndex = externalLinksArray.push(linkAddress);
            }
            if (displayText == "") {
                return `<a href="${ linkAddress }" class="autoref" title="${ linkAddress }">[${ linkIndex }]</a>`;
            }
            else {
                return `<a href="${ linkAddress }" title="${ linkAddress }">${ displayText }</a>`;
            }
        }
        /* internal link */
        else {
            /* link to internal image? pass to lightbox */
            if (linkAddress.endsWith(".png") || linkAddress.endsWith(".jpg")) {
                return `<a onclick="setLightbox('${ linkAddress }')" class="pseudo-link" title="${ linkAddress.split("/").slice(-1).join("") }">${ displayText }</a>`
            }
            if (displayText == "") {
                return `<a href="${ linkAddress }" class="autoref">[↗]</a>`;
            }
            else {
                return `<a href="${ linkAddress }">${ displayText }</a>`;
            }
        }
    })
}

/* ------------------------------- main interpreter for #article content ------------------------------- */
function interpreter(argValue, linksArr) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML, linksArr);
        return;
    }
    let input = argValue.replace(/\n\n+/g, "\n\n")
        .replace(/\r/g, "") /* for safety, probably no effect */
        .trim().split("\n\n");

    let tableNum = 1;
    input = input.map( chunk => {
        chunk = chunk.replace(/\t/g, "    "); /* probably no effect */
        if (chunk.startsWith("\\")) { chunk = chunk.substring(1); }
        else if (chunk.startsWith("<")) { return chunk; }
        if (chunk == "---") { return "<hr>"; }
        if (chunk.startsWith("!meta")) { parseMeta(chunk); return ""; }
        if (/^#{1,4} /.test(chunk)) { return autoHeading(chunk); }
        if (chunk.startsWith("!image-float")) { return imageFloat(chunk); }
        if (chunk.startsWith("!image-span")) { return imageSpan(chunk); }
        if (chunk.startsWith("!gallery")) { return gallery(chunk); }
        if (chunk.startsWith("!square-gallery")) { return squareGallery(chunk); }
        if (chunk.startsWith("!video")) { return autoVideo(chunk); }
        if (chunk.startsWith("!yt-gallery")) { return ytGallery(chunk); }
        chunk = chunk.replaceAll("\\`", "&#96;");
        if (chunk.startsWith("!codeblock")) { return codeblock(chunk) ; }
        chunk = chunk.replace(/`(.+?)`/g, codeReplace);
        if (chunk.startsWith("!info")) { return `<div class="info">${ autoFormat(chunk.substring(chunk.indexOf("\n"))) }</div>`; }
        
        let isFine = chunk.startsWith(".");
        if (isFine) chunk = chunk.slice(1).trimStart();

        /* ------------------------------------- links ------------------------------------- */
        /*
            [text to be displayed](https://irisembury.github.io/)
        */
        chunk = linkReplace(chunk, linksArr);

        if (chunk.startsWith("!table")) { return autoTable(chunk, tableNum++); }
        if (chunk.startsWith("!rows")) { return autoRows(chunk, tableNum++); }
        if (chunk.startsWith("    ") || chunk.startsWith("!indent")) { return autoIndent(chunk); }

        if (chunk.startsWith("!list")) { chunk = "- " + chunk.split("\n").slice(1).join("\n- "); }
        if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) { return autoList(chunk, isFine); }

        chunk = autoFormat(chunk);
        
        if (isFine) { return `<p class="fine">${ chunk.replace(/\n/g,"<br>") }</p>`; }
        return `<p>${ chunk.replace(/  \n/g,"<br>") }</p>`;
    })
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
    if (entryYear < 999 || entryYear > 2999 || entryMonth > 12 || entryDay > 31) {
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

function autoFormat(argVal) {
    argVal = argVal.trim();
    if (argVal == "") { return argVal; }
    function auxf(str_in) {
        if (str_in == "") return str_in;
        str_in = str_in.replaceAll("\\*", "&ast;").replaceAll('\\"', "&quot;").replaceAll("\\'", "&apos;").replaceAll("\|", "&verbar;").replaceAll("\\(", "&lpar;").replaceAll("\\)", "&rpar;").replaceAll("\\[", "&lbrack;").replaceAll("\\]", "&rbrack;").replaceAll("\\", "&#92;").replaceAll("\\^", "&Hat;").replaceAll("...", "&hellip;");
        if (str_in.indexOf("'")!=-1||str_in.indexOf('"')!=-1) {
            str_in = str_in.replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1").replaceAll(/(>|^| |\()'/g, "$1&lsquo;").replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2").replaceAll(/'/g, "&rsquo;").replaceAll(/(>|^| |\()"/g, "$1&ldquo;").replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2").replaceAll(/"(,|\.)/g, "<span style='margin-right:-2px'>&rdquo;</span>$1").replaceAll(/"/g, "&rdquo;")
        }
        return str_in.replaceAll("---", "<span class='mdash'>&mdash;</span>").replaceAll("--", "&ndash;");
    }
    let output = "";
    while (true) {
        const openTag = argVal.indexOf("<");
        const closeTag = argVal.substring(openTag).indexOf(">") + openTag;
        if (openTag == -1 || closeTag - openTag == -1) { break; }
        const textContent = argVal.substring(0, openTag +1);
        const attributes = argVal.substring(openTag+1, closeTag);
        output += auxf(textContent) + attributes;
        argVal = argVal.substring(closeTag);
    }
    return (output + auxf(argVal)).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
}

/*
    above (autoFormat): The substring values I use to define the text content and attributes are so this captures the tag characters (<, >) as part of the text content. This means if given the string `a b <c> d e`, this will read that as `"a b <", "c", "> d e"`. The reason I do this is so auxf(function) can tell "b" is not the end of a string and "d" is not the beginning of one, since that affects how the curly quotes are applied. If this isn't desired and you want the tags to be part of the attributes variable, you could modify the while-true like so:
    
    while (true) {
        const openTag = argVal.indexOf("<");
        const closeTag = argVal.substring(openTag).indexOf(">") + openTag;
        if (openTag == -1 || closeTag - openTag == -1) { break; }
        const textContent = argVal.substring(0, openTag);
        const attributes = argVal.substring(openTag, closeTag + 1);
        output += auxf(textContent) + attributes;
        argVal = argVal.substring(closeTag + 1);
    }
*/

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
    document.head.insertAdjacentHTML("beforeend", '<meta charset="utf-8"><link rel="stylesheet" href="' + pathToRoot + 'assets/fonts.css">');

    document.body.innerHTML = `<nav class="navbar">
        <div class="nav-segment nav-left">
            <div class="hamburger icon"><svg viewBox="0 0 24 24"><path fill="currentcolor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div>
            <div class="gap-5">${ index ? "<span>Iris Embury</span>" : `<a href="${ pathToRoot }index.html">Iris Embury</a>` }${ index ? "" : '&verbar;<div title="This page" class="page-name-display">' + document.title + "</div>" }</div>
        </div>
        <div class="nav-segment nav-right">
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
        ${ pageData.map( entry => `<div class="nav-row"><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.name }</a></div>` ).join("") }
    </nav>
    <div class="screen"></div>
    <div class="right-panel no-select closed">
        <div><h3>Display preferences:</h3></div>
        <div><label for="dark">Dark mode</label><input type="checkbox" class="slide-checkbox auto" id="dark"></div>
        <div><label for="hide-toc">Hide table of contents (if this page has one)</label><input type="checkbox" class="slide-checkbox" id="hide-toc"></div>
        <div><label for="full-width">Full page span</label><input type="checkbox" class="slide-checkbox" id="full-width"></div>
        <hr>
        <div><h3>Formatting:</h3></div>
        <div><label for="indent-text">Indent paragraphs</label><input type="checkbox" class="slide-checkbox formatting auto" id="indent-text"></div>
        <div><label for="justify-text">Text align justify</label><input type="checkbox" class="slide-checkbox formatting auto" id="justify-text"></div>
        <div><label for="reduce-margins">Reduce paragraph vertical margins</label><input type="checkbox" class="slide-checkbox formatting auto" id="reduce-margins"></div>
        <div><label for="narrow-width">Narrow column</label><input type="checkbox" class="slide-checkbox formatting auto" id="narrow-width"></div>
        <div><div style="margin-top:4px; margin-left:auto; color:var(--grey-8);"><span class="pseudo-link" onclick="setFormatting(true)" title="set all above on">all on</span> / <span class="pseudo-link" onclick="setFormatting(false)" title="all off">all off</span></div></div>
        <hr>
        <div><h3>Fonts override:</h3></div>
        <div><div>Headings:</div><select class="drop-select font-select" id="--ff-heading" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
        <div><div>Body:</div><select class="drop-select font-select" id="--ff-article" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro Digits,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
        <div><div>Secondary:</div><select class="drop-select font-select" id="--ff-secondary" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro Digits,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
        <div><div>Small:</div><select class="drop-select font-select" id="--ff-small" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro Digits,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
        <div><div style="margin-top:4px; margin-left:auto; cursor:pointer; color:var(--grey-8);" onclick="resetCSS()" title="restore font defaults">restore defaults</div></div>
        <div><label for="static-nav">Static (un-sticky) navbar</label><input type="checkbox" class="slide-checkbox auto" id="static-nav"></div>
        <hr>
        <div style="line-height:1.5; color:var(--grey-7);">If you change anything here, it's saved in session storage, not cookies, meaning it's all deleted automatically after you close your browser.</div>
    </div>
    <div class="page-grid">
        ${ HTML.classList.contains("include-toc") ? `<nav id="toc"></nav>` : "" }
        <div class="main-container">
            <div class="article">
                ${ document.body.innerHTML }
            </div>
            <div class="article-footer">
            </div>
        </div>
    </div>
    <div class="lb-container">
        <div class="lb-top-left"></div>
        <div class="lb-wrapper" onclick="setLightbox('close')"><img class="lightbox"></div>
        <div class="lb-bottom-panel"><div class="lb-caption"></div></div>
    </div>
    <style id="__css_user_set"></style>`;

    let contentLinks = [];
    interpreter(document.querySelector(".article"), contentLinks);
    HTML.classList.add("layout");
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                              .left-panel (hamburger) set-up                          
    */
    const hamburgerMenu = document.querySelector(".left-panel");
    function hamburgerMenuToggle(option) {
        if (option == "close" || option == "open") {
            hamburgerMenu.classList.toggle("closed", option == "close");
        }
        else {
            hamburgerMenu.classList.toggle("closed", !hamburgerMenu.classList.contains("closed"));
        }
    }
    const hamburgerIcon = document.querySelector(".navbar .hamburger.icon");
    hamburgerIcon.addEventListener("click", hamburgerMenuToggle);
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                .right-panel (gear) set-up                            
    */
    setCSS();
    // setTheme();
    
    Array.from(document.querySelectorAll(".slide-checkbox.auto")).forEach(
        c => {
            if (localStorage.getItem(c.id) == "true") {
                c.checked = true;
                HTML.classList.toggle(c.id, c.checked);
            }
            c.addEventListener("change", function() {
                localStorage.setItem(c.id, c.checked);
                HTML.classList.toggle(c.id, c.checked);
            });
        }
    );
    Array.from(document.getElementsByClassName("font-select")).forEach(
        select => Array.from(select.children).forEach(option => option.style.fontFamily = option.value + ",system-ui" )
    )
    const gearMenu = document.querySelector(".right-panel");
    function gearMenuToggle(option) {
        if (option == "close" || option == "open") {
            gearMenu.classList.toggle("closed", option == "close");
        }
        else {
            gearMenu.classList.toggle("closed", !gearMenu.classList.contains("closed"));
        }
    }
    const gearIcon = document.querySelector(".navbar .gear.icon");
    gearIcon.addEventListener("click", gearMenuToggle);
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                menu close, key conditions                            
    */
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
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                      .navbar set-up                                  
    */
    let navbar = document.querySelector(".navbar");
        if (navbar != null) {
            let canNavCheck = true;
            function navCheck() {
                if (!canNavCheck) {
                    return;
                }
                canNavCheck = false;
                setTimeout(
                    function() {
                        canNavCheck = true;
                        navbar.classList.toggle("sticky-active", pageYOffset > 20);
                    },
                    500
                )
                navbar.classList.toggle("sticky-active", pageYOffset > 20);
            }
            window.addEventListener("scroll", navCheck);
            navbar.classList.toggle("sticky-active", pageYOffset > 20);
        }

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                     front page list                                 
    */
    if (index) {
        const pageIndex = document.getElementById("page-index");
        if (pageIndex) {
            pageIndex.innerHTML = autoRows("!rows\n" + pageData.map(
                entry => `<a href="page/${ pathToRoot + entry.url }/index.html">${ entry.name }</a>|<span class="date">${ entry.date }</span>`
            ).join("\n"), 0);
        }
    }
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                             for everything except front page                         
    */
    if (!index) {
        /* don't allow full-width on front page */
        let fullWidthCheckbox = document.getElementById("full-width");
        if (localStorage.getItem(window.location.href + "-full-width") == "true") {
            HTML.classList.add("full-width");
            fullWidthCheckbox.checked = true;
        }
        fullWidthCheckbox.addEventListener("change", () => {
            HTML.classList.toggle("full-width", this.checked);
            localStorage.setItem(window.location.href + "-full-width", this.checked ? "true" : "false");
        });
        
        /* don't load citelist on front page */
        if (contentLinks.length > 0) {
            const citeData = contentLinks.map(
                (x, n) => `
                    <tr>
                        <td>${ n + 1 }.</td>
                        <td><a href="${ x }">${ x }</a></td>
                    </tr>`
            ).join("");
            document.querySelector(".article-footer").insertAdjacentHTML("beforeend", `<div><div>Links on this page:</div>
                <table class="citelist">${ citeData }</table></div>`);
        }
    }
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                     yt-gallery index                                 
    */
    let videosIndex = document.getElementById("videos-index");
        if (videosIndex != null) {
            let limit = videosIndex.className.replace(/\D/g,"") || 3;
            videosIndex.innerHTML = ytGallery("!yt-gallery sort"+ limit +" \n" + videoData);
        }
    
    let allVideosIndex = document.getElementById("all-videos-index");
        if (allVideosIndex != null) {
            document.getElementById("all-videos-index").insertAdjacentHTML("beforeend", ytGallery("!yt-gallery\n" + videoData));
        }
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                     display figgling                                 
    */
    if (document.title == "") {
        document.title = "Iris Embury";
    }
    else if (!document.title.endsWith("Iris Embury")) {
        document.title += " | Iris Embury";
    }
    let pnd = document.querySelector(".page-name-display");
    if (pnd != null && pnd.innerHTML == "") {
        pnd.innerHTML = "This page";
    }
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- table of contents ---- ---- ---- ---- ---- ---- ---- ---- */

    if (HTML.classList.contains("include-toc")) {
        const headings = Array.from(document.getElementsByClassName("--for-toc"));
        if (headings.length > 0) {
            const hideTocCheckbox = document.getElementById("hide-toc");
            if (!hideTocCheckbox.checked) {
                window.addEventListener("scroll", tocHighlightUpdateAttempt)
            }
            hideTocCheckbox.addEventListener("change", function() {
                HTML.classList.toggle("include-toc", !this.checked);
                if (!this.checked) {
                    window.addEventListener("scroll", tocHighlightUpdateAttempt);
                }
                else {
                    window.removeEventListener("scroll", tocHighlightUpdateAttempt);
                }
            });
            
            const toc = document.getElementById("toc");
            toc.innerHTML = '<div class="toc-title">This page contents</div>' + headings.map(
                heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>`
            ).join("");
            toc.scrollTo({ behavior: "instant", top: 0 })
            const rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
            rowsInToc[0].className = "toc-row";
            rowsInToc[0].innerHTML = '<a href="#" class="pseudo-link" onclick="scrollToTop()">(Top)</a>';

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


