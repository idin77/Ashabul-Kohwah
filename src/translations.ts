/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'id' | 'en';

export interface TranslationData {
  nav: {
    home: string;
    services: string;
    about: string;
    faq: string;
    certifications: string;
    blog: string;
    gallery: string;
    contact: string;
    hotline: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleBrand: string;
    highlight: string;
    cta: string;
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
    tag1: string;
    tag2: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card1Cta: string;
    card2Title: string;
    card2Desc: string;
    card2Cta: string;
    card3Title: string;
    card3Desc: string;
    card3Cta: string;
  };
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    bannerTitle: string;
    bannerSubtitle: string;
    bannerCta: string;
    items: {
      id: number;
      question: string;
      answerText: string;
      bullets?: string[];
    }[];
  };
  trustIndicators: {
    badge: string;
    title: string;
    subtitle: string;
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card1Bullets: string[];
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card2Bullets: string[];
    card3Badge: string;
    card3Title: string;
    card3Desc: string;
    card3Bullets: string[];
    card4Badge: string;
    card4Title: string;
    card4Desc: string;
    card4Bullets: string[];
    pillar1: string;
    pillar1Sub: string;
    pillar2: string;
    pillar2Sub: string;
    pillar3: string;
    pillar3Sub: string;
    pillar4: string;
    pillar4Sub: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    pill1: string;
    pill2: string;
    pill3: string;
    reviews: {
      name: string;
      location: string;
      text: string;
      avatar: string;
    }[];
  };
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    readMore: string;
    authorPrefix: string;
    proTipTitle: string;
    modalCtaTitle: string;
    modalCtaDesc: string;
    modalCtaBtn: string;
    articles: {
      id: number;
      slug: string;
      category: string;
      categoryIcon: string;
      title: string;
      summary: string;
      readTime: string;
      date: string;
      author: string;
      image: string;
      content: {
        intro: string;
        sections: {
          heading: string;
          body: string;
        }[];
        proTip: string;
      };
    }[];
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      id: number;
      title: string;
      desc: string;
      imageUrl: string;
      alt: string;
    }[];
  };
  area: {
    badge: string;
    title: string;
    subtitle: string;
    illustrationTitle: string;
    illustrationDesc: string;
    emergencyBadge: string;
    emergencyDesc: string;
    emergencyBtn: string;
    searchPlaceholder: string;
    searchReset: string;
    notFoundPrefix: string;
    notFoundSuffix: string;
    villagesLabel: string;
    moreLabel: string;
  };
  form: {
    badge: string;
    title: string;
    subtitle: string;
    guarantee1: string;
    guarantee2: string;
    guarantee3: string;
    serviceLabel: string;
    serviceOptions: { label: string; value: string }[];
    areaLabel: string;
    areaOptions: { label: string; value: string }[];
    detailLabel: string;
    detailPlaceholder: string;
    submitBtn: string;
  };
  footer: {
    contactTitle: string;
    phoneLabel: string;
    waLabel: string;
    emailLabel: string;
    locationLabel: string;
    locationVal: string;
    servicesTitle: string;
    othersTitle: string;
    rightsReserved: string;
  };
  chatWidget: {
    launcherTooltip: string;
    agentName: string;
    agentRole: string;
    agentStatus: string;
    timeTag: string;
    greetingText: string;
    quickPill1: string;
    quickPill2: string;
    quickPill3: string;
    quickPill4: string;
    inputPlaceholder: string;
    sendBtn: string;
    footerNote: string;
  };
}

