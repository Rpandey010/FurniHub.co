import React from 'react';

const FAQ = () => {
  return (
    <div className="flex items-center justify-center py-12 bg-white">
      <div className="container mx-auto px-8 sm:flex sm:items-center">
        <div className="sm:w-1/2">
          <div className="text-center sm:text-left">
            <h2 className="my-4 font-bold text-3xl sm:text-4xl text-indigo-600">Frequently Asked Questions</h2>
            <div className="mb-8">
              <h3 className="flex items-center mb-4 text-lg font-medium">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
                Are there any discounts or promotions available?
              </h3>
              <p>We occasionally offer discounts and promotions. Check our website or subscribe to our newsletter for updates on current offers.</p>
            </div>
            <div className="mb-8">
              <h3 className="flex items-center mb-4 text-lg font-medium">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
                Do you offer international shipping?
              </h3>
              <p>At this time, we only offer shipping within India. We do not offer international shipping.</p>
            </div>
            <div className="mb-8">
              <h3 className="flex items-center mb-4 text-lg font-medium">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
                How do I contact customer support?
              </h3>
              <p>You can reach our customer support team by emailing us at <span className="text-red-500 font-bold">furnihub.co@gmail.com</span> during our business hours. Visit our Contact Us page for more information.</p>
            </div>
            <div className="mb-8">
              <h3 className="flex items-center mb-4 text-lg font-medium">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
                What happens if my furniture is damaged during shipping?
              </h3>
              <p>In the rare event that your furniture arrives damaged, please contact us immediately. We will work with you to resolve the issue, either by arranging for a replacement or offering a refund.</p>
            </div>
            <div className="mb-8">
              <h3 className="flex items-center mb-4 text-lg font-medium">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                </svg>
                Do you sell new furniture as well?
              </h3>
              <p>Our focus is on selling high-quality, gently used furniture. However, we may occasionally have new items available. Check our website regularly for inventory updates.</p>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2">
          <img src="https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?w=740&t=st=1714908313~exp=1714908913~hmac=2effd805cf9d8a95f2c934347e5c2ed090bbf954d973d4af9115291cad5c8468" alt="FAQ Illustration" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}

export default FAQ;
