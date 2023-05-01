import React from 'react';
import QuickLinks from '../QuickLinks';

const Header = ({ pages, handlePageChange }) => {
  return (
    <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">My App</h1>
      {pages && pages.length > 0 ? (
        <QuickLinks
          pages={pages}
          handlePageChange={handlePageChange}
          className="justify-left"
        />
      ) : (
        <div>No pages available</div>
      )}
    </div>
  );
};

export default Header;






