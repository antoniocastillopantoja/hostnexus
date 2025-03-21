
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Call the edge function to add translations
        const { error: translationsError } = await supabase.functions.invoke('addTranslations');
        if (translationsError) {
          console.error('Error adding translations:', translationsError);
        }
        
        // Check if we already have properties
        const { data: existingProperties, error: checkError } = await supabase
          .from('properties')
          .select('id')
          .limit(1);
          
        if (checkError) {
          console.error('Error checking properties:', checkError);
        }
        
        // If no properties exist, add sample properties
        if (!existingProperties || existingProperties.length === 0) {
          const { error: propertiesError } = await supabase.functions.invoke('addSampleProperties');
          if (propertiesError) {
            console.error('Error adding sample properties:', propertiesError);
          }
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        toast({
          title: "Error",
          description: "Failed to initialize data. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    initializeData();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProperties />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
