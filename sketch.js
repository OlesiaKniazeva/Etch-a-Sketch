const DEFAULT_SQUARE_AMOUNT = 16;
const DEFAULT_SIZE = 1200;

main();

function main() {
  const container = document.querySelector('.squares-container');

  setContainerSize(container);
  createGridSquares(container, 5);
  addEventsToObjects(getObjects(container, '.square'));

  setFieldsToUserInput();
}

function setUpCanva(canva) {
  canva.width = DEFAULT_SIZE;
  canva.height = DEFAULT_SIZE;
}

function addMouseMovingEvent(object) {
  let x = null;
  let y = null;

  object.addEventListener('mousemove', (event) => {
    let context = object.getContext('2d');

    // console.log(`Mouse position: ${event.offsetX}, ${event.offsetY}`);

    if (x !== null && y !== null) {
      // console.log(x, y, event.offsetX, event.offsetY);
      drawPixelatedLine(context, x, y, event.offsetX, event.offsetY);
    }

    x = event.offsetX;
    y = event.offsetY;
  });

  object.addEventListener('mouseleave', () => {
    x = null;
    y = null;
  });
}

function drawPixelatedLine(context, x1, y1, x2, y2) {
  // console.log(x1, y1, x2, y2);
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.setLineDash([4, 2]);
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
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
    // console.log(row);
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    container.appendChild(rowContainer);

    for (let squareCounter = 0; squareCounter < amount; squareCounter++) {
      const square = document.createElement('canvas');
      square.width = square_side;
      square.height = square_side;
      square.classList.add('square');
      square.classList.add('canva');

      rowContainer.appendChild(square);
    }
  }
}

function getObjects(container, object_name) {
  return container.querySelectorAll(object_name);
}

function addEventsToObjects(objects) {
  objects.forEach((object) => {
    addMouseHoverEvent(object);
    addMouseMovingEvent(object);
  });
}

function addMouseHoverEvent(object) {
  const colorClassName = 'hover';
  object.addEventListener('mouseover', (event) => {
    addSquareColor(event.target, colorClassName);
  });

  object.addEventListener('mouseout', (event) => {
    resetSquareColor(event.target, colorClassName);
  });
}

function resetSquareColor(object, className) {
  object.classList.remove(className);
}

function addSquareColor(object, className) {
  object.classList.add(className);
}

function setFieldsToUserInput() {
  const input_field = document.querySelector('input.square-amount');
  const button = document.querySelector('button.send-input');

  button.addEventListener('click', () => {
    const userInput = input_field.value;
    console.log(userInput);
  
    if(isValid(userInput)) {
      erasePreviousCanvas();
    }
  });
}

function erasePreviousCanvas() {
  const container = document.querySelector('.squares-container');
  if (container) {
    
  }
}


function isValid(input) {
  return !(isNaN(input) || input < 1 || input > 100 );
}
 

function getUserInput() {
}
