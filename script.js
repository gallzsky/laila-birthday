/* ============================================================
   BIRTHDAY WEBSITE - LAILA INDAH ANGGRAINI
   Script v2 - Simplified & Bulletproof
   ============================================================ */

const CORRECT_PASSWORD = "101222";

// ==================== WAIT FOR DOM ====================
document.addEventListener("DOMContentLoaded", function() {

  // Pasang event listener password input
  var pwInput = document.getElementById("pw-input");
  if (pwInput) {
    pwInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") checkPassword();
    });
  }

  // Mulai animasi partikel di password screen
  startPasswordParticles();

});

// ==================== PASSWORD ====================
function checkPassword() {
  var input = document.getElementById("pw-input").value.trim();
  var errorEl = document.getElementById("pw-error");

  if (input === CORRECT_PASSWORD) {
    errorEl.textContent = "✅ Benar! Membuka kejutan...";
    errorEl.style.color = "#a7f3d0";

    // Transisi sederhana
    setTimeout(function() {
      document.getElementById("password-screen").style.display = "none";
      var bs = document.getElementById("birthday-screen");
      bs.style.display = "block";
      bs.classList.add("active");
      initBirthdayScreen();
    }, 800);

  } else {
    // Password salah
    errorEl.textContent = "❌ Kode salah, coba lagi sayang~";
    errorEl.style.color = "#ff6b6b";

    var inp = document.getElementById("pw-input");
    inp.value = "";
    inp.style.borderColor = "#ff6b6b";
    inp.style.boxShadow = "0 0 0 4px rgba(255,107,107,0.25)";
    setTimeout(function() {
      inp.style.borderColor = "";
      inp.style.boxShadow = "";
      inp.focus();
    }, 1500);
  }
}

