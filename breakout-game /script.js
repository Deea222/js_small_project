const rules = document.getElementById('rules');
const rulesOpen = document.getElementById('rules-btn');
const rulesClose = document.getElementById('close-btn');

// Create Canvas context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//! characteristics
let score = 0;

const brickRowNum = 5;
const brickColNum = 8;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 4,
  dy: -4,
};

const paddle = {
  x1: canvas.width / 2 - 60,
  y1: canvas.height - 40,
  w: 120,
  h: 15,
  speed: 10,
  dx: 0,
};

const brickInfo = {
  offsetX: 60,
  offsetY: 60,
  w: 80,
  h: 20,
  padding: 5,
  visible: true,
};

// Create Bricks array
bricks = [];
for (let i = 0; i < brickColNum; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRowNum; j++) {
    const x = brickInfo.offsetX + (brickInfo.padding + brickInfo.w) * i;
    const y = brickInfo.offsetY + (brickInfo.padding + brickInfo.h) * j;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// ! Draw
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#F2B705';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x1, paddle.y1, paddle.w, paddle.h);
  ctx.fillStyle = '#F29F05';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

//! move
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 상하 벽에 부딪힐 때,
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;
  }

  // 좌우 벽에 부딪힐 때,
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  // 패들과 부딪힐 때,
  if (
    ball.x >= paddle.x1 &&
    ball.x <= paddle.x1 + paddle.w &&
    ball.y + ball.radius > paddle.y1
  ) {
    ball.dy *= -1;
  }

  // 블록과 부딪혔을 때,
  bricks.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + brick.w &&
          ball.y > brick.y &&
          ball.y < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          updateScore();
        }
      }
    });
  });

  // 바닥에 부딪혔을 때
  if (ball.y + ball.radius > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function movePaddle() {
  paddle.x1 += paddle.dx;

  // 벽 끝에 닿았을 때,
  if (paddle.x1 + paddle.w > canvas.width - 3) {
    paddle.x1 = canvas.width - paddle.w - 3;
  }

  if (paddle.x1 < 3) {
    paddle.x1 = 3;
  }
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update
function update() {
  requestAnimationFrame(update);

  moveBall();
  movePaddle();

  drawAll();
}

function updateScore() {
  score++;
  if (score % (brickColNum * brickRowNum) === 0) {
    showAllBricks();
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}

update();

// Event Listener
rulesOpen.addEventListener('click', () => rules.classList.add('show'));
rulesClose.addEventListener('click', () => rules.classList.remove('show'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
});
