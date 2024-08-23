"use client";

import React, { useState } from "react";

const ImageGallery = ({ images }: any) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="h-screen w-screen relative">
      {/* Main Image Section */}
      <div
        className="relative w-full h-3/4 bg-black"
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center ",
        }}
      >
        {/* Thumbnails Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 p-4 bg-black bg-opacity-50 flex justify-center items-center space-x-4 overflow-x-scroll no-scrollbar">
          {images.map((image: any, index: any) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`h-full object-contain rounded-lg cursor-pointer transition-transform duration-200 ease-in-out ${
                selectedImage === image
                  ? "transform scale-110 border-4 border-indigo-500"
                  : "opacity-70 hover:opacity-100"
              }`}
              onMouseEnter={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
