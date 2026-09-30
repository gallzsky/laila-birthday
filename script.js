/* ============================================================
   BIRTHDAY WEBSITE - LAILA INDAH ANGGRAINI
   JavaScript: Interactions, Animations, Password, Confetti
   ============================================================ */

// ==================== PASSWORD ====================
const CORRECT_PASSWORD = "101222";

function checkPassword() {
  const input = document.getElementById("pw-input").value.trim();
  const errorEl = document.getElementById("pw-error");

  if (input === CORRECT_PASSWORD) {
    errorEl.textContent = "";
    launchTransition();
  } else {
    errorEl.textContent = "❌ Kode salah, coba lagi sayang~";
    errorEl.style.animation = "none";
    requestAnimationFrame(() => {
      errorEl.style.animation = "shake 0.5s ease";
    });
    document.getElementById("pw-input").value = "";
    document.getElementById("pw-input").focus();

    // Shake input
    const inp = document.getElementById("pw-input");
    inp.style.borderColor = "#ff6b6b";
    inp.style.boxShadow = "0 0 0 4px rgba(255,107,107,0.2)";
    setTimeout(() => {
      inp.style.borderColor = "";
      inp.style.boxShadow = "";
    }, 1500);
  }
}

document.getElementById("pw-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

function launchTransition() {
  const overlay = document.getElementById("transition-overlay");
  overlay.classList.add("active");

  setTimeout(() => {
    document.getElementById("password-screen").classList.remove("active");
    document.getElementById("birthday-screen").classList.add("active");
    initBirthdayScreen();
    setTimeout(() => {
      overlay.classList.remove("active");
    }, 600);
  }, 700);
}

// ==================== INIT BIRTHDAY ====================
function initBirthdayScreen() {
  startConfetti();
  initFloatingElements();
  startTypingName();
  initCandles();
  initStarWishes();
  initMemoryCards();
  initScrollAnimations();
  spawnFloatingHearts();
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");

        // Letter card reveal
        const card = entry.target.querySelector(".letter-card");
        if (card) {
          setTimeout(() => card.classList.add("visible"), 300);
        }

        // Memory cards reveal
        const memCards = entry.target.querySelectorAll(".mem-card");
        memCards.forEach((c, i) => {
          setTimeout(() => c.classList.add("visible"), i * 150 + 200);
        });
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(s => observer.observe(s));
}

// ==================== TYPING ANIMATION ====================
function startTypingName() {
  const name = "Laila Indah Anggraini";
  const el = document.getElementById("typing-name");
  let i = 0;

  function type() {
    if (i < name.length) {
      el.textContent += name[i];
      i++;
      setTimeout(type, 80);
    } else {
      // Add blinking cursor effect then remove
      el.style.borderRight = "3px solid #ff6eb4";
      setTimeout(() => { el.style.borderRight = "none"; }, 2000);
    }
  }

  setTimeout(type, 800);
}

// ==================== CONFETTI ====================
let confettiActive = false;
let confettiCtx = null;
let confettiParticles = [];

function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  confettiCtx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Create initial burst
  for (let i = 0; i < 150; i++) {
    confettiParticles.push(createConfetti(true));
  }

  confettiActive = true;
  animateConfetti();

  // Stop initial burst after 5s, but keep a slow trickle
  setTimeout(() => {
    confettiParticles = confettiParticles.filter(p => p.y < canvas.height);
  }, 5000);
}

function createConfetti(burst = false) {
  const colors = ["#ff6eb4","#c084fc","#fbbf24","#fb7185","#a7f3d0","#fed7aa","#fff","#f9a8d4","#818cf8"];
  const shapes = ["circle","square","triangle","heart","star"];
  return {
    x: Math.random() * window.innerWidth,
    y: burst ? Math.random() * window.innerHeight * 0.3 - window.innerHeight * 0.1 : -20,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 1.5,
    size: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 6,
    opacity: 1,
    gravity: 0.08,
    wobble: Math.random() * 0.1,
    wobbleSpeed: Math.random() * 0.05,
    wobbleAngle: Math.random() * Math.PI * 2,
  };
}

function drawConfettiParticle(ctx, p) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.strokeStyle = p.color;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);

  switch (p.shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "square":
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      break;
    case "triangle":
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.lineTo(p.size / 2, p.size / 2);
      ctx.lineTo(-p.size / 2, p.size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    case "heart":
      ctx.font = `${p.size * 1.5}px Arial`;
      ctx.fillText("❤", -p.size / 2, p.size / 2);
      break;
    case "star":
      ctx.font = `${p.size * 1.5}px Arial`;
      ctx.fillText("★", -p.size / 2, p.size / 2);
      break;
  }
  ctx.restore();
}

