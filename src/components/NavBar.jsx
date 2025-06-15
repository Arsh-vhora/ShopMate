import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import '../index.css';

export default function Navbar() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to='/' onClick={() => setMobileMenuOpen(false)}>
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold text-indigo-700 tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text drop-shadow-md hover:cursor-pointer"
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: -3 }}
          >
            ShopMate
          </motion.h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/products" className="hover:text-indigo-600">Products</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
          <Link to="/cart" className="relative hover:text-indigo-600 font-semibold">
            <svg className="w-6 h-6 text-gray-700 hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h11L17 13M7 13h10m-6 4h.01M13 17h.01" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Icons (Hamburger + Cart) */}
        <div className="md:hidden flex items-center gap-4 z-50">
          {/* Cart icon for mobile */}
          <Link to="/cart" className="relative hover:text-indigo-600 font-semibold">
            <svg className="w-6 h-6 text-gray-700 hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h11L17 13M7 13h10m-6 4h.01M13 17h.01" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Hamburger icon */}
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-800" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-6 py-4 border-t shadow"
          >
            <div className="flex flex-col space-y-4 text-lg">
              <Link to="/" onClick={toggleMobileMenu} className="hover:text-indigo-600">Home</Link>
              <Link to="/products" onClick={toggleMobileMenu} className="hover:text-indigo-600">Products</Link>
              <Link to="/contact" onClick={toggleMobileMenu} className="hover:text-indigo-600">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
