canvasWidth = 600;
canvasHeight = 600;

let cells = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  initCells();
}

function draw() {
  cells.forEach(cell => {
    processStep(cell);
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

function processStep(cell) {
  n = cell.neighbours.filter(c => c.getIsAlive()).length;
  if (cell.getIsAlive()) {
    if (n < 2) {
      cell.kill();
    } 
    else if (n == 2 || n == 3) {
      //Do nothing
    }
    else if (n > 3) {
      cell.kill();
    }
  } else if (n == 3) {
    cell.makeAlive();
  }
}

class Cell {
  x;
  y;
  size;
  isAlive;
  neighbours = [];

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

  getIsAlive() {
    return this.isAlive;
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