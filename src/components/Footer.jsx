import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      return;
    }
    setMessage("Thank you for subscribing!");
    setIsError(false);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 mt-10" role="contentinfo">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">ShopMate</h2>
          <p className="text-sm">
            Your one-stop shop for all your needs. Quality products, fast delivery.
          </p>
          <div className="mt-4 text-sm space-y-2">
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Commerce St, New York, NY</p>
            <p className="flex items-center gap-2"><FaPhoneAlt /> +1 (123) 456-7890</p>
            <p className="flex items-center gap-2"><FaEnvelope /> support@shopmate.com</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Shop", "Contact", "About", "Privacy Policy", "Terms of Service"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-white transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-sm mb-2">Get updates about new products and offers.</p>
          <form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Subscribe
            </button>
            {message && (
              <p className={`text-sm ${isError ? "text-red-400" : "text-green-400"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4 text-xl text-gray-400">
            {[
              { icon: <FaFacebook />, name: "Facebook", link: "https://facebook.com" },
              { icon: <FaTwitter />, name: "Twitter", link: "https://twitter.com" },
              { icon: <FaInstagram />, name: "Instagram", link: "https://instagram.com" },
              { icon: <FaLinkedin />, name: "LinkedIn", link: "https://linkedin.com" },
            ].map(({ icon, name, link }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="hover:text-white transition"
                data-tooltip-id={name}
                data-tooltip-content={name}
              >
                {icon}
                <Tooltip id={name} />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          {/* <button
            onClick={scrollToTop}
            className="mt-6 flex items-center gap-2 text-sm hover:text-white transition"
            aria-label="Back to top"
          >
            <FaArrowUp /> Back to Top
          </button> */}
        </div>

        {/* Language Selector */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
          <select
            id="language"
            onChange={handleChangeLanguage}
            value={i18n.language}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none"
            aria-label="Language selector"
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="es">🇪🇸 Español</option>
          </select>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm mb-2">We accept:</p>
        <div className="flex justify-center gap-4 flex-wrap items-center">
          {[
            {
              name: "Visa",
              src: "https://img.icons8.com/color/48/000000/visa.png",
            },
            {
              name: "Mastercard",
              src: "https://img.icons8.com/color/48/000000/mastercard.png",
            },
            {
              name: "PayPal",
              src: "https://img.icons8.com/color/48/000000/paypal.png",
            },
            {
              name: "Apple Pay",
              src: "https://img.icons8.com/ios-filled/48/ffffff/mac-os.png",
            },
          ].map(({ name, src }) => (
            <img key={name} src={src} alt={name} className="h-8" title={name} />
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