// ==================== PASSWORD PARTICLES ====================
function startPasswordParticles() {
  var canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  var emojis = ["✨","⭐","💖","🌸","💕","🌟","🎀","💝"];
  var particles = [];
  for (var i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * 16 + 10,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.4 + 0.1,
    });
  }

  function draw() {
    var pwScreen = document.getElementById("password-screen");
    if (!pwScreen || pwScreen.style.display === "none") return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = p.size + "px Arial";
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
  startHeartSpawner();
  attachBalloonClicks();

  var cake = document.getElementById("cake-anim");
  if (cake) {
    cake.addEventListener("click", function() {
      burstConfetti(40);
    });
  }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  var sections = document.querySelectorAll(".section");
  if (!("IntersectionObserver" in window)) {
    sections.forEach(function(s) { s.classList.add("section-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        var card = entry.target.querySelector(".letter-card");
        if (card) setTimeout(function() { card.classList.add("visible"); }, 300);
        var memCards = entry.target.querySelectorAll(".mem-card");
        memCards.forEach(function(c, i) {
          setTimeout(function() { c.classList.add("visible"); }, i * 150 + 200);
        });
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(function(s) { observer.observe(s); });
}

// ==================== TYPING ANIMATION ====================
function startTypingName() {
  var name = "Laila Indah Anggraini";
  var el = document.getElementById("typing-name");
  if (!el) return;
  var i = 0;
  function type() {
    if (i < name.length) {
      el.textContent += name[i];
      i++;
      setTimeout(type, 80);
    } else {
      el.style.borderRight = "3px solid #ff6eb4";
      setTimeout(function() { el.style.borderRight = "none"; }, 2000);
    }
  }
  setTimeout(type, 800);
}

// ==================== CONFETTI ====================
var confettiCtx = null;
var confettiParticles = [];
var confettiRunning = false;

function startConfetti() {
  var canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  confettiCtx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  burstConfetti(150);
  confettiRunning = true;
  animateConfetti();
}

function burstConfetti(count) {
  for (var i = 0; i < count; i++) {
    confettiParticles.push(makeParticle(true));
  }
}

function makeParticle(fromTop) {
  var colors = ["#ff6eb4","#c084fc","#fbbf24","#fb7185","#a7f3d0","#fed7aa","#ffffff","#f9a8d4","#818cf8"];
  var shapes = ["circle","square","triangle"];
  return {
    x: Math.random() * window.innerWidth,
    y: fromTop ? (Math.random() * window.innerHeight * 0.3 - 50) : -20,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 1.5,
    size: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 6,
    opacity: 1,
    gravity: 0.08,
    wobbleAngle: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.05,
  };
}

function animateConfetti() {
  if (!confettiRunning) return;
  var canvas = document.getElementById("confetti-canvas");
  if (!canvas || !confettiCtx) { requestAnimationFrame(animateConfetti); return; }

  confettiCtx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.3 && confettiParticles.length < 150) {
    confettiParticles.push(makeParticle(false));
  }

  var alive = [];
  confettiParticles.forEach(function(p) {
    p.wobbleAngle += p.wobbleSpeed;
    p.x += p.vx + Math.sin(p.wobbleAngle) * 1.5;
    p.vy += p.gravity;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    if (p.y > canvas.height + 20) return;

    confettiCtx.save();
    confettiCtx.globalAlpha = p.opacity;
    confettiCtx.fillStyle = p.color;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rotation * Math.PI / 180);
    if (p.shape === "circle") {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      confettiCtx.fill();
    } else if (p.shape === "square") {
      confettiCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
    } else {
      confettiCtx.beginPath();
      confettiCtx.moveTo(0, -p.size/2);
      confettiCtx.lineTo(p.size/2, p.size/2);
      confettiCtx.lineTo(-p.size/2, p.size/2);
      confettiCtx.closePath();
      confettiCtx.fill();
    }
    confettiCtx.restore();
    alive.push(p);
  });
  confettiParticles = alive;
  requestAnimationFrame(animateConfetti);
}

// ==================== FLOATING ELEMENTS ====================
function initFloatingElements() {
  var container = document.getElementById("floating-elements");
  if (!container) return;
  var items = ["🌸","💫","✨","⭐","💖","🎀","🌟","💕","🎊","🎉","💝","🌺","🦋"];
  for (var i = 0; i < 18; i++) {
    var el = document.createElement("div");
    el.className = "float-el";
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.cssText =
      "left:" + (Math.random() * 100) + "%;" +
      "top:" + (Math.random() * 100) + "%;" +
      "--dur:" + (4 + Math.random() * 6) + "s;" +
      "--del:" + (Math.random() * 4) + "s;" +
      "--sz:" + (0.8 + Math.random() * 1.5) + "rem;" +
      "--mx:" + ((Math.random() - 0.5) * 60) + "px;" +
      "--my:" + ((Math.random() - 0.5) * 60) + "px;" +
      "--rot:" + ((Math.random() - 0.5) * 30) + "deg;";
    container.appendChild(el);
  }
}

// ==================== CANDLE GAME ====================
var totalCandles = 7;
var blownCandles = 0;
var candleMessages = [
  "Wah satu lilin ditiup! 🌬️",
  "Dua lilin! Semangat! 💪",
  "Tiga! Hampir setengah nih! 🎉",
  "Empat! Persis setengah! 😄",
  "Lima! Udah hampir! 🔥",
  "Hampir selesai! Satu lagi! ✨",
  "🎊 Yeay! Semua lilin padam! Buat permintaan! 🥰💖",
];

function initCandles() {
  var row = document.getElementById("candles-row");
  if (!row) return;
  row.innerHTML = "";
  blownCandles = 0;

  var candleColors = ["#f9a8d4","#c4b5fd","#fde68a","#fed7aa","#a7f3d0","#fb7185","#818cf8"];
  for (var i = 0; i < totalCandles; i++) {
    (function(idx) {
      var candle = document.createElement("div");
      candle.className = "candle-item";
      candle.id = "candle-" + idx;
      var c1 = candleColors[Math.floor(Math.random() * candleColors.length)];
      var c2 = candleColors[Math.floor(Math.random() * candleColors.length)];
      candle.innerHTML =
        '<div class="candle-flame" id="flame-' + idx + '">🔥</div>' +
        '<div class="candle-body" style="background:linear-gradient(180deg,' + c1 + ',' + c2 + ')"></div>';
      candle.addEventListener("click", function() { blowCandle(idx); });
      row.appendChild(candle);
    })(i);
  }

  var msg = document.getElementById("candle-msg");
  if (msg) msg.textContent = "Klik lilin untuk meniupnya! 🕯️";
  var resetBtn = document.getElementById("reset-candles");
  if (resetBtn) resetBtn.classList.add("hidden");
}

function blowCandle(index) {
  var flame = document.getElementById("flame-" + index);
  if (!flame || flame.classList.contains("blown")) return;
  flame.classList.add("blown");
  blownCandles++;

  // Puff emoji popup
  var candleEl = document.getElementById("candle-" + index);
  if (candleEl) {
    var rect = candleEl.getBoundingClientRect();
    var puff = document.createElement("div");
    puff.textContent = "💨";
    puff.style.cssText = "position:fixed;left:" + rect.left + "px;top:" + rect.top + "px;" +
      "font-size:2rem;pointer-events:none;z-index:9999;transition:all 0.8s ease;opacity:1;";
    document.body.appendChild(puff);
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        puff.style.transform = "translate(-50%,-200%) scale(1.5)";
        puff.style.opacity = "0";
      });
    });
    setTimeout(function() { puff.remove(); }, 900);
  }

  var msg = document.getElementById("candle-msg");
  if (msg) msg.textContent = candleMessages[blownCandles - 1];

  if (blownCandles === totalCandles) {
    var resetBtn = document.getElementById("reset-candles");
    if (resetBtn) resetBtn.classList.remove("hidden");
    burstConfetti(60);
  }
}

