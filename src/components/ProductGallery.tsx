"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Desktop Hover Zoom
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

  // Sync scroll position with activeIndex on mobile
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const slideWidth = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / slideWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full relative">
      
      {/* Desktop Thumbnails (Left side) */}
      <div className="hidden lg:flex flex-col gap-4 overflow-y-auto overflow-x-hidden w-24 shrink-0 max-h-[85vh] scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-full aspect-[3/4] shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
              activeIndex === idx 
                ? "border-[2px] border-wine shadow-md opacity-100" 
                : "border-[2px] border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`${name} thumbnail ${idx}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Container */}
      <div className="relative w-full flex-1">
        
        {/* Desktop View (Hover to Zoom) */}
        <div 
          ref={imageRef}
          className="hidden lg:block relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-foreground/5 cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image 
            src={images[activeIndex]} 
            alt={name} 
            fill 
            className="object-cover transition-transform duration-300 ease-out pointer-events-none" 
            style={zoomStyle}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Mobile View (Swipeable Carousel) */}
        <div className="block lg:hidden relative w-full">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide aspect-[3/4] rounded-2xl"
            style={{ scrollBehavior: 'smooth' }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative w-full flex-none snap-center">
                <Image 
                  src={img} 
                  alt={`${name} image ${idx + 1}`} 
                  fill 
                  className="object-cover"
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Carousel Controls / Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToImage(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === idx ? "w-4 h-1.5 bg-wine" : "w-1.5 h-1.5 bg-wine/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Optional: Mobile Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={() => scrollToImage(Math.max(0, activeIndex - 1))}
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-wine shadow-sm z-10 transition-opacity ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scrollToImage(Math.min(images.length - 1, activeIndex + 1))}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-wine shadow-sm z-10 transition-opacity ${activeIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}
