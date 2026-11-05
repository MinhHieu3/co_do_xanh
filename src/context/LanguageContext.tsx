import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { vi } from '../locales/vi';
import { en } from '../locales/en';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const languageListeners = new Set<() => void>();

function subscribeLanguage(listener: () => void) {
  languageListeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    languageListeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function getBrowserLanguage() {
  const saved = localStorage.getItem('language');
  if (saved === 'VI' || saved === 'EN') return saved;
  if (window.location.pathname === '/index-en.html') return 'EN';
  return (navigator.language || '').toLowerCase().startsWith('vi') ? 'VI' : 'EN';
}

export const LanguageProvider = ({ children, initialLanguage }: { children: ReactNode; initialLanguage?: "VI" | "EN" }) => {
  const language = useSyncExternalStore(
    subscribeLanguage,
    getBrowserLanguage,
    () => initialLanguage ?? 'VI',
  );

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    languageListeners.forEach((listener) => listener());
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
