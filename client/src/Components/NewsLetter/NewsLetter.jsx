import React, { useState } from 'react';
import Confetti from 'react-confetti';

const NewsLetter = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:4000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: event.target.email.value }),
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('This email is already subscribed.');
        } else {
          throw new Error('Network response was not ok');
        }
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Log response data if needed
      setShowMessage(true); // Set showMessage state to true to show the message
      setTimeout(() => {
        setShowMessage(false); // Hide the message after some time (optional)
      }, 3000); // Adjust the time as needed
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error.message); // Display the error message
    });
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md sm:text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-serif font-bold text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
          <p className="mx-auto mb-8 max-w-2xl font-light text-lg text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <form onSubmit={handleSubmit}>
            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input className="block p-4 pl-12 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required="" />
              </div>
              <div>
                <button type="submit" className="py-4 px-6 w-full text-lg font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
              </div>
            </div>
            <div className="mx-auto max-w-screen-sm text-base text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="/privacy-policy" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>
          {showMessage && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex items-center relative">
                <p className="text-lg font-medium text-gray-900 dark:text-white mr-4">Thank you!!</p>
                {/* Confetti animation */}
                <Confetti width={3000} height={3000} numberOfPieces={100} recycle={false} />
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex items-center absolute top-0 left-0">
                <p className="text-lg font-medium text-gray-900 dark:text-white mr-4">Thank you!!</p>
                {/* Confetti animation */}
                <Confetti width={3000} height={3000} numberOfPieces={100} recycle={false} />
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex items-center absolute top-0 right-0">
                <p className="text-lg font-medium text-gray-900 dark:text-white mr-4">Thank you!!</p>
                {/* Confetti animation */}
                <Confetti width={3000} height={3000} numberOfPieces={100} recycle={false} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
