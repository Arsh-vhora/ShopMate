import React from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../assets/data/ProductData';
import { useCart } from "../context/CartContext";


export default function CategoryPage() {
  const { categoryName } = useParams();
  const displayCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const { cartItems, addToCart } = useCart();
  const filteredProducts = data.products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="pt-13 px-4">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link to="/" className="hover:underline">Home</Link> /{" "}
        <span className="text-indigo-600 font-medium">{displayCategory}</span>
      </nav>

      <h2 className="text-3xl font-bold text-center mb-8">{displayCategory} Products</h2>

      {/* <CategoryMenu /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg">
              <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded mb-4" />
              <h4 className="text-lg font-bold mb-2">{product.name}</h4>
              <p className="text-indigo-600 text-lg">{product.price}</p>
              </Link>
              <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                  >
                  Add to Cart
                  </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