function resetCandles() {
  initCandles();
}

// ==================== STAR WISHES ====================
var wishes = [
  { emoji: "🌟", text: "Kamu akan meraih semua impianmu tahun ini! Semangat terus ya! 💪✨" },
  { emoji: "💖", text: "Hidupmu akan selalu penuh cinta dan kebahagiaan yang melimpah! 🥰" },
  { emoji: "🌸", text: "Kesehatan sempurna untukmu, tubuh selalu fit dan semangat! 🌿" },
  { emoji: "🎓", text: "Karir dan studimu makin cemerlang, sukses terus! 📚🏆" },
  { emoji: "🍀", text: "Keberuntungan selalu mengikutimu ke mana pun kamu pergi! 🌈" },
  { emoji: "💫", text: "Semua yang kamu rencanakan akan terwujud lebih indah dari yang kamu bayangkan! 🌙" },
  { emoji: "🌈", text: "Setiap hari seperti pelangi setelah hujan — indah dan berwarna! 🌤️" },
  { emoji: "🦋", text: "Kamu akan tumbuh dan jadi versi terbaik dari dirimu! 🌺" },
  { emoji: "🎊", text: "Kebahagiaan itu hak kamu. Kamu layak mendapatkan yang terbaik! 💝🎉" },
];

function initStarWishes() {
  var grid = document.getElementById("stars-grid");
  if (!grid) return;
  grid.innerHTML = "";
  var starEmojis = ["⭐","🌟","💫","✨","🌠","⭐","💛","🌟","⭐"];
  wishes.forEach(function(wish, i) {
    (function(idx) {
      var btn = document.createElement("button");
      btn.className = "star-btn";
      btn.textContent = starEmojis[idx % starEmojis.length];
      btn.addEventListener("click", function() { revealWish(idx, btn); });
      grid.appendChild(btn);
    })(i);
  });
}

function revealWish(index, btn) {
  document.querySelectorAll(".star-btn").forEach(function(b) { b.classList.remove("selected"); });
  btn.classList.add("selected");
  var wish = wishes[index];
  var emojiEl = document.getElementById("wish-emoji");
  var textEl = document.getElementById("wish-text");
  if (emojiEl) emojiEl.textContent = wish.emoji;
  if (textEl) textEl.textContent = wish.text;
  burstConfetti(20);
}

// ==================== MEMORY CARDS ====================
var memories = [
  { emoji: "🥰", label: "Pertama Kali Ketemu", bg: "linear-gradient(135deg,#ff6eb4,#c084fc)" },
  { emoji: "🌙", label: "Malam yang Berkesan",  bg: "linear-gradient(135deg,#818cf8,#6366f1)" },
  { emoji: "🍜", label: "Makan Bareng",          bg: "linear-gradient(135deg,#fbbf24,#f59e0b)" },
  { emoji: "💌", label: "Chat Tengah Malam",     bg: "linear-gradient(135deg,#fb7185,#e11d48)" },
  { emoji: "🎵", label: "Lagu Kita",             bg: "linear-gradient(135deg,#34d399,#059669)" },
  { emoji: "🌸", label: "Momen Lucu Kita",       bg: "linear-gradient(135deg,#f9a8d4,#ec4899)" },
];

