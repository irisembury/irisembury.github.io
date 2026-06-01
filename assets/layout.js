"use strict"
const HTML = document.documentElement;
const meta = {
    flags: [],
    links : [],
    videoListData: [
        { title:"Floor crossers", date:"2026-05-17", url:"EK_MCMiFakA" },
        { title:"Liberalism not Leftism", date:"2026-05-06", url:"DgGf_g4aGYA" },
        { title:"Liberal Conservatism", date:"2026-04-07", url:"Sy33HSFsuu8" },
        { title:"Epstein", date:"2026-03-08", url:"5ymc2ePfFR8" },
        { title:"Our elections", date:"2026-03-20", url:"7lw6rO_Pv7I" },
        { title:"How bad is America, really?", date:"2026-03-04", url:"W0Dmtyyc7FU" },
        { title:"In defense of abortion", date:"2026-02-24", url:"CpjJ8TgOxJY" },
        { title:"American decline", date:"2026-02-11", url:"oUOsAdnK2zs" },
        { title:"give yourself credit", date:"2026-01-23", url:"mM5fcuJnfZQ" },
        { title:"Why is Reddit so hated?", date:"2026-01-13", url:"jPVl5cfVP1k" },
        { title:"Pride 2025 in Toronto", date:"2025-07-05", url:"PL3u9OOGxew" },
        { title:"Immigration", date:"2025-11-23", url:"6MEkIZQFV6w" },
        { title:"Notes on India", date:"2025-10-24", url:"Pz0Oq1rb14E" },
        { title:"Sex, gender, & transsexuals", date:"2025-10-17", url:"Hgh3r7gJoWU" },
        { title:"Notes on Saudi Arabia", date:"2025-10-17", url:"9RhaYU21Qag" },
        { title:"Ilhan Omar making waves after Charlie Kirk's death", date:"2025-10-04", url:"JDseBrbtp6E" },
        { title:"Why do people like Trump?", date:"2025-09-14", url:"tcF0f-Dtgic" },
        { title:"Lies about Ilhan Omar", date:"2025-09-03", url:"zgE4L-e9yg0" },
        { title:"Lies about Elizabeth Warren and Hillary Clinton", date:"2025-04-09", url:"LPQD6sxlWOs" }
    ],
    pageListData: [
        { title:"Pierre Poilievre", url:"pierre-poilievre", date:"", mirrors:[""], flags:["citelist","hidden"] },
        { title:"The Conservative Party's hard problem", url:"conservative-party-hard-problem", date:"2026-05-01", mirrors:["substack:196152041","tumblr:815438258908643328","medium:e59c21f8095a"] },
        { title:"Canada's plan for a sovereign wealth fund", url:"canada-sovereign-wealth-fund", date:"2026-04-29", mirrors:["substack:195885575","tumblr:815245873447649280"] },
        { title:"Floor crossings", url:"floor-crossings", date:"2026-04-17", mirrors:["substack:floor-crossings","medium:dfe93bb23bdd"] },
        { title:"Rational ignorance", url:"rational-ignorance", date:"2026-04-09", mirrors:["substack:rational-ignorance","tumblr:813419185909727232","patreon:155199122"] },
        { title:"Liberal conservatism", subtitle:"A philosophy of prudence and humility", url:"liberal-conservatism", date:"2026-03-24", mirrors:["substack:foundations-of-liberal-conservatism"], flags:["wide"] },
        { title:"The case for abortion", url:"abortion", date:"2026-02-18", mirrors:["substack:the-case-for-abortion","tumblr:809547051047272448","patreon:155199340"] },
        { title:"A synopsis of American decline", url:"a-synopsis-of-american-decline", date:"2026-01-28", mirrors:["substack:186165875","patreon:155201485"] },
        { title:"Fetishism & politics", url:"fetishism-politics", date:"2024-11-14", mirrors:["tumblr:770364766791352320"] },
        { title:"Nick Shirley & the Somali day cares", url:"somali-day-cares", date:"2026-01-02", mirrors:["substack:183243480","patreon:155200604"], flags:["citelist"] },
        { title:"Why is Reddit so hated?", subtitle:"On the website's history, what makes it unique, and the intense hatred many people seem to have for it", url:"why-is-reddit-so-hated", date:"2025-12-30", mirrors:["substack:why-is-reddit-so-hated"] },
        { title:"Stay the trenches", url:"stay-the-trenches", date:"2025-12-17", mirrors:["substack:stay-the-trenches"] },
        { title:"Immigration", url:"immigration", date:"2025-11-06", mirrors:["substack:183229652"] },
        { title:"Prejudice", url:"what-is-prejudice", date:"2025-10-30", mirrors:["substack:prejudice"] },
        { title:"Notes on India", url:"notes-on-india", date:"2025-10-24", mirrors:["substack:india","tumblr:798351257128615936"] },
        { title:"Liberalism not leftism", subtitle:"An overview of leftist historical revisionism and a warning for liberals", url:"liberalism-not-leftism", date:"2025-09-19", mirrors:["substack:liberalism-not-extremism","tumblr:795164683319574528","patreon:155199811"] },
        { title:"Status quo bias & the path of normalization", url:"the-path-of-normalization", date:"2025-09-08", mirrors:["substack:normalization-and-status-quo-bias"] },
        { title:"Lies about Ilhan Omar", url:"lies-about-ilhan-omar", date:"2025-08-25", flags:["citelist"], mirrors:["substack:ilhan-omar","tumblr:794091916138594304","medium:46de1629e138"] },
        { title:"Israel & Palestine", url:"israel-palestine", date:"2025-07-27", flags:["wide"] },
        { title:"Trump & Russia", url:"trump-and-russia", date:"2025-03-06", mirrors:["tumblr:777321996757450752","substack:trump-and-russia"] },
        { title:"Why get bottom surgery?", url:"why-get-bottom-surgery", date:"2025-02-09", mirrors:["tumblr:775036555284856832"] },
        { title:"Elon Musk & the Nazi Salute", url:"elon-musk-nazi-salute", date:"2025-01-24", mirrors:["substack:the-nazi-salute","tumblr:773565389405847552"] },
        { title:"Lies about Elizabeth Warren & Hillary Clinton", url:"lies-about-warren-clinton", date:"2024-12-19", mirrors:["tumblr:770730090759946240","substack:153821886"], flags:["citelist"] },
        { title:"Mark Robinson", url:"mark-robinson", date:"2024-12-15", mirrors:["tumblr:769962893917798400"] },
        { title:"The Trump appeal", url:"the-trump-appeal", date:"2024-12-03", mirrors:["tumblr:770270265635667968"] },
        { title:"The normal white man bias", url:"the-normal-white-man-bias", date:"2024-11-26", mirrors:["substack:153823028","tumblr:770305075441778688","medium:0c508d4c51b5"] },
        { title:"Sex, gender, & transsexuals", url:"sex-gender-transsexuals", date:"2024-11-19" },
        { title:"Bernie Sanders & the military industrial complex", url:"bernie-sanders-and-the-military-industrial-complex", date:"2024-12-16", mirrors:["tumblr:770070077409214464"] },
        { title:"Types of masculinity", url:"types-of-masculinity", date:"2024-11-08", mirrors:["tumblr:770310861444300800"] },
        { title:"Poor Things (2023 film)", url:"poor-things", date:"2024-10-31", mirrors:["tumblr:769969807464464384"] },
        { title:"The trans prison stats argument", url:"the-trans-prison-stats-argument", date:"2024-10-19", mirrors:["substack:the-trans-prison-stats-argument","tumblr:771501478599868416"] },
        { title:"Record of statements by select public figures", url:"public-record", flags:["hidden","wide"] },
        { title:"Anime reviews", url:"anime-reviews", flags:["hidden","wide"] },
        { title:"Data Structures & Algorithms", url:"data-structures-algorithms", flags:["hidden","wide"] }
    ],
    pageList: function() {
        return meta.pageListData.filter(p => !p.flags || !p.flags.includes("hidden"))
    },
    pageListFull: function() {
        return meta.pageListData
    },
    videoList: function() {
        return meta.videoListData.filter(p => !p.flags || !p.flags.includes("hidden")).slice(0, 6)
    },
    fontDefaults: {
        "--ff-heading":"'Inter',sans-serif",
        "--ff-main":"var(--ff-georgia-digits)",
        "--ff-aux-1":"'Segoe UI',system-ui",
        "--ff-aux-2":"'Roboto',sans-serif"
    }
}
meta.pageListData.sort((a, b) => parseInt(b.date?.replace(/\D/g, "")) - parseInt(a.date?.replace(/\D/g,"")))
meta.videoListData.sort((a, b) => parseInt(b.date?.replace(/\D/g, "")) - parseInt(a.date?.replace(/\D/g,"")))
meta.pageListData.forEach(p => { if (p.title) { p.title = autoFormat(p.title); } })

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
        return '<a class="external-link tumblr-link" href="https://irisembury.tumblr.com/post/' + id + '" title="Read this page on Tumblr"><span class="tumblr-logo inline-icon"></span><span class="link-text">Tumblr</span></a>'
    }
    if (site == "substack") {
        return '<a class="external-link substack-link" href="https://irisembury.substack.com/p/' + id + '" title="Read this page on Substack"><span class="substack-logo inline-icon"></span><span class="link-text">Substack</span></a>'
    }
    if (site == "patreon") {
        return '<a class="external-link patreon-link" href="https://www.patreon.com/posts/' + id + '" title="Read this page on Patreon"><span class="patreon-logo inline-icon"></span><span class="link-text">Patreon</span></a>'
    }
    if (site == "medium") {
        return '<a class="external-link medium-link" href="https://medium.com/@irisembury/' + id + '" title="Read this page on Medium"><span class="medium-logo inline-icon"></span><span class="link-text">Medium</span></a>'
    }
    return "";
}

