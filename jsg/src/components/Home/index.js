import React, { useState } from 'react';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'tictactoe', label: 'Tic Tac Toe', link: '/tic-tac-toe' },
    { id: 'battleship', label: 'Battle Ship "Under Construction"', link: '/battleship' },
    { id: 'connectfour', label: 'Connect Four', link: '/connect-four' },
    { id: 'minesweeper', label: 'Mine Sweeper', link: '/mine-sweeper' },
    { id: 'breakout', label: 'Break Out Game', link: '/break-out-game' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="grid grid-cols-3 gap-4">
            {pages.map((page) => (
              <a key={page.id} href={page.link}>
                <div className="bg-gray-200 h-32 flex justify-center items-center">
                  {page.label}
                </div>
              </a>
            ))}
          </div>
        );
      case 'tictactoe':
        return null;
      default:
        return null;
    }
  };
  

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <>
     
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
            </li>
          ))}
        </ul>
      <div className="p-8">{renderPage()}</div>
      <div>
      Sound from Zapsplat.com
      </div>
    </>
  );
};

export default Home;







