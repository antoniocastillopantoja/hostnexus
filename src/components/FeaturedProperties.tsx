
import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

// Type for property data
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  isSuperHost?: boolean;
}

export function FeaturedProperties() {
  const [isVisible, setIsVisible] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(8);

        if (error) {
          console.error('Error fetching properties:', error);
          return;
        }

        if (data && data.length > 0) {
          // Map the data to our Property interface
          const formattedProperties = data.map(item => ({
            id: item.id,
            title: item.title,
            location: item.location,
            price: parseFloat(item.price),
            rating: 4.8 + Math.random() * 0.19, // Random rating between 4.8 and 4.99
            imageUrl: item.image_url || "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
            isSuperHost: Math.random() > 0.5 // Random superhost status
          }));
          setProperties(formattedProperties);
        } else {
          // Fallback to mock data if no properties in database
          setProperties(mockProperties);
        }
      } catch (error) {
        console.error('Failed to fetch properties:', error);
        setProperties(mockProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
    
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
          {t('featured.title')}
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="rounded-xl bg-gray-200 h-72 mb-3"></div>
                <div className="bg-gray-200 h-5 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {properties.map((property, index) => (
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
        )}
      </div>
    </section>
  );
}

// Mock data as fallback
const mockProperties = [
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
