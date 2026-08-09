"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinksLeft: { name: string, path: string, hasDropdown?: boolean }[] = [
  { name: "HOME", path: "/" },
  { name: "COLLECTIONS", path: "/collections", hasDropdown: true },
  { name: "NEW ARRIVALS", path: "/new-arrivals" },
];

const navLinksRight: { name: string, path: string, hasDropdown?: boolean }[] = [
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
  { name: "ADMIN", path: "/admin" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 border-b border-gold/20 ${
          scrolled 
            ? "bg-wine-dark/90 backdrop-blur-xl shadow-2xl" 
            : "bg-gradient-to-r from-wine-dark via-[#6b1130] to-wine-dark shadow-xl"
        }`}
      >
        {/* Top Stylish Announcement Bar */}
        <div className="hidden md:flex justify-between items-center px-8 py-2.5 bg-black/40 backdrop-blur-sm border-b border-gold/20 text-gold text-[10px] tracking-widest uppercase relative overflow-hidden">
          {/* Subtle gold shine effect in announcement bar */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-gold rotate-45 shadow-[0_0_5px_#D4AF37]" />
            <span className="font-medium tracking-[0.2em] text-white/90">Premium Sarees. Timeless Elegance.</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" /> WhatsApp Support
            </span>
            <span className="w-px h-3 bg-gold/40" />
            <span className="hover:text-white transition-colors cursor-pointer">Store Locator</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="flex items-center justify-between h-[72px] md:h-[88px] relative">
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-gold hover:text-white transition-all duration-[250ms] w-1/4 text-left"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>

            {/* Desktop Navigation (Left) */}
            <nav className="hidden lg:flex items-center justify-center gap-6 w-[40%]">
              {navLinksLeft.map((link, index) => (
                <div key={link.name} className="flex items-center gap-6">
                  <Link
                    href={link.path}
                    className={`font-serif uppercase tracking-[0.15em] text-[12px] flex items-center gap-1 transition-all duration-300 relative group py-2 ${
                      pathname === link.path ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "text-white/80 hover:text-gold"
                    }`}
                  >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className="opacity-70 group-hover:opacity-100" />}
                  
                  {/* Gold hover underline animation */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-gold transition-all duration-300 ${
                    pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:w-full"
                  }`} />
                  </Link>
                  {index < navLinksLeft.length - 1 && (
                    <span className="w-1 h-1 rotate-45 bg-gold/30" />
                  )}
                </div>
              ))}
            </nav>

            {/* Center Logo - Gold Coin Upgrade */}
            <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center h-full z-50 pointer-events-none">
              <div 
                className={`transition-all duration-[500ms] pointer-events-auto rounded-full flex items-center justify-center relative ${
                  scrolled 
                    ? "w-[61px] h-[61px] md:w-[76px] md:h-[76px] translate-y-0" 
                    : "w-[72px] h-[72px] md:w-[100px] md:h-[100px] translate-y-[40%]"
                } bg-gradient-to-br from-[#FDE08B] via-[#D4AF37] to-[#8A6D1C] p-[3px] shadow-[0_8px_20px_rgba(0,0,0,0.5),_inset_0_2px_4px_rgba(255,255,255,0.4)]`}
              >
                <Link href="/" className="flex items-center justify-center w-full h-full rounded-full overflow-hidden relative bg-wine-dark border-[2px] border-[#4A0A23] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/assests/logo.png"
                    alt="Miss Studio"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 72px, 100px"
                  />
                  {/* Coin Shine Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none" />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation (Right half for symmetry if needed, or just icons) */}
            <div className="hidden lg:flex items-center justify-end w-[40%]">
              <nav className="flex items-center justify-center gap-6 mr-8">
                {navLinksRight.map((link, index) => (
                  <div key={link.name} className="flex items-center gap-6">
                    <Link
                      href={link.path}
                      className={`font-serif uppercase tracking-[0.15em] text-[12px] flex items-center gap-1 transition-all duration-300 relative group py-2 ${
                        pathname === link.path ? "text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" : "text-white/80 hover:text-gold"
                      }`}
                    >
                      {link.name}
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-gold transition-all duration-300 ${
                        pathname === link.path ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:w-full"
                      }`} />
                    </Link>
                    {index < navLinksRight.length - 1 && (
                      <span className="w-1 h-1 rotate-45 bg-gold/30" />
                    )}
                  </div>
                ))}
              </nav>

              {/* Icons */}
              <div className="flex items-center gap-3 text-gold">
                <button aria-label="Search" className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-wine-dark transition-all duration-300 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]">
                  <Search size={16} strokeWidth={1.5} />
                </button>
                <button aria-label="Account" className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-wine-dark transition-all duration-300 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]">
                  <User size={16} strokeWidth={1.5} />
                </button>
                <button aria-label="Wishlist" className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-wine-dark transition-all duration-300 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]">
                  <Heart size={16} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Cart" 
                  className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-wine-dark transition-all duration-300 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)] relative"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  <span className="text-[9px] font-bold bg-white text-wine-dark w-4 h-4 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5 shadow-sm">
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Icons (Right) */}
            <div className="flex lg:hidden items-center justify-end gap-[22px] w-1/4 text-white/90">
              <button aria-label="Search" className="hover:text-gold transition-colors duration-[250ms]">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                aria-label="Cart" 
                className="hover:text-gold transition-colors duration-[250ms] relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-bold bg-gold text-wine w-3.5 h-3.5 rounded-full flex items-center justify-center absolute -top-1 -right-1.5">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-[72px] md:h-[120px]" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-wine-dark z-50 lg:hidden p-8 border-r border-gold/20 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="relative w-[72px] h-[72px] rounded-full border border-gold/40 overflow-hidden bg-wine">
                  <Image
                    src="/assests/logo.png"
                    alt="Miss Studio"
                    fill
                    className="object-cover"
                  />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-white/60 hover:text-gold transition-colors duration-[250ms]">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6 flex-1">
                {[...navLinksLeft, ...navLinksRight].map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm uppercase font-serif tracking-[0.12em] transition-colors duration-[250ms] hover:text-gold flex justify-between items-center border-b border-white/10 pb-4 ${
                      pathname === link.path ? "text-gold" : "text-white/80"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={16} className="opacity-50" />}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
