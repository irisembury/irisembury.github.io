"use strict"
let tocElement = null,canTocUpdate = true, tocLastHeading = 0,rowsInToc = [],pageHeadings = [],loadToc = false,pageLinks = [];
const HTML = document.documentElement, toc = 1, wide = 1, unlisted = 1, unsetWidth = 1, siteIcons = { 'youtube.com':'youtube-logo', 'youtu.be':'youtube-logo', 'twitch.tv':'twitch-logo', 'bsky.app':'bluesky-logo', 'x.com':'twitter-logo', 'twitter.com':'twitter-logo', 'facebook.com':'facebook-logo', 'substack.com':'substack-logo', 'instagram.com':'instagram-logo', 'reddit.com':'reddit-logo', 'medium.com':'medium-logo', 'wikipedia.org':'wikipedia-logo', 'patreon.com':'patreon-logo', 'tumblr.com':'tumblr-logo', 'discord.gg':'discord-logo', 'discord.com':'discord-logo' }, KEYWORDS = { cpp: "alignas alignof and and_eq asm auto bitand bitor bool break case catch char char16_t char32_t char8_t class co_await co_return co_yield compl concept const const_cast consteval constexpr constinit continue decltype default delete do double dynamic_cast else enum explicit export extern false final float for friend goto if inline int import long module mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq", cs: "abstract add alias allows and args as ascending async await base bool break by byte case catch char checked class const continue decimal default delegate descending do double dynamic else enum equals event explicit extension extern false field file finally fixed float for foreach from get global goto group if implicit in init int interface internal into is join let lock long managed nameof namespace new nint not notnull nuint null object on operator or orderby out override params partial partial private protected public readonly record ref remove required return sbyte scoped sealed select set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unmanaged unmanaged unsafe ushort using value var virtual void volatile when where where while with yield", java: "String abstract continue for new switch assert default goto package synchronized boolean do if private this break double implements protected throw byte else import public throws case enum instanceof return transient catch extends int short try char final interface static void class finally long strictfp volatile const float native super while", js: "await break case catch class const constructor continue debugger default delete do else enum export extends false finally for function if import in instanceof let new null return super switch this throw true try typeof var void while with yield implements interface package private protected public static setInterval" }

