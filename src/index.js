import "../src/style.css";

<<<<<<< HEAD
const classes = [
    "tcat",
    "tsquirrel",
    "theart",
    "trocket",
    "tbird",
    "thome",
    "tlotus",
    "tboat",
];

const tangram = `
<div class="t">
  <svg viewbox="-50 -50 200 200" >
    <use class="bt-1" xlink:href="#tangram1" transform="translate(0,0)"/>
    <use class="bt-2 red" xlink:href="#tangram1" transform="translate(0,0) scale(-1,1) rotate(90 0 0)"/>
    <use class="st-1" xlink:href="#tangram1" transform="translate(25,75) scale(.5,.5) rotate(-90 0 0)"/>
    <use class="mt" xlink:href="#tangram1" transform="translate(100,49.5) scale(.7142,.7142) rotate(45 0 0)"/>
    <use class="st-2" xlink:href="#tangram1" transform="translate(100,50) scale(.5,.5) rotate(-180 0 0)"/>
    <use class="sq" xlink:href="#tangram2"/>
    <use class="rh" xlink:href="#tangram3"/>
  </svg>
</div>
`;
class MemoryGame {
    constructor(selector) {
        this.selector = selector;
        this.init();
    }
    init() {
        this.randomize();
        this.buildGrid();
        this.revealed = [];
=======
let constants = new (function () {
  var rows = 3;
  var columns = 6;
  var numMatches = (rows * columns) / 2;
  this.getRows = function () {
    return rows;
  };
  this.getColumns = function () {
    return columns;
  };
  this.getNumMatches = function () {
    return numMatches;
  };
})();

// Global Variables
var currentSessionOpen = false;
var previousCard = null;
var numPairs = 0;

// this function creates deck of cards that returns an object of cards
// to the caller
function createDeck() {
  const rows = constants.getRows();
  const cols = constants.getColumns();
  const key = createRandom();
  const deck = {};
  deck.rows = [];

  // create each row
  for (let i = 0; i < rows; i++) {
    const row = {};
    row.cards = [];

    // creat each card in the row
    for (let j = 0; j < cols; j++) {
      const card = {};
      card.isFaceUp = false;
      card.item = key.pop();
      row.cards.push(card);
    }
    deck.rows.push(row);
  }
  return deck;
}

// used to remove something form an array by index
function removeByIndex(arr, index) {
  arr.splice(index, 1);
}

function insertByIndex(arr, index, item) {
  arr.splice(index, 0, item);
}

// creates a random array of items that contain matches
// for example: [1, 5, 6, 5, 1, 6]
function createRandom() {
  const matches = constants.getNumMatches();
  const pool = [];
  const answers = [];
  const hiragana = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // set what kind of item to display
  let items = hiragana;

  // create the arrays for random numbers and item holder
  for (let i = 0; i < matches * 2; i++) {
    pool.push(i); // random numbers
  }

  // generate an array with the random items
  for (let n = 0; n < matches; n++) {
    // grab random letter from array and remove that letter from the
    // original array
    const randLetter = Math.floor(Math.random() * items.length);
    const letter = items[randLetter];
    removeByIndex(items, randLetter);
    // generate two random placements for each item
    const randPool = Math.floor(Math.random() * pool.length);

    // remove the placeholder from answers and insert the letter into
    // random slot
    insertByIndex(answers, pool[randPool], letter);

    // remove random number from pool
    removeByIndex(pool, randPool);

    // redo this process for the second placement
    randPool = Math.floor(Math.random() * pool.length);
    insertByIndex(answers, pool[randPool], letter);

    // remove rand number from pool
    removeByIndex(pool, randPool);
  }
  return answers;
}

const app = angular.module("cards", ["ngAnimate"]);

app.controller("CardController", function ($scope, $timeout) {
  $scope.deck = createDeck();
  $scope.isGuarding = true;
  $scope.inGame = false;

  $scope.check = function (card) {
    if (
      currentSessionOpen &&
      previousCard != card &&
      previousCard.item == card.item &&
      !card.isFaceUp
    ) {
      card.isFaceUp = true;
      previousCard = null;
      currentSessionOpen = false;
      numPairs++;
    } else if (
      currentSessionOpen &&
      previousCard != card &&
      previousCard.item != card.item &&
      !card.isFaceUp
    ) {
      $scope.isGuarding = true;
      card.isFaceUp = true;
      currentSessionOpen = false;
      $timeout(function () {
        previousCard.isFaceUp = card.isFaceUp = false;
        previousCard = null;
        $scope.isGuarding = $scope.timeLimit ? false : true;
      }, 1000);
    } else {
      card.isFaceUp = true;
      currentSessionOpen = true;
      previousCard = card;
>>>>>>> 7180a790a00991ac333741799cea41bac8f28bd2
    }
    randomize() {
        this.classes = this.shuffle(classes.concat(classes));
    }
<<<<<<< HEAD
    shuffle(array) {
        array.sort(function (a, b) {
            return 0.5 - Math.random();
        });
        return array;
    }
    buildGrid() {
        let html = "";
        for (let i = 0; i < this.classes.length; i++) {
            html += tangram;
        }
        this.selector.innerHTML = html;
        this.cards = this.selector.querySelectorAll(".t");
        this.classes.forEach((el, i) => {
            const card = this.cards[i];
            card.classList.add(el);
            card.setAttribute("data-class", el);
            this.addCardListeners(card);
        });
    }
    checkMatch() {
        return (
            this.revealed.length === 2 &&
            this.revealed[0].getAttribute("data-class") ===
                this.revealed[1].getAttribute("data-class")
        );
    }
    addCardListeners(el) {
        el.addEventListener("mouseenter", (e) => {
            if (el.classList.contains("revealed")) {
                return;
            }

            if (this.revealed.length < 2) {
                return;
            }

            Array.prototype.slice.call(this.revealed).forEach((item) => {
                item.classList.remove("revealed");
            });
            this.revealed = [];
        });

        el.addEventListener(
            "click",
            (e) => {
                if (el.classList.contains("revealed")) {
                    return;
                }

                el.classList.add("revealed");
                this.revealed.push(el);
                if (this.checkMatch()) {
                    Array.prototype.slice
                        .call(this.revealed)
                        .forEach((item) => {
                            item.classList.add("hidden");
                            this.revealed = [];
                        });
                }
            },
            false
        );
    }
}
=======
  }; //end of check()

  // for the timer
  $scope.timeLimit = 60000;
  $scope.isCritical = false;

  const timer = null;

  // start the timer as soon as the player presses start
  $scope.start = function () {
    // I need to fix this redundancy. I initially did not create this
    // game with a start button.
    $scope.deck = createDeck();
    // set the time of 1 minutes and remove the cards guard
    $scope.timeLimit = 60000;
    $scope.isGuarding = false;
    $scope.inGame = true;

    ($scope.startTimer = function () {
      $scope.timeLimit -= 1000;
      $scope.isCritical = $scope.timeLimit <= 10000 ? true : false;
>>>>>>> 7180a790a00991ac333741799cea41bac8f28bd2

let memory = new MemoryGame(document.getElementById("tangramgrid"));
