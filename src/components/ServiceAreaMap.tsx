/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, TranslationData } from '../translations';

export interface DistrictInfo {
  id: string;
  nameId: string;
  nameEn: string;
  villageCount: number;
  landmarks: string[];
  pinCoords: { x: number; y: number };
  textCoords: { x: number; y: number };
  path: string;
}

const DISTRICTS_DATA: DistrictInfo[] = [
  {
    id: 'utara',
    nameId: 'Cikarang Utara',
    nameEn: 'Cikarang North',
    villageCount: 11,
    landmarks: ['Stasiun Cikarang', 'Jababeka 1-3', 'Sentra Grosir Cikarang (SGC)', 'Karangasih', 'Pasirgombong'],
    pinCoords: { x: 310, y: 130 },
    textCoords: { x: 305, y: 110 },
    path: 'M 215 50 L 380 40 L 410 160 L 325 205 L 210 180 Z',
  },
  {
    id: 'barat',
    nameId: 'Cikarang Barat',
    nameEn: 'Cikarang West',
    villageCount: 11,
    landmarks: ['Kawasan Industri MM2100', 'Gandasari', 'Danau Indah', 'Telaga Asih', 'Akses Tol Cibitung'],
    pinCoords: { x: 125, y: 200 },
    textCoords: { x: 125, y: 245 },
    path: 'M 50 110 L 210 115 L 205 240 L 130 315 L 45 260 Z',
  },
  {
    id: 'selatan',
    nameId: 'Cikarang Selatan',
    nameEn: 'Cikarang South',
    villageCount: 7,
    landmarks: ['Lippo Cikarang', 'EJIP Industrial Park', 'Hyundai Int. Park', 'Mall Lippo', 'Sukaresmi'],
    pinCoords: { x: 235, y: 320 },
    textCoords: { x: 235, y: 360 },
    path: 'M 210 240 L 325 210 L 335 410 L 165 425 L 130 315 Z',
  },
  {
    id: 'pusat',
    nameId: 'Cikarang Pusat',
    nameEn: 'Cikarang Central',
    villageCount: 6,
    landmarks: ['Kota Deltamas', 'Kawasan Industri GIIC', 'Kompleks Pemkab Bekasi', 'Sukamahi', 'Jayamukti'],
    pinCoords: { x: 395, y: 300 },
    textCoords: { x: 400, y: 345 },
    path: 'M 330 208 L 460 195 L 475 400 L 340 410 Z',
  },
  {
    id: 'timur',
    nameId: 'Cikarang Timur',
    nameEn: 'Cikarang East',
    villageCount: 8,
    landmarks: ['Stadion Wibawa Mukti', 'Jababeka 6-7', 'Sertajaya', 'Lemahabang', 'Perbatasan Karawang'],
    pinCoords: { x: 510, y: 185 },
    textCoords: { x: 505, y: 145 },
    path: 'M 385 45 L 610 65 L 600 270 L 465 245 L 415 160 Z',
  },
];

interface ServiceAreaMapProps {
  lang: Language;
  t: TranslationData['serviceMap'];
  selectedDistrict: string | null;
  onSelectDistrict: (districtName: string | null) => void;
}

