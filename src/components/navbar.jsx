import React, { useState, useEffect, useRef } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { GoPersonFill } from "react-icons/go";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('/'); 
  const dropdownRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberName, setMemberName] = useState('User');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }

    if (isOpen && !event.target.closest('.md:flex')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const tokenMember = localStorage.getItem('tokenMember');
    const getMemberName =  localStorage.getItem('memberName');
    setIsLoggedIn(!!tokenMember);
    if (getMemberName){
      setMemberName(getMemberName);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure to log out?");
    if (confirmLogout) {
      localStorage.removeItem('TokenMember');
      localStorage.removeItem('memberId');
      localStorage.removeItem('memberName');
      localStorage.removeItem('userEmail');
      setIsLoggedIn(false);
      window.location.href = '/';
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsOpen(false); 
  };

  return (
    <div className="w-full text-white bg-gray-900 dark:text-gray-200 dark:bg-gray-900 fixed z-50">
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="p-4 flex flex-row items-center justify-between">
          <NavLink
            exact
            to="/"
            className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline"
            activeClassName="text-gray-900 bg-gray-200"
            onClick={() => handlePageChange('/')}
          >
            TOKOPAKEDI
          </NavLink>
          <div className='ml-5 flex items-center'> 
            <GoPersonFill/>
            <span className='ml-1'>
            {memberName}
            </span>
        </div>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={toggleMenu}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-6 h-6"
            >
              <path
                className={isOpen ? 'hidden' : 'block'}
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
              <path
                className={isOpen ? 'block' : 'hidden'}
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
          <NavLink
            exact
            to="/"
            className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg 
                dark:bg-inherit dark:hover:bg-inherit dark:focus:bg-inherit dark:focus:text-white
                 dark:hover:text-blue-700 dark:text-blue-700 md:mt-0 md:ml-4 
                 hover:text-blue-700 focus:text-blue-700 focus:bg-inherit
                 focus:outline-none focus:shadow-outline 
                 ${activePage === '/' ? 'text-blue-700 bg-inherit' : 'text-gray-200'}`}
            onClick={() => handlePageChange('/')}
          >
            Home
          </NavLink>
          <NavLink
            to="/shirt"
            className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg 
                        dark:bg-inherit dark:hover:bg-inherit dark:focus:bg-inherit dark:focus:text-white
                         dark:hover:text-blue-700 dark:text-blue-700 md:mt-0 md:ml-4 
                         hover:text-blue-700 focus:text-blue-700 focus:bg-inherit
                         focus:outline-none focus:shadow-outline 
                         ${activePage === '/shirt' ? 'text-blue-700 bg-inherit' : 'text-gray-200'}`}
            onClick={() => handlePageChange('/shirt')}
          >
            Shirt
          </NavLink>
          <NavLink
            to="/pants"
            className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg 
                dark:bg-inherit dark:hover:bg-inherit dark:focus:bg-inherit dark:focus:text-white
                 dark:hover:text-blue-700 dark:text-blue-700 md:mt-0 md:ml-4 
                 hover:text-blue-700 focus:text-blue-700 focus:bg-inherit
                 focus:outline-none focus:shadow-outline 
                 ${activePage === '/pants' ? 'text-blue-700 bg-inherit' : 'text-gray-200'}`}
            onClick={() => handlePageChange('/pants')}
          >
            Pants
          </NavLink>
          <NavLink
            to="/shoes"
            className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg 
                dark:bg-inherit dark:hover:bg-inherit dark:focus:bg-inherit dark:focus:text-white
                 dark:hover:text-blue-700 dark:text-blue-700 md:mt-0 md:ml-4 
                 hover:text-blue-700 focus:text-blue-700 focus:bg-inherit
                 focus:outline-none focus:shadow-outline 
                 ${activePage === '/shoes' ? 'text-blue-700 bg-inherit' : 'text-gray-200'}`}
            onClick={() => handlePageChange('/shoes')}
          >
            Shoes
          </NavLink>
          <div className="relative" ref={dropdownRef} tabIndex="0">
            <button
              onClick={toggleDropdown}
              className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left 
              bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white
               dark:focus:bg-inherit dark:hover:bg-inherit md:w-auto md:inline md:mt-0 md:ml-4 hover:text-blue-700
                focus:text-blue-700 hover:bg-inherit focus:bg-inherit focus:outline-none focus:shadow-outline"
            >
              <span>Profile</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} md:-mt-1`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 z-50`}
            >
              <div className="px-2 py-2 bg-gray-800 rounded-md shadow dark:bg-gray-800">
                <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg 
                dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white
                 dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900
                  hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/login">Login</a>

                <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg 
                dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white
                 dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900
                  hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/register">Register</a>

                <a className="flex px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg 
                dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white
                 dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900
                  hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" onClick={handleLogout}>Log-out<IoIosLogOut className='ml-2 mt-1'/></a>
              </div>
            </div>
          </div>
          <Link to="/cart">
          <button data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button"><CiShoppingCart className='w-7 h-7'/></button>
          </Link>
          <div id="tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Your Cart
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
