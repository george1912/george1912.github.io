const pieces = document.querySelectorAll("[data-piece]");

async function assetExists(path) {
  try {
    const response = await fetch(path, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

document.querySelectorAll("[data-pdf-src]").forEach(async (pdf) => {
  const source = pdf.dataset.pdfSrc;
  const path = source.split("#")[0];
  const exists = await assetExists(path);

  if (exists) {
    pdf.data = source;
    pdf.closest(".frame")?.classList.add("has-pdf");
  }
});

const portrait = document.querySelector("[data-portrait]");
assetExists("assets/author-image.png").then((exists) => {
  if (!portrait || !exists) return;
  portrait.src = "assets/author-image.png";
  portrait.closest(".portrait-slot")?.classList.add("has-photo");
});

pieces.forEach((piece) => {
  const button = piece.querySelector("[data-flip]");

  button.addEventListener("click", () => {
    const flipped = piece.classList.toggle("is-flipped");
    button.setAttribute("aria-pressed", String(flipped));
  });
});

function wirePlayer(audioSelector, buttonSelector, statusSelector, idleText, playText) {
  const audio = document.querySelector(audioSelector);
  const button = document.querySelector(buttonSelector);
  const status = document.querySelector(statusSelector);

  if (!audio || !button || !status) return;

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      status.textContent = "Add the audio file here when it is ready.";
    }
  });

  audio.addEventListener("play", () => {
    button.textContent = "❚❚";
    status.textContent = playText;
  });

  audio.addEventListener("pause", () => {
    button.textContent = "▶";
    status.textContent = idleText;
  });

  audio.addEventListener("error", () => {
    status.textContent = "Add the audio file here when it is ready.";
  });
}

wirePlayer(
  "[data-audio]",
  "[data-audio-toggle]",
  "[data-audio-status]",
  "A little soundtrack for the moment.",
  "Music is playing."
);

wirePlayer(
  "[data-secondary-audio]",
  "[data-audio-toggle-secondary]",
  "[data-secondary-status]",
  "Author section music",
  "Author section music is playing."
);

const canvas = document.querySelector(".memory-canvas");
const ctx = canvas?.getContext("2d");
let frame = 0;

function drawMemoryCanvas() {
  if (!canvas || !ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  frame += 0.012;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1f2633");
  gradient.addColorStop(0.48, "#4b2f42");
  gradient.addColorStop(1, "#213d39");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 34; i += 1) {
    const depth = (i % 9) + 1;
    const x = width / 2 + Math.cos(frame * depth + i) * (70 + i * 6);
    const y = height / 2 + Math.sin(frame * 1.4 + i * 0.7) * (90 + i * 3);
    const size = 5 + depth * 1.7;
    const alpha = 0.24 + depth * 0.045;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 232, 177, ${alpha})`;
    ctx.fill();
  }

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(Math.sin(frame) * 0.11);
  ctx.strokeStyle = "rgba(255, 250, 241, 0.42)";
  ctx.lineWidth = 2;
  ctx.strokeRect(-170, -230, 340, 460);
  ctx.strokeStyle = "rgba(213, 168, 79, 0.42)";
  ctx.strokeRect(-145, -205, 290, 410);
  ctx.restore();

  requestAnimationFrame(drawMemoryCanvas);
}

drawMemoryCanvas();
