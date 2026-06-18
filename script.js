/* ==========================
   ENVELOPE OPENING
========================== */

const envelope = document.getElementById("openInvitation");
const envelopeScreen = document.getElementById("envelopeScreen");
const music = document.getElementById("bgMusic");

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {

        envelopeScreen.style.opacity = "0";

        setTimeout(() => {
            envelopeScreen.style.display = "none";

            music.play().catch(() => {
                console.log("Autoplay blocked until user interaction.");
            });

        }, 1000);

    }, 1000);

});

/* ==========================
   COUNTDOWN
========================== */

const targetDate = new Date("June 30, 2026 19:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = targetDate - now;

    document.getElementById("days").innerText =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerText =
        Math.floor((distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60));

    document.getElementById("minutes").innerText =
        Math.floor((distance % (1000 * 60 * 60))
        / (1000 * 60));

    document.getElementById("seconds").innerText =
        Math.floor((distance % (1000 * 60)) / 1000);

}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ==========================
   SCROLL ANIMATIONS
========================== */

const sections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

/* ==========================
   RSVP FORM
========================== */

const form = document.getElementById("rsvpForm");
const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    modal.style.display = "flex";

    form.reset();

});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

/* ==========================
   COMMUNICATION NETWORK
========================== */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<60;i++){

    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        vx:(Math.random()-0.5)*0.4,
        vy:(Math.random()-0.5)*0.4
    });

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.x += p.vx;
        p.y += p.vy;

        if(p.x<0 || p.x>canvas.width) p.vx *= -1;
        if(p.y<0 || p.y>canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x,p.y,2,0,Math.PI*2);
        ctx.fillStyle = "#d4af37";
        ctx.fill();

    });

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < 120){

                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.strokeStyle = "rgba(212,175,55,0.15)";
                ctx.stroke();

            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
