import React from "react";

const ImageSlider: React.FC = () => {
  return (
    <div className="group">
      <div className="relative group-hover:absolute inset-0 bg-[url('/img/aied.webp')] bg-cover transition-all duration-300 ease-in-out"></div>
      <div className="relative w-full h-72 overflow-hidden">
        <div className="absolute inset-0 transition-all duration-300 ease-in-out group">
          {/* İkinci resim */}
          <div className="w-full h-full bg-[url('/img/aied.webp')] bg-cover group-hover:max-w-xs group-hover:h-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