function initMemoryCards() {
  var container = document.getElementById("memory-cards");
  if (!container) return;
  container.innerHTML = "";
  memories.forEach(function(mem) {
    var card = document.createElement("div");
    card.className = "mem-card";
    card.style.background = mem.bg;
    card.innerHTML =
      '<div class="mem-emoji">' + mem.emoji + '</div>' +
      '<div class="mem-label">' + mem.label + '</div>';
    card.addEventListener("click", function() {
      card.style.transform = "scale(1.15) rotate(3deg)";
      setTimeout(function() { card.style.transform = ""; }, 300);
      burstConfetti(15);
    });
    container.appendChild(card);
  });
}

// ==================== FIREWORKS ====================
function launchFireworks() {
  // Confetti ke atas
  for (var i = 0; i < 200; i++) {
    var p = makeParticle(false);
    p.vy = -(Math.random() * 10 + 5);
    p.x = Math.random() * window.innerWidth;
    p.y = window.innerHeight;
    confettiParticles.push(p);
  }

  // Heart rain
  var rain = document.getElementById("heart-rain");
  if (!rain) return;
  var heartEmojis = ["💖","💕","💗","💝","🌸","✨","🌟"];
  for (var j = 0; j < 30; j++) {
    (function(delay) {
      var heart = document.createElement("div");
      heart.className = "hr-heart";
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.cssText =
        "left:" + (Math.random() * 100) + "%;" +
        "animation-delay:" + delay + "s;" +
        "font-size:" + (1 + Math.random() * 2) + "rem;";
      rain.appendChild(heart);
    })(Math.random() * 2);
  }
  setTimeout(function() { if (rain) rain.innerHTML = ""; }, 5000);
}

// ==================== BALLOON CLICKS ====================
function attachBalloonClicks() {
  var balloons = ["🎈","🎊","💝","🎀","🌟"];
  document.querySelectorAll(".balloon").forEach(function(b) {
    b.addEventListener("click", function() {
      b.style.transition = "transform 0.15s";
      b.style.transform = "scale(0)";
      burstConfetti(20);
      setTimeout(function() {
        b.style.transform = "";
        b.textContent = balloons[Math.floor(Math.random() * balloons.length)];
      }, 200);
    });
  });
}

// ==================== HEART SPAWNER ====================
function startHeartSpawner() {
  var hearts = ["💖","💕","🌸","⭐","✨"];
  setInterval(function() {
    var bs = document.getElementById("birthday-screen");
    if (!bs || bs.style.display === "none") return;
    var h = document.createElement("div");
    h.style.cssText =
      "position:fixed;" +
      "left:" + (Math.random() * 100) + "vw;" +
      "bottom:-30px;" +
      "font-size:" + (1 + Math.random() * 1.5) + "rem;" +
      "pointer-events:none;" +
      "z-index:1;" +
      "opacity:0.25;" +
      "animation:float-up " + (5 + Math.random() * 5) + "s ease-in forwards;";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    document.body.appendChild(h);
    setTimeout(function() { if (h.parentNode) h.remove(); }, 12000);
  }, 900);
}

// ==================== MUSIC ====================
var audioCtx = null;
var musicPlaying = false;
var musicTimer = null;

function toggleMusic() {
  var btn = document.getElementById("music-btn");
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    playHappyBirthday();
    musicPlaying = true;
    if (btn) { btn.textContent = "🎵"; btn.classList.remove("muted"); }
  } else if (musicPlaying) {
    audioCtx.suspend();
    musicPlaying = false;
    if (btn) { btn.textContent = "🔇"; btn.classList.add("muted"); }
  } else {
    audioCtx.resume();
    musicPlaying = true;
    if (btn) { btn.textContent = "🎵"; btn.classList.remove("muted"); }
  }
}

