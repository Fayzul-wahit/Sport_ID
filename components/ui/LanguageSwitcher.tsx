'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: 'en' | 'ta' | 'ml') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[#F1F3FF] border border-[#E1E8FD] text-sm">
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === 'en'
            ? 'bg-[#0B1F3A] text-white shadow-sm'
            : 'text-[#44474D] hover:text-[#141B2B]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('ta')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === 'ta'
            ? 'bg-[#0B1F3A] text-white shadow-sm'
            : 'text-[#44474D] hover:text-[#141B2B]'
        }`}
      >
        தமிழ்
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('ml')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
          locale === 'ml'
            ? 'bg-[#0B1F3A] text-white shadow-sm'
            : 'text-[#44474D] hover:text-[#141B2B]'
        }`}
      >
        മലയാളം
      </button>
    </div>
  );
}
