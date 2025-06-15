import { useState, useEffect, useRef } from "react";
import React from "react";
import data from '../assets/data/ProductData';

const mockSuggestions = [
  "iPhone 15",
  "Samsung Galaxy",
  "Bluetooth Speaker",
  "Running Shoes",
  "Smartwatch",
  "Wireless Earbuds",
  "Gaming Laptop",
  "Office Chair",
  "Air Conditioner",
  "LED TV",
];

// const mockSuggestions = [];
// mockSuggestions.append(data.products.map((nm) => nm.name));

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Simulate API fetch
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setLoading(false);
    }, 500); // debounce simulation

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setSearchTerm(suggestions[activeIndex]);
      setShowSuggestions(false);
      setActiveIndex(-1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative w-full md:w-1/3" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 px-10 py-2 rounded w-full focus:ring-2 focus:ring-indigo-400 transition"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => searchTerm && setShowSuggestions(true)}
      />

      {/* Search Icon */}
      <div className="absolute left-3 top-2.5 text-gray-500">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
        </svg>
      </div>

      {/* Clear Button */}
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("");
            setSuggestions([]);
            setActiveIndex(-1);
          }}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded shadow z-10 max-h-56 overflow-y-auto mt-1 transition-opacity duration-200">
          {loading ? (
            <li className="px-4 py-2 text-gray-500 italic">Loading...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, index) => {
              const start = item.toLowerCase().indexOf(searchTerm.toLowerCase());
              const end = start + searchTerm.length;
              return (
                <li
                  key={item}
                  onClick={() => {
                    setSearchTerm(item);
                    setShowSuggestions(false);
                    setActiveIndex(-1);
                  }}
                  className={`px-4 py-2 cursor-pointer ${
                    index === activeIndex ? "bg-indigo-100" : "hover:bg-gray-100"
                  }`}
                >
                  {start >= 0 ? (
                    <>
                      {item.slice(0, start)}
                      <span className="font-semibold text-indigo-600">{item.slice(start, end)}</span>
                      {item.slice(end)}
                    </>
                  ) : (
                    item
                  )}
                </li>
              );
            })
          ) : (
            <li className="px-4 py-2 text-gray-500 italic">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

