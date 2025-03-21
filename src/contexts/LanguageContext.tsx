
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'es';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});

  // Fetch translations from Supabase
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const { data, error } = await supabase
          .from('translations')
          .select('key, value')
          .eq('language', language);

        if (error) {
          console.error('Error fetching translations:', error);
          return;
        }

        const translationMap: Translations = {};
        data?.forEach(item => {
          translationMap[item.key] = item.value;
        });

        setTranslations(translationMap);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
      }
    };

    fetchTranslations();
    
    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Check for saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Function to get translation for a key
  const t = (key: string): string => {
    return translations[key] || key;
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
