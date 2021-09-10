import "../src/style.css";

let cardArray = [
  {
    name: "fries",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/fries_t5rfhy.png",
  },
  {
    name: "fries",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/fries_t5rfhy.png",
  },
  {
    name: "pizza",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/pizza_bmge3a.png",
  },
  {
    name: "pizza",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/pizza_bmge3a.png",
  },
  {
    name: "milkshake",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/milkshake_emts11.png",
  },
  {
    name: "milkshake",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/milkshake_emts11.png",
  },
  {
    name: "ice-cream",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/ice-cream_olhaql.png",
  },
  {
    name: "ice-cream",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/ice-cream_olhaql.png",
  },
  {
    name: "hotdog",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/hotdog_ng2hna.png",
  },
  {
    name: "hotdog",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/hotdog_ng2hna.png",
  },
  {
    name: "cheeseburger",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/cheeseburger_ju7b3t.png",
  },
  {
    name: "cheeseburger",
    img: "https://res.cloudinary.com/fakod29/image/upload/v1604561421/cheeseburger_ju7b3t.png",
  },
  {
    name: "falafel",
    img: "https://emojitool.com/img/whatsapp/2.19.352/falafel-1954.png",
  },
  {
    name: "falafel",
    img: "https://emojitool.com/img/whatsapp/2.19.352/falafel-1954.png",
  },
  {
    name: "taco",
    img: "https://images.emojiterra.com/google/android-pie/512px/1f32e.png",
  },
  {
    name: "taco",
    img: "https://images.emojiterra.com/google/android-pie/512px/1f32e.png",
  },
];

//define variables and get DOM element

let grid = document.querySelector(".grid");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let score = 0;
let timer = 0;
document.addEventListener("DOMContentLoaded", function () {
  //define functions

  createBoard(grid, cardArray);
  arrangeCard();
  playAgain.addEventListener("click", replay);

  //add a click functions for images

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});
//createBoard function

function createBoard(grid, array) {
  popup.style.display = "none";
  array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://www.seekpng.com/png/detail/131-1314546_download-svg-download-png-emoji-food-png.png"
    );
    img.setAttribute("data-id", index);
    grid.appendChild(img);
  });
}

// arrangeCard function

function arrangeCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

// flip Card function

function flipCard() {
  let selected = this.dataset.id;
  let clicked = cardArray[selected].name;
  cardsSelected.push(clicked);
  cardsId.push(selected);
  this.classList.add("flip");
  this.setAttribute("src", cardArray[selected].img);
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
// checkForMatch function

function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    alert("you have found a match");
    score += 12.5;
    scoreBoard.innerHTML = score;
    setTimeout(checkWon, 1000);
  } else {
    imgs[firstCard].setAttribute(
      "src",
      "https://www.seekpng.com/png/detail/131-1314546_download-svg-download-png-emoji-food-png.png"
    );
    imgs[secondCard].setAttribute(
      "src",
      "https://www.seekpng.com/png/detail/131-1314546_download-svg-download-png-emoji-food-png.png"
    );
    alert("wrong, please try again");

    imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip");
  }

    cardsSelected = [];
    cardsId = [];

   let timer = setInterval(myTimer, 1000);
   function myTimer() {
     
     clickBoard.innerHTML = timer;
     timer++;
   }

//    timer = minute+"mins "+second+"secs";
//             second++;
//             if(second == 60){
//                 minute++;
//                 second=0;
//             }
//             if(minute == 60){
//                 hour++;
//                 minute = 0;


//    function myStopFunction() {
//      clearInterval(timer);
//    }
}

function checkWon() {
  if (cardsWon == cardArray.length / 2) {
    alert("You won");
    setTimeout(() => (popup.style.display = "flex"), 300);
  }
}
// The replay function

function replay() {
  arrangeCard();
  grid.innerHTML = "";
  createBoard(grid, cardArray);
  score = 0;
  timer = 0;
  clickBoard.innerHTML = 0;
  scoreBoard.innerHTML = 0;
  popup.style.display = "none";
}
