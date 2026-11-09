const board = document.getElementById("game-board");

const movesDisplay = document.getElementById("moves");
const matchedDisplay = document.getElementById("matched");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");
const winMessage = document.getElementById("win-message");
const finalStats = document.getElementById("final-stats");
const leaders = [
 {
  name: "Mahatma Gandhi",
  image: "https://commons.wikimedia.org/wiki/Special:FilePath/Portrait_Gandhi.jpg"
},
  {
    name: "B. R. Ambedkar",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dr._Bhimrao_Ambedkar.jpg"
  },
  {
    name: "Sardar Patel",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sardar_patel_%28cropped%29.jpg"
  },
  {
    name: "Indira Gandhi",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indira_Gandhi_1966.jpg"
  },
  {
    name: "Donald Trump",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg"
  },
  {
    name: "Narendra Modi",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Narendra_Modi.jpg"
  },
  {
    name: "Rahul Gandhi",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rahul_Gandhi.jpg"
  },
  {
    name: "Revanth Reddy",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Portrait_of_Telangana_CM_Revanth_Reddy.png"
  }
];

let cards = [];
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let gameStarted = false;

function startTimer() {
  if (gameStarted) return;

  gameStarted = true;

  timerInterval = setInterval(() => {
    seconds++;

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    timerDisplay.textContent =
      String(minutes).padStart(2, '0') + ":" +
      String(remainingSeconds).padStart(2, '0');
  }, 1000);
}

function createGame() {
  board.innerHTML = "";

  cards = [...leaders, ...leaders]
  .map((leader, index) => ({
    ...leader,
    id: index % leaders.length
  }));

cards.sort(() => Math.random() - 0.5);

  flippedCards = [];
  lockBoard = false;
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  gameStarted = false;

  clearInterval(timerInterval);

  movesDisplay.textContent = "0";
  matchedDisplay.textContent = "0 / 8";
  timerDisplay.textContent = "00:00";

  cards.forEach((symbol) => {
    const card = document.createElement("div");

    card.classList.add("card");
   card.dataset.symbol = symbol.id;
card.dataset.name = symbol.name;
card.innerHTML = "?";

    board.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
    winMessage.style.display = "none";
  });
}

function flipCard(card) {
  if (
    lockBoard ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) return;

  startTimer();

  card.classList.add("flipped");
  card.innerHTML = `
  <img src="${cards.find(item => item.id == card.dataset.symbol).image}"
       alt="${card.dataset.name}">
`;

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;

  const [first, second] = flippedCards;

  if (first.dataset.symbol === second.dataset.symbol) {

    first.classList.add("matched");
    second.classList.add("matched");

    matchedPairs++;

    matchedDisplay.textContent = matchedPairs + " / 8";

    flippedCards = [];
    lockBoard = false;

  if (matchedPairs === 8) {
  clearInterval(timerInterval);

  winMessage.style.display = "block";

  finalStats.textContent =
    "Moves: " + moves + " | Time: " + timerDisplay.textContent;
}

  } else {

    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");

      first.innerHTML = "?";
      second.innerHTML = "?";

      flippedCards = [];
      lockBoard = false;

    }, 1000);
  }
}

restartBtn.addEventListener("click", createGame);

createGame();