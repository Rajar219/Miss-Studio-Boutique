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
              <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider">IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider">FB</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-wine-dark transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-wider">X</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-2xl mb-8 text-gold">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "Collections", "New Arrivals", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-gold/50 group-hover:w-4 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-serif text-2xl mb-8 text-gold">Customer Care</h3>
            <ul className="space-y-4">
              {["Shipping Policy", "Returns & Exchanges", "FAQs", "Size Guide", "Track Order"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-gold/50 group-hover:w-4 transition-all" />
                    {link}
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
                <span className="leading-relaxed">123 Silk Road, Heritage District,<br />Kanchipuram, TN 631501</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-gold shrink-0" size={20} strokeWidth={1.5} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-gold shrink-0" size={20} strokeWidth={1.5} />
                <span>care@missstudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 font-light">
          <p>&copy; {new Date().getFullYear()} Miss Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