function setLightbox(action) {
    const lightbox = document.querySelector(".lightbox");
    const lbTopLeft = document.querySelector(".lb-top-left p");
    const lbImage = document.querySelector(".lb-img-wrapper img")
    const lbCaption = document.querySelector(".lb-caption-panel p")

    if (lightbox == null || lbTopLeft == null || lbImage == null || lbCaption == null) {
        return;
    }
    
    if (action == "close") {
        lightbox.classList.add("hidden");
        lbTopLeft.innerHTML = "";
        lbImage.src = lbImage.alt = "";
    }
    /* function called by <a> with link to image source */
    else if (typeof action == "string") {
        lightbox.classList.remove("hidden");
        lbTopLeft.innerHTML = `This image: <a href="${ action }">${ action.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        lbImage.src = lbImage.alt = action;
        lbCaption.innerHTML = action;
    }
    /* function called by <img> passing "this" */
    else {
        lightbox.classList.remove("hidden");
        lbImage.src = action.src;
        lbImage.alt = action.alt;
        lbTopLeft.innerHTML = `This image: <a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        lbCaption.innerHTML = action.alt;
    }
    
}

function classSelector(sEle) {
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
    const cssPanel = document.getElementById("__css_user_set");
    if (cssPanel) {
        cssPanel.replaceChildren();
        const styleOverrides = [];
        Array.from(document.getElementsByClassName("drop-select")).forEach(
            _select => {
                let _select_value = localStorage.getItem(_select.id) || _select.value;
                if (_select_value != meta.fontDefaults[_select.id]) {
                    styleOverrides.push(_select.id + ':' + _select_value)
                }
            }
        );
        if (styleOverrides.length > 0) {
            cssPanel.insertAdjacentHTML("afterbegin", ":root{" + styleOverrides.join(";") + "}");
        }
        if (localStorage.getItem("--ff-heading") == "'Georgia Pro',serif") {
            cssPanel.insertAdjacentHTML("afterbegin", ".article h1, .article h2 { font-weight: 600 !important }");
        }
        
        /* for bold letter-spacing */
        let bodyff = localStorage.getItem("--ff-main") || meta.fontDefaults["--ff-main"];
        if (bodyff == "var(--ff-georgia-digits)") {
            cssPanel.insertAdjacentHTML("afterbegin", ".article .body-text strong { letter-spacing: -0.3px; }");
        }
        else if (bodyff == "'Roboto',sans-serif") {
            cssPanel.insertAdjacentHTML("afterbegin", ".article .body-text strong { letter-spacing: -0.1px; }");
        }
    }
}

