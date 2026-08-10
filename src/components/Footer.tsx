import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-wine-dark text-background pt-20 pb-8 border-t border-gold/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="relative w-48 h-16">
              <Image
                src="/assests/logo.png"
                alt="Miss Studio"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Exquisite sarees crafted with heritage, designed for today&apos;s graceful you. Experience the elegance of tradition combined with modern luxury aesthetics.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/miss_studio_official" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-2xl mb-8 text-gold">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Collections", path: "/collections" },
                { name: "New Arrivals", path: "/new-arrivals" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-gold/50 group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-serif text-2xl mb-8 text-gold">Customer Care</h3>
            <ul className="space-y-4">
              {[
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Returns & Exchanges", path: "/returns" },
                { name: "FAQs", path: "/faqs" },
                { name: "Size Guide", path: "/size-guide" },
                { name: "Track Order", path: "/track-order" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-gold/50 group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-2xl mb-8 text-gold">Get in Touch</h3>
            <ul className="space-y-5 text-sm text-white/70 font-light">
              <li className="flex gap-4 items-start">
                <MapPin className="text-gold shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
                <span className="leading-relaxed">Thiruvottiyur, Chennai.<br />(Shipping all over India)</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-gold shrink-0" size={20} strokeWidth={1.5} />
                <span>+91 63820 88191</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-gold shrink-0" size={20} strokeWidth={1.5} />
                <span>missstudio1512@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 font-light">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Miss Studio. All rights reserved.</p>
            <span className="hidden md:inline">|</span>
            <p>Designed by <a href="https://wisdotech.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors underline-offset-4 hover:underline">Wisdo designs</a></p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
