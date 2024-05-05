import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const OrderSuccessfully = () => {
  const location = useLocation();

  if (!location.state) {
    // Redirect to home page or show an error message
    return <Navigate to="/" />;
  }

  const order = location.state;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto mt-12 mb-12 p-8 bg-white rounded-lg shadow-md max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Order Receipt</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase!</p>
      </div>
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
          <p className="text-sm text-gray-600">Date: {currentDate}</p>
        </div>
        <ul>
          {order.products.map((product, index) => (
            <li key={index} className="mb-2">
              <p className="text-sm">{product.name}</p>
              <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <p className="text-sm font-semibold">Billing Address:</p>
        <p className="text-sm">{order.billingAddress.fullName}</p>
        <p className="text-sm">{order.billingAddress.address1}</p>
        <p className="text-sm">{order.billingAddress.address2}</p>
        <p className="text-sm">{order.billingAddress.city}, {order.billingAddress.state}, {order.billingAddress.country} - {order.billingAddress.pincode}</p>
      </div>
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <p className="text-sm font-semibold">Shipping Address:</p>
        <p className="text-sm">{order.shippingAddress.fullName}</p>
        <p className="text-sm">{order.shippingAddress.address1}</p>
        <p className="text-sm">{order.shippingAddress.address2}</p>
        <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pincode}</p>
      </div>
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600">FurniHub - Your Home, Your Style</p>
      </div>
    </div>
  );
};

export default OrderSuccessfully;
