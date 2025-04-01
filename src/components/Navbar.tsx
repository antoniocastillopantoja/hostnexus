import { useState, useEffect } from "react";
import { Search, Menu, X, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedLogo } from "./AnimatedLogo";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserButton } from "./UserButton";
import { Link } from "react-router-dom";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg py-3" 
        : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="transition-transform hover:scale-105">
            <AnimatedLogo />
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center h-14 rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 divide-x overflow-hidden animate-fade-in-up animation-delay-100 bg-white">
            <button className="px-6 h-full text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors flex items-center gap-2">
              <span>{t('nav.anywhere')}</span>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            </button>
            <button className="px-6 h-full text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors flex items-center gap-2">
              <Calendar size={16} />
              <span>{t('nav.anyweek')}</span>
            </button>
            <button className="pl-6 pr-4 h-full flex items-center gap-2 hover:bg-gray-50/80 transition-colors">
              <Users size={16} className="text-gray-500" />
              <span className="text-sm text-gray-500">{t('nav.addguests')}</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0284C7] text-white hover:bg-[#0284C7]/90 transition-colors">
                <Search size={16} />
              </div>
            </button>
          </div>
          
          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-4 animate-fade-in-up animation-delay-200">
            <LanguageToggle />
            <UserButton />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <UserButton />
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white/95 backdrop-blur-xl z-50 transition-transform duration-500 pt-20",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4 py-6">
          <button className="p-4 rounded-xl border hover:border-gray-300 transition-all duration-300 hover:shadow-lg flex items-center bg-white">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-gray-500" />
              <div className="text-left">
                <div className="text-sm font-medium">{t('nav.whereto')}</div>
                <div className="text-xs text-gray-500">{t('nav.anywhere')} · {t('nav.anyweek')} · {t('nav.addguests')}</div>
              </div>
            </div>
          </button>
          
          <div className="flex flex-col divide-y">
            <Link to="/" className="py-4 text-lg hover:text-[#0284C7] transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/explore" className="py-4 text-lg hover:text-[#0284C7] transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('nav.explore')}</Link>
            <Link to="/favorites" className="py-4 text-lg hover:text-[#0284C7] transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('nav.favorites')}</Link>
            <Link to="/profile" className="py-4 text-lg hover:text-[#0284C7] transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('nav.profile')}</Link>
            <Link to="/help" className="py-4 text-lg hover:text-[#0284C7] transition-colors" onClick={() => setMobileMenuOpen(false)}>{t('nav.help')}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
