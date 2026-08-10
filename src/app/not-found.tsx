import Link from "next/link";
import { Hammer } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold">
            <Hammer size={48} strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="font-serif text-4xl text-wine-dark font-bold mb-4">
          Under Construction
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed font-light">
          We are carefully crafting this section of our boutique. It will be launching very soon!
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3.5 bg-wine text-white uppercase tracking-[0.15em] text-sm hover:bg-wine-dark transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
