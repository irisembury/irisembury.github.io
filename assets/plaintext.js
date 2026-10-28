"use strict"

function linkReplace(chunk) {
    chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkUrl) => {
        linkUrl = linkUrl.replaceAll('&#41;', ')');
        displayText = displayText.trim();
        return '<a class="link" href="'+linkUrl+'" title="'+linkUrl+'">' + displayText + '</a>';
    });
    chunk = chunk.replace(/(?<=^|\s)(https?:\/\/[^\s<$]+)/g, (match, linkUrl) => {
        let linkAfter = "";
        if (/[.,?!;]$/.test(linkUrl)) {
            linkAfter = linkUrl.at(-1);
            linkUrl = linkUrl.slice(0, -1);
        }
        let _link_url = linkUrl;
        if (_link_url.indexOf("#") != -1) {
            _link_url = _link_url.substring(0, _link_url.indexOf("#"))
        }
        return '<a class="link" href="' + linkUrl + '">' + linkUrl + '</a>' + linkAfter;
    });
    return chunk;
}
{
    function init()
    {
        const main = document.querySelector('main');
        if (main == null) { return; }
        
        main.innerHTML = main.innerHTML.split("\n").map(
            line => {
                if (line.startsWith('<')) return line;
                let parts = line.match(/^(\s*)(.*)$/).slice(1);
                
                if (parts[1].length > 0) {
                    
                    if (parts[1].startsWith('&gt;')) {
                        parts[1] = '<div class="console" contenteditable="true" spellcheck="false">' + parts[1].substring(4).trimStart() + '</div>';
                    }
                    else if (parts[1].startsWith("-")) {
                        parts[1] = `<div class="hanging">${ parts[1] }</div>`;
                    }
                    parts[1] = linkReplace(parts[1]);
                    parts[1] = parts[1].replace(/\*\*(.+?)\*\*/g, '<span class="emphasis">$1</span>').replace(/\{([^:}]+):([^}]+)\}/g, '<span class="$1">$2</span>');
                    
                    return `<div><div>${ parts[0].replaceAll(' ','&nbsp;') }</div><div>${ parts[1] }</div></div>`
                }
                
                else {
                    return `<div class="br"></div>`
                }
                
            }
        ).join('') + `<div class="br"></div><div style="opacity:0.5">END OF DOCUMENT</div>` + `<div class="br"></div>`.repeat(20);
        if (document.title == "") { document.title = "Iris Embury"; }
        else if (!document.title.endsWith("Iris Embury")) { document.title += " | Iris Embury"; }
    }
    window.addEventListener("load", init);
}