function animateConfetti() {
  if (!confettiActive) return;
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = confettiCtx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add new confetti slowly
  if (Math.random() < 0.4 && confettiParticles.length < 200) {
    confettiParticles.push(createConfetti(false));
  }

  confettiParticles = confettiParticles.filter(p => {
    p.wobbleAngle += p.wobbleSpeed;
    p.x += p.vx + Math.sin(p.wobbleAngle) * 2;
    p.vy += p.gravity;
    p.y += p.vy;
    p.rotation += p.rotSpeed;

    if (p.y > canvas.height + 20) return false;

    drawConfettiParticle(ctx, p);
    return true;
  });

  requestAnimationFrame(animateConfetti);
}

// ==================== PARTICLES (PASSWORD SCREEN) ====================
(function initPasswordParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const emojis = ["✨","⭐","💖","🌸","💕","🌟","🎀","💝"];

  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 16 + 10,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.4 + 0.1,
    });
  }

  function draw() {
    if (document.getElementById("password-screen").style.display === "none") return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px Arial`;
      ctx.fillText(p.emoji, p.x, p.y);
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -30) { p.y = canvas.height + 30; p.x = Math.random() * canvas.width; }
      if (p.x < -30) p.x = canvas.width + 30;
      if (p.x > canvas.width + 30) p.x = -30;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ==================== FLOATING ELEMENTS ====================
function initFloatingElements() {
  const container = document.getElementById("floating-elements");
  const items = ["🌸","💫","✨","⭐","💖","🎀","🌟","💕","🎊","🎉","💝","🌺","🦋","🌈"];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement("div");
    el.className = "float-el";
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${4 + Math.random() * 6}s;
      --del: ${Math.random() * 4}s;
      --sz: ${0.8 + Math.random() * 1.5}rem;
      --mx: ${(Math.random() - 0.5) * 60}px;
      --my: ${(Math.random() - 0.5) * 60}px;
      --rot: ${(Math.random() - 0.5) * 30}deg;
    `;
    container.appendChild(el);
  }
}

// ==================== CANDLE GAME ====================
let totalCandles = 7;
let blownCandles = 0;
const candleMessages = [
  "Wah satu lilin ditiup! 🌬️",
  "Dua lilin! Semangat! 💪",
  "Tiga! Hampir setengah nih! 🎉",
  "Empat! Persis setengah! 😄",
  "Lima! Udah hampir! 🔥",
  "Hampir selesai! Satu lagi! ✨",
  "🎊 Yeay! Semua lilin padam! Buat permintaan sekarang! 🥰💖",
];

function initCandles() {
  const row = document.getElementById("candles-row");
  row.innerHTML = "";
  blownCandles = 0;

  for (let i = 0; i < totalCandles; i++) {
    const candle = document.createElement("div");
    candle.className = "candle-item";
    candle.id = `candle-${i}`;
    candle.innerHTML = `
      <div class="candle-flame" id="flame-${i}">🔥</div>
      <div class="candle-body" style="background: linear-gradient(180deg, ${randomCandleColor()}, ${randomCandleColor()});"></div>
    `;
    candle.addEventListener("click", () => blowCandle(i));
    row.appendChild(candle);
  }

  document.getElementById("candle-msg").textContent = "Klik lilin untuk meniupnya! 🕯️";
  document.getElementById("reset-candles").classList.add("hidden");
}

