// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import FOOTER_LINKS from '../Assets/footer_links';
import Logo from '../Assets/furniHub.co.png';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="md:flex md:justify-between md:items-center">
          <div className="md:w-1/2 lg:w-1/3 animate__animated animate__fadeInLeft">
            <Link to="/" className="flex items-center animate__animated animate__pulse">
              <img src={Logo} className="h-9 mr-4 animate__animated animate__fadeIn" alt="FuniHub Logo" />
              <span className="text-2xl font-semibold dark:text-white">FuniHub.co</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 leading-relaxed">Find the perfect pieces for your space on FuniHub.co - your destination for buying and selling furniture online. <br /> Discover unique finds, connect with sellers, and transform your home or office with ease.</p>
          </div>
          <div className="md:w-1/2 lg:w-2/3 md:text-right animate__animated animate__fadeInRight">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3">
              {FOOTER_LINKS.map((col, index) => (
                <div key={index} className="mb-8 transition-opacity duration-500 ease-in-out opacity-0 transform translate-y-4 sm:translate-y-0 sm:opacity-100 sm:scale-100">
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">{col.title}</h2>
                  <ul className="text-gray-600 dark:text-gray-400">
                    {col.links.map((link, i) => (
                      <li key={i} className="mb-2">
                        {/* Use Link component instead of anchor tag */}
                        <Link to={typeof link === 'string' ? '/' + link.toLowerCase().replace(/\s+/g, '-') : link.url} className="hover:text-blue-600 transition-colors duration-300">{typeof link === 'string' ? link : link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 sm:mx-auto dark:border-gray-700 animate-fade-in-up" />
        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between sm:items-center animate-fade-in-up">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">&copy; 2024 FuniHub.co. All Rights Reserved.</p>
          <div className="flex mt-4 sm:mt-0">
            <a href="https://www.instagram.com/furnihub_official/" className="text-gray-500 hover:text-blue-600 dark:hover:text-white mr-5 animate-bounce">
              <FaInstagram className="text-3xl" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://facebook.com/profile.php?id=61558258058108" className="text-gray-500 hover:text-blue-600 dark:hover:text-white mr-5 animate-bounce">
              <FaFacebook className="text-3xl" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.linkedin.com/in/furnihub-co-623050304/" className="text-gray-500 hover:text-blue-600 dark:hover:text-white animate-bounce">
              <FaLinkedin className="text-3xl" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
