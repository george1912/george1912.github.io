const studyCards = [
  { id: "apgar", module: "Newborn start", prompt: "APGAR stands for?", answer: "Appearance · Pulse · Grimace · Activity · Respiration" },
  { id: "physiology", module: "Adaptation", prompt: "How does a newborn make heat?", answer: "Mostly through brown-fat metabolism—not shivering. Dry, warm, and use skin-to-skin." },
  { id: "baseline", module: "Baseline", prompt: "What rate is 30–60?", answer: "Respirations are 30–60/min. Resting heart rate is usually 110–160 bpm." },
  { id: "head-to-toe", module: "Head-to-toe", prompt: "Which scalp swelling crosses sutures?", answer: "Caput crosses suture lines. Cephalohematoma stays within one skull bone." },
  { id: "movement-neuro", module: "Neuro", prompt: "Which reflex looks like fencing?", answer: "Tonic neck: the face-side arm and leg extend while the opposite side flexes." },
  { id: "daily-care", module: "Daily care", prompt: "What is the nursing loop?", answer: "Assess · Act · Document · Reassess." },
  { id: "gestational-age", module: "Gestational age", prompt: "What does Ballard check?", answer: "Neuromuscular maturity plus physical maturity." },
  { id: "home-care", module: "Discharge", prompt: "What is the safest newborn sleep setup?", answer: "Alone, on the back, in a firm flat crib or bassinet without loose items." },
  { id: "feeding-care", module: "Feeding", prompt: "How do you know feeding is working?", answer: "Coordinated suck or latch, swallowing, expected diaper output, and a healthy weight trend." },
  { id: "contraception", module: "Contraception", prompt: "Which birth control helps prevent STIs?", answer: "External and internal condoms reduce STI transmission risk. Most other methods do not." },
  { id: "sti", module: "STI", prompt: "What are the four STI steps?", answer: "Screen risk · test exposed sites · treat patient and partners · arrange retesting." },
  { id: "labor-pain", module: "Labor pain", prompt: "BP drops after an epidural. What do you do?", answer: "Side-lying or uterine displacement · track BP/FHR · carry out orders · page the team." },
  { id: "postpartum", module: "Postpartum", prompt: "What are the four T’s of hemorrhage?", answer: "Tone · Trauma · Tissue · Thrombin." },
  { id: "prenatal-basics", module: "Prenatal basics", prompt: "What does GTPAL stand for?", answer: "Gravida · Term · Preterm · Abortions · Living children." },
  { id: "pregnancy-complications", module: "Pregnancy risks", prompt: "What do you monitor with magnesium?", answer: "Reflexes · respirations · urine output · consciousness · magnesium level per protocol." },
  { id: "fetal-monitoring", module: "Fetal monitoring", prompt: "What does VEAL–CHOP pair?", answer: "Variable–Cord · Early–Head · Accelerations–Okay · Late–Placenta." },
  { id: "labor-emergencies", module: "Emergencies", prompt: "First steps in an OB emergency?", answer: "Call for help · position for perfusion · assess mother and fetus · prepare the response." },
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
  let index = 0;
  let revealed = false;

  const render = () => {
    const card = studyCards[index];
    moduleLabel.textContent = card.module;
    title.textContent = card.prompt;
    cardLabel.textContent = revealed ? "ANSWER" : "TAP TO REVEAL";
    cardCopy.textContent = revealed ? card.answer : "Tap this card or SHOW ANSWER.";
    cardButton.classList.toggle("is-revealed", revealed);
    cardButton.setAttribute("aria-expanded", String(revealed));
    flipButton.textContent = revealed ? "HIDE ANSWER" : "SHOW ANSWER";
    count.textContent = `CARD ${String(index + 1).padStart(2, "0")} / ${studyCards.length}`;
    jump.href = `#${card.id}`;
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

  deck.querySelector("[data-deck-action='next']").addEventListener("click", () => select(index + 1));
  deck.querySelector("[data-deck-action='shuffle']").addEventListener("click", () => select(index + 1 + Math.floor(Math.random() * (studyCards.length - 1))));
  flipButton.addEventListener("click", flip);
  cardButton.addEventListener("click", flip);
  render();
}
