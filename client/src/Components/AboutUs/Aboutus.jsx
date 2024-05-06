import React from 'react';
import aboutUsImage from '../Assets/about-us.png'; 

const Aboutus = () => {
  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
      <div className="container mx-auto px-8 sm:flex sm:items-center">
        <div className="sm:w-1/2">
          <img src= {aboutUsImage} alt="About Us" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="sm:w-1/2 sm:ml-8">
          <div className="text-center sm:text-left">
            <h2 className="my-4 font-bold text-4xl sm:text-5xl text-blue-950">About FurniHub</h2>
            <p className="text-neutral-950 leading-relaxed mt-4 font-bold">
              At FurniHub, we're passionate about making secondhand furniture accessible and sustainable. 
              Our platform connects buyers and sellers, 
              offering a seamless experience for furnishing homes while reducing environmental impact. We believe that 
              everyone deserves to own a beautiful home, 
              and we're here to make that possible. Our mission is to provide affordable, quality used furniture to our customers, 
              while also helping to reduce waste and promote sustainability.
              <br />
              <br />
              By fostering a circular economy for furniture, we're not just selling items but creating 
              a community that values conscious consumption and ethical living. Together, we can transform 
              spaces and attitudes, making sustainability the new standard in furnishing homes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
