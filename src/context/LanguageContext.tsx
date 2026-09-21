import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { vi } from '../locales/vi';
import { en } from '../locales/en';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'VI' || saved === 'EN') return saved;
    
    // Auto-detect browser language
    const browserLang = navigator.language || (navigator as any).userLanguage || '';
    if (browserLang.toLowerCase().startsWith('vi')) {
      return 'VI';
    }
    return 'EN'; // Auto switch to English if not Vietnamese
  });

  useEffect(() => {
    // Update document title for SEO and UX based on selected language
    document.title = language === 'EN' ? 'Hue Electric Motorbike Rental | Xe Cố Đô Xanh' : 'Xe Cố Đô Xanh | Thuê Xe Máy Điện';
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = language === 'EN' ? en : vi;

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
