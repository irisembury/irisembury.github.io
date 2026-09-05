"use strict"

const HTML = document.documentElement;
let page_links = [];
let toc = null;
let canTocUpdate = true;
let tocLastHeading = 0;
let rowsInToc = [];
let pageHeadings = [];
let navbar = null;
let canNavCheck = true;
let navSticky = false;
let loadToc = false;
let loadCitelist = false;
const siteIcons = { 'youtube.com': 'youtube-logo', 'youtu.be': 'youtube-logo', 'twitch.tv': 'twitch-logo', 'bsky.app': 'bluesky-logo', 'x.com': 'twitter-logo', 'twitter.com': 'twitter-logo', 'facebook.com': 'facebook-logo', 'substack.com': 'substack-logo', 'instagram.com': 'instagram-logo', 'reddit.com': 'reddit-logo', 'medium.com': 'medium-logo', 'wikipedia.org': 'wikipedia-logo' };
const KEYWORDS = { cpp: "alignas alignof and and_eq asm auto bitand bitor bool break case catch char char16_t char32_t char8_t class co_await co_return co_yield compl concept const const_cast consteval constexpr constinit continue decltype default delete do double dynamic_cast else enum explicit export extern false final float for friend goto if inline int import long module mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq", cs: "abstract add alias allows and args as ascending async await base bool break by byte case catch char checked class const continue decimal default delegate descending do double dynamic else enum equals event explicit extension extern false field file finally fixed float for foreach from get global goto group if implicit in init int interface internal into is join let lock long managed nameof namespace new nint not notnull nuint null object on operator or orderby out override params partial partial private protected public readonly record ref remove required return sbyte scoped sealed select set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unmanaged unmanaged unsafe ushort using value var virtual void volatile when where where while with yield", java: "String abstract continue for new switch assert default goto package synchronized boolean do if private this break double implements protected throw byte else import public throws case enum instanceof return transient catch extends int short try char final interface static void class finally long strictfp volatile const float native super while", js: "await break case catch class const constructor continue debugger default delete do else enum export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof var void while with yield implements interface package private protected public static setInterval" }

