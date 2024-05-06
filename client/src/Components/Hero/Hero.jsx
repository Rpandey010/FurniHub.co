import React from 'react';
import { MdOutlineLocalOffer, MdShoppingCart } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import banner from "../Assets/Sofa (1).png";
import { Link } from 'react-scroll';
import { Element } from 'react-scroll';

const Hero = () => {
  return (
    <Element name="welcomeSection">
       <section className="bg-gray-900 py-16 text-white mt-0 text-left">
      <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-0">
        <div className="max-w-lg lg:mr-16">
          <h1 className="text-4xl font-bold mb-5 leading-tight">Welcome to FurniHub.co</h1>
          <p className="text-lg mb-8 leading-relaxed">
            Your ultimate destination for sustainable furniture solutions. Explore our curated collection of pre-owned furniture, where quality meets affordability
          </p>

          <div className="text-lg mb-8">
            <span className="text-gray-300">Find one-of-a-kind pieces</span>
          </div>
          <div className="max-w-md">

            <Link
              to="story"
              smooth={true}
              duration={500}
              className="bg-blue-500 text-white rounded-full px-8 py-3 block mb-4 hover:bg-blue-600 transition duration-300 flex items-center justify-center cursor-pointer"
            >
              <MdShoppingCart className="text-3xl mr-2" /> <strong>Shop Now</strong>
            </Link>

        
            <Link
              to="offers"
              smooth={true}
              duration={500}
              offset={-90}
              className="bg-yellow-400 text-gray-900 rounded-full px-8 py-3 block mb-4 hover:bg-yellow-500 transition duration-300 flex items-center justify-center cursor-pointer"
            >
              <MdOutlineLocalOffer className="text-3xl mr-2" /> <strong>View Offers</strong>
            </Link>

          </div>
        </div>
        <div className="lg:w-1/2 lg:ml-0 mt-8 lg:mt-0">
          <img src={banner} alt="Digital Shopping Hub Junction" className="w-full rounded-lg shadow-xl" />
        </div>
      </div>
    </section>
    </Element>
  );
};


export default Hero;