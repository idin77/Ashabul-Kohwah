/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, TranslationData } from '../translations';

interface NewsletterSubscriptionProps {
  lang: Language;
  t: TranslationData['newsletter'];
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'already' | 'error';

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  lang,
  t,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const validateEmail = (val: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !validateEmail(trimmed)) {
      setStatus('error');
      setFeedbackMessage(t.invalidEmailMessage);
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmed,
          lang,
          source: 'blog_footer_newsletter',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        if (data.alreadySubscribed) {
          setStatus('already');
          setFeedbackMessage(
            data.message || t.alreadySubscribedMessage
          );
        } else {
          setStatus('success');
          setFeedbackMessage(
            data.message || t.successMessage
          );
        }
      } else {
        setStatus('error');
        setFeedbackMessage(
          data?.message || t.errorMessage
        );
      }
    } catch (err) {
      console.error('Newsletter subscription network error:', err);
      setStatus('error');
      setFeedbackMessage(t.errorMessage);
    }
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setFeedbackMessage('');
  };

  return (
    <div className="newsletter-card-wrapper mt-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0a0a0a] text-white p-7 sm:p-10 md:p-12 border border-[#FFD60A]/25 shadow-2xl shadow-black/40">
        {/* Subtle decorative glow circles */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-[#FFD60A]/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD60A]/15 border border-[#FFD60A]/30 text-[#FFD60A] text-xs font-bold tracking-wider uppercase mb-4">
            <i className="fas fa-newspaper"></i>
            <span>{t.badge}</span>
          </div>

          {/* Heading & Subtitle */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            {t.subtitle}
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] flex items-center justify-center shrink-0">
                <i className="fas fa-shield-alt text-sm"></i>
              </div>
              <span className="text-xs text-gray-200 font-medium leading-snug">
                {t.benefit1}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] flex items-center justify-center shrink-0">
                <i className="fas fa-wrench text-sm"></i>
              </div>
              <span className="text-xs text-gray-200 font-medium leading-snug">
                {t.benefit2}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] flex items-center justify-center shrink-0">
                <i className="fas fa-lock text-sm"></i>
              </div>
              <span className="text-xs text-gray-200 font-medium leading-snug">
                {t.benefit3}
              </span>
            </div>
          </div>

          {/* Success or Already Subscribed States */}
          {status === 'success' && (
            <div className="bg-emerald-950/70 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 animate-fadeIn text-center">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl border border-emerald-500/30">
                <i className="fas fa-check"></i>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {t.successTitle}
              </h4>
              <p className="text-sm text-emerald-200 mb-6 max-w-lg mx-auto">
                {feedbackMessage || t.successMessage}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition shadow-md cursor-pointer"
              >
                <i className="fas fa-plus-circle"></i>
                <span>{t.subscribeAnotherBtn}</span>
              </button>
            </div>
          )}

          {status === 'already' && (
            <div className="bg-amber-950/70 border border-[#FFD60A]/50 rounded-2xl p-6 sm:p-8 animate-fadeIn text-center">
              <div className="w-14 h-14 bg-[#FFD60A]/20 text-[#FFD60A] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl border border-[#FFD60A]/40">
                <i className="fas fa-info-circle"></i>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {lang === 'en' ? 'Already Registered' : 'Email Sudah Terdaftar'}
              </h4>
              <p className="text-sm text-amber-200 mb-6 max-w-lg mx-auto">
                {feedbackMessage || t.alreadySubscribedMessage}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD60A] hover:bg-yellow-400 text-[#111111] font-bold text-xs tracking-wide transition shadow-md cursor-pointer"
              >
                <i className="fas fa-redo"></i>
                <span>{t.subscribeAnotherBtn}</span>
              </button>
            </div>
          )}

          {/* Form when idle, loading, or error */}
          {status !== 'success' && status !== 'already' && (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') {
                        setStatus('idle');
                        setFeedbackMessage('');
                      }
                    }}
                    placeholder={t.emailPlaceholder}
                    disabled={status === 'loading'}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 focus:border-[#FFD60A] focus:bg-white/15 text-white placeholder:text-gray-400 rounded-xl text-sm outline-none transition disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 bg-[#FFD60A] hover:bg-yellow-400 active:scale-[0.98] text-[#111111] font-extrabold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 disabled:opacity-60 cursor-pointer shrink-0"
                >
                  {status === 'loading' ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>{t.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      <span>{t.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Alert Box */}
              {status === 'error' && (
                <div className="mt-3 p-3 bg-red-950/80 border border-red-500/60 rounded-xl flex items-center gap-2.5 text-xs text-red-200 text-left animate-fadeIn">
                  <i className="fas fa-exclamation-triangle text-red-400 text-sm shrink-0"></i>
                  <span className="flex-1">{feedbackMessage || t.errorMessage}</span>
                </div>
              )}

              {/* Privacy Assurance Note */}
              <p className="mt-4 text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <i className="fas fa-user-shield text-[#FFD60A]/80"></i>
                <span>{t.privacyNote}</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
