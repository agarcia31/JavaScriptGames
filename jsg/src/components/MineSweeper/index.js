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

  function create_board(boardWidth, boardHeight, numMines) {
    const board = [];

    // Create an empty board with the specified dimensions
    for (let i = 0; i < boardHeight; i++) {
      board[i] = Array(boardWidth).fill(null);
    }

    // Place the specified number of mines randomly on the board
    for (let i = 0; i < numMines; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * boardWidth);
        y = Math.floor(Math.random() * boardHeight);
      } while (board[y][x] && board[y][x].isMine);
      board[y][x] = { isMine: true, isRevealed: false };
    }

    // Calculate the number of adjacent mines for each cell
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        if (!board[y][x]) {
          let count = 0;
          if (
            y > 0 &&
            x > 0 &&
            board[y - 1][x - 1] &&
            board[y - 1][x - 1].isMine
          )
            count++;
          if (y > 0 && board[y - 1][x] && board[y - 1][x].isMine) count++;
          if (
            y > 0 &&
            x < boardWidth - 1 &&
            board[y - 1][x + 1] &&
            board[y - 1][x + 1].isMine
          )
            count++;
          if (x > 0 && board[y][x - 1] && board[y][x - 1].isMine) count++;
          if (x < boardWidth - 1 && board[y][x + 1] && board[y][x + 1].isMine)
            count++;
          if (
            y < boardHeight - 1 &&
            x > 0 &&
            board[y + 1][x - 1] &&
            board[y + 1][x - 1].isMine
          )
            count++;
          if (y < boardHeight - 1 && board[y + 1][x] && board[y + 1][x].isMine)
            count++;
          if (
            y < boardHeight - 1 &&
            x < boardWidth - 1 &&
            board[y + 1][x + 1] &&
            board[y + 1][x + 1].isMine
          )
            count++;
          board[y][x] = { isMine: false, isRevealed: false, count };
        }
      }
    }
    console.log("Board created:", board);
    return board;
  }

  // Set the initial state of the board variable using the create_board function
  useEffect(() => {
    setBoard(create_board(boardSize, boardSize, numMines));
  }, []);

  const difficultyLevels = {
    easy: { width: 8, height: 8, mines: 10 },
    medium: { width: 16, height: 16, mines: 40 },
    hard: { width: 30, height: 16, mines: 99 },
  };

  function create_board_with_difficulty(difficulty) {
    console.log(`Creating board with ${difficulty} difficulty level`);
    const { width, height, mines } = difficultyLevels[difficulty];
    const board = create_board(width, height, mines);
    console.log(
      `Board created with dimensions ${width} x ${height} and ${mines} mines`
    );
    setBoard(board);
  }

  // Set the initial state of the board variable using the create_board function
  useEffect(() => {
    create_board_with_difficulty("medium");
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

  // Function to handle changes to the game board size
  const handleBoardSizeChange = (event) => {
    const size = parseInt(event.target.value);
    const maxMines = Math.floor(size * size * 0.15); // Maximum number of mines based on 15% of total spots
    let newMines = Math.floor(
      (numMines * size * size) / (boardSize * boardSize)
    ); // Maintain same mine density when changing board size
    newMines = Math.min(newMines, maxMines); // Ensure number of mines doesn't exceed maximum

    // Update state with new board size and number of mines
    setBoardSize(size);
    setNumMines(newMines);
  };

  useEffect(() => {
    startGame(); // Start a new game when the component is mounted
  }, []);

  // This function is called whenever a cell on the game board is clicked
  function handleCellClick(row, col) {
    // Get the cell that was clicked
    const clickedCell = board[row][col];

    // If the game is over or the cell has already been revealed, do nothing
    if (gameOver || clickedCell.isRevealed) {
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

  function checkForWin(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        const cell = board[i][j];
        if (!cell.isMine && !cell.isRevealed) {
          // If a safe cell is not revealed, the game is not won yet
          return false;
        } else if (cell.isMine && !cell.isFlagged) {
          // If a mine is not flagged, the game is not won yet
          return false;
        }
      }
    }
    // If all safe spots are revealed and no mines are left unflagged, the game is won
    return true;
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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Minesweeper</h1>

        {/* Game Board */}
        <div className="grid grid-cols-8 justify-space">
  {board.map((row, rowIndex) => (
    <React.Fragment key={rowIndex}>
      {row.map((cell, colIndex) => (
        <button
          key={`${rowIndex}${colIndex}`}
          className={`w-10 h-10 ${
            cell.isRevealed
              ? cell.isMine
                ? "bg-red-600"
                : "bg-gray-400"
              : "bg-gray-500"
          } border border-gray-800 focus:outline-thick`}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex)}
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


        {/* Game Status */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-white">
            Safe Spots Remaining: {numSafeSpots - numMines} / {numSafeSpots}
          </p>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            onClick={() => startGame()}
          >
            Reset Game
          </button>
          <p className="text-white">
            {gameOver && `Game Over! ${checkForWin ? "You Win!" : "You Lose!"}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MineSweeper;
