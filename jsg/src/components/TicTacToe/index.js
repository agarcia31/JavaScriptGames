import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (i) => {
    const newBoard = [...board];
    if (winner || newBoard[i]) return;
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (i) => {
    return (
      <button className="border-2 border-gray-500 p-4 text-4xl font-bold" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((square) => square !== null)) {
    status = 'Draw';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-4">
        {board.map((square, index) => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
    </div>
  );
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

export default TicTacToe;



