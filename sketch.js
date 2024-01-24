const DEFAULT_SQUARE_AMOUNT = 5;
const DEFAULT_SIZE = 900;

main();

function main() {
  const container = document.querySelector('.squares-container');
  AddDefaultProperties(container);

  setFieldsToUserInput(container);
  changeDesiredBehavior(container);
}

function AddDefaultProperties(container) {
  setContainerSize(container);
  createGridSquares(container);
  addEventsToDraw(getObjects(container, '.square'));
}

function checkActiveButton(radioButtons) {
  let buttonValue;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      buttonValue = radioButton.value;
    }
  });
  return buttonValue;
}

function applyNewBehavior(container, radioButtons) {
  let selectedButton = checkActiveButton(radioButtons);
  let size = getObjects(container, '.square').length ** 0.5;

  erasePreviousCanvas(container);
  createGridSquares(container, size);

  applyCanvasEffect(container, selectedButton);
}

function changeDesiredBehavior(container) {
  const radioButtons = document.querySelectorAll("input[name='sketch-option']");

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () =>
      applyNewBehavior(container, radioButtons),
    );
  });
}

function applyCanvasEffect(container, selectedButton) {
  switch (selectedButton) {
    case 'drawing':
      addEventsToDraw(getObjects(container, '.square'));
      break;
    case 'random-color':
      addEventsToRandomlyChangeColor(getObjects(container, '.square'));
      break;
    case 'progressive-darkening':
      addEventsToDarken(getObjects(container, '.square'));
      break;
    default:
      console.log('unexpected radio button');
  }
}

function addEventsToDarken(objects) {
  objects.forEach((object) => {
    let brightnessPercent = 100;
    object.addEventListener('mouseover', () => {
      if (brightnessPercent > 0) {
        brightnessPercent -= 10;
        object.style.filter = `brightness(${brightnessPercent}%)`;
      }
    });
  });
}

function addEventsToRandomlyChangeColor(objects) {
  objects.forEach((object) => {
    object.addEventListener('mouseover', (event) => {
      let randomColor = getRandomColor();
      object.style.backgroundColor = randomColor;
    });
  });
}

function getRandomColor() {
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 16)];
  }
  return `#${code}`;
}

function setUpCanva(canva) {
  canva.width = DEFAULT_SIZE;
  canva.height = DEFAULT_SIZE;
}

function addMouseMovingEvent(object) {
  let x = null;
  let y = null;

  object.addEventListener('mousemove', (event) => {
    if (event.buttons != 1) {
      return;
    }

    let context = object.getContext('2d');

    if (x !== null && y !== null) {
      drawPixelatedLine(context, x, y, event.offsetX, event.offsetY);
    }

    x = event.offsetX;
    y = event.offsetY;
  });

  object.addEventListener('mouseleave', () => {
    x = null;
    y = null;
  });

  object.addEventListener('mouseup', () => {
    x = null;
    y = null;
  });
}

function drawPixelatedLine(context, x1, y1, x2, y2) {
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

function addEventsToDraw(objects) {
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

function setFieldsToUserInput(container) {
  const input_field = document.querySelector('input.square-amount');
  const button = document.querySelector('button.send-input');

  button.addEventListener('click', () => {
    const userInput = input_field.value;

    if (isValid(userInput)) {
      erasePreviousCanvas(container);
      createGridSquares(container, userInput);

      const radioButtons = document.querySelectorAll(
        "input[name='sketch-option']",
      );
      applyCanvasEffect(container, checkActiveButton(radioButtons));
    }
  });
}

function erasePreviousCanvas(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function isValid(input) {
  return !(isNaN(input) || input < 1 || input > 100);
}
