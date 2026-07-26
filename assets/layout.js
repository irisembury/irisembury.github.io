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
    switch (site) {
        case 'tumblr': return '<a class="external-link tumblr-link" href="https://irisembury.tumblr.com/post/' + id + '" title="https://irisembury.tumblr.com/post/' + id + '"><span class="tumblr-logo inline-icon"></span><span class="link-text">Tumblr</span></a>';
        case 'youtube': return '<a class="external-link youtube-link" href="https://youtu.be/' + id + '" title="https://youtu.be/' + id + '"><span class="youtube-logo inline-icon"></span><span class="link-text">YouTube</span></a>';
        case 'substack': return '<a class="external-link substack-link" href="https://irisembury.substack.com/p/' + id + '" title="https://irisembury.substack.com/p/' + id + '"><span class="substack-logo inline-icon"></span><span class="link-text">Substack</span></a>';
        case 'patreon': return '<a class="external-link patreon-link" href="https://www.patreon.com/posts/' + id + '" title="https://www.patreon.com/posts/' + id + '"><span class="patreon-logo inline-icon"></span><span class="link-text">Patreon</span></a>';
        case 'medium': return '<a class="external-link medium-link" href="https://medium.com/@irisembury/' + id + '" title="https://medium.com/@irisembury/' + id + '"><span class="medium-logo inline-icon"></span><span class="link-text">Medium</span></a>';
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
            row = parseObj(row,"src","name","icon");
            row.name = row.name || row.src.split("/").slice(-1).join("");
            row.icon = row.icon ||'pdf';
            return `<figure>
                <a target="_blank" title="${ row.src.split("/").slice(-1).join("") }" href="${ row.src }" class="${ row.icon }"></a>
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
    ["float","oar","contain"].forEach(x => { if (meta.includes(x)) galleryClass += ' ' + x; })
    console.log(meta)
    let maxHeight = meta.replace(/[^\d]/g, "") || (meta.includes("float") ? 200 : 250);
    console.log(maxHeight)
    chunk = `<div class="${ galleryClass }">${ chunk.map( row => {
        row = parseObj(row,"src","caption","alt","title");
        if (row.src == "") { return ""; }
        row.title = row.title || row.alt || "Click to expand";
        row.alt = row.alt || row.caption;
        if (row.caption) { row.caption = '<figcaption>' + row.caption + '</figcaption>'; }
        return `<figure>
            <div><img style="max-height:${ maxHeight }px;" src="${ row.src }" alt="${ row.alt }" title="${ row.title }" loading="lazy" onclick="setlightbox(this)">
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
                tableRow = tableRow.split('\n').map(
                    c => {
                        c = c.trim();
                        if (c.startsWith('!')) {
                            c = '\n' + c;
                        }
                        return c;
                    }
                ).join('\n').split('\n\n').map(
                    c => {
                        if (!c.startsWith("!")) {
                            c = c.replace(/\n/g, '\n\n')
                        }
                        return c;
                    }
                ).join('\n\n');
                return `<tr class="row row-${ (row_index + 1) + ' row-' + (row_index % 2 ?'even' :'odd') }">${
                    tableRow.replaceAll('\\|', '&verbar;').split('|').map(
                        (cell, cell_index) => {
                            console.log(interpreter(cell))
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
                if (li.startsWith("#")) { li = '<blockquote class="auto-indent"><div class="text-block">' + li.slice(1).trimStart() + '</div></blockquote>\n' }
                if (li.startsWith(".")) { li = '<div class="fine">' + li.slice(1).trimStart() + '</div>\n' }
                else { li = '<div class="text-block">' + li + '</div>\n'; }
            } else { li = '<li class="text-block">' + li + '</li>' };
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
function dateFromISO(datestring) {
    let input = datestring.replace(/\D/g, "")
    if (input.length == 8) {
        const iso = input.substring(0,4) + "-" + input.substring(4,6) + "-" + input.substring(6,8);
        let [year,month,day] = iso.split("-").map(Number);
        if (month >= 1 && month <= 12) {
            month = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"June",7:"July",8:"Aug",9:"Sept",10:"Oct",11:"Nov",12:"Dec",}[month]
        }
        datestring = '<time title="ISO: '+ iso +'" datetime="'+ iso +'">'+ year + " " + month + " " + day +'</time>';
    }
    return datestring;
}
function autoHeading(chunk) {
    let number = chunk.indexOf(" ");
    let heading = chunk.slice(number + 1).trim();
    if (number > 4) {
        number = 4;
    }
    const tag = 'h' + number;
    const id = heading.replaceAll(" ", "_").replaceAll("---", '\u2014').replaceAll("--", "\u2013").replace(/[\*<>]/g, "");
    
    heading = autoFormat(heading);
    return `<${ tag } class="auto-heading${ number == 4 ? '' : ' for-toc' }" id="${ id }">${ heading }</${ tag }>`;
}
const siteIcons = { 'youtube.com': 'youtube-logo', 'youtu.be': 'youtube-logo', 'twitch.tv': 'twitch-logo', 'bsky.app': 'bluesky-logo', 'x.com': 'twitter-logo', 'twitter.com': 'twitter-logo', 'facebook.com': 'facebook-logo', 'substack.com': 'substack-logo', 'instagram.com': 'instagram-logo', 'reddit.com': 'reddit-logo', 'medium.com': 'medium-logo', 'wikipedia.org': 'wikipedia-logo' };
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
        
        if (external) {
            link_class.push("external-link");
            const iconName = siteIcons[Object.keys(siteIcons).find(site => linkUrl.includes(site))];
            if (iconName) {
                link_inner += '<span class="' + iconName + ' inline-icon"></span>';
            }
        }
        else if (linkUrl.endsWith(".png") || linkUrl.endsWith(".jpg") || linkUrl.endsWith(".jpeg")) {
            a_tag = `<a onclick="setlightbox('${ linkUrl }')"`;
            link_class.push("pseudo-link");
            link_title = 'View in gallery: ' + linkUrl.split("/").slice(-1).join("");
            let s_ = link_inner.lastIndexOf(" ") + 1;
            link_inner = link_inner.substring(0, s_) + '<span class="nowrap">' + link_inner.substring(s_) + '<span class="inline-icon lightbox-link"></span></span>';
        }
        if (blankDisplay) {
            link_class.push('super');
        }
        a_tag += ' title="' + link_title + '" class="' + link_class.join(' ') + '">' + link_inner + '</a>';
        if (blankDisplay) {
            a_tag = '<sup>' + a_tag + '</sup>';
        }
        return a_tag;
    })
    chunk = chunk.replace(/(?<=^|\s)(https?:\/\/\S+)(?=\s|$)/g, (match, linkUrl) => {
        let linkAfter = "";
        if (/[.,?!;]$/.test(linkUrl)) {
            linkAfter = linkUrl.at(-1);
            linkUrl = linkUrl.slice(0, -1);
        }
        let _linkUrl = linkUrl;
        if (_linkUrl.indexOf("#") != -1) {
            _linkUrl = _linkUrl.substring(0, _linkUrl.indexOf("#"))
        }
        if (page_links.indexOf(_linkUrl) == -1) {
            page_links.push(_linkUrl);
        }
        let linkInner = linkUrl;
        const iconName = siteIcons[Object.keys(siteIcons).find(site => linkUrl.includes(site))];
        let a_tag = '<a';
        if (iconName) {
            linkInner += '<span class="' + iconName + ' inline-icon"></span>';
        }
        return a_tag + ' href="' + linkUrl + '">' + linkInner + '</a>' + linkAfter;
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
        if (chunk == "---") { return "<hr>"; }
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
        let isFine = chunk.startsWith(".");
        if (isFine) { chunk = chunk.slice(1).trimStart(); }
        if (chunk.startsWith("-- ")) { return '<ul class="auto-list condensed">' + chunk.split("\n").map(l => '<li class="text-block">' + (l.replace(/^\-\- /,'').trim()) + '</li>').join('') + '</ul>' }
        if (chunk.startsWith("!list")) { chunk = autoList(chunk.substring(chunk.indexOf('\n') + 1)); }
        else if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) { chunk = autoList(chunk); }
        else { chunk = '<p>' + autoFormat(chunk) + '</p>'; }
        if (isFine) { chunk = '<div class="fine">' + chunk + '</div>'; }
        return chunk;
    })
    return input.join('');
}
/*
    3837
    3837 % 60 = 57 seconds
    if 3837 < 60, return (3837 % 60)
    minutes = (3837 - 57) / 60
*/
function convertSeconds(secNum) {
    secNum = parseInt(secNum);
    if (!isNaN(secNum)) {
        let seconds = secNum % 60;
        if (secNum < 60) {
            return seconds;
        }
        if (seconds.length == 1) {
            seconds = '0' + seconds;
        }
        let minutes = ((secNum - seconds) % 3600) / 60;
        if (secNum < 3600) {
            return minutes + ':' + seconds;
        }
        let hours = (secNum - minutes - seconds) / 3600;
        if (minutes.length == 1) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes + ':' + seconds;
    }
    return secNum;
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
        output += afAux(_string.slice(0, openTag + 1)) + _string.slice(openTag + 1, closeTag);
        _string = _string.substring(closeTag);
    }
    output = (output + afAux(_string))
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.+?)\*/g, '<i>$1</i>');
    output = output.replace(/\{([^:}]+):([^}]+)\}/g, '<span class="$1">$2</span>')
        .replace(/\{([^}]+)\}/g, '<span class="$1"></span>')
    return output;
}
function afAux(str_in) { //curly quotes, dashes
    if (str_in.indexOf("'") != -1 || str_in.indexOf('"') != -1) {
        str_in = str_in.replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1").replaceAll(/(>|^| |\()'/g, "$1&lsquo;").replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2").replaceAll(/'/g, "&rsquo;").replaceAll(/(>|^| |\()"/g, "$1&ldquo;").replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2").replaceAll(/"/g, "&rdquo;")
    }
    return str_in.replaceAll("---", '&mdash;').replaceAll("--", "&ndash;");
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
function loadBody() {
    HTML.lang = "en";
    document.body.innerHTML = `
        <nav class="navbar">
            <div class="nav-inner">
                <div>${ index ?'' :'<a class="index-button no-select" href="/"><div><svg height="11" width="11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path fill="currentColor" d="M24.57,34.075c-0.505,0-1.011-0.191-1.396-0.577L8.11,18.432c-0.771-0.771-0.771-2.019,0-2.79 L23.174,0.578c0.771-0.771,2.02-0.771,2.791,0s0.771,2.02,0,2.79l-13.67,13.669l13.67,13.669c0.771,0.771,0.771,2.021,0,2.792 C25.58,33.883,25.075,34.075,24.57,34.075z"/></svg><span>Index</span></div></a>' }</div>
                <div><div class="page-name-segment"><span class="page-name pseudo-link" onclick="scrollToTop()"></span></div></div>
                <div><div class="menu-button"><svg viewBox="0 0 24 24" width="28" height="24"><path fill="currentcolor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div></div>
            </div>
        </nav>
        <div class="panel-aligner">
            <div class="right-panel">
                <h3>Display:</h3>
                <div class="switches-area">
                    <label for="lightswitch">Dark mode:</label><input type="checkbox" class="slide-checkbox" id="lightswitch">
                </div>
                <hr>
                <h3>Text formatting:</h3>
                <div class="switches-area">
                    <label for="indent-text">Indent paragraphs:</label><input type="checkbox" class="slide-checkbox formatting auto" id="indent-text">
                    <label for="justify-text">Justify text:</label><input type="checkbox" class="slide-checkbox formatting auto" id="justify-text">
                    <label for="reduce-margins">Reduce vertical margins:</label><input type="checkbox" class="slide-checkbox auto" id="reduce-margins">
                </div>
            </div>
            <div class="screen"></div>
            <div class="toc-toggle-button" onclick="tocToggle()" title="Table of Contents">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" width="20" height="20" viewBox="0 0 20 20"><path d="M3 16H1v-2h2zm16 0H5v-2h14zM3 11H1V9h2zm16 0H5V9h14zM3 6H1V4h2zm16 0H5V4h14z"/></svg>
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
        </div>`;
    navbar = document.querySelector(".navbar");
    toc = document.querySelector(".toc");
    interpreter(document.querySelector(".article"));
    HTML.classList.add("js");
}
let canTocUpdate = true, tocLastHeading = 0, rowsInToc = [], pageHeadings = [];
function tocUpdate() {
    if (!canTocUpdate) { return; }
    if (HTML.classList.contains("hide-toc")) { return; }
    canTocUpdate = false;
    setTimeout(() => {
        canTocUpdate = true;
        tocUpdate_();
    }, 500);
    tocUpdate_();
}
function tocUpdate_() {
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
let navbar = null, canNavCheck = true, navSticky = false;
function navCheck() {
    if (!canNavCheck) {
        return;
    }
    canNavCheck = false;
    navCheck_();
    setTimeout(() => {
        canNavCheck = true;
        navCheck_();
    }, 250);
}
function navCheck_() {
    if (!navSticky && pageYOffset > 1) {
        navbar.classList.add("sticky-active");
        navSticky = true;
    }
    else if (navSticky && pageYOffset < 2) {
        navbar.classList.remove("sticky-active");
        navSticky = false;
    }
}
function loadEntryMeta() {
    const page = allEntries().find(e => e.url==getDirectory());
    if (!index && page) {
        if (page.flags && page.flags.includes("wide")) {
            HTML.classList.add("wide");
        }
        if (page.mirrors) {
            document.querySelector('.article-footer')?.insertAdjacentHTML("beforeend", `<section class="mirror-container column gap-10 label-external"><div>This article was also posted in other places:</div><div class="align-center gap-5">${ page.mirrors.split(",").map(m => '<span class="rect-link">' + parseSource(m) + '</span>').join('') }</div></section>`);
        }
        if (page.title) {
            document.querySelector('.page-name')?.insertAdjacentHTML('beforeend', page.title);
        }
        document.querySelector(".article")?.insertAdjacentHTML('afterbegin', autoFormat('<div class="article-top">' + (page.title ?`<h1 class="article-title auto-heading for-toc">${ page.title }</h1>` :'') + (page.subtitle ?`<h2 class="article-subtitle">${ page.subtitle }</h2>` :'') + (page.date ?`<div class="article-byline">${ page.date} </div>` :'' )));
        document.querySelector('.article-footer')?.insertAdjacentHTML("beforeend", `
        <div>
            <p class="italic times">This is a personal site. I have no association with any other person or organization. I'm not an expert nor any sort of credentialed authority on any relevant topic.</p>
        </div>`);
    }
}
function loadCitelist() {
    if (index) { return; }
    let ext_links = page_links.filter(a => a.startsWith("http"));
    if (ext_links.length > 0) {
        document.querySelector('.article-footer')?.insertAdjacentHTML("beforeend", `
            <div style="padding-top: 10px; border-bottom: 1px solid var(--grey-c,silver);">
                <div class="citelist-container">
                    <div class="space-between"><span>External resources referenced:</span></div>
                    <div class="citelist">
                        ${ ext_links.map((x, n) => `<div class="no-select">${ n + 1 }.</div><div><a href="${ x }">${ x }</a></div>`).join("") }
                    </div>
                </div>
            </div>`);
        const citelist = document.querySelector(".citelist");
        if (citelist.offsetHeight > parseInt(window.getComputedStyle(citelist).maxHeight)) {
            citelist.previousElementSibling.insertAdjacentHTML('beforeend', `<span style="opacity:0.75; font-size:14px; cursor:pointer;" onclick="let citelist = document.querySelector('.citelist'); if (citelist) { let expanded = citelist.classList.contains('expanded'); this.innerHTML = expanded? 'expand':'collapse'; citelist.classList.toggle('expanded',!expanded); }">expand</span>`);
        }
    }
}
function rightMenuSetup() {
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
            tocUpdate();
        }
    )
    const rightMenu = document.querySelector(".right-panel");
    function rightMenuToggle(option) {
        if (option == "open") {
            rightMenu.classList.add("open");
        }
        else if (option == "close") {
            rightMenu.classList.remove("open");
        }
        else {
            rightMenuToggle(!rightMenu.classList.contains("open") ? "open" : "close");
        }
    }
    const menuBtn = document.querySelector(".menu-button");
    const tocToggleBtn = document.querySelector(".toc-toggle-button");
    if (menuBtn && tocToggleBtn) {
        menuBtn.addEventListener("click", rightMenuToggle);
        window.addEventListener("click", function(e) {
            if (!rightMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                rightMenuToggle("close");
            }
            if (!toc.contains(e.target) && !tocToggleBtn.contains(e.target)) {
                tocHide();
            }
        })
    }
    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            rightMenuToggle("close");
            setlightbox("close");
            tocHide();
        }
        else if (e.key === "Home") {
            scrollToTop();
        }
    })
}
let toc = null;
function tocToggle() {
    toc.classList.toggle("attach", !toc.classList.contains("attach"));
}
function tocHide() {
    toc.classList.remove("attach");
}
function tocSetup() {
    pageHeadings = Array.from(document.getElementsByClassName("for-toc"));
    pageHeadings.forEach(h => {
        h.classList.remove("for-toc");
        if (h.classList.length == 0) {
            h.removeAttribute('class');
        }
    });
    if (pageHeadings.length < 2) {
        document.querySelector(".toc")?.remove();
        document.querySelector(".toc-toggle-button")?.remove();
        document.querySelector(".right-spacer")?.remove();
    }
    else {
        toc.innerHTML = '<div class="toc-title">This page contents</div><div class="toc-row"><a class="pseudo-link" onclick="scrollToTop()">(Top)</a></div>' + pageHeadings.slice(1).map( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join('');
        toc.scrollTo({ behavior: "instant", top: 0 })
        
        rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
        
        window.addEventListener("scroll", tocUpdate);
        tocUpdate();
    }
}
const HTML = document.documentElement;
const rootPath = getRootPath();
const index = (rootPath == "");
const entries = `title:The Chilean coup |url:allende-and-pinochet |date:2026-07-02 |flags:hidden |type:article
title:How bad is America? |url:how-bad-is-america |date:2026-07-01 |type:article
title:What was the Freedom Convoy? |url:freedom-convoy |date:2026-06-15 |flags:wide |type:article
title:Pierre Poilievre |url:pierre-poilievre |date: |flags:hidden |type:article
title:The Conservative Party's hard problem |url:conservative-party-hard-problem |date:2026-05-01 |mirrors:substack:196152041,tumblr:815438258908643328,medium:e59c21f8095a |type:article
title:Canada's plan for a sovereign wealth fund |url:canada-sovereign-wealth-fund |date:2026-04-29 |mirrors:substack:195885575,tumblr:815245873447649280 |type:article
title:Floor crossings |url:floor-crossings |date:2026-04-17 |mirrors:substack:floor-crossings,medium:dfe93bb23bdd |type:article
title:Rational ignorance |url:rational-ignorance |date:2026-04-09 |mirrors:substack:rational-ignorance,tumblr:813419185909727232,patreon:155199122 |type:article
title:Liberal conservatism |subtitle:A philosophy of prudence and humility |url:liberal-conservatism |date:2026-03-24 |mirrors:substack:foundations-of-liberal-conservatism |flags:wide |type:article
title:The case for abortion |url:abortion |date:2026-02-18 |mirrors:substack:the-case-for-abortion,tumblr:809547051047272448,patreon:155199340 |type:article
title:A synopsis of American decline |url:a-synopsis-of-american-decline |date:2026-01-28 |mirrors:substack:186165875,patreon:155201485 |type:article
title:Fetishism & politics |url:fetishism-politics |date:2024-11-14 |mirrors:tumblr:770364766791352320 |type:article
title:Nick Shirley & the Somali day cares |url:somali-day-cares |date:2026-01-02 |mirrors:substack:183243480,patreon:155200604}, |type:article
title:Why is Reddit so hated? |subtitle:On the website's history, what makes it unique, and the intense hatred many people seem to have for it |url:why-is-reddit-so-hated |date:2025-12-30 |mirrors:substack:why-is-reddit-so-hated |type:article
title:Stay the trenches |url:stay-the-trenches |date:2025-12-17 |mirrors:substack:stay-the-trenches |type:article
title:Immigration |url:immigration |date:2025-11-06 |mirrors:substack:183229652 |type:article
title:Prejudice |url:what-is-prejudice |date:2025-10-30 |mirrors:substack:prejudice |type:article
title:Notes on India |url:notes-on-india |date:2025-10-24 |mirrors:substack:india,tumblr:798351257128615936 |type:article
title:Liberalism not leftism |url:liberalism-not-leftism |date:2025-09-19 |mirrors:substack:174062936,tumblr:795164683319574528,patreon:155199811 |type:article
title:Normalization |url:normalization |date:2025-09-08 |mirrors:substack:normalization-and-status-quo-bias |type:article
title:Lies about Ilhan Omar |url:lies-about-ilhan-omar |date:2025-08-25 |mirrors:substack:ilhan-omar,tumblr:794091916138594304,medium:46de1629e138 |type:article
title:Israel & Palestine |url:israel-palestine |date:2025-07-27 |type:article
title:Trump & Russia |url:trump-and-russia |date:2025-03-06 |mirrors:tumblr:777321996757450752,substack:trump-and-russia |type:article
title:Why get bottom surgery? |url:why-get-bottom-surgery |date:2025-02-09 |mirrors:tumblr:775036555284856832 |type:article
title:Elon Musk & the Nazi Salute |url:elon-musk-nazi-salute |date:2025-01-24 |mirrors:substack:the-nazi-salute,tumblr:773565389405847552 |type:article
title:Lies about Elizabeth Warren & Hillary Clinton |url:lies-about-warren-clinton |date:2024-12-19 |mirrors:tumblr:770730090759946240,substack:153821886 |type:article
title:Mark Robinson |url:mark-robinson |date:2024-12-15 |mirrors:tumblr:769962893917798400 |type:article
title:The Trump appeal |url:the-trump-appeal |date:2024-12-03 |mirrors:tumblr:770270265635667968 |type:article
title:The normal white man bias |url:the-normal-white-man-bias |date:2024-11-26 |mirrors:substack:153823028,tumblr:770305075441778688,medium:0c508d4c51b5 |type:article
title:Sex, gender, & transsexuals |url:sex-gender-transsexuals |date:2024-11-19 |flags:wide |type:article
title:Bernie Sanders & the military industrial complex |url:bernie-sanders-and-the-military-industrial-complex |date:2024-12-16 |mirrors:tumblr:770070077409214464 |type:article
title:Types of masculinity |url:types-of-masculinity |date:2024-11-08 |mirrors:tumblr:770310861444300800 |type:article
title:Poor Things (2023 film) |url:poor-things |date:2024-10-31 |mirrors:tumblr:769969807464464384 |type:article
title:The trans prison stats argument |url:the-trans-prison-stats-argument |date:2024-10-19 |mirrors:substack:the-trans-prison-stats-argument,tumblr:771501478599868416 |type:article
title:Public record |url:public-record |flags:hidden,wide |type:article
title:Anime reviews |url:anime-reviews |date:2024-12-17 |type:article
title:Data Structures & Algorithms |url:data-structures-algorithms |flags:hidden,wide |type:article
title:The Freedom Convoy |date:2026-07-19 |src:youtube:207IiRGFowE,patreon:164228303 |thumb:207IiRGFowE.jpg |length:2:41:18 |type:video
title:Floor crossers |date:2026-05-17 |src:youtube:N3csai2IFDU,patreon:158476239 |thumb:158476239.jpg |length:56:34 |type:video
title:Liberalism not Leftism |date:2026-05-06 |src:youtube:DgGf_g4aGYA,patreon:157517952 |thumb:157517952.jpg |length:41:15 |type:video
title:Liberal Conservatism |date:2026-04-07 |src:youtube:Sy33HSFsuu8,patreon:154996870 |thumb:Sy33HSFsuu8.jpg |length:2:03:13 |type:video
title:Abortion |date:2026-02-24 |src:youtube:CpjJ8TgOxJY,patreon:151884875 |thumb:CpjJ8TgOxJY.jpg |length:43:04 |type:video
title:How bad is America? |date:2026-03-04 |src:youtube:W0Dmtyyc7FU,patreon:152288758 |thumb:W0Dmtyyc7FU.jpg |length:27:04 |type:video
title:American decline |date:2026-02-11 |src:youtube:oUOsAdnK2zs,patreon:150555019 |thumb:oUOsAdnK2zs.jpg |length:39:47 |type:video
title:Normalization |src:youtube:TYoe1jxBYPY,patreon:148679519 |date:2025-09-19 |thumb:TYoe1jxBYPY.jpg |length:12:08 |type:video
title:India |thumb:Pz0Oq1rb14E.jpg |src:youtube:Pz0Oq1rb14E,patreon:148682097 |date:2025-10-23 |length:41:17 |type:video
title:Lies about Ilhan Omar |date:2025-09-03 |src:youtube:zgE4L-e9yg0,patreon:148679387 |thumb:148679387.jpg |length:44:50 |type:video
title:Trans fetishism |date:2025-04-02 |src:youtube:vk57rvM1zWo |thumb:vk57rvM1zWo.jpg |length:22:39 |type:video
title:Why do people like Trump? |date:2025-09-13 |src:youtube:tcF0f-Dtgic |thumb:WhyTrump.jpg |length:11:33 |type:video
title:Lies about Warren and Clinton |date:2025-04-09 |src:youtube:LPQD6sxlWOs,patreon:148676394 |thumb:LPQD6sxlWOs.jpg |length:34:02 |type:video
title:Military Industrial Complex |date:2025-03-22 |length:12:44 |src:youtube:yt6O0OMdIT0 |thumb:yt6O0OMdIT0.jpg |type:video
title:Sex, gender, & transsexuals |date:2025-10-17 |src:youtube:Hgh3r7gJoWU,patreon:148676474 |thumb:Hgh3r7gJoWU.jpg |length:1:26:14 |type:video`;
function allEntries() { return entries.split("\n").map(e => parseObj(e,'title','date','thumb','length','src','mirrors','type','url','flags')).filter(e=>e).sort((a,b) => (parseInt(b.date?.replace(/\D/g, "")) || 0) - (parseInt(a.date?.replace(/\D/g,""))||0)); }
function pageList() { return allEntries().filter(p => p.type=='article' && (!p.flags||!p.flags.includes('hidden'))) }
function videoList() { return allEntries().filter(e => e.type=='video') }

const page_links = [];
function init() {
    loadBody();
    setupLightswitch();
    loadEntryMeta();
    rightMenuSetup();
    tocSetup();
    window.addEventListener("scroll", navCheck); navCheck();
    Array.from(document.querySelectorAll(".seconds")).forEach(a => a.innerHTML = convertSeconds(a.innerHTML));
    Array.from(document.querySelectorAll(".age-from")).forEach(a => a.innerHTML = ageFromISO(a.innerHTML));
    Array.from(document.querySelectorAll(".current-year")).forEach(a => a.innerHTML = new Date().getFullYear());
    if (document.title == "") { document.title = "Iris Embury | GitHub"; }
    else if (!document.title.endsWith("Iris Embury")) { document.title += " | Iris Embury"; }
    if (index) {
        document.querySelector(".video-index")?.insertAdjacentHTML("beforeend", videoList().map( v => {
            v.src = v.src.split(",").map(m => parseSource(m)).join(" | ");
            return `<figure>
                <div><img style="max-width:300px;max-height:200px;" loading="lazy" src="assets/video-thumbnails/${ v.thumb }"><div class="timecard no-select"><div>${ v.length }</div></div></div>
                <figcaption>
                    <div class="video-title">${ v.title }</div>
                    <div>${ v.src }</div>
                    <div><span class="video-date">${ dateFromISO(v.date) }</span></div>
                </figcaption>
            </figure>`
        }).join(''));
        document.querySelector(".text-index")?.insertAdjacentHTML("beforeend", pageList().map(
            entry => `<div class="entry"><div class="cell a"><a title="${ entry.title }" href="page/${ entry.url }">${ autoFormat(entry.title) }</a></div><div class="cell b">${ entry.date }</div><div class="cell c">${ entry.mirrors ?`<div class="entry-mirrors">${ entry.mirrors.split(",").map(m => parseSource(m)).sort().join(" ")}</div>` :'' }</div></div>`
        ).join(''))
    }
    setTimeout(() => { HTML.style.removeProperty("opacity"); HTML.classList.add("animate"); }, 250);
}
window.addEventListener("load", init);

