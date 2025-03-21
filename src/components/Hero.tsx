
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10"></div>
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Luxury vacation home with pool" 
          className={cn(
            "w-full h-full object-cover transition-all duration-[1.5s]",
            loaded ? "scale-100 blur-0" : "scale-110 blur-xl"
          )}
          onLoad={() => setLoaded(true)}
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center px-4 text-center text-white">
        <h1 className={cn(
          "heading-xl max-w-4xl text-balance mb-6 transition-all duration-1000",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {t('hero.title')}
        </h1>
        <p className={cn(
          "text-xl md:text-2xl max-w-2xl text-balance mb-12 text-white/90 transition-all duration-1000 delay-100",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {t('hero.subtitle')}
        </p>
        
        <div className={cn(
          "transition-all duration-1000 delay-200 w-full max-w-4xl",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
