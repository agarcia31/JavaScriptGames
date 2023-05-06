import { useState, useEffect } from "react";

function Battleship() {
  // Initialize the game board
  const [board, setBoard] = useState(() => {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  });

  // Initialize game state
  const [numHits, setNumHits] = useState(0);
  const [numMisses, setNumMisses] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [ships, setShips] = useState([]);

  // Place the ships randomly when the component mounts
  useEffect(() => {
    const newShips = placeRandomShips();
    setShips(newShips);
  }, []);

  function placeRandomShips() {
    const shipLengths = [5, 4, 3, 3, 2];
    const ships = [];

    shipLengths.forEach((length) => {
      let isShipPlaced = false;

      while (!isShipPlaced) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        isShipPlaced = placePiece(row, col, length, direction, ships);
      }
    });

    return ships;
  }

  function placePiece(row, col, length, direction, ships) {
    const ship = [];
    let canPlaceShip = true;

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        if (
          col + i >= 10 ||
          ships.some(([r, c]) => r === row && c === col + i)
        ) {
          canPlaceShip = false;
          break;
        }
        ship.push([row, col + i]);
      } else {
        if (
          row + i >= 10 ||
          ships.some(([r, c]) => r === row + i && c === col)
        ) {
          canPlaceShip = false;
          break;
        }
        ship.push([row + i, col]);
      }
    }

    if (canPlaceShip) {
      ships.push(...ship);
    }

    return canPlaceShip;
  }

  function handleAttack(row, col) {
    const newBoard = [...board];
    let hit = false;

    ships.forEach(([r, c]) => {
      if (r === row && c === col) {
        hit = true;
      }
    });

    if (hit) {
      console.log("Hit!");
      newBoard[row][col] = 2;
      setNumHits(numHits + 1);
    } else {
      console.log("Miss!");
      newBoard[row][col] = 3;
      setNumMisses(numMisses + 1);
    }

    setBoard(newBoard);
  }

  useEffect(() => {
    if (numHits === 17) {
      setIsGameOver(true);
    }
  }, [numHits]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-8">Battleship Game</h1>
      <div className="w-96 h-96 grid grid-cols-10 grid-rows-10 gap-1">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${
                cell === 0
                  ? "bg-blue-500"
                  : cell === 1
                  ? "bg-gray-400"
                  : cell === 2
                  ? "bg-red-500"
                  : "bg-gray-500"
              } h-full w-full`}
              onClick={() => handleAttack(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      {isGameOver && (
        <p className="mt-4 text-2xl font-bold text-green-500">
          Game Over! You Won!
        </p>
      )}
    </div>
  );
}

function placePiece(board, row, col, length, direction) {
  // Check if the ship can be placed on the board
  for (let i = 0; i < length; i++) {
    if (direction === "horizontal" && col + i >= 10) {
      return false;
    } else if (direction === "vertical" && row + i >= 10) {
      return false;
    } else if (board[row][col] === 1) {
      return false;
    }
  }

  // Place the ship on the board
  for (let i = 0; i < length; i++) {
    if (direction === "horizontal") {
      board[row][col + i] = 1;
    } else {
      board[row + i][col] = 1;
    }
  }

  return true;
}

export default Battleship;
