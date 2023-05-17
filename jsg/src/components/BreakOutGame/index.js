import React, { useEffect, useRef, useState } from "react";

function BreakOutGame() {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [paddle, setPaddle] = useState(null);
  const [bricks, setBricks] = useState([]);
  const [ball, setBall] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);

    console.log("Canvas initialized");

    const paddleWidth = 150;
    const paddleHeight = 20;
    const paddleSpeed = 10;    

    setPaddle({
      x: canvas.width / 2 - paddleWidth / 2,
      y: canvas.height - paddleHeight - 5,
      width: paddleWidth,
      height: paddleHeight,
      speed: paddleSpeed,
    });

    console.log("Paddle initialized");

    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 100;
    const brickHeight = 30;
    const brickPadding = 15;
    const brickOffsetTop = 50;
    const brickOffsetLeft = 50;
    

    const bricks = [];

    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        bricks.push({
          x: c * (brickWidth + brickPadding) + brickOffsetLeft,
          y: r * (brickHeight + brickPadding) + brickOffsetTop,
          width: brickWidth,
          height: brickHeight,
          status: 1,
        });
      }
    }

    setBricks(bricks);

    console.log("Bricks initialized");

    const ballRadius = 12;
    const ballSpeed = 2;
    

    setBall({
      x: canvas.width / 2,
      y: canvas.height - paddleHeight - ballRadius - 5,
      radius: ballRadius,
      dx: ballSpeed,
      dy: -ballSpeed,
      speed: ballSpeed,
    });

    console.log("Ball initialized");
  }, []);
  function gameLoop() {
    console.log("Game loop iteration");

    moveBall(canvasRef.current);
    draw();

    const gameLoopRef = requestAnimationFrame(gameLoop);
    console.log("Game loop ref:", gameLoopRef);
  }

  useEffect(() => {
    if (context && paddle && bricks && ball) {
      const gameLoopRef = requestAnimationFrame(gameLoop);

      console.log("Game loop started");

      return () => {
        cancelAnimationFrame(gameLoopRef);
        console.log("Game loop stopped");
      };
    }
  }, [context, paddle, bricks, ball]);

  useEffect(() => {
    if (context && paddle && bricks && ball) {
      draw();
    }
  }, [context, paddle, bricks, ball]);

  function startGame() {
    console.log("Game started");

    if (!gameStarted) {
      setGameStarted(true);
      requestAnimationFrame(gameLoop);
    }
  }

  function moveBall(canvas) {
    console.log("Moving ball");

    if (!gameStarted) return;

    setBall((prevBall) => {
      const updatedBall = { ...prevBall };

      updatedBall.x += updatedBall.dx;
      updatedBall.y += updatedBall.dy;

      if (
        updatedBall.x + updatedBall.radius > canvas.width ||
        updatedBall.x - updatedBall.radius < 0
      ) {
        updatedBall.dx = -updatedBall.dx;
      }
      if (updatedBall.y - updatedBall.radius < 0) {
        updatedBall.dy = -updatedBall.dy;
      }
      if (
        updatedBall.y + updatedBall.radius >= paddle.y &&
        updatedBall.x >= paddle.x &&
        updatedBall.x <= paddle.x + paddle.width
      ) {
        updatedBall.dy = -updatedBall.dy;
      }

      bricks.forEach((brick) => {
        if (brick.status === 1) {
          if (
            updatedBall.x + updatedBall.radius >= brick.x &&
            updatedBall.x - updatedBall.radius <= brick.x + brick.width &&
            updatedBall.y + updatedBall.radius >= brick.y &&
            updatedBall.y - updatedBall.radius <= brick.y + brick.height
          ) {
            updatedBall.dy = -updatedBall.dy;
            brick.status = 0;
          }
        }
      });

      if (updatedBall.y + updatedBall.radius > canvas.height) {
        setGameStarted(false);
        console.log("Game over!");
      }

      return updatedBall;
    });
  }

  function draw() {
    console.log("Drawing");

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drawPaddle();
    drawBricks();
    drawBall();
  }

  function drawPaddle() {
    console.log("Drawing paddle");

    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
  }

  function movePaddle(direction) {
    console.log("Moving paddle:", direction);

    setPaddle((prevPaddle) => {
      const updatedPaddle = { ...prevPaddle };

      if (direction === "left") {
        updatedPaddle.x -= updatedPaddle.speed;
      } else if (direction === "right") {
        updatedPaddle.x += updatedPaddle.speed;
      }

      // Make sure the paddle stays within the game board
      if (updatedPaddle.x < 0) {
        updatedPaddle.x = 0;
      } else if (
        updatedPaddle.x >
        canvasRef.current.width - updatedPaddle.width
      ) {
        updatedPaddle.x = canvasRef.current.width - updatedPaddle.width;
      }

      return updatedPaddle;
    });
  }

  function handleKeyPress(event) {
    console.log("Key press:", event.key);

    if (event.key === "ArrowLeft") {
      movePaddle("left");
    } else if (event.key === "ArrowRight") {
      movePaddle("right");
    } else if (event.key === " ") {
      startGame();
    }
  }

  function startGame() {
    console.log("Game started");

    setGameStarted(true);
  }

  function drawBricks() {
    console.log("Drawing bricks");

    bricks.forEach((brick) => {
      if (brick.status === 1) {
        context.beginPath();
        context.rect(brick.x, brick.y, brick.width, brick.height);
        context.fillStyle = "#0095DD";
        context.fill();
        context.closePath();
      }
    });
  }

  function drawBall() {
    console.log("Drawing ball");

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="game-board"
        tabIndex={0}
        onKeyDown={handleKeyPress}
        width={800}
        height={600}
      ></canvas>
    </div>
  );
}

export default BreakOutGame;
