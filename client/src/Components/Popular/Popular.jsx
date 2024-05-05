import React from 'react';
import Item from '../Item/Item';

const Popular = (props) => {
  return (
    <section className='bg-white p-8'>
      <div id="story" className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Discover Timeless Treasures for Your Home</h2>
        <h3 className="text-center text-2xl font-semibold text-gray-600 mb-12">Where Every Piece Has a Story</h3>
        <hr className='mx-auto w-1/2 md:w-1/3 border-0 bg-gradient-to-r from-transparent via-black to-transparent h-1 mb-16' />

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {props.data.map((item, i) => (
            <div className="shadow-sm rounded-lg bg-white p-4">
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;