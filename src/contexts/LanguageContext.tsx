import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'es';
type Translations = Record<string, string>;

// Traducciones locales de respaldo
const localTranslations: Record<Language, Translations> = {
  es: {
    'auth.signIn': 'Inicio de Sesión',
    'auth.signUp': 'Registrarse',
    'auth.signOut': 'Cerrar Sesión',
    'auth.profile': 'Perfil',
    'auth.dashboard': 'Panel de Control',
    'auth.admin': 'Administrador',
    'auth.host': 'Anfitrión',
    'auth.guest': 'Huésped'
  },
  en: {
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.signOut': 'Sign Out',
    'auth.profile': 'Profile',
    'auth.dashboard': 'Dashboard',
    'auth.admin': 'Admin',
    'auth.host': 'Host',
    'auth.guest': 'Guest'
  }
};

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [translations, setTranslations] = useState<Translations>(localTranslations['es']);

  // Fetch translations from Supabase
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        console.log('Fetching translations for language:', language);
        const { data, error } = await supabase
          .from('translations')
          .select('key, value')
          .eq('language', language);

        if (error) {
          console.error('Error fetching translations:', error);
          // Usar traducciones locales como respaldo
          setTranslations(localTranslations[language]);
          return;
        }

        console.log('Fetched translations:', data);
        const translationMap: Translations = {};
        data?.forEach(item => {
          translationMap[item.key] = item.value;
        });

        // Combinar traducciones de Supabase con las locales
        setTranslations({ ...localTranslations[language], ...translationMap });
      } catch (error) {
        console.error('Failed to fetch translations:', error);
        // Usar traducciones locales como respaldo
        setTranslations(localTranslations[language]);
      }
    };

    fetchTranslations();
    
    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Check for saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    console.log('Saved language preference:', savedLanguage);
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Function to get translation for a key
  const t = (key: string): string => {
    const translation = translations[key] || localTranslations[language][key] || key;
    console.log(`Translation for ${key}:`, translation);
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