function playHappyBirthday() {
  var notes = [
    262,0.3, 262,0.1, 294,0.4, 262,0.4, 349,0.4, 330,0.8,
    262,0.3, 262,0.1, 294,0.4, 262,0.4, 392,0.4, 349,0.8,
    262,0.3, 262,0.1, 523,0.4, 440,0.4, 349,0.4, 330,0.4, 294,0.8,
    466,0.3, 466,0.1, 440,0.4, 349,0.4, 392,0.4, 349,1.2,
    0,0.5
  ];
  function play() {
    if (!audioCtx || audioCtx.state === "suspended") return;
    var t = audioCtx.currentTime;
    for (var i = 0; i < notes.length; i += 2) {
      var freq = notes[i], dur = notes[i+1];
      if (freq > 0) {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur - 0.02);
        osc.start(t); osc.stop(t + dur);
      }
      t += dur;
    }
    var totalDur = t - audioCtx.currentTime;
    musicTimer = setTimeout(play, totalDur * 1000 + 500);
  }
  play();
}

// ==================== MEMORY CARDS ====================
var photos = [
  { emoji: "🥰", label: "Pertama Kali Ketemu", bg: "linear-gradient(135deg,#ff6eb4,#c084fc)", src: "images/foto1.jpg" },
  { emoji: "🌙", label: "Malam yang Berkesan",  bg: "linear-gradient(135deg,#818cf8,#6366f1)", src: "images/foto2.jpg" },
  { emoji: "🍜", label: "Makan Bareng",          bg: "linear-gradient(135deg,#fbbf24,#f59e0b)", src: "images/foto3.jpg" },
  { emoji: "💌", label: "Chat Tengah Malam",     bg: "linear-gradient(135deg,#fb7185,#e11d48)", src: "images/foto4.jpg" },
  { emoji: "🎵", label: "Lagu Kita",             bg: "linear-gradient(135deg,#34d399,#059669)", src: "images/foto5.jpg" },
  { emoji: "🌸", label: "Momen Lucu Kita",       bg: "linear-gradient(135deg,#f9a8d4,#ec4899)", src: "images/foto6.jpg" },
];

var currentPhotoIndex = 0;

function initMemoryCards() {
  var container = document.getElementById("memory-cards");
  if (!container) return;
  container.innerHTML = "";
  photos.forEach(function(mem, index) {
    var card = document.createElement("div");
    card.className = "mem-card";
    card.style.background = mem.bg;
    card.innerHTML =
      '<div class="mem-emoji">' + mem.emoji + '</div>' +
      '<div class="mem-label">' + mem.label + '</div>' + 
      '<div style="font-size: 0.75rem; margin-top: 5px; opacity: 0.8; font-weight: bold;">(Klik untuk lihat foto)</div>';
    card.addEventListener("click", function() {
      card.style.transform = "scale(1.15) rotate(3deg)";
      setTimeout(function() { card.style.transform = ""; }, 300);
      burstConfetti(15);
      
      // Buka lightbox
      openLightbox(index);
    });
    container.appendChild(card);
  });
}

function openLightbox(index) {
  currentPhotoIndex = index;
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCaption = document.getElementById("lb-caption");
  
  if (!lb || !lbImg || !lbCaption) return;
  
  // Update gambar dan caption
  lbImg.src = photos[currentPhotoIndex].src;
  
  // Jika gambar gagal dimuat di lightbox
  lbImg.onerror = function() {
    this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232d1554%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20fill%3D%22%23f8e7ff%22%20dy%3D%22.3em%22%3EFoto%20Belum%20Tersedia%20%F0%9F%93%B7%3C%2Ftext%3E%3C%2Fsvg%3E';
  };
  
  lbCaption.textContent = photos[currentPhotoIndex].label;
  
  lb.classList.add("open");
  document.body.style.overflow = "hidden"; // Prevent scrolling behind lightbox
}

function closeLightbox() {
  var lb = document.getElementById("lightbox");
  if (lb) {
    lb.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

function lightboxNext() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  openLightbox(currentPhotoIndex);
}

function lightboxPrev() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  openLightbox(currentPhotoIndex);
}

// ==================== SCROLL HELPER ====================
function scrollToSection(id) {
  var el = document.getElementById(id.replace("#",""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