export default function ServiceAreaMap({
  lang,
  t,
  selectedDistrict,
  onSelectDistrict,
}: ServiceAreaMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const activeDistrictInfo =
    DISTRICTS_DATA.find((d) => d.nameId === selectedDistrict) ||
    DISTRICTS_DATA.find((d) => d.id === hoveredDistrict) ||
    null;

  const handleDistrictClick = (nameId: string) => {
    if (selectedDistrict === nameId) {
      onSelectDistrict(null);
    } else {
      onSelectDistrict(nameId);
    }
  };

  const handlePathKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    nameId: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDistrictClick(nameId);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % DISTRICTS_DATA.length;
      const nextDistrict = DISTRICTS_DATA[nextIndex];
      const nextEl = document.getElementById(`district-path-${nextDistrict.id}`);
      nextEl?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex =
        (index - 1 + DISTRICTS_DATA.length) % DISTRICTS_DATA.length;
      const prevDistrict = DISTRICTS_DATA[prevIndex];
      const prevEl = document.getElementById(`district-path-${prevDistrict.id}`);
      prevEl?.focus();
    }
  };

  return (
    <div className="service-area-map-component">
      {/* Header Info */}
      <div className="service-map-header">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FFD60A]">
            {t.dispatchBadge}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
          {t.mapTitle}
        </h3>
        <p className="text-xs md:text-sm text-gray-300 mb-4 max-w-xl">
          {t.mapSubtitle}
        </p>

        {/* District Quick Filter Tabs */}
        <div className="service-map-tabs" role="toolbar" aria-label="District selection filters">
          <button
            type="button"
            onClick={() => onSelectDistrict(null)}
            className={`service-map-tab-btn ${selectedDistrict === null ? 'active' : ''}`}
            aria-pressed={selectedDistrict === null}
          >
            <i className="fas fa-layer-group text-xs"></i>
            {t.allDistricts}
          </button>
          {DISTRICTS_DATA.map((district) => {
            const isSelected = selectedDistrict === district.nameId;
            return (
              <button
                key={district.id}
                type="button"
                onClick={() => handleDistrictClick(district.nameId)}
                onMouseEnter={() => setHoveredDistrict(district.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className={`service-map-tab-btn ${isSelected ? 'active' : ''}`}
                aria-pressed={isSelected}
              >
                <span className="tab-indicator-dot"></span>
                {lang === 'en' ? district.nameEn : district.nameId}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Layout: Interactive SVG Map + Active Details Card */}
      <div className="service-map-grid">
        {/* SVG Interactive Canvas */}
        <div className="service-map-canvas-container">
          <svg
            viewBox="0 0 660 460"
            className="service-map-svg"
            role="region"
            aria-label={
              lang === 'en'
                ? 'Interactive Map of Cikarang Service Area - Use Tab and Arrow keys to explore and press Enter or Space to select'
                : 'Peta Interaktif Wilayah Layanan Cikarang - Gunakan tombol Tab dan Panah untuk bernavigasi serta tekan Enter atau Spasi untuk memilih'
            }
          >
            <defs>
              {/* Radial Glow Gradient */}
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD60A" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FFD60A" stopOpacity="0" />
              </radialGradient>

              {/* District Active Pattern */}
              <pattern
                id="activeGrid"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.2" fill="#FFD60A" opacity="0.3" />
              </pattern>
            </defs>

            {/* Background Map Frame */}
            <rect width="660" height="460" rx="16" fill="#14171D" />

            {/* Ambient Background Grid Lines */}
            <g opacity="0.12" stroke="#FFD60A" strokeWidth="0.8">
              <line x1="0" y1="115" x2="660" y2="115" strokeDasharray="3,3" />
              <line x1="0" y1="230" x2="660" y2="230" strokeDasharray="3,3" />
              <line x1="0" y1="345" x2="660" y2="345" strokeDasharray="3,3" />
              <line x1="165" y1="0" x2="165" y2="460" strokeDasharray="3,3" />
              <line x1="330" y1="0" x2="330" y2="460" strokeDasharray="3,3" />
              <line x1="495" y1="0" x2="495" y2="460" strokeDasharray="3,3" />
            </g>

            {/* Adjacent Boundary Indicators */}
            <g fill="#6B7280" fontSize="10" fontWeight="600" opacity="0.7">
              <text x="20" y="80">← Cibitung / Tambun</text>
              <text x="540" y="40">Karawang →</text>
              <text x="260" y="24">↑ Sukatani / Babelan</text>
              <text x="230" y="445">↓ Cibarusah / Jonggol</text>
            </g>

            {/* Main Highway: Tol Jakarta - Cikampek */}
            <g>
              <path
                d="M 20 220 Q 200 235 340 215 T 640 190"
                fill="none"
                stroke="#374151"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 20 220 Q 200 235 340 215 T 640 190"
                fill="none"
                stroke="#FFD60A"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />
              <text
                x="60"
                y="208"
                fill="#FFD60A"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.5"
              >
                Tol Jakarta - Cikampek
              </text>
            </g>

            {/* Secondary Arterial: Jl. Raya Cikarang - Cibarusah */}
            <g>
              <path
                d="M 310 130 Q 280 230 250 340 T 230 435"
                fill="none"
                stroke="#4B5563"
                strokeWidth="3.5"
                strokeDasharray="4,4"
                opacity="0.8"
              />
            </g>

            {/* Sub-District Interactive Polygons */}
            {DISTRICTS_DATA.map((district, index) => {
              const isSelected = selectedDistrict === district.nameId;
              const isHovered = hoveredDistrict === district.id;
              const isActive = isSelected || isHovered;
              const districtName = lang === 'en' ? district.nameEn : district.nameId;

              const ariaLabel =
                lang === 'en'
                  ? isSelected
                    ? `${districtName} district selected (${district.villageCount} villages covered). Press Enter or Space to unselect.`
                    : `Select ${districtName} district (${district.villageCount} villages covered, 25-30 min arrival). Press Enter or Space to filter.`
                  : isSelected
                    ? `Kecamatan ${districtName} terpilih (${district.villageCount} desa terlayani). Tekan Enter atau Spasi untuk membatalkan pilihan.`
                    : `Pilih kecamatan ${districtName} (${district.villageCount} desa terlayani, estimasi tiba 25-30 menit). Tekan Enter atau Spasi untuk memfilter.`;

              return (
                <g
                  key={district.id}
                  className={`district-polygon-group cursor-pointer ${isActive ? 'active' : ''}`}
                  onClick={() => handleDistrictClick(district.nameId)}
                  onMouseEnter={() => setHoveredDistrict(district.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  {/* Interactive Vector Path with ARIA & Full Keyboard Navigation */}
                  <path
                    d={district.path}
                    id={`district-path-${district.id}`}
                    tabIndex={0}
                    role="button"
                    aria-label={ariaLabel}
                    aria-pressed={isSelected}
                    className={`district-path ${isActive ? 'active' : ''}`}
                    fill={isActive ? 'rgba(255, 214, 10, 0.22)' : 'rgba(255, 255, 255, 0.05)'}
                    stroke={isActive ? '#FFD60A' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth={isActive ? '3' : '1.5'}
                    strokeLinejoin="round"
                    onKeyDown={(e) => handlePathKeyDown(e, index, district.nameId)}
                    onFocus={() => setHoveredDistrict(district.id)}
                    onBlur={() => setHoveredDistrict(null)}
                  />

                  {/* District Text Label */}
                  <g
                    transform={`translate(${district.textCoords.x}, ${district.textCoords.y})`}
                    className="pointer-events-none text-center"
                  >
                    <rect
                      x="-60"
                      y="-14"
                      width="120"
                      height="24"
                      rx="6"
                      fill={isActive ? '#FFD60A' : 'rgba(17, 17, 17, 0.8)'}
                      opacity={isActive ? 1 : 0.85}
                    />
                    <text
                      x="0"
                      y="2"
                      textAnchor="middle"
                      fill={isActive ? '#111111' : '#FFFFFF'}
                      fontSize="11"
                      fontWeight="800"
                    >
                      {lang === 'en' ? district.nameEn : district.nameId}
                    </text>
                    <text
                      x="0"
                      y="18"
                      textAnchor="middle"
                      fill={isActive ? '#FFD60A' : '#9CA3AF'}
                      fontSize="9"
                      fontWeight="600"
                    >
                      {district.villageCount} {lang === 'en' ? 'Villages' : 'Desa'}
                    </text>
                  </g>

                  {/* Pulsing Tanker Fleet Hub Pin */}
                  <g
                    transform={`translate(${district.pinCoords.x}, ${district.pinCoords.y})`}
                    className="pointer-events-none"
                  >
                    {/* Radar Pulse */}
                    <circle
                      cx="0"
                      cy="0"
                      r="16"
                      fill="#FFD60A"
                      opacity={isActive ? 0.4 : 0.2}
                      className="animate-ping"
                    />
                    {/* Center Pin Marker */}
                    <circle cx="0" cy="0" r="10" fill="#FFD60A" stroke="#111111" strokeWidth="2" />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#111111"
                      fontSize="9"
                      fontWeight="900"
                    >
                      🚛
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          <p className="service-map-canvas-hint">
            <i className="fas fa-info-circle mr-1 text-[#FFD60A]"></i>
            {t.clickToFilterHint}
          </p>
        </div>

        {/* Selected / Hovered District Details Card */}
        <div className="service-map-details-card">
          {activeDistrictInfo ? (
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#FFD60A]/20 text-[#FFD60A] text-xs font-bold px-3 py-1 rounded-full">
                    <i className="fas fa-map-pin text-[10px]"></i>
                    {lang === 'en' ? activeDistrictInfo.nameEn : activeDistrictInfo.nameId}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {t.etaLabel}
                  </span>
                </div>

                <h4 className="text-xl font-black text-white mb-1">
                  {lang === 'en' ? activeDistrictInfo.nameEn : activeDistrictInfo.nameId}
                </h4>
                <p className="text-xs text-gray-300 mb-3">
                  <strong className="text-white font-bold">{activeDistrictInfo.villageCount}</strong>{' '}
                  {t.villagesCoveredLabel}
                </p>

                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-400 block mb-1.5">
                    {t.landmarksLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDistrictInfo.landmarks.map((landmark, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/10"
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                    lang === 'en'
                      ? `Hello Mitra Bersih, I need emergency vacuum truck dispatch to ${activeDistrictInfo.nameEn}, Cikarang.`
                      : `Halo Mitra Bersih 24 Jam, saya butuh layanan sedot WC ke ${activeDistrictInfo.nameId}, Cikarang.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FFD60A] text-[#111111] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition text-xs shadow-md"
                >
                  <i className="fab fa-whatsapp text-sm"></i>
                  {t.orderTankerBtn} {lang === 'en' ? activeDistrictInfo.nameEn : activeDistrictInfo.nameId}
                </a>

                {selectedDistrict && (
                  <button
                    type="button"
                    onClick={() => onSelectDistrict(null)}
                    className="w-full mt-2 text-center text-xs text-gray-400 hover:text-white transition py-1"
                  >
                    {t.allDistricts} ({lang === 'en' ? 'Reset Filter' : 'Tampilkan Semua'})
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full py-8 text-gray-400">
              <i className="fas fa-map-marked-alt text-4xl text-[#FFD60A] mb-3 opacity-80"></i>
              <h5 className="font-bold text-white text-sm mb-1">{t.allDistricts}</h5>
              <p className="text-xs text-gray-400 max-w-xs mb-4">
                {lang === 'en'
                  ? 'All 5 Cikarang sub-districts and industrial estates are fully covered by our 24/7 vacuum fleet.'
                  : 'Seluruh 5 kecamatan dan kawasan industri di Cikarang terlayani penuh oleh armada tangki 24 jam kami.'}
              </p>
              <div className="text-[11px] bg-white/5 border border-white/10 rounded-lg p-2.5 text-gray-300 w-full text-left space-y-1">
                <div>✓ 43 Kelurahan & Desa Terjangkau</div>
                <div>✓ Selang Vakum Panjang hingga 50+ Meter</div>
                <div>✓ Bebas Bau & Bergaransi Tuntas</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
