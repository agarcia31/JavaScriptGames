import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

function MineSweeper() {
  const [board, setBoard] = useState([]);
  const [numMines, setNumMines] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [numSafeSpots, setNumSafeSpots] = useState(100 - numMines);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push({
          isMine: false,
          isRevealed: false,
          adjacentMines: 0,
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
    setNumSafeSpots(100 - numMines);
    setGameOver(false);
  }, [numMines, key]);

  function getNeighbors(row, col) {
    const neighbors = [];
    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, 9); i++) {
      for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, 9); j++) {
        if (i === row && j === col) {
          continue;
        }
        neighbors.push([i, j]);
      }
    }
    return neighbors;
  }

  function handleReveal(row, col) {
    const clickedCell = board[row][col];
    if (clickedCell.isMine) {
      setGameOver(true);

      const newBoard = board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (cell.isMine) {
            return {
              ...cell,
              isRevealed: true,
            };
          }
          return cell;
        });
      });

      setBoard(newBoard);
      return;
    }

    if (!clickedCell.isRevealed) {
      const newBoard = [...board];
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard);

      if (!clickedCell.isMine) {
        setNumSafeSpots((prev) => prev - 1);
      }
    }
  }

  function handleRestart() {
    setKey((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-1/2 p-8 bg-white rounded-lg shadow-lg flex-grow">
        <h1 className="text-4xl font-bold mb-4 text-center">Mine Sweeper</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg mr-4 font-semibold">
            Number of mines: {numMines}
          </p>
          <p className="text-lg ml-8 mr-4 font-semibold">
            Number of safe spots: {numSafeSpots}
          </p>
        </div>
  
        <table className="table-auto mx-auto bg-gray-200 p-2 rounded-lg shadow-lg">
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
                          ? "bg-gray-400 text-gray-400"
                          : "bg-black"
                        : "bg-black"
                    }`}
                  >
                    {cell.isRevealed &&
                      cell.adjacentMines > 0 &&
                      <span className="text-lg font-bold">
                        {cell.adjacentMines}
                      </span>}
                    {cell.isRevealed && cell.isMine && (
                      <i className="inline-block text-red-800">
                        <FontAwesomeIcon icon={faBomb} className="w-6 h-6" />
                      </i>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-200 ease-in-out"
            onClick={handleRestart}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default MineSweeper;
