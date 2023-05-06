import React, { useState, useEffect } from "react";

function MineSweeper() {
  const [board, setBoard] = useState([]);
  const [numMines, setNumMines] = useState(10);

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push({
          isMine: false,
          isRevealed: false,
          adjacentMines: 0
        });
      }
      newBoard.push(row);
    }

    for (let i = 0; i < numMines; i++) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      if (newBoard[randomRow][randomCol].isMine) {
        i--;
      } else {
        newBoard[randomRow][randomCol].isMine = true;
      }
    }

    setBoard(newBoard);
  }, [numMines]);

  function getNeighbors(row, col) {
    const neighbors = [];
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i < 0 || i > 9 || j < 0 || j > 9 || (i === row && j === col)) {
          continue;
        }
        neighbors.push([i, j]);
      }
    }
    return neighbors;
  }

  function handleReveal(row, col) {
    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;
    setBoard(newBoard);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-1/2 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Mine Sweeper</h1>
        <p className="text-lg mb-4">Number of mines: {numMines}</p>
        <table className="table-auto mx-auto">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleReveal(rowIndex, colIndex)}
                    className={`border w-8 h-8 text-center ${
                      cell.isRevealed
                        ? cell.isMine
                          ? "bg-red-500"
                          : cell.adjacentMines === 0
                            ? "bg-gray-200"
                            : "bg-gray-300"
                        : "bg-gray-400"
                    }`}
                  >
                    {cell.isRevealed && cell.adjacentMines > 0 && cell.adjacentMines}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MineSweeper;


