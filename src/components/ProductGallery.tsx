"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:w-24 shrink-0 pb-2 lg:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-20 h-24 lg:w-full lg:h-32 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              activeIndex === idx ? "border-gold" : "border-transparent hover:border-gold/50"
            }`}
          >
            <Image src={img} alt={`${name} thumbnail ${idx}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div 
        ref={imageRef}
        className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-foreground/5 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image 
          src={images[activeIndex]} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-200 ease-out pointer-events-none" 
          style={zoomStyle}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
