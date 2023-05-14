import React, { useState } from "react";
import classNames from "classnames";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [animationClass, setAnimationClass] = useState(null);
  const [animations, setAnimations] = useState(Array(9).fill(null));

  const handleSquareClick = (index) => {
    if (board[index] || gameOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const newPlayer = player === "X" ? "O" : "X";
    setPlayer(newPlayer);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setGameOver(true);
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
    }

    const animationClasses = [
      "animate-spin",
    ];
    const randomClass =
      animationClasses[Math.floor(Math.random() * animationClasses.length)];
    console.log("Random animation class selected:", randomClass);
    const newAnimations = [...animations];
    newAnimations[index] = randomClass;
    setAnimations(newAnimations);
    setTimeout(() => {
      const newAnimations = [...animations];
      newAnimations[index] = null;
      setAnimations(newAnimations);
    }, 1000);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-5xl font-bold mb-4 text-white">Tic Tac Toe</h1>

        <div className="grid grid-cols-3 gap-2">
          {board.map((square, index) => (
            <button
              id={`square-${index}`}
              key={index}
              className={classNames(
                "w-28 h-28 m-1 text-3xl font-bold text-white rounded-lg border-gray-500 border-2",
                {
                  "bg-red-500": square === "O",
                  "bg-gray-500 cursor-not-allowed": square !== null || gameOver,
                  "bg-blue-500": square === "X",
                  [animations[index]]: animations[index],
                }
              )}
              onClick={() => handleSquareClick(index)}
              disabled={square || gameOver}
            >
              {square}
            </button>
          ))}
        </div>

        {gameOver && (
          <div
            className="text-center font-bold mt-4 text-white"
            style={{ fontSize: "32px" }}
          >
            {winner ? `${winner} wins!` : "It's a tie!"}
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
