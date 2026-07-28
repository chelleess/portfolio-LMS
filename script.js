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