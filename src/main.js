canvasWidth = 600;
canvasHeight = 600;

let cells = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  initCells();
}

function draw() {
  cells.forEach(cell => {
    cell.draw();
  });
}

function initCells() {
  cellSize = 10;
  for (let y = 0; y < canvasHeight; y += cellSize) {
    for (let x = 0; x < canvasWidth; x += cellSize) {
        prob = monteCarlo();
        chance = 350;
        isAlive = Math.round(random(prob)) > chance;
        cells.push(new Cell(x, y, cellSize, isAlive));
    }
  }
}

function monteCarlo() {
  while (true) {
    let r1 = random(-600, 600);
    let probability = r1;
    let r2 = random(-600, 600);

    if (r2 < probability) {
      return r1;
    }
  }
}

class Cell {
  x;
  y;
  size;
  isAlive;

  constructor(x, y, size, isAlive) {
    this.x = x;
    this.y = y; 
    this.size = size;
    this.isAlive = isAlive;
  }

  makeAlive() {
    this.isAlive = true;
  }

  kill() {
    this.isAlive = false;
  }

  draw() {
    if (this.isAlive) {
      fill(0);
    } else {
      fill(255);
    }
    noStroke();
    square(this.x, this.y, this.size);
  }
}