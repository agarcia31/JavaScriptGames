import React from 'react';

const Header = ({ children }) => {
  return (
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">My App</h1>
      {children}
    </div>
  );
};

export default Header;

