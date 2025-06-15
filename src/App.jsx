import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Cart from "./components/Cart";
import CategoryPage from "./components/CategoryPage";
import ThankYou from "./pages/ThankYou";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/NavBar";
import Contact from "./pages/ContactPage";
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Footer from "./components/Footer";


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once:true });
  }, []);
  return (
    <Router>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<AllProducts/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
