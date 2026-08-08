"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const carouselSlides = [
  {
    id: 1,
    image: "/Slider 1.png",
    title: "Timeless Elegance.\nWoven for Her.",
    subtitle: "Exquisite sarees crafted with heritage, designed for today's graceful you.",
    link: "/collections",
  },
  {
    id: 2,
    image: "/Slider 2.png",
    title: "Pure Silk Heritage.\nWoven with Love.",
    subtitle: "Discover the finest Kanchipuram and Banarasi silks for your special moments.",
    link: "/collections?category=SILK%20SAREES",
  },
  {
    id: 3,
    image: "/Slider 3.png",
    title: "Bridal Masterpieces.\nYour Perfect Day.",
    subtitle: "Exquisite bridal collections designed to make you shine on your wedding day.",
    link: "/collections?category=BRIDAL%20SAREES",
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
  }, [current]); // Added current to dependency array since nextSlide uses it

  const variants = {
    enter: () => ({
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
    },
    exit: () => ({
      zIndex: 0,
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full h-[calc(100vh-72px)] md:h-[calc(100vh-120px)] flex items-center overflow-hidden bg-background">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={carouselSlides[current].image}
              alt="Luxury Saree Model"
              fill
              className="object-cover object-top md:object-[center_top]"
              priority
            />
            {/* Dark Wine Gradient Overlay for Text Legibility (Sabyasachi style) */}
            <div className="absolute inset-0 bg-gradient-to-r from-wine-dark/95 via-wine-dark/70 to-transparent w-full md:w-[75%] lg:w-[60%] z-10" />
            <div className="absolute inset-0 bg-black/20 z-10" /> {/* Subtle overall darkening */}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-12 relative z-20 flex h-full items-center">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="max-w-2xl text-left"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold/70" />
            <span className="text-gold tracking-[0.3em] uppercase text-[10px] md:text-xs font-medium">Timeless Elegance</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8 tracking-wide drop-shadow-sm">
            {carouselSlides[current].title.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          
          <p className="text-white/80 text-base md:text-lg mb-10 max-w-lg font-light leading-relaxed">
            {carouselSlides[current].subtitle}
          </p>
          
          <div className="flex gap-4 items-center">
            <Link 
              href={carouselSlides[current].link}
              className="group flex items-center bg-gold text-wine-dark hover:bg-white transition-colors duration-300 rounded-none px-8 py-4 font-medium text-xs tracking-[0.2em] uppercase"
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-0 w-full z-30">
        <div className="container mx-auto px-4 md:px-12 flex justify-start items-center gap-4">
          <div className="flex gap-3">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={`transition-all duration-500 rounded-full ${
                  current === idx ? "w-10 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full z-30 px-4 flex justify-between pointer-events-none hidden md:flex">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors pointer-events-auto backdrop-blur-sm bg-wine-dark/20 ml-4"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors pointer-events-auto backdrop-blur-sm bg-wine-dark/20 mr-4"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Features Bar (from screenshot) */}
      <div className="absolute bottom-0 left-0 w-full bg-wine-dark/95 backdrop-blur-md border-t border-gold/20 z-30 hidden lg:block py-6">
        <div className="container mx-auto px-12">
          <div className="flex justify-between items-center text-gold">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z" /></svg>
              </div>
              <div>
                <h4 className="text-sm font-medium tracking-widest uppercase">Premium Quality</h4>
                <p className="text-[10px] text-white/60 tracking-wider uppercase">Finest Fabrics</p>
              </div>
            </div>
            <div className="w-px h-10 bg-gold/20" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <div>
                <h4 className="text-sm font-medium tracking-widest uppercase">Handpicked</h4>
                <p className="text-[10px] text-white/60 tracking-wider uppercase">Curated Collections</p>
              </div>
            </div>
            <div className="w-px h-10 bg-gold/20" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h4 className="text-sm font-medium tracking-widest uppercase">Heritage Weaves</h4>
                <p className="text-[10px] text-white/60 tracking-wider uppercase">Timeless Craftsmanship</p>
              </div>
            </div>
            <div className="w-px h-10 bg-gold/20" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <Heart size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-medium tracking-widest uppercase">Made for You</h4>
                <p className="text-[10px] text-white/60 tracking-wider uppercase">For Every Occasion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
