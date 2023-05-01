import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = ({ pages = [], handlePageChange, className }) => {
  const handleLinkClick = (page) => {
    handlePageChange(page);
  };

  return (
    <nav className={`flex justify-between items-center py-4 ${className}`}>
      <ul className="flex mr-10">
        {pages.length > 0 &&
          pages.map((page) => (
            <li key={page.route}>
              <Link
                to={page.route}
                className="mx-4 text-gray-600 hover:text-gray-800"
                onClick={() => handleLinkClick(page.id)}
              >
                {page.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default QuickLinks;












