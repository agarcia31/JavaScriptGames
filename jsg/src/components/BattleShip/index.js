import { useState } from "react";

const Battleship = () => {
    const [board, setBoard] = useState(Array(10).fill().map(() => Array(10).fill(0)));
    const [message, setMessage] = useState("");
    

  const handleBoardClick = (rowIndex, colIndex) => {
    const newBoard = [...board];
    if (newBoard[rowIndex][colIndex] === 0) {
      newBoard[rowIndex][colIndex] = 1;
      setBoard(newBoard);
    } else if (newBoard[rowIndex][colIndex] === 1) {
      newBoard[rowIndex][colIndex] = 2;
      setBoard(newBoard);
      setMessage("You hit a ship!");
    }
  };

  const handlePlaceShipsClick = () => {
    const newBoard = Array(10).fill().map(() => Array(10).fill(0));
    setBoard(newBoard);
    setMessage("");
  };

  const resetBoard = () => {
    const newBoard = Array(10).fill().map(() => Array(10).fill(0));
    setBoard(newBoard);
    setMessage("");
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center">
      <h1 className="text-3xl my-8 font-bold">Battleship</h1>
      <div className="bg-gray-400 w-96 h-96 border border-gray-800">
        <div className="grid grid-cols-10 grid-rows-10 gap-0" style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`bg-gray-700 w-9 h-9 border border-gray-800 ${cell === 1 ? "bg-gray-500" : cell === 2 ? "bg-red-500" : ""}`}
                  onClick={() => handleBoardClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="my-8 flex flex-col items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePlaceShipsClick}>
          Place Ships
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-4" onClick={resetBoard}>
          Reset Board
        </button>
        {message && <p className="text-lg font-bold">{message}</p>}
      </div>
    </div>
  );
};

export default Battleship;


