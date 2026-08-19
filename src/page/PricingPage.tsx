import { useLanguage } from "../context/LanguageContext";

export default function PricingPage() {
  const { t } = useLanguage();
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[50vh]">
      <h1 className="text-4xl font-bold text-center mt-10">{t('pricing.title')}</h1>
    </div>
  );
}
