import React, { useState } from 'react';

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
  const [player, setPlayer] = useState('red');

  const dropPiece = (colIndex) => {
    const newBoard = [...board];
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (newBoard[i][colIndex] === null) {
        newBoard[i][colIndex] = player;
        break;
      }
    }
    setBoard(newBoard);
    setPlayer(player === 'red' ? 'yellow' : 'red');
  };

  const checkWinner = () => {
    // TODO: Implement check for winner
    return false;
  };

  const resetBoard = () => {
    setBoard(Array(6).fill(Array(7).fill(null)));
    setPlayer('red');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Connect Four</h1>
      <div className="grid grid-cols-7 gap-4 bg-blue-500 p-4 rounded-md">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-12 w-12 rounded-full ${cell === 'red' ? 'bg-red-500' : cell === 'yellow' ? 'bg-yellow-500' : ''} cursor-pointer`}
              onClick={() => dropPiece(colIndex)}
            />
          ))
        )}
      </div>
      <div className="mt-4">
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
    </div>
  );
};

export default ConnectFour;

