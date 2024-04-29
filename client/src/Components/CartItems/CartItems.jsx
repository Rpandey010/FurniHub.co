import React, { useContext, useState, useEffect } from "react";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import Payment from "../Payment/payment";
import axios from "axios";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalCartAmount());
  }, [cartItems, getTotalCartAmount]);

  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "billing") {
      setBillingAddress({ ...billingAddress, [name]: value });
    } else if (type === "shipping") {
      setShippingAddress({ ...shippingAddress, [name]: value });
    }
  };

  const handleCheckout = () => {
    setCurrentStep(1);
  };

  const handlePaymentComplete = () => {
    setIsCheckingOut(false);
  };

  const handleOrderSubmit = async (orderId) => { 
    try {
      const orderData = {
        products: Object.keys(cartItems)
          .filter(productId => cartItems[productId] >= 1)
          .map(productId => ({
            name: products[productId].name,
            quantity: cartItems[productId],
            price: totalAmount
          })),
        billingAddress,
        shippingAddress,
        totalPrice: totalAmount,
        orderId: orderId // Include orderId in order data
      };

      const response = await axios.post("http://localhost:4000/orders", orderData);

      console.log("Order submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
            {products.map((product) => {
              const quantity = cartItems[product.id];
              if (quantity > 0) {
                return (
                  <div key={product.id} className="flex items-center border-b border-gray-200 py-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p>${product.new_price}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <button className="text-red-500 mr-2" onClick={() => removeFromCart(product.id)}>
                        <img src={cross_icon} alt="Remove" className="w-4 h-4" />
                      </button>
                      <p>{quantity}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
              <div className="flex justify-between items-center mb-4">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center mb-4">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <h3>Total</h3>
                <h3>${totalAmount}</h3>
              </div>
              {currentStep === 0 && (
                <button className="bg-blue-500 text-white py-2 px-4 mt-6 w-full rounded-md" onClick={handleCheckout}>
                  PROCEED TO CHECKOUT
                </button>
              )}
              {currentStep === 1 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                  <input
                    type="text"
                    name="address1"
                    value={billingAddress.address1}
                    onChange={(e) => handleAddressChange(e, "billing")}
                    placeholder="Address Line 1"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="address2"
                    value={billingAddress.address2}
                    onChange={(e) => handleAddressChange(e, "billing")}
                    placeholder="Address Line 2"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="city"
                    value={billingAddress.city}
                    onChange={(e) => handleAddressChange(e, "billing")}
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="state"
                    value={billingAddress.state}
                    onChange={(e) => handleAddressChange(e, "billing")}
                    placeholder="State"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="country"
                    value={billingAddress.country}
                    onChange={(e) => handleAddressChange(e, "billing")}
                    placeholder="Country"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={billingAddress.pincode}
                    onChange={(e) => handleAddressChange(e, "billing")}
                    placeholder="Pincode"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <button className="bg-blue-500 text-white py-2 px-4 w-full rounded-md" onClick={() => setCurrentStep(2)}>Next</button>
                </div>
              )}
              {currentStep === 2 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <input
                    type="text"
                    name="address1"
                    value={shippingAddress.address1}
                    onChange={(e) => handleAddressChange(e, "shipping")}
                    placeholder="Address Line 1"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="address2"
                    value={shippingAddress.address2}
                    onChange={(e) => handleAddressChange(e, "shipping")}
                    placeholder="Address Line 2"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange(e, "shipping")}
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange(e, "shipping")}
                    placeholder="State"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={(e) => handleAddressChange(e, "shipping")}
                    placeholder="Country"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={shippingAddress.pincode}
                    onChange={(e) => handleAddressChange(e, "shipping")}
                    placeholder="Pincode"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <button className="bg-blue-500 text-white py-2 px-4 w-full rounded-md" onClick={() => { handleOrderSubmit(); setIsCheckingOut(true); }}>Proceed to Payment</button>
                </div>
              )}
              {isCheckingOut && (
                <Payment
                  billingAddress={billingAddress}
                  shippingAddress={shippingAddress}
                  cartItems={cartItems}
                  getTotalCartAmount={getTotalCartAmount}
                  onComplete={handlePaymentComplete}
                  onSubmitOrder={handleOrderSubmit} // Pass the callback function to Payment
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
