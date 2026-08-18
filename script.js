const petals = document.getElementById("petals");

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > 0.35 ? "🌸" : "💗";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = 12 + Math.random() * 18 + "px";
  petal.style.animationDuration = 5 + Math.random() * 6 + "s";
  petal.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
  petals.appendChild(petal);
  setTimeout(() => petal.remove(), 12000);
}

setInterval(createPetal, 650);
for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 250);

const modal = document.getElementById("surpriseModal");
const openModal = () => {
  modal.classList.add("show");
  celebrate();
};

document.getElementById("surpriseBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("show"));
document.getElementById("modalCelebrate").addEventListener("click", () => {
  modal.classList.remove("show");
  celebrate();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

const gifts = document.querySelectorAll(".gift");
const giftResult = document.getElementById("giftResult");
let winningGift = Math.floor(Math.random() * gifts.length);

gifts.forEach(gift => {
  gift.addEventListener("click", () => {
    const choice = Number(gift.dataset.gift);
    gift.classList.add("opened");

    if (choice === winningGift) {
      gift.textContent = "💖";
      giftResult.textContent = "You found it! Your secret message: You are officially amazing. 🎉";
      celebrate();
    } else {
      gift.textContent = "✨";
      giftResult.textContent = "Not this one 😂 Try another gift!";
    }
  });
});

document.getElementById("resetGift").addEventListener("click", () => {
  winningGift = Math.floor(Math.random() * gifts.length);
  gifts.forEach(g => {
    g.textContent = "🎁";
    g.classList.remove("opened");
  });
  giftResult.textContent = "";
});

const quizResult = document.getElementById("quizResult");
document.querySelectorAll(".quiz-option").forEach(option => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
    option.classList.add("selected");
    quizResult.textContent = `Correct answer! ${option.textContent} is definitely your birthday personality 😂💗`;
  });
});

document.getElementById("wishBtn").addEventListener("click", () => {
  document.getElementById("wishResult").textContent =
    "✨ Wish received! May it come true sooner than you expect. Ameen. 💗";
  celebrate();
});

document.getElementById("confettiBtn").addEventListener("click", celebrate);

function celebrate() {
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const piece = document.createElement("span");
      piece.className = "petal";
      piece.textContent = ["💗", "✨", "🌸", "🎉", "💕"][Math.floor(Math.random() * 5)];
      piece.style.left = 20 + Math.random() * 60 + "vw";
      piece.style.top = 20 + Math.random() * 20 + "vh";
      piece.style.fontSize = 14 + Math.random() * 20 + "px";
      piece.style.animationDuration = 2 + Math.random() * 2 + "s";
      piece.style.setProperty("--drift", (Math.random() * 400 - 200) + "px");
      petals.appendChild(piece);
      setTimeout(() => piece.remove(), 4500);
    }, i * 20);
  }
}

// The music button uses a tiny browser-generated tone, so no audio file is required.
let audioContext;
let musicOn = false;
let musicTimer;

function playTone() {
  if (!musicOn) return;
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [523.25, 659.25, 783.99, 659.25];
  const now = audioContext.currentTime;
  notes.forEach((freq, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.0001, now + i * .35);
    gain.gain.exponentialRampToValueAtTime(.045, now + i * .35 + .03);
    gain.gain.exponentialRampToValueAtTime(.0001, now + i * .35 + .3);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now + i * .35);
    osc.stop(now + i * .35 + .32);
  });
}

document.getElementById("musicBtn").addEventListener("click", async () => {
  musicOn = !musicOn;
  const btn = document.getElementById("musicBtn");
  btn.textContent = musicOn ? "🔊" : "🎵";

  if (musicOn) {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") await audioContext.resume();
    playTone();
    musicTimer = setInterval(playTone, 1400);
  } else {
    clearInterval(musicTimer);
  }
});