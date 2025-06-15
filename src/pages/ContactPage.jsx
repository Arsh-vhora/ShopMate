import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!");
    // TODO: Send to backend or email service
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg p-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Contact Us</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full p-3 border rounded"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border rounded"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-500 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-4 text-gray-700">
          <h3 className="text-2xl font-semibold">Get in touch</h3>
          <p>We’d love to hear from you. Fill out the form and we’ll get back to you soon.</p>
          <div>
            <p><strong>Address:</strong> 123 Market St, Mumbai, India</p>
            <p><strong>Email:</strong> support@shopmate.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
