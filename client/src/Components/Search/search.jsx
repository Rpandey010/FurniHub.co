import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      axios.get(`http://localhost:4000/products/search?name=${encodeURIComponent(query)}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [location.search]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Search Results for "{decodeURIComponent(location.search.substring(7))}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map(product => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">${product.new_price}</p>
                {product.old_price && <p className="text-sm text-gray-500 line-through">${product.old_price}</p>}
              </div>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
