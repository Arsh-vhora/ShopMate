import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination,EffectFade } from "swiper/core";
import { useCart } from "../context/CartContext";
import data from '../assets/data/ProductData';
import SearchBar from '../components/SearchBar';
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const categories = ["All", ...new Set(data.products.map((p) => p.category))];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const currentCategory = location.pathname.split("/")[2] || "All";

  const filteredProducts = data.products.filter((product) =>
    (filter === "All" || product.category === filter) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => addToCart(product);

  return (
    <div className="font-sans w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          loop
          className="w-full h-full"
        >
          {data.heroImages.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.url})` }}
              >
                <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center text-center px-4">
                  <div className="text-white max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t(slide.heading)}</h1>
                    <p className="text-lg md:text-xl mb-6">{t(slide.subheading)}</p>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-200 transition">
                      {t("Shop Now")}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>

      {/* Top Categories
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-6">Shop by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {categories.slice(1).map((cat, i) => (
              <div
                key={i}
                onClick={() => navigate(cat === "All" ? "/" : `/category/${cat}`)}
                className="p-4 bg-gray-100 hover:bg-indigo-100 rounded cursor-pointer transition capitalize"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Filters & Search */}
      <section className="bg-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          {/* Category Filters */}
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {categories.map((cat) => {
              const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
              return (
              <Link
                  key={cat}
                  to={cat === "All" ? "/" : `/category/${cat}`}
                  className={`flex items-center gap-1 px-4 py-2 rounded transition-colors duration-200 ${
                  isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
                  }`}
              >
                  <span className="capitalize">{cat}</span>
              </Link>
              );
          })}
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  </div> 
</section>


      {/* Featured Products */}
      <section id="products" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8 text-center" data-aos="fade-up">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={t(product.name)} className="w-full h-48 object-contain rounded mb-4" />
                  <h4 className="text-lg font-bold mb-2">{product.name}</h4>
                  <p className="text-indigo-600 text-lg">${product.price}</p>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 w-full mt-2"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <button
              onClick={() => navigate("/products")}
              className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded hover:bg-indigo-500 hover:text-white transition"
            >
              Browse All Products
            </button>
          </div>
        </div>
      </section>


        {/* Deals of Days Section */}
        {/* <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">🔥 Deal of the Day</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {data.dealOfTheDayProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {product.discount}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded mb-4"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold mb-1 text-gray-800">{product.name}</h4>
                  <p className="text-indigo-600 text-xl font-bold mb-2">{product.price}</p>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section> */}
    <section className="bg-gray-50 py-14" data-aos="fade-left">
      <div className="container mx-auto px-4 max-w-screen-md sm:max-w-full">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          🔥 Deals of the Day
        </h2>

        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {data.dealOfTheDayProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 mx-auto max-w-sm sm:max-w-md">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  {product.discount}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded mb-4"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold mb-1 text-gray-800">{product.name}</h4>
                  <p className="text-indigo-600 text-xl font-bold mb-2">{product.price}</p>
                  <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition">
                    Shop Now!
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>



      {/* Why Choose Us */}
      <section className="py-12 bg-white text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-6">Why Choose ShopMate?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl text-indigo-600 mb-2">🚚</div>
              <h4 className="font-bold mb-2">Free Shipping</h4>
              <p className="text-gray-600">On all orders above $50</p>
            </div>
            <div>
              <div className="text-4xl text-indigo-600 mb-2">🔒</div>
              <h4 className="font-bold mb-2">Secure Payment</h4>
              <p className="text-gray-600">Safe & encrypted checkout</p>
            </div>
            <div>
              <div className="text-4xl text-indigo-600 mb-2">↩️</div>
              <h4 className="font-bold mb-2">Easy Returns</h4>
              <p className="text-gray-600">Return within 7 days</p>
            </div>
            <div>
              <div className="text-4xl text-indigo-600 mb-2">📞</div>
              <h4 className="font-bold mb-2">24/7 Support</h4>
              <p className="text-gray-600">Chat or call us anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trusted Brands Section */}
      <section className="bg-gray-50 py-14">
        <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Trusted by Leading Brands</h2>
            <p className="text-gray-500 mb-10 text-sm sm:text-base">
            ShopMate proudly collaborates with top global brands delivering quality, trust, and innovation.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
            {[
                "amazon.com",
                "flipkart.com",
                "apple.com",
                "samsung.com",
                "sony.com",
                "lg.com",
                "microsoft.com",
                "hp.com"
            ].map((domain) => (
                <div key={domain} className="flex items-center justify-center group">
                <div className="bg-white p-4 rounded shadow hover:shadow-md transition duration-300 transform group-hover:scale-105 w-32 h-20 flex items-center justify-center">
                    <img
                    src={`https://logo.clearbit.com/${domain}`}
                    alt={domain}
                    className="max-h-10 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                    />
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>




      {/* Testimonials */}
      <section className="py-12 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">Customer Testimonials</h3>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay, Pagination]}
          >
            {data.testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-white p-6 rounded shadow text-center">
                  <img src={t.image} className="h-16 w-16 rounded-full mx-auto mb-4" alt={t.name} />
                  <p className="italic text-gray-600">"{t.text}"</p>
                  <div className="text-yellow-400 mt-2">
                    {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                  </div>
                  <p className="mt-2 font-semibold text-indigo-600">- {t.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


    {/* Customer Satifaction Section */}
      <section className="bg-indigo-50 py-8 text-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Join over <span className="text-indigo-600">10,000+ Happy Shoppers</span></h3>
        <p className="text-gray-600">Your satisfaction is our priority</p>
      </section>


      {/* Newsletter Signup */}
      {/* <section className="bg-indigo-600 text-white text-center py-12">
        <h4 className="text-2xl font-bold mb-4">Sign up for exclusive deals</h4>
        <div className="flex justify-center gap-4 flex-wrap">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 text-black rounded w-full max-w-md bg-white"
          />
          <button className="bg-white text-indigo-600 px-6 py-2 rounded hover:bg-gray-100">Join Now</button>
        </div>
      </section> */}
        
        {/* Contact Us & Up scroll Button */}
        {typeof window !== "undefined" && window.scrollY > 300 && (
        <div className="fixed bottom-5 right-5 flex flex-wrap gap-3 items-center justify-baseline">
            <a href="/contact" className=" bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-400">
                💬 Chat With Us
            </a>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className=" bg-indigo-600 text-white w-10 h-10 rounded-full shadow-lg hover:bg-indigo-500"
            >
                ↑
            </button>
        </div>
        )}
        

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>&copy; {new Date().getFullYear()} ShopMate. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
