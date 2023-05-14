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

    const animationClasses = ["animate-spin"];
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
    }, 450);
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
    <div className="flex h-screen items-center justify-center">
    <div className="flex flex-col items-center justify-center bg-black rounded-lg p-2 md:p-6">
        <h1 className="mb-4 text-white text-center md:text-left"  style={{
            fontSize: "100px",
            fontFamily: "Great Vibes",
          }}>
          Tic-Tac-Toe
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 justify-items-center">
          {board.map((square, index) => (
            <button
              id={`square-${index}`}
              key={index}
              className={classNames(
                "w-12 h-12 sm:w-24 sm:h-24 md:w-48 md:h-48 m-1 text-white rounded-lg border-white border-4 focus:outline-none",
                {
                  "bg-red-600": square === "O",
                  "bg-blue-600": square === "X",
                  [animations[index]]: animations[index],
                }
              )} style={{
                fontSize: "125px",
                fontFamily: "Shadows Into Light",
              }}
              onClick={() => handleSquareClick(index)}
              disabled={square || gameOver}
            >
              {square}
            </button>
          ))}
        </div>
  
        {gameOver && (
          <div className="text-center font-bold mt-4 text-white text-2xl md:text-3xl">
            {winner ? `${winner} wins!` : "It's a tie!"}
          </div>
        )}
  
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold" style={{
              fontSize: "40px",
              fontFamily: "Shadows Into Light",
            }}
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
