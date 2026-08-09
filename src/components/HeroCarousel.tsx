"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import slider1 from "../../public/Slider 1.png";
import slider2 from "../../public/Slider 2.png";
import slider3 from "../../public/Slider 3.png";

const carouselSlides = [
  {
    id: 1,
    image: slider1,
    title: "Timeless Sarees.\nMade to Be Remembered.",
    subtitle: "Discover elegant sarees crafted for celebrations, occasions and unforgettable moments.",
    link: "/collections",
    eyebrow: "NEW COLLECTION",
    objectPosition: "center 20%",
  },
  {
    id: 2,
    image: slider2,
    title: "Pure Silk Heritage.\nWoven with Love.",
    subtitle: "Discover the finest Kanchipuram and Banarasi silks for your special moments.",
    link: "/collections?category=SILK%20SAREES",
    eyebrow: "SILK SAREES",
    objectPosition: "right 20%",
  },
  {
    id: 3,
    image: slider3,
    title: "Bridal Masterpieces.\nYour Perfect Day.",
    subtitle: "Exquisite bridal collections designed to make you shine on your wedding day.",
    link: "/collections?category=BRIDAL%20SAREES",
    eyebrow: "BRIDAL EDIT",
    objectPosition: "left 20%",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="w-full bg-background relative pb-12">
      {/* The new padding structure around the hero */}
      <div className="container mx-auto px-4 pt-4 md:pt-8 md:px-8">
        
        {/* Large centered rounded hero container */}
        <div className="w-full bg-wine-dark rounded-[30px] md:rounded-[40px] overflow-hidden flex flex-col-reverse lg:flex-row relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[75vh] md:min-h-[85vh]">
          
          {/* LEFT COLUMN: Content */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-start pt-16 lg:pt-32 relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-gold/70" />
                  <span className="text-gold tracking-[0.3em] uppercase text-[10px] md:text-xs font-medium">{carouselSlides[current].eyebrow}</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6 tracking-wide drop-shadow-sm">
                  {carouselSlides[current].title.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h1>
                
                <p className="text-white/80 text-sm md:text-base lg:text-lg mb-12 max-w-md font-light leading-relaxed">
                  {carouselSlides[current].subtitle}
                </p>
                
                <Link 
                  href={carouselSlides[current].link}
                  className="group flex items-center bg-gold text-wine-dark hover:bg-white transition-colors duration-300 rounded-none px-8 py-3.5 font-medium text-xs tracking-[0.2em] uppercase"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls (Integrated into Left Column) */}
            <div className="mt-12 lg:mt-20 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex gap-2">
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                    }}
                    className={`transition-all duration-500 rounded-full ${
                      current === idx ? "w-8 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2 ml-4">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Image */}
          <div className="w-full lg:w-1/2 relative aspect-[3/4] sm:aspect-[4/5] lg:absolute lg:right-0 lg:inset-y-0 lg:aspect-auto">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselSlides[current].image}
                  alt="Luxury Saree Model"
                  fill
                  quality={100}
                  unoptimized={true}
                  className="object-cover"
                  style={{ objectPosition: carouselSlides[current].objectPosition }}
                  priority
                />
                {/* Subtle gradient to blend the image edge with the wine-dark left column on desktop */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-wine-dark to-transparent hidden lg:block" />
                {/* Subtle gradient on mobile to blend bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-wine-dark to-transparent lg:hidden" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Bottom Features Bar (kept from original, moved outside the rounded box) */}
      <div className="container mx-auto px-4 md:px-12 mt-12 hidden lg:block">
        <div className="flex justify-between items-center text-wine-dark bg-gold/5 rounded-2xl p-8 border border-gold/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-white text-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z" /></svg>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase">Premium Quality</h4>
              <p className="text-[10px] text-wine/60 tracking-wider uppercase">Finest Fabrics</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gold/20" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-white text-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase">Handpicked</h4>
              <p className="text-[10px] text-wine/60 tracking-wider uppercase">Curated Collections</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gold/20" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-white text-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase">Heritage Weaves</h4>
              <p className="text-[10px] text-wine/60 tracking-wider uppercase">Timeless Craftsmanship</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gold/20" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-white text-gold">
              <Heart size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase">Made for You</h4>
              <p className="text-[10px] text-wine/60 tracking-wider uppercase">For Every Occasion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
