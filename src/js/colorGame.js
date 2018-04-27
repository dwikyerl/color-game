import randomColor from './randomColor';

let numOfSquares = 6;
let chances = 5;
let isEasy = false;
const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#colorDisplay');
const header = document.querySelector('.header');
const message = document.querySelector('.menu__message');
const resetButton = document.querySelector('#resetButton');
const modeButtons = document.querySelectorAll('.mode');
let colors;
let pickedColor;

function init() {
  setupModeButtons(modeButtons);
  setupSquares(squares);
  reset();
}

function setupSquares(squares) {
  squares.forEach(sq => {
    sq.addEventListener('click', function() {
      const thisColor = this.style.backgroundColor;
      if (thisColor === pickedColor) {
        header.style.backgroundColor = thisColor;
        changeColors(squares, thisColor);
        message.textContent = 'You\'re correct!';
        resetButton.textContent = 'Play Again?';
      }
      else { 
        this.style.backgroundColor = 'transparent';
        chances -= 1;
        if (chances === 0) {
          message.textContent = 'You lost!';
          resetButton.textContent = 'Play Again?';
          disableClick(squares, false);
        } else {
          message.textContent = `Try Again (${chances} ${chances > 1 ? 'chances' : 'chance'} left)`;
        }
      }
    });
  });
}

function disableClick(squares, isClickable){
  const event = isClickable ? '' : 'none';
  squares.forEach(sq => sq.style.pointerEvents = event);
}

function setupModeButtons(buttons) {
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      buttons[0].classList.remove("btn-selected");
      buttons[1].classList.remove("btn-selected");
      this.classList.add("btn-selected");
      if (this.textContent === "Easy") {
        numOfSquares = 3;
        chances = 2;
        isEasy = true;
      } else {
        numOfSquares = 6;
        chances = 5;
        isEasy = false;
      }
      reset();
    });
  });
}

function changeColors(squares, color) {
  squares.forEach(sq => {
    sq.style.backgroundColor = color;
  });
}

function pickColor(colors) {
  return colors[Math.floor(Math.random()*colors.length)];
}

function generateRandomColors(num) {
  return new Array(numOfSquares).fill(0).map(() => randomColor());
}

function reset() {
  colors = generateRandomColors(numOfSquares);
  pickedColor = pickColor(colors);
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  message.textContent = "";
  squares.forEach((sq,i) => {
    if(colors[i]) {
      sq.style.display = "block";
      sq.style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  });
  chances = isEasy ? 2 : 5;
  disableClick(squares, true);
  header.style.backgroundColor = "";
}

resetButton.addEventListener('click', () => reset());
init();