import React, { useState, useRef } from "react";

const ImageSlider: React.FC = () => {
  return (
    <>
      <div className="relative w-full max-w-lg h-72 overflow-hidden ">
        <div className="absolute inset-0 bg-[url('/img/aied.webp')] bg-cover"></div>
      </div>
      <div className="absolute inset-0 bg-[url('/img/aied.webp')] bg-cover hover:invisible"></div>
    </>
  );
};

export default ImageSlider;
