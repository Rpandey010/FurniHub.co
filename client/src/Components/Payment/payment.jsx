import React, { useState } from "react";

const Payment = ({ cartItems, getTotalCartAmount, onSubmitOrder }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePayment = async () => {
    // Step 1: Create order on Razorpay
    const response = await fetch("http://localhost:4000/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: getTotalCartAmount() * 100, 
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      }),
    });
    const order = await response.json();

    // Step 2: Initialize Razorpay payment
    const options = {
      key: "rzp_test_8ajPrNjHnqmPfp",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "FurniHub.co",
      description: "Payment for your order",
      handler: async function (response) {
        // Step 3: Verify payment on your server
        const verifyResponse = await fetch("http://localhost:4000/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: order.amount / 100, 
            email: email,
            products: cartItems,
          }),
        });
        const verificationResult = await verifyResponse.json();
        if (verificationResult.verified) {
          alert("Payment successful!");
          onSubmitOrder(order.id); // Call the callback function with order ID
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: userName,
        email: email,
        contact: phone,
      },
      notes: {
        address: "Your address",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    
    rzp.open();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          className="w-full bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-4"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          className="w-full bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-4"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Phone</label>
        <input
          className="w-full bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-4"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Enter your phone number"
        />
      </div>
      <button
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        onClick={handlePayment}
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
