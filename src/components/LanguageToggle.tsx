import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="flex items-center gap-2 p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
      onClick={toggleLanguage}
    >
      <Globe size={18} />
      <span className="text-sm font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
    </Button>
  );
}
