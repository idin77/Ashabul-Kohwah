/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { translations, Language } from './translations';
import LiveChatWidget from './components/LiveChatWidget';
import ServiceAreaMap, { DISTRICTS_DATA } from './components/ServiceAreaMap';
import SocialLinks from './components/SocialLinks';
import QuickBookBar from './components/QuickBookBar';
import NewsletterSubscription from './components/NewsletterSubscription';

interface AreaGroup {
  region: string;
  items: string[];
}

const AREA_GROUPS: AreaGroup[] = [
  {
    region: 'Cikarang Pusat',
    items: ['Cicau', 'Sukamahi', 'Pasirranji', 'Hegarmukti', 'Jayamukti', 'Pasirtanjung'],
  },
  {
    region: 'Cikarang Selatan',
    items: ['Cibatu', 'Sukasejati', 'Ciantra', 'Sukadami', 'Sukaresmi', 'Serang', 'Pasirsari'],
  },
  {
    region: 'Cikarang Timur',
    items: ['Tanjungbaru', 'Cipayung', 'Hegarmanah', 'Jatireja', 'Jatibaru', 'Labansari', 'Sertajaya', 'Karangsari'],
  },
  {
    region: 'Cikarang Utara',
    items: [
      'Cikarangkota',
      'Karangbaru',
      'Karangasih',
      'Waluya',
      'Karangraharja',
      'Pasirgombong',
      'Simpangan',
      'Tanjungsari',
      'Harjamekar',
      'Mekarmukti',
      'Wangunharja',
    ],
  },
  {
    region: 'Cikarang Barat',
    items: [
      'Telaga Mumi',
      'Mekarwangi',
      'Jatiwangi',
      'Danauindah',
      'Gandamekar',
      'Gandasari',
      'Sukadanau',
      'Telaga Asih',
      'Kalijaya',
      'Telajung',
      'Cikedokan',
    ],
  },
];

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mb_lang');
      if (saved === 'en' || saved === 'id') return saved;
    } catch (_) {}
    return 'id';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('mb_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (_) {}
    return 'light';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('all');
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [isGalleryAutoplay, setIsGalleryAutoplay] = useState(false);
  const [galleryDelay, setGalleryDelay] = useState(3500);
  const [activeGallerySpotlight, setActiveGallerySpotlight] = useState(0);
  const [hoveredGalleryIndex, setHoveredGalleryIndex] = useState<number | null>(null);
  const [searchArea, setSearchArea] = useState('');
  const [selectedMapDistrict, setSelectedMapDistrict] = useState<string | null>(null);

  // Form calculator state
  const [formType, setFormType] = useState('Sedot Septic Tank Rumah Tangga');
  const [formArea, setFormArea] = useState('Cikarang Utara');
  const [formDetail, setFormDetail] = useState('');

  const t = translations[lang];

  // Filtered FAQ items based on category tabs and search query
  const filteredFaqs = useMemo(() => {
    const q = faqSearchQuery.trim().toLowerCase();
    return t.faq.items.filter((item) => {
      const matchCategory =
        selectedFaqCategory === 'all' || item.categoryTag === selectedFaqCategory;
      if (!matchCategory) return false;

      if (!q) return true;
      const matchQ = item.question.toLowerCase().includes(q);
      const matchA = item.answerText.toLowerCase().includes(q);
      const matchB = item.bullets?.some((b) => b.toLowerCase().includes(q));
      return matchQ || matchA || matchB;
    });
  }, [faqSearchQuery, selectedFaqCategory, t.faq.items]);

  // Filtered Blog articles based on selected category tag
  const filteredArticles = useMemo(() => {
    if (selectedBlogCategory === 'all') {
      return t.blog.articles;
    }
    return t.blog.articles.filter((article) => article.categoryTag === selectedBlogCategory);
  }, [selectedBlogCategory, t.blog.articles]);

  // Gallery auto-play timer
  useEffect(() => {
    if (!isGalleryAutoplay) return;

    const interval = setInterval(() => {
      setActiveGallerySpotlight((prev) => (prev + 1) % t.gallery.items.length);
      setSelectedGalleryIndex((prev) => {
        if (prev === null) return null;
        return (prev + 1) % t.gallery.items.length;
      });
    }, galleryDelay);

    return () => clearInterval(interval);
  }, [isGalleryAutoplay, galleryDelay, t.gallery.items.length]);

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex !== null) {
        if (e.key === 'Escape') {
          setSelectedGalleryIndex(null);
        } else if (e.key === 'ArrowRight') {
          setSelectedGalleryIndex((prev) => (prev !== null ? (prev + 1) % t.gallery.items.length : null));
        } else if (e.key === 'ArrowLeft') {
          setSelectedGalleryIndex((prev) => (prev !== null ? (prev - 1 + t.gallery.items.length) % t.gallery.items.length : null));
        } else if (e.code === 'Space') {
          e.preventDefault();
          setIsGalleryAutoplay((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIndex, t.gallery.items.length]);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('mb_lang', newLang);
      document.documentElement.lang = newLang;
    } catch (_) {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('mb_theme', theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'layanan', 'tentang', 'faq', 'sertifikasi', 'blog', 'galeri', 'kontak'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for lightbox & article modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGalleryIndex(null);
        setSelectedArticleId(null);
      }
      if (selectedGalleryIndex !== null) {
        if (e.key === 'ArrowRight') {
          setSelectedGalleryIndex((prev) =>
            prev !== null ? (prev + 1) % t.gallery.items.length : null
          );
        }
        if (e.key === 'ArrowLeft') {
          setSelectedGalleryIndex((prev) =>
            prev !== null ? (prev - 1 + t.gallery.items.length) % t.gallery.items.length : null
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIndex, selectedArticleId, t.gallery.items.length]);

  // Lock body scroll when lightbox or article modal is open
  useEffect(() => {
    if (selectedGalleryIndex !== null || selectedArticleId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedGalleryIndex, selectedArticleId]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const top = targetEl.offsetTop - 80;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  const handleSendFormWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      lang === 'en'
        ? `Hello Mitra Bersih 24 Hours,\n\nI would like to request sanitation service:\n• Service: ${formType}\n• Location: ${formArea}\n• Notes/Address: ${formDetail || 'Please respond ASAP'}\n\nPlease provide cost estimate and technician arrival ETA. Thank you!`
        : `Halo Mitra Bersih 24Jam,\n\nSaya ingin memesan layanan:\n• Layanan: ${formType}\n• Wilayah: ${formArea}\n• Keterangan/Alamat: ${formDetail || 'Mohon segera direspon'}\n\nMohon info estimasi biaya dan waktu kedatangan teknisi. Terima kasih!`;
    const url = `https://wa.me/6285715654183?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // District map selection handler: updates map state, updates search bar, and smooth scrolls to area list
  const handleSelectDistrictFromMap = (districtName: string | null) => {
    setSelectedMapDistrict(districtName);
    if (districtName) {
      const district = DISTRICTS_DATA.find(
        (d) => d.nameId === districtName || d.nameEn === districtName
      );
      const searchVal = district
        ? lang === 'en'
          ? district.nameEn
          : district.nameId
        : districtName;
      setSearchArea(searchVal);

      // Smooth scroll to area search container so the user immediately sees the filtered villages
      setTimeout(() => {
        const areaSearchBox = document.getElementById('area-search-container');
        if (areaSearchBox) {
          areaSearchBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    } else {
      setSearchArea('');
    }
  };

  // Search input change handler: keeps search query and map district selection synchronized
  const handleSearchAreaChange = (val: string) => {
    setSearchArea(val);
    if (!val.trim()) {
      setSelectedMapDistrict(null);
      return;
    }
    const term = val.trim().toLowerCase();
    const matchingDistrict = DISTRICTS_DATA.find(
      (d) =>
        d.nameId.toLowerCase() === term ||
        d.nameEn.toLowerCase() === term
    );
    if (matchingDistrict) {
      setSelectedMapDistrict(matchingDistrict.nameId);
    } else if (
      selectedMapDistrict &&
      !selectedMapDistrict.toLowerCase().includes(term)
    ) {
      // If user typed a search that does not match the active district, clear the map district restriction
      setSelectedMapDistrict(null);
    }
  };

  // Reset area search & map filter
  const handleClearAreaSearch = () => {
    setSearchArea('');
    setSelectedMapDistrict(null);
  };

  // Filter area items if search is active or map district is selected
  const filteredGroups = useMemo(() => {
    return AREA_GROUPS.map((group) => {
      // If a map district is selected, only show villages for that district
      if (selectedMapDistrict) {
        const matchingDistrict = DISTRICTS_DATA.find(
          (d) =>
            d.nameId.toLowerCase() === selectedMapDistrict.toLowerCase() ||
            d.nameEn.toLowerCase() === selectedMapDistrict.toLowerCase()
        );
        const targetRegion = matchingDistrict ? matchingDistrict.nameId : selectedMapDistrict;
        if (group.region.toLowerCase() !== targetRegion.toLowerCase()) {
          return { region: group.region, items: [] };
        }
      }

      if (!searchArea.trim()) return group;

      const term = searchArea.trim().toLowerCase();

      // Check if search matches the district name (in Indonesian or English)
      const districtInfo = DISTRICTS_DATA.find(
        (d) => d.nameId.toLowerCase() === group.region.toLowerCase()
      );
      const isDistrictMatch =
        group.region.toLowerCase().includes(term) ||
        (districtInfo && districtInfo.nameEn.toLowerCase().includes(term));

      if (isDistrictMatch) {
        // District matched: show ALL villages for this district!
        return group;
      }

      // Otherwise filter villages by substring
      const filteredItems = group.items.filter((item) =>
        item.toLowerCase().includes(term)
      );

      return {
        region: group.region,
        items: filteredItems,
      };
    }).filter((group) => group.items.length > 0);
  }, [selectedMapDistrict, searchArea]);

  const selectedArticle =
    selectedArticleId !== null
      ? t.blog.articles.find((a) => a.id === selectedArticleId) || null
      : null;

  return (
    <div className="relative min-h-screen text-[#111111]">
      {/* ================= NAVBAR ================= */}
      <nav className={`navbar-custom ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-custom flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="logo"
          >
            <div className="logo-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="logo-text">
              <strong>SEDOT WC</strong>
              <span>MITRA BERSIH 24JAM</span>
            </div>
          </a>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <a
                href="#home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'home')}
              >
                {t.nav.home}
              </a>
            </li>
            <li>
              <a
                href="#layanan"
                className={activeSection === 'layanan' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'layanan')}
              >
                {t.nav.services}
              </a>
            </li>
            <li>
              <a
                href="#tentang"
                className={activeSection === 'tentang' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'tentang')}
              >
                {t.nav.about}
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className={activeSection === 'faq' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'faq')}
              >
                {t.nav.faq}
              </a>
            </li>
            <li>
              <a
                href="#sertifikasi"
                className={activeSection === 'sertifikasi' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'sertifikasi')}
              >
                {t.nav.certifications}
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className={activeSection === 'blog' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'blog')}
              >
                {t.nav.blog}
              </a>
            </li>
            <li>
              <a
                href="#galeri"
                className={activeSection === 'galeri' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'galeri')}
              >
                {t.nav.gallery}
              </a>
            </li>
            <li>
              <a
                href="#kontak"
                className={activeSection === 'kontak' ? 'active' : ''}
                onClick={(e) => scrollToSection(e, 'kontak')}
              >
                {t.nav.contact}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="lang-switcher" role="group" aria-label="Language Selector">
              <button
                type="button"
                className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
                onClick={() => handleLangChange('id')}
                aria-pressed={lang === 'id'}
                title="Bahasa Indonesia"
              >
                <span>🇮🇩</span> ID
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => handleLangChange('en')}
                aria-pressed={lang === 'en'}
                title="English"
              >
                <span>🇬🇧</span> EN
              </button>
            </div>

            {/* Global Theme Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={
                theme === 'dark'
                  ? lang === 'en'
                    ? 'Switch to Light Mode'
                    : 'Ubah ke Mode Terang'
                  : lang === 'en'
                    ? 'Switch to Dark Mode'
                    : 'Ubah ke Mode Gelap'
              }
            >
              {theme === 'dark' ? (
                <i className="fas fa-sun theme-icon-sun"></i>
              ) : (
                <i className="fas fa-moon theme-icon-moon"></i>
              )}
            </button>

            <a
              href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                lang === 'en'
                  ? 'Hello Mitra Bersih, I would like to inquire about 24-hour septic and plumbing service in Cikarang'
                  : 'Halo Mitra Bersih, saya ingin tanya layanan sedot WC Cikarang 24 jam'
              )}`}
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="pulse-dot"></span>
              <span>{t.nav.hotline}</span>
              <span className="phone-text">· +62 857-1565-4183</span>
            </a>

            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <span className="decoration bubble bubble-1"></span>
        <span className="decoration bubble bubble-2"></span>
        <span className="decoration bubble bubble-3"></span>
        <i className="fas fa-plus decoration cross-icon"></i>
        <span className="decoration triangle"></span>
        <span className="decoration diamond"></span>
        <span className="decoration circle-outline"></span>
        <span className="decoration dot-pattern"></span>

        {/* Floating 24/7 Emergency Service Badge with Radar Ripple Animation */}
        <a
          href={`https://wa.me/6285715654183?text=${encodeURIComponent(
            lang === 'en'
              ? 'Hello Mitra Bersih, I need 24/7 emergency vacuum / plumbing service in Cikarang immediately.'
              : 'Halo Mitra Bersih, saya butuh layanan darurat 24 jam sedot WC Cikarang sekarang.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-floating-emergency-badge"
          aria-label={`${t.hero.floatingEmergencyBadge} - ${t.hero.floatingEmergencyStatus}`}
          title={lang === 'en' ? 'Click for Instant 24/7 Emergency Dispatch' : 'Klik untuk Panggilan Cepat Darurat 24 Jam'}
        >
          {/* Animated Multi-Ring Ripple Beacon */}
          <div className="emergency-ripple-beacon" aria-hidden="true">
            <span className="emergency-ripple-ring ring-1"></span>
            <span className="emergency-ripple-ring ring-2"></span>
            <span className="emergency-ripple-ring ring-3"></span>
            <div className="emergency-beacon-core">
              <i className="fas fa-truck-fast text-[11px] text-[#111111]"></i>
            </div>
          </div>

          <div className="emergency-badge-text-group">
            <div className="emergency-badge-top-row">
              <span className="emergency-live-pill">
                <span className="emergency-status-dot"></span>
                <span>{t.hero.floatingEmergencyStatus}</span>
              </span>
              <span className="emergency-eta-tag">
                <i className="fas fa-bolt text-[#FFD60A] text-[9px]"></i> 30m
              </span>
            </div>
            <span className="emergency-badge-title">
              {t.hero.floatingEmergencyBadge}
            </span>
            <span className="emergency-badge-sub">
              {t.hero.floatingEmergencySub}
            </span>
          </div>

          <div className="emergency-badge-cta-arrow" aria-hidden="true">
            <i className="fas fa-chevron-right text-[11px]"></i>
          </div>
        </a>

        <div className="container-custom">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="pulse-dot"></span>
                {t.hero.badge}
              </div>
              <h1>
                {t.hero.titleMain}<br />{t.hero.titleBrand}
                <span className="highlight">
                  {t.hero.highlight}
                </span>
              </h1>
              <a
                href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hello Mitra Bersih, I would like to order septic tank service in Cikarang'
                    : 'Halo Mitra Bersih, saya mau pesan layanan Sedot WC Cikarang'
                )}`}
                className="hero-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-phone-alt"></i>
                {t.hero.cta}
              </a>
              <div className="hero-stats">
                <div className="stat">
                  <strong>{t.hero.stat1Val}</strong>
                  <span>{t.hero.stat1Label}</span>
                </div>
                <div className="stat">
                  <strong>{t.hero.stat2Val}</strong>
                  <span>{t.hero.stat2Label}</span>
                </div>
                <div className="stat">
                  <strong>{t.hero.stat3Val}</strong>
                  <span>{t.hero.stat3Label}</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="truck-card">
                {/* Truck Illustration SVG */}
                <svg
                  className="truck-svg"
                  viewBox="0 0 500 350"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="250"
                    cy="320"
                    rx="200"
                    ry="12"
                    fill="rgba(255,214,10,0.15)"
                  />

                  {/* House Background */}
                  <g opacity="0.4">
                    <rect x="20" y="120" width="100" height="100" fill="#FFD60A" rx="4" />
                    <polygon points="20,120 70,80 120,120" fill="#FFD60A" />
                    <rect x="40" y="150" width="20" height="20" fill="#111111" opacity="0.6" />
                    <rect x="80" y="150" width="20" height="20" fill="#111111" opacity="0.6" />
                    <rect x="55" y="185" width="30" height="35" fill="#111111" opacity="0.6" />

                    <rect x="380" y="100" width="90" height="120" fill="#FFD60A" opacity="0.5" rx="4" />
                    <polygon points="380,100 425,70 470,100" fill="#FFD60A" opacity="0.5" />
                    <rect x="395" y="130" width="15" height="15" fill="#111111" opacity="0.4" />
                    <rect x="425" y="130" width="15" height="15" fill="#111111" opacity="0.4" />
                    <rect x="395" y="160" width="15" height="15" fill="#111111" opacity="0.4" />
                    <rect x="425" y="160" width="15" height="15" fill="#111111" opacity="0.4" />
                  </g>

                  {/* Truck Body Main Tank */}
                  <rect
                    x="80"
                    y="140"
                    width="240"
                    height="110"
                    fill="#FFD60A"
                    rx="20"
                    stroke="#111111"
                    strokeWidth="3"
                  />

                  <rect
                    x="95"
                    y="155"
                    width="210"
                    height="50"
                    fill="rgba(17,17,17,0.1)"
                    rx="8"
                  />

                  <text
                    x="200"
                    y="185"
                    textAnchor="middle"
                    fontFamily="Poppins, sans-serif"
                    fontSize="20"
                    fontWeight="900"
                    fill="#111111"
                  >
                    MITRA BERSIH
                  </text>
                  <text
                    x="200"
                    y="205"
                    textAnchor="middle"
                    fontFamily="Poppins, sans-serif"
                    fontSize="11"
                    fontWeight="600"
                    fill="#111111"
                    opacity="0.7"
                  >
                    24 JAM SERVICE
                  </text>

                  {/* Flame Logo */}
                  <g transform="translate(200, 225)">
                    <circle cx="0" cy="0" r="14" fill="#111111" />
                    <path
                      d="M -6,-2 Q -6,-8 0,-10 Q 6,-8 6,-2 Q 6,4 0,6 Q -6,4 -6,-2 Z"
                      fill="#FFD60A"
                    />
                  </g>

                  {/* Truck Cab */}
                  <rect x="320" y="170" width="100" height="80" fill="#111111" rx="12" />
                  <rect x="332" y="180" width="76" height="40" fill="#FFD60A" rx="6" />
                  <rect
                    x="340"
                    y="188"
                    width="60"
                    height="24"
                    fill="rgba(17,17,17,0.3)"
                    rx="3"
                  />

                  <rect x="335" y="225" width="20" height="20" fill="#FFD60A" rx="3" />
                  <text
                    x="345"
                    y="240"
                    textAnchor="middle"
                    fontFamily="Poppins, sans-serif"
                    fontSize="8"
                    fontWeight="700"
                    fill="#111111"
                  >
                    24J
                  </text>

                  <circle cx="415" cy="220" r="6" fill="#FFD60A" />
                  <circle cx="415" cy="220" r="3" fill="#FFFFFF" />

                  {/* Wheels */}
                  <circle cx="130" cy="260" r="24" fill="#111111" />
                  <circle cx="130" cy="260" r="12" fill="#FFD60A" />
                  <circle cx="130" cy="260" r="6" fill="#111111" />

                  <circle cx="220" cy="260" r="24" fill="#111111" />
                  <circle cx="220" cy="260" r="12" fill="#FFD60A" />
                  <circle cx="220" cy="260" r="6" fill="#111111" />

                  <circle cx="370" cy="260" r="24" fill="#111111" />
                  <circle cx="370" cy="260" r="12" fill="#FFD60A" />
                  <circle cx="370" cy="260" r="6" fill="#111111" />

                  {/* Hose */}
                  <path
                    d="M 90 230 Q 50 240 30 270"
                    stroke="#111111"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 90 230 Q 50 240 30 270"
                    stroke="#FFD60A"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="6,4"
                  />

                  {/* Workers */}
                  <g transform="translate(30, 240)">
                    <rect x="-12" y="0" width="24" height="40" fill="#111111" rx="4" />
                    <rect x="-12" y="14" width="24" height="4" fill="#FFD60A" />
                    <circle cx="0" cy="-8" r="10" fill="#FFD60A" />
                    <path
                      d="M -12 -10 Q -12 -22 0 -22 Q 12 -22 12 -10 L 12 -8 L -12 -8 Z"
                      fill="#111111"
                    />
                    <rect
                      x="-18"
                      y="6"
                      width="12"
                      height="6"
                      fill="#FFD60A"
                      rx="2"
                      transform="rotate(20)"
                    />
                    <rect x="-10" y="40" width="8" height="20" fill="#111111" />
                    <rect x="2" y="40" width="8" height="20" fill="#111111" />
                  </g>

                  <g transform="translate(450, 240)">
                    <rect x="-12" y="0" width="24" height="40" fill="#111111" rx="4" />
                    <rect x="-12" y="14" width="24" height="4" fill="#FFD60A" />
                    <circle cx="0" cy="-8" r="10" fill="#FFD60A" />
                    <path
                      d="M -12 -10 Q -12 -22 0 -22 Q 12 -22 12 -10 L 12 -8 L -12 -8 Z"
                      fill="#111111"
                    />
                    <rect
                      x="6"
                      y="6"
                      width="12"
                      height="6"
                      fill="#FFD60A"
                      rx="2"
                      transform="rotate(-20)"
                    />
                    <rect x="-10" y="40" width="8" height="20" fill="#111111" />
                    <rect x="2" y="40" width="8" height="20" fill="#111111" />
                  </g>
                </svg>
              </div>

              <div className="hero-tags tag-1">
                <i className="fas fa-shield-alt"></i>
                <span>{t.hero.tag1}</span>
              </div>
              <div className="hero-tags tag-2">
                <i className="fas fa-bolt"></i>
                <span>{t.hero.tag2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="wave-bottom">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 C240,100 480,20 720,40 C960,60 1200,100 1440,60 L1440,120 L0,120 Z"
              fill="var(--soft-blue)"
            />
          </svg>
        </div>
      </section>

      {/* ================= LAYANAN ================= */}
      <section className="layanan" id="layanan">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.services.badge}</span>
            <h2 className="section-title whitespace-pre-line">{t.services.title}</h2>
            <p className="section-subtitle">{t.services.subtitle}</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-truck-loading"></i>
              </div>
              <h3>{t.services.card1Title}</h3>
              <p>{t.services.card1Desc}</p>
              <a
                href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hello, I would like to book Septic Tank Pumping service in Cikarang'
                    : 'Halo, saya ingin pesan layanan Sedot WC Cikarang'
                )}`}
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.services.card1Cta} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-faucet"></i>
              </div>
              <h3>{t.services.card2Title}</h3>
              <p>{t.services.card2Desc}</p>
              <a
                href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hello, I would like to book Clogged Toilet/Pipe Clearing in Cikarang'
                    : 'Halo, saya ingin pesan layanan Jasa WC Mampet Cikarang'
                )}`}
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.services.card2Cta} <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-industry"></i>
              </div>
              <h3>{t.services.card3Title}</h3>
              <p>{t.services.card3Desc}</p>
              <a
                href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hello, I would like to inquire about Factory Wastewater / Grease Trap service in Cikarang'
                    : 'Halo, saya ingin pesan layanan Sedot Limbah Pabrik Cikarang'
                )}`}
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.services.card3Cta} <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="why-us" id="tentang">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.whyUs.badge}</span>
            <h2 className="section-title">{t.whyUs.title}</h2>
            <p className="section-subtitle">{t.whyUs.subtitle}</p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="why-content">
                <h3>{t.whyUs.card1Title}</h3>
                <p>{t.whyUs.card1Desc}</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="why-content">
                <h3>{t.whyUs.card2Title}</h3>
                <p>{t.whyUs.card2Desc}</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-tags"></i>
              </div>
              <div className="why-content">
                <h3>{t.whyUs.card3Title}</h3>
                <p>{t.whyUs.card3Desc}</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="why-content">
                <h3>{t.whyUs.card4Title}</h3>
                <p>{t.whyUs.card4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq-section" id="faq">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.faq.badge}</span>
            <h2 className="section-title">{t.faq.title}</h2>
            <p className="section-subtitle">{t.faq.subtitle}</p>
          </div>

          {/* FAQ Category Filter Tabs */}
          <div className="faq-category-tabs-bar mb-6 flex flex-wrap items-center justify-center gap-2.5">
            {t.faq.categories.map((cat) => {
              const isSelected = selectedFaqCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? t.faq.items.length
                  : t.faq.items.filter((item) => item.categoryTag === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedFaqCategory(cat.id);
                    setOpenFaqIndex(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD60A] text-[#111111] shadow-md shadow-yellow-500/20 ring-2 ring-yellow-400 scale-[1.02]'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#FFD60A] hover:text-black dark:hover:text-white'
                  }`}
                  aria-pressed={isSelected}
                >
                  <i className={cat.icon}></i>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                      isSelected
                        ? 'bg-[#111111] text-[#FFD60A]'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ Search Bar */}
          <div className="faq-search-container">
            <div className="faq-search-input-box">
              <i className="fas fa-search faq-search-icon"></i>
              <input
                type="text"
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                placeholder={t.faq.searchPlaceholder}
                className="faq-search-input"
                aria-label={t.faq.searchPlaceholder}
              />
              {faqSearchQuery && (
                <button
                  type="button"
                  onClick={() => setFaqSearchQuery('')}
                  className="faq-search-clear-btn"
                  title={t.faq.searchReset}
                  aria-label={t.faq.searchReset}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            <div className="faq-search-meta">
              <span>
                {t.faq.searchCountLabel
                  .replace('{count}', String(filteredFaqs.length))
                  .replace('{total}', String(t.faq.items.length))}
              </span>
              {(faqSearchQuery || selectedFaqCategory !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setFaqSearchQuery('');
                    setSelectedFaqCategory('all');
                  }}
                  className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 hover:underline cursor-pointer"
                >
                  {t.faq.searchReset}
                </button>
              )}
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="faq-empty-state">
              <div className="faq-empty-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                {t.faq.noResultsTitle}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                {t.faq.noResultsDesc}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFaqSearchQuery('');
                    setSelectedFaqCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-750 text-black dark:text-white font-bold text-xs hover:bg-gray-300 transition cursor-pointer"
                >
                  <i className="fas fa-undo mr-1.5"></i> {t.faq.searchReset}
                </button>
                <a
                  href="https://wa.me/6285715654183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#FFD60A] text-[#111111] font-bold text-xs hover:bg-yellow-400 transition inline-flex items-center gap-1.5"
                >
                  <i className="fab fa-whatsapp"></i> {t.faq.bannerCta}
                </a>
              </div>
            </div>
          ) : (
            <div className="faq-list">
              {filteredFaqs.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.id}
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <div className="faq-icon-wrapper">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{item.answerText}</p>
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-gray-600 dark:text-gray-300">
                            {item.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Visual Trust Badges directly below each FAQ item */}
                    <div className="faq-item-trust-footer">
                      <div className="faq-trust-pills-row">
                        <span
                          className="faq-trust-pill badge-technician"
                          title={t.faq.trustBadges.technicianSub}
                        >
                          <i className="fas fa-user-shield text-amber-500"></i>
                          <span>{t.faq.trustBadges.technicianLabel}</span>
                        </span>
                        <span
                          className="faq-trust-pill badge-response"
                          title={t.faq.trustBadges.responseSub}
                        >
                          <i className="fas fa-bolt text-yellow-500"></i>
                          <span>{t.faq.trustBadges.responseLabel}</span>
                        </span>
                        <span
                          className="faq-trust-pill badge-guarantee"
                          title={t.faq.trustBadges.guaranteeSub}
                        >
                          <i className="fas fa-award text-emerald-500"></i>
                          <span>{t.faq.trustBadges.guaranteeLabel}</span>
                        </span>
                        <span
                          className="faq-trust-pill badge-pricing"
                          title={t.faq.trustBadges.pricingSub}
                        >
                          <i className="fas fa-tags text-blue-500"></i>
                          <span>{t.faq.trustBadges.pricingLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="faq-cta-banner">
            <div>
              <h4>{t.faq.bannerTitle}</h4>
              <p>{t.faq.bannerSubtitle}</p>
            </div>
            <a
              href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                lang === 'en'
                  ? 'Hello Mitra Bersih, I have questions regarding drainage/septic maintenance in Cikarang'
                  : 'Halo Mitra Bersih, saya ingin tanya dan konsultasi masalah WC di Cikarang'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFD60A] text-[#111111] font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition shadow-xs text-sm"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              {t.faq.bannerCta}
            </a>
          </div>
        </div>
      </section>

      {/* ================= TRUST INDICATORS & CERTIFICATIONS ================= */}
      <section className="trust-indicators" id="sertifikasi">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.trustIndicators.badge}</span>
            <h2 className="section-title">{t.trustIndicators.title}</h2>
            <p className="section-subtitle">{t.trustIndicators.subtitle}</p>
          </div>

          <div className="authority-grid">
            {/* Card 1 */}
            <div className="authority-card">
              <span className="authority-badge-tag">
                <i className="fas fa-award"></i> {t.trustIndicators.card1Badge}
              </span>
              <div className="authority-header">
                <div className="authority-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>{t.trustIndicators.card1Title}</h3>
              </div>
              <p>{t.trustIndicators.card1Desc}</p>
              <ul className="authority-checklist">
                {t.trustIndicators.card1Bullets.map((b, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 */}
            <div className="authority-card">
              <span className="authority-badge-tag">
                <i className="fas fa-leaf"></i> {t.trustIndicators.card2Badge}
              </span>
              <div className="authority-header">
                <div className="authority-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>{t.trustIndicators.card2Title}</h3>
              </div>
              <p>{t.trustIndicators.card2Desc}</p>
              <ul className="authority-checklist">
                {t.trustIndicators.card2Bullets.map((b, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 */}
            <div className="authority-card">
              <span className="authority-badge-tag">
                <i className="fas fa-user-shield"></i> {t.trustIndicators.card3Badge}
              </span>
              <div className="authority-header">
                <div className="authority-icon">
                  <i className="fas fa-hard-hat"></i>
                </div>
                <h3>{t.trustIndicators.card3Title}</h3>
              </div>
              <p>{t.trustIndicators.card3Desc}</p>
              <ul className="authority-checklist">
                {t.trustIndicators.card3Bullets.map((b, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Safety Equipment Preview Badges in Card 3 */}
              <div className="card-safety-preview">
                <span className="card-safety-title">
                  <i className="fas fa-shield-halved"></i> Safety Equipment:
                </span>
                <div className="card-safety-pills">
                  <span className="safety-pill">
                    <i className="fas fa-hard-hat text-amber-500"></i> Helm K3
                  </span>
                  <span className="safety-pill">
                    <i className="fas fa-smog text-blue-500"></i> Gas Detector
                  </span>
                  <span className="safety-pill">
                    <i className="fas fa-head-side-mask text-emerald-500"></i> Respirator
                  </span>
                  <span className="safety-pill">
                    <i className="fas fa-shoe-prints text-red-500"></i> Steel Boots
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="authority-card">
              <span className="authority-badge-tag">
                <i className="fas fa-building"></i> {t.trustIndicators.card4Badge}
              </span>
              <div className="authority-header">
                <div className="authority-icon">
                  <i className="fas fa-file-invoice"></i>
                </div>
                <h3>{t.trustIndicators.card4Title}</h3>
              </div>
              <p>{t.trustIndicators.card4Desc}</p>
              <ul className="authority-checklist">
                {t.trustIndicators.card4Bullets.map((b, i) => (
                  <li key={i}>
                    <i className="fas fa-check-circle"></i>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= DEDICATED SAFETY EQUIPMENT & VACUUM FLEET SHOWCASE ================= */}
          <div className="authority-safety-showcase">
            <div className="safety-showcase-header">
              <span className="safety-badge">
                <i className="fas fa-shield-halved"></i> {t.trustIndicators.safetyEquipment.badge}
              </span>
              <h3 className="safety-title">{t.trustIndicators.safetyEquipment.title}</h3>
              <p className="safety-subtitle">{t.trustIndicators.safetyEquipment.subtitle}</p>
            </div>

            <div className="safety-showcase-grid">
              {/* Category 1: Modern Vacuum Trucks */}
              <div className="safety-category-card">
                <div className="safety-category-header">
                  <div className="safety-category-icon bg-blue-500/15 text-blue-600 dark:text-blue-400">
                    <i className="fas fa-truck-moving"></i>
                  </div>
                  <div>
                    <h4>{t.trustIndicators.safetyEquipment.fleetTitle}</h4>
                    <span className="safety-category-meta">
                      <i className="fas fa-check-double text-blue-500 mr-1"></i>
                      {lang === 'en' ? 'ISO 14001 Closed Vacuum Standard' : 'Standar Sirkulasi Tertutup ISO 14001'}
                    </span>
                  </div>
                </div>

                <div className="safety-items-list">
                  {t.trustIndicators.safetyEquipment.truckItems.map((item, idx) => (
                    <div key={idx} className="safety-item-row">
                      <div className="safety-item-icon fleet-icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="safety-item-content">
                        <strong>{item.name}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Technician Protective Gear (APD) */}
              <div className="safety-category-card">
                <div className="safety-category-header">
                  <div className="safety-category-icon bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <div>
                    <h4>{t.trustIndicators.safetyEquipment.gearTitle}</h4>
                    <span className="safety-category-meta">
                      <i className="fas fa-shield-heart text-amber-500 mr-1"></i>
                      {lang === 'en' ? 'Certified K3 & Confined Space Gear' : 'Sertifikasi K3 & Ruang Terbatas Lapangan'}
                    </span>
                  </div>
                </div>

                <div className="safety-items-list">
                  {t.trustIndicators.safetyEquipment.gearItems.map((item, idx) => (
                    <div key={idx} className="safety-item-row">
                      <div className="safety-item-icon gear-icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="safety-item-content">
                        <strong>{item.name}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4-Pillar Summary Banner */}
          <div className="authority-summary-banner">
            <div className="summary-item">
              <i className="fas fa-certificate"></i>
              <div className="info">
                <strong>{t.trustIndicators.pillar1}</strong>
                <span>{t.trustIndicators.pillar1Sub}</span>
              </div>
            </div>
            <div className="summary-item">
              <i className="fas fa-recycle"></i>
              <div className="info">
                <strong>{t.trustIndicators.pillar2}</strong>
                <span>{t.trustIndicators.pillar2Sub}</span>
              </div>
            </div>
            <div className="summary-item">
              <i className="fas fa-shield-virus"></i>
              <div className="info">
                <strong>{t.trustIndicators.pillar3}</strong>
                <span>{t.trustIndicators.pillar3Sub}</span>
              </div>
            </div>
            <div className="summary-item">
              <i className="fas fa-file-signature"></i>
              <div className="info">
                <strong>{t.trustIndicators.pillar4}</strong>
                <span>{t.trustIndicators.pillar4Sub}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST / TESTIMONI ================= */}
      <section className="trust">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.testimonials.badge}</span>
            <h2 className="section-title">{t.testimonials.title}</h2>
            <p className="section-subtitle">{t.testimonials.subtitle}</p>
          </div>

          <div className="badges-row">
            <div className="badge-pill">
              <i className="fas fa-star"></i>
              <span>{t.testimonials.pill1}</span>
            </div>
            <div className="badge-pill">
              <i className="fas fa-bolt"></i>
              <span>{t.testimonials.pill2}</span>
            </div>
            <div className="badge-pill">
              <i className="fas fa-shield-alt"></i>
              <span>{t.testimonials.pill3}</span>
            </div>
          </div>

          <div className="testimonials-carousel-wrapper">
            <Swiper
              key={lang}
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: '.testimonial-swiper-pagination',
                bulletClass: 'testimonial-dot',
                bulletActiveClass: 'testimonial-dot-active',
              }}
              navigation={{
                prevEl: '.testimonial-nav-prev',
                nextEl: '.testimonial-nav-next',
              }}
              loop={true}
              grabCursor={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              className="testimonials-swiper"
            >
              {t.testimonials.reviews.map((rev, idx) => (
                <SwiperSlide key={idx} className="h-auto">
                  <div className="testimonial-card">
                    <i className="fas fa-quote-right quote-icon"></i>
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="testimonial-text">{rev.text}</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{rev.avatar}</div>
                      <div className="author-info">
                        <strong>{rev.name}</strong>
                        <span>{rev.location}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Carousel Controls */}
            <div className="testimonials-controls">
              <button
                type="button"
                className="testimonial-nav-btn testimonial-nav-prev"
                aria-label="Previous Testimonial"
                title="Review Sebelumnya"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="testimonial-swiper-pagination"></div>

              <button
                type="button"
                className="testimonial-nav-btn testimonial-nav-next"
                aria-label="Next Testimonial"
                title="Review Selanjutnya"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOG / TIPS & ARTICLES ================= */}
      <section className="blog-section" id="blog">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.blog.badge}</span>
            <h2 className="section-title">{t.blog.title}</h2>
            <p className="section-subtitle">{t.blog.subtitle}</p>
          </div>

          {/* Category Filter Tags */}
          <div className="blog-category-filter-bar mb-8 flex flex-wrap items-center justify-center gap-2.5">
            {t.blog.categories.map((cat) => {
              const isSelected = selectedBlogCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? t.blog.articles.length
                  : t.blog.articles.filter((a) => a.categoryTag === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedBlogCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD60A] text-[#111111] shadow-md shadow-yellow-500/20 ring-2 ring-yellow-400 scale-[1.02]'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#FFD60A] hover:text-black dark:hover:text-white'
                  }`}
                  aria-pressed={isSelected}
                >
                  <i className={cat.icon}></i>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                      isSelected
                        ? 'bg-[#111111] text-[#FFD60A]'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 max-w-md mx-auto my-6">
              <i className="fas fa-newspaper text-3xl text-gray-400 mb-3"></i>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-4">
                {t.blog.noArticlesFound}
              </p>
              <button
                type="button"
                onClick={() => setSelectedBlogCategory('all')}
                className="px-4 py-2 rounded-xl bg-[#FFD60A] text-black font-bold text-xs hover:bg-yellow-400 transition cursor-pointer"
              >
                {t.blog.allCategoryLabel}
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredArticles.map((article) => (
                <article key={article.id} className="blog-card">
                  <div className="blog-image-wrapper">
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <div className="blog-category-tag">
                      <i className={article.categoryIcon}></i>
                      <span>{article.category}</span>
                    </div>
                  </div>

                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>
                        <i className="far fa-calendar-alt"></i> {article.date}
                      </span>
                      <span>
                        <i className="far fa-clock"></i> {article.readTime}
                      </span>
                    </div>

                    <h3 className="blog-title">{article.title}</h3>
                    <p className="blog-excerpt">{article.summary}</p>

                    <button
                      type="button"
                      onClick={() => setSelectedArticleId(article.id)}
                      className="blog-action-btn"
                    >
                      <span>{t.blog.readMore}</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* ================= NEWSLETTER SUBSCRIPTION FORM ================= */}
          <NewsletterSubscription lang={lang} t={t.newsletter} />
        </div>
      </section>

      {/* ================= GALERI ================= */}
      <section className="galeri" id="galeri">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.gallery.badge}</span>
            <h2 className="section-title">{t.gallery.title}</h2>
            <p className="section-subtitle">{t.gallery.subtitle}</p>
          </div>

          {/* Gallery Auto-Play & Control Bar */}
          <div className="gallery-controls-bar">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={() => setIsGalleryAutoplay(!isGalleryAutoplay)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  isGalleryAutoplay
                    ? 'bg-[#FFD60A] text-[#111111] shadow-lg shadow-yellow-500/25 ring-2 ring-yellow-300'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                }`}
                title={isGalleryAutoplay ? t.gallery.autoplayPause : t.gallery.autoplayPlay}
              >
                <i className={`fas ${isGalleryAutoplay ? 'fa-pause' : 'fa-play'}`}></i>
                <span>{isGalleryAutoplay ? t.gallery.autoplayPause : t.gallery.autoplayPlay}</span>
                {isGalleryAutoplay && (
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                  </span>
                )}
              </button>

              {/* Prev / Next Manual Step */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setActiveGallerySpotlight((prev) => (prev - 1 + t.gallery.items.length) % t.gallery.items.length);
                  }}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFD60A] hover:text-black text-white flex items-center justify-center text-xs transition cursor-pointer"
                  title={t.gallery.prevPhoto}
                  aria-label={t.gallery.prevPhoto}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveGallerySpotlight((prev) => (prev + 1) % t.gallery.items.length);
                  }}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FFD60A] hover:text-black text-white flex items-center justify-center text-xs transition cursor-pointer"
                  title={t.gallery.nextPhoto}
                  aria-label={t.gallery.nextPhoto}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              {/* Current Active Indicator */}
              <div className="text-xs text-gray-300 hidden sm:flex items-center gap-2">
                <span className="font-semibold text-[#FFD60A]">
                  {t.gallery.photoCounter} {activeGallerySpotlight + 1} / {t.gallery.items.length}:
                </span>
                <span className="truncate max-w-[180px] md:max-w-[240px] text-gray-200">
                  {t.gallery.items[activeGallerySpotlight].title}
                </span>
              </div>
            </div>

            {/* Adjustable Delay Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-gray-300 font-medium hidden md:inline-flex items-center gap-1.5">
                <i className="fas fa-stopwatch text-[#FFD60A]"></i>
                {t.gallery.delayLabel}
              </span>

              {/* Delay Presets */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                {[
                  { delay: 2000, label: '2s' },
                  { delay: 3500, label: '3.5s' },
                  { delay: 5000, label: '5s' },
                  { delay: 7000, label: '7s' },
                ].map((item) => (
                  <button
                    key={item.delay}
                    type="button"
                    onClick={() => setGalleryDelay(item.delay)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                      galleryDelay === item.delay
                        ? 'bg-[#FFD60A] text-[#111111]'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Fullscreen button for active item */}
              <button
                type="button"
                onClick={() => setSelectedGalleryIndex(activeGallerySpotlight)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15 transition cursor-pointer"
                title={t.gallery.viewFullscreen}
              >
                <i className="fas fa-expand"></i>
                <span className="hidden sm:inline">{t.gallery.viewFullscreen}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar when Autoplay is active */}
          {isGalleryAutoplay && (
            <div className="gallery-progress-track">
              <div
                key={`${activeGallerySpotlight}-${galleryDelay}`}
                className="gallery-progress-fill"
                style={{ animationDuration: `${galleryDelay}ms` }}
              />
            </div>
          )}

          <div className="gallery-grid">
            {t.gallery.items.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item ${
                  isGalleryAutoplay && activeGallerySpotlight === index ? 'active-spotlight' : ''
                }`}
                onMouseEnter={() => setHoveredGalleryIndex(index)}
                onMouseLeave={() => setHoveredGalleryIndex(null)}
                onClick={() => {
                  setActiveGallerySpotlight(index);
                  setSelectedGalleryIndex(index);
                }}
              >
                <img src={item.imageUrl} alt={item.alt} loading="lazy" />
                <div className="gallery-icon">
                  <i className="fas fa-expand"></i>
                </div>
                <div className="gallery-overlay">
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>

                {/* Floating Preview Card on Hover */}
                {hoveredGalleryIndex === index && (
                  <div className="gallery-hover-preview-card hidden md:block">
                    <img src={item.imageUrl} alt={item.alt} />
                    <div className="gallery-hover-preview-info">
                      <div className="gallery-hover-preview-badge">
                        <i className="fas fa-search-plus"></i>
                        <span>{t.gallery.previewBadge}</span>
                      </div>
                      <h5 className="gallery-hover-preview-title">{item.title}</h5>
                      <p className="gallery-hover-preview-hint">
                        <i className="fas fa-mouse-pointer mr-1 text-[#FFD60A]"></i>
                        {t.gallery.previewClickHint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AREA LAYANAN ================= */}
      <section className="area" id="kontak">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-badge">{t.area.badge}</span>
            <h2 className="section-title">{t.area.title}</h2>
            <p className="section-subtitle">{t.area.subtitle}</p>
          </div>

          {/* Service Area Interactive Map */}
          <ServiceAreaMap
            lang={lang}
            t={t.serviceMap}
            selectedDistrict={selectedMapDistrict}
            onSelectDistrict={handleSelectDistrictFromMap}
          />

          <div className="area-content">
            <div className="area-illustration">
              <i className="fas fa-map-marked-alt icon-big"></i>
              <h3>{t.area.illustrationTitle}</h3>
              <p>{t.area.illustrationDesc}</p>

              <div className="mt-8 pt-6 border-t border-white/20 text-left">
                <span className="text-xs uppercase tracking-wider text-[#FFD60A] font-bold block mb-2">
                  <i className="fas fa-bolt mr-1"></i> {t.area.emergencyBadge}
                </span>
                <p className="text-xs text-white/80 mb-4">
                  {t.area.emergencyDesc}
                </p>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                    lang === 'en'
                  ? 'Hello Mitra Bersih, please dispatch an urgent vacuum tanker to my location in Cikarang immediately'
                  : 'Halo Mitra Bersih, tolong kirim truk sedot WC ke lokasi saya sekarang'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FFD60A] text-[#111111] py-3 px-4 rounded-xl font-bold text-sm hover:brightness-105 transition"
                >
                  <i className="fab fa-whatsapp text-lg"></i> {t.area.emergencyBtn}
                </a>
              </div>
            </div>

            <div id="area-search-container">
              {/* Active District Filter Notification when a district is clicked on the map */}
              {selectedMapDistrict && (
                <div className="area-active-filter-badge mb-3 flex items-center justify-between bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-300 dark:border-yellow-700/60 px-4 py-2.5 rounded-xl text-xs animate-fade-in shadow-xs">
                  <div className="flex items-center gap-2 text-[#111111] dark:text-yellow-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-ping"></span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {lang === 'en' ? 'Active District Filter:' : 'Filter Kecamatan Terpilih:'}
                    </span>
                    <strong className="font-extrabold text-[#111111] dark:text-[#FFD60A] text-sm">
                      {selectedMapDistrict}
                    </strong>
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      ({filteredGroups[0]?.items.length || 0} {t.area.villagesLabel})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearAreaSearch}
                    className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 cursor-pointer transition px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                    title={t.area.searchReset}
                  >
                    <i className="fas fa-times-circle text-red-500"></i>
                    <span>{t.area.searchReset}</span>
                  </button>
                </div>
              )}

              <div className="area-search-box mb-4 bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-3 shadow-xs">
                <i className="fas fa-search text-gray-400 pl-2"></i>
                <input
                  type="text"
                  placeholder={t.area.searchPlaceholder}
                  value={searchArea}
                  onChange={(e) => handleSearchAreaChange(e.target.value)}
                  className="w-full text-sm outline-none text-[#111111] bg-transparent placeholder:text-gray-400"
                />
                {searchArea && (
                  <button
                    type="button"
                    onClick={handleClearAreaSearch}
                    className="text-xs font-semibold text-gray-500 hover:text-black dark:hover:text-white pr-2 cursor-pointer flex items-center gap-1"
                    title={t.area.searchReset}
                  >
                    <i className="fas fa-times"></i>
                    <span>{t.area.searchReset}</span>
                  </button>
                )}
              </div>

              <div className="area-list">
                {filteredGroups.map((group) => (
                  <React.Fragment key={group.region}>
                    <div className="area-region">
                      <span>{group.region}</span>
                      <span className="text-xs font-normal text-white/70">
                        {group.items.length} {t.area.villagesLabel}
                      </span>
                    </div>
                    {group.items.map((item) => (
                      <div key={item} className="area-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}

                {filteredGroups.length === 0 && (
                  <div className="area-empty-box col-span-2 text-center py-8 bg-white rounded-xl border border-gray-200 text-gray-500 text-sm">
                    {t.area.notFoundPrefix}{searchArea}{t.area.notFoundSuffix}
                  </div>
                )}

                <div className="area-more">
                  <i className="fas fa-location-arrow"></i> {t.area.moreLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ESTIMASI & KONSULTASI CEPAT ================= */}
      <section className="consultation-section py-16 border-t border-b border-gray-100">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-yellow-400/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-[#FFD60A]/20 text-[#FFD60A] text-xs font-bold px-3 py-1.5 rounded-full mb-3 tracking-wide">
                  {t.form.badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#FFD60A] leading-tight mb-3">
                  {t.form.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  {t.form.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-check text-[#FFD60A]"></i> {t.form.guarantee1}
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-check text-[#FFD60A]"></i> {t.form.guarantee2}
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-check text-[#FFD60A]"></i> {t.form.guarantee3}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSendFormWhatsApp} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xs flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {t.form.serviceLabel}
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-[#111111] border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:border-[#FFD60A] outline-none"
                  >
                    {t.form.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {t.form.areaLabel}
                  </label>
                  <select
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full bg-[#111111] border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:border-[#FFD60A] outline-none"
                  >
                    {t.form.areaOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {t.form.detailLabel}
                  </label>
                  <input
                    type="text"
                    value={formDetail}
                    onChange={(e) => setFormDetail(e.target.value)}
                    placeholder={t.form.detailPlaceholder}
                    className="w-full bg-[#111111] border border-gray-700 text-white rounded-xl px-3 py-2.5 text-sm focus:border-[#FFD60A] outline-none placeholder:text-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-[#FFD60A] text-[#111111] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition cursor-pointer shadow-md"
                >
                  <i className="fab fa-whatsapp text-lg"></i>
                  {t.form.submitBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="container-custom">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>{t.footer.contactTitle}</h4>
              <div className="footer-contact-item">
                <i className="fas fa-phone-alt"></i>
                <div className="info">
                  <span>{t.footer.phoneLabel}</span>
                  <a href="tel:+6285715654183" className="text-white hover:text-[#FFD60A] transition">
                    <strong>+62 857-1565-4183</strong>
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fab fa-whatsapp"></i>
                <div className="info">
                  <span>{t.footer.waLabel}</span>
                  <a
                    href="https://wa.me/6285715654183"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#FFD60A] transition"
                  >
                    <strong>+62 857-1565-4183</strong>
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <div className="info">
                  <span>{t.footer.emailLabel}</span>
                  <a href="mailto:info@mitrabersih24jam.com" className="text-white hover:text-[#FFD60A] transition">
                    <strong>info@mitrabersih24jam.com</strong>
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info">
                  <span>{t.footer.locationLabel}</span>
                  <strong>{t.footer.locationVal}</strong>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Cikarang+Kabupaten+Bekasi+Jawa+Barat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#FFD60A] hover:underline"
                  >
                    <i className="fas fa-location-arrow"></i>
                    <span>{t.footer.getDirectionsBtn}</span>
                  </a>
                </div>
              </div>

              <div className="social-row">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://wa.me/6285715654183"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>{t.footer.servicesTitle}</h4>
              <ul className="footer-links">
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> {t.services.card1Title}
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> {t.services.card2Title}
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> {t.services.card3Title}
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{t.footer.othersTitle}</h4>
              <ul className="footer-links">
                <li>
                  <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.faq}
                  </a>
                </li>
                <li>
                  <a href="#sertifikasi" onClick={(e) => scrollToSection(e, 'sertifikasi')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.certifications}
                  </a>
                </li>
                <li>
                  <a href="#blog" onClick={(e) => scrollToSection(e, 'blog')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.blog}
                  </a>
                </li>
                <li>
                  <a href="#galeri" onClick={(e) => scrollToSection(e, 'galeri')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.gallery}
                  </a>
                </li>
                <li>
                  <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.contact}
                  </a>
                </li>
                <li>
                  <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                    <i className="fas fa-chevron-right"></i> {t.nav.home}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="brand">SEDOT WC CIKARANG MITRA BERSIH 24JAM</div>
            <div className="copyright">
              &copy; {new Date().getFullYear()} {t.footer.rightsReserved}
            </div>
          </div>
        </div>
      </footer>

      {/* ================= SOCIAL LINKS FLOATING WIDGET (LEFT SIDE) ================= */}
      <SocialLinks lang={lang} t={t.socialLinks} />

      {/* ================= LIVE CHAT WIDGET (WHATSAPP DIRECT SUPPORT) ================= */}
      <LiveChatWidget lang={lang} t={t.chatWidget} />

      {/* ================= STICKY MOBILE QUICK BOOK BAR ================= */}
      <QuickBookBar lang={lang} t={t.quickBookBar} />

      {/* ================= ARTICLE READER MODAL ================= */}
      {selectedArticle && (
        <div
          className="article-modal-backdrop"
          onClick={() => setSelectedArticleId(null)}
        >
          <div
            className="article-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="article-close-btn"
              onClick={() => setSelectedArticleId(null)}
              aria-label="Tutup Artikel"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="article-header">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-black text-[#FFD60A] px-3 py-1 rounded-full mb-3">
                <i className={selectedArticle.categoryIcon}></i>
                {selectedArticle.category}
              </span>
              <h2>{selectedArticle.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span>
                  <i className="far fa-user mr-1 text-[#FFD60A]"></i> {t.blog.authorPrefix} {selectedArticle.author}
                </span>
                <span>
                  <i className="far fa-calendar-alt mr-1 text-[#FFD60A]"></i> {selectedArticle.date}
                </span>
                <span>
                  <i className="far fa-clock mr-1 text-[#FFD60A]"></i> {selectedArticle.readTime}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              <p className="font-medium text-gray-800 dark:text-gray-200 italic bg-gray-50 dark:bg-gray-850 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                {selectedArticle.content.intro}
              </p>

              {selectedArticle.content.sections.map((sec, idx) => (
                <div key={idx} className="pt-2">
                  <h3 className="text-base md:text-lg font-bold text-black dark:text-white mb-1.5 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A]"></span>
                    {sec.heading}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{sec.body}</p>
                </div>
              ))}

              <div className="article-pro-tip-box">
                <strong className="block text-black dark:text-yellow-400 font-bold mb-1">
                  <i className="fas fa-lightbulb text-yellow-600 dark:text-yellow-400 mr-1.5"></i>
                  {t.blog.proTipTitle}
                </strong>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200">
                  {selectedArticle.content.proTip}
                </p>
              </div>

              <div className="article-wa-cta">
                <div>
                  <h4 className="font-bold text-[#FFD60A] text-base mb-1">
                    {t.blog.modalCtaTitle}
                  </h4>
                  <p className="text-xs text-gray-300">
                    {t.blog.modalCtaDesc}
                  </p>
                </div>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                    lang === 'en'
                      ? `Hello Mitra Bersih, I read your article "${selectedArticle.title}" and would like to request technical assistance for my property in Cikarang.`
                      : `Halo Mitra Bersih 24Jam, saya membaca artikel "${selectedArticle.title}" dan ingin konsultasi/pesan penanganan untuk rumah/tempat saya di Cikarang.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD60A] text-[#111111] font-bold px-5 py-2.5 rounded-full text-xs md:text-sm inline-flex items-center gap-2 hover:bg-yellow-400 transition"
                >
                  <i className="fab fa-whatsapp text-lg"></i>
                  {t.blog.modalCtaBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LIGHTBOX MODAL ================= */}
      {selectedGalleryIndex !== null && (
        <div
          className="lightbox-modal"
          onClick={() => setSelectedGalleryIndex(null)}
        >
          {/* Top Bar with Auto-Play & Counter */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/75 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md text-white text-xs max-w-[90vw] overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Slide Counter */}
            <span className="font-bold text-[#FFD60A] whitespace-nowrap">
              {t.gallery.photoCounter} {selectedGalleryIndex + 1} / {t.gallery.items.length}
            </span>

            <span className="text-white/30">|</span>

            {/* Lightbox Autoplay Button */}
            <button
              type="button"
              onClick={() => setIsGalleryAutoplay(!isGalleryAutoplay)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition cursor-pointer whitespace-nowrap ${
                isGalleryAutoplay
                  ? 'bg-[#FFD60A] text-[#111111]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isGalleryAutoplay ? t.gallery.autoplayPause : t.gallery.autoplayPlay}
            >
              <i className={`fas ${isGalleryAutoplay ? 'fa-pause' : 'fa-play'}`}></i>
              <span>{isGalleryAutoplay ? t.gallery.autoplayPause : t.gallery.autoplayPlay}</span>
              <kbd className="hidden sm:inline text-[9px] px-1 py-0.5 rounded bg-black/30 font-mono ml-0.5">Space</kbd>
            </button>

            <span className="text-white/30 hidden sm:inline">|</span>

            {/* Delay Selector */}
            <div className="hidden sm:flex items-center gap-1">
              {[2000, 3500, 5000].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setGalleryDelay(d)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                    galleryDelay === d
                      ? 'bg-[#FFD60A] text-[#111111]'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {d / 1000}s
                </button>
              ))}
            </div>
          </div>

          {/* Autoplay Progress indicator bar at top of lightbox */}
          {isGalleryAutoplay && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30">
              <div
                key={`${selectedGalleryIndex}-${galleryDelay}`}
                className="h-full bg-gradient-to-r from-yellow-400 to-[#FFD60A] gallery-progress-fill"
                style={{ animationDuration: `${galleryDelay}ms` }}
              />
            </div>
          )}

          <button
            className="lightbox-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGalleryIndex(null);
            }}
            aria-label="Tutup"
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            className="lightbox-nav-btn lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGalleryIndex(
                (selectedGalleryIndex - 1 + t.gallery.items.length) %
                  t.gallery.items.length
              );
            }}
            aria-label="Foto Sebelumnya"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div
            className="flex flex-col items-center max-w-4xl max-h-[90vh] z-10 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={t.gallery.items[selectedGalleryIndex].imageUrl}
              alt={t.gallery.items[selectedGalleryIndex].alt}
              className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-2xl border-4 border-[#FFD60A]"
            />
            <div className="mt-4 text-center text-white bg-black/60 px-6 py-3 rounded-full backdrop-blur-md">
              <h4 className="font-bold text-[#FFD60A] text-lg">
                {t.gallery.items[selectedGalleryIndex].title}
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                {t.gallery.items[selectedGalleryIndex].desc}
              </p>
            </div>
          </div>

          <button
            className="lightbox-nav-btn lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGalleryIndex(
                (selectedGalleryIndex + 1) % t.gallery.items.length
              );
            }}
            aria-label="Foto Selanjutnya"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
