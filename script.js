const DEFAULT_SQUARE_AMOUNT = 16;
const DEFAULT_WIDTH = 960;

const CONTAINER = document.querySelector('.container');
const INPUT_BUTTON = document.querySelector('button.user-input');

createGridSquares();


function createGridSquares(amount = DEFAULT_SQUARE_AMOUNT) {
  const square_side = countSquareSize(amount);

  for (let i = 0; i < amount ** 2; ++i) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    CONTAINER.appendChild(div);
  }
}

function getUserInput() {
  //*//
}
