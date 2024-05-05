import React from 'react';
import Item from '../Item/Item';
import data_product from '../Assets/data';

const RelatedProducts = () => {
  return (
    <div className='related-products bg-gray-100 py-10 px-4'>
      <h1 className='text-3xl font-semibold text-gray-800 mb-8 text-center'>Related Products</h1>
      <hr className='w-1/4 h-1 bg-gray-800 mb-8 mx-auto' />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {data_product.map((item) => (
          <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      <p className="text-gray-600 text-center mt-4">Explore more products in our store!</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block mx-auto mt-4">Shop Now</button>
    </div>
  );
};

export default RelatedProducts;
