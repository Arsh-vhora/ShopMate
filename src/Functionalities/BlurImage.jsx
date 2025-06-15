// components/BlurImage.jsx
import React, { useState } from "react";

export default function BlurImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Blurred placeholder */}
      <img
        src={src}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full rounded-full object-cover filter blur-lg scale-105 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Full quality image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
