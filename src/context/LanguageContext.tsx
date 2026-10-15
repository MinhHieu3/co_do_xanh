import { createContext, useContext, useState, type ReactNode } from 'react';
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
    if (window.location.pathname === '/index-en.html') return 'EN';
    const saved = localStorage.getItem('language');
    if (saved === 'VI' || saved === 'EN') return saved;

    // Auto-detect browser language
    const browserLang = navigator.language || (navigator as any).userLanguage || '';
    if (browserLang.toLowerCase().startsWith('vi')) {
      return 'VI';
    }
    return 'EN'; // Auto switch to English if not Vietnamese
  });

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

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
