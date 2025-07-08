"use client"

import { useState, useCallback } from "react"

export type Language = "id" | "en"

interface Translations {
  [key: string]: {
    id: string
    en: string
  }
}

const translations: Translations = {
  "sayba.arc": {
    id: "Sayba Arc",
    en: "Sayba Arc",
  },
  "art.you.believe": {
    id: "Art You Believe",
    en: "Art You Believe",
  },
  "hero.description": {
    id: "Kami menyediakan solusi digital kreatif terdepan untuk kebutuhan bisnis dan personal Anda. Dari desain web hingga aplikasi mobile, kami siap mewujudkan visi digital Anda dengan kualitas profesional dan harga terjangkau.",
    en: "We provide cutting-edge creative digital solutions for your business and personal needs. From web design to mobile applications, we're ready to realize your digital vision with professional quality and affordable prices.",
  },
  "hero.mobile.description": {
    id: "Solusi digital kreatif untuk semua kebutuhan Anda",
    en: "Creative digital solutions for all your needs",
  },
  "portfolio.website": {
    id: "Website Portfolio",
    en: "Portfolio Website",
  },
  "portfolio.description": {
    id: "Lihat koleksi karya dan proyek terbaik kami",
    en: "View our best work and project collections",
  },
  "whatsapp.business": {
    id: "WhatsApp Business",
    en: "WhatsApp Business",
  },
  "whatsapp.description": {
    id: "Hubungi kami langsung untuk konsultasi gratis",
    en: "Contact us directly for free consultation",
  },
  "ai.customer.service": {
    id: "AI Customer Service",
    en: "AI Customer Service",
  },
  "ai.description": {
    id: "Layanan pelanggan otomatis 24/7 dengan AI",
    en: "24/7 automated customer service with AI",
  },
  "book.consultation": {
    id: "Book Consultation",
    en: "Book Consultation",
  },
  "consultation.description": {
    id: "Jadwalkan konsultasi untuk proyek Anda",
    en: "Schedule consultation for your project",
  },
  "explore.collection": {
    id: "Jelajahi Koleksi Layanan",
    en: "Explore Service Collection",
  },
  "collection.subtitle": {
    id: "Temukan layanan digital yang tepat untuk kebutuhan Anda",
    en: "Find the right digital service for your needs",
  },
  "jasa.tugas": {
    id: "Jasa Tugas",
    en: "Assignment Service",
  },
  "jasa.tugas.subtitle": {
    id: "Bantuan Akademik",
    en: "Academic Assistance",
  },
  "jasa.tugas.description": {
    id: "Layanan bantuan tugas akademik profesional untuk mahasiswa dan pelajar. Kami menyediakan bantuan pembuatan makalah, presentasi, dan berbagai tugas kuliah dengan kualitas terjamin dan tepat waktu.",
    en: "Professional academic assignment assistance service for students. We provide help with paper writing, presentations, and various college assignments with guaranteed quality and timely delivery.",
  },
  "jasa.oprek": {
    id: "Jasa Oprek",
    en: "System Tweaking Service",
  },
  "jasa.oprek.subtitle": {
    id: "Optimasi Sistem",
    en: "System Optimization",
  },
  "jasa.oprek.description": {
    id: "Layanan optimasi dan modifikasi sistem komputer untuk performa maksimal. Kami melakukan tweaking registry, optimasi startup, dan konfigurasi sistem untuk meningkatkan kecepatan dan stabilitas PC Anda.",
    en: "Computer system optimization and modification service for maximum performance. We perform registry tweaking, startup optimization, and system configuration to improve your PC's speed and stability.",
  },
  "aplikasi.crack": {
    id: "Aplikasi Crack",
    en: "Software Solutions",
  },
  "aplikasi.crack.subtitle": {
    id: "Solusi Software",
    en: "Software Solutions",
  },
  "aplikasi.crack.description": {
    id: "Penyediaan software premium dan aplikasi profesional untuk kebutuhan bisnis dan personal. Kami menyediakan solusi software terlengkap dengan dukungan teknis dan panduan instalasi.",
    en: "Premium software and professional applications for business and personal needs. We provide comprehensive software solutions with technical support and installation guidance.",
  },
  "web.design": {
    id: "Web Design",
    en: "Web Design",
  },
  "web.design.subtitle": {
    id: "Desain Website Modern",
    en: "Modern Website Design",
  },
  "web.design.description": {
    id: "Jasa pembuatan website profesional dengan desain modern dan responsif. Kami menciptakan website yang tidak hanya menarik secara visual, tetapi juga optimal untuk SEO dan user experience terbaik.",
    en: "Professional website creation service with modern and responsive design. We create websites that are not only visually appealing but also optimized for SEO and the best user experience.",
  },
  "mobile.apps": {
    id: "Mobile Apps",
    en: "Mobile Apps",
  },
  "mobile.apps.subtitle": {
    id: "Aplikasi Mobile",
    en: "Mobile Applications",
  },
  "mobile.apps.description": {
    id: "Pengembangan aplikasi mobile native dan cross-platform untuk iOS dan Android. Kami membuat aplikasi mobile yang user-friendly, performa tinggi, dan sesuai dengan kebutuhan bisnis Anda.",
    en: "Native and cross-platform mobile application development for iOS and Android. We create user-friendly, high-performance mobile apps that meet your business needs.",
  },
  "graphic.design": {
    id: "Graphic Design",
    en: "Graphic Design",
  },
  "graphic.design.subtitle": {
    id: "Desain Grafis Kreatif",
    en: "Creative Graphic Design",
  },
  "graphic.design.description": {
    id: "Layanan desain grafis profesional untuk branding, marketing, dan kebutuhan visual lainnya. Kami menciptakan desain yang menarik, memorable, dan sesuai dengan identitas brand Anda.",
    en: "Professional graphic design service for branding, marketing, and other visual needs. We create attractive, memorable designs that align with your brand identity.",
  },
  "autocad.service": {
    id: "AutoCAD Service",
    en: "AutoCAD Service",
  },
  "autocad.service.subtitle": {
    id: "Desain Teknis 2D/3D",
    en: "2D/3D Technical Design",
  },
  "autocad.service.description": {
    id: "Jasa pembuatan gambar teknis dan desain engineering menggunakan AutoCAD. Kami menyediakan layanan drafting, modeling 3D, dan dokumentasi teknis untuk berbagai kebutuhan industri dan konstruksi.",
    en: "Technical drawing and engineering design service using AutoCAD. We provide drafting, 3D modeling, and technical documentation services for various industrial and construction needs.",
  },
  "service.description": {
    id: "Deskripsi Layanan",
    en: "Service Description",
  },
  "services.provided": {
    id: "Layanan yang Disediakan",
    en: "Services Provided",
  },
  "price.delivery": {
    id: "Harga & Waktu Pengerjaan",
    en: "Price & Delivery Time",
  },
  "delivery.time": {
    id: "Waktu pengerjaan:",
    en: "Delivery time:",
  },
  "custom.quote": {
    id: "Butuh Penawaran Khusus?",
    en: "Need Custom Quote?",
  },
  "contact.pricing": {
    id: "Hubungi kami untuk mendapatkan penawaran harga yang disesuaikan dengan kebutuhan spesifik proyek Anda.",
    en: "Contact us to get a price quote tailored to your specific project needs.",
  },
  "why.choose.us": {
    id: "Mengapa Memilih Kami?",
    en: "Why Choose Us?",
  },
  "detailed.explanation": {
    id: "Penjelasan lengkap keunggulan layanan kami",
    en: "Detailed explanation of our service advantages",
  },
  "professional.quality.title": {
    id: "Kualitas Profesional",
    en: "Professional Quality",
  },
  "professional.quality.detail": {
    id: "Kami berkomitmen memberikan hasil kerja dengan standar profesional tinggi. Setiap proyek dikerjakan dengan detail dan presisi untuk memastikan kepuasan klien maksimal.",
    en: "We are committed to delivering work with high professional standards. Every project is executed with detail and precision to ensure maximum client satisfaction.",
  },
  "fast.turnaround.title": {
    id: "Pengerjaan Cepat",
    en: "Fast Turnaround",
  },
  "fast.turnaround.detail": {
    id: "Tim kami berpengalaman dalam mengelola waktu dengan efisien. Kami memastikan setiap proyek selesai tepat waktu tanpa mengorbankan kualitas hasil.",
    en: "Our team is experienced in managing time efficiently. We ensure every project is completed on time without compromising the quality of results.",
  },
  "customer.support.title": {
    id: "Dukungan Pelanggan 24/7",
    en: "24/7 Customer Support",
  },
  "customer.support.detail": {
    id: "Kami menyediakan layanan konsultasi dan dukungan teknis sepanjang waktu. Tim support kami siap membantu Anda kapan saja dibutuhkan.",
    en: "We provide consultation and technical support services around the clock. Our support team is ready to help you whenever needed.",
  },
  "competitive.pricing.title": {
    id: "Harga Kompetitif",
    en: "Competitive Pricing",
  },
  "competitive.pricing.detail": {
    id: "Kami menawarkan harga yang kompetitif dan transparan tanpa biaya tersembunyi. Dapatkan nilai terbaik untuk investasi digital Anda.",
    en: "We offer competitive and transparent pricing with no hidden costs. Get the best value for your digital investment.",
  },
  "ready.to.start": {
    id: "Siap Memulai Proyek?",
    en: "Ready to Start Your Project?",
  },
  "contact.us.today": {
    id: "Hubungi kami hari ini untuk konsultasi gratis dan mulai wujudkan visi digital Anda!",
    en: "Contact us today for a free consultation and start realizing your digital vision!",
  },
  "contact.now": {
    id: "Hubungi Sekarang",
    en: "Contact Now",
  },
  "get.in.touch": {
    id: "Hubungi Kami",
    en: "Get in Touch",
  },
  copyright: {
    id: "© 2024 Sayba Arc. Semua hak dilindungi.",
    en: "© 2024 Sayba Arc. All rights reserved.",
  },
  "powered.by": {
    id: "Didukung oleh teknologi terdepan",
    en: "Powered by cutting-edge technology",
  },
  "all.rights.reserved": {
    id: "Semua hak dilindungi",
    en: "All rights reserved",
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("id")

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"))
  }, [])

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || key
    },
    [language],
  )

  return {
    language,
    toggleLanguage,
    t,
  }
}
