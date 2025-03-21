
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: string[];
  className?: string;
};

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Preload the first three images
    images.slice(0, 3).forEach((_, index) => {
      const img = new Image();
      img.src = images[index];
      img.onload = () => {
        setLoaded(prev => ({ ...prev, [index]: true }));
      };
    });
  }, [images]);

  const handleImageLoad = (index: number) => {
    setLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className={cn("overflow-hidden", className)}>
      {/* Main Image */}
      <div className="relative aspect-video mb-3 rounded-xl overflow-hidden bg-gray-100">
        {images.map((src, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              selectedIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Placeholder */}
            {!loaded[index] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                loaded[index] ? "scale-100 blur-0" : "scale-110 blur-md"
              )}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {images.map((src, index) => (
          <button
            key={index}
            className={cn(
              "relative flex-shrink-0 w-20 aspect-square rounded-md overflow-hidden transition-all",
              selectedIndex === index 
                ? "ring-2 ring-black" 
                : "ring-1 ring-transparent hover:ring-gray-300"
            )}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {selectedIndex === index && (
              <div className="absolute inset-0 bg-black/10" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
