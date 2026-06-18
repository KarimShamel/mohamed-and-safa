/* =========================================
   MOHAMED & SAFA ENGAGEMENT WEBSITE
   script.js
========================================= */

/* =========================================
   OPENING CURTAINS + MUSIC
========================================= */

const curtainContainer = document.getElementById("curtainContainer");
const music = document.getElementById("bgMusic");

if (curtainContainer) {

    curtainContainer.addEventListener("click", () => {

        curtainContainer.classList.add("curtain-open");

        setTimeout(() => {

            curtainContainer.style.opacity = "0";
            curtainContainer.style.transition = "1s";

            setTimeout(() => {

                curtainContainer.style.display = "none";

                if (music) {
                    music.play().catch(() => {
                        console.log("Autoplay blocked by browser.");
                    });
                }

            }, 1000);

        }, 1500);

    });

}

/* =========================================
   COUNTDOWN TIMER
========================================= */

const targetDate = new Date("June 30, 2026 19:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const fadeElements = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },

    {
        threshold: 0.15
    }

);

fadeElements.forEach(element => {
    observer.observe(element);
});

/* =========================================
   COMMUNICATIONS NETWORK BACKGROUND
========================================= */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const particles = [];
const particleCount = 65;

for (let i = 0; i < particleCount; i++) {

    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 2
    });

}

function drawParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {
            particle.vx *= -1;
        }

        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {
            particle.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();

    });

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            if (distance < 140) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(255,255,255,${
                        0.15 - distance / 1000
                    })`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }

    requestAnimationFrame(drawParticles);
}

drawParticles();

/* =========================================
   GALLERY IMAGE HOVER EFFECT
========================================= */

const galleryImages = document.querySelectorAll(".gallery-item");

galleryImages.forEach((item) => {

    item.addEventListener("mousemove", (e) => {

        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        item.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

    });

    item.addEventListener("mouseleave", () => {

        item.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});

/* =========================================
   FLOATING HEARTS
========================================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "❤";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.color = "#ffffff";
    heart.style.opacity = "0.25";
    heart.style.fontSize =
        Math.random() * 15 + 10 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "-1";

    document.body.appendChild(heart);

    let position = -30;

    const animation = setInterval(() => {

        position += 2;

        heart.style.bottom = position + "px";

        if (position > window.innerHeight + 50) {

            clearInterval(animation);
            heart.remove();

        }

    }, 30);

}

setInterval(createHeart, 1800);
