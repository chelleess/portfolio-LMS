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