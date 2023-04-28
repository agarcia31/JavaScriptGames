import React from 'react';

const QuickLinks = ({ handlePageChange }) => {
  return (
    <div className="flex justify-center space-x-4 py-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => handlePageChange('home')}
      >
        Home
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => handlePageChange('tictactoe')}
      >
        Tic Tac Toe
      </button>
    </div>
  );
};

export default QuickLinks;