function randomCandleColor() {
  const colors = ["#f9a8d4","#c4b5fd","#fde68a","#fed7aa","#a7f3d0","#fb7185","#818cf8"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function blowCandle(index) {
  const flame = document.getElementById(`flame-${index}`);
  if (flame.classList.contains("blown")) return;

  flame.classList.add("blown");
  blownCandles++;

  // Puff effect
  createPuff(document.getElementById(`candle-${index}`));

  document.getElementById("candle-msg").textContent = candleMessages[blownCandles - 1];

  if (blownCandles === totalCandles) {
    document.getElementById("reset-candles").classList.remove("hidden");
    // Launch mini confetti
    for (let i = 0; i < 60; i++) {
      confettiParticles.push(createConfetti(false));
    }
  }
}

function createPuff(el) {
  const rect = el.getBoundingClientRect();
  const puff = document.createElement("div");
  puff.textContent = "💨";
  puff.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    font-size: 2rem;
    pointer-events: none;
    z-index: 999;
    animation: puff-away 0.8s ease forwards;
  `;
  document.body.appendChild(puff);

  if (!document.getElementById("puff-style")) {
    const style = document.createElement("style");
    style.id = "puff-style";
    style.textContent = `
      @keyframes puff-away {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -200%) scale(1.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => puff.remove(), 800);
}

function resetCandles() {
  initCandles();
}

// ==================== STAR WISHES ====================
const wishes = [
  { emoji: "🌟", text: "Kamu akan meraih semua impianmu tahun ini! Semangat terus ya! 💪✨" },
  { emoji: "💖", text: "Hidupmu akan selalu penuh cinta dan kebahagiaan yang melimpah! 🥰" },
  { emoji: "🌸", text: "Kesehatan sempurna untukmu, tubuh selalu fit dan semangat! 🌿" },
  { emoji: "🎓", text: "Karir dan studimu makin cemerlang, sukses terus! 📚🏆" },
  { emoji: "🍀", text: "Keberuntungan selalu mengikutimu ke mana pun kamu pergi! 🌈" },
  { emoji: "💫", text: "Semua yang kamu rencanakan akan terwujud lebih indah dari yang kamu bayangkan! 🌙" },
  { emoji: "🌈", text: "Setiap hari akan terasa seperti pelangi setelah hujan — indah dan berwarna! 🌤️" },
  { emoji: "🦋", text: "Kamu akan tumbuh, berkembang, dan jadi versi terbaik dari dirimu! 🌺" },
  { emoji: "🎊", text: "Kebahagiaan itu hak kamu. Dan kamu layak mendapatkan yang terbaik! 💝🎉" },
];

function initStarWishes() {
  const grid = document.getElementById("stars-grid");
  grid.innerHTML = "";

  const starEmojis = ["⭐","🌟","💫","✨","🌠","⭐","💛","🌟","⭐"];

  wishes.forEach((wish, i) => {
    const btn = document.createElement("button");
    btn.className = "star-btn";
    btn.textContent = starEmojis[i % starEmojis.length];
    btn.title = `Bintang ${i + 1}`;
    btn.addEventListener("click", () => revealWish(i, btn));
    grid.appendChild(btn);
  });
}

let selectedWish = -1;

function revealWish(index, btn) {
  // Reset previous
  document.querySelectorAll(".star-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  const wish = wishes[index];
  const emojiEl = document.getElementById("wish-emoji");
  const textEl = document.getElementById("wish-text");

  emojiEl.style.animation = "none";
  requestAnimationFrame(() => {
    emojiEl.style.animation = "wish-spin 0.6s cubic-bezier(0.34,1.56,0.64,1)";
    emojiEl.textContent = wish.emoji;
    textEl.textContent = wish.text;
  });

  // Small burst
  for (let i = 0; i < 20; i++) {
    confettiParticles.push(createConfetti(false));
  }
}

// ==================== MEMORY CARDS ====================
const memories = [
  { emoji: "🥰", label: "Pertama Kali Ketemu", bg: "linear-gradient(135deg,#ff6eb4,#c084fc)" },
  { emoji: "🌙", label: "Malam yang Berkesan", bg: "linear-gradient(135deg,#818cf8,#6366f1)" },
  { emoji: "🍜", label: "Makan Bareng", bg: "linear-gradient(135deg,#fbbf24,#f59e0b)" },
  { emoji: "💌", label: "Chat Tengah Malam", bg: "linear-gradient(135deg,#fb7185,#e11d48)" },
  { emoji: "🎵", label: "Lagu Kita", bg: "linear-gradient(135deg,#34d399,#059669)" },
  { emoji: "🌸", label: "Momen Lucu Kita", bg: "linear-gradient(135deg,#f9a8d4,#ec4899)" },
];

function initMemoryCards() {
  const container = document.getElementById("memory-cards");
  container.innerHTML = "";

  memories.forEach((mem, i) => {
    const card = document.createElement("div");
    card.className = "mem-card";
    card.style.background = mem.bg;
    card.innerHTML = `
      <div class="mem-emoji">${mem.emoji}</div>
      <div class="mem-label">${mem.label}</div>
    `;
    card.addEventListener("click", () => {
      card.style.transform = "scale(1.15) rotate(3deg)";
      setTimeout(() => { card.style.transform = ""; }, 300);
      for (let j = 0; j < 15; j++) confettiParticles.push(createConfetti(false));
    });
    container.appendChild(card);
  });
}

// ==================== FIREWORKS ====================
function launchFireworks() {
  // Big confetti burst
  for (let i = 0; i < 200; i++) {
    const p = createConfetti(false);
    p.vy = -Math.random() * 10 - 5;
    p.x = Math.random() * window.innerWidth;
    p.y = window.innerHeight;
    confettiParticles.push(p);
  }

  // Heart rain
  const rainContainer = document.getElementById("heart-rain");
  const heartEmojis = ["💖","💕","💗","💝","🌸","✨","🌟"];

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "hr-heart";
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
      font-size: ${1 + Math.random() * 2}rem;
    `;
    rainContainer.appendChild(heart);
  }

  setTimeout(() => { rainContainer.innerHTML = ""; }, 5000);
}

// ==================== FLOATING HEARTS (password) ====================
function spawnFloatingHearts() {
  // continuously add floating elements to birthday screen
  const container = document.getElementById("floating-elements");
  const hearts = ["💖","💕","🌸","⭐","✨"];

  setInterval(() => {
    if (document.getElementById("birthday-screen").classList.contains("active")) {
      const h = document.createElement("div");
      h.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -30px;
        font-size: ${1 + Math.random() * 1.5}rem;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
        animation: float-up ${5 + Math.random() * 5}s ease-in forwards;
      `;
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 11000);
    }
  }, 800);
}

