const board = document.getElementById("game-board");
const symbols = ['1','2','3','4','5','6','7','8'];
let cards = [...symbols, ...symbols]; 
let flippedCards = [];
let lockBoard = false;


cards = cards.sort(() => 0.5 - Math.random());

cards.forEach((symbol) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.innerHTML = "";
  board.appendChild(card);

  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flipped") || flippedCards.length === 2) return;

    card.classList.add("flipped");
    card.innerHTML = symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      lockBoard = true;
      setTimeout(() => {
        const [first, second] = flippedCards;
        if (first.dataset.symbol === second.dataset.symbol) {
          first.style.visibility = "hidden";
          second.style.visibility = "hidden";
        } else {
          first.classList.remove("flipped");
          second.classList.remove("flipped");
          first.innerHTML = "";
          second.innerHTML = "";
        }
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  });
});
