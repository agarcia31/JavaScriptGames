import React, { useState } from "react";
import useSound from "use-sound";
import dropSound from "../../sound effects/dropSound.mp3";

// Helper function to create a new Connect Four board with the specified number of rows and columns
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

// Main Connect Four component
const ConnectFour = ({
  numRows = 6,
  numCols = 7,
  player1 = "Player 1",
  player2 = "Player 2",
}) => {
  // Initialize state for the board, current player index, and winner
  const [board, setBoard] = useState(createBoard(numRows, numCols));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  // Initialize state for whether a piece has been dropped (used to determine when to play the "drop" sound effect)
  const [hasPieceDropped, setHasPieceDropped] = useState(false);

  // Define the players and the "drop" sound effect using the useSound hook
  const players = ["red", "yellow"];
  const [playDrop] = useSound(dropSound);

  // Function to drop a piece in the specified column
  const dropPiece = (colIndex) => {
    if (winner) return; // End the game if there's already a winner
    const newBoard = [...board];
    // Find the lowest empty slot in the specified column and drop the piece there
    for (let rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) {
      if (newBoard[rowIndex][colIndex] === null) {
        newBoard[rowIndex][colIndex] = players[currentPlayerIndex];
        setBoard(newBoard);
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        playDrop();
        const isWinner = checkWinner();
        if (isWinner) {
          setWinner(players[currentPlayerIndex]);
        }
        break;
      }
    }
  };

  // Function to reset the board (used when starting a new game)
  const resetBoard = () => {
    setBoard(createBoard(numRows, numCols));
    setCurrentPlayerIndex(0);
    setWinner(null);
    setHasPieceDropped(false);
  };

  const checkWinner = () => {
    // Check rows for winner
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols - 3; colIndex++) {
        // Check if 4 cells in a row are the same
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex][colIndex + 1];
        const cell3 = board[rowIndex][colIndex + 2];
        const cell4 = board[rowIndex][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          // Return true if 4 cells in a row are the same
          return true;
        }
      }
    }

    // Check columns for winner
    for (let rowIndex = 0; rowIndex < numRows - 3; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        // Check if 4 cells in a column are the same
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex + 1][colIndex];
        const cell3 = board[rowIndex + 2][colIndex];
        const cell4 = board[rowIndex + 3][colIndex];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          // Return true if 4 cells in a column are the same
          return true;
        }
      }
    }

    // Check diagonals (positive slope) for winner
    for (let rowIndex = 0; rowIndex < numRows - 3; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols - 3; colIndex++) {
        // Check if 4 cells in a diagonal (positive slope) are the same
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex + 1][colIndex + 1];
        const cell3 = board[rowIndex + 2][colIndex + 2];
        const cell4 = board[rowIndex + 3][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          // Return true if 4 cells in a diagonal (positive slope) are the same
          return true;
        }
      }
    }

    // Check diagonals (negative slope) for winner
    for (let rowIndex = 3; rowIndex < numRows; rowIndex++) {
      for (let colIndex = 0; colIndex < numCols - 3; colIndex++) {
        // Check if 4 cells in a diagonal (negative slope) are the same
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex - 1][colIndex + 1];
        const cell3 = board[rowIndex - 2][colIndex + 2];
        const cell4 = board[rowIndex - 3][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          // Return true if 4 cells in a diagonal (negative slope) are the same
          return true;
        }
      }
    }
    // Check for diagonal wins (bottom-left to top-right)
    for (let rowIndex = numRows - 1; rowIndex >= 3; rowIndex--) {
      for (let colIndex = 0; colIndex <= numCols - 4; colIndex++) {
        // Check if 4 cells in a diagonal (bottom-left to top-right) are the same
        const cell1 = board[rowIndex][colIndex];
        const cell2 = board[rowIndex - 1][colIndex + 1];
        const cell3 = board[rowIndex - 2][colIndex + 2];
        const cell4 = board[rowIndex - 3][colIndex + 3];
        if (cell1 && cell1 === cell2 && cell2 === cell3 && cell3 === cell4) {
          // Return true if 4 cells in a diagonal (bottom-left to top-right) are the same
          return true;
        }
      }
    }
    // No winner found
    return false;
  };
  return (
    // Outermost container with background gradient and brightness filter
    <div className="bg-gradient-to-br from-red-800 via-yellow-400 to-red-800 filter brightness-130">
      {/* // Centered container with game board and controls */}
      <div className="container mx-auto flex flex-col items-center my-8">
        {/* // Game title */}
        <h1
          style={{
            fontSize: "124px",
            fontFamily: "Shadows Into Light",
            fontWeight: "bold",
          }}
          className="text-5xl font-bold text-center mb-8 tracking-wider"
        >
          <span className="mr-12">Connect</span>
          <span className="mr-12">Four</span>
        </h1>
        {/* // Display current player's turn */}
        <h2
          className="text-center mb-4"
          style={{
            fontSize: "50px",
            fontFamily: "Shadows Into Light",
            fontWeight: "bold",
          }}
        >
          {`${
            players[currentPlayerIndex] === "red"
              ? player1.toUpperCase()
              : player2.toUpperCase()
          }'s turn`}
        </h2>
        {/* // Game board with 7 columns and gap between cells */}
        <div className="grid grid-cols-7 gap-4 bg-blue-700 p-4 rounded-md w-full md:max-w-screen-md lg:max-w-screen-lg">
          {board.map((row, rowIndex) =>
            // Map over rows and cells to create each cell element
            row.map((cell, colIndex) => {
              // Determine if cell is occupied by red or yellow player
              const isRed = cell === "red";
              const isYellow = cell === "yellow";
              // Determine if cell is active (i.e. available for current player to drop a piece in)
              const isActive = currentPlayerIndex === (isRed ? 0 : 1);
              return (
                // Individual cell element with dynamic styling based on occupied status, activity, and animation
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-500 ease-in-out ${
                    isRed
                      ? "bg-red-500"
                      : isYellow
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  } ${isActive ? "border-2 border-white ring-2" : ""} ${
                    isActive && isRed
                      ? "ring-red-500"
                      : isActive && isYellow
                      ? "ring-yellow-500"
                      : ""
                  } ${
                    hasPieceDropped ? "animate-drop" : ""
                  } sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20`}
                  onClick={() => dropPiece(colIndex)}
                  onAnimationEnd={() => setHasPieceDropped(false)}
                  style={{
                    transform: hasPieceDropped ? "translateY(350%)" : "",
                  }}
                />
              );
            })
          )}
        </div>
        {/* // Display winner or tie message if game is over */}
        <div className="mt-4">
          {checkWinner() && (
            <p className="text-lg font-bold text-green-500">
              {`${
                players[currentPlayerIndex] === "red"
                  ? player1.charAt(0).toUpperCase() + player1.slice(1)
                  : player2.charAt(0).toUpperCase() + player2.slice(1)
              } wins!`}
            </p>
          )}
          {!checkWinner() && board.flat().every((cell) => cell !== null) && (
            <p className="text-lg font-bold text-gray-500">It's a tie!</p>
          )}
        </div>
        {/* // Button to start a new game */}
        <button
          className="mt-4 mb-4 py-2 px-4 bg-blue-700 text-white rounded-md"    style={{
            fontSize: "25px",
            fontFamily: "Shadows Into Light",
          }}
          onClick={resetBoard}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default ConnectFour;
