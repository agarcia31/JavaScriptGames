import React, { useState } from "react";

const ConnectFour = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null))
  );
  const [player, setPlayer] = useState("red");

  const dropPiece = (colIndex) => {
    const newBoard = [...board];
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (newBoard[i][colIndex] === null) {
        newBoard[i][colIndex] = player;
        setBoard(newBoard);
        setPlayer(player === "red" ? "yellow" : "red");
        return; // Stop the loop once the piece has been placed
      }
    }
  };

  const checkWinner = () => {
    // Check for horizontal wins
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          return true;
        }
      }
    }

    // Check for vertical wins
    for (let col = 0; col < board[0].length; col++) {
      for (let row = 0; row < board.length - 3; row++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          return true;
        }
      }
    }

    // Check for diagonal wins (top-left to bottom-right)
    for (let row = 0; row < board.length - 3; row++) {
      for (let col = 0; col < board[row].length - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row][col] === board[row + 2][col + 2] &&
          board[row][col] === board[row + 3][col + 3]
        ) {
          return true;
        }
      }
    }

    // Check for diagonal wins (bottom-left to top-right)
    for (let row = board.length - 1; row >= 3; row--) {
      for (let col = 0; col < board[row].length - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row - 1][col + 1] &&
          board[row][col] === board[row - 2][col + 2] &&
          board[row][col] === board[row - 3][col + 3]
        ) {
          return true;
        }
      }
    }

    // No winner found
    return false;
  };

  const resetBoard = () => {
    setBoard(Array.from({ length: 6 }, () => Array(7).fill(null)));
    setPlayer("red");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Connect Four</h1>
      <div className="grid grid-cols-7 gap-4 bg-blue-500 p-4 rounded-md">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-12 w-12 rounded-full ${
                cell === "red"
                  ? "bg-red-500"
                  : cell === "yellow"
                  ? "bg-yellow-500"
                  : ""
              } cursor-pointer`}
              onClick={() => dropPiece(colIndex)}
            />
          ))
        )}
      </div>
      <div>
        {checkWinner() && (
          <p className="text-lg font-bold text-green-500">{`${player.toUpperCase()} wins!`}</p>
        )}
        {!checkWinner() && board.flat().every((cell) => cell !== null) && (
          <p className="text-lg font-bold text-gray-500">It's a tie!</p>
        )}
      </div>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
        onClick={resetBoard}
      >
        Reset
      </button>
      <div className="mt-4"></div>
    </div>
  );
};

export default ConnectFour;
