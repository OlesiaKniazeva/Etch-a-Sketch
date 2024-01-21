const DEFAULT_SQUARE_AMOUNT = 16;
const DEFAULT_SIZE = 960;

const CONTAINER = document.querySelector('.container');
const INPUT_BUTTON = document.querySelector('button.user-input');

main();

function main() {
  setContainerSize();
  createGridSquares();
}

function convertToPixels(number) {
  return number + 'px';
}

function setContainerSize(size = DEFAULT_SIZE) {
  const container = document.querySelector('div.container');

  container.style.width = size;
  container.style.height = size;
}

function countSquareSize(amount, width = DEFAULT_SIZE) {
  return DEFAULT_SIZE / amount;
}

function createGridSquares(amount = DEFAULT_SQUARE_AMOUNT) {
  const square_side = countSquareSize(amount);

  for (let i = 0; i < amount ** 2; ++i) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    div.style.width = square_side + 'px';
    div.style.height = square_side + 'px';

    CONTAINER.appendChild(div);
  }
}

function getUserInput() {
  //*//
}
