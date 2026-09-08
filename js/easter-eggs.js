let eggConfig = null;

export function updateEasterEggMessages(config) {
  eggConfig = config;
}

function getEggs() {
  return eggConfig?.easterEggs ?? {};
}

function getWeddingDate() {
  return eggConfig?.wedding?.date;
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export function initEasterEggs(config) {
  updateEasterEggMessages(config);
  if (!getEggs()) return;

  initToast();
  initKonami();
  initAmpersand();
  initLogoClicks();
  initSecretWord();
  initFooterHearts();
  initCountdown100();
}

function initToast() {
  if (document.getElementById("easter-toast")) return;

  const toast = document.createElement("div");
  toast.id = "easter-toast";
  toast.className = "easter-toast";
  toast.setAttribute("role", "status");
  toast.hidden = true;
  document.body.appendChild(toast);
}

function showToast(message, { confetti = false } = {}) {
  const toast = document.getElementById("easter-toast");
  if (!toast || !message) return;

  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("is-visible");

  if (confetti) launchConfetti();

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => { toast.hidden = true; }, 400);
  }, 5000);
}

function initKonami() {
  let index = 0;
  document.addEventListener("keydown", (e) => {
    const egg = getEggs().konami;
    if (!egg?.enabled) return;
    if (e.target.matches("input, textarea, select")) return;

    if (e.code === KONAMI[index]) {
      index++;
      if (index === KONAMI.length) {
        index = 0;
        showToast(egg.message, { confetti: true });
      }
    } else {
      index = e.code === KONAMI[0] ? 1 : 0;
    }
  });
}

function initAmpersand() {
  document.addEventListener("click", (e) => {
    const egg = getEggs().ampersand;
    if (!egg?.enabled) return;

    const amp = e.target.closest("#hero-amp");
    if (!amp) return;

    e.stopPropagation();
    amp.classList.add("is-wiggle");
    showToast(egg.message);
    setTimeout(() => amp.classList.remove("is-wiggle"), 600);
  });
}

function initLogoClicks() {
  const logo = document.querySelector(".nav-logo");
  if (!logo) return;

  let clicks = 0;
  let timer;

  logo.addEventListener("click", (e) => {
    const egg = getEggs().logoClicks;
    if (!egg?.enabled) return;

    e.preventDefault();
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 1500);

    if (clicks >= (egg.requiredClicks ?? 5)) {
      clicks = 0;
      showToast(egg.message, { confetti: true });
    }
  });
}

function initSecretWord() {
  let buffer = "";

  document.addEventListener("keydown", (e) => {
    const egg = getEggs().secretWord;
    if (!egg?.enabled || !egg.word) return;
    if (e.target.matches("input, textarea, select")) return;
    if (e.key.length !== 1) return;

    const word = egg.word.toLowerCase();
    buffer = (buffer + e.key).slice(-word.length).toLowerCase();
    if (buffer === word) {
      buffer = "";
      showToast(egg.message, { confetti: true });
    }
  });
}

function initFooterHearts() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  let clicks = 0;
  let timer;

  footer.addEventListener("click", () => {
    const egg = getEggs().footerHearts;
    if (!egg?.enabled) return;

    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 800);

    if (clicks >= 3) {
      clicks = 0;
      showToast(egg.message);
      launchHearts();
    }
  });
}

function initCountdown100() {
  const el = document.getElementById("countdown");
  if (!el) return;

  let triggered = false;

  el.addEventListener("click", () => {
    const egg = getEggs().countdown100;
    if (!egg?.enabled || triggered) return;

    const weddingDate = getWeddingDate();
    if (!weddingDate) return;

    const days = Math.floor((new Date(weddingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days === 100) {
      triggered = true;
      showToast(egg.message, { confetti: true });
    }
  });
}

function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#9b87b8", "#a04558", "#f7f4fa", "#722f37", "#d4c4e8"];
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 100,
    w: 6 + Math.random() * 6,
    h: 4 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 10,
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(animate);
    else canvas.remove();
  }
  animate();
}

function launchHearts() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = "❤";
      heart.style.left = `${10 + Math.random() * 80}vw`;
      heart.style.animationDuration = `${2 + Math.random() * 2}s`;
      document.body.appendChild(heart);
      heart.addEventListener("animationend", () => heart.remove());
    }, i * 120);
  }
}