function restoreFontDefaults() {
    document.getElementById("__css_user_set")?.replaceChildren();
    Array.from(document.getElementsByClassName("drop-select")).forEach(
        _select => {
            if (meta.fontDefaults[_select.id]) {
                _select.value = meta.fontDefaults[_select.id];
                localStorage.removeItem(_select.id);
            }
        }
    )
}

function imageFloat(chunk) {
    const rows = chunk.split("\n");
        let firstRow = rows.shift();
        const direction = firstRow.split(" ").shift().endsWith("left") ?"float-left" :"float-right";
            firstRow = firstRow.substring(firstRow.indexOf(" "));
        const lazy = !firstRow.includes("nolazy");
    
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
    let rows = chunk.split("\n").slice(1);
    
    rows = rows.map(
        row => {
            row = auxf(row, false);
            try {
                row = JSON.parse(row);
            }
            catch (error) {
                console.error('square-gallery input error');
                console.error(row)
                return "";
            }
            row.src ||= ""; row.caption ||= ""; row.alt ||= "";
            
            if (row.alt == "" && row.caption != "") { row.caption = row.alt; }
            if (row.caption == "" && row.alt != "") { row.alt = row.caption; }
            row.alt = row.alt.replaceAll('"', "&quot;").replaceAll('---','\u2014').replaceAll('--','\u2013');
            return `<figure>
                <img loading="lazy" onclick="setLightbox(this)" src="${ row.src }" title="${ row.caption }" alt="${ row.alt }">
                ${ row.caption ? '<figcaption>' + row.caption + '</figcaption>' : "" }
            </figure>`
        }
    );
    
    return `<div class="square-gallery">${ rows.join('') }</div>`;
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
                                        else if (p.startsWith("#")) { p = '<blockquote><p class="body-text">' + p.substring(1).trimStart() + '</p></blockquote>'; }
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
            li = (li.substring(initpad));
            const indent = Math.floor(initpad * 0.25);
            const liType = /^[\*\-] /.test(li) ?"ul" :(/^\d+\. /.test(li) ? "ol" : "none");
            const listType = (liType =="ol") ?"ol" :"ul";
            let startNum = (liType =="ol") ?li.substring(0, li.indexOf(".")) :1;
            li = (liType) == "none" ? li.trimStart() :li.substring(li.indexOf(" ")).trimStart();
            li = " ".repeat(indent * 4) + ( liType =='none' ?'<p>' + li + '</p>\n' :'<li>'+li+'</li>\n');
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
    let lclass = fine ?' class="auto-list fine body-text"' :' class="auto-list body-text"';
    return autoFormat(list.substring(0, 3) + lclass + list.substring(3));
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
                return "<p class='body-text'>"+ autoFormat(line) +"</p>";
            }
        }
    ).join('') }</blockquote>`;
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
    if (headingNum > 4) {
        headinNum = 4;
    }
    
    let tag = "h" + headingNum;
    chunk = chunk.slice(headingNum).trim();
    let id = chunk.replaceAll(" ", "_").replaceAll("---", "&mdash;").replaceAll("--", "&ndash;").replace(/[\*<>]/g, "");
    chunk = autoFormat(chunk);
    
    if (headingNum == 4) {
        return `<h4>${ chunk }</h4>`;
    }
    else {
        return `<${ tag } class="for-toc" id="${ id }">${ chunk }</${ tag }>`
    }
}

function linkReplace(chunk) {
    return chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkUrl) => {
        linkUrl = linkUrl.replaceAll("\\)", ")");
        displayText = displayText.trim();
        const external = linkUrl.startsWith("http");
        const blankDisplay = displayText == "";
        
        let link_index = '[res]';
        if (linkUrl.startsWith("http")) {
            link_index = meta.links.indexOf(linkUrl);
            if (link_index == -1) {
                link_index = meta.links.push(linkUrl);
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
            else if (linkUrl.includes("twitch.tv/")) {
                link_inner += '<span class="twitch-logo inline-icon"></span>';
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
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
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
        if (/^#{1,6} /.test(chunk)) { return autoHeading(chunk); }
        if (chunk.startsWith("!image-float")) { return imageFloat(chunk); }
        if (chunk.startsWith("!image-span")) { return imageSpan(chunk); }
        if (chunk.startsWith("!gallery")) { return gallery(chunk); }
        if (chunk.startsWith("!loadtoc")) { meta.loadTOC = true; return; }
        if (chunk.startsWith("!square-gallery")) { return squareGallery(chunk); }
        if (chunk.startsWith("!video")) { return autoVideo(chunk); }
        chunk = chunk.replaceAll("\\`", "&#96;");
        if (chunk.startsWith("!codeblock")) { return codeblock(chunk) ; }
        chunk = chunk.replace(/`(.+?)`/g, codeReplace);
        if (chunk.startsWith("!info")) { return `<div class="info">${ autoFormat(chunk.substring(chunk.indexOf("\n"))) }</div>`; }
        if (chunk.startsWith("//")) { return ""; }
        
        let isFine = chunk.startsWith(".");
        if (isFine) chunk = chunk.slice(1).trimStart();

        /* ------------------------------------- links ------------------------------------- */
        /*
            [text to be displayed](https://irisembury.github.io/)
        */
        chunk = linkReplace(chunk);

        if (chunk.startsWith("!table")) { return autoTable(chunk, tableNum++); }
        if (chunk.startsWith("!rows")) { return autoRows(chunk, tableNum++); }
        if (chunk.startsWith("    ") || chunk.startsWith("!indent")) { return autoIndent(chunk); }

        if (chunk.startsWith("!list")) { chunk = "- " + chunk.split("\n").slice(1).join("\n- "); }
        if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) { return autoList(chunk, isFine); }

        chunk = autoFormat(chunk);
        
        if (isFine) { return `<p class="fine">${ chunk.replace(/\n/g,"<br>") }</p>`; }
        return `<p class='body-text'>${ chunk }</p>`;
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

