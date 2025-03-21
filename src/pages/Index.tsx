
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Footer } from "@/components/Footer";

const Index = () => {
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