const pagesMeta = [
    { url:"destiny-finkelstein-debate",title:"The 2024 Destiny, Morris, Finkelstein, Rabbani debate",date:"2026-10-14",mirrors:"substack:220450387" },
    { url:"abortion",title:"The case for abortion",date:"2026-02-18",mirrors:"substack:88392592,tumblr:809547051047272448,patreon:55199340",toc },
    { url:"afd-victory-2026",title:"On the AfD victory in Saxony-Anhalt",date:"2026-09-08",mirrors:"substack:214741964,tumblr:827199160807817216" },
    { url:"airport-privatization",title:"Thoughts on airport privatization",date:"2026-09-20",mirrors:"substack:216649667" },
    { url:"allende-and-pinochet",title:"Allende and Pinochet",date:"2026-08-09",mirrors:"substack:210515116,medium:55782f90e9" },
    { url:"leftist-youtube",title:"Thoughts on Leftist YouTube",date:"2026-10-07",mirrors:"substack:219340446",toc },
    { url:"public-record",title:"Public record",wide,toc,unlisted,unsetWidth },
    { url:"stay-the-trenches",title:"Poor Things",date:"2024-10-31",mirrors:"tumblr:769969807464464384" },
    { url:"floor-crossings",title:"Floor crossing (Canadian politics)",date:"2026-04-17",mirrors:"substack:94479253,medium:dfe93bb23bdd" },
    { url:"india",title:"Notes on India",date:"2025-10-24",mirrors:"substack:77071182,tumblr:798351257128615936" },
    { url:"liberal-conservatism",title:"Liberal conservatism",subtitle:"A philosophy of prudence and humility",date:"2026-03-24",toc },
    { url:"american-decline",title:"A synopsis of American decline",date:"2026-01-28",mirrors:"substack:86165875,patreon:55201485",toc },
    { url:"anime-reviews",title:"Anime reviews",date:"2024-12-17",mirrors:"tumblr:770134591113658368",unlisted },
    { url:"bernie-military-industrial-complex",title:"Bernie Sanders and the Military Industrial Complex",date:"2024-12-16",mirrors:"tumblr:770070077409214464" },
    { url:"bias-normal-white-men",title:"On our bias for normal white men",date:"2024-11-26",mirrors:"substack:53823028,tumblr:770305075441778688,medium:0c508d4c51b5" },
    { url:"canada-sovereign-wealth-fund",title:"Canada's plan for a sovereign wealth fund",date:"2026-04-29",mirrors:"substack:95885575,tumblr:815245873447649280" },
    { url:"data-structures-algorithms",title:"Data structures & algorithms",date:"2021-04-31",wide,toc,unlisted },
    { url:"elon-musk-nazi-salute",title:"Elon Musk and the Nazi Salute",date:"2025-01-24",mirrors:"substack:55604956,tumblr:773565389405847552" },
    { url:"fetishism-politics",title:"Fetishism and politics",date:"2024-11-14",mirrors:"tumblr:770364766791352320" },
    { url:"freedom-convoy",title:"What was the Freedom Convoy?",date:"2026-06-15",wide,toc },
    { url:"how-bad-is-america-really",title:"How bad is America, really?",date:"2026-07-01" },
    { url:"immigration",title:"Immigration",date:"2025-11-06",mirrors:"substack:83229652" },
    { url:"israel-palestine",title:"Israel and Palestine",date:"2025-07-27",toc,wide },
    { url:"liberalism-not-leftism",title:"Liberalism not leftism",date:"2025-09-19",mirrors:"substack:74062936,tumblr:795164683319574528,patreon:55199811" },
    { url:"lies-about-ilhan-omar",title:"Lies about Ilhan Omar",date:"2025-08-25",mirrors:"substack:73066010,tumblr:794091916138594304,medium:46de1629e138" },
    { url:"lies-about-warren-clinton",title:"Lies about Elizabeth Warren and Hillary Clinton",date:"2024-12-19",mirrors:"tumblr:770730090759946240,substack:53821886" },
    { url:"maid",title:"Medical Assistance in Dying",date:"2026-09-14",mirrors:"substack:215626100,medium:378a520d05e0,tumblr:828961026747809793" },
    { url:"mark-robinson",title:"Mark Robinson",subtitle:"A chronicling of a person too ridiculous to forget",date:"2024-12-15",mirrors:"tumblr:769962893917798400" },
    { url:"pierre-poilievre",title:"The many problems with Pierre Poilievre",date:"2026-08-03",mirrors:"substack:216081530",toc },
    { url:"prejudice",title:"Notes on prejudice",date:"2025-10-30",mirrors:"substack:77556410" },
    { url:"rational-ignorance",title:"Rational ignorance",date:"2026-04-09",mirrors:"substack:193680023,tumblr:813419185909727232,patreon:55199122,medium:7d332cf2dfb5" },
    { url:"reddit",title:"Reddit",subtitle:"The website's history, what makes it unique, and the intense hatred many people seem to have for it",date:"2025-12-30",mirrors:"substack:83230909" },
    { url:"relationships",title:"The standard relationship model",date:"2025-11-19" },
    { url:"sex-gender-transsexuals",title:"Sex, Gender, & Transsexuals",date:"2024-11-19",wide,toc },
    { url:"somali-day-cares",title:"Nick Shirley and Somali day cares",date:"2026-01-02",mirrors:"substack:83243480,patreon:55200604" },
    { url:"trans-prison-stats-argument",title:"The trans prison stats argument",date:"2024-09-15",mirrors:"substack:153916145,tumblr:771501478599868416" },
    { url:"trump-and-russia",title:"Trump and Russia",date:"2025-03-06",mirrors:"tumblr:777321996757450752,substack:58560801" },
    { url:"trump-appeal",title:"The Trump appeal",subtitle:"How and why does anyone actually like him?",date:"2024-12-03",mirrors:"tumblr:770270265635667968,medium:5c6806252b43" },
    { url:"types-of-masculinity",title:"On types of masculinity",date:"2024-11-08",mirrors:"tumblr:770310861444300800" },
    { url:"why-bottom-surgery",title:"Why get bottom surgery?",date:"2025-02-09",mirrors:"tumblr:775036555284856832" }
];
const videoElements = [
    { title:"Destiny versus Finkelstein",date:"2026-10-20",src:"youtube:2jY-wfdKkyw,patreon:172891823",thumb:"172891823.jpg",length:"44:24" },
    { title:"Canadian separatism",date:"2026-10-12",src:"patreon:172199226,youtube:Q_ltXhrXb6s",thumb:"172199226.jpg",length:"10:13" },
    { title:"Macklemore, Ed Sheeran",date:"2026-10-10",src:"youtube:_lfRiHlNFbc,patreon:172218877",thumb:"172218877.jpg",length:"41:18" },
    { title:"Thoughts on Leftist YouTube",date:"2026-09-25",src:"youtube:R_xfJqp3M4g,patreon:171931256",length:"1:17:57",thumb:"1719312562.jpg" },
    { title:"Medical Assistance in Dying (MAiD)",date:"2026-09-16",src:"patreon:169696851,youtube:0n0edHbri5k",length:"13:32",thumb:"1696968512.jpg" },
    { title:"Mark Carney",date:"2026-08-18",src:"youtube:5fsJUueUvpw,patreon:167033503",thumb:"167033503.jpg",length:"13:54" },
    { title:"Am I a liberal?",date:"2026-08-11",src:"youtube:QPNCs5A3iYo,patreon:166429634",length:"16:26",thumb:"166429634.jpg" },
    { title:"The Freedom Convoy",date:"2026-07-19",src:"youtube:ilB3j3BTCTI,patreon:164228303",thumb:"164228303.jpg",length:"2:41:06" },
    { title:"Canada is under attack",date:"2026-08-09",src:"youtube:cDJ3lQH7m0Y,patreon:166242253",length:"16:21",thumb:"166242253.jpg" },
    { title:"Floor crossers",date:"2026-05-17",src:"youtube:N3csai2IFDU,patreon:158476239",thumb:"158476239.jpg",length:"56:34" },
    { title:"Liberalism not Leftism",date:"2026-05-06",src:"youtube:DgGf_g4aGYA,patreon:157517952",thumb:"157517952.jpg",length:"41:15" },
    { title:"Liberal Conservatism",date:"2026-04-07",src:"youtube:Sy33HSFsuu8,patreon:154996870",thumb:"154996870.jpg",length:"2:03:13" },
    { title:"Abortion",date:"2026-02-24",src:"youtube:CpjJ8TgOxJY,patreon:151884875",thumb:"151884875.jpg",length:"43:04" },
    { title:"How bad is America, really?",date:"2026-03-04",src:"youtube:W0Dmtyyc7FU,patreon:152288758",thumb:"152288758.jpg",length:"27:04" },
    { title:"American decline",date:"2026-02-11",src:"youtube:oUOsAdnK2zs,patreon:150555019",thumb:"150555019.jpg",length:"39:47" },
    { title:"Normalization",src:"youtube:TYoe1jxBYPY,patreon:148679519",date:"2025-09-19",thumb:"148679519.jpg",length:"12:08" },
    { title:"India",thumb:"148682097.jpg",src:"youtube:Pz0Oq1rb14E,patreon:148682097",date:"2025-10-23",length:"41:17" },
    { title:"Lies about Ilhan Omar",date:"2025-09-03",src:"youtube:zgE4L-e9yg0,patreon:148679387",thumb:"148679387.jpg",length:"44:50" },
    { title:"Trans fetishism",date:"2025-04-02",src:"youtube:vk57rvM1zWo",thumb:"vk57rvM1zWo.jpg",length:"22:39" },
    { title:"Exploring lies about Warren and Clinton",date:"2025-04-09",src:"youtube:LPQD6sxlWOs,patreon:148676394",thumb:"148676394.jpg",length:"34:02" },
    { title:"Bernie Sanders & the Military Industrial Complex",date:"2025-03-22",length:"12:44",src:"youtube:yt6O0OMdIT0",thumb:"yt6O0OMdIT0.jpg" },
    { title:"Sex, gender, & transsexuals",date:"2025-10-17",src:"youtube:Hgh3r7gJoWU,patreon:148676474",thumb:"148676474.jpg",length:"1:26:14" }
].sort((a,b)=>(parseInt(b.date?.replace(/\D/g,''))||0)-(parseInt(a.date?.replace(/\D/g,''))||0)).map(
    vobj => `
        <figure class="video-figure">
            <div class="img-box"><a href="${ linkParse(vobj.src.split(",")[0],0) }"><div class="img" loading="lazy" style="background-image:url('${ getRootPath() }assets/thumbnails/${ vobj.thumb }')">${ vobj.length ?`<span class="timecard no-select">${ vobj.length }</span>` :"" }</div></a></div>
            <figcaption>
                <div class="video-title">${ vobj.title }</div>
                <div class="video-sources">${ vobj.src.split(",").map(n => linkParse(n,1)).join(" | ") }</div>
                <div class="video-date"><span>${ dateFromISO(vobj.date) }</span></div>
            </figcaption>
        </figure>`
);
const textElements = pagesMeta.filter(x => !x.unlisted).sort(
    (a,b) => (parseInt(b.date?.replace(/\D/g, "")) || 0) - (parseInt(a.date?.replace(/\D/g,"")) || 0)
).map(
    tobj => `
    <div><span><a title="${ tobj.title }" href="${ getRootPath() }page/${ tobj.url }/index.html">${ autoFormat(tobj.title) + (tobj.subtitle ? ': '+autoFormat(tobj.subtitle) : '') }</a></span>${ tobj.date ?`<span class="page-date"> / <span title="${ dateFromISO(tobj.date) }">${ tobj.date }</span></span>` :'' }</div>`
);