function auxf(str_in, quote_replace = true) {
    str_in = str_in.replaceAll("\\*", "&ast;").replaceAll('\\"', "&quot;").replaceAll("\\'", "&apos;").replaceAll("\|", "&verbar;").replaceAll("\\(", "&lpar;").replaceAll("\\)", "&rpar;").replaceAll("\\[", "&lbrack;").replaceAll("\\]", "&rbrack;").replaceAll("\\", "&#92;").replaceAll("\\^", "&Hat;").replaceAll("...", "&hellip;");
    if (quote_replace && (str_in.indexOf("'") != -1 || str_in.indexOf('"') != -1)) {
        str_in = str_in.replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1").replaceAll(/(>|^| |\()'/g, "$1&lsquo;").replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2").replaceAll(/'/g, "&rsquo;").replaceAll(/(>|^| |\()"/g, "$1&ldquo;").replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2").replaceAll(/(,|\.)"/g, "$1<span style='margin-left:-1px'>&rdquo;</span>").replaceAll(/"/g, "&rdquo;")
    }
    return str_in.replaceAll("---", '&mdash;').replace(/\-\-/g, "&ndash;");
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
    output = (output + auxf(_string)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
    return output;
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

function formattingToggle() {
    const fswitches = Array.from(document.querySelectorAll(".slide-checkbox.formatting"));
    let anyOff = false;
    fswitches.forEach(
        s => {
            if (s.checked == false) { anyOff = true; }
        }
    )
    fswitches.forEach(
        s => {
            s.checked = anyOff;
            s.dispatchEvent(new Event('change'));
        }
    )
}

/* irisembury.github.io/page/RETURN_VALUE/index.html */
function getDirectory() {
    let path = window.location.pathname.replace(/index\.html$/, "");
    if (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    path = path.substring(path.lastIndexOf('/') + 1);
    return path;
}
function getPathToRoot() {
    let path = window.location.pathname;
    if (path.endsWith("index.html")) {
        path = path.slice(0, -10);
    }
    if (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    path = path.substring(path.indexOf("irisembury.github.io"));
    path = path.replace(/[^/]/g,'');
    
    return '../'.repeat(path.length);
}
function elePush(query, content) {
    let node = document.querySelector(query);
    if (node != null) {
        node.insertAdjacentHTML("beforeend", autoFormat(content))
    }
}

/*
var userSession = {
    "theme":"light",
    "--ff-heading":"",
    "--ff-main":"",
    "--ff-aux-1":"",
    "--ff-aux-2":"",
    "justify-text":"",
    "indent-text":"",
    "reduce-margins":""
}
*/

window.addEventListener("load", function() {
    const pathToRoot = getPathToRoot();
    const index = pathToRoot == "";
    document.head.insertAdjacentHTML("beforeend", '<meta charset="utf-8"><link rel="stylesheet" href="' + pathToRoot + 'assets/fonts.css">');
    
    /*
    css-color-scheme
    --ff-heading
    --ff-main
    --ff-aux-1
    --ff-aux-2
    full-width
    justify-text
    indent-text
    reduce-margins
    */
    console.log(localStorage)
    
    document.body.innerHTML = `
        <header class="mh-top"></header>
        <nav class="top-nav">
            <div class="gn-segment">
                <div class="page-id">
                    ${ index ?'<span>Index Page</span>' :'<span><a href="' + pathToRoot + 'index.html">Index Page</a></span>' }
                </div>
            </div>
            <div class="gn-segment">
                <div class="jump-arrow icon" onclick="scrollToTop()"><svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="24" viewBox="0 0 24 24" width="24"><path d="M5.293 15.207a1 1 0 001.414 0L12 9.914l5.293 5.293a1 1 0 101.414-1.414L12 7.086l-6.707 6.707a1 1 0 000 1.414Z"></path></svg></div>
                <div id="gear" class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="28"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></div>
            </div>
        </nav>
        <div class="panel-wrapper">
            <div class="right-panel closed">
                <div><div><h3>Display:</h3></div></div>
                <div class="push-right"><label for="lightswitch">Dark mode</label><input type="checkbox" class="slide-checkbox" id="lightswitch"></div>
                <hr>
                <div><div><h3>Layout:</h3></div></div>
                <div class="push-right"><label for="full-width">Full page width</label><input type="checkbox" class="slide-checkbox auto" id="full-width"></div>
                <hr>
                <div><div><h3>Format preferences:</h3></div></div>
                <div class="push-right"><label for="indent-text">Indent paragraphs</label><input type="checkbox" class="slide-checkbox formatting auto" id="indent-text"></div>
                <div class="push-right"><label for="justify-text">Justify text</label><input type="checkbox" class="slide-checkbox formatting auto" id="justify-text"></div>
                <div class="push-right"><label for="reduce-margins">Reduce margins</label><input type="checkbox" class="slide-checkbox formatting auto" id="reduce-margins"></div>
                <div><div class="reset-button no-select" onclick="formattingToggle()" title="Flip text formatting switches (above) all on or all off">toggle these</div></div>
                <hr>
                <div><h3>Font family:</h3></div>
                <div>
                    <label>Headings:</label>
                    <select class="drop-select" id="--ff-heading" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option>
                        <option value="'Georgia Pro',serif">Georgia</option>
                        <option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option>
                        <option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option>
                        <option value="'Inter',sans-serif">Inter</option>
                        <option value="'Libre Caslon Text',serif">Libre Caslon Text</option>
                        <option value="'Lora',serif">Lora</option>
                        <option value="'Merriweather',serif">Merriweather</option>
                        <option value="'Open Sans',sans-serif">Open Sans</option>
                        <option value="'PT Serif',serif">PT Serif</option>
                        <option value="'Roboto',sans-serif">Roboto</option>
                        <option value="'Roboto Slab',sans-serif">Roboto Slab</option>
                        <option value="'Segoe UI',system-ui">Segoe UI</option>
                        <option value="'Trebuchet MS',sans-serif">Trebuchet MS</option>
                    </select>
                </div>
                <div>
                    <label>Body:</label>
                    <select class="drop-select" id="--ff-main" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option>
                        <option value="var(--ff-georgia-digits)">Georgia</option>
                        <option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option>
                        <option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option>
                        <option value="'Inter',sans-serif">Inter</option>
                        <option value="'Libre Caslon Text',serif">Libre Caslon Text</option>
                        <option value="'Lora',serif">Lora</option>
                        <option value="'Merriweather',serif">Merriweather</option>
                        <option value="'Open Sans',sans-serif">Open Sans</option>
                        <option value="'PT Serif',serif">PT Serif</option>
                        <option value="'Roboto',sans-serif">Roboto</option>
                        <option value="'Roboto Slab',sans-serif">Roboto Slab</option>
                        <option value="'Segoe UI',system-ui">Segoe UI</option>
                        <option value="'Trebuchet MS',sans-serif">Trebuchet MS</option>
                    </select>
                </div>
                <div>
                    <label>Aux 1:</label>
                    <select class="drop-select" id="--ff-aux-1" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option>
                        <option value="var(--ff-georgia-digits)">Georgia</option>
                        <option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option>
                        <option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option>
                        <option value="'Inter',sans-serif">Inter</option>
                        <option value="'Libre Caslon Text',serif">Libre Caslon Text</option>
                        <option value="'Lora',serif">Lora</option>
                        <option value="'Merriweather',serif">Merriweather</option>
                        <option value="'Open Sans',sans-serif">Open Sans</option>
                        <option value="'PT Serif',serif">PT Serif</option>
                        <option value="'Roboto',sans-serif">Roboto</option>
                        <option value="'Roboto Slab',sans-serif">Roboto Slab</option>
                        <option value="'Segoe UI',system-ui">Segoe UI</option>
                        <option value="'Trebuchet MS',sans-serif">Trebuchet MS</option>
                    </select>
                </div>
                <div>
                    <label>Aux 2:</label>
                    <select class="drop-select" id="--ff-aux-2" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option>
                        <option value="var(--ff-georgia-digits)">Georgia</option>
                        <option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option>
                        <option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option>
                        <option value="'Inter',sans-serif">Inter</option>
                        <option value="'Libre Caslon Text',serif">Libre Caslon Text</option>
                        <option value="'Lora',serif">Lora</option>
                        <option value="'Merriweather',serif">Merriweather</option>
                        <option value="'Open Sans',sans-serif">Open Sans</option>
                            <option value="'PT Serif',serif">PT Serif</option>
                        <option value="'Roboto',sans-serif">Roboto</option>
                        <option value="'Roboto Slab',sans-serif">Roboto Slab</option>
                        <option value="'Segoe UI',system-ui">Segoe UI</option>
                        <option value="'Trebuchet MS',sans-serif">Trebuchet MS</option>
                    </select>
                </div>
                <div><span class="reset-button no-select" onclick="restoreFontDefaults()" title="Set font family overrides (above) to their default values">restore defaults</span></div>
                <hr>
                <div><div style="line-height:1.5;color:var(--theme-grey-6,dimgrey);"><p>These preferences are saved in your browser's local storage. To clear your local storage for this site, <a class="pseudo-link" onclick="localStorage.clear()" title="Nothing visible happens when you click this, but I tested it and it works.">click here</a>.</p></div></div>
            </div>
        </div>
        <div class="page-grid">
            <nav class="toc"></nav>
            <div class="main-container">
                <article class="article">${ document.body.innerHTML }</article>
                <footer class="article-footer"></footer>
            </div>
            <div class="right-spacer"></div>
        </div>
        <footer class="page-footer"></footer>
        <div class="lightbox hidden">
            <div class="lb-top-left"><p></p></div>
            <div class="lb-img-wrapper" onclick="setLightbox('close')"><img></div>
            <div class="lb-caption-panel"><p></p></div>
        </div>
        <style id="__css_user_set"></style>`;

    const article = document.querySelector(".article");
    interpreter(article);
    HTML.classList.add("layout");

    Array.from(document.getElementsByClassName("drop-select")).forEach(
        select => {
            const s_val = localStorage.getItem(select.id) || meta.fontDefaults[select.id] || "";
            select.value = s_val;
            Array.from(select.children).forEach(option => option.style.fontFamily = option.value + ",system-ui" );
        }
    )
    setCSS();

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                        non-index                                     
    */
    if (!index) {
        {
            const entry = meta.pageListFull().find(e => e.url == getDirectory());
            if (entry) {
                if (entry.flags && entry.flags.length > 0) {
                    meta.flags = entry.flags;
                }
                if (entry.mirrors && entry.mirrors.length > 0) {
                    elePush('.article-footer', `
                        <section class="mirror-container column gap-8 label-external">
                            <div>The text of this page was also posted in other places:</div>
                            <div class="align-center gap-5">${ entry.mirrors.map(m => '<span class="bubble-link">' + parseSource(m) + '</span>').join('') }</div>
                        </section>
                    `);
                }
                if (entry.title) {
                    document.querySelector('.page-id')?.insertAdjacentHTML('beforeend','<span> | </span><span>'+entry.title+'</span>');
                }
                article.insertAdjacentHTML('afterbegin', '<div class="article-top">' + (entry.title ?`<h1 class="article-title for-toc">${ entry.title }</h1>` :'') + (entry.subtitle ?`<h2 class="article-subtitle">${ autoFormat(entry.subtitle) }</h2>` :'') + (entry.date ?`<div class="article-date">${ entry.date }` :'') + '</div>');
            }
        }

        elePush('.article-footer', `This is a personal site. I have no association with any other person or organization. I'm not an expert nor any sort of credentialed authority on any relevant topic.`);

        document.querySelector(".page-footer")?.insertAdjacentHTML("beforeend",`
        <div class='space-evenly'>
            <div class='column gap-rem' style="max-width:calc(var(--article-width) - 390px)">
                <div>Pages recently added:</div>
                <div>
                    <ul class='label-external'>
                        ${ meta.pageList().slice(0, 4).map( entry => `<li><a href="${ pathToRoot }page/${ entry.url }/index.html">${ entry.title }</a></li>` ).join("") }
                    </ul>
                </div>
            </div>
            <style> .page-footer a { filter:grayscale(1); } .page-footer .inline-icon { margin-right: 3px; } .page-footer .twitter-logo, .page-footer .github-logo { filter:invert(0.75); } .page-footer .youtube-logo { filter:contrast(1.5); } .page-footer .tumblr-logo { filter:brightness(1.2); } </style>
            <div class='column gap-rem'>
                <div>External links:</div>
                <div class='flex label-external'>
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

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                        dark theme                                    
    */
    const lightswitch = document.getElementById("lightswitch");
    if (lightswitch != null) {
        let scheme = (localStorage.getItem("css-color-scheme") == "dark" ?"dark" :"light");
        lightswitch.checked = (scheme == "dark");
        HTML.style.colorScheme = scheme;
        HTML.classList.toggle("dark", scheme == "dark");

        lightswitch.addEventListener("change", function() {
            let val = this.checked ?"dark" :"light";
            localStorage.setItem("css-color-scheme", val);
            HTML.style.colorScheme = val;
            HTML.classList.toggle("dark", this.checked);
        })
    }

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                        other flags                                   
    */
    if (meta.flags.includes("wide")) {
        HTML.classList.add("page-wide");
    }
    meta.links = meta.links.filter(a => a.startsWith("http"));
    if (meta.links.length > 0) {
        elePush('.article-footer', `
            <div class="citelist-box">
                <div class="space-between"><span>External resources referenced:</span><span style="opacity:0.75; font-size:14px; cursor:pointer;" onclick="let citelist = document.querySelector('.citelist'); if (citelist) { let expanded = citelist.classList.contains('expanded'); this.innerHTML = expanded? 'expand':'collapse'; citelist.classList.toggle('expanded',!expanded); }">expand</span></div>
                <div class="citelist">
                    ${ meta.links.map((x, n) => `<div class="no-select">${ n + 1 }.</div><div><a href="${ x }">${ x }</a></div>`).join("") }
                </div>
            </div>`);
    }
    Array.from(document.querySelectorAll(".age-from")).forEach(a => a.innerHTML = ageFromISO(a.innerHTML));

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                      #navbar set-up                                  
    */
    const navbar = document.querySelector('.top-nav');
    let canNavCheck = true;
    function navCheck() {
        if (!canNavCheck) {
            return;
        }
        canNavCheck = false;
        setTimeout(
            function() {
                canNavCheck = true;
                navbar.classList.toggle("sticky-active", pageYOffset > 120);
            },
            500
        )
        navbar.classList.toggle("sticky-active", pageYOffset > 120);
    }
    navCheck();
    window.addEventListener("scroll", navCheck);

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
    const gearMenu = document.querySelector(".right-panel");
    function gearMenuToggle(option) {
        if (option == "open") {
            gearMenu.classList.remove("closed");
        }
        else if (option == "close") {
            gearMenu.classList.add("closed");
        }
        else {
            gearMenuToggle(gearMenu.classList.contains("closed") ? "open" : "close");
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
    })
    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            gearMenuToggle("close");
            setLightbox("close");
        }
        else if (e.key === "Home") {
            scrollToTop();
        }
    })

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                      index elements                                  
    */
    document.querySelector(".page-index")?.insertAdjacentHTML("beforeend", meta.pageList().map(
        entry => `
            <div class="page-entry">
                <div class="space-between align-center">
                    <a href="page/${ entry.url }/index.html">${ entry.title }</a>
                    <div class="page-mirrors">${ Object.hasOwn(entry, "mirrors") && entry.mirrors.length > 0 ? entry.mirrors.map(m => " " + parseSource(m)).join('') :''}</div>
                </div>
                <div class="page-date">${ entry.date }</div>
            </div>
        `
    ).join(''))
    document.querySelector(".video-index")?.insertAdjacentHTML("beforeend", 
        `<div class="video-gallery">
            ${
                meta.videoList().map(
                    v => `
                        <figure>
                            <a href="https://youtu.be/${ v.url }"><img loading="lazy" src="https://i.ytimg.com/vi/${ v.url }/hqdefault.jpg"></a>
                            <figcaption>
                                <div class="yt-title"><a href="https://youtu.be/${ v.url }">${ v.title }</a></div>
                                ${ v.date ?'<div><span class="yt-date">' + v.date + '</span></div>' :'' }
                            </figcaption>
                        </figure>
                        `
                ).join('')
            }
        </div>`
    );

    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                     display figgling                                 
    */
    if (document.title == "") {
        document.title = "Iris Embury | GitHub";
    }
    else if (!document.title.endsWith("Iris Embury")) {
        document.title += " | Iris Embury";
    }
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                                    table of contents                                 
    */
    const pageHeadings = Array.from(document.getElementsByClassName("for-toc"));
    pageHeadings.forEach(h => {
        h.classList.remove("for-toc");
        if (h.classList.length == 0) {
            h.removeAttribute('class');
        }
    });

    if (pageHeadings.length < 2) {
        document.querySelector(".toc")?.remove();
        document.querySelector(".right-spacer")?.remove();
    }
    else {
        const toc = document.querySelector(".toc");
        toc.innerHTML = '<div class="toc-title">This page contents</div><div class="toc-row"><a class="pseudo-link" onclick="scrollToTop()">(Top)</a></div>' + pageHeadings.slice(1).map( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join('');
        toc.scrollTo({ behavior: "instant", top: 0 })
        
        const rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
        let lastHeading = 0;

        function toc_update() {
            let currentHeading = -1;
            for (let heading = 0; heading < pageHeadings.length; heading += 1) {
                let elementDistanceFromPageTop = window.scrollY + pageHeadings[heading].getBoundingClientRect().top;
                if (pageYOffset < elementDistanceFromPageTop - (0.475 * window.innerHeight)) {
                    break;
                }
                currentHeading = heading;
            }
            if (currentHeading != lastHeading) {
                rowsInToc.forEach( (row, n) => {
                    if (n == currentHeading && n > 0) {
                        row.classList.add("active-heading");
                    }
                    else {
                        row.classList.remove("active-heading");
                    }
                })
            }
            lastHeading = currentHeading;
        }

        let canTocUpdate = true;
        function attempt_toc_update() {
            if (!canTocUpdate) {
                return;
            }
            if (HTML.classList.contains("hide-toc")) {
                return;
            }
            canTocUpdate = false;
            toc_update();
            setTimeout(() => {
                canTocUpdate = true;
                toc_update();
            }, 500);
        }

        window.addEventListener("scroll", attempt_toc_update);
        attempt_toc_update();
    }
})


