import React, { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch("http://localhost:4000/orders/history");
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="bg-white shadow-md rounded-lg mb-8 p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Order ID: {order.orderId}</p>
                <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {order.products.map(product => (
                  <li key={product._id} className="flex items-center border-b border-gray-200 pb-4">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-16 h-16 mr-4 rounded-lg" />
                    )}
                    <div>
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-gray-600">Price: ${product.price}</p>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-gray-600 mt-4">
                <p>Billing Address: {order.billingAddress.address1}, {order.billingAddress.city}, {order.billingAddress.country}</p>
                <p>Shipping Address: {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
