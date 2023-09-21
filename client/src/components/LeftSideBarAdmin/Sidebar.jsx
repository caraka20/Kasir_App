import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-blue-900 text-white h-screen ${isOpen ? 'w-64' : 'w-16'} fixed transition-all duration-300 ease-in-out`}>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Sidebar</h1>
      </div>
      <ul>
        <li className="py-2 px-4 hover:bg-blue-700">
          <a href="#">Item 1</a>
        </li>
        <li className="py-2 px-4 hover:bg-blue-700">
          <a href="#">Item 2</a>
        </li>
        <li className="py-2 px-4 hover:bg-blue-700">
          <a href="#">Item 3</a>
        </li>
        <li className="py-2 px-4 hover:bg-blue-700">
          <a href="#">Item 4</a>
        </li>
      </ul>
      <div className="absolute bottom-4 left-4">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full bg-blue-700 hover:bg-blue-800 focus:outline-none"
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
