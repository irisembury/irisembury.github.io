"use strict"

function scrollToTop() {
    window.scrollTo({ behavior: "smooth", top: 0 });
    history.replaceState(null, "", window.location.pathname + window.location.search);
    document.getElementById("toc")?.scrollTo({ behavior: "smooth", top: 0 })
}
function setlightbox(action) {
    if (action instanceof HTMLElement) {
        document.querySelector(".lightbox").classList.remove("hidden");
        let img = document.querySelector(".lightbox .lb-img-wrapper img")
        img.src = action.src;
        img.alt = action.alt;
        img.title = action.title;
        document.querySelector(".lightbox .lb-top-left p").innerHTML = `This image: <a href="${ action.src }">${ action.src.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;") }</a>`;
        document.querySelector(".lightbox .lb-caption-panel p").innerHTML = action.alt;
    }
    else if (typeof action == "string") {
        if (action == "close") {
            document.querySelector(".lightbox").classList.add("hidden");
        }
        else {
            document.querySelector(".lightbox").classList.remove("hidden");
            let fileName = action.split("/").slice(-1).join("").replaceAll("%20", "&nbsp;");
            document.querySelector(".lightbox .lb-top-left p").innerHTML = `This image: <a href="${ action }">${ fileName }</a>`;
            let img = document.querySelector(".lightbox .lb-img-wrapper img");
            img.src = action;
            img.alt = action;
            delete img.title;
            document.querySelector(".lightbox .lb-caption-panel p").innerHTML = fileName + " (no description)";
        }
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
function parseObj(entry, ...requiredFields) {
    entry = entry.trim().replaceAll('---','\u2014').replaceAll('--','\u2013').replaceAll("\"", "&quot;");
    const obj = { };
    entry.split("|").forEach(cell => {
        cell = cell.trim();
        const colon = cell.indexOf(":");
        if (colon != -1) {
            const key = cell.substring(0, colon);
            const value = cell.substring(colon + 1);
            obj[key] = value;
        } else {
            console.error(`parseObj: "${ cell }"`);
        }
    });
    requiredFields.forEach(r => { if (!Object.hasOwn(obj,r)) { obj[r] = ""; } });
    return obj;
}
function fileBox(chunk) {
    chunk = chunk.split("\n").slice(1).map(
        row => {
            row = parseObj(row,"src","name");
            row.name = row.name || row.src.split("/").slice(-1).join("");
            let iconType = row.src.endsWith("pdf") ?"pdf-icon" :"html-icon";
            return `<figure>
                <a target="_blank" title="${ row.src.split("/").slice(-1).join("") }" href="${ row.src }" class="${ iconType }"></a>
                <figcaption>
                    <a target="_blank" title="${ row.src.split("/").slice(-1).join("") }" href="${ row.src }">${ row.name }</a>
                </figcaption>
            </figure>`;
        }
    )
    return `<div class="file-box">${ chunk.join('') }</div>`;
}
function imageGallery(chunk) {
    chunk = chunk.split("\n");
    let meta = chunk.shift() + " ";
    meta = ("image-gallery " + meta.substring(meta.indexOf(" "))).trim();
    let galleryClass = "image-gallery";
    ["float","oar","contain"].forEach(x => { if (meta.includes(x)) galleryClass += ' ' + x; } )
    let maxHeight = meta.replace(/[^\d]/g, "") || meta.includes("float") ?200 :300;
    chunk = `<div class="${ galleryClass }">${ chunk.map( row => {
        row = parseObj(row,"src","caption","alt","title");
        if (row.src == "") { return ""; }
        row.title = row.title || row.alt || "Click to expand";
        row.alt = row.alt || row.caption;
        if (row.caption) { row.caption = '<figcaption>' + row.caption + '</figcaption>'; }
        return `<figure>
            <div><img style="max-height:${ maxHeight }px;" src="${ row.src }" alt="${ row.alt }" title="${ row.title }" loading="lazy" onclick="setlightbox(this)"></div>
            ${ row.caption }
        </figure>`;
    }).join("")}</div>`;
    return autoFormat(chunk);
}
function autoVideo(chunk) {
    let data = chunk.split("\n").slice(1)[0].split("|").map(c => c.trim());
    let fileUrl = data[0];
    let dot = fileUrl.indexOf(".");
    if (dot == -1) { return; }
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
let table_number = 1;
function autoTable(chunk) {
    let table = `<div class="table-wrapper"><table class="auto-table auto-table-${ table_number }"><tbody>${
        chunk.split(/\n(?! )/g).slice(1).map(
            (tableRow, row_index) => {
                tableRow = tableRow.split('\n').map( c => { c = c.trim(); return c.startsWith("!") ? '\n' + c : c; } ).join('\n').split('\n\n').map(c => { if (!c.startsWith("!")) { c = c.replace(/\n/g,'\n\n') } return c; }).join('\n\n');
                return `<tr class="row row-${ (row_index + 1) + ' row-' + (row_index % 2 ?'even' :'odd') }">${
                    tableRow.replaceAll('\\|', '&verbar;').split('|').map(
                        (cell, cell_index) => {
                            return `<td class="cell col-${ cell_index + 1 } col-${ cell_index % 2 ?'even' :'odd' }">${
                                interpreter(cell)
                            }</td>`
                        }
                    ).join('')
                }</tr>`
        }).join('')
    }</tbody></table></div>`;
    
    let first_row = chunk.substring(0, chunk.indexOf('\n'));
    if (first_row.indexOf(' ') != -1) {
        first_row = first_row.substring(first_row.indexOf(' ')).trim();
    }
    if (first_row.replace(/\s/g, '').length > 0) {
        table += `<style>${ first_row.replace(/this/g, ".auto-table-" + table_number).replace(/;/g, "!important;") }</style>`
    }
    table_number += 1;
    return table;
}
function autoList(chunk) {
    const closeTags = [];
    let prevIndent = -1;
    const list = chunk.split("\n").map(
        li => {
            const initpad = li.match(/^ */)[0].length;
            li = (li.substring(initpad));
            const indent = Math.floor(initpad * 0.25);
            const liType = /^[\*\-] /.test(li) ?"ul" :(/^\d+\. /.test(li) ? "ol" : "none");
            const listType = (liType =="ol") ?"ol" :"ul";
            let startNum = (liType =="ol") ?li.substring(0, li.indexOf(".")) :1;
            li = (liType) == "none" ? li.trimStart() :li.substring(li.indexOf(" ")).trimStart();
            if (liType =='none') {
                if (li.startsWith("#")) { li = '<blockquote class="auto-indent"><p>' + li.slice(1).trimStart() + '</p></blockquote>\n' }
                if (li.startsWith(".")) { li = '<div class="fine"><p>' + li.slice(1).trimStart() + '</p></div>\n' }
                else { li = '<p>' + li + '</p>\n'; }
            } else { li = '<li>' + li + '</li>' };
            li = " ".repeat(indent * 4) + li;
            if (indent > prevIndent) {
                li = " ".repeat(indent * 4) + "<" + listType + (liType =="ol" ?' start="'+startNum+'"' :'') + ">\n" + li;
                closeTags.push(" ".repeat(indent * 4) + "</"+ listType +">\n");
            } else if (indent < prevIndent) {
                li = closeTags.splice(-(prevIndent - indent)).reverse().join('') + li;
            }
            prevIndent = indent;
            return autoFormat(li);
        }
    ).join("") + closeTags.join("");
    let output = list.substring(0, 3) + ' class="auto-list"' + list.substring(3);
    return output;
}
function autoIndent(chunk) {
    if (chunk.startsWith("!indent\n")) { chunk = chunk.substring(chunk.indexOf('\n')) }
    chunk = chunk.split("\n").map( line => {
        line = line.trim();
        if (line.startsWith("---")) {
            line = '<p class="attribution">' + line + '</p>';
        }
        else if (line.startsWith(".")) {
            line = '<div class="fine"><p>' + line.substring(1).trimStart() + '</p></div>'
        }
        else {
            line = '<p>' + line + '</p>';
        }
        return autoFormat(line);
    }).join('');
    return `<blockquote class="auto-indent">${ chunk }</blockquote>`
}
/* converts ISO 8601 date format (YYYYMMDD) into YYYY Month D */
function isoFormat(datestring) {
    let input = datestring.replace(/\D/g, "")
    if (input.length == 8) {
        const iso = input.substring(0,4) + "-" + input.substring(4,6) + "-" + input.substring(6,8);
        let [year,month,day] = iso.split("-").map(Number);
        if (month >= 1 && month <= 12) {
            month = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June", 7: "July", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec" }[month]
        }
        datestring = '<time title="ISO: '+ iso +'" datetime="'+ iso +'">'+ year + " " + month + " " + day +'</time>';
    }
    return datestring;
}
function autoHeading(chunk) {
    let headingNumber = chunk.indexOf(" ");
    let tag = "h" + Math.min(headingNumber, 4);
    let heading = chunk.slice(headingNumber + 1).trim();
    let id = heading.replaceAll(" ", "_").replaceAll("---", "&mdash;").replaceAll("--", "&ndash;").replace(/[\*<>]/g, "");
    heading = autoFormat(heading);
    heading = (headingNumber == 4) ?`<h4>${ heading }</h4>` :`<${ tag } class="for-toc" id="${ id }">${ heading }</${ tag }>`;
    return heading;
}
function linkReplace(chunk) {
    chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkUrl) => {
        linkUrl = linkUrl.replaceAll('&#41;', ')');
        displayText = displayText.trim();
        const external = linkUrl.startsWith("http");
        const blankDisplay = displayText == "";
        
        let linkIndex = '[res]';
        if (linkUrl.startsWith("http")) {
            let _linkUrl = linkUrl;
            if (_linkUrl.indexOf("#") != -1) {
                _linkUrl = _linkUrl.substring(0, _linkUrl.indexOf("#"))
            }
            linkIndex = page_links.indexOf(_linkUrl);
            if (linkIndex == -1) {
                linkIndex = page_links.push(_linkUrl); }
        }
        if (linkUrl.startsWith('#')) {
            linkUrl = linkUrl.replaceAll(' ', '_');
        }
        let a_tag = '<a href="' + linkUrl + '"';
        let link_title = linkUrl;
        let link_class = [];
        let link_inner = displayText || '[' + linkIndex + ']';
        if (!external) {
            if (linkUrl.endsWith(".png") || linkUrl.endsWith(".jpg")) {
                a_tag = `<a onclick="setlightbox('${ linkUrl }')"`;
                link_class.push("pseudo-link");
                link_title = 'View in gallery: ' + linkUrl.split("/").slice(-1).join("");
                let s_ = link_inner.lastIndexOf(" ") + 1;
                link_inner = link_inner.substring(0, s_) + '<span class="nowrap">' + link_inner.substring(s_) + '<span class="inline-icon lightbox-link"></span></span>';
            }
        }
        else {
            link_class.push("external-link");
            let icon;
            if (linkUrl.includes("youtube.com") || linkUrl.includes("youtu.be")) {
                icon = '<span class="youtube-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("twitch.tv/")) {
                icon = '<span class="twitch-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("bsky.app/")) {
                icon = '<span class="bluesky-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("x.com") || linkUrl.includes("twitter.com")) {
                icon = '<span class="twitter-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("facebook.com")) {
                icon = '<span class="facebook-logo inline-icon"></span>';
            }
            else if (linkUrl.includes("substack.com")) {
                icon = '<span class="substack-logo inline-icon"></span>';
            }
            if (icon) {
                let spaceIndex = link_inner.lastIndexOf(" ") + 1;
                link_inner = link_inner.substring(0, spaceIndex) + '<span class="nowrap">' + link_inner.substring(spaceIndex) + icon + '</span>';
            }
        }
        a_tag += ' title="' + link_title + '" class="' + link_class.join(' ') + '">' + link_inner + '</a>';
        if (blankDisplay) {
            a_tag = '<sup>' + a_tag + '</sup>';
        }
        return a_tag;
    })
    chunk = chunk.replace(/(?<=^|\s)(https?:\/\/\S+)(?=\s|$)/g, (match, linkUrl) => {
        let linkEnd = "";
        if (/[.,?!;]$/.test(linkUrl)) {
            linkEnd = linkUrl.at(-1);
            linkUrl = linkUrl.slice(0, -1);
        }
        let _linkUrl = linkUrl;
        if (_linkUrl.indexOf("#") != -1) {
            _linkUrl = _linkUrl.substring(0, _linkUrl.indexOf("#"))
        }
        if (page_links.indexOf(_linkUrl) == -1) {
            page_links.push(_linkUrl);
        }
        return '<a href="' + linkUrl + '">' + linkUrl + '</a>' + linkEnd;
    });
    return chunk;
}
/* ------------------------------- main interpreter for #article content ------------------------------- */
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
        return;
    }
    let input = argValue.replace(/\n\n+/g, "\n\n").replace(/\r/g, "").replace(/\t/g, "    ").replace("\\\\", "&#92;").replaceAll("\\*", "&#42;").replaceAll('\\"', "&#34;").replaceAll("\\'", "&#39;").replaceAll("\\|", "&#124;").replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;").replaceAll("\\[", "&#91;").replaceAll("\\]", "&#93;").replaceAll("\\^", "&#94;").replaceAll("\\.","&#46;").replaceAll("...", "\u2026").replaceAll("\\`", "&#96;").replaceAll("\\:", "&#58;").trim().split("\n\n");
    input = input.map( chunk => {
        if (chunk.startsWith("//")) { return ""; }
        if (chunk == "----") { return "<hr>"; }
        if (/^#{1,6} /.test(chunk)) { return autoHeading(chunk); }
        if (chunk.startsWith("!images")) { return imageGallery(chunk); }
        if (chunk.startsWith("!files")) { return fileBox(chunk); }
        if (chunk.startsWith("!video")) { return autoVideo(chunk); }
        if (chunk.startsWith("!codeblock")) { return codeblock(chunk) ; }
        chunk = chunk.replace(/`(.+?)`/g, codeReplace);
        if (chunk.startsWith("!info")) { return `<div class="info">${ autoFormat(chunk.substring(chunk.indexOf("\n"))) }</div>`; }
        chunk = linkReplace(chunk);
        if (chunk.startsWith("!table")) { return autoTable(chunk); }
        if (chunk.startsWith("!indent") || chunk.startsWith("    ")) { return autoIndent(chunk); }
        let isFine = chunk.startsWith(".")
        if (isFine) { chunk = chunk.slice(1).trimStart(); }
        if (chunk.startsWith("!list")) { chunk = autoList(chunk.substring(chunk.indexOf('\n') + 1)); }
        else if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) { chunk = autoList(chunk); }
        else { chunk = '<p>' + autoFormat(chunk) + '</p>'; }
        if (isFine) { chunk = '<div class="fine">' + chunk + '</div>'; }
        return chunk;
    })
    return input.join('');
}
function ageFromISO(argDate) {
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
function autoFormat(_string) {
    _string = _string.trim();
    let output = "";
    while (true) {
        const openTag = _string.indexOf("<");
        const closeTag = _string.substring(openTag).indexOf(">") + openTag;
        if (openTag == -1 || closeTag - openTag == -1) { break; }
        output += aufoaux(_string.slice(0, openTag + 1)) + _string.slice(openTag + 1, closeTag);
        _string = _string.substring(closeTag);
    }
    output = (output + aufoaux(_string))
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.+?)\*/g, '<i>$1</i>')
        .replace(/\[([^:]+):([^\]]+)\]/g, '<span class="$1">$2</span>');
    return output;
}
function aufoaux(str_in) {
    if (str_in.indexOf("'") != -1 || str_in.indexOf('"') != -1) {
        str_in = str_in.replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1").replaceAll(/(>|^| |\()'/g, "$1&lsquo;").replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2").replaceAll(/'/g, "&rsquo;").replaceAll(/(>|^| |\()"/g, "$1&ldquo;").replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2").replaceAll(/"/g, "&rdquo;")
    }
    return str_in.replaceAll("---", '\u2014').replaceAll("--", "\u2013");
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
    }
    output += colorizeKeywords(stringInput, syntaxClass, customKeywords);
    /* line comment: */
    output = output.replace(/(\/\/.*)/, "<span class=\"code-comment\">$1</span>").replace(/(#.*)/, "<span class=\"code-macro\">$1</span>")
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
function getRootPath() {
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
/*
var userSession = {
    "theme":"light",
    "--ff-heading-1":"",
    "--ff-main":"",
    "--ff-aux-1":"",
    "--ff-aux-2":"",
    "justify-text":"",
    "indent-text":"",
    "reduce-block":""
}
*/
function loadBody() {
    HTML.lang = "en";
    document.head.insertAdjacentHTML("beforeend",'<meta charset="utf-8"><link rel="stylesheet" href="'+rootPath+'assets/main.css"><link rel="icon" type="image/x-icon" href="'+rootPath+'favicon.ico"><link rel="stylesheet" href="'+rootPath+'assets/fonts.css">');
    document.body.innerHTML = `
        <header class="top-header align-center center"></header>
        <nav class="top-nav">
            <div class="nav-segment">
                <div class="page-id">
                    ${ index ?'<span>Index Page</span>' :'<span><a href="' + rootPath + 'index.html">Back to Index</a></span>' }
                </div>
            </div>
            <div class="nav-segment">
                <div class="jump-arrow nav-icon" onclick="scrollToTop()"><svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="24" viewBox="0 0 24 24" width="24"><path d="M5.293 15.207a1 1 0 001.414 0L12 9.914l5.293 5.293a1 1 0 101.414-1.414L12 7.086l-6.707 6.707a1 1 0 000 1.414Z"></path></svg></div>
                <div id="gear" class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="28"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></div>
            </div>
        </nav>
        <div class="panel-wrapper">
            <div class="right-panel closed">
                <div><div><h3>Display:</h3></div></div>
                <div class="push-right"><label for="lightswitch">Dark mode:</label><input type="checkbox" class="slide-checkbox" id="lightswitch"></div>
                <hr>
                <div><div><h3>Paragraph formatting:</h3></div></div>
                <div class="push-right"><label for="indent-text">Indent paragraphs:</label><input type="checkbox" class="slide-checkbox formatting auto" id="indent-text"></div>
                <div class="push-right"><label for="justify-text">Text-align justify:</label><input type="checkbox" class="slide-checkbox formatting auto" id="justify-text"></div>
                <div class="push-right"><label for="reduce-block">Reduce paragraph margins:</label><input type="checkbox" class="slide-checkbox formatting auto" id="reduce-block"></div>
                <div><div class="reset-button no-select" onclick="formattingToggle()" title="Flip text formatting switches (above) all on or all off">toggle these</div></div>
                <hr>
                <div><h3>Font family:</h3></div>
                <div>
                    <label>Headings 1:</label>
                    <select class="drop-select" id="--ff-heading-1" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option><option value="'Georgia Pro',sans-serif">Georgia</option><option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option><option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option><option value="'Inter',sans-serif">Inter</option><option value="'Libre Caslon Text',sans-serif">Libre Caslon Text</option><option value="'Lora',sans-serif">Lora</option><option value="'Merriweather',sans-serif">Merriweather</option><option value="'Open Sans',sans-serif">Open Sans</option><option value="'PT Serif',sans-serif">PT Serif</option><option value="'Roboto',sans-serif">Roboto</option><option value="'Roboto Slab',sans-serif">Roboto Slab</option><option value="'Segoe UI',sans-serif">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',sans-serif">Trebuchet MS</option><option value="'Verdana',sans-serif">Verdana</option>
                    </select>
                </div>
                <div>
                    <label>Headings 2:</label>
                    <select class="drop-select" id="--ff-heading-2" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option><option value="'Georgia Pro',sans-serif">Georgia</option><option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option><option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option><option value="'Inter',sans-serif">Inter</option><option value="'Libre Caslon Text',sans-serif">Libre Caslon Text</option><option value="'Lora',sans-serif">Lora</option><option value="'Merriweather',sans-serif">Merriweather</option><option value="'Open Sans',sans-serif">Open Sans</option><option value="'PT Serif',sans-serif">PT Serif</option><option value="'Roboto',sans-serif">Roboto</option><option value="'Roboto Slab',sans-serif">Roboto Slab</option><option value="'Segoe UI',sans-serif">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',sans-serif">Trebuchet MS</option><option value="'Verdana',sans-serif">Verdana</option>
                    </select>
                </div>
                <div>
                    <label>Headings 3:</label>
                    <select class="drop-select" id="--ff-heading-3" onchange="setCSS(this)">
                    <option value="'Arial',sans-serif">Arial</option><option value="'Georgia Pro',sans-serif">Georgia</option><option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option><option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option><option value="'Inter',sans-serif">Inter</option><option value="'Libre Caslon Text',sans-serif">Libre Caslon Text</option><option value="'Lora',sans-serif">Lora</option><option value="'Merriweather',sans-serif">Merriweather</option><option value="'Open Sans',sans-serif">Open Sans</option><option value="'PT Serif',sans-serif">PT Serif</option><option value="'Roboto',sans-serif">Roboto</option><option value="'Roboto Slab',sans-serif">Roboto Slab</option><option value="'Segoe UI',sans-serif">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',sans-serif">Trebuchet MS</option><option value="'Verdana',sans-serif">Verdana</option>
                    </select>
                </div>
                <div>
                    <label>Main body text:</label>
                    <select class="drop-select" id="--ff-main" onchange="setCSS(this)">
                        <option value="'Arial',sans-serif">Arial</option><option value="var(--ff-georgia-digits)">Georgia</option><option value="'IBM Plex Sans',sans-serif">IBM Plex Sans</option><option value="'IBM Plex Serif',sans-serif">IBM Plex Serif</option><option value="'Inter',sans-serif">Inter</option><option value="'Libre Caslon Text',sans-serif">Libre Caslon Text</option><option value="'Lora',sans-serif">Lora</option><option value="'Merriweather',sans-serif">Merriweather</option><option value="'Open Sans',sans-serif">Open Sans</option><option value="'PT Serif',sans-serif">PT Serif</option><option value="'Roboto',sans-serif">Roboto</option><option value="'Roboto Slab',sans-serif">Roboto Slab</option><option value="'Segoe UI',sans-serif">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',sans-serif">Trebuchet MS</option><option value="'Verdana',sans-serif">Verdana</option>
                    </select>
                </div>
                <div>
                    <label>Aux 1:</label>
                    <select class="drop-select" id="--ff-aux-1" onchange="setCSS(this)">
                        <option value="'Arial',system-ui">Arial</option><option value="var(--ff-georgia-digits)">Georgia</option><option value="'IBM Plex Sans',system-ui">IBM Plex Sans</option><option value="'IBM Plex Serif',system-ui">IBM Plex Serif</option><option value="'Inter',system-ui">Inter</option><option value="'Libre Caslon Text',system-ui">Libre Caslon Text</option><option value="'Lora',system-ui">Lora</option><option value="'Merriweather',system-ui">Merriweather</option><option value="'Open Sans',system-ui">Open Sans</option><option value="'PT Serif',system-ui">PT Serif</option><option value="'Roboto',system-ui">Roboto</option><option value="'Roboto Slab',system-ui">Roboto Slab</option><option value="'Segoe UI',system-ui">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',system-ui">Trebuchet MS</option><option value="'Verdana',system-ui">Verdana</option>
                    </select>
                </div>
                <div>
                    <label>Aux 2:</label>
                    <select class="drop-select" id="--ff-aux-2" onchange="setCSS(this)">
                        <option value="'Arial',system-ui">Arial</option><option value="var(--ff-georgia-digits)">Georgia</option><option value="'IBM Plex Sans',system-ui">IBM Plex Sans</option><option value="'IBM Plex Serif',system-ui">IBM Plex Serif</option><option value="'Inter',system-ui">Inter</option><option value="'Libre Caslon Text',system-ui">Libre Caslon Text</option><option value="'Lora',system-ui">Lora</option><option value="'Merriweather',system-ui">Merriweather</option><option value="'Open Sans',system-ui">Open Sans</option><option value="'PT Serif',system-ui">PT Serif</option><option value="'Roboto',system-ui">Roboto</option><option value="'Roboto Slab',system-ui">Roboto Slab</option><option value="'Segoe UI',system-ui">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',system-ui">Trebuchet MS</option><option value="'Verdana',system-ui">Verdana</option>
                    </select>
                </div>
                <div>
                    <label>Nav:</label>
                    <select class="drop-select" id="--ff-nav" onchange="setCSS(this)">
                        <option value="'Arial',system-ui">Arial</option><option value="var(--ff-georgia-digits)">Georgia</option><option value="'IBM Plex Sans',system-ui">IBM Plex Sans</option><option value="'IBM Plex Serif',system-ui">IBM Plex Serif</option><option value="'Inter',system-ui">Inter</option><option value="'Libre Caslon Text',system-ui">Libre Caslon Text</option><option value="'Lora',system-ui">Lora</option><option value="'Merriweather',system-ui">Merriweather</option><option value="'Open Sans',system-ui">Open Sans</option><option value="'PT Serif',system-ui">PT Serif</option><option value="'Roboto',system-ui">Roboto</option><option value="'Roboto Slab',system-ui">Roboto Slab</option><option value="'Segoe UI',system-ui">Segoe UI</option><option value="'Sitka','Sitka Text',sans-serif">Sitka Text</option><option value="'Trebuchet MS',system-ui">Trebuchet MS</option><option value="'Verdana',system-ui">Verdana</option>
                    </select>
                </div>
                <div><span class="reset-button no-select" onclick="restoreDefaults()" title="Set font family overrides (above) to their default values">restore defaults</span></div>
                <hr>
                <div><div><h3>Layout:</h3></div></div>
                <div class="push-right"><label for="full-width">Full page width:</label><input type="checkbox" class="slide-checkbox auto" id="full-width"></div>
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
        <div class="lightbox hidden">
            <div class="lb-top-left"><p></p></div>
            <div class="lb-img-wrapper" onclick="setlightbox('close')"><img></div>
            <div class="lb-caption-panel"><p></p></div>
        </div>
        <style id="__css_user_set"></style>`;
    interpreter(document.querySelector(".article"));
    HTML.classList.add("layout");
}
let canTocUpdate = true, tocLastHeading = 0, rowsInToc = [], pageHeadings = [];
function attempt_toc_update() {
    if (!canTocUpdate) { return; }
    if (HTML.classList.contains("hide-toc")) { return; }
    canTocUpdate = false;
    setTimeout(() => {
        canTocUpdate = true;
        toc_update();
    }, 500);
    toc_update();
}
function toc_update() {
    let currentHeading = -1;
    for (let heading = 0; heading < pageHeadings.length; heading += 1) {
        let elementDistanceFromPageTop = window.scrollY + pageHeadings[heading].getBoundingClientRect().top;
        if (pageYOffset < elementDistanceFromPageTop - (0.475 * window.innerHeight)) {
            break;
        }
        currentHeading = heading;
    }
    if (currentHeading != tocLastHeading) {
        rowsInToc.forEach( (row, n) => {
            if (n == currentHeading && n > 0) {
                row.classList.add("active-heading");
            }
            else {
                row.classList.remove("active-heading");
            }
        })
    }
    tocLastHeading = currentHeading;
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
                if (_select_value != font_defaults[_select.id]) {
                    styleOverrides.push(_select.id + ':' + _select_value)
                }
            }
        );
        if (styleOverrides.length > 0) {
            cssPanel.insertAdjacentHTML("afterbegin", ":root{" + styleOverrides.join(";") + "}");
        }
        if (localStorage.getItem("--ff-heading-1") == "'Georgia Pro',sans-serif") {
            cssPanel.insertAdjacentHTML("afterbegin", ".article h1 { font-weight: 600 !important; }");
        }
        if (localStorage.getItem("--ff-heading-2") == "'Georgia Pro',sans-serif") {
            cssPanel.insertAdjacentHTML("afterbegin", ".article h2 { font-weight: 600 !important; }");
        }
        
        /* for bold letter-spacing */
        let bodyff = localStorage.getItem("--ff-main") || font_defaults["--ff-main"];
        if (bodyff == "var(--ff-georgia-digits)" || bodyff == "'Roboto',sans-serif") {
            cssPanel.insertAdjacentHTML("afterbegin", ".article p strong, .article li strong { letter-spacing: -0.1px; }");
        }
    }
}
function setupLightswitch() {
    const lightswitch = document.getElementById("lightswitch");
    if (lightswitch) {
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
}
function classSelector(sEle) {
    if (sEle != null && sEle instanceof Node) {
        let sValue = sEle.value;
        HTML.classList.remove(...Array.from(sEle.children).map(o => o.value).filter(o => o != sValue));
        HTML.classList.add(sValue);
        localStorage.setItem(sEle.id, sEle.value);
    }
}
function restoreDefaults() {
    document.getElementById("__css_user_set")?.replaceChildren();
    Array.from(document.getElementsByClassName("drop-select")).forEach(
        _select => {
            if (font_defaults[_select.id]) {
                _select.value = font_defaults[_select.id];
                localStorage.removeItem(_select.id);
            }
        }
    )
    setCSS();
}
let navbar = null, canNavCheck = true, navIsSticky = false;
function navCheck() {
    if (!canNavCheck) { return; }
    canNavCheck = false;
    setTimeout(
        function() {
            canNavCheck = true;
            if (!navIsSticky && pageYOffset > 150) {
                navbar.classList.add("sticky-active")
                navIsSticky = true;
            }
            else if (navIsSticky && pageYOffset < 150) {
                navbar.classList.remove("sticky-active")
                navIsSticky = false;
            }
        }, 500
    )
    navbar.classList.toggle("sticky-active", pageYOffset > 150);
}
function loadEntryMeta() {
    const page = pageListFull().find(e => e.url==getDirectory());
    if (!index && page) {
        if (page.flags && page.flags.includes("wide")) {
            HTML.classList.add("wide");
        }
        if (page.mirrors) {
            let mirrors_ = page.mirrors.filter(m => m);
            if (mirrors_.length > 0) {
                document.querySelector('.article-footer')?.insertAdjacentHTML("beforeend", `<section class="mirror-container column gap-8 label-external"><div>The text of this page was also posted in other places:</div><div class="align-center gap-5">${ page.mirrors.map(m => '<span class="bubble-link">' + parseSource(m) + '</span>').join('') }</div></section>`);
            }
        }
        if (page.title) {
            document.querySelector('.page-id')?.insertAdjacentHTML('beforeend','<span> | </span><span>' + page.title + '</span>');
        }
        document.querySelector(".article")?.insertAdjacentHTML('afterbegin', '<div class="article-top">' + (page.title ?`<h1 class="article-title for-toc">${ page.title }</h1>` :'') + (page.subtitle ?`<h2 class="article-subtitle">${ page.subtitle }</h2>` :'') + (page.date ?`<div class="article-date">${ page.date }` :'') + '</div>');
        document.querySelector('.article-footer')?.insertAdjacentHTML("beforeend", `
        <div>
            <p>This is a personal site. I have no association with any other person or organization. I'm not an expert nor any sort of credentialed authority on any relevant topic.</p>
        </div>
        <div class='footer-links-area'>
            <div class="recent-pages">
                <div>Pages recently added:</div>
                <div>
                    <ul class='label-external'>
                        ${ pageList().slice(0, 4).map( entry => `<li><a href="${ rootPath }page/${ entry.url }/index.html">${ page.title }</a></li>` ).join("") }
                    </ul>
                </div>
            </div>
            <div class="external-links">
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
        </div>`);
    }
}
const HTML = document.documentElement;
const rootPath = getRootPath();
const index = (rootPath == "");
const pageListData = [
{ title:"The Chilean coup", url:"allende-and-pinochet", preview:"I recently made an aside, while talking about something else, that America has been a net force for good in the world. The phrasing --- a *net* force for good --- doesn't", date:"2026-07-02", mirrors:[""],flags:["hidden"] },
{ title:"How bad is America?", url:"how-bad-is-america", preview:"I recently made an aside, while talking about something else, that America has been a net force for good in the world. The phrasing --- a *net* force for good --- doesn't", date:"2026-07-01", mirrors:[""] },
{ title:"What was the Freedom Convoy?", url:"freedom-convoy", preview:"In January 2022, a bunch of people drove into Ottawa in big trucks, parked them in the road, and started honking. Its participants and proponents called", date:"2026-06-15", mirrors:[""], flags:["wide"] },
{ title:"Pierre Poilievre", preview:"In the post-Harper years, the Conservative Party of Canada had some time to figure out what it wanted to be. Andrew Scheer took over the party in 2017", url:"pierre-poilievre", date:"", mirrors:[""], flags:["hidden"] },
{ title:"The Conservative Party's hard problem", preview:"In Canadian political discourse, it's become somewhat common for the right wing to say the LPC and CPC are near-evenly matched, citing charts kind of", url:"conservative-party-hard-problem", date:"2026-05-01", mirrors:["substack:196152041","tumblr:815438258908643328","medium:e59c21f8095a"] },
{ title:"Canada's plan for a sovereign wealth fund", preview:"The government of Canada has announced we're going to develop a general sovereign wealth fund. A sovereign wealth fund just means a bunch of financial", url:"canada-sovereign-wealth-fund", date:"2026-04-29", mirrors:["substack:195885575","tumblr:815245873447649280"] },
{ title:"Floor crossings", preview:"In the 2025 general election, the Liberal Party won 169 House seats of the 172 needed for a majority. For being the largest party in the House, the Liberal", url:"floor-crossings", date:"2026-04-17", mirrors:["substack:floor-crossings","medium:dfe93bb23bdd"] },
{ title:"Rational ignorance", preview:"Rational ignorance is when you don't know or understand something, but it's not irrational for you to not bother learning it. It's not worth the time", url:"rational-ignorance", date:"2026-04-09", mirrors:["substack:rational-ignorance","tumblr:813419185909727232","patreon:155199122"] },
{ title:"Liberal conservatism", subtitle:"A philosophy of prudence and humility", preview:"In the first sense that is often spoken of, conservatism is not directly a political position or platform. It doesn't tell us what the government should", url:"liberal-conservatism", date:"2026-03-24", mirrors:["substack:foundations-of-liberal-conservatism"], flags:["wide"] },
{ title:"The case for abortion", preview:"The way I propose we think about questions of legality is to consider the most direct implications of the question. Do you endorse violence being used", url:"abortion", date:"2026-02-18", mirrors:["substack:the-case-for-abortion","tumblr:809547051047272448","patreon:155199340"] },
{ title:"A synopsis of American decline", preview:"The United States of America might not be a perfect country, but it's long been a bulwark against other, competing countries that were clearly even worse", url:"a-synopsis-of-american-decline", date:"2026-01-28", mirrors:["substack:186165875","patreon:155201485"] },
{ title:"Fetishism & politics", preview:"A strange reality I've made peace with is that people's political views on certain topics can be affected by their sexual attraction. The most obvious", url:"fetishism-politics", date:"2024-11-14", mirrors:["tumblr:770364766791352320"] },
{ title:"Nick Shirley & the Somali day cares", preview:"After the regime of the U.S.-backed dictator Siad Barre collapsed in 1991, Somalia fell into a chaotic civil war, and many Somalis fled the region as", url:"somali-day-cares", date:"2026-01-02", mirrors:["substack:183243480","patreon:155200604"]},
{ title:"Why is Reddit so hated?", subtitle:"On the website's history, what makes it unique, and the intense hatred many people seem to have for it", preview:"Reddit today is enduringly popular, despite how many times the company has gone forward with unpopular changes. It's weathered many storms. The people", url:"why-is-reddit-so-hated", date:"2025-12-30", mirrors:["substack:why-is-reddit-so-hated"] },
{ title:"Stay the trenches", preview:"In 2014, being online and trying to use social media as a right-winger felt oppressive. It felt like all the big social media websites were dominated", url:"stay-the-trenches", date:"2025-12-17", mirrors:["substack:stay-the-trenches"] },
{ title:"Immigration", preview:"In recent years, we've been seeing the rise of political parties full of liars, incompetents, and racists, the sort of people I wouldn't trust with", url:"immigration", date:"2025-11-06", mirrors:["substack:183229652"] },
{ title:"Prejudice", preview:"What is prejudice? This might seem like a weird prompt, but we so often take for granted that prejudice is bad that we might never stop and think about", url:"what-is-prejudice", date:"2025-10-30", mirrors:["substack:prejudice"] },
{ title:"Notes on India", preview:"There's been a lot of racism directed at Indians in recent years. In Canada, they're one of the main immigrant groups that our country has been receiving", url:"notes-on-india", date:"2025-10-24", mirrors:["substack:india","tumblr:798351257128615936"] },
{ title:"Liberalism not leftism", preview:"In the French Revolutionary period, supporters of the monarchy sat on the right side of the National Assembly, while supporters of the revolution sat", subtitle:"An overview of leftist historical revisionism and a warning for liberals", url:"liberalism-not-leftism", date:"2025-09-19", mirrors:["substack:174062936","tumblr:795164683319574528","patreon:155199811"] },
{ title:"Normalization", preview:"The example I remember was about bans on smoking in restaurants: surveys indicated the public was generally against such bans while the matter was being", url:"normalization", date:"2025-09-08", mirrors:["substack:normalization-and-status-quo-bias"] },
{ title:"Lies about Ilhan Omar", preview:"After she was elected in 2019 as one of the first two Muslim Congresswoman (tied with Rashida Tlaib), there were quickly lies and smears shared about", url:"lies-about-ilhan-omar", date:"2025-08-25", mirrors:["substack:ilhan-omar","tumblr:794091916138594304","medium:46de1629e138"] },
{ title:"Israel & Palestine", preview:"Israel--Palestine can feel like the most divisive, polarizing issue ever. It's one where you can't just agree to disagree; you're either on my side or", url:"israel-palestine", date:"2025-07-27", flags:["wide"] },
{ title:"Trump & Russia", preview:"Americans used to be resolutely against Russia. They all identified and understood Russia to be an enemy of their interests, a bad actor on the world", url:"trump-and-russia", date:"2025-03-06", mirrors:["tumblr:777321996757450752","substack:trump-and-russia"] },
{ title:"Why get bottom surgery?", preview:"In the past, if you wanted legal recognition as a trans woman, you had to get a vaginoplasty. No dicks in the lady's room. That was the rule. In some", url:"why-get-bottom-surgery", date:"2025-02-09", mirrors:["tumblr:775036555284856832"] },
{ title:"Elon Musk & the Nazi Salute", preview:"Did Elon Musk do a Nazi salute, or did it just look like one? It's an insulting stupid question, but one that Mr. Musk himself is betting on people", url:"elon-musk-nazi-salute", date:"2025-01-24", mirrors:["substack:the-nazi-salute","tumblr:773565389405847552"] },
{ title:"Lies about Elizabeth Warren & Hillary Clinton", preview:"It's generally more work to refute a false claim than to perpetuate it. And by the time somebody's got around to figuring out why a claim is false, the", url:"lies-about-warren-clinton", date:"2024-12-19", mirrors:["tumblr:770730090759946240","substack:153821886"] },
{ title:"Mark Robinson", preview:"For posterity, I'd like to write about Mark Robinson. He was elected to be the lieutenant governor of North Carolina in 2021. That's sort of like being", url:"mark-robinson", date:"2024-12-15", mirrors:["tumblr:769962893917798400"] },
{ title:"The Trump appeal", preview:"What does anybody like about Donald Trump? It's a question many people ask theirselves, and no answer comes to mind. But it's something that for me has", url:"the-trump-appeal", date:"2024-12-03", mirrors:["tumblr:770270265635667968"] },
{ title:"The normal white man bias", preview:"Now that the U.S. election season is over and that country has once again walked down the orange brick road, let's talk about something I was putting", url:"the-normal-white-man-bias", date:"2024-11-26", mirrors:["substack:153823028","tumblr:770305075441778688","medium:0c508d4c51b5"] },
{ title:"Sex, gender, & transsexuals", preview: "This is an informational post intended to help people better navigate the sometimes-confusing dialogue surrounding sex, gender, and transsexuals. I made", url:"sex-gender-transsexuals", date:"2024-11-19", flags:["wide"] },
{ title:"Bernie Sanders & the military industrial complex", preview:"This tweet by Sanders was broadly celebrated by the American right wing, not only because he opens it with positivity about Elon Musk, but because conspiracy", url:"bernie-sanders-and-the-military-industrial-complex", date:"2024-12-16", mirrors:["tumblr:770070077409214464"] },
{ title:"Types of masculinity", preview:"For my purposes here, let's just summarize masculinity as strong, confident, assertive, dominant. That seems good enough. From there, you can recognize", url:"types-of-masculinity", date:"2024-11-08", mirrors:["tumblr:770310861444300800"] },
{ title:"Poor Things (2023 film)", url:"poor-things", date:"2024-10-31", mirrors:["tumblr:769969807464464384"] },
{ title:"The trans prison stats argument", preview:"An argument I've been seeing online for a while now is that trans people are statistically more likely than the general population to be sex offenders", url:"the-trans-prison-stats-argument", date:"2024-10-19", mirrors:["substack:the-trans-prison-stats-argument","tumblr:771501478599868416"] },
{ title:"Record of statements by select public figures", url:"public-record", flags:["hidden","wide"] },
{ title:"Anime reviews", preview:"I'm not that into anime, so it doesn't make a lot of sense for me to rate and review every anime series that I've ever seen, but I'm going to do it anyway", url:"anime-reviews", date:"2024-12-17" },
{ title:"Data Structures & Algorithms", url:"data-structures-algorithms", flags:["hidden","wide"] },
{ title:"Testing page", url:"testing", flags:["hidden"] }
];
const videoListData = [
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
];
function pageList() { return pageListData.filter(p => !p.flags || !p.flags.includes("hidden")) }
function pageListFull() { return pageListData }
function videoList() { return videoListData.filter(p => !p.flags || !p.flags.includes("hidden")).slice(0, 6) }
const font_defaults = { "--ff-heading-1":"'Inter',sans-serif", "--ff-heading-2":"'Inter',sans-serif", "--ff-heading-3":"'Inter',sans-serif", "--ff-main":"var(--ff-georgia-digits)", "--ff-aux-1":"'Segoe UI',system-ui", "--ff-aux-2":"'Roboto',system-ui", "--ff-nav":"'Trebuchet MS',system-ui" }
let page_links = [];
function init() {
    loadBody();
    if (navbar == null) { navbar = document.querySelector('.top-nav'); }
    pageListData.sort((a, b) => (parseInt(b.date?.replace(/\D/g, ""))||0) - (parseInt(a.date?.replace(/\D/g,""))||0))
    videoListData.sort((a, b) => (parseInt(b.date?.replace(/\D/g, ""))||0) - (parseInt(a.date?.replace(/\D/g,""))||0))
    pageListData.forEach(p => { if (p.title) { p.title = autoFormat(p.title); } })
    Array.from(document.getElementsByClassName("drop-select")).forEach( select => { select.value = (localStorage.getItem(select.id) || font_defaults[select.id] || ""); Array.from(select.children).forEach(option => option.style.fontFamily = option.value + ",system-ui" ); } )
    setCSS();
    setupLightswitch();
    loadEntryMeta();
    page_links = page_links.filter(a => a.startsWith("http"));
    if (page_links.length > 0) {
        document.querySelector('.article-footer')?.insertAdjacentHTML("beforeend", `
            <div style="padding-top: 10px; border-bottom: 1px solid var(--theme-grey-c,silver);">
                <div class="citelist-container">
                    <div class="space-between"><span>External resources referenced:</span></div>
                    <div class="citelist">
                        ${ page_links.map((x, n) => `<div class="no-select">${ n + 1 }.</div><div><a href="${ x }">${ x }</a></div>`).join("") }
                    </div>
                </div>
            </div>`);
        
        const citelist = document.querySelector(".citelist");
        if (citelist.offsetHeight > parseInt(window.getComputedStyle(citelist).maxHeight)) {
            citelist.previousElementSibling.insertAdjacentHTML('beforeend', `<span style="opacity:0.75; font-size:14px; cursor:pointer;" onclick="let citelist = document.querySelector('.citelist'); if (citelist) { let expanded = citelist.classList.contains('expanded'); this.innerHTML = expanded? 'expand':'collapse'; citelist.classList.toggle('expanded',!expanded); }">expand</span>`);
        }
    }
    navCheck();
    window.addEventListener("scroll", navCheck);
    Array.from(document.querySelectorAll(".age-from")).forEach(a => a.innerHTML = ageFromISO(a.innerHTML));
    Array.from(document.querySelectorAll(".current-year")).forEach(a => a.innerHTML = new Date().getFullYear());
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
            attempt_toc_update();
        }
    )
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
    window.addEventListener("click", function(e) {
        if (!gearMenu.contains(e.target) && !gearIcon.contains(e.target)) {
            gearMenuToggle("close");
        }
    })
    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            gearMenuToggle("close");
            setlightbox("close");
        }
        else if (e.key === "Home") {
            scrollToTop();
        }
    })
    document.querySelector(".page-index")?.insertAdjacentHTML("beforeend", pageList().map(
        page => {
            let entry = '<a title="'+page.title+'" href="page/' + page.url + '/index.html">' + page.title;
            //if (page.subtitle) { entry += ' | ' + page.subtitle; }
            entry += '</a>';
            if (page.date) { entry += ' <span class="date">' + page.date + '</span>'; }
            if (page.mirrors && page.mirrors.filter(m => m).length > 0) {
                entry += '<span class="mirrors label-external">' + page.mirrors.map(m => parseSource(m)).join('') + '</span>';
            }
            return '<div>' + entry + '</div>'
        }
    ).join(''))
    document.querySelector(".video-index")?.insertAdjacentHTML("beforeend",
        videoList().slice(0, 8).map(
            v => `<figure>
                    <a href="https://youtu.be/${ v.url }"><img loading="lazy" src="https://i.ytimg.com/vi/${ v.url }/hqdefault.jpg"></a>
                    <figcaption>
                        <div class="video-title"><a href="https://youtu.be/${ v.url }">${ v.title }</a></div>
                        ${ v.date ?'<div><span class="video-date">' + v.date + '</span></div>' :'' }
                    </figcaption>
                </figure>`
        ).join('')
    );
    if (document.title == "") {
        document.title = "Iris Embury | GitHub";
    }
    else if (!document.title.endsWith("Iris Embury")) {
        document.title += " | Iris Embury";
    }
    pageHeadings = Array.from(document.getElementsByClassName("for-toc"));
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
        
        rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
        
        window.addEventListener("scroll", attempt_toc_update);
        attempt_toc_update();
    }
}
window.addEventListener("load", init);
