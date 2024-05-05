import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
      <div className="container mx-auto px-8 sm:flex sm:items-center">
        <div className="sm:w-1/2">
          <img src="https://bafel.co.in/wp-content/uploads/2019/12/GDPR-768x727.jpg" alt="About Us" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="sm:w-1/2 sm:ml-8">
          <div className="text-center sm:text-left">
            <h2 className="my-4 font-bold text-3xl sm:text-4xl text-indigo-600">Our Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mt-4">
              At FurniHub, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect your information. By using our website, you consent to the collection and use of your personal information as described in this Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you have any questions or concerns about our Privacy Policy, please contact us at furnihub.co@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
