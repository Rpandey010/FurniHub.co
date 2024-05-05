import React from 'react';
import { MdOutlineLocalOffer, MdStar, MdShoppingCart } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import banner from "../Assets/Sofa (1).png";

const Hero = () => {
  return (
       <section className="bg-gray-900 py-16 text-white mt-0 text-left">
      <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-0">
        <div className="max-w-lg lg:mr-16">
          <h1 className="text-4xl font-bold mb-5 leading-tight">Welcome to FurniHub.co</h1>
          <p className="text-lg mb-8 leading-relaxed">
            Discover our handpicked collection of premium products. Find the perfect pieces for your home.
          </p>
          <div className="flex items-center mb-8">
            {[...Array(4)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-3xl mr-1"><MdStar /></span>
            ))}
            <span className="text-gray-300 text-lg ml-2">Rated 4.0/5</span>
          </div>
          <div className="text-lg mb-8">
            <span className="font-bold text-2xl">176k</span> | <span className="text-gray-300">Outstanding Reviews</span>
          </div>
          <div className="max-w-md">
            <NavLink to="/shop" className="bg-blue-500 text-white rounded-full px-8 py-3 block mb-4 hover:bg-blue-600 transition duration-300 flex items-center justify-center">
              <MdShoppingCart className="text-3xl mr-2" /> <strong>Shop Now</strong>
            </NavLink>
            <NavLink to="/offers" className="bg-yellow-400 text-gray-900 rounded-full px-8 py-3 block mb-4 hover:bg-yellow-500 transition duration-300 flex items-center justify-center">
              <MdOutlineLocalOffer className="text-3xl mr-2" /> <strong>View Offers</strong>
            </NavLink>
          </div>
        </div>
        <div className="lg:w-1/2 lg:ml-0 mt-8 lg:mt-0">
          <img src={banner} alt="Digital Shopping Hub Junction" className="w-full rounded-lg shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;