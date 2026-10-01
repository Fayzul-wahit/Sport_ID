'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSelectionPage() {
  const t = useTranslations('languageSelect');
  const commonT = useTranslations('common');
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ta' | 'ml'>(
    (currentLocale as 'en' | 'ta' | 'ml') || 'en'
  );

  const handleContinue = () => {
    router.replace('/auth/sign-up', { locale: selectedLanguage });
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-2rem)] w-full max-w-md mx-auto px-5 py-6">
      {/* Top Header & Illustration */}
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center py-6">
          <div className="w-24 h-24 rounded-full bg-[#FE6A19]/10 flex items-center justify-center border-2 border-[#FF6B1A]/30">
            <svg
              className="w-12 h-12 text-[#FF6B1A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
        </div>

        <div className="mb-6 text-left">
          <h1 className="text-[26px] leading-[32px] font-bold text-[#141B2B] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-[16px] leading-[24px] text-[#44474D] mt-2">
            {t('subtitle')}
          </p>
        </div>

        {/* Language Selection Radio Cards */}
        <div className="flex flex-col gap-3 w-full">
          {/* English */}
          <button
            type="button"
            onClick={() => setSelectedLanguage('en')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
              selectedLanguage === 'en'
                ? 'border-[#FF6B1A] bg-white shadow-sm'
                : 'border-[#E1E8FD] bg-[#F1F3FF] hover:bg-white'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold text-[#141B2B]">
                English
              </span>
              <span className="text-[14px] text-[#44474D] mt-0.5">
                Default language • All India
              </span>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                selectedLanguage === 'en'
                  ? 'bg-[#FF6B1A] border-[#FF6B1A] text-[#0B1F3A]'
                  : 'border-[#C4C6CE]'
              }`}
            >
              {selectedLanguage === 'en' && (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </div>
          </button>

          {/* Tamil */}
          <button
            type="button"
            onClick={() => setSelectedLanguage('ta')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
              selectedLanguage === 'ta'
                ? 'border-[#FF6B1A] bg-white shadow-sm'
                : 'border-[#E1E8FD] bg-[#F1F3FF] hover:bg-white'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold text-[#141B2B]">
                தமிழ் (Tamil)
              </span>
              <span className="text-[14px] text-[#44474D] mt-0.5">
                தமிழ்நாடு & பாண்டிச்சேரி
              </span>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                selectedLanguage === 'ta'
                  ? 'bg-[#FF6B1A] border-[#FF6B1A] text-[#0B1F3A]'
                  : 'border-[#C4C6CE]'
              }`}
            >
              {selectedLanguage === 'ta' && (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </div>
          </button>

          {/* Malayalam */}
          <button
            type="button"
            onClick={() => setSelectedLanguage('ml')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
              selectedLanguage === 'ml'
                ? 'border-[#FF6B1A] bg-white shadow-sm'
                : 'border-[#E1E8FD] bg-[#F1F3FF] hover:bg-white'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold text-[#141B2B]">
                മലയാളം (Malayalam)
              </span>
              <span className="text-[14px] text-[#44474D] mt-0.5">
                കേരളം & ലക്ഷദ്വീപ്
              </span>
            </div>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                selectedLanguage === 'ml'
                  ? 'bg-[#FF6B1A] border-[#FF6B1A] text-[#0B1F3A]'
                  : 'border-[#C4C6CE]'
              }`}
            >
              {selectedLanguage === 'ml' && (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Primary Action Button (56px tall, rounded-2xl, energetic orange fill with navy text) */}
      <div className="pt-8 pb-4">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-[56px] rounded-2xl bg-[#FF6B1A] text-[#0B1F3A] font-bold text-[16px] flex items-center justify-center hover:opacity-95 transition-opacity shadow-md"
        >
          {commonT('continue')}
        </button>
      </div>
    </div>
  );
}
