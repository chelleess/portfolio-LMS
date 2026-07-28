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

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth)-0.5;

const y=(e.clientY/window.innerHeight)-0.5;

document.querySelector(".cloud1").style.transform=
`translate(${x*20}px,${y*15}px)`;

document.querySelector(".cloud2").style.transform=
`translate(${x*-25}px,${y*-12}px)`;

document.querySelector(".cloud3").style.transform=
`translate(${x*15}px,${y*18}px)`;

});

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

    // Remove active button
    document.querySelectorAll(".tabs button").forEach(btn => {
        btn.classList.remove("active");
    });

    // Show selected section
    document.getElementById(tabId).classList.add("active");

    // Highlight selected button
    event.target.classList.add("active");
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

caption.querySelector("p").innerHTML =
    c.querySelector(".project-description").innerHTML;