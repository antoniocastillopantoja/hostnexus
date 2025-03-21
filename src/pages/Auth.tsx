
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";

const Auth = () => {
  const { user, isLoading } = useAuth();

  // If user is already logged in, redirect to home page
  if (user && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <AuthCard />
    </div>
  );
};

export default Auth;
