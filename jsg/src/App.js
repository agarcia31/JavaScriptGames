import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import BattleShip from './components/BattleShip';
import TicTacToe from './components/TicTacToe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './dist/output.css';
import './input.css';
import pages from './pages';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show a loading spinner
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handlePageChange = (pageId) => {
    // Do something with the selected page ID
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header pages={pages} handlePageChange={handlePageChange} />
        <div className="flex-grow bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tic-tac-toe" element={<TicTacToe />} />
                <Route path="/battleship" element={<BattleShip />} />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


