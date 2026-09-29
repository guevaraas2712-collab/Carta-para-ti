/*
  ==========================================
  PERSONALIZA TU JUEGO AQUÍ
  ==========================================
  Cambia solo esta sección:

  left  = palabra o concepto de la izquierda
  right = la frase/concepto que le corresponde
  id    = número único para unirlos correctamente

  Puedes tener 4, 6, 8, 10... parejas.
*/
const pairs = [
  { id: 1, left: "Tus ojos", right: "Los quisiera mirar siempre" },
  { id: 2, left: "Dormir a tu lado", right: "Me siento en paz" },
  { id: 3, left: "Tus abrazos", right: "Donde siento que todo está bien" },
  { id: 4, left: "Tu presencia", right: "La forma en que me haces sentir acompañado" },
  { id: 5, left: "Tu risa", right: "Uno de mis sonidos favoritos" },
  { id: 6, left: "Tú", right: "La persona que hace especial mi mundo" },
  { id: 7, left: "La vez que fuimos a las Estacas", right: "Algo que podría volver a vivir mil veces" },
  { id: 8, left: "Amor", right: "La palabra que más quiero relacionar contigo" }
];

/*
  ==========================================
  PERSONALIZA TU CARTA AQUÍ
  ==========================================
*/
const letterData = {
  title: "Para la mujer de mi vida",
  body: `Hola Monse!

Primero que nada espero te haya gustado el juego que te puse, perdón 
fue algo que se me ocurrio. Bueno yendo al grano esto no es una carta 
para pedir perdón, realmente si te ofezco una disculpa, se que mis 
comportamientos son una basura pero a lo que realmente voy es que
esto te lo hago con todas las intenciones de hacer algo, no te pido
que sigas conmigo si asi no lo deseas solo quiero crecer de verdad
quiero alejarme de todo eso que no solo me afecta a mi también a los 
demás y en especial a ti. Se que las palabras estan de más pero solo
quería hacerte esto y también por lo de que me dijiste ayer de la 
canción que puse jaja, si la puse para ti como te dije no pienses 
otras cosas no hago nada más que pensar en ti pero también te
quiero dar ese espacio para ti y respetar eso sabes, no es que 
tenga a alguien o no me interese, es solo eso. Y por último, estemos
o no juntos le pido a Dios que siempre te me cuide muchísimo.
 💗`,
  signature: `Con todo mi amor,\nAri Said 💗`
};

/* ==============================
   Lógica del juego
   ============================== */

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const letter = document.getElementById("letter");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const leftCards = document.getElementById("leftCards");
const rightCards = document.getElementById("rightCards");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const hint = document.getElementById("hint");
const letterTitle = document.getElementById("letterTitle");
const letterBody = document.getElementById("letterBody");
const letterSignature = document.getElementById("letterSignature");
const heartsContainer = document.querySelector(".hearts");
const confetti = document.getElementById("confetti");

let selectedLeft = null;
let selectedRight = null;
let matchedCount = 0;
let locked = false;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function updateProgress() {
  const total = pairs.length;
  const percentage = (matchedCount / total) * 100;

  progressText.textContent = `${matchedCount} de ${total} parejas encontradas`;
  progressFill.style.width = `${percentage}%`;
}

function createCard(pair, side) {
  const button = document.createElement("button");
  button.className = "match-card";
  button.textContent = side === "left" ? pair.left : pair.right;
  button.dataset.id = String(pair.id);
  button.dataset.side = side;

  button.addEventListener("click", () => handleSelection(button));

  return button;
}

function renderGame() {
  leftCards.innerHTML = "";
  rightCards.innerHTML = "";
  selectedLeft = null;
  selectedRight = null;
  matchedCount = 0;
  locked = false;

  shuffle(pairs).forEach(pair => {
    leftCards.appendChild(createCard(pair, "left"));
  });

  shuffle(pairs).forEach(pair => {
    rightCards.appendChild(createCard(pair, "right"));
  });

  updateProgress();
  hint.textContent = "Toca una tarjeta de cada lado para intentar formar una pareja.";
}

function handleSelection(card) {
  if (locked || card.classList.contains("matched")) return;

  const side = card.dataset.side;

  if (side === "left") {
    if (selectedLeft === card) {
      card.classList.remove("selected");
      selectedLeft = null;
      return;
    }

    if (selectedLeft) {
      selectedLeft.classList.remove("selected");
    }

    selectedLeft = card;
    card.classList.add("selected");
  }

  if (side === "right") {
    if (selectedRight === card) {
      card.classList.remove("selected");
      selectedRight = null;
      return;
    }

    if (selectedRight) {
      selectedRight.classList.remove("selected");
    }

    selectedRight = card;
    card.classList.add("selected");
  }

  if (selectedLeft && selectedRight) {
    checkMatch();
  }
}

function checkMatch() {
  locked = true;

  const correct = selectedLeft.dataset.id === selectedRight.dataset.id;

  if (correct) {
    setTimeout(() => {
      selectedLeft.classList.remove("selected");
      selectedRight.classList.remove("selected");
      selectedLeft.classList.add("matched");
      selectedRight.classList.add("matched");

      matchedCount++;
      updateProgress();

      hint.textContent = matchedCount === pairs.length
        ? "¡Lo lograste! Preparando tu carta... 💌"
        : "¡Correcto! Encuentra la siguiente pareja 💕";

      selectedLeft = null;
      selectedRight = null;
      locked = false;

      if (matchedCount === pairs.length) {
        setTimeout(showLetter, 850);
      }
    }, 300);
  } else {
    selectedLeft.classList.add("wrong");
    selectedRight.classList.add("wrong");

    hint.textContent = "Casi... intenta con otra combinación 💗";

    setTimeout(() => {
      selectedLeft?.classList.remove("selected", "wrong");
      selectedRight?.classList.remove("selected", "wrong");
      selectedLeft = null;
      selectedRight = null;
      locked = false;
    }, 550);
  }
}

function showLetter() {
  letterTitle.textContent = letterData.title;
  letterBody.textContent = letterData.body;
  letterSignature.textContent = letterData.signature;

  game.classList.add("hidden");
  letter.classList.remove("hidden");

  createConfetti();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame() {
  intro.classList.add("hidden");
  letter.classList.add("hidden");
  game.classList.remove("hidden");
  renderGame();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createHearts() {
  const symbols = ["♥", "♡", "❤"];
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${6 + Math.random() * 8}s`;
  heart.style.animationDelay = `${Math.random() * 2}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 16000);
}

function createConfetti() {
  confetti.innerHTML = "";

  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--drift", `${-140 + Math.random() * 280}px`);
    piece.style.animationDelay = `${Math.random() * .4}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    confetti.appendChild(piece);

    setTimeout(() => piece.remove(), 3500);
  }
}

startBtn.addEventListener("click", startGame);

replayBtn.addEventListener("click", () => {
  letter.classList.add("hidden");
  intro.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

setInterval(createHearts, 900);
