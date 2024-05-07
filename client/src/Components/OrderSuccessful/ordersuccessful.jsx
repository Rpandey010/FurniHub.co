import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";

const OrderSuccessfully = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowPopup(true); // Show the popup when the component mounts
    // Hide the popup after a certain duration (e.g., 5 seconds)
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Adjust the duration as needed
    return () => clearTimeout(timeout); // Clear the timeout on unmount
  }, []);

  useEffect(() => {
    if (location.state) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000); // Increased duration to 10 seconds
    }
  }, [location.state]);

  const order = location.state;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="container mx-auto mt-12 mb-12 p-8 bg-white rounded-lg shadow-md max-w-md relative">
      {showConfetti && (
        <div className="confetti-container">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      <div className="receipt">
        <div className="receipt-left">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Order Receipt</h1>
            <p className="text-lg text-gray-600">Your order has been placed!</p>
            <p className="text-sm text-gray-600">Date: {currentDate}</p>
          </div>
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-sm"><strong>Order ID:</strong> {order?.orderId}</p>
            </div>
            <ul>
              {order?.products.map((product, index) => (
                <li key={index} className="mb-2">
                  <p className="text-sm"><strong>Product Name: </strong>{product.name}</p>
                  <p className="text-sm"><strong>Price: ₹</strong>{product.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="receipt-right">
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <p className="text-sm font-semibold">Billing Address:</p>
            <p className="text-sm">{order?.billingAddress.fullName}</p>
            <p className="text-sm">{order?.billingAddress.address1}</p>
            <p className="text-sm">{order?.billingAddress.address2}</p>
            <p className="text-sm">{order?.billingAddress.city}, {order?.billingAddress.state}, {order?.billingAddress.country} - {order?.billingAddress.pincode}</p>
          </div>
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <p className="text-sm font-semibold">Shipping Address:</p>
            <p className="text-sm">{order?.shippingAddress.fullName}</p>
            <p className="text-sm">{order?.shippingAddress.address1}</p>
            <p className="text-sm">{order?.shippingAddress.address2}</p>
            <p className="text-sm">{order?.shippingAddress.city}, {order?.shippingAddress.state}, {order?.shippingAddress.country} - {order?.shippingAddress.pincode}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600">FurniHub - Your Home, Your Style</p>
      </div>
    </div>
  );
};

export default OrderSuccessfully;