export const translations: Record<Language, TranslationData> = {
  id: {
    nav: {
      home: 'Home',
      services: 'Layanan',
      about: 'Tentang Kami',
      faq: 'FAQ',
      certifications: 'Standar Mutu',
      blog: 'Tips & Artikel',
      gallery: 'Galeri',
      contact: 'Kontak',
      hotline: 'Layanan 24 Jam',
    },
    hero: {
      badge: 'Online Sekarang · Siap Datang Ke Lokasi Anda',
      titleMain: 'JASA SEDOT WC CIKARANG',
      titleBrand: 'MITRA BERSIH 24JAM',
      highlight:
        'Layanan sedot wc cikarang 24 jam, sedot tinja, kuras septic tank, dan sedot limbah pabrik. Bergaransi, datang langsung, tanpa biaya tambahan, dan bebas bau!',
      cta: 'PESAN SEDOT WC CIKARANG · +62 857-1565-4183',
      stat1Val: '24/7',
      stat1Label: 'Layanan Siaga',
      stat2Val: '15+',
      stat2Label: 'Tahun Pengalaman',
      stat3Val: '5000+',
      stat3Label: 'Pelanggan Puas',
      tag1: 'Sedot WC Bergaransi',
      tag2: 'Cepat 30 Menit',
    },
    services: {
      badge: 'LAYANAN KAMI',
      title: 'Solusi Tuntas untuk\nSetiap Masalah Saluran',
      subtitle:
        'Menyediakan jasa sedot wc cikarang murah, kuras septic tank, sedot limbah pabrik cikarang, hingga tukang wc mampet cikarang dengan armada truk tangki modern.',
      card1Title: 'Sedot WC & Kuras Septic Tank',
      card1Desc:
        'Layanan sedot wc cikarang per tangki dan sedot tinja cikarang menggunakan truk tangki modern. Proses cepat, bebas bau, tanpa bongkar. Melayani sedot wc perumahan cikarang, ruko, jababeka, lippo cikarang, dan deltamas.',
      card1Cta: 'Pesan Sekarang',
      card2Title: 'Jasa WC Mampet & Saluran',
      card2Desc:
        'Tukang wc mampet cikarang profesional untuk mengatasi wc mampet dan sedot got / saluran cikarang yang tersumbat. Pelancaran saluran pipa tanpa biaya tambahan, hemat waktu dan biaya sedot septic tank cikarang Anda.',
      card2Cta: 'Pelajari',
      card3Title: 'Sedot Limbah Pabrik & Grease Trap',
      card3Desc:
        'Jasa sedot limbah cikarang dan sedot limbah pabrik cikarang untuk industri, pabrik, dan ruko. Termasuk layanan sedot grease trap cikarang, sedot wc jababeka, hingga kabupaten bekasi dengan standar kebersihan tinggi.',
      card3Cta: 'Hubungi Kami',
    },
    whyUs: {
      badge: 'KEUNGGULAN',
      title: 'Mengapa Memilih Jasa Kami?',
      subtitle:
        'Kami berkomitmen memberikan layanan sedot wc cikarang terdekat dengan tarif sedot wc cikarang yang transparan dan harga sedot wc cikarang paling murah.',
      card1Title: 'Sedot WC Cikarang 24 Jam',
      card1Desc:
        'Tim panggilan sedot wc cikarang siap melayani 24 jam penuh. Baik siang, malam, hari kerja, atau akhir pekan — kami siap datang langsung ke lokasi Anda di wilayah Cikarang jababeka, lippo, maupun deltamas.',
      card2Title: 'Respon Cepat 30 Menit',
      card2Desc:
        'Kami memahami urgensi saluran mampet. Pesan sedot wc cikarang via WhatsApp atau kontak/nomor telepon sedot wc cikarang, tim kami akan datang cepat 30 menit langsung ke alamat Anda.',
      card3Title: 'Harga Murah & Transparan',
      card3Desc:
        'Biaya sedot septic tank cikarang dan harga sedot wc cikarang per tangki sangat transparan. Tanpa biaya tambahan, sesuai kesepakatan di awal. Dapatkan tarif sedot wc cikarang paling murah bersama kami.',
      card4Title: 'Profesional & Bergaransi',
      card4Desc:
        'Layanan sedot wc cikarang bergaransi dan bebas bau. Ditangani tukang wc mampet cikarang berpengalaman dengan truk tangki modern, menjaga kebersihan lokasi kerja Anda sepenuhnya.',
    },
    faq: {
      badge: 'TANYA JAWAB',
      title: 'Pertanyaan yang Sering Diajukan (FAQ)',
      subtitle:
        'Informasi lengkap seputar interval perawatan septic tank, tanda-tanda penampungan penuh, dan jaminan transparansi harga layanan kami.',
      bannerTitle: 'Punya Pertanyaan Lain Terkait Masalah Kloset atau Septic Tank Anda?',
      bannerSubtitle:
        'Konsultasikan kendala saluran Anda secara gratis dengan tim teknisi kami selama 24 jam penuh.',
      bannerCta: 'Tanya Teknisi Sekarang',
      items: [
        {
          id: 1,
          question: 'Berapa lama interval ideal untuk menguras atau sedot septic tank secara berkala?',
          answerText:
            'Untuk rumah tangga standar berpenghuni 4–6 orang, interval ideal untuk menguras septic tank adalah setiap 1 hingga 2 tahun sekali. Pengurasan teratur mencegah penumpukan lumpur tinja padat yang dapat mengkristal (tinja mati) dan menyumbat pori-pori sumur resapan tanah. Bagi tempat usaha seperti ruko, restoran, warung makan, atau kontrakan/kos-kosan dengan intensitas pemakaian tinggi, pengurasan dianjurkan dilakukan setiap 6 hingga 12 bulan sekali.',
        },
        {
          id: 2,
          question: 'Apa saja tanda-tanda utama septic tank sudah penuh atau WC mulai tersumbat?',
          answerText: 'Beberapa tanda paling umum yang menunjukkan septic tank Anda perlu segera disedot meliputi:',
          bullets: [
            'Air kloset lambat turun atau menggenang lama saat disiram (flush), meskipun sudah diguyur air berulang kali.',
            'Timbul aroma bau busuk menyengat di sekitar area kamar mandi, kloset, atau lubang ventilasi septic tank.',
            'Terdengar suara gelembung udara ("gluk-gluk") di dalam pipa kloset sesaat setelah air disiram.',
            'Terdapat rembesan air limbah atau permukaan tanah di sekitar bak septic tank terasa becek dan lembap.',
            'Rumput atau tanaman di atas septic tank mendadak tumbuh sangat hijau dan subur secara abnormal akibat rembesan air limbah organik.',
          ],
        },
        {
          id: 3,
          question: 'Bagaimana transparansi tarif dan penentuan biaya sedot WC di Mitra Bersih 24Jam?',
          answerText:
            'Kami memegang komitmen 100% transparansi harga tanpa biaya tersembunyi. Sebelum armada truk tangki meluncur ke lokasi Anda di Cikarang, rincian biaya akan disepakati dan dikonfirmasi di awal melalui telepon atau WhatsApp. Kami tidak pernah memungut biaya siluman seperti ongkos jalan terpisah atau biaya tambahan saat membuka tutup bak kontrol. Anda dapat memilih tarif hitungan per tangki penuh atau paket penanganan saluran mampet bergaransi tuntas.',
        },
        {
          id: 4,
          question: 'Berapa lama waktu kedatangan tim setelah pemesanan dilakukan?',
          answerText:
            'Rata-rata waktu tempuh armada kami menuju lokasi adalah kurang lebih 30 menit setelah pesanan disepakati. Kami menyiagakan armada truk tangki di berbagai pos pangkalan strategis Cikarang (Cikarang Utara, Cikarang Selatan, Cikarang Barat, Cikarang Timur, Cikarang Pusat, hingga kawasan industri Jababeka, Lippo Cikarang, dan Deltamas) sehingga penanganan darurat dapat dilakukan secepat mungkin.',
        },
        {
          id: 5,
          question: 'Apakah proses penyedotan aman, tidak berisik, dan bebas dari bau tak sedap?',
          answerText:
            'Tentu saja! Mitra Bersih 24Jam menggunakan mesin pompa vakum modern bertekanan tinggi dengan selang penyedot spiral kedap udara (closed-circuit suction). Kotoran limbah langsung dialirkan masuk ke dalam tangki baja kedap tanpa tumpah dan tanpa menimbulkan polusi bau menyengat ke pemukiman tetangga Anda. Teknisi kami juga selalu membersihkan kembali area kerja hingga steril dan rapi.',
        },
        {
          id: 6,
          question: 'Bagaimana langkah mudah (DIY) memeriksa dan mengidentifikasi sumbatan ringan pada saluran WC atau pipa rumah?',
          answerText:
            'Anda dapat melakukan identifikasi mandiri (DIY) dengan 5 langkah praktis sebelum memanggil jasa sedot WC:',
          bullets: [
            '1. Uji Aliran Siram (Drain Flow Test): Tuang 1 ember air untuk memeriksa apakah air surut lambat (sumbatan lokal) atau tertahan total.',
            '2. Deteksi Suara Gelembung (Gurgling Test): Jika terdengar suara "gluk-gluk" di wastafel saat kloset disiram, sumbatan berada di pipa utama atau septic tank mulai penuh.',
            '3. Bersihkan Saringan Floor Drain & U-Trap: Angkat kotoran rambut dan buih sabun yang kerap menyumbat di kedalaman 10–20 cm pertama.',
            '4. Pembilasan Alami Soda Kue & Air Hangat: Tuang 1 cangkir baking soda dan cuka, diamkan 15 menit, lalu bilas air hangat untuk melunakkan lemak beku.',
            '5. Gunakan Plunger Manual: Pompa karet beberapa kali. Jika air tetap meluap atau muncul bau busuk pekat, segera hubungi teknisi profesional Mitra Bersih 24 Jam.',
          ],
        },
      ],
    },
    trustIndicators: {
      badge: 'STANDAR MUTU & LEGALITAS',
      title: 'Otoritas Profesional & Kepatuhan Resmi',
      subtitle:
        'Mitra Bersih 24Jam beroperasi dengan sertifikasi resmi, standar pengelolaan limbah ramah lingkungan, dan legalitas terverifikasi untuk menjamin keamanan higienis properti Anda.',
      card1Badge: 'ISO-Compliant Standard',
      card1Title: 'Standar Manajemen Mutu & Lingkungan (ISO-Compliant)',
      card1Desc:
        'Operasional penyedotan dan sanitasi kami selaras dengan standar mutu ISO 9001 (Quality Management) serta ISO 14001 (Environmental Management). Menjamin setiap tahap pengerjaan bebas dari risiko kontaminasi sekunder, kebocoran pipa, maupun polusi bau di pemukiman.',
      card1Bullets: [
        'SOP Penyedotan Tertutup (Closed Vacuum Suction)',
        'Inspeksi Tekanan Tangki & Katup Anti-Bocor Rutin',
        'Standar Sterilisasi & Disinfeksi Pasca-Pengerjaan',
      ],
      card2Badge: 'Licensed Environmental Partner',
      card2Title: 'Mitra Resmi Berizin Lingkungan Hidup',
      card2Desc:
        'Sebagai Licensed Environmental Partner resmi di wilayah Cikarang & Kabupaten Bekasi, kami mematuhi regulasi ketat pembuangan limbah domestik dan industri. 100% kotoran lumpur tinja dibuang langsung ke Instalasi Pengolahan Lumpur Tinja (IPLT) resmi pemerintah tanpa pernah dibuang liar ke sungai.',
      card2Bullets: [
        'Garansi Pembuangan 100% ke IPLT Resmi Pemerintah',
        'Nol Pembuangan Ilegal (Zero Illegal Dumping Policy)',
        'Manifest & Surat Jalan Pembuangan Limbah Sah',
      ],
      card3Badge: 'K3 Certified Technicians',
      card3Title: 'Teknisi Ahli Bersertifikasi K3 & Ruang Terbatas',
      card3Desc:
        'Semua teknisi lapangan dibekali sertifikasi keselamatan kerja K3 (Kesehatan & Keselamatan Kerja) serta pelatihan penanganan ruang terbatas (confined space). Terlatih mendeteksi gas berbahaya metana dan hidrogen sulfida (H2S) secara aman dan profesional.',
      card3Bullets: [
        'Perlengkapan APD & Detektor Gas Metana Lengkap',
        'Pengalaman Lapangan 15+ Tahun di Industri Sanitasi',
        'Tanggap Darurat & Pertolongan Pertama Terlatih',
      ],
      card4Badge: 'NIB & OSS Terverifikasi',
      card4Title: 'Legalitas Usaha Resmi & Faktur Perusahaan',
      card4Desc:
        'Memiliki izin berusaha resmi berbasis risiko melalui OSS (NIB terdaftar) dan perizinan armada truk tangki. Siap melayani kebutuhan korporasi, pabrik kawasan industri (Jababeka, MM2100, GIIC, EJIP, Deltamas), perkantoran, ruko, perhotelan, hingga instansi pemerintah dengan invoice resmi.',
      card4Bullets: [
        'Legalitas NIB, NPWP, & Izin Angkutan Limbah Resmi',
        'Penerbitan Invoice Resmi & Berita Acara Pekerjaan (BAP)',
        'Melayani Kontrak Perawatan Berkala (Maintenance Contract)',
      ],
      pillar1: 'ISO-Compliant',
      pillar1Sub: 'Standar Mutu 9001 & 14001',
      pillar2: 'IPLT Berizin',
      pillar2Sub: '100% Dikelola Legal',
      pillar3: 'Bebas Bau & Higienis',
      pillar3Sub: 'Pompa Vakum Kedap Udara',
      pillar4: 'Garansi Tertulis',
      pillar4Sub: 'Pengerjaan Tuntas Beres',
    },
    testimonials: {
      badge: 'TESTIMONI',
      title: 'Kepercayaan Pelanggan',
      subtitle:
        'Ribuan pelanggan telah mempercayai layanan sedot wc cikarang utara, selatan, barat, timur, dan pusat. Berikut testimoni mereka.',
      pill1: '98% Kepuasan',
      pill2: 'Respon Cepat',
      pill3: 'Bergaransi',
      reviews: [
        {
          name: 'Budi Santoso',
          location: 'Cikarang Utara',
          text: '"Pelayanannya sangat cepat dan profesional. Saya telepon malam, kurang dari 30 menit langsung datang. WC saya yang mampet langsung beres. Sedot wc cikarang terdekat yang pernah saya pakai!"',
          avatar: 'B',
        },
        {
          name: 'Siti Rahayu',
          location: 'Cikarang Barat',
          text: '"Harga transparan, tidak menaikkan tarif di tengah pekerjaan. Petugasnya ramah dan bersih. Biaya sedot septic tank cikarang sangat murah dan bergaransi. Terima kasih Mitra Bersih!"',
          avatar: 'S',
        },
        {
          name: 'Ahmad Hidayat',
          location: 'Cikarang Pusat - Ruko Jababeka',
          text: '"Sudah langganan untuk sedot limbah pabrik dan sedot grease trap di ruko restoran saya di Jababeka. Selalu tepat waktu, armada bersih, bebas bau. Sangat membantu kelancaran usaha."',
          avatar: 'A',
        },
        {
          name: 'Hendra Kurniawan',
          location: 'Lippo Cikarang',
          text: '"Kuras septic tank di perumahan kami berlangsung rapi tanpa merusak rumput taman. Selang panjang menjangkau lebih dari 40 meter dengan daya hisap vakum kuat dan tanpa bau menyengat."',
          avatar: 'H',
        },
        {
          name: 'Bambang Setiawan',
          location: 'Kawasan Industri MM2100',
          text: '"Pembersihan saluran limbah pabrik manufaktur kami ditangani dengan standar keselamatan K3 tinggi. Teknisi membawa APD lengkap dan menerbitkan dokumen Berita Acara serta faktur resmi."',
          avatar: 'B',
        },
        {
          name: 'Ratna Dewi',
          location: 'Cikarang Selatan - Grand Cikarang City',
          text: '"Layanan darurat tengah malam yang sangat membantu! Kloset meluap tiba-tiba, tim datang pukul 23:30 dan selesai dalam waktu singkat. Respon WhatsApp sangat cepat dan ramah."',
          avatar: 'R',
        },
      ],
    },
    blog: {
      badge: 'EDUKASI & TIPS SANITASI',
      title: 'Tips, Artikel & Panduan Saluran',
      subtitle:
        'Pelajari kiat praktis merawat pipa saluran pembuangan, tanda bahaya septic tank penuh, dan efisiensi pemakaian air dari teknisi profesional Mitra Bersih 24Jam.',
      readMore: 'Baca Selengkapnya',
      authorPrefix: 'Oleh:',
      proTipTitle: 'Saran Profesional Teknisi (Pro Tip):',
      modalCtaTitle: 'Mengalami Masalah Serupa di Wilayah Cikarang?',
      modalCtaDesc:
        'Tim teknisi Mitra Bersih 24Jam siap datang langsung dalam 30 menit dengan peralatan modern bebas bau.',
      modalCtaBtn: 'Konsultasi Masalah Ini',
      articles: [
        {
          id: 1,
          slug: 'penyebab-septic-tank-cepat-penuh',
          category: 'Perawatan Septic Tank',
          categoryIcon: 'fas fa-shield-virus',
          title: '5 Penyebab Utama Septic Tank Cepat Penuh & Cara Efektif Mencegahnya',
          summary:
            'Kenali faktor yang membuat bak penampungan tinja meluap sebelum waktunya, dari matinya bakteri pengurai hingga resapan tanah yang jenuh saat musim hujan.',
          readTime: '5 Menit Baca',
          date: '28 September 2024',
          author: 'Tim Teknisi Mitra Bersih',
          image:
            'https://z-cdn-media.chatglm.cn/files/8b35c692-dce0-460e-9c8c-12dc2dd28a67.jpg?auth_key=1891145358-528231c042254e76abb0a2a5a1e99a0b-0-6ba9fa9ff84c63ed8b7413f69005a108',
          content: {
            intro:
              'Banyak pemilik rumah di kawasan Cikarang dan sekitarnya mengeluhkan kloset yang sering mampet atau septic tank yang meluap padahal baru disedot beberapa bulan lalu. Padahal, septic tank yang sehat dan berfungsi baik mampu bertahan 1 hingga 2 tahun tanpa masalah jika dirawat dengan benar.',
            sections: [
              {
                heading: '1. Penggunaan Karbol & Pembersih Kimia Keras Berlebih',
                body: 'Septic tank bekerja mengandalkan koloni mikroorganisme anaerobik untuk mencerna dan mengurai kotoran padat menjadi cairan. Kebiasaan menuangkan pembersih kimia keras, karbol asam kuat, atau pemutih pakaian dalam jumlah banyak ke dalam kloset dapat membunuh bakteri pengurai tersebut, sehingga kotoran menumpuk menjadi lumpur padat (tinja mati) yang tidak terurai.',
              },
              {
                heading: '2. Membuang Sampah Non-Organik ke Lubang Kloset',
                body: 'Benda-benda seperti tisu basah, pembalut wanita, cotton bud, rambut rontok, dan puntung rokok tidak dapat terurai secara biologis di dalam septic tank. Sampah-sampah ini akan mengapung, menutupi permukaan cairan (scum layer), dan menyumbat pipa penghubung antar kompartemen.',
              },
              {
                heading: '3. Resapan Tanah Jenuh Akibat Muka Air Tanah Tinggi',
                body: 'Karakteristik tanah di beberapa wilayah Cikarang cenderung liat dan lambat menyerap air, terutama saat curah hujan tinggi. Ketika pori-pori tanah di sekitar sumur resapan jenuh air, cairan dari septic tank tidak dapat meresap keluar, memicu luapan air kotor kembali ke arah kloset rumah.',
              },
              {
                heading: '4. Kapasitas Tangki Tidak Seimbang dengan Penghuni',
                body: 'Banyak bangunan kontrakan, kos-kosan, atau rumah yang dihuni oleh banyak keluarga hanya mengandalkan septic tank ukuran 1 m³. Volume limbah yang masuk melebihi kapasitas penguraian harian, mempercepat kepenuhan tangki.',
              },
            ],
            proTip:
              'Tuangkan serbuk mikroba pengurai (bio-starter) secara berkala setiap 6 bulan sekali untuk meremajakan koloni bakteri pengurai, dan jadwalkan penyedotan rutin berkala 1–2 tahun sekali bersama Mitra Bersih 24Jam.',
          },
        },
        {
          id: 2,
          slug: 'panduan-merawat-pipa-plumbing-bebas-sumbatan',
          category: 'Plumbing Maintenance',
          categoryIcon: 'fas fa-faucet',
          title: 'Panduan Lengkap Merawat Pipa Saluran Air Rumah Bebas Sumbatan & Bebas Bau',
          summary:
            'Pipa wastafel cuci piring dan floor drain kamar mandi sering mampet akibat kerak lemak beku dan rambut. Simak solusi perawatan pipa tanpa merusak instalasi paralon PVC.',
          readTime: '4 Menit Baca',
          date: '15 September 2024',
          author: 'Spesialis Saluran Cikarang',
          image:
            'https://z-cdn-media.chatglm.cn/files/33748952-6a43-47b0-920c-c6cbbceeb719.jpg?auth_key=1891145358-97889be3a24546a2a9f0271e61e6a9a9-0-52fcb6d86bb0c9f1115d1978a78abc83',
          content: {
            intro:
              'Saluran pembuangan air kotor di rumah tangga merupakan urat nadi sanitasi tempat tinggal. Sayangnya, banyak orang baru memperhatikannya ketika air sudah meluap membanjiri lantai dapur atau kamar mandi.',
            sections: [
              {
                heading: '1. Hindari Penggunaan Soda Api Keras Berulang Kali',
                body: 'Soda api (natrium hidroksida) memang dapat melunakkan kotoran seketika melalui reaksi panas eksotermis. Namun, panas ekstrem yang dihasilkan dapat melunakkan, membengkokkan, dan bahkan melelehkan sambungan lem pipa PVC paralon di bawah lantai, mengakibatkan kebocoran tersembunyi ke pondasi rumah.',
              },
              {
                heading: '2. Metode Alami: Siraman Air Panas & Baking Soda',
                body: 'Untuk perawatan pencegahan mingguan pada wastafel dapur, taburkan 1 cangkir baking soda ke dalam lubang saringan, diamkan selama 10 menit, lalu siram dengan 2 liter air panas (bukan mendidih 100°C). Reaksi asam-basa ini ampuh mengikis lapisan lemak tipis sebelum mengeras membatu.',
              },
              {
                heading: '3. Pasang Saringan Rambut & Perangkap Lemak (Grease Trap)',
                body: 'Rambut yang rontok saat mandi merupakan penyebab 70% sumbatan pada floor drain kamar mandi. Pasang penutup saringan stainless steel berpori halus. Untuk ruko kuliner atau dapur rumah dengan intensitas masak tinggi, pemasangan grease trap mini di bawah bak cuci piring wajib dilakukan.',
              },
              {
                heading: '4. Rawat Leher Angsa (P-Trap) untuk Mencegah Bau Got',
                body: 'Pipa bengkok di bawah wastafel (P-trap) dirancang untuk menampung genangan air penyekat agar bau gas dari saluran got luar tidak masuk ke dalam rumah. Bersihkan endapan kotoran di leher angsa secara manual setiap 3 bulan sekali.',
              },
            ],
            proTip:
              'Jangan pernah menuang minyak jelantah sisa gorengan ke wastafel. Tampung minyak bekas di botol plastik tersendiri untuk didaur ulang.',
          },
        },
        {
          id: 3,
          slug: 'tips-hemat-air-ekosistem-septic-tank',
          category: 'Konservasi Air & Sanitasi',
          categoryIcon: 'fas fa-tint',
          title: 'Tips Hemat Air untuk Menjaga Keseimbangan Ekosistem Septic Tank Rumah',
          summary:
            'Beban air siraman yang berlebihan (hydraulic overload) dapat menghanyutkan bakteri pengurai dan membuat resapan tanah cepat jenuh. Begini cara efisiensi air yang tepat.',
          readTime: '4 Menit Baca',
          date: '02 September 2024',
          author: 'Konsultan Sanitasi Lingkungan',
          image:
            'https://z-cdn-media.chatglm.cn/files/55d24ab3-1d3c-4736-beb5-0371dc813146.jpg?auth_key=1891145358-c43c6073058c4960a42f5ce7d7cbd58b-0-dc68fbb11a48f6e16eedbe80d17bb7bd',
          content: {
            intro:
              'Banyak orang mengira semakin banyak air digelontorkan ke kloset, septic tank akan semakin bersih. Faktanya sebaliknya: beban hidrolik air yang berlebihan (hydraulic overload) justru merupakan salah satu musuh terbesar efektivitas kerja septic tank.',
            sections: [
              {
                heading: '1. Mengapa Air Berlebih Merusak Kinerja Septic Tank?',
                body: 'Lumpur kotoran memerlukan waktu tinggal (retention time) minimal 24 hingga 48 jam agar padatan mengendap dan terfermentasi oleh bakteri pengurai. Ketika air mengalir terlalu deras dan banyak, padatan tinja yang belum terurai akan ikut terseret keluar ke bak resapan, menutup pori-pori tanah hingga mampet total.',
              },
              {
                heading: '2. Beralih ke Sistem Kloset Dual-Flush',
                body: 'Kloset tipe tombol ganda (dual flush) hanya menggunakan 3 liter air untuk limbah cair (urin) dan 4,5–6 liter untuk limbah padat, menghemat hingga 40% pemakaian air dibanding kloset sistem tuas engkol konvensional yang menghabiskan 9–12 liter sekali siram.',
              },
              {
                heading: '3. Deteksi Kebocoran Tangki Kloset yang Tak Kasat Mata',
                body: 'Karet penutup tangki kloset (flapper seal) yang aus dapat membocorkan ratusan liter air bersih per hari tanpa suara langsung ke mangkuk kloset dan masuk ke septic tank. Lakukan tes sederhana: teteskan pewarna makanan ke dalam tangki kloset; jika dalam 15 menit mangkuk kloset berubah warna tanpa ditekan tombol siram, artinya terjadi kebocoran.',
              },
              {
                heading: '4. Atur Ritme Penggunaan Air Rumah Tangga',
                body: 'Hindari mencuci pakaian bertumpuk 5 kali sekaligus dalam satu hari di akhir pekan. Distribusikan jadwal mencuci baju secara merata sepanjang minggu agar sumur resapan tanah memiliki waktu jeda untuk menyerap air limbah deterjen secara optimal.',
              },
            ],
            proTip:
              'Hemat air tidak hanya menekan tagihan PDAM atau listrik pompa air, tetapi juga memperpanjang umur fungsi septic tank rumah Anda hingga bertahun-tahun lebih awet.',
          },
        },
      ],
    },
    gallery: {
      badge: 'DOKUMENTASI',
      title: 'Galeri Aktivitas Kami',
      subtitle:
        'Bukti nyata pengerjaan jasa sedot wc cikarang dan sedot tinja cikarang oleh tim profesional menggunakan truk tangki modern. Klik gambar untuk memperbesar.',
      items: [
        {
          id: 1,
          title: 'Kuras Septic Tank Cikarang',
          desc: 'Tim petugas membersihkan septic tank dengan truk sedot wc cikarang profesional.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/8b35c692-dce0-460e-9c8c-12dc2dd28a67.jpg?auth_key=1891145358-528231c042254e76abb0a2a5a1e99a0b-0-6ba9fa9ff84c63ed8b7413f69005a108',
          alt: 'Petugas sedot wc cikarang membersihkan septic tank',
        },
        {
          id: 2,
          title: 'Tim Teknisi Siaga',
          desc: 'Tiga teknisi berseragam lengkap bersiap melakukan tukang wc mampet cikarang.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/93764afb-0b78-41ec-9859-1723b7981014.jpg?auth_key=1891145358-e3036d2346f44ddab499d0ee91780c1a-0-4b5f27c73cf2fce784eeb806d23ef6e8',
          alt: 'Tukang wc mampet cikarang berdiri di depan truk',
        },
        {
          id: 3,
          title: 'Sedot Got / Saluran Cikarang',
          desc: 'Pengerjaan pelancaran saluran tersumbat di area perumahan Cikarang.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/33748952-6a43-47b0-920c-c6cbbceeb719.jpg?auth_key=1891145358-97889be3a24546a2a9f0271e61e6a9a9-0-52fcb6d86bb0c9f1115d1978a78abc83',
          alt: 'Sedot got dan saluran cikarang di area perkotaan',
        },
        {
          id: 4,
          title: 'Operasi Armada Sedot Limbah',
          desc: 'Petugas mengoperasikan pompa penyedot pada truk tangki modern kami.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/c701d28f-9ce6-410f-9af1-5bdf6bd82fe4.jpg?auth_key=1891145358-f10d651607cc4ebcb600e88f06f3eda9-0-cadac15e64fade2d6e42565a9da55f4d',
          alt: 'Petugas mengoperasikan truk sedot limbah pabrik cikarang',
        },
        {
          id: 5,
          title: 'Inspeksi Saluran',
          desc: 'Teknisi memeriksa kondisi saluran limbah di area perumahan Cikarang.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/55d24ab3-1d3c-4736-beb5-0371dc813146.jpg?auth_key=1891145358-c43c6073058c4960a42f5ce7d7cbd58b-0-dc68fbb11a48f6e16eedbe80d17bb7bd',
          alt: 'Pengecekan saluran pipa oleh jasa sedot wc cikarang',
        },
        {
          id: 6,
          title: 'Pembukaan Manhole',
          desc: 'Proses aman membuka tutup bak kontrol untuk sedot tinja cikarang.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/7efc89d8-0f13-443c-b203-82f00182f517.jpg?auth_key=1891145358-ac532b14e237478a9e2694802c0403b7-0-9e00006dc0a7880924b28ad916f7fb47',
          alt: 'Petugas membuka tutup septic tank untuk kuras septic tank cikarang',
        },
        {
          id: 7,
          title: 'Operasi Selang Sedot',
          desc: 'Menjalankan selang penyedot limbah cair secara hati-hati dan terukur.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/ea99f8ec-d5af-4248-ac08-f9e15af12faf.jpg?auth_key=1891145358-f34e05e963b846bfb3a011ad42d52dd8-0-41fecceb77c1fcf170cfb796fe654b60',
          alt: 'Pekerja mengoperasikan selang sedot wc cikarang per tangki',
        },
        {
          id: 8,
          title: 'Armada Mitra Bersih',
          desc: 'Truk penyedot kuning kami siaga di lokasi untuk mengerjakan tugas.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/dca59c1c-5058-4fc6-8a6a-b9eef25523d9.jpg?auth_key=1891145358-8db531af9f664f438a0ec864ebb08085-0-365027590c53c23da998bea53eecf486',
          alt: 'Truk sedot wc cikarang bergaransi kuning Mitra Bersih',
        },
      ],
    },
    area: {
      badge: 'WILAYAH LAYANAN',
      title: 'Area Layanan Sedot WC Cikarang',
      subtitle:
        'Kami melayani sedot wc cikarang utara, selatan, barat, timur, dan pusat. Termasuk Cibitung, Tambun, hingga Kabupaten Bekasi.',
      illustrationTitle: 'Cikarang & Sekitarnya',
      illustrationDesc:
        'Cakupan area layanan kami meliputi seluruh kecamatan di Cikarang (Pusat, Selatan, Timur, Utara, Barat) beserta area perkembangan seperti Jababeka, Lippo Cikarang, dan Deltamas dengan waktu tempuh tercepat.',
      emergencyBadge: 'Respon Darurat',
      emergencyDesc:
        'Butuh kedatangan langsung ke lokasi dalam 30 menit? Hubungi call center siaga kami sekarang.',
      emergencyBtn: 'Panggil Armada Cepat',
      searchPlaceholder: 'Cari kelurahan/desa (cth: Sukamahi, Cibatu, Jababeka)...',
      searchReset: 'Reset',
      notFoundPrefix: 'Tidak ditemukan area "',
      notFoundSuffix:
        '". Namun armada kami tetap melayani seluruh penjuru Cikarang & Bekasi!',
      villagesLabel: 'Kelurahan/Desa',
      moreLabel:
        'Juga melayani Cibitung, Tambun, Sertajaya, Jababeka, Lippo Cikarang, Deltamas & Kabupaten Bekasi',
    },
    form: {
      badge: 'ESTIMASI BIAYA GRATIS',
      title: 'Konsultasikan Masalah Saluran Anda Dalam 1 Menit',
      subtitle:
        'Pilih jenis layanan dan lokasi Anda di Cikarang. Tim teknisi Mitra Bersih 24Jam akan segera memberikan estimasi biaya transparan dan menjadwalkan kedatangan truk tangki.',
      guarantee1: 'Tanpa Biaya Tersembunyi',
      guarantee2: 'Bergaransi Kerja Tuntas',
      guarantee3: 'Truk Tangki Modern Bebas Bau',
      serviceLabel: 'Jenis Kebutuhan Layanan',
      serviceOptions: [
        { label: 'Sedot Septic Tank Rumah Tangga', value: 'Sedot Septic Tank Rumah Tangga' },
        { label: 'Sedot WC Mampet / Saluran Tersumbat', value: 'Sedot WC Mampet / Saluran Tersumbat' },
        { label: 'Sedot Limbah Pabrik / Industri', value: 'Sedot Limbah Pabrik / Industri' },
        { label: 'Sedot Grease Trap Lemak Ruko / Resto', value: 'Sedot Grease Trap Lemak Ruko / Resto' },
        { label: 'Kuras Got & Saluran Air', value: 'Kuras Got & Saluran Air' },
      ],
      areaLabel: 'Wilayah / Kecamatan Cikarang',
      areaOptions: [
        { label: 'Cikarang Utara', value: 'Cikarang Utara' },
        { label: 'Cikarang Selatan (Jababeka / Lippo)', value: 'Cikarang Selatan (Jababeka / Lippo)' },
        { label: 'Cikarang Barat', value: 'Cikarang Barat' },
        { label: 'Cikarang Pusat (Deltamas)', value: 'Cikarang Pusat (Deltamas)' },
        { label: 'Cikarang Timur', value: 'Cikarang Timur' },
        { label: 'Cibitung / Tambun / Kab. Bekasi', value: 'Cibitung / Tambun / Kab. Bekasi' },
      ],
      detailLabel: 'Detail Lokasi / Keluhan',
      detailPlaceholder: 'Contoh: Nama perumahan, RT/RW atau masalah mampet total',
      submitBtn: 'KIRIM ESTIMASI VIA WHATSAPP (GRATIS)',
    },
    footer: {
      contactTitle: 'Informasi Kontak',
      phoneLabel: 'Kontak/Nomor Telepon Sedot WC Cikarang',
      waLabel: 'Sedot WC Cikarang WhatsApp',
      emailLabel: 'Email',
      locationLabel: 'Area Layanan Utama',
      locationVal: 'Cikarang, Kabupaten Bekasi',
      servicesTitle: 'Layanan',
      othersTitle: 'Lainnya',
      rightsReserved: 'Mitra Bersih 24Jam. All Rights Reserved.',
    },
    chatWidget: {
      launcherTooltip: 'Tanya Teknisi (Online 24 Jam)',
      agentName: 'Mitra Bersih Siaga 24 Jam',
      agentRole: 'Teknisi Sanitasi & Armada Cikarang',
      agentStatus: 'Online · Respon dalam hitungan detik',
      timeTag: 'Hari ini',
      greetingText:
        'Halo! 👋 Butuh jasa sedot WC, kuras septic tank, atau pelancaran pipa mampet di area Cikarang? Tim kami siap tiba di lokasi dalam 30 menit. Ketik pesan atau pilih topik cepat berikut:',
      quickPill1: 'WC Mampet Total',
      quickPill2: 'Kuras Septic Tank Penuh',
      quickPill3: 'Sedot Limbah Pabrik / Ruko',
      quickPill4: 'Cek Biaya & Estimasi Cepat',
      inputPlaceholder: 'Ketik pesan atau keluhan Anda...',
      sendBtn: 'Kirim ke WhatsApp',
      footerNote: 'Tersambung langsung ke WhatsApp teknisi resmi Mitra Bersih 24 Jam',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'Why Us',
      faq: 'FAQ',
      certifications: 'Compliance',
      blog: 'Tips & Articles',
      gallery: 'Gallery',
      contact: 'Contact',
      hotline: '24/7 Hotline',
    },
    hero: {
      badge: 'Online Now · Rapid Dispatch Across Cikarang',
      titleMain: 'CIKARANG SEPTIC TANK SERVICE',
      titleBrand: 'MITRA BERSIH 24 HOURS',
      highlight:
        'Professional 24/7 septic tank pumping, clogged toilet clearing, grease trap hauling & factory wastewater services in Cikarang. Guaranteed work, rapid 30-min arrival, transparent rates, and 100% odor-free vacuum technology!',
      cta: 'BOOK SEPTIC SERVICE · +62 857-1565-4183',
      stat1Val: '24/7',
      stat1Label: 'Standby Service',
      stat2Val: '15+',
      stat2Label: 'Years Experience',
      stat3Val: '5000+',
      stat3Label: 'Satisfied Clients',
      tag1: 'Guaranteed Service',
      tag2: '30-Min Rapid Arrival',
    },
    services: {
      badge: 'OUR SERVICES',
      title: 'Complete Solutions for\nAll Drainage & Septic Issues',
      subtitle:
        'Providing professional septic tank emptying, pipe unclogging, factory wastewater hauling, and grease trap servicing across Cikarang industrial estates and residential complexes with modern vacuum tankers.',
      card1Title: 'Septic Tank Pumping & Emptying',
      card1Desc:
        'Full septic tank pumping and sludge extraction using modern high-power vacuum trucks. Swift, odorless, and zero pavement demolition. Serving residential homes, shophouses, Jababeka, Lippo Cikarang, and Deltamas.',
      card1Cta: 'Book Service',
      card2Title: 'Clogged Toilet & Drain Clearing',
      card2Desc:
        'Specialized mechanical unclogging for blocked toilet pans, bathroom floor drains, and sewer pipes. Clean clearing without damaging PVC plumbing lines or tiles, saving you costly pipe replacement.',
      card2Cta: 'Learn More',
      card3Title: 'Industrial Wastewater & Grease Trap Hauling',
      card3Desc:
        'Industrial effluent and commercial grease trap pumping for factories, industrial parks, hotels, and restaurant chains. Compliant with strict Bekasi environmental hygiene and safety regulations.',
      card3Cta: 'Contact Us',
    },
    whyUs: {
      badge: 'WHY CHOOSE US',
      title: 'Why Work With Mitra Bersih?',
      subtitle:
        'We are committed to delivering the fastest, most reliable sanitation service in Cikarang with completely upfront pricing and verified environmental compliance.',
      card1Title: '24/7 Emergency Availability',
      card1Desc:
        'Our emergency dispatch team is ready 24 hours a day, 7 days a week. Day or night, weekdays or weekends — we arrive promptly at your factory, office, or residential estate across Cikarang.',
      card2Title: 'Fast 30-Minute Response',
      card2Desc:
        'Drainage emergencies require prompt action. Book easily via WhatsApp or direct phone call, and our dedicated vacuum truck will arrive on-site in approximately 30 minutes.',
      card3Title: 'Transparent & Honest Pricing',
      card3Desc:
        'Fixed, upfront quotes with zero hidden charges. No surprise charges for access opening or pipe unrolling. Experience fair, transparent sanitation rates agreed upon before departure.',
      card4Title: 'Certified & Guaranteed Service',
      card4Desc:
        'Fully warrantied, odor-free sanitation delivered by certified K3 safety technicians operating state-of-the-art closed vacuum tankers, preserving absolute cleanliness at your premises.',
    },
    faq: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      title: 'Common Questions & Answers (FAQ)',
      subtitle:
        'Essential guidelines on septic tank maintenance intervals, signs of a full tank, and our commitment to complete pricing transparency.',
      bannerTitle: 'Have Questions About Your Facility or Home Septic System?',
      bannerSubtitle:
        'Speak directly with our senior sanitation technicians anytime 24 hours a day for complimentary technical advice.',
      bannerCta: 'Chat With Technician Now',
      items: [
        {
          id: 1,
          question: 'What is the recommended interval for routine septic tank pumping?',
          answerText:
            'For a typical household with 4–6 residents, the ideal pumping interval is every 1 to 2 years. Regular maintenance prevents heavy sludge buildup from solidifying and sealing soil percolation trenches. For high-occupancy commercial properties, boarding houses, restaurants, and factory cafeterias, routine inspection and pumping is strongly recommended every 6 to 12 months.',
        },
        {
          id: 2,
          question: 'What are the main warning signs that a septic tank is full or failing?',
          answerText: 'The most frequent symptoms indicating an urgent need for septic pumping include:',
          bullets: [
            'Toilet drains slowly or backs up repeatedly despite repeated water flushing.',
            'Persistent sewage odors detectable around bathrooms, drains, or outdoor inspection manholes.',
            'Audible gurgling bubbling sounds coming from toilet bowls or pipes following a flush.',
            'Damp, soggy soil or wastewater pooling on the ground above the septic tank drainfield.',
            'Unusually lush, dark green grass patches growing above the septic area due to sub-surface wastewater saturation.',
          ],
        },
        {
          id: 3,
          question: 'How transparent is your pricing structure and billing process?',
          answerText:
            'We guarantee 100% upfront pricing with zero hidden surcharges. Before our tanker is dispatched to your Cikarang premises, total costs are verified and agreed via phone or WhatsApp. We never levy arbitrary fees for distance or manhole inspection covers. Clients may select full-tanker fixed rates or specialized unclogging service packages with written satisfaction warranties.',
        },
        {
          id: 4,
          question: 'How quickly can your vacuum tanker arrive after booking?',
          answerText:
            'Our average transit time is approximately 30 minutes following order confirmation. We maintain strategically positioned tanker depots across Cikarang North, South, West, East, Central, and major industrial hubs including Jababeka, Lippo Cikarang, MM2100, and Deltamas for rapid emergency response.',
        },
        {
          id: 5,
          question: 'Is the pumping process safe, hygienic, and free of unpleasant odors?',
          answerText:
            'Yes, absolutely. Mitra Bersih 24Jam utilizes heavy-duty modern vacuum pumps coupled with sealed airtight spiral suction hoses (closed-circuit suction). Sludge and effluent are transferred directly into enclosed steel tankers with zero spillage and zero offensive odors affecting neighbors or adjacent factory workshops. Our technicians thoroughly disinfect the workspace upon completion.',
        },
        {
          id: 6,
          question: 'What are simple DIY steps to identify and inspect minor plumbing clogs at home?',
          answerText:
            'You can easily diagnose minor plumbing or toilet clogs using 5 simple DIY steps before calling a professional vacuum service:',
          bullets: [
            '1. Drain Flow Test: Pour a bucket of water down the fixture to check if it drains slowly (minor local block) or completely backs up.',
            '2. Air Gurgling Inspection: Listen for bubbling or gurgling sounds in sink basins when flushing the toilet, indicating main vent pipe backpressure or a full septic tank.',
            '3. Clean Floor Drain Strainers & P-Traps: Remove tangled hair, lint, and soap buildup from the first 10–20 cm of the drain.',
            '4. Natural Baking Soda & Warm Water Flush: Pour 1 cup of baking soda and vinegar, wait 15 minutes, then flush with warm water to dissolve solidified grease.',
            '5. Use a Rubber Plunger: Apply firm plunges. If water continues to overflow or strong foul odors persist, contact Mitra Bersih 24/7 technicians for professional clearing.',
          ],
        },
      ],
    },
    trustIndicators: {
      badge: 'QUALITY STANDARDS & COMPLIANCE',
      title: 'Professional Authority & Legal Compliance',
      subtitle:
        'Mitra Bersih 24Jam operates with official environmental permits, ISO-compliant management frameworks, and verified corporate licensing to safeguard your facility hygiene.',
      card1Badge: 'ISO-Compliant Standard',
      card1Title: 'Quality & Environmental Standards (ISO-Compliant)',
      card1Desc:
        'Our pumping and waste handling procedures strictly follow ISO 9001 (Quality Management) and ISO 14001 (Environmental Management) standards, ensuring each operation is executed without secondary contamination, leakage, or neighborhood air pollution.',
      card1Bullets: [
        'Closed Vacuum Suction Standard Operating Procedure',
        'Routine Tank Pressure & Anti-Leak Valve Inspection',
        'Complete Post-Service Sanitization & Disinfection',
      ],
      card2Badge: 'Licensed Environmental Partner',
      card2Title: 'Licensed Environmental Partner (Govt. IPLT)',
      card2Desc:
        'As an officially recognized environmental partner in Cikarang & Bekasi Regency, 100% of collected septage is transported directly to authorized government wastewater treatment plants (IPLT). We enforce a strict Zero Illegal Dumping Policy.',
      card2Bullets: [
        'Guaranteed 100% Disposal to Official Government Treatment Plants',
        'Zero Illegal Dumping Policy Enforced & Monitored',
        'Legitimate Environmental Waste Manifest & Transport Slips Provided',
      ],
      card3Badge: 'K3 Certified Technicians',
      card3Title: 'Certified K3 Occupational Safety & Confined Space Team',
      card3Desc:
        'All field technicians hold national K3 occupational safety credentials and specialized training in hazardous confined space entry. Trained to detect toxic methane and hydrogen sulfide (H2S) gases safely and professionally.',
      card3Bullets: [
        'Complete PPE Safety Gear & Methane Gas Detectors',
        '15+ Years Industrial Sanitation Field Expertise',
        'Certified First Aid & Industrial Emergency Response',
      ],
      card4Badge: 'OSS & NIB Verified',
      card4Title: 'Official Corporate Entity & Corporate Invoicing',
      card4Desc:
        'Officially registered through Indonesia Online Single Submission (OSS/NIB) with licensed industrial transport permits. Ready to support multinational factories in Jababeka, MM2100, GIIC, EJIP, Deltamas, hotels, and corporate offices with official tax invoices and work completion reports.',
      card4Bullets: [
        'Verified Tax ID (NPWP), Business License (NIB), & Transport Permits',
        'Official Corporate Invoicing & Work Completion Reports (BAP)',
        'Routine Scheduled Preventative Maintenance Contracts (PO/WO)',
      ],
      pillar1: 'ISO-Compliant',
      pillar1Sub: 'Quality 9001 & 14001 Standards',
      pillar2: 'Licensed Treatment',
      pillar2Sub: '100% Legally Processed',
      pillar3: 'Odorless & Clean',
      pillar3Sub: 'Closed Vacuum Technology',
      pillar4: 'Written Warranty',
      pillar4Sub: 'Complete Problem Resolution',
    },
    testimonials: {
      badge: 'TESTIMONIALS',
      title: 'Customer Trust & Satisfaction',
      subtitle:
        'Thousands of local homeowners and multinational plant managers trust our prompt services across Cikarang. Here is what they have to say.',
      pill1: '98% Satisfaction',
      pill2: 'Fast Response',
      pill3: 'Guaranteed Work',
      reviews: [
        {
          name: 'Kenji Takahashi',
          location: 'Jababeka Industrial Estate',
          text: '"Very professional service for our factory staff dormitories and plant grease traps. Arrived in under 30 minutes with clean equipment and provided official corporate receipts."',
          avatar: 'K',
        },
        {
          name: 'Siti Rahayu',
          location: 'West Cikarang',
          text: '"Completely transparent pricing without sudden markups during work. The crew was respectful, courteous, and left our bathroom clean. Highly recommended in Cikarang!"',
          avatar: 'S',
        },
        {
          name: 'David Miller',
          location: 'Lippo Cikarang Residential',
          text: '"Called them late evening for a severely backed up main sewer line. Fast arrival, clean odorless suction truck, and solved the blockage immediately. Excellent English communication via WhatsApp."',
          avatar: 'D',
        },
        {
          name: 'Min-Jun Park',
          location: 'EJIP Industrial Park',
          text: '"Scheduled routine septic maintenance for our industrial facility. Full compliance documentation provided, K3 certified technicians, and prompt professional execution."',
          avatar: 'M',
        },
        {
          name: 'Anita Wijaya',
          location: 'Deltamas - Cikarang Pusat',
          text: '"Vacuum hose reached over 40 meters to our septic tank without spilling a drop. Zero lingering odors, pristine clean work, and completely hassle-free from start to finish."',
          avatar: 'A',
        },
        {
          name: 'Robert Jenkins',
          location: 'Kota Deltamas Residential',
          text: '"Fast emergency response on Sunday morning. Transparent upfront pricing and verified disposal at a legal government IPLT facility. Outstanding peace of mind."',
          avatar: 'R',
        },
      ],
    },
    blog: {
      badge: 'EDUCATION & SANITATION GUIDES',
      title: 'Plumbing Tips, Articles & Guides',
      subtitle:
        'Learn practical guidelines on sewer maintenance, identifying septic failure indicators, and water conservation strategies from Mitra Bersih certified technicians.',
      readMore: 'Read Full Guide',
      authorPrefix: 'By:',
      proTipTitle: 'Master Technician Pro Tip:',
      modalCtaTitle: 'Experiencing Similar Issues in Cikarang?',
      modalCtaDesc:
        'Mitra Bersih 24Jam technicians are on standby to arrive at your facility or home within 30 minutes with odorless vacuum tankers.',
      modalCtaBtn: 'Consult on This Issue',
      articles: [
        {
          id: 1,
          slug: 'penyebab-septic-tank-cepat-penuh',
          category: 'Septic Maintenance',
          categoryIcon: 'fas fa-shield-virus',
          title: '5 Common Reasons Septic Tanks Overflow Prematurely & How to Prevent Them',
          summary:
            'Discover why residential and industrial septic tanks back up early, from beneficial bacteria die-off caused by harsh bleach to saturated clay soil during monsoon seasons.',
          readTime: '5 Min Read',
          date: 'September 28, 2024',
          author: 'Mitra Bersih Technical Team',
          image:
            'https://z-cdn-media.chatglm.cn/files/8b35c692-dce0-460e-9c8c-12dc2dd28a67.jpg?auth_key=1891145358-528231c042254e76abb0a2a5a1e99a0b-0-6ba9fa9ff84c63ed8b7413f69005a108',
          content: {
            intro:
              'Many expatriate residents and homeowners across Cikarang experience recurring toilet backups just months after routine service. A properly balanced septic tank system should operate smoothly for 1 to 2 years when maintained correctly.',
            sections: [
              {
                heading: '1. Excessive Chemical Cleaners Killing Essential Bacteria',
                body: 'Septic tanks rely on colonies of anaerobic microorganisms to digest solid waste into manageable liquids. Pouring excessive amounts of chlorine bleach, concentrated acidic disinfectants, or harsh drain cleaners destroys this living ecosystem, allowing undigested solids to solidify into dense sludge layers.',
              },
              {
                heading: '2. Flushing Non-Biodegradable Items Down Toilets',
                body: 'Wet wipes, hygiene pads, cotton buds, cigarette butts, and paper towels do not break down biologically. They create floating crust layers (scum) and obstruct baffle transfer pipes between tank chambers.',
              },
              {
                heading: '3. Soil Drainfield Saturation During Heavy Rain',
                body: 'Cikarang clay soils have slow percolation rates during the tropical rainy season. When surrounding soil beds become waterlogged, effluent cannot absorb, causing wastewater to back up into ground floor plumbing fixtures.',
              },
              {
                heading: '4. System Capacity Mismatched with Occupancy Loads',
                body: 'Rented staff accommodation and converted commercial properties often operate with undersized septic tanks designed for modest single families. Excess daily influent volume outpaces bacterial digestion cycles.',
              },
            ],
            proTip:
              'Apply biological bacterial additives (bio-starters) every 6 months to replenish active digestive microbes, and book routine professional pumping every 1–2 years with Mitra Bersih 24Jam.',
          },
        },
        {
          id: 2,
          slug: 'panduan-merawat-pipa-plumbing-bebas-sumbatan',
          category: 'Plumbing Maintenance',
          categoryIcon: 'fas fa-faucet',
          title: 'Comprehensive Guide to Keeping Residential & Commercial Drains Clog-Free',
          summary:
            'Kitchen sink pipes and bathroom floor drains frequently choke on solidified grease and hair. Learn how to maintain drainage lines without damaging PVC pipe joints.',
          readTime: '4 Min Read',
          date: 'September 15, 2024',
          author: 'Cikarang Drainage Specialist',
          image:
            'https://z-cdn-media.chatglm.cn/files/33748952-6a43-47b0-920c-c6cbbceeb719.jpg?auth_key=1891145358-97889be3a24546a2a9f0271e61e6a9a9-0-52fcb6d86bb0c9f1115d1978a78abc83',
          content: {
            intro:
              'Sanitary drainage piping is the lifeline of any modern home or corporate canteen. Unfortunately, facility managers often only notice them once wastewater overflows into food prep areas or office washrooms.',
            sections: [
              {
                heading: '1. Avoid Repeated Use of Caustic Soda (Lye)',
                body: 'Granular caustic soda creates extreme exothermic heat to dissolve organic debris. However, this intense thermal spike frequently softens, warps, and dissolves PVC pipe glue joints concealed beneath concrete floors, causing destructive hidden water leaks into foundations.',
              },
              {
                heading: '2. Natural Preventative Method: Baking Soda & Hot Water Flush',
                body: 'For weekly kitchen sink maintenance, pour 1 cup of baking soda into the strainer, let it rest for 10 minutes, then follow with 2 liters of hot water (below boiling point). This mild effervescent reaction strips fatty residues before they harden into stubborn fatbergs.',
              },
              {
                heading: '3. Install Fine Strainers & Commercial Grease Traps',
                body: 'Hair shedding accounts for over 70% of bathroom floor drain clogs. Use stainless steel fine mesh strainers. For commercial restaurant kitchens or high-volume canteens, an under-sink grease trap is an absolute necessity.',
              },
              {
                heading: '4. Maintain P-Traps to Block Sewer Gas Intrusion',
                body: 'The curved pipe beneath basins (P-trap) maintains a crucial water seal that blocks toxic foul sewer gases from entering indoor living spaces. Disassemble and clear sediment from the P-trap every 3 months.',
              },
            ],
            proTip:
              'Never pour leftover cooking oil or grease into sink drains. Collect used cooking oil in separate containers for recycling.',
          },
        },
        {
          id: 3,
          slug: 'tips-hemat-air-ekosistem-septic-tank',
          category: 'Water Conservation',
          categoryIcon: 'fas fa-tint',
          title: 'Smart Water Conservation Practices to Protect Your Septic Tank Ecosystem',
          summary:
            'Excessive flushing volume (hydraulic overload) washes away essential bacteria and floods absorption trenches. Learn proper water management tactics.',
          readTime: '4 Min Read',
          date: 'September 2, 2024',
          author: 'Environmental Sanitation Consultant',
          image:
            'https://z-cdn-media.chatglm.cn/files/55d24ab3-1d3c-4736-beb5-0371dc813146.jpg?auth_key=1891145358-c43c6073058c4960a42f5ce7d7cbd58b-0-dc68fbb11a48f6e16eedbe80d17bb7bd',
          content: {
            intro:
              'Many people assume that flushing huge amounts of water keeps septic tanks cleaner. In reality, excessive hydraulic volume is one of the most common causes of premature septic drainfield failure.',
            sections: [
              {
                heading: '1. Why Excess Water Impairs Septic Performance',
                body: 'Raw wastewater requires a minimum 24 to 48-hour retention period inside the primary chamber for solids to settle and undergo bacterial fermentation. When water surges through too rapidly, unsettled solids wash directly into absorption trenches, blinding soil pores permanently.',
              },
              {
                heading: '2. Upgrade to Dual-Flush Toilet Mechanisms',
                body: 'Dual-flush toilets use only 3 liters for liquid flushes and 4.5–6 liters for solids, slashing water usage by up to 40% compared with older 9–12 liter single-lever cisterns.',
              },
              {
                heading: '3. Detecting Silent Cistern Leaks',
                body: 'A worn flapper seal inside a toilet cistern can silently waste hundreds of liters of clean water daily straight into the septic tank. Test easily: add food coloring to the cistern tank; if color appears in the bowl within 15 minutes without flushing, replace the seal immediately.',
              },
              {
                heading: '4. Stagger High-Volume Laundry Cycles',
                body: 'Avoid running 5 continuous heavy laundry loads in a single morning. Spread washing machine runs evenly across the week so absorption fields have ample rest intervals to absorb detergent wastewater.',
              },
            ],
            proTip:
              'Conserving water not only trims utility bills, but directly extends the lifespan and efficiency of your property septic infrastructure by years.',
          },
        },
      ],
    },
    gallery: {
      badge: 'ON-SITE DOCUMENTATION',
      title: 'Our Service Operations Gallery',
      subtitle:
        'Live photographic evidence of professional septic pumping and pipeline clearing operations in Cikarang with modern vacuum trucks. Click to expand.',
      items: [
        {
          id: 1,
          title: 'Septic Tank Emptying in Cikarang',
          desc: 'Specialized crew pumping and sanitizing residential septic chambers with vacuum tankers.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/8b35c692-dce0-460e-9c8c-12dc2dd28a67.jpg?auth_key=1891145358-528231c042254e76abb0a2a5a1e99a0b-0-6ba9fa9ff84c63ed8b7413f69005a108',
          alt: 'Technician pumping septic tank in Cikarang',
        },
        {
          id: 2,
          title: 'Rapid Response Technician Crew',
          desc: 'Uniformed professional technicians equipped for emergency drain unclogging.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/93764afb-0b78-41ec-9859-1723b7981014.jpg?auth_key=1891145358-e3036d2346f44ddab499d0ee91780c1a-0-4b5f27c73cf2fce784eeb806d23ef6e8',
          alt: 'Cikarang drain clearing technicians standing before vacuum truck',
        },
        {
          id: 3,
          title: 'Sewer & Main Line Clearing',
          desc: 'Clearing choked main drainage pipelines in Cikarang residential estates.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/33748952-6a43-47b0-920c-c6cbbceeb719.jpg?auth_key=1891145358-97889be3a24546a2a9f0271e61e6a9a9-0-52fcb6d86bb0c9f1115d1978a78abc83',
          alt: 'Sewer line jetting and clearing operation in Cikarang',
        },
        {
          id: 4,
          title: 'Industrial Tanker Operations',
          desc: 'Operating high-pressure vacuum pump units on our modern fleet.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/c701d28f-9ce6-410f-9af1-5bdf6bd82fe4.jpg?auth_key=1891145358-f10d651607cc4ebcb600e88f06f3eda9-0-cadac15e64fade2d6e42565a9da55f4d',
          alt: 'Operator running industrial vacuum wastewater pump',
        },
        {
          id: 5,
          title: 'Pipeline Inspection',
          desc: 'Technicians inspecting wastewater pipeline integrity in residential complexes.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/55d24ab3-1d3c-4736-beb5-0371dc813146.jpg?auth_key=1891145358-c43c6073058c4960a42f5ce7d7cbd58b-0-dc68fbb11a48f6e16eedbe80d17bb7bd',
          alt: 'Drain line diagnostic inspection by service crew',
        },
        {
          id: 6,
          title: 'Inspection Manhole Accessing',
          desc: 'Carefully accessing concrete manholes without damaging finished flooring tiles.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/7efc89d8-0f13-443c-b203-82f00182f517.jpg?auth_key=1891145358-ac532b14e237478a9e2694802c0403b7-0-9e00006dc0a7880924b28ad916f7fb47',
          alt: 'Opening manhole cover for septic suction',
        },
        {
          id: 7,
          title: 'Suction Hose Deployment',
          desc: 'Carefully handling spiral suction lines with airtight seals for zero odor leakage.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/ea99f8ec-d5af-4248-ac08-f9e15af12faf.jpg?auth_key=1891145358-f34e05e963b846bfb3a011ad42d52dd8-0-41fecceb77c1fcf170cfb796fe654b60',
          alt: 'Worker managing suction hose for septic tank pumping',
        },
        {
          id: 8,
          title: 'Mitra Bersih Fleet Tanker',
          desc: 'Signature yellow vacuum truck ready on-site for immediate dispatch.',
          imageUrl:
            'https://z-cdn-media.chatglm.cn/files/dca59c1c-5058-4fc6-8a6a-b9eef25523d9.jpg?auth_key=1891145358-8db531af9f664f438a0ec864ebb08085-0-365027590c53c23da998bea53eecf486',
          alt: 'Yellow Mitra Bersih vacuum truck in Cikarang',
        },
      ],
    },
    area: {
      badge: 'COVERAGE REGIONS',
      title: 'Cikarang Service Coverage Area',
      subtitle:
        'We cover North, South, West, East, and Central Cikarang, including Cibitung, Tambun, and all Bekasi Regency industrial zones.',
      illustrationTitle: 'Cikarang & Industrial Estates',
      illustrationDesc:
        'Full service coverage across all Cikarang districts including major industrial hubs like Jababeka 1-7, Lippo Cikarang, GIIC, EJIP, MM2100, and Deltamas with guaranteed rapid arrival.',
      emergencyBadge: 'Emergency Dispatch',
      emergencyDesc:
        'Require immediate on-site arrival within 30 minutes? Call our 24-hour English-friendly dispatch team now.',
      emergencyBtn: 'Call Urgent Tanker Dispatch',
      searchPlaceholder: 'Search village, district, or estate (e.g., Sukamahi, Cibatu, Jababeka)...',
      searchReset: 'Reset',
      notFoundPrefix: 'No exact matches found for "',
      notFoundSuffix:
        '". However, our fleet covers all areas across Cikarang and Bekasi Regency!',
      villagesLabel: 'Sub-districts / Villages',
      moreLabel:
        'Also covering Cibitung, Tambun, Sertajaya, Jababeka 1-7, Lippo Cikarang, Deltamas & Bekasi Regency',
    },
    form: {
      badge: 'COMPLIMENTARY RATE ESTIMATE',
      title: 'Consult Your Drainage Issue in 1 Minute',
      subtitle:
        'Select your required service and Cikarang estate. Mitra Bersih 24Jam technicians will quickly provide a transparent cost estimate and schedule your vacuum tanker.',
      guarantee1: 'No Hidden Fees',
      guarantee2: '100% Guaranteed Resolution',
      guarantee3: 'Odorless Vacuum Tanker',
      serviceLabel: 'Service Category Needed',
      serviceOptions: [
        { label: 'Residential Septic Tank Pumping', value: 'Residential Septic Tank Pumping' },
        { label: 'Clogged Toilet & Pipe Clearing', value: 'Clogged Toilet & Pipe Clearing' },
        { label: 'Industrial & Factory Wastewater Pumping', value: 'Industrial & Factory Wastewater Pumping' },
        { label: 'Commercial Grease Trap Cleaning', value: 'Commercial Grease Trap Cleaning' },
        { label: 'Storm Drain & Sewer Jetting', value: 'Storm Drain & Sewer Jetting' },
      ],
      areaLabel: 'Location / Industrial Estate',
      areaOptions: [
        { label: 'Cikarang North', value: 'Cikarang North' },
        { label: 'Cikarang South (Jababeka / Lippo Cikarang)', value: 'Cikarang South (Jababeka / Lippo Cikarang)' },
        { label: 'Cikarang West', value: 'Cikarang West' },
        { label: 'Cikarang Central (Deltamas)', value: 'Cikarang Central (Deltamas)' },
        { label: 'Cikarang East', value: 'Cikarang East' },
        { label: 'Cibitung / Tambun / Bekasi Regency', value: 'Cibitung / Tambun / Bekasi Regency' },
      ],
      detailLabel: 'Facility / Residence Address & Symptoms',
      detailPlaceholder: 'E.g., Factory name/housing complex, street name, or severe backup symptoms',
      submitBtn: 'SEND ESTIMATE VIA WHATSAPP (FREE)',
    },
    footer: {
      contactTitle: 'Contact Information',
      phoneLabel: 'Emergency Phone Hotline',
      waLabel: 'Official WhatsApp Dispatch',
      emailLabel: 'Corporate Email',
      locationLabel: 'Primary Service Hub',
      locationVal: 'Cikarang, Bekasi Regency, West Java',
      servicesTitle: 'Services',
      othersTitle: 'Quick Links',
      rightsReserved: 'Mitra Bersih 24Jam. All Rights Reserved.',
    },
    chatWidget: {
      launcherTooltip: 'Live Support (24/7 Standby)',
      agentName: 'Mitra Bersih 24/7 Dispatch',
      agentRole: 'Sanitation Crew & Vacuum Tanker Hub',
      agentStatus: 'Online · Replies in seconds',
      timeTag: 'Today',
      greetingText:
        'Hello! 👋 Need rapid septic tank pumping or drainage clearing in Cikarang? Our vacuum tankers are on standby across industrial estates and residential zones. Type your inquiry or select a quick topic below:',
      quickPill1: 'Emergency Clogged Toilet',
      quickPill2: 'Full Septic Tank Emptying',
      quickPill3: 'Industrial Effluent / Grease Trap',
      quickPill4: 'Get Instant Rate Estimate',
      inputPlaceholder: 'Type your message or address...',
      sendBtn: 'Send on WhatsApp',
      footerNote: 'Directly connects to official 24-hour English-friendly dispatch on WhatsApp',
    },
  },
};
