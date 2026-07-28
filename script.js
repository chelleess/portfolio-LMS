const words = [
    "An Engineer.",
    "A Builder.",
    "A Designer.",
    "A Leader.",
    "A Researcher.",
    "A Product Thinker.",
    "A Photographer.",
    "A Baker.",
    "An UI/UX Designer.",
    "A Learner."
];
 
const typing = document.getElementById("typing");
 
let word = 0;
let letter = 0;
let deleting = false;
 
function animateTyping(){
 
let current = words[word];
 
if(!deleting){
 
typing.textContent=current.substring(0,letter++);
 
if(letter>current.length){
 
deleting=true;
 
setTimeout(animateTyping,1200);
 
return;
 
}
 
}else{
 
typing.textContent=current.substring(0,letter--);
 
if(letter===0){
 
deleting=false;
 
word++;
 
if(word===words.length){
 
word=0;
 
}
 
}
 
}
 
setTimeout(animateTyping,deleting?40:80);
 
}
 
animateTyping();
 
const card = document.querySelector(".passport-card");
 
card.addEventListener("mousemove", (e)=>{
 
    const rect = card.getBoundingClientRect();
 
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
 
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;
 
    card.style.transform =
    `
    perspective(1200px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    `;
 
});
 
card.addEventListener("mouseleave", ()=>{
 
    card.style.transform =
    "perspective(1200px) rotateX(0) rotateY(0)";
 
});
 
const timeline = document.querySelector(".timeline");
 
if(timeline){
    timeline.classList.add("draw");
}
 
const observer = new IntersectionObserver((entries)=>{
 
    entries.forEach(entry=>{
 
        if(entry.isIntersecting){
 
            entry.target.classList.add("show");
 
        }
 
    });
 
},{
    threshold:0.2
});
 
document.querySelectorAll(
".travel-journal,.stop,.timeline"
).forEach(el=>observer.observe(el));
 
const cloud1 = document.querySelector(".cloud1");
const cloud2 = document.querySelector(".cloud2");
const cloud3 = document.querySelector(".cloud3");
 
if (cloud1 || cloud2 || cloud3) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        if (cloud1) cloud1.style.transform = `translate(${x*20}px,${y*15}px)`;
        if (cloud2) cloud2.style.transform = `translate(${x*-25}px,${y*-12}px)`;
        if (cloud3) cloud3.style.transform = `translate(${x*15}px,${y*18}px)`;
    });
}
 
// about me page //
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
 
window.addEventListener("scroll", () => {
 
    let current = "";
 
    sections.forEach(section => {
 
        const sectionTop = section.offsetTop - 150;
 
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
 
    });
 
    navLinks.forEach(link => {
 
        link.classList.remove("active");
 
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
 
    });
 
});
 
const carryOn = document.querySelector(".carry-on");
 
carryOn.addEventListener("click",()=>{
 
    carryOn.classList.toggle("open");
 
});
 
function showTab(tabId, event) {
 
    // Hide all sections
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
 
    // Show selected section
    document.getElementById(tabId).classList.add("active");
 
    // Highlight the matching tab button (works with or without an event)
    document.querySelectorAll(".tabs button").forEach(btn => {
        const handler = btn.getAttribute("onclick") || "";
        btn.classList.toggle("active", handler.includes("'" + tabId + "'"));
    });
}
 
