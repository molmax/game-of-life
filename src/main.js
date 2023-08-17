canvasWidth = canvasHeight = 600;

let cells = [];
let cellSize = 15;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(1);
  initCells();
}

function draw() {
  background(0, 153, 51);
  cells.forEach(cell => {
    processStep(cell);
    cell.currentStateIsAlive = cell.nextStateIsAlive;
    cell.draw();
  });
}

function initCells() {
  for (let y = 0; y < canvasHeight; y += cellSize) {
    for (let x = 0; x < canvasWidth; x += cellSize) {
        //prob = monteCarlo();
        //chance = 5;
        //isAlive = Math.round(random(prob)) > chance;
        //TODO normal randomization, this one is boring
        isAlive = Math.round(Math.random(0, 10) % 2) == 0;
        cells.push(new Cell(x, y, cellSize, isAlive));
    }
  }
  initNeighbours();
}

function initNeighbours() {
  cells.forEach(cell => {
    x = cell.x;
    y = cell.y;

    n_right = getCellByCoordinates(x + cellSize, y);
    n_left = getCellByCoordinates(x - cellSize, y);
    n_up = getCellByCoordinates(x, y - cellSize);
    n_down = getCellByCoordinates(x, y + cellSize);
    n_right_up_diag = getCellByCoordinates(x + cellSize, y - cellSize);
    n_lelft_up_diag = getCellByCoordinates(x - cellSize, y - cellSize);
    n_right_down_diag = getCellByCoordinates(x + cellSize, y + cellSize);
    n_left_down_diag = getCellByCoordinates(x - cellSize, y + cellSize);

    if (n_right != undefined) {
      cell.neighbours.push(n_right); 
    }
    if (n_left != undefined) {
      cell.neighbours.push(n_left);
    }
    if (n_up != undefined) {
      cell.neighbours.push(n_up);
    }
    if (n_down != undefined) {
      cell.neighbours.push(n_down);
    }
    if (n_right_up_diag != undefined) {
      cell.neighbours.push(n_right_up_diag);
    }
    if (n_lelft_up_diag != undefined) {
      cell.neighbours.push(n_lelft_up_diag);
    }
    if (n_right_down_diag != undefined) {
      cell.neighbours.push(n_right_down_diag);
    }
    if (n_left_down_diag != undefined) {
      cell.neighbours.push(n_left_down_diag);
    }
  });
}

function getCellByCoordinates(x, y) {
  return cells.find(c => c.getByCoordinates(x, y));
}

function processStep(cell) {
  n = cell.neighbours.filter(c => c.currentStateIsAlive).length;
  if (cell.currentStateIsAlive) {
    if (n < 2) {
      cell.nextStateIsAlive = false;
    } 
    else if (n == 2 || n == 3) {
      //Do nothing
    }
    else if (n > 3) {
      cell.nextStateIsAlive = false;
    }
  } else if (n == 3) {
    cell.nextStateIsAlive = true;
  }
}

function monteCarlo() {
  while (true) {
   let r1 = random(0, 10);
   let probability = r1;
   let r2 = random(0, 10);
   if (r2 < probability) {
     return r1;
   }
  }
}

class Cell {
  x;
  y;
  size;
  currentStateIsAlive;//is currently alive?
  nextStateIsAlive;//will be alive on next step?
  neighbours = [];

  constructor(x, y, size, isAlive) {
    this.x = x;
    this.y = y; 
    this.size = size;
    this.currentStateIsAlive = isAlive;
  }

  getByCoordinates(x, y) {
    if (this.x == x && this.y == y) {
      return this;
    }
  }

  draw() {
    if (this.currentStateIsAlive) {
      fill(0);
    } else {
      fill(0, 153, 51);
    }
    noStroke();
    square(this.x, this.y, this.size);
  }
}