function init() {
    loadBody();
    rightMenuSetup();
    setupLightswitch();
    tocSetup();
    Array.from(document.querySelectorAll(".auto-format")).forEach(a => { a.innerHTML = autoFormat(a.innerHTML); a.classList.remove("auto-format"); if (a.classList.length == 0) { a.removeAttribute("class"); } });
    Array.from(document.querySelectorAll(".auto-paragraphs")).forEach(a => {
        a.innerHTML = a.innerHTML.split("\n").map(l => l.trim()).filter(l => l).map(
            line => {
                if (line.startsWith('.')) { return `<div class='fine'><p>${ autoFormat(line.substring(1).trimStart()) }</p></div>`; }
                if (line.startsWith('#')) { return `<h4>${ autoFormat(line.substring(1).trimStart()) }</h4>`; }
                return `<p>${ autoFormat(line) }</p>`
            }
        ).join('');
        a.classList.remove("auto-paragraphs");
        if (a.classList.length == 0) {
            a.removeAttribute("class");
        }
    });
    Array.from(document.querySelectorAll(".seconds")).forEach(a => a.innerHTML = unwrapSeconds(a.innerHTML));
    Array.from(document.querySelectorAll(".age-from")).forEach(a => a.innerHTML = ageFromISO(a.innerHTML));
    Array.from(document.querySelectorAll(".current-year")).forEach(a => a.innerHTML = new Date().getFullYear());
    document.querySelector(".article-index")?.insertAdjacentHTML("beforeend", textElements.join(''));
    document.querySelector(".video-index")?.insertAdjacentHTML("beforeend", videoElements.join(''));
    document.querySelector(".recent-articles")?.insertAdjacentHTML("beforeend", textElements.slice(0, 5).join(''));
    document.querySelector(".recent-videos")?.insertAdjacentHTML("beforeend", videoElements.slice(0, 3).join(''));
    if (document.title == "") { document.title = "Iris Embury"; }
    else if (!document.title.endsWith("Iris Embury")) { document.title += " | Iris Embury"; }
    setTimeout(() => { HTML.style.removeProperty("opacity"); HTML.classList.add("animate"); }, 250);
}

