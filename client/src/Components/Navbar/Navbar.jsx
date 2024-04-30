import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../Assets/furniHub.co.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []); // Only run on component mount

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
      localStorage.removeItem('auth-token');
      navigate("/"); // Redirect to home page after logout
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className='bg-white shadow-md py-3'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link to='/' className="flex items-center text-gray-800 font-semibold text-lg">
          <img src={logo} alt="logo" className="h-10 mr-2" />
          <span className="hidden md:block">FurniHub.co</span>
        </Link>
        <ul className="hidden md:flex md:space-x-4">
          <li><Link to='/' className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">Shop</Link></li>
          <li><Link to='/mens' className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">Men</Link></li>
          <li><Link to='/womens' className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">Women</Link></li>
          <li><Link to='/kids' className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">Kids</Link></li>
        </ul>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-2 py-1 border border-gray-300 rounded-md mr-2"
          />
          <button onClick={handleSearch} className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">Search</button>

          <div className="ml-4 flex items-center space-x-4 relative" ref={dropdownRef}>
            {user ? (
              <div className="relative inline-block text-left">
                <button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  id="options-menu" aria-expanded="true" aria-haspopup="true" onClick={() => setMenu(!menu)}>
                  {user.displayName}
                  <img src={nav_dropdown} className="ml-2 h-5 w-5" alt="dropdown" />
                </button>
                {menu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 transform scale-100"
                    role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="py-1" role="none">
                      <Link to="/add-product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Add Product</Link>
                      <Link to="/list-product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">List Product</Link>
                      <Link to="/order-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Order History</Link>

                      <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to='/login' className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">Login</Link>
            )}
            <Link to="/cart" className="relative flex items-center">
              <img src={cart_icon} alt="Shopping Cart" className="h-8" />
              {getTotalCartItems() > 0 && (
                <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white absolute -top-1 -right-1 animate-pulse">
                  <span className="text-xs font-bold">{getTotalCartItems()}</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
