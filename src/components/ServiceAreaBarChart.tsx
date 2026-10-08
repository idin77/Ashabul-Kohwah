/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { Language } from '../translations';

export interface AreaGroup {
  region: string;
  items: string[];
}

interface ServiceAreaBarChartProps {
  areaGroups: AreaGroup[];
  selectedDistrict: string | null;
  onSelectDistrict: (districtName: string | null) => void;
  theme: 'light' | 'dark';
  lang: Language;
  t: {
    chartBadge?: string;
    chartTitle?: string;
    chartSubtitle?: string;
    chartYAxisLabel?: string;
    chartBarLabel?: string;
    chartTotalBadge?: string;
    chartClickHint?: string;
    villagesLabel?: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      district: string;
      displayName: string;
      villagesCount: number;
      villages: string[];
      isSelected: boolean;
    };
  }>;
}

export default function ServiceAreaBarChart({
  areaGroups,
  selectedDistrict,
  onSelectDistrict,
  theme,
  lang,
  t,
}: ServiceAreaBarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Transform AREA_GROUPS for Recharts
  const chartData = areaGroups.map((group) => {
    const isSelected = selectedDistrict?.toLowerCase() === group.region.toLowerCase();
    const shortName = group.region.replace('Cikarang ', '');
    return {
      district: group.region,
      displayName: lang === 'en' ? `Cik. ${shortName}` : group.region,
      shortName,
      villagesCount: group.items.length,
      villages: group.items,
      isSelected,
    };
  });

  const totalVillages = areaGroups.reduce((acc, curr) => acc + curr.items.length, 0);

  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#374151' : '#E5E7EB';
  const textFill = isDark ? '#9CA3AF' : '#4B5563';

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#111111] text-white p-3.5 rounded-xl shadow-xl border border-yellow-400/30 max-w-[260px] text-xs pointer-events-none z-50">
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-gray-700">
            <span className="font-extrabold text-[#FFD60A] text-sm flex items-center gap-1.5">
              <i className="fas fa-map-marker-alt text-xs"></i>
              {data.district}
            </span>
            <span className="bg-yellow-400/20 text-[#FFD60A] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {data.villagesCount} {lang === 'en' ? 'Villages' : 'Desa'}
            </span>
          </div>

          <p className="text-gray-300 text-[11px] mb-2 leading-relaxed">
            <span className="text-gray-400 font-medium block mb-1">
              {lang === 'en' ? 'Included Sub-districts:' : 'Daftar Kelurahan/Desa:'}
            </span>
            <span className="text-gray-200">
              {data.villages.slice(0, 5).join(', ')}
              {data.villages.length > 5 && ` +${data.villages.length - 5} ${lang === 'en' ? 'more' : 'lainnya'}`}
            </span>
          </p>

          <div className="pt-1.5 border-t border-gray-800 text-[10px] text-yellow-400/90 font-medium flex items-center gap-1">
            <i className="fas fa-mouse-pointer text-[9px]"></i>
            <span>
              {data.isSelected
                ? lang === 'en'
                  ? 'Active filter (click to reset)'
                  : 'Filter aktif (klik untuk reset)'
                : lang === 'en'
                  ? 'Click to filter village list below'
                  : 'Klik untuk memfilter daftar desa di bawah'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data: { district: string }) => {
    if (selectedDistrict?.toLowerCase() === data.district.toLowerCase()) {
      onSelectDistrict(null);
    } else {
      onSelectDistrict(data.district);
    }
  };

  return (
    <div className="service-area-chart-card mb-8 bg-white dark:bg-[#1A1F26] rounded-2xl p-5 md:p-6 border border-gray-200 dark:border-gray-700/80 shadow-xs transition-colors">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-[#FFD60A]">
              <i className="fas fa-chart-column text-[9px]"></i>
              {t.chartBadge || (lang === 'en' ? 'DISTRICT COVERAGE METRICS' : 'DATA CAKUPAN WILAYAH')}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
              · 5 {lang === 'en' ? 'Districts' : 'Kecamatan'}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-extrabold text-[#111111] dark:text-white">
            {t.chartTitle ||
              (lang === 'en'
                ? 'Number of Villages Serviced per District in Cikarang'
                : 'Distribusi Jumlah Desa & Kelurahan per Kecamatan Cikarang')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t.chartSubtitle ||
              (lang === 'en'
                ? 'Interactive visual representation of 43 serviced villages based on fleet coverage data'
                : 'Visualisasi grafik interaktif cakupan 43 desa berdasarkan sebaran armada tangki')}
          </p>
        </div>

        {/* Right side stats badge & quick reset */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/80 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
            <i className="fas fa-city text-[#FFD60A] text-xs"></i>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
              {totalVillages} {t.villagesLabel || (lang === 'en' ? 'Villages' : 'Desa')}
            </span>
          </div>

          {selectedDistrict && (
            <button
              type="button"
              onClick={() => onSelectDistrict(null)}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 border border-red-200 dark:border-red-800/60"
              title={lang === 'en' ? 'Reset chart filter' : 'Reset filter grafik'}
            >
              <i className="fas fa-times-circle"></i>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="w-full h-[240px] md:h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 24, right: 16, left: -16, bottom: 8 }}
            onClick={(state: any) => {
              if (state && state.activePayload && state.activePayload[0]) {
                handleBarClick(state.activePayload[0].payload);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
            <XAxis
              dataKey="displayName"
              tickLine={false}
              axisLine={{ stroke: gridStroke }}
              tick={{ fill: textFill, fontSize: 11, fontWeight: 600 }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: gridStroke }}
              tick={{ fill: textFill, fontSize: 11, fontWeight: 500 }}
              domain={[0, 14]}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }} />
            <Bar
              dataKey="villagesCount"
              radius={[8, 8, 0, 0]}
              maxBarSize={56}
              cursor="pointer"
            >
              <LabelList
                dataKey="villagesCount"
                position="top"
                offset={6}
                formatter={(val: unknown) => (val !== undefined && val !== null ? String(val) : '')}
                style={{
                  fill: isDark ? '#FFFFFF' : '#111111',
                  fontSize: 12,
                  fontWeight: 800,
                }}
              />
              {chartData.map((entry) => {
                const isSelected = selectedDistrict?.toLowerCase() === entry.district.toLowerCase();
                const isHovered = hoveredBar === entry.district;

                // Color logic
                let barColor = '#FFD60A'; // Mitra Bersih Brand Yellow
                if (selectedDistrict) {
                  if (isSelected) {
                    barColor = '#FFD60A';
                  } else {
                    barColor = isDark ? '#374151' : '#D1D5DB';
                  }
                } else if (isHovered) {
                  barColor = '#FACC15';
                }

                return (
                  <Cell
                    key={`cell-${entry.district}`}
                    fill={barColor}
                    stroke={isSelected ? '#111111' : 'none'}
                    strokeWidth={isSelected ? 2 : 0}
                    onClick={() => handleBarClick(entry)}
                    onMouseEnter={() => setHoveredBar(entry.district)}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{
                      transition: 'all 0.3s ease',
                      filter: isSelected ? 'drop-shadow(0 4px 8px rgba(255, 214, 10, 0.45))' : 'none',
                    }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Interactive District Pills & Guide */}
      <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
          <span className="text-gray-500 dark:text-gray-400 font-medium mr-1 text-[11px]">
            {lang === 'en' ? 'Select district:' : 'Pilih kecamatan:'}
          </span>
          {chartData.map((d) => {
            const isSelected = selectedDistrict?.toLowerCase() === d.district.toLowerCase();
            return (
              <button
                key={d.district}
                type="button"
                onClick={() => handleBarClick(d)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#FFD60A] text-[#111111] shadow-xs ring-1 ring-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{d.shortName}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-black text-[#FFD60A]' : 'bg-white/80 dark:bg-gray-900 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {d.villagesCount}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center md:text-right">
          <i className="fas fa-info-circle text-[#FFD60A] mr-1"></i>
          {t.chartClickHint ||
            (lang === 'en'
              ? 'Click bar or button above to synchronize district filter with map & search'
              : 'Klik batang grafik untuk mensinkronkan filter kecamatan dengan peta')}
        </p>
      </div>
    </div>
  );
}
