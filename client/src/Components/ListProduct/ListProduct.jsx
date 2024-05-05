import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [emailID, setEmailID] = useState(""); 

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/products/allproductsbyuser?emailID=${emailID}`);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [emailID]);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/products/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">All Products List</h1>
      <div>
        <input
          type="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          placeholder="Enter email ID to filter products"
          className="border border-gray-400 rounded px-4 py-2 mb-8 w-full shadow-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center font-semibold text-gray-800 bg-gray-100 rounded-md py-3 px-4">
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="mt-4">
        {allProducts.map((product) => (
          <div key={product.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-white rounded-lg shadow-md p-4">
            <img className="w-16 h-16 md:w-24 md:h-24 object-cover rounded" src={product.image} alt={product.name} />
            <p className="">{product.name}</p>
            <p className="">${product.old_price}</p>
            <p className="">${product.new_price}</p>
            <p className="">{product.category}</p>
            <button
              onClick={() => removeProduct(product.id)}
              className="text-red-600 hover:text-red-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
