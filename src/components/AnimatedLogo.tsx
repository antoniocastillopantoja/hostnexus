
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedLogoProps = {
  className?: string;
};

export function AnimatedLogo({ className }: AnimatedLogoProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center gap-2 transition-all duration-500 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="relative w-8 h-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0284C7] rounded-lg transform transition-transform duration-700 hover:scale-110"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">HS</div>
        </div>
        <span className="font-semibold text-lg text-airbnb-blue-dark">HostNexus</span>
      </div>
    </div>
  );
}
