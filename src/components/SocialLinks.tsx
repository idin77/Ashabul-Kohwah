/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, TranslationData } from '../translations';

interface SocialLinksProps {
  lang: Language;
  t: TranslationData['socialLinks'];
}

interface SocialItem {
  id: 'facebook' | 'instagram' | 'tiktok';
  name: string;
  icon: string;
  url: string;
  colorClass: string;
  brandColor: string;
  tooltipText: string;
  ariaLabel: string;
}

export default function SocialLinks({ lang, t }: SocialLinksProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const socialItems: SocialItem[] = [
    {
      id: 'facebook',
      name: t.facebook,
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/mitrabersih24jam',
      colorClass: 'social-btn-facebook',
      brandColor: '#1877F2',
      tooltipText: t.facebookTooltip,
      ariaLabel: lang === 'en' ? 'Follow Mitra Bersih on Facebook' : 'Ikuti Mitra Bersih di Facebook',
    },
    {
      id: 'instagram',
      name: t.instagram,
      icon: 'fab fa-instagram',
      url: 'https://instagram.com/mitrabersih24jam',
      colorClass: 'social-btn-instagram',
      brandColor: '#E1306C',
      tooltipText: t.instagramTooltip,
      ariaLabel: lang === 'en' ? 'Follow Mitra Bersih on Instagram' : 'Ikuti Mitra Bersih di Instagram',
    },
    {
      id: 'tiktok',
      name: t.tiktok,
      icon: 'fab fa-tiktok',
      url: 'https://tiktok.com/@mitrabersih24jam',
      colorClass: 'social-btn-tiktok',
      brandColor: '#000000',
      tooltipText: t.tiktokTooltip,
      ariaLabel: lang === 'en' ? 'Follow Mitra Bersih on TikTok' : 'Ikuti Mitra Bersih di TikTok',
    },
  ];

  return (
    <aside
      className={`social-floating-root ${isCollapsed ? 'collapsed' : ''}`}
      aria-label={t.followUs}
    >
      <div className="social-floating-inner">
        {/* Toggle Collapse Button for mobile / clean view */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="social-toggle-btn"
          aria-label={
            isCollapsed
              ? lang === 'en'
                ? 'Expand Social Links'
                : 'Tampilkan Media Sosial'
              : lang === 'en'
                ? 'Collapse Social Links'
                : 'Sembunyikan Media Sosial'
          }
          title={
            isCollapsed
              ? lang === 'en'
                ? 'Expand Social Links'
                : 'Tampilkan Media Sosial'
              : lang === 'en'
                ? 'Minimize'
                : 'Kecilkan'
          }
        >
          <i
            className={`fas ${
              isCollapsed ? 'fa-share-nodes' : 'fa-chevron-left'
            }`}
          ></i>
        </button>

        {!isCollapsed && (
          <>
            {/* Header / Brand label badge */}
            <div className="social-header-label">
              <span className="social-label-text">{t.followUs}</span>
            </div>

            {/* Vertical list of rounded buttons */}
            <nav className="social-buttons-stack" aria-label="Social media channels">
              {socialItems.map((item) => (
                <div
                  key={item.id}
                  className="social-btn-wrapper"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-circle-btn ${item.colorClass}`}
                    aria-label={item.ariaLabel}
                  >
                    <i className={item.icon}></i>
                  </a>

                  {/* Slide-out Tooltip on Right */}
                  <div
                    className={`social-tooltip ${
                      hoveredId === item.id ? 'visible' : ''
                    }`}
                    role="tooltip"
                  >
                    <span className="social-tooltip-text">{item.tooltipText}</span>
                    <i className="fas fa-external-link-alt social-tooltip-icon"></i>
                  </div>
                </div>
              ))}
            </nav>
          </>
        )}
      </div>
    </aside>
  );
}
