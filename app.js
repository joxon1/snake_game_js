const canvas = document.querySelector("#game_canvas");

const context = canvas.getContext("2d");
const grid = 16;
let count = 0,
  score = 0,
  max = 0;

//snake
const snake = {
  x: 16,
  y: 16,
  dx: grid,
  dy: 0,
  maxCells: 1,
  cells: [],
};

//food
const food = {
  x: 160,
  y: 160,
};

//random food

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//general function

function loop() {
  requestAnimationFrame(loop);
  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  snake.x += snake.dx;
  snake.y += snake.dy;
  //infinity snake
  if (snake.x < 0) {
    //horizont
    snake.x = canvas.clientWidth - grid;
  } else if (snake.x >= canvas.clientWidth) {
    snake.x = 0;
  }
  //vertical
  if (snake.y < 0) {
    snake.y = canvas.clientHeight - grid;
  } else if (snake.y >= canvas.clientHeight) {
    snake.y = 0;
  }

  //snake ++
  snake.cells.unshift({ x: snake.x, y: snake.y });

  //snake --

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  //food
  context.fillStyle = "#fff";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);

  //snake
  context.fillStyle = "#E43F5A";
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;
      score += 1;
      document.querySelector("#score_num").innerHTML = score;
      //next random food
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }
    // score num
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        if (score > max) {
          max = score;
        }
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 1;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
        document.querySelector("#score_num").innerHTML = max;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37 && snake.dx === 0) {
    //left
    snake.dx = -grid;
    snake.dy = 0;
  }
  //right
  if (e.keyCode === 39 && snake.dx === 0) {
    snake.dx = +grid;
    snake.dy = 0;
  }
  //up
  if (e.keyCode === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  //down
  if (e.keyCode === 40 && snake.dy === 0) {
    snake.dy = +grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop);
