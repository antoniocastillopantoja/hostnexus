
import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { cn } from "@/lib/utils";

// Mock data
const featuredProperties = [
  {
    id: "1",
    title: "Modern Beachfront Villa",
    location: "Cancún, Mexico",
    price: 250,
    rating: 4.97,
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    isSuperHost: true
  },
  {
    id: "2",
    title: "Mountain Cabin Retreat",
    location: "Aspen, Colorado",
    price: 189,
    rating: 4.85,
    imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Luxury Penthouse Apartment",
    location: "New York, New York",
    price: 420,
    rating: 4.92,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    isSuperHost: true
  },
  {
    id: "4",
    title: "Scenic Lakefront Cottage",
    location: "Lake Tahoe, California",
    price: 175,
    rating: 4.89,
    imageUrl: "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Historic Downtown Loft",
    location: "Chicago, Illinois",
    price: 135,
    rating: 4.79,
    imageUrl: "https://images.unsplash.com/photo-1536437774098-cf212972bd84?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Oceanview Beach House",
    location: "Malibu, California",
    price: 395,
    rating: 4.95,
    imageUrl: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?q=80&w=2070&auto=format&fit=crop",
    isSuperHost: true
  },
  {
    id: "7",
    title: "Cozy Urban Apartment",
    location: "Seattle, Washington",
    price: 110,
    rating: 4.81,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "8",
    title: "Tropical Paradise Villa",
    location: "Kauai, Hawaii",
    price: 275,
    rating: 4.98,
    imageUrl: "https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=2070&auto=format&fit=crop",
    isSuperHost: true
  }
];

export function FeaturedProperties() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className={cn(
          "heading-lg mb-10 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          Featured places to stay
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
                // Add staggered animation delays
                {
                  "transition-delay-100": index % 4 === 0,
                  "transition-delay-200": index % 4 === 1,
                  "transition-delay-300": index % 4 === 2,
                  "transition-delay-500": index % 4 === 3,
                }
              )}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
