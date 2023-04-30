import React, { useState } from 'react';
import TicTacToe from '../TicTacToe';
import QuickLinks from '../QuickLinks';


const Home = () => {
  // set state to handle page changes 
  const [currentPage, setCurrentPage] = useState('home');

  // array of links to render
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'tictactoe', label: 'Tic Tac Toe' },
    // add more links here as needed
  ];

  // checks which page we are currently on to render content
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'tictactoe':
        return <TicTacToe genre="tictactoe" />;
      // add more cases here as needed
      default:
        return null;
    }
  };

  // handles page change state
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <QuickLinks links={links} handlePageChange={handlePageChange}/>
      <div className="drawLine" style={{width: '100%'}}></div>
      {renderPage()}
    </>
  );
};

export default Home;