// ==================== MUSIC ====================
let musicPlaying = false;
let audioContext = null;
let musicInterval = null;

function toggleMusic() {
  const btn = document.getElementById("music-btn");

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    playBirthdayTune();
    musicPlaying = true;
    btn.textContent = "🎵";
    btn.classList.remove("muted");
  } else if (musicPlaying) {
    audioContext.suspend();
    musicPlaying = false;
    btn.textContent = "🔇";
    btn.classList.add("muted");
  } else {
    audioContext.resume();
    musicPlaying = true;
    btn.textContent = "🎵";
    btn.classList.remove("muted");
  }
}

function playBirthdayTune() {
  // Happy Birthday to You - simplified notes
  const notes = [
    // Happy Birthday to You
    {freq: 262, dur: 0.3}, {freq: 262, dur: 0.1}, {freq: 294, dur: 0.4}, {freq: 262, dur: 0.4},
    {freq: 349, dur: 0.4}, {freq: 330, dur: 0.8},
    {freq: 262, dur: 0.3}, {freq: 262, dur: 0.1}, {freq: 294, dur: 0.4}, {freq: 262, dur: 0.4},
    {freq: 392, dur: 0.4}, {freq: 349, dur: 0.8},
    {freq: 262, dur: 0.3}, {freq: 262, dur: 0.1}, {freq: 523, dur: 0.4}, {freq: 440, dur: 0.4},
    {freq: 349, dur: 0.4}, {freq: 330, dur: 0.4}, {freq: 294, dur: 0.8},
    {freq: 466, dur: 0.3}, {freq: 466, dur: 0.1}, {freq: 440, dur: 0.4}, {freq: 349, dur: 0.4},
    {freq: 392, dur: 0.4}, {freq: 349, dur: 1.0},
    // Rest
    {freq: 0, dur: 0.5},
  ];

  function playSequence() {
    if (!audioContext || audioContext.state === "suspended") return;
    let t = audioContext.currentTime;

    notes.forEach(note => {
      if (note.freq > 0) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(note.freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.dur - 0.02);

        osc.start(t);
        osc.stop(t + note.dur);
      }
      t += note.dur;
    });

    // Loop
    musicInterval = setTimeout(playSequence, t * 1000 - audioContext.currentTime * 1000 + 500);
  }

  playSequence();
}

// ==================== SCROLL HELPER ====================
function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ==================== BALLOON CLICK ====================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".balloon").forEach(b => {
    b.addEventListener("click", () => {
      b.style.transform = "scale(0)";
      b.style.transition = "transform 0.2s";

      // Confetti burst
      for (let i = 0; i < 20; i++) {
        confettiParticles.push(createConfetti(false));
      }

      setTimeout(() => {
        b.style.transform = "";
        b.textContent = ["🎈","🎊","💝","🎀","🌟"][Math.floor(Math.random() * 5)];
      }, 200);
    });
  });

  // Cake click
  const cake = document.getElementById("cake-anim");
  if (cake) {
    cake.addEventListener("click", () => {
      for (let i = 0; i < 40; i++) confettiParticles.push(createConfetti(false));
    });
  }

  // Auto-start password particle animation
  // (already initialized at top)
});

// Prevent right-click on password screen
document.addEventListener("contextmenu", (e) => {
  if (document.getElementById("password-screen").classList.contains("active")) {
    e.preventDefault();
  }
});
