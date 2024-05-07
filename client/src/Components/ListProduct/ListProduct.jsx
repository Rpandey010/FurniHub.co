import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [emailID, setEmailID] = useState(""); 
  const [editProductData, setEditProductData] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://furnihub-co-server.onrender.com/products/allproductsbyuser?emailID=${emailID}`);
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
      await fetch('https://furnihub-co-server.onrender.com/products/removeproduct', {
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

  const updateProduct = async (id, newName, newPrice, newDescription) => {
    try {
      await fetch('https://furnihub-co-server.onrender.com/products/updateproduct', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name: newName, new_price: newPrice, description: newDescription }),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEdit = (id, newName, newPrice, newDescription) => {
    setEditProductData({ id, name: newName, newPrice, description: newDescription });
  };

  const handleCloseModal = () => {
    setEditProductData(null);
  };

  const handleSaveEdit = () => {
    if (editProductData) {
      updateProduct(editProductData.id, editProductData.name, editProductData.newPrice, editProductData.description);
      setEditProductData(null);
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
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center font-semibold text-gray-800 bg-gray-100 rounded-md py-3 px-4">
        <p>Image</p>
        <p >Title</p>
        <p >Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Description</p>
        <p>Actions</p>
      </div>
      <div className="mt-4">
        {allProducts.map((product, index) => (
          <div key={product.id} className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center mb-4 bg-white rounded-lg shadow-md p-4">
            <img className="w-16 h-16 md:w-24 md:h-24 object-cover rounded" src={product.image} alt={product.name} />
            <p >{product.name}</p>
            <p >₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handleEdit(product.id, product.name, product.new_price, product.description)}
                className="text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => removeProduct(product.id)}
                className="text-red-600 hover:text-red-700 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editProductData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <input
              type="text"
              value={editProductData.name}
              onChange={(e) => setEditProductData({ ...editProductData, name: e.target.value })}
              className="border border-gray-400 rounded px-4 py-2 mb-4 w-full shadow-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              value={editProductData.newPrice}
              onChange={(e) => setEditProductData({ ...editProductData, newPrice: e.target.value })}
              className="border border-gray-400 rounded px-4 py-2 mb-4 w-full shadow-md focus:outline-none focus:border-blue-500"
            />
            <textarea
              value={editProductData.description}
              onChange={(e) => setEditProductData({ ...editProductData, description: e.target.value })}
              className="border border-gray-400 rounded px-4 py-2 mb-4 w-full h-32 resize-none shadow-md focus:outline-none focus:border-blue-500"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-4 hover:bg-gray-500 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
