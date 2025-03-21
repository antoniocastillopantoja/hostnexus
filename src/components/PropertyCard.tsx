
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    imageUrl: string;
    dates?: string;
    host?: string;
    isSuperHost?: boolean;
  };
  className?: string;
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className={cn("group overflow-hidden", className)}>
      {/* Image Container */}
      <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-3">
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        <img
          src={property.imageUrl}
          alt={property.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isLoaded ? "scale-100 blur-0" : "scale-110 blur-md",
            "group-hover:scale-105 transition-transform duration-700"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-colors z-10"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            size={16} 
            className={cn(
              "transition-colors",
              isFavorite ? "fill-[#F43F5E] text-[#F43F5E]" : "fill-transparent"
            )} 
          />
        </button>
        
        {/* Host Badge */}
        {property.isSuperHost && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-xs font-medium z-10">
            Superhost
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-900">
            <Star size={14} className="fill-current" />
            <span className="text-sm">{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{property.location}</p>
        {property.dates && (
          <p className="text-gray-500 text-sm">{property.dates}</p>
        )}
        <p className="font-medium pt-1">
          ${property.price} <span className="text-gray-500 font-normal">night</span>
        </p>
      </div>
    </div>
  );
}
