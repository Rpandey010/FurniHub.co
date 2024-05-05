import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const RelatedProducts = () => {
  const { products } = useContext(ShopContext);

  const recentProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="related-products flex flex-col items-center gap-10 py-8">
      <h1 className="text-3xl font-bold mb-0">Related Products</h1>
      <hr className="separator w-40 h-1 bg-gray-300 border-none" />
      <div className="related-products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl px-4">
        {recentProducts.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            </Link>
            <div className="text-lg font-bold text-primary">₹{product.new_price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
