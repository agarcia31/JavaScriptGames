import React from 'react';

const QuickLinks = ({ handlePageChange }) => {
  return (
    <div>
      <button onClick={() => handlePageChange('home')}>Home</button>
      <button onClick={() => handlePageChange('tictactoe')}>Tic Tac Toe</button>
    </div>
  );
};

export default QuickLinks; // add this line to export the component





