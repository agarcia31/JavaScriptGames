import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import TicTacToe from './components/TicTacToe';
import QuickLinks from './components/QuickLinks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './dist/output.css';
import './input.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show a loading spinner
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header>
          <QuickLinks />
        </Header>
        <div className="flex-grow bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tic-tac-toe" element={<TicTacToe />} />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;









