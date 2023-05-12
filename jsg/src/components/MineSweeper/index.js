import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import Timer from "../Timer";

function MineSweeper() {
  const [board, setBoard] = useState([]);
  const [numMines, setNumMines] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [numSafeSpots, setNumSafeSpots] = useState(100 - numMines);
  const [boardSize, setBoardSize] = useState(8);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const startTime = new Date().getTime();
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      setTime(elapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function create_board(width, height, numMines) {
    const board = [];

    // Create an empty board with the specified dimensions
    for (let row = 0; row < height; row++) {
      board.push(Array(width).fill(null));
    }

    // Place the specified number of mines randomly on the board
    for (let i = 0; i < numMines; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
      } while (board[y][x] && board[y][x].isMine);
      board[y][x] = { isMine: true, isRevealed: false };
    }

    // Calculate the number of adjacent mines for each cell
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!board[y][x]) {
          let count = 0;
          for (let yOffset = -1; yOffset <= 1; yOffset++) {
            for (let xOffset = -1; xOffset <= 1; xOffset++) {
              const xNeighbor = x + xOffset;
              const yNeighbor = y + yOffset;
              if (
                xNeighbor >= 0 &&
                xNeighbor < width &&
                yNeighbor >= 0 &&
                yNeighbor < height &&
                board[yNeighbor][xNeighbor] &&
                board[yNeighbor][xNeighbor].isMine
              ) {
                count++;
              }
            }
          }
          board[y][x] = { isMine: false, isRevealed: false, count };
        }
      }
    }

    console.log("Board created:", board);
    return board;
  }

  // Set the initial state of the board variable using the create_board function
  useEffect(() => {
    const { width, height, mines } = difficultyLevels["easy"];
    const newMines = Math.min(mines, Math.floor(width * height * 0.15));
    setBoard(create_board(width, height, newMines));
    setBoardSize(width);
    setNumMines(newMines);
    setNumSafeSpots(width * height - newMines);
  }, []);

  const difficultyLevels = {
    easy: { width: 8, height: 12, mines: 10 },
    medium: { width: 12, height: 18, mines: 20 },
    hard: { width: 16, height: 48, mines: 48 },
  };

  const handleBoardSizeChange = (difficulty) => {
    if (difficultyLevels[difficulty]) {
      const { width, height, mines } = difficultyLevels[difficulty];
      const maxMines = Math.floor(width * height * 0.15);
      const newMines = Math.min(mines, maxMines);
      const newBoard = create_board(width, height, newMines);
      setBoard(newBoard);
      setBoardSize(width);
      setNumMines(newMines);
      setNumSafeSpots(width * height - newMines);
    }
  };

  useEffect(() => {
    handleBoardSizeChange("easy");
  }, []);

  // Function to start a new game
  function startGame() {
    console.log("Starting new game");

    setGameOver(false);

    // Create a new game board with the current settings
    const newBoard = create_board(boardSize, boardSize, numMines);
    console.log(
      `New board created with dimensions ${boardSize} x ${boardSize} and ${numMines} mines`
    );
    setBoard(newBoard);
    setNumSafeSpots(boardSize * boardSize - numMines);

    // Start the timer
    const startTime = new Date().getTime();
    console.log("Starting timer");
    setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - startTime) / 1000;
      setTime(elapsedTime);
    }, 1000);
  }

  // This function is called whenever a cell on the game board is clicked
  function handleCellClick(row, col) {
    // Get the cell that was clicked
    const clickedCell = board[row][col];

    // If the game is over, the cell is already revealed, or the cell is flagged, do nothing
    if (gameOver || clickedCell.isRevealed || clickedCell.isFlagged) {
      return;
    }

    // If the clicked cell contains a mine, end the game and reveal all mines on the board
    if (clickedCell.isMine) {
      clickedCell.isRevealed = true;
      setGameOver(true);
      revealAllMines();
      return;
    }

    // If the clicked cell is not a mine, reveal it and any adjacent empty cells
    const newBoard = [...board];
    const numAdjacentMines = getNumAdjacentMines(row, col);

    if (numAdjacentMines === 0) {
      revealEmptyCells(row, col, newBoard);
    } else {
      newBoard[row][col].isRevealed = true;
    }

    // Update the game board and decrement the number of safe spots remaining
    setBoard(newBoard);
    setNumSafeSpots(numSafeSpots - 1);

    // If all safe spots have been revealed, end the game
    if (numSafeSpots === numMines) {
      setGameOver(true);
    }
  }

  // This function returns the number of mines adjacent to a given cell
  function getNumAdjacentMines(row, col) {
    let numMines = 0;
    const adjacentCells = getAdjacentCells(row, col);

    // Check each adjacent cell to see if it contains a mine
    adjacentCells.forEach(({ row: adjRow, col: adjCol }) => {
      if (board[adjRow][adjCol].isMine) {
        numMines++;
      }
    });

    return numMines;
  }

  // This function returns an array of all cells adjacent to a given cell
  function getAdjacentCells(row, col) {
    const adjacentCells = [];

    // Check each cell surrounding the given cell to see if it is on the game board
    // and not the cell itself, and if so, add it to the adjacentCells array
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 &&
          r < boardSize &&
          c >= 0 &&
          c < boardSize &&
          !(r === row && c === col)
        ) {
          adjacentCells.push({ row: r, col: c });
        }
      }
    }

    return adjacentCells;
  }

  function revealEmptyCells(row, col, newBoard) {
    // get adjacent cells
    const adjacentCells = getAdjacentCells(row, col);

    // reveal the clicked cell
    newBoard[row][col].isRevealed = true;

    // recursively reveal adjacent cells until no more empty cells are found
    adjacentCells.forEach(({ row: adjRow, col: adjCol }) => {
      const adjCell = newBoard[adjRow][adjCol];
      if (!adjCell.isRevealed && !adjCell.isMine) {
        const numAdjacentMines = getNumAdjacentMines(adjRow, adjCol);
        if (numAdjacentMines === 0) {
          revealEmptyCells(adjRow, adjCol, newBoard);
        } else {
          newBoard[adjRow][adjCol].isRevealed = true;
        }
        setNumSafeSpots(numSafeSpots - 1);
      }
    });
  }

  function revealAllMines() {
    // create a new board with revealed mines
    const newBoard = [...board];
    newBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });

    // update the board state
    setBoard(newBoard);
  }

  function handleContextMenu(event, row, col) {
    // prevent default right-click behavior
    event.preventDefault();

    // get the clicked cell
    const clickedCell = board[row][col];

    // ignore the click if the game is over or the cell is already revealed
    if (gameOver || clickedCell.isRevealed) {
      return;
    }

    // toggle the flag state of the cell
    const newBoard = [...board];
    const flagging = !clickedCell.isFlagged;
    newBoard[row][col] = {
      ...clickedCell,
      isFlagged: flagging,
    };

    // update the board state
    setBoard(newBoard);
  }

  // define the initial game state
  let gameState = {
    board: [],
    mines: 0,
    minesRemaining: 0,
    gameOver: false,
  };

  function revealMines(board) {
    // reveal all mines on the board
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      });
    });

    // set the game over flag
    gameState.gameOver = true;
  }

  function revealBoard(board) {
    board.forEach((row) => {
      row.forEach((cell) => {
        cell.isRevealed = true;
      });
    });
    gameState.gameOver = true;
  }

  function countAdjacentMines(board, row, col) {
    let count = 0;
    const numRows = board.length;
    const numCols = board[0].length;

    // Check all 8 adjacent cells for mines
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        // Make sure the current cell is not out of bounds
        if (i >= 0 && i < numRows && j >= 0 && j < numCols) {
          const cell = board[i][j];
          if (cell.isMine) {
            count++;
          }
        }
      }
    }

    return count;
  }
  const [gameStatus, setGameStatus] = useState("ongoing");

  function checkForWin(board) {
    let allSafeSpotsRevealed = true;
    let allMinesFlagged = true;

    // Check if all safe spots have been revealed and all mines are flagged
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        const cell = board[i][j];
        if (!cell.isMine && !cell.isRevealed) {
          allSafeSpotsRevealed = false;
        } else if (cell.isMine && !cell.isFlagged) {
          allMinesFlagged = false;
        }
      }
    }

    if (allSafeSpotsRevealed && allMinesFlagged) {
      setGameStatus("win");
    } else {
      // Set the game status based on the current state of the board
      if (allSafeSpotsRevealed && allMinesFlagged) {
        setGameStatus("won");
      } else {
        setGameStatus("ongoing");
      }
    }
  }

  function renderBoard(board) {
    const boardElement = document.getElementById("board");

    boardElement.innerHTML = "";

    board.forEach((row, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.className = "row";

      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";

        if (cell.isRevealed) {
          cellElement.classList.add("revealed");

          if (cell.isMine) {
            cellElement.classList.add("mine");
          } else {
            const count = countAdjacentMines(board, rowIndex, colIndex);
            if (count > 0) {
              cellElement.textContent = count;
            }
          }
        } else {
          if (cell.isFlagged) {
            cellElement.classList.add("flagged");
          }
        }

        cellElement.addEventListener("click", () =>
          handleCellClick(board, cell, rowIndex, colIndex)
        );
        cellElement.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          handleContextMenu(cell);
        });

        rowElement.appendChild(cellElement);
      });

      boardElement.appendChild(rowElement);
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 p-8 rounded-lg shadow-lg border-2 border-gray-800 text-gray-100">
      <div className="bg-gradient-to-br from-green-400 to-blue-600 p-8 rounded-lg shadow-lg text-gray-100 border border-green-900 ">
        <h1
          className="text-center text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "Lato, sans-serif", fontSize: "50px" }}
        >
          Minesweeper
        </h1>
        <p
          className="text-center text-white mb-2 md:mb-0"
          style={{ fontFamily: "Lato, sans-serif", fontSize: "25px" }}
        >
          Safe Spots Remaining: {numSafeSpots - numMines}
        </p>

        {/* Game Status */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-4">
            <p className="text-center text-white">
              {gameOver && (gameStatus === "won" ? "You Win!" : "You Lose!")}
            </p>
          </div>
        </div>
        {/* Game Board */}
        <div className="mt-8">
          <div
            className="grid grid-cols-32 grid-rows-32 justify-content-center items-center"
            style={{ gridTemplateColumns: `repeat(${board.length}, 2rem)` }}
          >
            {board.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}${colIndex}`}
                    className={`w-10 h-10 flex-grow-0 flex-shrink-0 ${
                      cell.isRevealed
                        ? cell.isMine
                          ? "bg-red-600"
                          : "bg-gradient-to-br from-blue-500 to-purple-500"
                        : "bg-gradient-to-br from-blue-400 to-purple-400"
                    } border border-gray-800 focus:outline-thick hover:bg-gradient-to-br ${
                      cell.isRevealed
                        ? cell.isMine
                          ? "bg-red-600"
                          : "from-blue-500 to-purple-500"
                        : "from-blue-400 to-purple-400"
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onContextMenu={(e) =>
                      handleContextMenu(e, rowIndex, colIndex)
                    }
                  >
                    {cell.isFlagged && "🚩"}
                    {cell.isRevealed &&
                      !cell.isMine &&
                      cell.neighborCount !== 0 &&
                      cell.neighborCount}
                    {cell.isRevealed && cell.isMine && "💣"}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Difficulty Buttons */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:outline-none"
                onClick={() => handleBoardSizeChange("easy")}
              >
                Easy
              </button>
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 focus:outline-none"
                onClick={() => handleBoardSizeChange("medium")}
              >
                Medium
              </button>
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 focus:outline-none"
                onClick={() => handleBoardSizeChange("hard")}
              >
                Hard
              </button>
            </div>
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 text-white hover:from-red-600 hover:to-yellow-600 focus:outline-none"
              onClick={() => startGame()}
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MineSweeper;
