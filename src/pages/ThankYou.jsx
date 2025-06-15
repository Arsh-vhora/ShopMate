import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You for Your Purchase!</h1>
      <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500">
        Continue Shopping
      </Link>
    </div>
  );
}
