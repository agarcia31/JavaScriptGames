import React, { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [status, setStatus] = useState("Next player: X");
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  function handleClick(index) {
    // If there is already a winner or the square is already occupied, do nothing
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");

    // Check for winner after each move
    const winner = calculateWinner(newBoard);
    if (winner) {
      setStatus(`Winner: ${winner}`);
      if (winner === "X") {
        setXWins(xWins + 1);
      } else {
        setOWins(oWins + 1);
      }
    } else {
      setStatus(`Next player: ${player}`);
    }
  }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setStatus("Next player: X");
  }

  function renderSquare(index) {
    const squareValue = board[index];
    let bgColor = "bg-green-500";
    if (squareValue === "X") {
      bgColor = "bg-blue-600";
    } else if (squareValue === "O") {
      bgColor = "bg-red-600";
    }
    return (
      <div className="flex justify-center items-center">
        <button
          className={` ${bgColor} hover:bg-gray-800 font-bold py-48 px-48 rounded`}
          onClick={() => handleClick(index)}
        >
          <span style={{ fontSize: `36px`, color: "white" }}>{squareValue}</span>
        </button>
      </div>
    );
  }

  const winner = calculateWinner(board);

  return (
    <div>
<div style={{ backgroundColor: "#262626" }}>
  <div className="grid grid-cols-3 gap-1 p-12">
    <div className="col-span-3 text-center font-bold">
      <h1 className="text-4xl text-white mb-4" style={{ fontFamily: "Arial", fontSize:"96px" }}>Tic Tac Toe</h1>
    </div>

    <div className="col-span-3 text-center text-white font-bold">
      <div className="text-3xl mb-8" style={{ marginTop: "25px" }}>
        {winner ? `Winner: ${winner}` : <span style={{ fontFamily: "Arial", fontSize:"48px" }}>Next player: {player}</span>}
      </div>
      <div className="text-lg mb-4" style={{ fontFamily: "Arial", fontSize:"28px", marginTop: "5px" }}>
        X Wins: {xWins} | O Wins: {oWins}
      </div>
    </div>
  </div>
</div>


  
      <div className={`grid grid-cols-3 gap-4`} style={{ backgroundColor: "#A9A3A3", margin: "5px" }}>
        {board.map((square, index) => (
          <div key={index} className="col-span-1">
            {renderSquare(index)}
          </div>
        ))}
  
        <div className="col-span-3 text-center font-bold text-lg mt-4">
          <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );    
}


function calculateWinner(board) {
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
}

export default TicTacToe;
