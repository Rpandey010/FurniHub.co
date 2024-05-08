import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import logo from '../Assets/furniHub.co.png';
import { ShopContext } from '../../Context/ShopContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [categoryMenu, setCategoryMenu] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const dropdownRef = useRef(null);
  const [menu, setMenu] = useState(false); // or any initial value you want
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
      localStorage.removeItem('auth-token');
      navigate("/");
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleCategoryMenu = () => {
    setCategoryMenu(!categoryMenu);
  };

  return (
    <nav className='bg-gray-800 shadow-md py-4 fixed w-full top-0 z-50'>
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Side */}
        <div className="flex items-center justify-start">

          <ScrollLink
            to="welcomeSection"
            smooth={true}
            duration={500}
            className="flex items-center text-white font-semibold text-lg cursor-pointer">
            <img src={logo} alt="logo" className="h-10 mr-2" />
            <span className="hidden md:block">FurniHub.co</span>
          </ScrollLink>

          <ul className="hidden md:flex md:space-x-4 ml-8 text-white">
            
            <li>
              {location.pathname === '/' ? (
              <ScrollLink
                to="welcomeSection"
                smooth={true}
                duration={500}
                className="flex items-center hover:text-blue-300 transition duration-300 ease-in-out font-bold cursor-pointer">
                Home
              </ScrollLink>
              ) : (
                <Link
                  to="/"
                  className="flex items-center hover:text-blue-300 transition duration-300 ease-in-out font-bold cursor-pointer">
                  Home
                </Link>
              )}

            </li>
            {/* Dropdown for Categories */}
            <li>
              <div className="relative" onMouseEnter={() => setCategoryMenu(true)} onMouseLeave={() => setCategoryMenu(false)}>
                <button onClick={toggleCategoryMenu} className="flex items-center hover:text-blue-300 transition duration-300 ease-in-out font-bold">
                  Products
                </button>
                {categoryMenu && (
                  <ul className="absolute top-full left-0 bg-white shadow-lg py-2 rounded-md">
                    <li><Link to='/table' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-bold">Tables</Link></li>
                    <li><Link to='/chair' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-bold">Chairs</Link></li>
                    <li><Link to='/almirah' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-bold">Almirahs</Link></li>
                    <li><Link to='/bed' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-bold">Beds</Link></li>
                    <li><Link to='/miscellaneous' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-bold">Miscellaneous</Link></li>
                    {/* Add more categories as needed */}
                  </ul>
                )}
              </div>
            </li>
            <li><Link to='/about-us' className="flex items-center hover:text-blue-300 transition duration-300 ease-in-out font-bold">About Us</Link></li>
          </ul>
        </div>
        
        {/* Right Side */}
        <div className="flex items-center">
          <div className="ml-4 flex items-center space-x-4 relative" ref={dropdownRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                style={{width: '200px', borderRadius: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'}}
              />
              <button onClick={handleSearch} className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300 ease-in-out">
                <FaSearch />
              </button>
            </div>
            {user ? (
                <div className="relative inline-block text-left">
                  <button className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="options-menu" aria-expanded="true" aria-haspopup="true" onClick={() => setMenu(!menu)}>
                    <span className="flex items-center">
                      {user.displayName || user.email}
                      <FaUser className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                  {menu && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 transform scale-100"
                      role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <div className="py-1" role="none" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
                        <Link to="/add-product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Add Product</Link>
                        <Link to="/list-product" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">List Product</Link>
                        <Link to="/order-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Order History</Link>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center" role="menuitem">
                          Logout <FaSignOutAlt className="ml-2" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to='/login' className="text-slate-50 hover:text-blue-600 transition duration-300 ease-in-out">Login</Link>
              )}
              <Link to="/cart" className="relative flex items-center">
                <FaShoppingCart className="text-white" style={{ fontSize: '1.5rem' }} /> {/* Increased icon size */}
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
