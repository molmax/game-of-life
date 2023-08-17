canvasWidth = 100;
canvasHeight = 100;

let cells = [];
let cellSize = 10;

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
  for (let y = 0; y < canvasHeight; y += cellSize) {
    for (let x = 0; x < canvasWidth; x += cellSize) {
        prob = monteCarlo();
        chance = 350;
        isAlive = Math.round(random(prob)) > chance;
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
  //TODO need to introduce current and next cell state.
  //Check currentState (alive or not) then do the logic and set nexState. At the very end do currentState=nexState.
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

  getByCoordinates(x, y) {
    if (this.x == x && this.y == y) {
      return this;
    }
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