function dateFromISO(datestring, tag = 0, datelength = 0) {
    /* this converts ISO 8601 date format (YYYYMMDD) into YYYY Month D */
    /* mode 0 = raw datestring return, mode 1 = time element */
    let input = datestring.replace(/\D/g, "")
    if (input.length == 8) {
        const iso = input.substring(0,4) + "-" + input.substring(4,6) + "-" + input.substring(6,8);
        let [year,month,day] = iso.split("-").map(Number);
        if (month >= 1 && month <= 12) {
            
            if (datelength == 0) {
                month = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June", 7: "July", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec" }[month]
            }
            else {
                month = { 1: "January", 2: "February", 3: "March", 4: "Aprril", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" }[month]
            }
            
            if (tag == 0) {
                datestring = year + " " + month + " " + day;
            }
            else {
                datestring = '<time title="ISO: '+ iso +'" datetime="'+ iso +'">'+ year + " " + month + " " + day +'</time>';
            }
        }
    }
    /* if anything fails, just return the value that was passed unaltered */
    return datestring;
}
function scrollToTop() {
    window.scrollTo({ top: 0 });
    history.replaceState(null, "", window.location.pathname);
    document.getElementById("toc")?.scrollTo({ behavior: "smooth", top: 0 })
}
function linkParse(string_in, mode = 0, separator = ":") {
    /* 0 = link, 1 = tag, 3 = tag with icon */
    let [sitename, id] = string_in.trim().split(separator, 2);
    let ans = {
        'youtube': [
            `https://youtu.be/${id}`,
            `<a class="external-link youtube-link" href="https://youtu.be/${id}" title="https://youtu.be/${id}">YouTube</a>`,
            `<a class="external-link youtube-link" href="https://youtu.be/${id}" title="https://youtu.be/${id}"><span class="nowrap"><span class="youtube-logo inline-icon"></span><span class="link-text">YouTube</span></span></a>`
        ],
        'tumblr': [
            `https://irisembury.tumblr.com/post/${id}`,
            `<a class="external-link tumblr-link" href="https://irisembury.tumblr.com/post/${id}" title="https://irisembury.tumblr.com/post/${id}">Tumblr</a>`,
            `<a class="external-link tumblr-link" href="https://irisembury.tumblr.com/post/${id}" title="https://irisembury.tumblr.com/post/${id}"><span class="nowrap"><span class="tumblr-logo inline-icon"></span><span class="link-text">Tumblr</span></span></a>`
        ],
        'substack': [
            `https://irisembury.substack.com/p/${id}`,
            `<a class="external-link substack-link" href="https://irisembury.substack.com/p/${id}" title="https://irisembury.substack.com/p/${id}">Substack</a>`,
            `<a class="external-link substack-link" href="https://irisembury.substack.com/p/${id}" title="https://irisembury.substack.com/p/${id}"><span class="nowrap"><span class="substack-logo inline-icon"></span><span class="link-text">Substack</span></span></a>`
        ],
        'patreon': [
            `https://www.patreon.com/posts/${id}`,
            `<a class="external-link patreon-link" href="https://www.patreon.com/posts/${id}" title="https://www.patreon.com/posts/${id}">Patreon</a>`,
            `<a class="external-link patreon-link" href="https://www.patreon.com/posts/${id}" title="https://www.patreon.com/posts/${id}"><span class="nowrap"><span class="patreon-logo inline-icon"></span><span class="link-text">Patreon</span></span></a>`
        ],
        'medium': [
            `https://medium.com/@irisembury/${id}`,
            `<a class="external-link medium-link" href="https://medium.com/@irisembury/${id}" title="https://medium.com/@irisembury/${id}">Medium</a>`,
            `<a class="external-link medium-link" href="https://medium.com/@irisembury/${id}" title="https://medium.com/@irisembury/${id}"><span class="nowrap"><span class="medium-logo inline-icon"></span><span class="link-text">Medium</span></span></a>`
        ]
    }
    if (ans[sitename] && ans[sitename][mode]) {
        return ans[sitename][mode];
    }
    console.error('linkParse: ' + sitename + ', ' + mode + ' (' + string_in + ')')
    return '';
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
function linkReplace(chunk) {
    chunk = chunk.replace(/\[([^\]]*)\]\((.+?[^\\])\)/g, (match, displayText, linkUrl) => {
        linkUrl = linkUrl.replaceAll('&#41;', ')');
        displayText = displayText.trim();
        const external = linkUrl.startsWith("http");
        const blankDisplay = displayText == "";
        
        let linkIndex = '[link]';
        if (linkUrl.startsWith("http")) {
            let _link_url = linkUrl;
            if (_link_url.indexOf("#") != -1) {
                _link_url = _link_url.substring(0, _link_url.indexOf("#"))
            }
            linkIndex = pageLinks.indexOf(_link_url);
            if (linkIndex == -1) {
                linkIndex = pageLinks.push(_link_url); }
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
        let _link_url = linkUrl;
        if (_link_url.indexOf("#") != -1) {
            _link_url = _link_url.substring(0, _link_url.indexOf("#"))
        }
        if (pageLinks.indexOf(_link_url) == -1) {
            pageLinks.push(_link_url);
        }
        let linkInner = linkUrl;
        const iconName = siteIcons[Object.keys(siteIcons).find(site => linkUrl.includes(site))];
        let a_tag = '<a';
        if (iconName) {
            linkInner += '<span class="nowrap"><span class="' + iconName + ' inline-icon"></span></span>';
        }
        a_tag += ' href="' + linkUrl + '">' + linkInner + '</a>' + linkAfter;
        return a_tag;
    });
    return chunk;
}
function unwrapSeconds(vSQuery) {
    vSQuery = parseInt(vSQuery);
    if (!isNaN(vSQuery)) {
        let seconds = vSQuery % 60; // remainder
        if ((seconds + "").length == 1) {
            seconds = '0' + seconds; // e.g. 8 -> 08
        }
        if (vSQuery < 60) { // e.g. 08 -> 0:08, 40 -> 0:40
            return '0:' + seconds;
        }
        vSQuery -= (vSQuery % 60); // remove remainder seconds
        vSQuery /= 60; // convert from seconds to minutes
        let minutes = vSQuery % 60; // remove minutes above 60
        if (vSQuery < 60) {
            return minutes + ':' + seconds;
        }
        if ((minutes + "").length == 1) {
            minutes = '0' + minutes;
        }
        vSQuery -= (vSQuery % 60); // remove remainder minutes
        let hours = vSQuery / 60; // convert from minutes to hours
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
function getRootPath() {
    let path = window.location.pathname;
    if (path.endsWith("index.html")) {
        path = path.slice(0, -10);
    }
    while (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    path = path.substring(path.indexOf("irisembury"));
    path = path.replace(/[^/]/g,'');
    return '../'.repeat(path.length);
}
function getDomain() {
    let path = window.location.pathname;
    if (path.endsWith("index.html")) {
        path = path.slice(0, -10);
    }
    while (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    let lastSlash = path.lastIndexOf("/");
    if (lastSlash == -1) {
        console.error("Wait no this should be impossible");
        return "";
    }
    return path.substring(lastSlash + 1);
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
function afAux(str_in) {
    //curly quotes, dashes
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
function codeSanitize(chunk) {
    return chunk.replace(/`(.+?)`/g, crAux);
}
function crAux(match, captured) {
    return `<code>${ captured.replaceAll("\"", "&quot;").replaceAll("'", "&apos;").replaceAll("-", "&hyphen;").replaceAll("(", "&lpar;").replaceAll(")", "&rpar;").replaceAll("[", "&lbrack;").replaceAll("]", "&rbrack;").replaceAll("*", "&ast;").replaceAll("\n", "<br>") }</code>`;
}
function setLightbox(action) {
    if (action instanceof HTMLElement) {
        document.querySelector(".lightbox").classList.remove("hidden");
        let img = document.querySelector(".lightbox .lb-img-wrapper img")
        img.src = action.src;
        img.alt = action.alt;
        if (action.title != "Click to expand") img.title = action.title;
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
        if (row.caption) { row.caption = '<figcaption>' + autoFormat(row.caption.replaceAll('&quot;','"')) + '</figcaption>'; }
        return `<figure>
            <img style="max-height:${ maxHeight }px;" src="${ row.src }" alt="${ row.alt }" title="${ row.title }" loading="lazy" onclick="setLightbox(this)">
            ${ row.caption }
        </figure>`;
    }).join("")}</div>`;
    return chunk;
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
function autoHeading(chunk) {
    let number = chunk.indexOf(" ");
    let heading = chunk.slice(number + 1).trim();
    if (number > 4) {
        number = 4;
    }
    const tag = 'h' + number;
    const id = heading.replaceAll(" ", "_").replaceAll("---", '\u2014').replaceAll("--", "\u2013").replace(/[\*<>]/g, "");
    
    heading = autoFormat(heading);
    return `<${ tag } id="${ id }"${ number == 4 ? '' : ' class="for-toc"'}>${ heading }</${ tag }>`;
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
    const _menu_ = document.querySelector(".menu");
    function rightMenuToggle(option) {
        if (option == "open") {
            _menu_.classList.add("open");
        }
        else if (option == "close") {
            _menu_.classList.remove("open");
        }
        else {
            rightMenuToggle(!_menu_.classList.contains("open") ? "open" : "close");
        }
    }
    const gear_ = document.querySelector(".gear");
    const toc_btn_ = document.querySelector(".toc-btn");
    
    gear_?.addEventListener("click", rightMenuToggle);
    
    if (gear_ && toc_btn_) {
        window.addEventListener("click", function(e) {
            if (!_menu_.contains(e.target) && !gear_.contains(e.target)) {
                rightMenuToggle("close");
            }
            if (!tocElement?.contains(e.target) && !toc_btn_.contains(e.target)) {
                tocHide();
            }
        })
    }
    else if (gear_) {
        window.addEventListener("click", function(e) {
            if (!_menu_.contains(e.target) && !gear_.contains(e.target)) {
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
    tocElement?.classList.toggle("attach", !tocElement.classList.contains("attach"));
}
function tocHide() {
    tocElement?.classList.remove("attach");
}
function tocSetup() {
    const page_ = document.getElementById("page");
    if (page_ && loadToc) {
        pageHeadings = Array.from(document.getElementsByClassName("for-toc"));
        pageHeadings.forEach(h => { h.classList.remove("for-toc"); if (h.classList.length == 0) { h.removeAttribute('class'); } });
        if (pageHeadings.length < 3) { return; }
        page_.insertAdjacentHTML("afterbegin",`<nav class="toc"></nav>`);
        page_.insertAdjacentHTML("beforeend",`<div class="page-spacer"></div>`);
        tocElement = document.querySelector(".toc");
        tocElement.innerHTML = '<div class="toc-title">This page contents</div><div class="toc-row"><a class="pseudo-link" onclick="scrollToTop()">(Top)</a></div>' + pageHeadings.slice(1).map( heading => `<div class="toc-row ${ heading.tagName.toLowerCase() }"><a href="#${ heading.id }">${ heading.innerHTML }</a></div>` ).join('');
        tocElement.scrollTo({ behavior: "instant", top: 0 })
        rowsInToc = Array.from(tocElement.getElementsByClassName("toc-row"));
        window.addEventListener("scroll", tocUpdate);
        tocUpdate();
    }
}
function interpreter(argValue) {
    if (argValue instanceof Node) {
        argValue.innerHTML = interpreter(argValue.innerHTML);
        return;
    }
    if (!argValue) return;
    let table_number = 1;
    let input = argValue.replace(/\n\n+/g, "\n\n").replace(/\r/g, "").replace(/\t/g, "    ").replace("\\\\", "&#92;").replaceAll("\\*", "&#42;").replaceAll('\\"', "&#34;").replaceAll("\\'", "&#39;").replaceAll("\\|", "&#124;").replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;").replaceAll("\\[", "&#91;").replaceAll("\\]", "&#93;").replaceAll("\\^", "&#94;").replaceAll("\\.","&#46;").replaceAll("...", "\u2026").replaceAll("\\`", "&#96;").replaceAll("\\:", "&#58;").trim().split("\n\n");
    input = input.map( chunk => {
        if (chunk.startsWith("//")) { return ""; }
        if (chunk.startsWith("<") && !chunk.startsWith("<a")) { return chunk; }
        if (chunk == "---") { return "<hr>"; }
        if (chunk == "***") { return '<div class="dinkus no-select">***</div>'; }
        if (/^#{1,6} /.test(chunk)) { return autoHeading(chunk); }
        if (chunk.startsWith("!images")) { return imageGallery(chunk); }
        if (chunk.startsWith("!files")) { return fileBox(chunk); }
        if (chunk.startsWith("!video")) { return autoVideo(chunk); }
        chunk = codeSanitize(chunk);
        if (chunk.startsWith("!codeblock")) { return codeblock(chunk) ; }
        if (chunk.startsWith("!table")) { return autoTable(chunk, table_number++); }
        if (chunk.startsWith("!indent") || chunk.startsWith("    ")) { return autoIndent(chunk); }
        let isFine = chunk.startsWith(".");
        if (isFine) { chunk = chunk.slice(1).trimStart(); }
        if (chunk.startsWith("!list")) { chunk = autoList(chunk.substring(chunk.indexOf('\n') + 1)); }
        if (chunk.startsWith("-- ")) {
            return '<ul class="auto-list condensed">' + chunk.split("\n").map(l => '<li class="text-block">' + autoFormat(l.replace(/^\-\- /,'').trim()) + '</li>').join('') + '</ul>'
        }
        else if (/^[\*\-] /.test(chunk) || /^\d+\. /.test(chunk)) {
            chunk = autoList(chunk);
        }
        else {
            chunk = `<p>${ autoFormat(chunk).replaceAll('  \n','<br>') }</p>`;
        }
        if (isFine) { chunk = '<div class="fine">' + chunk + '</div>'; }
        return chunk;
    })
    return input.join('');
}
function loadBody() {
    document.body.insertAdjacentHTML("afterbegin", `
        <header class="page-header">
            <a class="header__name" href="${getRootPath()}index.html">Iris Embury</a>
            <div class="gear"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentcolor" d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle fill="currentcolor" cx="12" cy="12" r="3.5"></circle></svg></div>
        </header>
        <div class="menu">
            <div class="grid">
                <h3>Display:</h3>
                <div class="grid">
                    <div><label for="lightswitch">Dark mode:</label><input type="checkbox" class="slide-checkbox" id="lightswitch"></div>
                </div>
            </div>
            <div class="grid">
                <h3>Text formatting:</h3>
                <div class="grid">
                    <div><label for="indent-text">Indent paragraphs:</label><input type="checkbox" class="slide-checkbox formatting auto" id="indent-text"></div>
                    <div><label for="justify-text">Justify text:</label><input type="checkbox" class="slide-checkbox formatting auto" id="justify-text"></div>
                    <div><label for="reduce-margins">Reduce vertical margins:</label><input type="checkbox" class="slide-checkbox auto" id="reduce-margins"></div>
                </div>
            </div>
            <div>
                <div class="text-right grey-8"><span class="pseudo-link" onclick="localStorage.clear(); document.querySelector('.menu')?.classList.remove('open'); document.querySelectorAll('.menu input').forEach(x => { if (x.checked) x.click() });">restore defaults</span></div>
            </div>
        </div>
        <div class="toc-btn" onclick="tocToggle()" title="Table of Contents"><svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" width="20" height="20" viewBox="0 0 20 20"><path d="M3 16H1v-2h2zm16 0H5v-2h14zM3 11H1V9h2zm16 0H5V9h14zM3 6H1V4h2zm16 0H5V4h14z"/></svg></div>
        `);
    const page = document.getElementById("page");
    if (page) {
        page.innerHTML = `
            <article class="article">
                ${ articleTop() }
                <div class="article__body">
                    ${ page.innerHTML }
                </div>
                ${ getRootPath()?`
                    <footer class="article__footer">
                        <div class="panel-switcher--580">
                            <div>
                                <div class="line-title"><span>Recently added</span><a href="../../?tab=articles">see all</a></div>
                                <div class="recent-articles"></div>
                            </div>
                            <div>
                                <div class="line-title"><span>Recent videos</span><a href="../../?tab=videos">see all</a></div>
                                <div class="recent-videos"></div>
                            </div>
                        </div>
                    </footer>`:'' }
            </article>`;
        interpreter(page.querySelector('.article__body'));
        page.insertAdjacentHTML("afterend",`
            <footer class="page-footer__main">
                <div class="page-footer__links">
                    <p>Find, join, and follow me in other places</p>
                    <div class="icons label-external">
                        <a href="https://youtube.com/channel/UCXadODjAtT72eYW6xCGyuUA/videos"><span class="inline-icon youtube-logo-bw"></span></a>
                        <a href="https://x.com/irisembury"><span class="inline-icon twitter-logo-bw"></span></a>
                        <a href="https://irisembury.substack.com"><span class="inline-icon substack-logo-bw"></span></a>
                        <a href="https://discord.com/invite/aK83BPKQ5G"><span class="inline-icon discord-logo-bw"></span></a>
                        <a href="https://irisembury.tumblr.com/"><span class="inline-icon tumblr-logo-bw"></span></a>
                        <a href="https://www.patreon.com/cw/irisembury"><span class="inline-icon patreon-logo-bw"></span></a>
                    </div>
                </div>
                <div class="page-footer__about">
                    <p>This site is hosted via <a href="https://github.com/irisembury/irisembury.github.io">GitHub</a>. I have no association with any other person or organization. • Aspects of this site might not load ideally if you're on mobile. If you're a mobile user, I hate you, the small amount of effort I put into making it so things don't break completely is more than you deserve, get off your bed and use a normal computer. • For general inquiry: contact@irisembury.com</p>
                </div>
            </footer>`);
    }
    document.body.insertAdjacentHTML("beforeend", `<div class="lightbox hidden">
            <div class="lb-top-left"><p></p></div>
            <div class="lb-img-wrapper" onclick="setLightbox('close')"><img></div>
            <div class="lb-caption-panel"><p></p></div>
        </div>`
    );
    //interpreter(document.querySelector(".article"));
}
function articleTop() {
    let pageInfo = pagesMeta.find(p => p.url == getDomain());
    if (!pageInfo) {
        return '';
    }
    const articleTopContents = [];
    if (pageInfo.toc) {
        loadToc = true;
    }
    if (pageInfo.wide) {
        HTML.classList.add("wider");
    }
    if (pageInfo.unsetWidth) {
        document.querySelector('.menu .grid .grid').insertAdjacentHTML("beforeend", '<div><label for="unset-width">Unlimited page width:</label><input type="checkbox" class="slide-checkbox" id="unset-width"></div>');
        if (localStorage.getItem("unset-width-" + window.location.pathname) != 'false') {
            document.getElementById("unset-width").checked = true;
            HTML.classList.add("unset-width");
        }
        document.getElementById("unset-width")?.addEventListener("change", function() {
            HTML.classList.toggle(this.id, this.checked);
            localStorage.setItem("unset-width-" + window.location.pathname, this.checked)
            tocUpdate();
        });
    }
    if (pageInfo.title) {
        articleTopContents.push(`<h1 class="for-toc">${ pageInfo.title }</h1>`);
        document.title = pageInfo.title.replaceAll('---', '\u2014').replaceAll('--', '\u2013');
    }
    if (pageInfo.subtitle) {
        articleTopContents.push(`<h2>${ pageInfo.subtitle }</h2>`);
    }
    if (pageInfo.date || pageInfo.mirrors) {
        let by = '<div class="article-byline label-external">';
        if (pageInfo.date) {
            let d1 = new Date(pageInfo.date);
            let d2 = new Date();
            d2.setFullYear(d2.getFullYear() - 2);
            if (d1 < d2) {
                pageInfo.date = '<span class="date-ago">' + pageInfo.date + ' (' + (new Date().getFullYear() - d1.getFullYear()) + '+ years ago)</span>';
            } else {
                pageInfo.date = '<span>' + dateFromISO(pageInfo.date) + '</span>';
            }
            by += pageInfo.date;
        }
        if (pageInfo.mirrors) {
            by += pageInfo.mirrors.split(",").map(m => linkParse(m,2)).join(" ");
        }
        articleTopContents.push(by + '</div>');
    }
    if (articleTopContents.length != 0) {
        return '<div class="article__top">' + articleTopContents.map(i => autoFormat(i)).join("\n") + '</div>';
    }
    return '';
}

window.addEventListener("load", init);

