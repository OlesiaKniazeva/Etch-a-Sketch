const DEFAULT_SQUARE_AMOUNT = 16;
const DEFAULT_SIZE = 960;

main();

function main() {
  const container = document.querySelector('.container');
  const input_button = document.querySelector('button.user-input');

  setContainerSize(container);
  createGridSquares(container, 5);

  addEventsToObjects(getObjects(container, '.square'));
  
  let input = getUserInput();

}

function convertToPixels(number) {
  return number + 'px';
}

function setContainerSize(container, size = DEFAULT_SIZE) {
  container.style.width = convertToPixels(size);
  container.style.height = convertToPixels(size);
}

function countSquareSize(amount, width = DEFAULT_SIZE) {
  return width / amount;
}

function createGridSquares(container, amount = DEFAULT_SQUARE_AMOUNT) {
  const square_side = countSquareSize(amount);

  for (let row = 0; row < amount; ++row) {
    console.log(row);
    let rowContainer = document.createElement('div');
    container.appendChild(rowContainer);

    for (let squareCounter = 0; squareCounter < amount; squareCounter++) {
      const square = document.createElement('div');
      square.style.width = convertToPixels(square_side);
      square.style.height = convertToPixels(square_side);
      square.classList.add('square');
      rowContainer.appendChild(square);
    }
  }
}

function getObjects(container, object_name) {
  return container.querySelectorAll(object_name);
}

function addEventsToObjects(objects) {
  objects.forEach(addMouseEvent);
}

function addMouseEvent(object) {
  const colorClassName = 'hover'
  object.addEventListener('mouseover', (event) => {
    addSquareColor(event.target, colorClassName)
  })

  object.addEventListener('mouseout', (event) => {
    resetSquareColor(event.target, colorClassName);
  })
}

function resetSquareColor(object, className) {
  object.classList.remove(className);
}

function addSquareColor(object, className) {
  object.classList.add(className);
}

function addPixelatedTrail() {

}

function getUserInput() {
  //*//
}
