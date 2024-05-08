import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105'>
      <Link to={`/product/₹{props.id}`} className='block'>
        {/* Add inline styling to constrain image size */}
        <img className='w-full h-60 object-cover cursor-pointer hover:scale-110' src={props.image} alt="products" />
      </Link>
      <div className="px-4 py-2">
        <Link to={`/product/₹{props.id}`} className='text-gray-800 font-semibold text-lg block mt-2 hover:text-primary'>{props.name}</Link>
        <div className="item-prices mt-1 flex justify-between items-center">
          <div className="text-green-600 font-semibold">₹{props.new_price}</div>
          <div className="font-bold text-red-600 line-through">₹{props.old_price}</div>
        </div>
      </div>
    </div>
  );
}

export default Item;
