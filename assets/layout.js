"use strict"
const HTML = document.documentElement;
const meta = { loadCitelist: false, loadTOC: false, videoList: [], pageList: [], lastHeading: -1, rowsInToc: [], canNavCheck: true, canTocUpdate: true, pageHeadings: [], cssDefaults: { "--ff-heading": "Inter", "--ff-article": "Georgia Pro Digits,Georgia", "--ff-secondary": "Roboto" } }

meta.videoList = `Liberal Conservatism | Sy33HSFsuu8 | 2026-04-07
Air Canada CEO steps down | z7KFTiYDgnc | 2026-04-01
Elections | 7lw6rO_Pv7I | 2026-03-20
Jeffrey Epstein | 5ymc2ePfFR8 | 2026-03-08
The order of information | ZfArsg_xyuI | 2026-03-07
How bad is America, really? | W0Dmtyyc7FU | 2026-03-04
Abortion | CpjJ8TgOxJY | 2026-02-24
A synopsis of American decline | oUOsAdnK2zs | 2026-02-11
give yourself credit | mM5fcuJnfZQ | 2026-01-23
Why is Reddit so hated? | jPVl5cfVP1k | 2026-01-13`.split("\n").filter(n => n.split("|").length == 3);

meta.pageList = `Rational ignorance | rational-ignorance | 2026-04-09 | substack:rational-ignorance tumblr:813419185909727232 patreon:155199122
Liberal conservatism | liberal-conservatism | 2026-03-24 | substack:foundations-of-liberal-conservatism
The case for abortion | abortion | 2026-02-18 | substack:the-case-for-abortion tumblr:809547051047272448 patreon:155199340
A synopsis of American decline | a-synopsis-of-american-decline | 2026-01-28 | substack:186165875 patreon:155201485
Fetishism & politics | fetishism-politics | 2024-11-14 | tumblr:770364766791352320
Nick Shirley & the Somali day cares | somali-day-cares | 2026-01-02 | substack:nick-shirley-and-the-somali-daycares patreon:155200604
Why is Reddit so hated? | why-is-reddit-so-hated | 2025-12-30 | substack:why-is-reddit-so-hated
Stay the trenches | stay-the-trenches | 2025-12-17 | substack:stay-the-trenches
Immigration | immigration | 2025-11-06 | substack:thoughts-on-immigration
What is prejudice? | what-is-prejudice | 2025-10-30 | substack:prejudice
Notes on India | notes-on-india | 2025-10-24 | substack:india tumblr:798351257128615936
Liberalism not extremism | liberalism-not-extremism | 2025-09-19 | substack:liberalism-not-extremism tumblr:795164683319574528 patreon:155199811
Status quo bias & the path of normalization | the-path-of-normalization | 2025-09-08 | substack:normalization-and-status-quo-bias
Lies about Ilhan Omar | lies-about-ilhan-omar | 2025-08-25 | substack:ilhan-omar tumblr:794091916138594304
Israel & Palestine | israel-palestine | 2025-07-27 
Lies told by Pierre Poilievre | pierre-poilievre | 2025-03-15 | tumblr:782079973591760896 substack:pierre-poilievre patreon:155202545
Trump & Russia | trump-and-russia | 2025-03-06 | tumblr:777321996757450752 substack:trump-and-russia
Why get bottom surgery? | why-get-bottom-surgery | 2025-02-09 | tumblr:775036555284856832
Elon Musk & the Nazi Salute | elon-musk-nazi-salute | 2025-01-24 | substack:the-nazi-salute tumblr:773565389405847552
Lies about Elizabeth Warren & Hillary Clinton | lies-about-warren-clinton | 2024-12-19 | tumblr:770730090759946240 substack:enduring-falsehoods-about-warren
Mark Robinson | mark-robinson | 2024-12-15 | tumblr:769962893917798400
The Trump appeal | the-trump-appeal | 2024-12-03 | tumblr:770270265635667968
The default politician is a white man | the-default-politician | 2024-11-26 | substack:the-default-politician-is-a-normal tumblr:770305075441778688
Sex, gender, & transsexuals | sex-gender-transsexuals | 2024-11-19 
Bernie Sanders & the military industrial complex | bernie-sanders-and-the-military-industrial-complex | 2024-12-16 | tumblr:770070077409214464
Types of masculinity | types-of-masculinity | 2024-11-08 | tumblr:770310861444300800
Poor Things (2023 film) | poor-things | 2024-10-31 | tumblr:769969807464464384
The trans prison stats argument | the-trans-prison-stats-argument | 2024-10-19 | substack:the-trans-prison-stats-argument tumblr:771501478599868416
`.split("\n").filter(n => n.length > 5).map(
    n => {
        let [title, url, date, other] = n.split("|", 4).map(c => c.trim());
        other = other ?other.split(" ").sort() :[];
        return { title, url, date, other }
    }
).sort(
    (a, b) => parseInt(b.date.replace(/\D/g, "")) - parseInt(a.date.replace(/\D/g,""))
).map(
    n => {
        n.title = n.title.replaceAll('&', '&amp;').replaceAll('---', '&mdash;').replaceAll('--', '&ndash;');
        return n;
    }
);

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
        })
    }
}

