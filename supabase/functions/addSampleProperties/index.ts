
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const sampleProperties = [
      {
        title: "Modern Beachfront Villa",
        description: "Luxurious beachfront villa with panoramic ocean views and private pool.",
        price: 250,
        location: "Cancún, Mexico",
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        image_url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Mountain Cabin Retreat",
        description: "Cozy mountain cabin surrounded by pine trees with stunning mountain views.",
        price: 189,
        location: "Aspen, Colorado",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image_url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Luxury Penthouse Apartment",
        description: "Elegant penthouse in the heart of the city with floor-to-ceiling windows.",
        price: 420,
        location: "New York, New York",
        bedrooms: 3,
        bathrooms: 2.5,
        area: 1800,
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Scenic Lakefront Cottage",
        description: "Charming lakefront cottage with private dock and stunning sunset views.",
        price: 175,
        location: "Lake Tahoe, California",
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        image_url: "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Historic Downtown Loft",
        description: "Beautifully renovated loft in a historic building with exposed brick walls.",
        price: 135,
        location: "Chicago, Illinois",
        bedrooms: 1,
        bathrooms: 1,
        area: 950,
        image_url: "https://images.unsplash.com/photo-1536437774098-cf212972bd84?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Oceanview Beach House",
        description: "Stunning beach house with wrap-around deck and direct beach access.",
        price: 395,
        location: "Malibu, California",
        bedrooms: 4,
        bathrooms: 3.5,
        area: 2600,
        image_url: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Cozy Urban Apartment",
        description: "Modern apartment in the heart of the city with access to amazing amenities.",
        price: 110,
        location: "Seattle, Washington",
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
      },
      {
        title: "Tropical Paradise Villa",
        description: "Secluded villa surrounded by lush tropical gardens with private pool.",
        price: 275,
        location: "Kauai, Hawaii",
        bedrooms: 3,
        bathrooms: 2,
        area: 1900,
        image_url: "https://images.unsplash.com/photo-1439130490301-25e322d88054?q=80&w=2070&auto=format&fit=crop"
      }
    ]

    // Insert sample properties
    const { error } = await supabaseClient
      .from('properties')
      .upsert(
        sampleProperties.map(property => ({
          ...property,
          // Generate a unique id for each property
          id: crypto.randomUUID()
        }))
      )

    if (error) {
      console.error('Error inserting sample properties:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Sample properties added successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in addSampleProperties function:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
