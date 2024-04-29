import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div className="listproduct">
      <h1 className="text-3xl font-semibold mb-4">All Products List</h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center font-semibold text-gray-800">
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="mt-4">
        {allProducts.map((product) => (
          <div key={product.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4">
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
