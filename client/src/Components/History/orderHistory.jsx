import React, { useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchOrderHistory = async (fullName, emailID) => {
    try {
      const response = await fetch(`http://localhost:4000/orders/history?fullName=${encodeURIComponent(fullName)}&emailID=${encodeURIComponent(emailID)}`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
        setErrorMessage("");

        // Send email with order history
        sendEmailWithOrderHistory(fullName, emailID, data.orders);
      } else {
        setOrders([]);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
      setErrorMessage("Error fetching order history. Please try again later.");
    }
  };

  const handleFetchOrderHistory = () => {
    const fullName = window.prompt("Please enter your full name:");
    const emailID = window.prompt("Please enter your email ID:");
    if (fullName && emailID) {
      fetchOrderHistory(fullName, emailID);
    } else {
      setErrorMessage("Please enter both your full name and email ID.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-12">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">Order History</h1>
        <div className="flex justify-center mb-4">
          <button onClick={handleFetchOrderHistory} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Fetch Order History
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.length === 0 ? (
            <p className="text-lg text-gray-600 text-center col-span-full">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div key={order._id} className={`bg-white rounded-lg shadow-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <div className="p-6">
                  <p className="text-lg font-semibold text-blue-600 mb-2">Order ID: {order.orderId}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="border-t border-gray-200">
                  {order.products.map(product => (
                    <div key={product._id} className="flex items-center justify-between p-6 border-b border-gray-200">
                      <div className="flex items-center">
                        {product.image && (
                          <img src={product.image} alt={product.name} className="w-16 h-16 mr-4 rounded-lg" />
                        )}
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Price: ${product.price}</p>
                          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 text-gray-600">
                  <p className="mb-2"><span className="font-semibold">Billing Address:</span> {order.billingAddress.address1}, {order.billingAddress.city}, {order.billingAddress.country}</p>
                  <p className="mb-2"><span className="font-semibold">Shipping Address:</span> {order.shippingAddress.address1}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
