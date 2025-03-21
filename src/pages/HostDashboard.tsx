
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const HostDashboard = () => {
  const { user, isHost, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not a host
  useEffect(() => {
    if (!isLoading && (!user || !isHost)) {
      navigate("/");
    }
  }, [user, isHost, isLoading, navigate]);
  
  if (isLoading || !user || !isHost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto pt-28 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-2">Panel de Anfitrión</h1>
        <p className="text-gray-500 mb-8">Gestiona tus propiedades y reservas</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Propiedades</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Reservas Activas</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Ganancias</h3>
            <p className="text-3xl font-bold">$0</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold mb-6">Tus Propiedades</h2>
          
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-lg text-gray-500 mb-3">Aún no tienes propiedades</p>
            <p className="text-sm text-gray-400 mb-3">¡Comienza a listar tus propiedades para recibir huéspedes!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostDashboard;
