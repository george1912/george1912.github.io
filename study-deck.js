const studyCards = [
  { id: "apgar", module: "Newborn start", prompt: "What does APGAR check?", cue: "5 signs · 0, 1, or 2 each", answer: "Appearance · Pulse · Grimace · Activity · Respiration" },
  { id: "physiology", module: "Adaptation", prompt: "What keeps a newborn warm?", cue: "Think brown fat, not shivering", answer: "Dry, warm, skin-to-skin; newborns make heat mainly with brown-fat metabolism." },
  { id: "baseline", module: "Baseline", prompt: "Which rate is 30–60?", cue: "Do not mix up heart and lungs", answer: "Respirations are 30–60/min. Resting heart rate is usually 110–160 bpm." },
  { id: "head-to-toe", module: "Head-to-toe", prompt: "Caput or cephalohematoma?", cue: "Crosses versus contained", answer: "Caput crosses suture lines. Cephalohematoma stays within one skull bone." },
  { id: "movement-neuro", module: "Neuro", prompt: "What is the fencing reflex?", cue: "Head turns; limbs pose", answer: "Tonic neck: the arm and leg extend on the face side while the opposite side flexes." },
  { id: "daily-care", module: "Daily care", prompt: "What is the nursing loop?", cue: "Four repeatable steps", answer: "Assess · Act · Document · Reassess." },
  { id: "gestational-age", module: "Gestational age", prompt: "What does Ballard compare?", cue: "Two halves", answer: "Neuromuscular maturity plus physical maturity." },
  { id: "home-care", module: "Discharge", prompt: "What is the safest sleep setup?", cue: "Alone · back · crib", answer: "Alone, on the back, in a firm flat crib or bassinet without loose items." },
  { id: "feeding-care", module: "Feeding", prompt: "How do you know feeding works?", cue: "Watch the baby, not only the clock", answer: "Effective latch or coordinated suck, audible swallowing, expected output, and weight trend." },
  { id: "contraception", module: "Contraception", prompt: "Which methods also reduce STI risk?", cue: "Barrier clue", answer: "External and internal condoms reduce STI transmission risk; most other methods do not." },
  { id: "sti", module: "STI", prompt: "What is the STI nursing pattern?", cue: "Screen · sites · treat · return", answer: "Screen risk, test exposed sites, treat patient and partners when indicated, then arrange retesting." },
  { id: "labor-pain", module: "Labor pain", prompt: "BP drops after an epidural—what next?", cue: "SIDE · TRACK · ORDERS · PAGE", answer: "Side-lying or uterine displacement; track BP/FHR; carry out orders; page anesthesia and the obstetric team." },
  { id: "postpartum", module: "Postpartum", prompt: "What are the four T’s of hemorrhage?", cue: "Tone starts the list", answer: "Tone · Trauma · Tissue · Thrombin." },
  { id: "prenatal-basics", module: "Prenatal basics", prompt: "What does GTPAL organize?", cue: "Pregnancy history", answer: "Gravida · Term · Preterm · Abortions · Living children." },
  { id: "pregnancy-complications", module: "Pregnancy risks", prompt: "What protects a patient on magnesium?", cue: "Reflexes · respirations · urine", answer: "Monitor reflexes, respiratory rate, urine output, level of consciousness, and magnesium level per protocol." },
  { id: "fetal-monitoring", module: "Fetal monitoring", prompt: "What does VEAL–CHOP pair?", cue: "Pattern → likely cause", answer: "Variable–Cord · Early–Head · Accelerations–Okay · Late–Placental insufficiency." },
  { id: "labor-emergencies", module: "Emergencies", prompt: "What comes first in an OB emergency?", cue: "Call · position · assess · prepare", answer: "Call for help, position for maternal-fetal perfusion, assess mother and fetus, and prepare the ordered response." },
];

const deck = document.querySelector(".study-deck");

if (deck) {
  const moduleLabel = deck.querySelector(".study-deck__module");
  const title = deck.querySelector("#study-deck-title");
  const cardButton = deck.querySelector(".study-card");
  const cardLabel = cardButton.querySelector("span");
  const cardCopy = cardButton.querySelector("strong");
  const count = deck.querySelector(".study-deck__count");
  const flipButton = deck.querySelector("[data-deck-action='flip']");
  const jump = deck.querySelector(".study-deck__jump");
  const slots = deck.querySelector(".study-deck__slots");
  let index = 0;
  let revealed = false;

  studyCards.forEach((item, cardIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(cardIndex + 1).padStart(2, "0");
    button.setAttribute("aria-label", `Card ${cardIndex + 1}: ${item.module}`);
    button.addEventListener("click", () => select(cardIndex));
    slots.append(button);
  });

  const render = () => {
    const card = studyCards[index];
    moduleLabel.textContent = card.module;
    title.textContent = card.prompt;
    cardLabel.textContent = revealed ? "ANSWER" : "TAP TO REVEAL";
    cardCopy.textContent = revealed ? card.answer : card.cue;
    cardButton.classList.toggle("is-revealed", revealed);
    cardButton.setAttribute("aria-expanded", String(revealed));
    flipButton.textContent = revealed ? "HIDE" : "FLIP";
    count.textContent = `CARD ${String(index + 1).padStart(2, "0")} / ${studyCards.length}`;
    jump.href = `#${card.id}`;
    [...slots.children].forEach((button, cardIndex) => {
      button.classList.toggle("is-active", cardIndex === index);
      if (cardIndex === index) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  };

  const select = (nextIndex) => {
    index = (nextIndex + studyCards.length) % studyCards.length;
    revealed = false;
    render();
  };

  const flip = () => {
    revealed = !revealed;
    render();
  };

  deck.querySelector("[data-deck-action='previous']").addEventListener("click", () => select(index - 1));
  deck.querySelector("[data-deck-action='next']").addEventListener("click", () => select(index + 1));
  deck.querySelector("[data-deck-action='shuffle']").addEventListener("click", () => select(index + 1 + Math.floor(Math.random() * (studyCards.length - 1))));
  flipButton.addEventListener("click", flip);
  cardButton.addEventListener("click", flip);
  render();
}
