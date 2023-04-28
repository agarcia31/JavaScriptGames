import React, { useState } from 'react';
import TicTacToe from '../TicTacToe';
import QuickLinks from '../QuickLinks'

const Home = () => {
  // set state to handle page changes 
  const [currentPage, setCurrentPage] = useState('home');

  // checks which page we are currently on to render content
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            <h1>Welcome to my React App</h1>
            <p>This is the home page of my app. Feel free to add content here!</p>
          </div>
        );
      case 'tictactoe':
        return <TicTacToe genre="tictactoe" />;
      default:
        return null;
    }
  };

  // handles page change state
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <QuickLinks handlePageChange={handlePageChange}/>
      <div className="drawLine" style={{width: '100%'}}></div>
      {renderPage()}
    </>
  );
};

export default Home;
