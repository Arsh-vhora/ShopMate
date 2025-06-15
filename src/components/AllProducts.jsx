import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from '../assets/data/ProductData';
import BlurImage from "../Functionalities/BlurImage";

const categories = [
  "All",
  "electronics",
  "fashion",
  "fitness",
  "home-appliances"
];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "All"
      ? data.products
      : data.products.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-white p-4 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-indigo-100 ${
                  selectedCategory === cat ? "bg-indigo-200 font-semibold" : ""
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {selectedCategory === "All"
            ? "All Products"
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <BlurImage
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-indigo-600 font-bold">${product.price}</p>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
