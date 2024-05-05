import React from 'react';

const Aboutus = () => {
  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
      <div className="container mx-auto px-8 sm:flex sm:items-center">
        <div className="sm:w-1/2">
          <img src="https://i.imgur.com/WbQnbas.png" alt="About Us" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="sm:w-1/2 sm:ml-8">
          <div className="text-center sm:text-left">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl text-indigo-600">About <span className="text-indigo-800">Our Company</span></h2>
            <p className="text-gray-700 leading-relaxed mt-4">
              At FurniHub, we're passionate about making secondhand furniture accessible and sustainable. Our platform connects buyers and sellers, offering a seamless experience for furnishing homes while reducing environmental impact. We believe that everyone deserves to own a beautiful home, and we're here to make that possible. Our mission is to provide affordable, quality used furniture to our customers, while also helping to reduce waste and promote sustainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
