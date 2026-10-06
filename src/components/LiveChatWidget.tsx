/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Language, TranslationData } from '../translations';

interface LiveChatWidgetProps {
  lang: Language;
  t: TranslationData['chatWidget'];
}

export default function LiveChatWidget({ lang, t }: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [showTooltip, setShowTooltip] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setShowTooltip(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const openWhatsApp = (text: string) => {
    const phoneNumber = '6285715654183';
    const encoded = encodeURIComponent(text.trim());
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const messageToSend =
      inputMessage.trim() ||
      (lang === 'en'
        ? 'Hello Mitra Bersih, I would like to inquire about 24-hour service in Cikarang.'
        : 'Halo Mitra Bersih, saya ingin konsultasi layanan sedot WC Cikarang 24 jam.');

    openWhatsApp(messageToSend);
    setInputMessage('');
  };

  const handleQuickPillClick = (pillText: string) => {
    const prefix =
      lang === 'en'
        ? `Hello Mitra Bersih, I need technical assistance with: ${pillText}. Location in Cikarang.`
        : `Halo Mitra Bersih 24 Jam, saya butuh penanganan: ${pillText}. Lokasi di Cikarang.`;
    openWhatsApp(prefix);
  };

  return (
    <div className="live-chat-widget-root" aria-live="polite">
      {/* ================= CHAT POPUP WINDOW ================= */}
      {isOpen && (
        <div
          ref={chatCardRef}
          className="live-chat-card"
          role="dialog"
          aria-modal="true"
          aria-label={t.agentName}
        >
          {/* Header */}
          <div className="live-chat-header">
            <div className="flex items-center gap-3">
              <div className="live-chat-avatar-wrapper">
                <div className="live-chat-avatar">
                  <i className="fas fa-headset text-lg"></i>
                </div>
                <span className="live-chat-online-dot" title="Online Sekarang"></span>
              </div>
              <div className="live-chat-header-info">
                <h4>{t.agentName}</h4>
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t.agentStatus}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="live-chat-close-btn"
              aria-label="Tutup Obrolan"
              title="Tutup Obrolan"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Subheader / Tagline */}
          <div className="live-chat-subheader">
            <span>{t.agentRole}</span>
          </div>

          {/* Chat Body */}
          <div className="live-chat-body">
            <div className="live-chat-timestamp">
              <span>{t.timeTag}</span>
            </div>

            {/* Greeting Bubble */}
            <div className="live-chat-bubble agent-bubble">
              <p>{t.greetingText}</p>
              <span className="bubble-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Quick Action Suggestion Pills */}
            <div className="live-chat-pills-container">
              <button
                type="button"
                onClick={() => handleQuickPillClick(t.quickPill1)}
                className="live-chat-pill"
              >
                <span>🚽</span> {t.quickPill1}
              </button>
              <button
                type="button"
                onClick={() => handleQuickPillClick(t.quickPill2)}
                className="live-chat-pill"
              >
                <span>🚛</span> {t.quickPill2}
              </button>
              <button
                type="button"
                onClick={() => handleQuickPillClick(t.quickPill3)}
                className="live-chat-pill"
              >
                <span>🏭</span> {t.quickPill3}
              </button>
              <button
                type="button"
                onClick={() => handleQuickPillClick(t.quickPill4)}
                className="live-chat-pill"
              >
                <span>⚡</span> {t.quickPill4}
              </button>
            </div>
          </div>

          {/* Input & Send Form */}
          <form onSubmit={handleSend} className="live-chat-footer">
            <div className="live-chat-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.inputPlaceholder}
                className="live-chat-input"
              />
              <button
                type="submit"
                className="live-chat-send-btn"
                aria-label={t.sendBtn}
                title={t.sendBtn}
              >
                <i className="fab fa-whatsapp text-lg"></i>
              </button>
            </div>
            <p className="live-chat-footnote">
              <i className="fas fa-lock text-[10px] mr-1 opacity-70"></i>
              {t.footerNote}
            </p>
          </form>
        </div>
      )}

      {/* ================= FLOATING LAUNCHER BUTTON & TOOLTIP ================= */}
      <div className="live-chat-launcher-container">
        {!isOpen && showTooltip && (
          <div
            className="live-chat-tooltip"
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
          >
            <span className="live-chat-tooltip-text">{t.launcherTooltip}</span>
            <button
              type="button"
              className="live-chat-tooltip-close"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              aria-label="Tutup notifikasi"
            >
              &times;
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`live-chat-trigger-btn ${isOpen ? 'active' : ''}`}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup live chat WhatsApp' : 'Buka live chat WhatsApp'}
          title={isOpen ? 'Tutup Live Chat' : t.launcherTooltip}
        >
          {/* Notification Badge */}
          {!isOpen && unreadCount > 0 && (
            <span className="live-chat-badge">{unreadCount}</span>
          )}

          {/* Icon */}
          {isOpen ? (
            <i className="fas fa-times live-chat-icon-close"></i>
          ) : (
            <i className="fab fa-whatsapp live-chat-icon-wa"></i>
          )}
        </button>
      </div>
    </div>
  );
}
