
import { useState, useEffect } from "react";
import { Search, User, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-subtle py-3" : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedLogo />
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center h-12 rounded-full border border-gray-200 shadow-subtle divide-x overflow-hidden animate-fade-in-up animation-delay-100">
            <button className="px-5 h-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Anywhere
            </button>
            <button className="px-5 h-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Any week
            </button>
            <button className="pl-5 pr-3 h-full flex items-center gap-2">
              <span className="text-sm text-gray-500">Add guests</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0284C7] text-white">
                <Search size={16} />
              </div>
            </button>
          </div>
          
          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-1 animate-fade-in-up animation-delay-200">
            <button className="p-3 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <Globe size={18} />
            </button>
            <button className="flex items-center gap-2 p-2 pl-3 pr-2 rounded-full border shadow-subtle hover:shadow-md transition-all">
              <Menu size={16} />
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User size={16} />
              </div>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-50 transition-transform duration-300 pt-20",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4 py-6">
          <button className="p-4 rounded-xl border hover:border-gray-300 transition-colors flex items-center">
            <div className="flex items-center gap-3">
              <Search size={20} />
              <div className="text-left">
                <div className="text-sm font-medium">Where to?</div>
                <div className="text-xs text-gray-500">Anywhere · Any week · Add guests</div>
              </div>
            </div>
          </button>
          
          <div className="flex flex-col divide-y">
            <a href="#" className="py-4 text-lg">Home</a>
            <a href="#" className="py-4 text-lg">Explore</a>
            <a href="#" className="py-4 text-lg">Favorites</a>
            <a href="#" className="py-4 text-lg">Profile</a>
            <a href="#" className="py-4 text-lg">Help</a>
          </div>
        </div>
      </div>
    </header>
  );
}
