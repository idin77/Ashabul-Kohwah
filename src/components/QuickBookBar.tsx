/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language, TranslationData } from '../translations';

interface QuickBookBarProps {
  lang: Language;
  t: TranslationData['quickBookBar'];
}

export default function QuickBookBar({ lang, t }: QuickBookBarProps) {
  const phoneRaw = '+6285715654183';
  const phoneFormatted = t.phoneNumberDisplay || '+62 857-1565-4183';

  const waEmergencyText = encodeURIComponent(
    lang === 'en'
      ? 'EMERGENCY: Hello Mitra Bersih, I need immediate emergency septic tank / plumbing service in Cikarang.'
      : 'DARURAT: Halo Mitra Bersih, saya butuh bantuan darurat sedot WC / saluran mampet di Cikarang sekarang.'
  );

  return (
    <div
      className="quick-book-bar-root"
      role="region"
      aria-label="Quick Booking Emergency Bar"
    >
      <div className="quick-book-bar-content">
        {/* Left: Phone Info & Emergency Status */}
        <div className="quick-book-info">
          <div className="quick-book-status">
            <span className="quick-book-pulse"></span>
            <span className="quick-book-badge-text">{t.statusBadge}</span>
            <span className="quick-book-eta">· {t.etaNotice}</span>
          </div>
          <a
            href={`tel:${phoneRaw}`}
            className="quick-book-phone"
            aria-label={`Call ${phoneFormatted}`}
          >
            <i className="fas fa-phone-volume phone-icon"></i>
            <span>{phoneFormatted}</span>
          </a>
        </div>

        {/* Right: Action Buttons */}
        <div className="quick-book-actions">
          {/* Quick WhatsApp button */}
          <a
            href={`https://wa.me/6285715654183?text=${waEmergencyText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-book-btn-wa"
            aria-label={t.waBtn}
            title={t.waBtn}
          >
            <i className="fab fa-whatsapp"></i>
          </a>

          {/* Primary 'Call Now' button */}
          <a
            href={`tel:${phoneRaw}`}
            className="quick-book-btn-call"
            aria-label={t.callNowBtn}
          >
            <i className="fas fa-phone-alt"></i>
            <span>{t.callNowBtn}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