function scrollToTop() {
    window.scrollTo({ top: 0 });
    history.replaceState(null, "", window.location.pathname);
    document.getElementById("toc")?.scrollTo({ behavior: "smooth", top: 0 })
}
function setLightbox(action) {
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
    let [site, id] = string_in.trim().split(separator, 2);
    switch (site) {
        case 'tumblr': return '<a class="external-link tumblr-link" href="https://irisembury.tumblr.com/post/' + id + '" title="https://irisembury.tumblr.com/post/' + id + '"><span class="nowrap"><span class="tumblr-logo inline-icon"></span><span class="link-text">Tumblr</span></span></a>';
        case 'youtube': return '<a class="external-link youtube-link" href="https://youtu.be/' + id + '" title="https://youtu.be/' + id + '"><span class="nowrap"><span class="youtube-logo inline-icon"></span><span class="link-text">YouTube</span></span></a>';
        case 'substack': return '<a class="external-link substack-link" href="https://irisembury.substack.com/p/' + id + '" title="https://irisembury.substack.com/p/' + id + '"><span class="nowrap"><span class="substack-logo inline-icon"></span><span class="link-text">Substack</span></span></a>';
        case 'patreon': return '<a class="external-link patreon-link" href="https://www.patreon.com/posts/' + id + '" title="https://www.patreon.com/posts/' + id + '"><span class="nowrap"><span class="patreon-logo inline-icon"></span><span class="link-text">Patreon</span></span></a>';
        case 'medium': return '<a class="external-link medium-link" href="https://medium.com/@irisembury/' + id + '" title="https://medium.com/@irisembury/' + id + '"><span class="nowrap"><span class="medium-logo inline-icon"></span><span class="link-text">Medium</span></span></a>';
    }
    return "";
}
function parseObj(entry, ...requiredFields) {
    entry = entry.trim().replaceAll('---','\u2014').replaceAll('--','\u2013').replaceAll("\"", "&quot;");
    const obj = { };
    entry.split("|").forEach(cell => {
        const colon = cell.indexOf(":");
        if (colon != -1) {
            const key = cell.substring(0, colon).trim();
            const value = cell.substring(colon + 1).trim();
            obj[key] = value;
        } else {
            console.error(`parseObj: "${ entry }"`);
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
    let maxHeight = meta.replace(/[^\d]/g, "") || (meta.includes("float") ? 200 : 250);
    chunk = `<div class="${ galleryClass }">${ chunk.map( row => {
        row = parseObj(row,"src","caption","alt","title");
        if (row.src == "") { return ""; }
        row.title = row.title || row.alt || "Click to expand";
        row.alt = row.alt || row.caption;
        if (row.caption) { row.caption = '<figcaption>' + row.caption + '</figcaption>'; }
        return `<figure>
            <div><img style="max-height:${ maxHeight }px;" src="${ row.src }" alt="${ row.alt }" title="${ row.title }" loading="lazy" onclick="setLightbox(this)">
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
function autoTable(chunk, table_number) {
    let table = `<div class="table-wrapper"><table class="auto-table auto-table-${ table_number }"><tbody>${
        chunk.split(/\n(?! )/g).slice(1).map(
            (tableRow, rowIndex) => {
                tableRow = tableRow.replaceAll('\\|','&verbar;').split('|');
                tableRow = tableRow.map(
                    (tableCell, cellIndex) => {
                        tableCell = tableCell.split('\n');
                        let i = 0, j;
                        for (; i < tableCell.length; i += 1) {
                            if (tableCell[i].search(/[^ ]/) >= 8) {
                                j = i + 1;
                                for (; j < tableCell.length; j += 1) {
                                    if (tableCell[j].search(/[^ ]/) < 8) {
                                        break;
                                    }
                                }
                                tableCell[i] = autoIndent(tableCell.slice(i, j).join('\n'));
                                for (let k = i + 1; k < j; k += 1) {
                                    tableCell[k] = "";
                                }
                            }
                            else {
                                tableCell[i] = tableCell[i].trim();
                                if (tableCell[i]) {
                                    if (tableCell[i].startsWith(".")) {
                                        tableCell[i] = `<div class="fine"><p>${ tableCell[i].substring(1).trimStart() }</p></div>`;
                                    }
                                    /* if it starts with a non-link < tag, don't paragraph it: */
                                    else if (tableCell[i].startsWith("<") && !tableCell[i].startsWith("<a")) {
                                        tableCell[i] = tableCell[i];
                                    }
                                    else {
                                        tableCell[i]= `<p>${ tableCell[i] }</p>`;
                                    }
                                }
                            }
                            tableCell[i] = autoFormat(tableCell[i]);
                        }
                        return `<td class="cell col-${ cellIndex + 1 } col-${ cellIndex % 2 ? 'even' : 'odd' }">${ tableCell.join('') }</td>`;
                    }
                )
                return `<tr class="row row-${ rowIndex + 1 } row-${ rowIndex % 2 ? 'even' : 'odd' }">${ tableRow.join('') }</tr>`;
        }).join('')
    }</tbody></table></div>`;
    let first_row = chunk.substring(0, chunk.indexOf('\n'));
    if (first_row.indexOf(' ') != -1) {
        first_row = first_row.substring(first_row.indexOf(' ')).trim();
    }
    if (first_row.replace(/\s/g, '').length > 0) {
        table += `<style>${ first_row.replace(/this/g, ".auto-table-" + table_number).replaceAll(";", "!important;") }</style>`
    }
    return table;
}
function autoList(chunk) {
    const closeTags = [];
    let prevIndent = -1;
    const list = chunk.split("\n").map(
        li => {
            const initpad = li.match(/^ */)[0].length;
            li = li.substring(initpad);
            const indent = Math.floor(initpad * 0.25);
            const liType = /^[\*\-] /.test(li) ?"ul" :(/^\d+\. /.test(li) ? "ol" : "none");
            const listType = (liType =="ol") ?"ol" :"ul";
            let startNum = (liType =="ol") ?li.substring(0, li.indexOf(".")) :1;
            li = (liType) == "none" ? li.trimStart() :li.substring(li.indexOf(" ")).trimStart();
            li = autoFormat(li);
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
            return li;
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
function dateFromISO(datestring) {
    /* this converts ISO 8601 date format (YYYYMMDD) into YYYY Month D */
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
function frontmatter(pageInfo) {
    /* "frontmatter" is just a standard name I didn't come up with it */
    if (pageInfo.startsWith("---")) { pageInfo = pageInfo.substring(3); }
    if (pageInfo.endsWith("---")) { pageInfo = pageInfo.slice(0,-3); }
    pageInfo = parseObj(pageInfo.split("\n").map(n => n.trim()).filter(n => n.length > 3).join("|"));
    const articleTop = [];
    if (pageInfo.flags) {
        if (pageInfo.flags.includes("toc")) {
            loadToc = true;
        }
        if (pageInfo.flags.includes("wide")) {
            HTML.classList.add("wide");
        }
        if (pageInfo.flags.includes("unset-width")) {
            document.getElementById("lightswitch")?.parentNode.insertAdjacentHTML("beforeend", '<label for="unset-width">Unlimited page width:</label><input type="checkbox" class="slide-checkbox" id="unset-width">');
            if (localStorage.getItem("unset-width-" + window.location.pathname) == 'true') {
                document.getElementById("unset-width").checked = true;
                HTML.classList.add("unset-width");
            }
            document.getElementById("unset-width")?.addEventListener("change", function() {
                HTML.classList.toggle(this.id, this.checked);
                localStorage.setItem("unset-width-" + window.location.pathname, this.checked)
                tocUpdate();
            });
        }
    }
    if (pageInfo.title) {
        articleTop.push(`<h1 class="auto-heading for-toc">${ pageInfo.title }</h1>`);
        document.querySelector('.page-name')?.insertAdjacentHTML('beforeend', pageInfo.title);
        document.title = pageInfo.title;
    }
    if (pageInfo.subtitle) {
        articleTop.push(`<h2 class="auto-heading">${ pageInfo.subtitle }</h2>`);
    }
    if (pageInfo.date) {
        articleTop.push(`<div class="article-byline">${ pageInfo.date }</div>`);
    }
    if (pageInfo.mirrors) {
        articleTop.push(`<div class="mirror-container label-external">This was posted in other places: <div>${ pageInfo.mirrors.split(",").map(m => parseSource(m)).join(" ") }</div></div>`);
    }
    if (articleTop.length == 0) { return ""; }
    return '<div class="article-top">' + articleTop.map(x => autoFormat(x)).join("\n") + '</div>';
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
function linkReplace(chunk) {
    chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkUrl) => {
        linkUrl = linkUrl.replaceAll('&#41;', ')');
        displayText = displayText.trim();
        const external = linkUrl.startsWith("http");
        const blankDisplay = displayText == "";
        
        let linkIndex = '[link]';
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
                link_inner += '<span class="nowrap"><span class="' + iconName + ' inline-icon"></span></span>';
            }
        }
        else if (linkUrl.endsWith(".png") || linkUrl.endsWith(".jpg") || linkUrl.endsWith(".jpeg")) {
            a_tag = `<a onclick="setLightbox('${ linkUrl }')"`;
            link_class.push("pseudo-link");
            link_title = 'View in gallery: ' + linkUrl.split("/").slice(-1).join("");
            let s_ = link_inner.lastIndexOf(" ") + 1;
            link_inner = link_inner.substring(0, s_) + link_inner.substring(s_) + '<span class="nowrap"><span class="inline-icon lightbox-link"></span></span>';
        }
        if (blankDisplay) {
            link_class.push('super');
        }
        a_tag += ' title="' + link_title + '" class="' + link_class.join(' ') + '">' + link_inner + '</a>';
        if (blankDisplay) {
            a_tag = '<sup>' + a_tag + '</sup>';
        }
        return a_tag;
    });
    chunk = chunk.replace(/(?<=^|\s)(https?:\/\/[^\s<$]+)/g, (match, linkUrl) => {
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
            linkInner += '<span class="nowrap"><span class="' + iconName + ' inline-icon"></span></span>';
        }
        a_tag += ' href="' + linkUrl + '">' + linkInner + '</a>' + linkAfter;
        console.log(a_tag)
        return a_tag;
    });
    return chunk;
}
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
        return;
    }
    let paragraph_num = 1;
    let table_number = 1;
    let input = argValue.replace(/\n\n+/g, "\n\n").replace(/\r/g, "").replace(/\t/g, "    ").replace("\\\\", "&#92;").replaceAll("\\*", "&#42;").replaceAll('\\"', "&#34;").replaceAll("\\'", "&#39;").replaceAll("\\|", "&#124;").replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;").replaceAll("\\[", "&#91;").replaceAll("\\]", "&#93;").replaceAll("\\^", "&#94;").replaceAll("\\.","&#46;").replaceAll("...", "\u2026").replaceAll("\\`", "&#96;").replaceAll("\\:", "&#58;").trim().split("\n\n");
    input = input.map( chunk => {
        if (chunk.startsWith("//")) { return ""; }
        if (chunk.startsWith("---\n") && chunk.endsWith("\n---")) { return frontmatter(chunk); }
        if (chunk.startsWith("<") && !chunk.startsWith("<a")) { return chunk; }
        if (chunk == "---") { return "<hr>"; }
        if (/^#{1,6} /.test(chunk)) { return autoHeading(chunk); }
        if (chunk.startsWith("!images")) { return imageGallery(chunk); }
        if (chunk.startsWith("!files")) { return fileBox(chunk); }
        if (chunk.startsWith("!video")) { return autoVideo(chunk); }
        if (chunk.startsWith("!codeblock")) { return codeblock(chunk) ; }
        chunk = chunk.replace(/`(.+?)`/g, codeReplace);
        if (chunk.startsWith("!table")) { return autoTable(chunk, table_number); }
        if (chunk.startsWith("!indent") || chunk.startsWith("    ")) { return autoIndent(chunk); }
        let isFine = chunk.startsWith(".");
        if (isFine) { chunk = chunk.slice(1).trimStart(); }
        if (chunk.startsWith("!list")) { chunk = autoList(chunk.substring(chunk.indexOf('\n') + 1)); }
        if (chunk.startsWith("-- ")) { return '<ul class="auto-list condensed">' + chunk.split("\n").map(l => '<li class="text-block">' + autoFormat(l.replace(/^\-\- /,'').trim()) + '</li>').join('') + '</ul>' }
        else if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) {
            chunk = autoList(chunk);
        }
        else {
            if (paragraph_num++ == 1) {
                chunk = `<p class="first-paragraph">${ autoFormat(chunk) }</p>`;
            }
            else {
                chunk = `<p>${ autoFormat(chunk) }</p>`;
            }
        }
        if (isFine) { chunk = '<div class="fine">' + chunk + '</div>'; }
        return chunk;
    })
    return input.join('');
}
function unwrapSeconds(vSQuery) {
    vSQuery = parseInt(vSQuery);
    if (!isNaN(vSQuery)) {
        let seconds = vSQuery % 60;//remainder
        if ((seconds + "").length == 1) {
            seconds = '0' + seconds;//e.g. 8 -> 08
        }
        if (vSQuery < 60) {//e.g. 08 -> 0:08, 40 -> 0:40
            return '0:' + seconds;
        }
        vSQuery -= (vSQuery % 60);//remove remainder seconds
        vSQuery /= 60;//convert from seconds to minutes
        let minutes = vSQuery % 60;//remove minutes above 60
        if (vSQuery < 60) {
            return minutes + ':' + seconds;
        }
        if ((minutes + "").length == 1) {
            minutes = '0' + minutes;
        }
        vSQuery -= (vSQuery % 60);//remove remainder minutes
        let hours = vSQuery / 60;//convert from minutes to hours
        return hours + ':' + minutes + ':' + seconds;
    }
    return vSQuery;
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
    if (!_string) return _string;
    _string = linkReplace(_string.trim());
    let output = "";
    while (true) {
        const openTag = _string.indexOf("<");
        const closeTag = _string.substring(openTag).indexOf(">") + openTag;
        if (openTag == -1 || closeTag - openTag == -1) { break; }
        output += afAux(_string.slice(0, openTag + 1)) + _string.slice(openTag + 1, closeTag);
        _string = _string.substring(closeTag);
    }
    output = output + afAux(_string)
    output = output.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\{([^:}]+):([^}]+)\}/g, '<span class="$1">$2</span>').replace(/\{([^}]+)\}/g, '<span class="$1"></span>')
    return output;
}
function afAux(str_in) { //curly quotes, dashes
    if (str_in.indexOf("'") != -1 || str_in.indexOf('"') != -1) { str_in = str_in.replaceAll(/ '(\d{2}\D)/g, " &rsquo;$1").replaceAll(/(>|^| |\()'/g, "$1&lsquo;").replaceAll(/(\*|>|-)'(\w)/g, "$1&lsquo;$2").replaceAll(/'/g, "&rsquo;").replaceAll(/(>|^| |\()"/g, "$1&ldquo;").replaceAll(/(\*|>|-)"(\w)/g, "$1&ldquo;$2").replaceAll(/"/g, "&rdquo;") }
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
function getRootPath() {
    let path = window.location.pathname;
    if (path.endsWith("index.html")) {
        path = path.slice(0, -10);
    }
    if (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    path = path.substring(path.indexOf("irisembury"));
    path = path.replace(/[^/]/g,'');
    return '../'.repeat(path.length);
}
function loadBody() {
    document.body.innerHTML = `
        <nav class="navbar">
            <div class="nav-inner">
                <div><a class="index-button no-select" href="../../"><div><svg height="11" width="11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path fill="currentColor" d="M24.57,34.075c-0.505,0-1.011-0.191-1.396-0.577L8.11,18.432c-0.771-0.771-0.771-2.019,0-2.79 L23.174,0.578c0.771-0.771,2.02-0.771,2.791,0s0.771,2.02,0,2.79l-13.67,13.669l13.67,13.669c0.771,0.771,0.771,2.021,0,2.792 C25.58,33.883,25.075,34.075,24.57,34.075z"/></svg><span>Index</span></div></a></div>
                <div><div class="page-name-segment"><span class="page-name pseudo-link" onclick="scrollToTop()"></span></div></div>
                <div>
                    <div class="menu-button"><svg viewBox="0 0 24 24" width="28" height="24"><path fill="currentcolor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div>
                </div>
            </div>
        </nav>
        <div id="aligner">
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
                <div>
                </div>
                <div style="text-align:right"><span class="grey-8 pseudo-link" onclick="localStorage.clear();this.parentNode.parentNode.classList.remove('open');document.querySelectorAll('.right-panel .switches-area input').forEach(x=>{if(x.checked)x.click()});">restore defaults</span></div>
            </div>
            <div class="screen"></div>
        </div>
        <div id="page">
            <div class="main-container">
                <article class="article">${ document.body.innerHTML }</article>
                <footer class="article-footer"><p>This is a personal site that I made and host via <a href="https://github.com/irisembury">GitHub</a>. I have no association with any other person or organization. For general inquiry you can contact contact@irisembury.com which directs to my personal inbox.</p></footer>
            </div>
        </div>
        <div class="lightbox hidden">
            <div class="lb-top-left"><p></p></div>
            <div class="lb-img-wrapper" onclick="setLightbox('close')"><img></div>
            <div class="lb-caption-panel"><p></p></div>
        </div>`;
    navbar = document.querySelector(".navbar");
    interpreter(document.querySelector(".article"));
    window.addEventListener("scroll", navCheck); navCheck();
}
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
    if (!lightswitch) { console.error("couldn't find #lightswitch"); }
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
                tocUpdate();
            });
        }
    )
    const right_menu_panel = document.querySelector(".right-panel");
    function rightMenuToggle(option) {
        if (option == "open") {
            right_menu_panel.classList.add("open");
        }
        else if (option == "close") {
            right_menu_panel.classList.remove("open");
        }
        else {
            rightMenuToggle(!right_menu_panel.classList.contains("open") ? "open" : "close");
        }
    }
    const right_menu_hamburger_button = document.querySelector(".menu-button");
    const toc_toggle_button = document.querySelector(".toc-toggle-button");
    
    right_menu_hamburger_button?.addEventListener("click", rightMenuToggle);
    
    if (right_menu_hamburger_button && toc_toggle_button) {
        window.addEventListener("click", function(e) {
            if (!right_menu_panel.contains(e.target) && !right_menu_hamburger_button.contains(e.target)) {
                rightMenuToggle("close");
            }
            if (!toc.contains(e.target) && !toc_toggle_button.contains(e.target)) {
                tocHide();
            }
        })
    }
    else if (right_menu_hamburger_button) {
        window.addEventListener("click", function(e) {
            if (!right_menu_panel.contains(e.target) && !right_menu_hamburger_button.contains(e.target)) {
                rightMenuToggle("close");
            }
        })
    }
    
    window.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            rightMenuToggle("close");
            setLightbox("close");
            tocHide();
        }
        else if (e.key === "Home") {
            scrollToTop();
        }
    })
}
function tocToggle() {
    toc.classList.toggle("attach", !toc.classList.contains("attach"));
}
function tocHide() {
    toc.classList.remove("attach");
}
function tocSetup() {
    pageHeadings = Array.from(document.getElementsByClassName("for-toc"));
    pageHeadings.forEach(h => { h.classList.remove("for-toc"); if (h.classList.length == 0) { h.removeAttribute('class'); } });
    if (pageHeadings.length < 3) { return; }
    const aligner_ = document.getElementById("aligner");
    const page_ = document.getElementById("page");
    if (page_ == null || aligner_ == null) return;
    aligner_.insertAdjacentHTML("beforeend",`<div class="toc-toggle-button" onclick="tocToggle()" title="Table of Contents"><svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" width="20" height="20" viewBox="0 0 20 20"><path d="M3 16H1v-2h2zm16 0H5v-2h14zM3 11H1V9h2zm16 0H5V9h14zM3 6H1V4h2zm16 0H5V4h14z"/></svg></div>`);
    page_.insertAdjacentHTML("afterbegin",`<nav class="toc"></nav>`);
    page_.insertAdjacentHTML("beforeend",`<div class="right-spacer"></div>`);
    toc = document.querySelector(".toc");
    toc.innerHTML = '<div class="toc-title">This page contents</div><div class="toc-row"><a class="pseudo-link" onclick="scrollToTop()">(Top)</a></div>' + pageHeadings.slice(1).map( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join('');
    toc.scrollTo({ behavior: "instant", top: 0 })
    rowsInToc = Array.from(toc.getElementsByClassName("toc-row"));
    window.addEventListener("scroll", tocUpdate);
    tocUpdate();
}
function init() {
    loadBody();
    rightMenuSetup();
    setupLightswitch();
    if (loadToc) tocSetup();
    Array.from(document.querySelectorAll(".auto-format")).forEach(a => { a.innerHTML = autoFormat(a.innerHTML); a.classList.remove("auto-format"); if (a.classList.length == 0) { a.removeAttribute("class"); } });
    Array.from(document.querySelectorAll(".auto-paragraphs")).forEach(a => { a.innerHTML = a.innerHTML.split("\n").map(l => l.trim()).filter(l => l).map(l => `<p>${ autoFormat(l) }</p>`).join(""); a.classList.remove("auto-format"); if (a.classList.length == 0) { a.removeAttribute("class"); } });
    Array.from(document.querySelectorAll(".seconds")).forEach(a => a.innerHTML = unwrapSeconds(a.innerHTML));
    Array.from(document.querySelectorAll(".age-from")).forEach(a => a.innerHTML = ageFromISO(a.innerHTML));
    Array.from(document.querySelectorAll(".current-year")).forEach(a => a.innerHTML = new Date().getFullYear());
    if (document.title == "") { document.title = "Iris Embury"; }
    else if (!document.title.endsWith("Iris Embury")) { document.title += " | Iris Embury"; }
    setTimeout(() => { HTML.style.removeProperty("opacity"); HTML.classList.add("animate"); }, 250);
}
window.addEventListener("load", init);

