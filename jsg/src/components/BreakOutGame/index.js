import React, { useState, useEffect, useRef } from 'react';

const PaddleComponent = ({ position }) => {
  return (
    <div
      className="absolute bottom-0 w-40 h-8 bg-gray-800 rounded-lg"
      style={{ left: position }}
    ></div>
  );
};

const BreakoutGame = () => {
  const gameRef = useRef(null);
  const [game, setGame] = useState(null);
  const [boardSize, setBoardSize] = useState(0);
  const [paddlePosition, setPaddlePosition] = useState(0);

  class Gameboard {
    constructor() {
      this.board = [];
    }

    createBoard(height, width) {
      this.board = Array(height).fill(Array(width).fill(0));
    }

    getBoard() {
      return this.board;
    }
  }

  useEffect(() => {
    setGame(new Gameboard());
  }, []);

  useEffect(() => {
    if (game) {
      const height = boardSize; // Number of rows
      const width = 8; // Number of columns

      game.createBoard(height, width);
    }
  }, [game, boardSize]);

  const handleCreateBoard = () => {
    const height = 20; // Number of rows
    const width = 8; // Number of columns

    game.createBoard(height, width);
    setBoardSize(height);

    console.log(game.getBoard()); // Log the created game board
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handleMovePaddle('left');
      } else if (event.key === 'ArrowRight') {
        handleMovePaddle('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMovePaddle = (direction) => {
    // Define the paddle speed
    const paddleSpeed = 5;

    if (direction === 'left') {
      // Move the paddle to the left
      setPaddlePosition((prevPosition) => prevPosition - paddleSpeed);
    } else if (direction === 'right') {
      // Move the paddle to the right
      setPaddlePosition((prevPosition) => prevPosition + paddleSpeed);
    }
  };

  return (
    <div>
      <button onClick={handleCreateBoard}>Create Board</button>
      <p>Board Size: {boardSize}</p>
      <div className="relative">
        {game && (
          <div className="relative bg-gray-200 p-4">
            {game.getBoard().map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => (
                  <span
                    key={colIndex}
                    className={`w-8 h-8 border border-gray-400 ${
                      cell ? 'bg-blue-500' : 'bg-white'
                    }`}
                  ></span>
                ))}
              </div>
            ))}
          </div>
        )}
        <PaddleComponent position={paddlePosition} />
      </div>
    </div>
  );
};

export default BreakoutGame;
