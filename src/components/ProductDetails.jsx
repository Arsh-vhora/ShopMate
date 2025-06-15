import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import data from '../assets/data/ProductData'; // Example data source
import { FaStar, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import BlurImage from '../Functionalities/BlurImage';

const ProductDetails = () => {
  const { id } = useParams();
  const product = data.products.find((p) => p.id.toString() === id);
  const { addToCart } = useCart();

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <img src={product.img} alt={product.name}
            className={`absolute top-0 left-0 w-full h-[400px]" h-full rounded-lg object-cover filter blur-lg scale-105 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"}`}
        /> */}
        <BlurImage src={product.image}
                   alt={product.name}
                   className="w-full h-[450px] object-cover rounded mb-4"/>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center space-x-2 text-yellow-500 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-sm text-gray-500">(120 reviews)</span>
          </div>
          
          <p className="text-xl font-semibold text-indigo-600 mb-4">${product.price}</p>

          <p className="text-gray-700 mb-4">{product.description || "No detailed description available."}</p>
          
          <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {product.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>

          <div className="mb-4">
            <span className="font-medium">Availability:</span>{' '}
            {product.inStock > 0 ? (
              <span className="text-green-600">In stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>

          {/* <div className="mb-4">
            <label htmlFor="variant" className="block font-medium mb-1">Select Size:</label>
            <select id="variant" className="border rounded px-3 py-2 w-40">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div> */}

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500"
            >
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500">
              Buy Now
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Estimated delivery in 3-5 business days.
          </div>

          <div className="mt-6 flex space-x-4">
            <FaFacebook className="text-blue-600 cursor-pointer" />
            <FaTwitter className="text-blue-400 cursor-pointer" />
            <FaWhatsapp className="text-green-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <p className="font-semibold">{review.user}</p>
              <p className="text-sm text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
