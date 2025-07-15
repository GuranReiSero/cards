gsap.registerPlugin(Flip);

const cards = document.querySelectorAll(".card");
const classOrder = ["one", "two", "three", "four"];

let isAnimating = false;

function updateMist() {
  const mist = document.querySelector(".mist-four");
  const topCard = [...cards].find((card) => card.classList.contains("one"));

  const mistMap = {
    "card-one": "mist-island",
    "card-two": "mist-fjord",
    "card-three": "mist-desert",
    "card-four": "mist-house",
  };

  mist.classList.remove(
    "mist-island",
    "mist-fjord",
    "mist-desert",
    "mist-house"
  );

  const newMistClass = mistMap[topCard.id];
  mist.classList.add(newMistClass);

  gsap.fromTo(
    mist,
    { opacity: 0.5 },
    { opacity: 1, duration: 1, ease: "power2.out" }
  );
}

function cycleCardsForward() {
  if (isAnimating) return;
  isAnimating = true;

  const state = Flip.getState(cards);

  const last = classOrder.pop();
  classOrder.unshift(last);

  cards.forEach((card, i) => {
    card.classList.remove("one", "two", "three", "four", "z-1", "z-5");
    card.classList.add(classOrder[i]);
    if (classOrder[i] === "four") {
      card.classList.add("z-5");
    }
  });

  updateMist();

  Flip.from(state, {
    duration: 1,
    ease: "power1.inOut",
    absolute: true,
    onComplete: () => {
      isAnimating = false;
    },
  });
}

function cycleCardsBackward() {
  if (isAnimating) return;
  isAnimating = true;

  const state = Flip.getState(cards);

  const first = classOrder.shift();
  classOrder.push(first);

  cards.forEach((card, i) => {
    card.classList.remove("one", "two", "three", "four");
    card.classList.add(classOrder[i]);
    card.classList.remove("z-1");
    card.classList.remove("z-5");
    if (classOrder[i] === "four") {
      card.classList.remove("z-5");
      card.classList.add("z-1");
    }
  });

  updateMist();

  Flip.from(state, {
    duration: 1,
    ease: "power1.inOut",
    absolute: true,
    onComplete: () => {
      isAnimating = false;
    },
  });
}

document
  .querySelector(".button.right")
  .addEventListener("click", cycleCardsForward);
document
  .querySelector(".button.left")
  .addEventListener("click", cycleCardsBackward);
