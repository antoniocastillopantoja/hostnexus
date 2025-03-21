
import { useState } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <AnimatedLogo />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? t("auth.signIn") : t("auth.signUp")}
      </h2>

      {isLogin ? (
        <LoginForm onSwitchForm={toggleForm} />
      ) : (
        <RegisterForm onSwitchForm={toggleForm} />
      )}
    </div>
  );
};