/* ================= PROJECTS — coverflow gallery ================= */
(function () {
 
    const track = document.getElementById("projTrack");
    if (!track) return;                       // section not on this page
 
    const cards   = Array.from(track.querySelectorAll(".proj-card"));
    const caption = document.getElementById("projCaption");
    const dotsBox = document.getElementById("projDots");
    const stage   = document.getElementById("projStage");
 
    let active = Math.min(2, cards.length - 1);   // start roughly centred
 
    // build position dots
    cards.forEach((_, i) => {
        const d = document.createElement("button");
        d.setAttribute("aria-label", "Go to project " + (i + 1));
        d.addEventListener("click", () => go(i));
        dotsBox.appendChild(d);
    });
    const dots = Array.from(dotsBox.children);
 
    function render() {
        cards.forEach((card, i) => {
            const offset = i - active;
            const abs  = Math.abs(offset);
            const sign = Math.sign(offset);
 
            // fanned coverflow steps
            const x   = sign * (abs === 0 ? 0 : abs === 1 ? 200 : abs === 2 ? 350 : 470);
            const z   = abs === 0 ? 0 : abs === 1 ? -90 : abs === 2 ? -240 : -400;
            const rot = -sign * (abs === 0 ? 0 : abs === 1 ? 32 : abs === 2 ? 42 : 48);
            const sc  = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.72 : 0.62;
            const op  = abs > 3 ? 0 : abs === 3 ? 0.4 : 1;
 
            card.style.transform =
                `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${sc})`;
            card.style.opacity      = op;
            card.style.zIndex       = 30 - abs;
            card.style.pointerEvents = abs > 3 ? "none" : "auto";
            card.classList.toggle("is-active", offset === 0);
        });
 
        const c = cards[active];
        caption.querySelector("h3").textContent = c.dataset.title;
        caption.querySelector("p").textContent = c.dataset.desc;
        caption.querySelector(".proj-tags").innerHTML =
            c.dataset.tags.split("·").map(t => `<span>${t.trim()}</span>`).join("");
        caption.querySelector(".proj-link").href = c.dataset.link;
 
        dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
    }
 
    function go(i) {
        active = Math.max(0, Math.min(cards.length - 1, i));
        render();
    }
 
    // tap a card to focus it (handy on touch)
    cards.forEach((card, i) => card.addEventListener("click", () => go(i)));
 
    // MOUSE DIRECTION: the card nearest your cursor becomes active.
    // Move left for earlier projects, right for later ones — no clicking.
    stage.addEventListener("pointermove", (e) => {
        const rect = stage.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;   // 0 left → 1 right
        const idx = Math.round(Math.max(0, Math.min(1, ratio)) * (cards.length - 1));
        if (idx !== active) go(idx);
    });
 
    // keyboard fallback: Tab to the gallery, then arrow keys
    stage.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft")  { e.preventDefault(); go(active - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    });
 
    render();
})();
 
 
/* ================= LIBRARY — books that open ================= */
(function () {
 
    const shelf = document.getElementById("libShelf");
    if (!shelf) return;
 
    const reader   = document.getElementById("libReader");
    const openBook = document.getElementById("openBook");
    const page     = document.getElementById("libPage");
    const coverLbl = document.getElementById("bookCoverLabel");
    const books    = Array.from(shelf.querySelectorAll(".book"));
 
    function openReader(btn) {
        const key = btn.dataset.book;
        const tpl = document.querySelector(`template[data-content="${key}"]`);
        page.innerHTML = tpl ? tpl.innerHTML : "";
 
        // carry the clicked book's colour + title into the reader
        reader.style.setProperty("--spine",  btn.style.getPropertyValue("--spine"));
        reader.style.setProperty("--spine2", btn.style.getPropertyValue("--spine2"));
        coverLbl.textContent = btn.querySelector(".book-title").textContent;
 
        reader.hidden = false;
        document.body.style.overflow = "hidden";     // freeze page scroll behind
 
        // start closed, then swing open on the next frame so the animation plays
        openBook.classList.remove("is-open");
        requestAnimationFrame(() =>
            requestAnimationFrame(() => openBook.classList.add("is-open"))
        );
    }
 
    function closeReader() {
        openBook.classList.remove("is-open");        // shut the cover
        document.body.style.overflow = "";
        setTimeout(() => { reader.hidden = true; }, 450);
    }
 
    books.forEach(b => b.addEventListener("click", () => openReader(b)));
    reader.querySelectorAll("[data-close]").forEach(el =>
        el.addEventListener("click", closeReader)
    );
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !reader.hidden) closeReader();
    });
})();
 

