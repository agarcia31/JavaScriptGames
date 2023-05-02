import React, { useState } from 'react';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'tictactoe', label: 'Tic Tac Toe', link: '/tic-tac-toe' },
    { id: 'battleship', label: 'Battle Ship', link: '/battleship' },
    { id: 'connect4', label: 'Connect 4', link: '/connect4' },
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
    </>
  );
};

export default Home;







