import React, { useState } from "react";

const createBoard = (numRows, numCols) => {
  const board = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(null);
    }
    board.push(currentRow);
  }
  return board;
};
const ConnectFour = ({
  numRows = 6,
  numCols = 7,
  player1 = "Player 1",
  player2 = "Player 2",
}) => {
  const [board, setBoard] = useState(createBoard(numRows, numCols));

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const players = ["red", "yellow"];

  const dropPiece = (colIndex) => {
    const newBoard = [...board];
    for (let rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) {
      if (newBoard[rowIndex][colIndex] === null) {
        newBoard[rowIndex][colIndex] = players[currentPlayerIndex];
        setBoard(newBoard);
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        break;
      }
    }
  };

  const resetBoard = () => {
    setBoard(createBoard(numRows, numCols));
    setCurrentPlayerIndex(0);
  };

  const checkWinner = () => {
    // Check rows for winner
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols - 3; colIndex++) {
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex][colIndex + 1];
        const cell3 = board[rowIndex][colIndex + 2];
        const cell4 = board[rowIndex][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          return true;
        }
      }
    }

    // Check columns for winner
    for (let rowIndex = 0; rowIndex < numRows - 3; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex + 1][colIndex];
        const cell3 = board[rowIndex + 2][colIndex];
        const cell4 = board[rowIndex + 3][colIndex];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          return true;
        }
      }
    }

    // Check diagonals (positive slope) for winner
    for (let rowIndex = 0; rowIndex < numRows - 3; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols - 3; colIndex++) {
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex + 1][colIndex + 1];
        const cell3 = board[rowIndex + 2][colIndex + 2];
        const cell4 = board[rowIndex + 3][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          return true;
        }
      }
    }

    // Check diagonals (negative slope) for winner
    for (let rowIndex = 3; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols - 3; colIndex++) {
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex - 1][colIndex + 1];
        const cell3 = board[rowIndex - 2][colIndex + 2];
        const cell4 = board[rowIndex - 3][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          return true;
        }
      }
    }
    // Check for diagonal wins (bottom-left to top-right)
    for (let rowIndex = numRows - 1; rowIndex >= 3; rowIndex--) {
      for (let colIndex = 0; colIndex <= numCols - 4; colIndex++) {
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex - 1][colIndex + 1];
        const cell3 = board[rowIndex - 2][colIndex + 2];
        const cell4 = board[rowIndex - 3][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          return true;
        }
      }
    }
    // No winner found
    return false;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Connect Four</h1>
      <div className="grid grid-cols-7 gap-4 bg-blue-500 p-4 rounded-md">
  {board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const isRed = cell === "red";
      const isYellow = cell === "yellow";
      const isActive = currentPlayerIndex === (isRed ? 0 : 1);
      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`h-12 w-12 rounded-full ${
            isRed ? "bg-red-500" : isYellow ? "bg-yellow-500" : "bg-white"
          } cursor-pointer ${
            isActive ? "border-2 border-white" : ""
          }`}
          onClick={() => dropPiece(colIndex)}
        />
      );
    })
  )}
</div>

      <div>
        {checkWinner() && (
          <p className="text-lg font-bold text-green-500">{`${
            players[currentPlayerIndex] === "red"
              ? player1.toUpperCase()
              : player2.toUpperCase()
          } wins!`}</p>
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
