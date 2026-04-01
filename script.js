let currentPage = 1;

// TYPEWRITER
const text = "Hey Tuba❤️\nI made this just for you...";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}
typeWriter();

// START
function startExperience() {
  document.getElementById("bgMusic").play();
  nextPage();
}

// PAGE TRANSITION
function nextPage() {
  document.getElementById("page" + currentPage).classList.remove("active");
  currentPage++;
  document.getElementById("page" + currentPage).classList.add("active");

  if (currentPage === 2) createBalloons();
}

// BALLOONS
const data = [
  {
    msg: "You are amazing 💖",
    img: "tuba1.jpeg"
  },
  {
    msg: "I love you ❤️",
    img: "tuba2.jpeg"
  },
  {
    msg: "My happiness 😊",
    img: "tuba3.jpeg"
  },
  {
    msg: "Forever yours 💍",
    img: "tuba4.jpeg"
  },
  {
    msg: "My everything 💕",
    img: "tuba5.jpeg"
  }
];

let popped = 0;

function createBalloons() {
  const container = document.getElementById("balloons");

  // CLEAR OLD (IMPORTANT)
  container.innerHTML = "";

  popped = 0;

  data.forEach((item) => {
    let b = document.createElement("div");
    b.className = "balloon";

    // SAFE RANDOM POSITION (inside container)
    const maxX = container.clientWidth - 80;
    const maxY = container.clientHeight - 100;

    b.style.left = Math.random() * maxX + "px";
    b.style.top = Math.random() * maxY + "px";

    b.onclick = () => {
      const sound = document.getElementById("popSound");
      if (sound) sound.play();

      b.classList.add("pop");

      document.getElementById("messageBox").innerHTML = `
        <img src="${item.img}" style="width:100px;border-radius:10px;margin-bottom:10px;">
        <p>${item.msg}</p>
      `;

      popped++;

      setTimeout(() => b.remove(), 400);

      if (popped === data.length) {
        setTimeout(() => nextPage(), 800);
      }
    };

    container.appendChild(b);
  });
}
// FINAL MESSAGE
function showFinalMessage() {
  document.getElementById("finalPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("finalPopup").style.display = "none";
}

// HEARTS
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

for (let i = 0; i < 60; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4,
    speed: Math.random() * 1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach(h => {
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
    ctx.fill();

    h.y -= h.speed;
    if (h.y < 0) h.y = canvas.height;
  });

  requestAnimationFrame(animate);
}
animate();
// LIGHTBOX FUNCTION
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightboxImg").src = img.src;
  });
});

document.getElementById("lightbox").onclick = () => {
  document.getElementById("lightbox").style.display = "none";
};