function parseSource(string_in, separator = ":") {
    let [site, id] = string_in.split(separator, 2);
    if (site == "tumblr") {
        let href = 'https://irisembury.tumblr.com/post/' + id;
        return '<a class="external-link tumblr-link" href="' + href + '" title="Read this page on Tumblr"><span class="tumblr-logo inline-icon"></span><span class="link-text">Tumblr</span></a>'
    }
    if (site == "substack") {
        let href = 'https://irisembury.substack.com/p/' + id;
        return '<a class="external-link substack-link" href="' + href + '" title="Read this page on Substack"><span class="substack-logo inline-icon"></span><span class="link-text">Substack</span></a>'
    }
    if (site == "patreon") {
        let href = 'https://www.patreon.com/posts/' + id;
        return '<a class="external-link patreon-link" href="' + href + '" title="Read this page on Patreon"><span class="patreon-logo inline-icon"></span><span class="link-text">Patreon</span></a>'
    }
    return "";
}

function setLightbox(action) {
    const lightbox = document.querySelector(".lightbox");
    let [ topLeft, img, caption ] = Array.from(lightbox.children).slice(0, 3);
    img = img.children[0];
    if (lightbox && topLeft && img && caption) {
        /* action is click from <img> object */
        if (action == "close") {
            img.src = "";
            img.alt = "";
            topLeft.innerHTML = '';
            lightbox.classList.add("hidden");
        }
        /* action is URLstring passed by function call */
        else if (typeof action == "string") {
            img.src = action;
            img.alt = action;
            lightbox.classList.remove("hidden");
            caption.innerHTML = action;
            topLeft.innerHTML = `<a href="${ action }">${ action.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`
        }
        else {
            img.src = action.src;
            img.alt = action.alt;
            lightbox.classList.remove("hidden");
            topLeft.innerHTML = `<a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
            caption.innerHTML = action.alt;
        }
    }
}

function setClass(sEle) {
    if (sEle != null && sEle instanceof Node) {
        let sValue = sEle.value;
        HTML.classList.remove(...Array.from(sEle.children).map(o => o.value).filter(o => o != sValue));
        HTML.classList.add(sValue);
        localStorage.setItem(sEle.id, sEle.value);
    }
}

function setCSS(mEle) {
    if (mEle != null && mEle instanceof Node) {
        localStorage.setItem(mEle.id, mEle.value);
    }
    let styleOverrides = [];
    Array.from(document.getElementsByClassName("css-override")).forEach(
        select => {
            select.value = localStorage.getItem(select.id) ||meta.cssDefaults[select.id];
            if (select.value != meta.cssDefaults[select.id]) {
                console.log(select.id)
                styleOverrides.push(select.id + ": " + select.value)
            }
        }
    )
    document.getElementById("__css_user_set").innerHTML = "";
    if (styleOverrides.length > 0) {
        document.getElementById("__css_user_set").innerHTML = ":root { " + styleOverrides.join(";") + "}"
    }
}
function resetFonts() {
    for (let k in meta.cssDefaults) {
        localStorage.setItem(k, meta.cssDefaults[k])
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
        const direction = firstRow.split(" ").shift().endsWith("left") ?"float-left" :"float-right";
            firstRow = firstRow.substring(firstRow.indexOf(" "));
        const lazy = !firstRow.includes("nolazy");
        const maxHeight = firstRow.replace(/\D/g, "") ||150;
    
    return `<div class="image-float ${ direction }">${ rows.map(
        row => {
            const parts = row.split("|");
            while (parts.length < 3) { parts.push(""); }
            let caption = autoFormat(parts[1]);
            let altText = autoFormat(parts[2].replace(/"/g,"&quot;"));
            if (caption && !altText) { altText = caption }
            if (caption) { caption = `<figcaption>${ caption }</figcaption>`; }
            return `<figure><img ${ lazy ?'load="lazy"' :""} style="max-height:${ maxHeight }px" onclick="setLightbox(this)" src="${ parts[0].trim() }" title="${ altText }" alt="${ altText }">${ caption }</figure>`;
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
    rows = rows.map(
        row => {
            row = row.replace(/\\\|/g, "&verbar;").split("|").map(
                c => c.trim()
            );
            while (row.length < 3) {
                row.push("");
            }
            let [ title, videoCode, date ] = row;
            return { title, videoCode, date };
        }
    );
    rows = rows.map(
        row => {
            while (row.videoCode.charAt(row.videoCode.length - 1) == "/") {
                row.videoCode = videoCode.substring(0, videoCode.length - 1);
            }
            row.videoCode = row.videoCode.split("/").slice(-1);
            return '<figure><a href="https://www.youtube.com/watch?v=' + row.videoCode + '"><img loading="lazy" src="https://i.ytimg.com/vi/' + row.videoCode + '/hqdefault.jpg"></a><figcaption><div class="yt-title"><a href="https://www.youtube.com/watch?v=' + row.videoCode + '">' + row.title + '</a></div> <div class="yt-date">' + row.date + '</div></figcaption></figure>';
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
                                        if (p == "---") { return '<hr>'; }
                                        if (p.startsWith("#.") || p.startsWith(".#")) { p = '<blockquote><p class="fine">' + p.substring(2).trimStart() + '</p></blockquote>'; }
                                        else if (p.startsWith("#")) { p = '<blockquote><p>' + p.substring(1).trimStart() + '</p></blockquote>'; }
                                        else if (p.startsWith(".")) { p = '<p class="fine">' + p.substring(1).trimStart() + '</p>'; }
                                        else p = '<p>' + p + '</p>';
                                        return autoFormat(p);
                                    }
                                ).join('').replaceAll('</blockquote><blockquote>', '')
                            }</td>`
                        }
                    ).join('')
                }</tr>`;
            }
        ).join('')
    }</tbody></table></div>`
    
    const firstRow = chunk.substring("!table".length, chunk.indexOf("\n")).trim();
    if (firstRow.replace(/\s/g, "").length > 1) {
        return table + `<style>${ firstRow.replace(/this/g, ".auto-table-" + table_number).replace(/;/g, " !important;") }</style>`;
    }
    return table;
}
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
        above (autoTable): The even and odd looks 'backwards'
        because row_index/cell_index are converting from
        being 0-indexed to being 1-indexed (rows[0] is the 1st row,
        rows[1] is the 2nd row, etc.)
    */

function autoRows(chunk, tnum) {
    let rows = chunk.replaceAll("\\|", "&verbar;").split("\n");
    let firstRow = rows.shift().substring("!rows".length).trim();
    /* make tbody cells */
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
        let cells = rows[rowIndex].split("|");
        for (let cellIndex = 0; cellIndex < cells.length; cellIndex += 1) {
            let cellNum = cellIndex + 1;
            cells[cellIndex] = `<div class="cell col-${ cellNum + " col-" + (cellNum % 2 ? "odd" : "even") }">${ autoFormat(cells[cellIndex]) }</div>`;
        }
        rows[rowIndex] = `<div class="row row-${ (rowIndex + 1) + " row-" + (rowIndex % 2 ? "even" : "odd") }">${ cells.join("") }</div>`;
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
    return list.substring(0, 3) + lclass + list.substring(3);
}

function autoIndent(chunk) {
    return `<blockquote>${ chunk.split("\n").map(
        line => {
            line = line.trim();
            if (line != "") {
                if (line == "---") { return "<hr>"; }
                if (line.startsWith("---")) {
                    return `<p class="attribution">${ autoFormat(line) }</p>`;
                }
                return "<p>"+ autoFormat(line) +"</p>";
            }
        }
    ).join('') }</blockquote>`;
}

function parseMeta(chunk) {
    let title = "", subtitle = "", date = "", seeAlso = [];
    chunk.split("\n").slice(1).forEach(line => {
        let [key, val] = line.split(":").map(c => c.trim());
        
        switch (key) {
            case "title":
                document.title = val.replaceAll("---", "\u2014").replaceAll("--", "\u2013").replaceAll("&amp;", "\u0026");
                document.getElementById("page-name-display").innerHTML = val;
                title = '<h1 class="article-title for-toc">' + autoFormat(val) + '</h1>';
                break;
            
            case "subtitle":
                subtitle = '<h2 class="article-subtitle">' + autoFormat(val) + '</h1>';
                break;
            
            case "date":
                date = '<div class="article-date">' + val + '</div>';
                break;
            
            case "see-also":
                val = parseSource(val.toLowerCase(), "|");
                if (val != "") {
                    seeAlso.push(val);
                }
                break;
            
            case "include":
            case "load":
                switch (val) {
                    case "citelist":
                        meta.loadCitelist = true;
                        break;
                    case "toc":
                        meta.loadTOC = true;
                        break;
                }
        }
    })
    if (seeAlso.length > 0) {
        seeAlso = seeAlso.sort().join('');
        seeAlso = '<div class="see-also-container label-external">This content was also posted in other places:' + seeAlso + '</div>';
        unshiftElement('.article-footer', seeAlso);
    }
    return title + subtitle + date;
}

/* converts ISO 8601 date format (YYYYMMDD) into YYYY Month D */
function isoFormat(datestring, shortMonths = false) {
    let input = datestring.replace(/\D/g, "")
    if (input.length == 8) {
        const iso = input.substring(0,4) + "-" + input.substring(4,6) + "-" + input.substring(6,8);
        let [year,month,day] = iso.split("-").map(Number);
        if (month >= 1 && month <= 12) {
            if (shortMonths) {
                month = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June", 7: "July", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec" }[month]
            }
            else {
                month = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" }[month]
            }
        }
        datestring = '<time title="ISO: '+ iso +'" datetime="'+ iso +'">'+ year + " " + month + " " + day +'</time>';
    }
    return datestring;
}

function autoHeading(chunk) {
    let headingNum = chunk.indexOf(" ");
    let tag = "h" + headingNum;
    chunk = chunk.slice(headingNum + 1);
    let id = chunk.replaceAll(" ", "_").replaceAll("---", "&mdash;").replaceAll("--", "&ndash;").replace(/[\*<>]/g, "");
    chunk = autoFormat(chunk);
    return `<${ tag + (headingNum <=3 ?' class="for-toc"' :'') } id="${ id }">${ chunk }</${ tag }>`;
}

function linkReplace(chunk, articleLinksArray = []) {
    return chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkUrl) => {
        linkUrl = linkUrl.replaceAll("\\)", ")");
        displayText = displayText.trim();
        const external = linkUrl.startsWith("http");
        const blankDisplay = displayText == "";
        
        let link_index = '[res]';
        if (linkUrl.startsWith("http")) {
            link_index = articleLinksArray.indexOf(linkUrl);
            if (link_index == -1) {
                link_index = articleLinksArray.push(linkUrl);
            }
            link_index = '[' + link_index + ']';
        }

        if (linkUrl.startsWith('#')) {
            linkUrl = linkUrl.replaceAll(' ', '_');
        }
        let a_tag = '<a href="' + linkUrl + '"';
        let link_title = linkUrl;
        let link_class = [];
        let link_inner = displayText || link_index;
        if (!external) {
            if (linkUrl.endsWith(".png") || linkUrl.endsWith(".jpg")) {
                a_tag = `<a onclick="setLightbox('${ linkUrl }')"`;
                link_class.push("pseudo-link");
                link_inner += '<span class="inline-icon lightbox-link"></span>';
                link_title = 'View in gallery: ' + linkUrl.split("/").slice(-1).join("");
            }
            
        }
        else {
            link_class.push("external-link");
            if (linkUrl.includes("youtube.com") || linkUrl.includes("youtu.be")) {
                link_inner += '<span class="youtube-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("bsky.app/")) {
                link_inner += '<span class="bluesky-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("x.com") || linkUrl.includes("twitter.com")) {
                link_inner += '<span class="twitter-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("facebook.com")) {
                link_inner += '<span class="facebook-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("substack.com")) {
                link_inner += '<span class="substack-logo inline-icon"></span>';
            }
        }
        
        a_tag += ' title="' + link_title + '" class="' + link_class.join(' ') + '">' + link_inner + '</a>';
        if (blankDisplay) {
            a_tag = '<sup>' + a_tag + '</sup>';
        }
        
        return a_tag;
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
        if (chunk.startsWith("!meta")) { return parseMeta(chunk); }
        if (/^#{1,6} /.test(chunk)) { return autoHeading(chunk); }
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
        return "?";
    }
    const entryYear  = parseInt(argDate.substring(0, 4)); // YYYY---- 
    const entryMonth = parseInt(argDate.substring(4, 6)); // ----MM--
    const entryDay   = parseInt(argDate.substring(6, 8)); // ------DD
    if (entryMonth > 12 || entryDay > 31) {
        return "?";
    }
    const todaysDate = new Date();
    let age = todaysDate.getFullYear() - entryYear;
    
    if (todaysDate.getMonth() + 1 < entryMonth) {
        age -= 1;
    }
    else if (todaysDate.getMonth() + 1 == entryMonth && todaysDate.getDate() + 1 <= entryDay) {
        age -= 1;
    }
    return age;
}

function auxf(str_in) {
    str_in = str_in.replaceAll("\\*", "&ast;").replaceAll('\\"', "&quot;").replaceAll("\\'", "&apos;").replaceAll("\|", "&verbar;").replaceAll("\\(", "&lpar;").replaceAll("\\)", "&rpar;").replaceAll("\\[", "&lbrack;").replaceAll("\\]", "&rbrack;").replaceAll("\\", "&#92;").replaceAll("\\^", "&Hat;").replaceAll("...", "&hellip;");
    if (str_in.indexOf("'") != -1 || str_in.indexOf('"') != -1) {
        str_in = str_in.replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1").replaceAll(/(>|^| |\()'/g, "$1&lsquo;").replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2").replaceAll(/'/g, "&rsquo;").replaceAll(/(>|^| |\()"/g, "$1&ldquo;").replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2").replaceAll(/"(,|\.)/g, "<span style='margin-right:-2px'>&rdquo;</span>$1").replaceAll(/"/g, "&rdquo;")
    }
    return str_in.replaceAll("---", '<span class="mdash">&mdash;</span>').replace(/\-\-([^>])/g, "&ndash;$1");
}

function autoFormat(_string) {
    _string = _string.trim();
    let output = "";
    while (true) {
        const openTag = _string.indexOf("<");
        const closeTag = _string.substring(openTag).indexOf(">") + openTag;
        if (openTag == -1 || closeTag - openTag == -1) { break; }
        output += auxf(_string.slice(0, openTag + 1)) + _string.slice(openTag + 1, closeTag);
        _string = _string.substring(closeTag);
    }
    return (output + auxf(_string)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
}

/*
    explanation for myself in case I'm ever trying to salvage and reuse this code (autoFormat):
    The substring values I use to define the text content and attributes are so this captures the tag characters (<, >) as part of the text content. This means if given the string `a b <c> d e`, this will read that as `"a b <", "c", "> d e"`. The reason I do this is so auxf(function) can tell "b" is not the end of a string and "d" is not the beginning of one, since that affects how the curly quotes are applied. If this isn't desired and you want the tags to be part of the attributes variable, you could modify the while-true like so:
    
    while (true) {
        const openTag = stringInput.indexOf("<");
        const closeTag = stringInput.substring(openTag).indexOf(">") + openTag;
        if (openTag == -1 || closeTag - openTag == -1) { break; }
        const textContent = stringInput.substring(0, openTag);
        const attributes = stringInput.substring(openTag, closeTag + 1);
        output += auxf(textContent) + attributes;
        stringInput = stringInput.substring(closeTag + 1);
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

const KEYWORDS = { cpp: "alignas alignof and and_eq asm auto bitand bitor bool break case catch char char16_t char32_t char8_t class co_await co_return co_yield compl concept const const_cast consteval constexpr constinit continue decltype default delete do double dynamic_cast else enum explicit export extern false final float for friend goto if inline int import long module mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq", cs: "abstract add alias allows and args as ascending async await base bool break by byte case catch char checked class const continue decimal default delegate descending do double dynamic else enum equals event explicit extension extern false field file finally fixed float for foreach from get global goto group if implicit in init int interface internal into is join let lock long managed nameof namespace new nint not notnull nuint null object on operator or orderby out override params partial partial private protected public readonly record ref remove required return sbyte scoped sealed select set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unmanaged unmanaged unsafe ushort using value var virtual void volatile when where where while with yield", java: "String abstract continue for new switch assert default goto package synchronized boolean do if private this break double implements protected throw byte else import public throws case enum instanceof return transient catch extends int short try char final interface static void class finally long strictfp volatile const float native super while", js: "await break case catch class const constructor continue debugger default delete do else enum export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof var void while with yield implements interface package private protected public static setInterval" }
function colorizeKeywords(stringInput, syntaxClass, customKeywords) {
    return tokenizeByWordChar(stringInput).map(word => {
        if (KEYWORDS[syntaxClass] && KEYWORDS[syntaxClass].split(" ").includes(word)) {
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

/* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                        focus highlight updater                         
*/
function toc_update() {
    let currentHeading = -1;
    for (let heading = 0; heading < meta.pageHeadings.length; heading += 1) {
        let elementDistanceFromPageTop = window.scrollY + meta.pageHeadings[heading].getBoundingClientRect().top;
        if (pageYOffset < elementDistanceFromPageTop - (0.475 * window.innerHeight)) {
            break;
        }
        currentHeading = heading;
    }
    if (currentHeading != meta.lastHeading) {
        meta.rowsInToc.forEach( (row, n) => {
            if (n == currentHeading && n > 0) {
                row.classList.add("active-heading");
                /* ----
                    After this being in the code for some time, it seems like it's rarely useful at all (on most pages
                    the TOC isn't even going to scroll) while adding work to every toc page. Disabled for now.
                */
                // let rRect = row.getBoundingClientRect();
                // let tRect = toc.getBoundingClientRect();
                
                // if (rRect.bottom + 20 > tRect.bottom) {
                    // toc.scrollTo(
                        // { top: row.offsetTop + row.offsetHeight - toc.clientHeight + 20, behavior: "smooth" }
                    // )
                // }
                // else if (rRect.top < tRect.top) {
                    // toc.scrollTo(
                        // { top: row.offsetTop - 4, behavior: "smooth" }
                    // )
                // }
            }
            else {
                row.classList.remove("active-heading");
            }
        })
    }
    meta.lastHeading = currentHeading;
}

function attempt_toc_update() {
    if (!meta.canTocUpdate) {
        return;
    }
    if (HTML.classList.contains("hide-toc")) {
        return;
    }
    meta.canTocUpdate = false;
    toc_update();
    setTimeout(() => {
        meta.canTocUpdate = true;
        toc_update();
    }, 500);
}

function setInnerHTML(targetIdentity, contents) {
    let target = document.querySelector(targetIdentity);
    if (target != null) {
        target.innerHTML = contents;
    }
}

function pushElement(parentIdentity, contents, position = "bottom") {
    let parent = document.querySelector(parentIdentity);
    if (parent == null) {
        console.error(`Couldn't find ${ parentIdentity }`);
        return;
    }
    let node = document.createElement("div");
    node.innerHTML = contents;
    if (position == "bottom") {
        parent.appendChild(node);
    }
    else {
        parent.insertBefore(node, parent.firstElementChild);
    }
}

function unshiftElement(parentIdentity, contents) {
    pushElement(parentIdentity, contents, "top");
}

window.addEventListener("load", function() {
    const index = document.getElementById("index") != null;
    const pathToRoot = index ? "" : "../../";
    document.head.insertAdjacentHTML("beforeend", '<meta charset="utf-8"><link rel="stylesheet" href="' + pathToRoot + 'assets/fonts.css">');

    document.body.innerHTML = `
    <header class="mh-top"></header>
    <nav class="gn-top">
        <div class="gn-segment">
            <div id="hamburger" class="icon"><svg viewBox="0 0 24 24" height="28" width="30"><path fill="currentcolor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div>
            <div class="gap-5">${ index ? "<span>Iris Embury</span>" : `<a href="${ pathToRoot }index.html">Iris Embury</a>` }${ index ? "" : '&verbar;<div title="This page" id="page-name-display">' + document.title + "</div>" }</div>
        </div>
        <div></div>
        <div class="gn-segment">
            <div class="jump-arrow icon" onclick="scrollToTop()"><svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="24" viewBox="0 0 24 24" width="24"><path d="M5.293 15.207a1 1 0 001.414 0L12 9.914l5.293 5.293a1 1 0 101.414-1.414L12 7.086l-6.707 6.707a1 1 0 000 1.414Z"></path></svg></div>
            <div id="gear" class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="28"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></div>
        </div>
    </nav>
    <div id="pagebox">
        <div class="right-panel closed">
            <div><h3>Display:</h3></div>
            <div><label for="dark">Dark mode:</label><input type="checkbox" class="slide-checkbox auto" id="dark"></div>
            <hr>
            <div><h3>Site layout:</h3></div>
            <div><label for="full-width">Full page width</label><input type="checkbox" class="slide-checkbox auto" id="full-width"></div>
            <hr>
            <div><h3>Article formatting:</h3></div>
            <div><label for="narrow-width">Narrow column width</label><input type="checkbox" class="slide-checkbox formatting auto" id="narrow-width"></div>
            <div><label for="justify-text">Justify text</label><input type="checkbox" class="slide-checkbox formatting auto" id="justify-text"></div>
            <div><label for="indent-text">Indent paragraphs</label><input type="checkbox" class="slide-checkbox formatting auto" id="indent-text"></div>
            <div><label for="reduce-margins">Reduce paragraph margin</label><input type="checkbox" class="slide-checkbox formatting auto" id="reduce-margins"></div>
            <div><div style="margin-left:auto; color:var(--grey-8);"><span class="pseudo-link" onclick="setFormatting(true)" title="set all above on">all on</span> / <span class="pseudo-link" onclick="setFormatting(false)" title="all off">all off</span></div></div>
            <hr>
            <div><h3>Fonts override:</h3></div>
            <div><div>Headings:</div><select class="drop-select css-override" id="--ff-heading" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Consolas">Consolas</option><option value="Courier New">Courier New</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
            <div><div>Body:</div><select class="drop-select css-override" id="--ff-article" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Consolas">Consolas</option><option value="Courier New">Courier New</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro Digits,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
            <div><div>Secondary:</div><select class="drop-select css-override" id="--ff-secondary" onchange="setCSS(this)"><option value="Arial">Arial</option><option value="Consolas">Consolas</option><option value="Courier New">Courier New</option><option value="Epilogue">Epilogue</option><option value="Faculty Glyphic">Faculty Glyphic</option><option value="Georgia Pro Digits,Georgia">Georgia</option><option value="IBM Plex Sans">IBM Plex Sans</option><option value="Inter">Inter</option><option value="Lexend">Lexend</option><option value="Lora">Lora</option><option value="Merriweather">Merriweather</option><option value="Open Sans">Open Sans</option><option value="PT Serif">PT Serif</option><option value="Roboto">Roboto</option><option value="Roboto Slab">Roboto Slab</option><option value="Segoe UI">Segoe UI</option><option value="Sitka Text">Sitka Text</option><option value="Times New Roman,Times">Times New Roman</option><option value="Trebuchet MS">Trebuchet MS</option></select></div>
            <div><div style="margin-left:auto; cursor:pointer; color:var(--grey-8);" onclick="resetFonts()" title="restore font defaults">restore defaults</div></div>
            <hr>
            <div><div style="line-height:1.5;color:var(--grey-6);"><p>These preferences are saved in your browser's <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a>. To clear your local storage for this site, simply <a class="pseudo-link" onclick="localStorage.clear()" title="Nothing visible happens when you click this, but I tested it and it works.">click here</a>.</p></div></div>
        </div>
        <nav class="left-panel closed">
            <div class="nav-row title">Page listing</div>
            ${ meta.pageList.map( entry => `<div class="nav-row link"><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.title }</a></div>` ).join("") }
        </nav>
        <div class="screen"></div>
        <div class="page-grid">
            <div class="main-container">
                <div class="article">${ document.body.innerHTML }</div>
                <footer class="article-footer"></footer>
            </div>
        </div>
        <footer class="page-footer"></footer>
    </div>
    <div class="lightbox hidden">
        <div class="lb-top-left"></div>
        <div class="lb-img_wrapper" onclick="setLightbox('close')"><img></div>
        <div class="lb-caption-panel"><div></div></div>
    </div>
    <style id="__css_user_set"></style>`;

    let contentLinks = [];
    interpreter(document.querySelector(".article"), contentLinks);
    HTML.classList.add("layout");
    setCSS();
    
    if (index) {
        pushElement('.page-footer', "This page was last modified: " + document.lastModified.replaceAll("/", "-").substring(0,10) + '.');
        pushElement('.page-footer', "I maintain this repo and my profiles on all other websites solely and independently. I'm not associated with any other person or organization.</div>");
    }
    else {
        pushElement('.page-footer', `                <div class='space-evenly'>
                    <div class='column gap-rem'>
                        <div>Recently pages added:</div>
                        <div>
                            <ul>
                                ${ meta.pageList.slice(0, 4).map( entry => `<li><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.title }</a></li>` ).join("") }
                            </ul>
                        </div>
                    </div>
                    <div class='column gap-rem'>
                        <div>External links:</div>
                        <div class='flex'>
                            <ul>
                                <li><a href="https://youtube.com/channel/UCXadODjAtT72eYW6xCGyuUA/videos"><span class="youtube-logo inline-icon"></span><span>YouTube channel</span></a></li>
                                <li><a href="https://twitter.com/irisembury"><span class="twitter-logo inline-icon"></span><span>Twitter/X</span></a></li>
                                <li><a href="https://bsky.app/profile/irisembury.bsky.social"><span class="bluesky-logo inline-icon"></span><span>Bluesky</span></a></li>
                                <li><a href="https://irisembury.github.io/discord"><span class="discord-logo inline-icon"></span><span>Discord server</span></a></li>
                            </ul>
                            <ul>
                                <li><a href="https://irisembury.tumblr.com/"><span class="tumblr-logo inline-icon"></span><span>Tumblr</span></a></li>
                                <li><a href="https://irisembury.substack.com/archive"><span class="substack-logo inline-icon"></span><span>Substack</span></a></li>
                                <li><a href="https://github.com/irisembury"><span class="github-logo inline-icon"></span><span>This repo on GitHub</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>`)
    }

    if (meta.loadCitelist && contentLinks.length > 0) {
        pushElement('.article-footer', `<div>Links on this page:</div><table class="citelist">${ contentLinks.map((x, n) => `<tr><td class="no-select">${ n+1 }.</td><td><a href="${ x }">${ x }</a></td></tr>`).join("") }</table>`);
    }
    Array.from(document.querySelectorAll(".age-from")).forEach(a => a.innerHTML = ageFromISO(a.innerHTML));

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                              #left-panel (hamburger) set-up                          
    */
    const hamburgerMenu = document.querySelector(".left-panel");
    
    function hamburgerMenuToggle(option = "toggle") {
        if (option == "close" || option == "open") {
            hamburgerMenu.classList.toggle("closed", option == "close");
        }
        else {
            hamburgerMenu.classList.toggle("closed", !hamburgerMenu.classList.contains("closed"));
        }
    }
    const hamburgerIcon = document.getElementById("hamburger");
    hamburgerIcon.addEventListener("click", hamburgerMenuToggle);

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                #right-panel (gear) set-up                            
    */

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
    const gearIcon = document.getElementById("gear");
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
            scrollToTop();
        }
    })
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                      #navbar set-up                                  
    */
    navCheck();
    window.addEventListener("scroll", navCheck);
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                      index elements                                  
    */
    setInnerHTML('#page-index', meta.pageList.map(
        entry => `
        <tr>
            <td><div><a href="page/${ entry.url }/index.html">${ entry.title }</a></div></td>
            <td class='date-cell'><span>${ entry.date }</span></td>
            <td><div class='mirror-cell'>${ entry.other.length > 0 ? entry.other.map(u => ' ' + parseSource(u)).join('') : '' }</div></td>
        </tr>`
    ).join(''));
    setInnerHTML('#videos-index', ytGallery("!yt-gallery\n" + meta.videoList.slice(0, 14).join('\n')))
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                     display figgling                                 
    */
    if (document.title == "") {
        document.title = "Iris Embury";
    }
    else if (!document.title.endsWith("Iris Embury")) {
        document.title += " | Iris Embury";
    }
    let pageNameDisplay = document.getElementById("page-name-display");
    if (pageNameDisplay != null && pageNameDisplay.innerHTML == "") {
        pageNameDisplay.innerHTML = "This page";
    }

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                    table of contents                                 
    */
    if (meta.loadTOC) {
        meta.pageHeadings = Array.from(document.getElementsByClassName("for-toc"));
        if (meta.pageHeadings.length > 0) {
            meta.pageHeadings.forEach(h => { h.classList.remove("for-toc"); if (h.classList.length == 0) { h.removeAttribute('class') } });
            
            /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                        create contents                             
            */
            const pageGrid = document.querySelector(".page-grid");
            pageGrid.classList.add("right-space");
            const toc = pageGrid.insertBefore(document.createElement("nav"), pageGrid.firstElementChild);
            toc.id = "toc";
            toc.innerHTML = '<div class="toc-title">This page contents</div><div class="toc-row"><a class="pseudo-link" onclick="scrollToTop()">(Top)</a></div>' + meta.pageHeadings.slice(1).map( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join('');
            toc.scrollTo({ behavior: "instant", top: 0 })
            /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                        attach to window                            
            */
            meta.rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
            window.addEventListener("scroll", attempt_toc_update);
            attempt_toc_update();
        }
    }
})

function navCheck() {
    let navbar = document.querySelector('.gn-top');
    if (navbar != null) {
        if (!meta.canNavCheck) {
            return;
        }
        meta.canNavCheck = false;
        setTimeout(
            function() {
                meta.canNavCheck = true;
                navbar.classList.toggle("sticky-active", pageYOffset > 120);
            },
            500
        )
        navbar.classList.toggle("sticky-active", pageYOffset > 120);
    }
}

