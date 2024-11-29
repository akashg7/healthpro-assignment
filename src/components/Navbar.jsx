import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/" className="text-black">
            IVF <span className="text-red-500">Pulse</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#" className="text-gray-600 hover:text-black">Donor Programme</a>
          <a href="#" className="text-gray-600 hover:text-black">Fertility Preservation</a>
          <a href="#" className="text-gray-600 hover:text-black">Advanced Treatments</a>
          <a href="#" className="text-gray-600 hover:text-black">Infertility Treatments</a>
          <a href="#" className="text-gray-600 hover:text-black">IVF Testing</a>
          <a href="#" className="text-gray-600 hover:text-black">About Us</a>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md">
            Talk to Us
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <a href="#" className="text-gray-600 hover:text-black">Donor Programme</a>
          <a href="#" className="text-gray-600 hover:text-black">Fertility Preservation</a>
          <a href="#" className="text-gray-600 hover:text-black">Advanced Treatments</a>
          <a href="#" className="text-gray-600 hover:text-black">Infertility Treatments</a>
          <a href="#" className="text-gray-600 hover:text-black">IVF Testing</a>
          <a href="#" className="text-gray-600 hover:text-black">About Us</a>

          {/* Talk to Us Button */}
          <button className="bg-red-500 text-white px-6 py-3 rounded-md mt-4 w-11/12 sm:w-full">
            Talk to Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
