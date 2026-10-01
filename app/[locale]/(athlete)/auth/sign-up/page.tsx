'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { createClient } from '@/lib/supabase/client';

export default function SignUpOtpPage() {
  const t = useTranslations('auth');
  const commonT = useTranslations('common');
  const locale = useLocale() as 'en' | 'ta' | 'ml';
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<'contact' | 'otp'>('contact');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState<'athlete' | 'org_rep'>('athlete');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError(t('invalidContact'));
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // In local dev mock mode, skip external provider call and move directly to OTP step
      if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true') {
        setStep('otp');
        setLoading(false);
        return;
      }

      const isEmail = contact.includes('@');
      if (isEmail) {
        const { error: err } = await supabase.auth.signInWithOtp({ email: contact });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signInWithOtp({ phone: contact });
        if (err) throw err;
      }
      setStep('otp');
    } catch (err: any) {
      setError(err.message || t('invalidContact'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError(t('invalidOtp'));
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // Check for test mock OTP '123456'
      if (process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true' && otp === '123456') {
        // Create or update demo session in localStorage for local testing
        const mockUser = {
          id: '00000000-0000-0000-0000-000000000100',
          contact,
          role,
          language: locale,
        };
        localStorage.setItem('sports_id_mock_user', JSON.stringify(mockUser));

        if (role === 'athlete') {
          router.push('/onboarding/sport');
        } else {
          router.push('/requests');
        }
        return;
      }

      const isEmail = contact.includes('@');
      const { data, error: err } = isEmail
        ? await supabase.auth.verifyOtp({ email: contact, token: otp, type: 'email' })
        : await supabase.auth.verifyOtp({ phone: contact, token: otp, type: 'sms' });

      if (err) throw err;

      if (data.user) {
        // Persist profile role and language preference to Supabase profiles table
        await supabase.from('profiles').upsert({
          id: data.user.id,
          role,
          language: locale,
          full_name: contact.split('@')[0],
        });
      }

      if (role === 'athlete') {
        router.push('/onboarding/sport');
      } else {
        router.push('/requests');
      }
    } catch (err: any) {
      setError(err.message || t('invalidOtp'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9FF] text-[#141B2B]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#E1E8FD] px-5 h-16 flex items-center justify-between">
        <span className="text-[20px] font-bold text-[#0B1F3A] tracking-tight">
          {commonT('appName')}
        </span>
        <LanguageSwitcher />
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-md mx-auto pt-24 pb-12 px-5 flex flex-col justify-between">
        {step === 'contact' ? (
          <form onSubmit={handleSendOtp} className="flex flex-col justify-between flex-1">
            <div className="flex flex-col">
              <div className="mb-6 text-left">
                <h1 className="text-[26px] leading-[32px] font-bold text-[#141B2B] tracking-tight">
                  {t('title')}
                </h1>
                <p className="text-[16px] leading-[24px] text-[#44474D] mt-2">
                  {t('subtitle')}
                </p>
              </div>

              {error && (
                <div className="p-3 mb-4 rounded-xl bg-[#FFDAD6] border border-[#BA1A1A] text-[#93000A] text-[14px]">
                  {error}
                </div>
              )}

              {/* Account Type Role Selection */}
              <div className="mb-6">
                <label className="block text-[14px] font-semibold text-[#141B2B] mb-2">
                  {t('roleTitle')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('athlete')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      role === 'athlete'
                        ? 'border-[#0B1F3A] bg-white shadow-sm'
                        : 'border-[#E1E8FD] bg-[#F1F3FF]'
                    }`}
                  >
                    <span className="text-[16px] font-bold block text-[#0B1F3A]">
                      {t('roleAthlete')}
                    </span>
                    <span className="text-[14px] text-[#44474D] mt-1 block">
                      {t('roleAthleteDesc')}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('org_rep')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      role === 'org_rep'
                        ? 'border-[#0B1F3A] bg-white shadow-sm'
                        : 'border-[#E1E8FD] bg-[#F1F3FF]'
                    }`}
                  >
                    <span className="text-[16px] font-bold block text-[#0B1F3A]">
                      {t('roleOrgRep')}
                    </span>
                    <span className="text-[14px] text-[#44474D] mt-1 block">
                      {t('roleOrgRepDesc')}
                    </span>
                  </button>
                </div>
              </div>

              {/* Contact Input Field (52px height) */}
              <div className="mb-6">
                <label className="block text-[14px] font-semibold text-[#141B2B] mb-2">
                  {t('emailOrPhoneLabel')}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t('emailOrPhonePlaceholder')}
                  className="w-full h-[52px] px-4 rounded-xl border border-[#C4C6CE] bg-white text-[#141B2B] text-[16px] focus:outline-none focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/20"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[56px] rounded-2xl bg-[#FF6B1A] text-[#0B1F3A] font-bold text-[16px] flex items-center justify-center hover:opacity-95 transition-opacity shadow-md disabled:opacity-50"
              >
                {loading ? commonT('loading') : t('sendOtp')}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col justify-between flex-1">
            <div className="flex flex-col">
              <div className="mb-6 text-left">
                <h1 className="text-[26px] leading-[32px] font-bold text-[#141B2B] tracking-tight">
                  {t('enterOtpTitle')}
                </h1>
                <p className="text-[16px] leading-[24px] text-[#44474D] mt-2">
                  {t('enterOtpSubtitle', { destination: contact })}
                </p>
                {process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true' && (
                  <div className="mt-2 p-3 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-[14px]">
                    Local Dev Mode: Use test OTP code <strong>123456</strong>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 mb-4 rounded-xl bg-[#FFDAD6] border border-[#BA1A1A] text-[#93000A] text-[14px]">
                  {error}
                </div>
              )}

              {/* OTP Input Field */}
              <div className="mb-6">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={t('otpPlaceholder')}
                  className="w-full h-[56px] px-4 rounded-xl border-2 border-[#0B1F3A] bg-white text-[#141B2B] text-center text-[24px] font-bold tracking-[0.5em] focus:outline-none"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-8 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[56px] rounded-2xl bg-[#FF6B1A] text-[#0B1F3A] font-bold text-[16px] flex items-center justify-center hover:opacity-95 transition-opacity shadow-md disabled:opacity-50"
              >
                {loading ? commonT('loading') : t('verifyOtp')}
              </button>

              <button
                type="button"
                onClick={() => setStep('contact')}
                className="w-full py-3 text-[#0B1F3A] text-[14px] font-semibold text-center hover:underline"
              >
                {commonT('back')}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