/* ================= DEPARTURES — split-flap board ================= */
(function () {
    const rowsEl = document.getElementById("flapRows");
    if (!rowsEl) return;
 
    const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,'!-:";
    const messages = [
        ["THANK YOU", "FOR FOLLOWING", "MY JOURNEY", ""],
        ["MESSAGE ME", "ABOUT PROJECTS", "ENGINEERING OR", "COLLABORATIONS"]
    ];
 
    let maxCols = 0, numRows = 0;
    messages.forEach(m => { numRows = Math.max(numRows, m.length); m.forEach(l => maxCols = Math.max(maxCols, l.length)); });
 
    // build a fixed grid so the board never resizes
    const cells = [];
    for (let r = 0; r < numRows; r++) {
        const row = document.createElement("div"); row.className = "flap-row";
        const rc = [];
        for (let c = 0; c < maxCols; c++) {
            const cell = document.createElement("div");
            cell.className = "flap-cell"; cell.textContent = " "; cell.dataset.i = "0";
            row.appendChild(cell); rc.push(cell);
        }
        rowsEl.appendChild(row); cells.push(rc);
    }
 
    const pad = (s) => { const t = maxCols - s.length, l = Math.floor(t / 2); return " ".repeat(l) + s + " ".repeat(t - l); };
 
    function flap(cell, ch) {
        let target = CHARS.indexOf(ch); if (target < 0) target = 0;
        let cur = parseInt(cell.dataset.i || "0", 10);
        if (cur === target) return;
        const iv = setInterval(() => {
            cur = (cur + 1) % CHARS.length;
            cell.textContent = CHARS[cur];
            cell.classList.remove("flip"); void cell.offsetWidth; cell.classList.add("flip");
            cell.dataset.i = String(cur);
            if (cur === target) clearInterval(iv);
        }, 45);
    }
 
    function show(i) {
        const m = messages[i];
        for (let r = 0; r < numRows; r++) {
            const line = pad((m[r] || "").toUpperCase());
            for (let c = 0; c < maxCols; c++) {
                const ch = line[c];
                setTimeout(() => flap(cells[r][c], ch), c * 30 + r * 55);
            }
        }
    }
 
    let idx = 0;
    show(0);
    setInterval(() => { idx = (idx + 1) % messages.length; show(idx); }, 6500);
})();
 
 
/* ================= POSTCARD — opens the visitor's email to you ================= */
(function () {
    const form = document.getElementById("pcForm");
    if (!form) return;
 
    const msgEl  = document.getElementById("pcMessage");
    const nameEl = document.getElementById("pcName");
    const fromEl = document.getElementById("pcFrom");
    const statusEl = document.getElementById("pcStatus");
    const stampPick = document.getElementById("pcStampPick");
    let stamp = "✈️";
 
    stampPick.addEventListener("click", (e) => {
        const b = e.target.closest(".pc-stamp");
        if (!b) return;
        stampPick.querySelectorAll(".pc-stamp").forEach(x => x.classList.remove("is-active"));
        b.classList.add("is-active");
        stamp = b.dataset.stamp;
    });
 
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!msgEl.value.trim() || !nameEl.value.trim()) return;
 
        const to = "lavenchellesuherman@gmail.com";              // <- your inbox
        const subject = "Postcard from " + nameEl.value.trim();
        const body =
            msgEl.value.trim() +
            "\n\n— " + nameEl.value.trim() +
            (fromEl.value.trim() ? ", " + fromEl.value.trim() : "") +
            "\nStamp: " + stamp;
 
        window.location.href =
            "mailto:" + to +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
 
        statusEl.hidden = false;
        statusEl.className = "pc-status ok";
        statusEl.textContent = "Opening your email app… thank you for your note ✦";
    });
})();
 