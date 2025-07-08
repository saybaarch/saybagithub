"use client"
import Image from "next/image"
import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Instagram,
  MessageCircle,
  Facebook,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Briefcase,
  Code,
  Palette,
  Smartphone,
  Monitor,
  FileText,
  Settings,
  X,
  MessageSquare,
  Map,
  Info,
  Star,
  Zap,
  Target,
  Gem,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"
import { useLanguage } from "@/hooks/useLanguage"
import { AudioToggle } from "@/components/AudioToggle"
import { LanguageToggle } from "@/components/LanguageToggle"
import { SearchBar } from "@/components/SearchBar"
import { ProductCarouselPages } from "@/components/ProductCarouselPages"
import { EnhancedLoadingScreen } from "@/components/EnhancedLoadingScreen"

const products = [
  {
    id: 1,
    titleKey: "jasa.tugas",
    subtitleKey: "jasa.tugas.subtitle",
    descriptionKey: "jasa.tugas.description",
    icon: <FileText className="h-8 w-8" />,
    image: "/research-service.gif",
    bgColor: "bg-blue-600",
    link: "#jasa-tugas",
    details: {
      features: [
        "Pembuatan presentasi PowerPoint profesional dengan desain menarik",
        "Formatting dokumen Word yang rapi dan sesuai standar akademik",
        "Riset mendalam dan penulisan konten berkualitas tinggi",
        "Template custom sesuai kebutuhan dan tema yang diinginkan",
        "Revisi unlimited hingga hasil sesuai ekspektasi",
        "Pengerjaan cepat dengan deadline yang ketat",
        "Konsultasi gratis untuk menentukan konsep terbaik",
        "Dukungan referensi dan sitasi yang akurat",
      ],
      pricing: "Rp 25.000",
      delivery: "1-3 hari kerja",
    },
  },
  {
    id: 2,
    titleKey: "jasa.oprek",
    subtitleKey: "jasa.oprek.subtitle",
    descriptionKey: "jasa.oprek.description",
    icon: <Settings className="h-8 w-8" />,
    image: "/web-design.gif",
    bgColor: "bg-gray-700",
    link: "#jasa-oprek",
    details: {
      features: [
        "Optimasi performa sistem untuk kecepatan maksimal",
        "Modifikasi konfigurasi sistem sesuai kebutuhan spesifik",
        "Troubleshooting dan perbaikan masalah sistem kompleks",
        "Peningkatan keamanan sistem dengan tools terbaru",
        "Custom tweaking registry dan pengaturan advanced",
        "Instalasi dan konfigurasi software khusus",
        "Backup dan recovery system yang aman",
        "Support teknis berkelanjutan dan maintenance rutin",
      ],
      pricing: "Rp 50.000",
      delivery: "1-5 hari kerja",
    },
  },
  {
    id: 3,
    titleKey: "aplikasi.crack",
    subtitleKey: "aplikasi.crack.subtitle",
    descriptionKey: "aplikasi.crack.description",
    icon: <Code className="h-8 w-8" />,
    image: "/mobile-apps.gif",
    bgColor: "bg-green-600",
    link: "#aplikasi-crack",
    details: {
      features: [
        "Instalasi dan aktivasi software premium dengan aman",
        "Dukungan teknis untuk berbagai aplikasi profesional",
        "Solusi software custom sesuai kebutuhan bisnis",
        "Update dan maintenance aplikasi secara berkala",
        "Troubleshooting masalah kompatibilitas software",
        "Konsultasi pemilihan software yang tepat",
        "Panduan penggunaan dan tutorial lengkap",
        "Garansi aplikasi berfungsi dengan optimal",
      ],
      pricing: "Rp 30.000",
      delivery: "1-2 hari kerja",
    },
  },
  {
    id: 4,
    titleKey: "web.design",
    subtitleKey: "web.design.subtitle",
    descriptionKey: "web.design.description",
    icon: <Monitor className="h-8 w-8" />,
    image: "/web-design.gif",
    bgColor: "bg-purple-600",
    link: "#web-design",
    details: {
      features: [
        "Desain website responsif untuk semua perangkat",
        "UI/UX design modern dengan user experience terbaik",
        "Optimasi SEO on-page untuk ranking Google",
        "Content Management System yang mudah digunakan",
        "Integrasi e-commerce dengan payment gateway",
        "Loading speed optimization untuk performa maksimal",
        "SSL certificate dan keamanan website",
        "Maintenance, backup, dan support berkelanjutan",
      ],
      pricing: "Rp 500.000",
      delivery: "7-14 hari kerja",
    },
  },
  {
    id: 5,
    titleKey: "mobile.apps",
    subtitleKey: "mobile.apps.subtitle",
    descriptionKey: "mobile.apps.description",
    icon: <Smartphone className="h-8 w-8" />,
    image: "/mobile-apps.gif",
    bgColor: "bg-red-600",
    link: "#mobile-apps",
    details: {
      features: [
        "Native app development untuk iOS dan Android",
        "Cross-platform development dengan React Native/Flutter",
        "App Store dan Google Play Store deployment",
        "Push notifications dan real-time messaging",
        "Backend API integration dengan database",
        "In-app purchase dan monetization features",
        "Analytics dan user behavior tracking",
        "App maintenance, updates, dan bug fixes",
      ],
      pricing: "Rp 2.000.000",
      delivery: "14-30 hari kerja",
    },
  },
  {
    id: 6,
    titleKey: "graphic.design",
    subtitleKey: "graphic.design.subtitle",
    descriptionKey: "graphic.design.description",
    icon: <Palette className="h-8 w-8" />,
    image: "/graphic-design.gif",
    bgColor: "bg-pink-600",
    link: "#graphic-design",
    details: {
      features: [
        "Logo design profesional dengan konsep unik",
        "Brand identity lengkap (logo, color palette, typography)",
        "Marketing materials (flyer, brosur, banner, poster)",
        "Social media graphics dan content visual",
        "Packaging design yang eye-catching",
        "Print design dengan resolusi tinggi",
        "Brand guidelines dan style guide lengkap",
        "Revisi unlimited hingga design sempurna",
      ],
      pricing: "Rp 100.000",
      delivery: "3-7 hari kerja",
    },
  },
  {
    id: 7,
    titleKey: "autocad.service",
    subtitleKey: "autocad.service.subtitle",
    descriptionKey: "autocad.service.description",
    icon: <Settings className="h-8 w-8" />,
    image: "/autocad-service.gif",
    bgColor: "bg-orange-600",
    link: "#autocad-service",
    details: {
      features: [
        "Gambar teknis 2D dan 3D dengan presisi tinggi",
        "Desain arsitektur rumah, gedung, dan interior",
        "Engineering drawing untuk mechanical dan civil",
        "Blueprint dan technical drawing sesuai standar",
        "Konversi file CAD ke berbagai format",
        "3D modeling dan rendering realistis",
        "Revisi dan modifikasi gambar existing",
        "Konsultasi desain teknis dan structural",
      ],
      pricing: "Rp 75.000",
      delivery: "2-5 hari kerja",
    },
  },
  {
    id: 8,
    titleKey: "ArcGIS Service",
    subtitleKey: "Pemetaan Visual",
    descriptionKey:
      "Kami menyediakan layanan ArcGIS terpercaya untuk kebutuhan pemetaan, analisis spasial, visualisasi data geospasial, dan pembuatan peta tematik. Cocok untuk proyek perencanaan wilayah, lingkungan, pertambangan, kehutanan, dan lainnya. Didukung oleh tenaga ahli berpengalaman dan hasil kerja presisi sesuai kebutuhan Anda.",
    icon: <Map className="h-8 w-8" />,
    image: "/autocad-service.gif",
    bgColor: "bg-teal-600",
    link: "#arcgis-service",
    details: {
      features: [
        "Pemetaan digital dengan teknologi GIS terdepan",
        "Analisis spasial dan geospasial yang mendalam",
        "Pembuatan peta tematik untuk berbagai keperluan",
        "Digitasi peta dan georeferensi dengan akurasi tinggi",
        "Database spasial management dan integration",
        "Land use planning dan urban development mapping",
        "Environmental mapping dan natural resource analysis",
        "Konsultasi sistem informasi geografis profesional",
      ],
      pricing: "Rp 150.000",
      delivery: "3-7 hari kerja",
    },
  },
]

const socialLinks = [
  {
    icon: <Instagram className="h-5 w-5" />,
    link: "https://instagram.com/sayba.arc",
    label: "Instagram",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    link: "https://wa.me/6287721916495",
    label: "WhatsApp",
    color: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v5.73a3.87 3.87 0 0 1-3.14 3.78 3.87 3.87 0 0 1-4.08-2.87A3.87 3.87 0 0 1 9.75 4.5c.43 0 .85.08 1.25.23l1.02-2.3a6.12 6.12 0 0 0-1.27-.13A6.1 6.1 0 0 0 4.64 8.43a6.1 6.1 0 0 0 1.24 6.74 4.83 4.83 0 0 1 3.77 4.25V20h2.08v-5.73a3.87 3.87 0 0 1 3.14-3.78 3.87 3.87 0 0 1 4.08 2.87 3.87 3.87 0 0 1-3.23 4.12c-.43 0-.85-.08-1.25-.23l-1.02 2.3c.42.05.84.08 1.27.13a6.1 6.1 0 0 0 6.11-6.13 6.1 6.1 0 0 0-1.24-6.74z" />
      </svg>
    ),
    link: "https://tiktok.com/@sayba.arc",
    label: "TikTok",
    color: "bg-gradient-to-r from-gray-800 to-black",
  },
  {
    icon: <Facebook className="h-5 w-5" />,
    link: "https://facebook.com/sayba.arc",
    label: "Facebook",
    color: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
]

export default function SaybaArcLinktree() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalSlide, setModalSlide] = useState(0)
  const [socialMenuOpen, setSocialMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isWhyChooseUsModalOpen, setIsWhyChooseUsModalOpen] = useState(false)

  const modalTouchStartX = useRef<number>(0)
  const modalTouchEndX = useRef<number>(0)

  // Hooks
  const { audioEnabled, toggleAudio, playClick, playSwipe, playModal, playHover, playSuccess } = useAudioFeedback()
  const { language, toggleLanguage, t } = useLanguage()

  // Main links with translations
  const mainLinks = [
    {
      titleKey: "portfolio.website",
      descriptionKey: "portfolio.description",
      icon: <Globe className="h-6 w-6" />,
      link: "https://sayba-arc-portfolio.com",
      bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    },
    {
      titleKey: "book.consultation",
      descriptionKey: "consultation.description",
      icon: <Briefcase className="h-6 w-6" />,
      link: "#consultation",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
  ]

  // Why Choose Us detailed data
  const whyChooseUsDetails = [
    {
      key: "professional.quality",
      icon: <Star className="h-6 w-6" />,
      emoji: "⭐",
      titleKey: "professional.quality.title",
      detailKey: "professional.quality.detail",
    },
    {
      key: "fast.turnaround",
      icon: <Zap className="h-6 w-6" />,
      emoji: "⚡",
      titleKey: "fast.turnaround.title",
      detailKey: "fast.turnaround.detail",
    },
    {
      key: "customer.support",
      icon: <Target className="h-6 w-6" />,
      emoji: "🎯",
      titleKey: "customer.support.title",
      detailKey: "customer.support.detail",
    },
    {
      key: "competitive.pricing",
      icon: <Gem className="h-6 w-6" />,
      emoji: "💎",
      titleKey: "competitive.pricing.title",
      detailKey: "competitive.pricing.detail",
    },
  ]

  // Auto-slide products every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || isLoading) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
      playSwipe()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isLoading, playSwipe])

  // Pause auto-play when modal is open
  useEffect(() => {
    setIsAutoPlaying(!isModalOpen && !isWhyChooseUsModalOpen)
  }, [isModalOpen, isWhyChooseUsModalOpen])

  // Fade in effect after loading
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const nextModalSlide = () => {
    const nextIndex = (modalSlide + 1) % products.length
    setModalSlide(nextIndex)
    setSelectedProduct(products[nextIndex])
    playSwipe()
  }

  const prevModalSlide = () => {
    const prevIndex = (modalSlide - 1 + products.length) % products.length
    setModalSlide(prevIndex)
    setSelectedProduct(products[prevIndex])
    playSwipe()
  }

  // Touch handlers for modal slider - REMOVED GESTURE FUNCTIONALITY
  const handleModalTouchStart = (e: React.TouchEvent) => {
    // Touch handlers removed - only arrow navigation allowed
  }

  const handleModalTouchMove = (e: React.TouchEvent) => {
    // Touch handlers removed - only arrow navigation allowed
  }

  const handleModalTouchEnd = () => {
    // Touch handlers removed - only arrow navigation allowed
  }

  const openProductModal = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setModalSlide(product.id - 1)
    setIsModalOpen(true)
    playModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    playClick()
  }

  const openWhyChooseUsModal = () => {
    setIsWhyChooseUsModalOpen(true)
    playModal()
  }

  const closeWhyChooseUsModal = () => {
    setIsWhyChooseUsModalOpen(false)
    playClick()
  }

  const handleSocialToggle = () => {
    setSocialMenuOpen(!socialMenuOpen)
    playClick()
  }

  const handleLinkClick = () => {
    playSuccess()
  }

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
  }

  const handleProductSelect = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setCurrentSlide(productId - 1)
      openProductModal(product)
    }
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <EnhancedLoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop blur when social menu is open */}
      {socialMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSocialMenuOpen(false)} />
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg border-2 border-orange-500 flex items-center justify-center overflow-hidden glow-hover interactive-scale">
                <Image
                  src="/sayba-square-logo.png"
                  alt="Sayba Arc Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-white">{t("sayba.arc")}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <SearchBar onSearch={handleSearch} onProductSelect={handleProductSelect} products={products} />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
              <AudioToggle audioEnabled={audioEnabled} onToggle={toggleAudio} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center overflow-hidden glow-hover interactive-scale">
                <Image
                  src="/sayba-square-logo.png"
                  alt="Sayba Arc Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-lg font-bold text-white">{t("sayba.arc")}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <SearchBar onSearch={handleSearch} onProductSelect={handleProductSelect} products={products} />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
              <AudioToggle audioEnabled={audioEnabled} onToggle={toggleAudio} />
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Social Media Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Social Media Options */}
          <div
            className={`absolute bottom-20 right-0 space-y-3 transition-all duration-500 ${
              socialMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-end space-x-3 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-gray-600">
                  {social.label}
                </span>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                  className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg glow-hover interactive-scale`}
                >
                  {social.icon}
                </a>
              </div>
            ))}
          </div>

          {/* Main Chat Button */}
          <button
            onClick={handleSocialToggle}
            onMouseEnter={playHover}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg glow-hover interactive-scale"
          >
            {socialMenuOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 lg:pt-20 pb-32">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="mb-8">
                  <div className="w-48 h-48 mx-auto rounded-full border-4 border-orange-500 shadow-2xl flex items-center justify-center overflow-hidden relative glow-hover interactive-scale">
                    <Image
                      src="/sayba-square-logo.png"
                      alt="Sayba Arc - Art You Believe"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{t("sayba.arc")}</h1>
                <p className="text-xl text-orange-400 mb-4 font-medium">{t("art.you.believe")}</p>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{t("hero.description")}</p>
              </div>

              {/* Main Links Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {mainLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                  >
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full glow-hover interactive-scale shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 ${link.bgColor} rounded-xl flex items-center justify-center text-white shadow-lg glow-hover`}
                          >
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                              {t(link.titleKey)}
                            </h3>
                            <p className="text-gray-400">{t(link.descriptionKey)}</p>
                          </div>
                          <ExternalLink className="h-6 w-6 text-gray-400 group-hover:text-orange-400 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>

              {/* Product Pages Carousel */}
              <Card className="bg-gray-800 border-gray-700 mb-12 glow-hover shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-white mb-4">{t("explore.collection")}</h2>
                    <p className="text-gray-400">{t("collection.subtitle")}</p>
                  </div>

                  <ProductCarouselPages
                    products={products}
                    currentSlide={currentSlide}
                    onSlideChange={setCurrentSlide}
                    onProductClick={openProductModal}
                    isAutoPlaying={isAutoPlaying}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden max-w-md mx-auto">
            {/* Mobile Hero */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-3 border-orange-500 shadow-2xl flex items-center justify-center overflow-hidden relative glow-hover interactive-scale">
                  <Image
                    src="/sayba-square-logo.png"
                    alt="Sayba Arc - Art You Believe"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{t("sayba.arc")}</h1>
              <p className="text-orange-400 text-sm mb-4 font-medium">{t("art.you.believe")}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{t("hero.mobile.description")}</p>
            </div>

            {/* Mobile Main Links */}
            <div className="space-y-4 mb-8">
              {mainLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  onClick={handleLinkClick}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02] glow-hover interactive-scale shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 ${link.bgColor} rounded-lg flex items-center justify-center text-white shadow-lg glow-hover`}
                        >
                          {link.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold group-hover:text-orange-400 transition-colors">
                            {t(link.titleKey)}
                          </h3>
                          <p className="text-gray-400 text-sm">{t(link.descriptionKey)}</p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Mobile Product Pages Carousel */}
            <Card className="bg-gray-800 border-gray-700 mb-8 glow-hover shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">{t("explore.collection")}</h2>
                  <p className="text-gray-400 text-sm">{t("collection.subtitle")}</p>
                </div>

                <ProductCarouselPages
                  products={products}
                  currentSlide={currentSlide}
                  onSlideChange={setCurrentSlide}
                  onProductClick={openProductModal}
                  isAutoPlaying={isAutoPlaying}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg mx-auto max-h-[95vh] overflow-y-auto">
            {/* Modal Content - TOUCH HANDLERS REMOVED */}
            <div className="bg-gray-800 rounded-2xl border border-gray-600 shadow-2xl overflow-hidden">
              {/* Header - Improved Design */}
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-750 to-gray-700 px-4 py-6 border-b border-gray-600/50">
                <button
                  onClick={closeModal}
                  onMouseEnter={playHover}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-700/80 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 glow-hover z-10 shadow-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="text-center max-w-sm mx-auto">
                  <div className="mb-3">
                    <h2 className="text-lg font-bold text-white leading-tight">{t(selectedProduct.titleKey)}</h2>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent flex-1 max-w-16"></div>
                    <div className="px-3">
                      <p className="text-orange-400 text-sm font-medium whitespace-nowrap">
                        {t(selectedProduct.subtitleKey)}
                      </p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent flex-1 max-w-16"></div>
                  </div>
                </div>
              </div>

              {/* Product Image - 1:1 Aspect Ratio */}
              <div className="relative px-6 py-6 bg-gray-750">
                <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={t(selectedProduct.titleKey)}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Navigation Dots and Arrows - Between Image and Content */}
              <div className="px-6 py-4 border-b border-gray-600/30">
                <div className="flex justify-center items-center space-x-4">
                  {/* Left Arrow */}
                  <button
                    onClick={prevModalSlide}
                    onMouseEnter={playHover}
                    className="w-8 h-8 bg-gray-700/80 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-all duration-300 glow-hover"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Navigation Dots */}
                  <div className="flex space-x-2">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setModalSlide(index)
                          setSelectedProduct(products[index])
                          playClick()
                        }}
                        onMouseEnter={playHover}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          modalSlide === index ? "bg-orange-500 scale-125" : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={nextModalSlide}
                    onMouseEnter={playHover}
                    className="w-8 h-8 bg-gray-700/80 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-all duration-300 glow-hover"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 space-y-6">
                {/* Service Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Info className="h-5 w-5 text-orange-400 mr-2" />
                    {t("service.description")}
                  </h3>
                  <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{t(selectedProduct.descriptionKey)}</p>

                    {/* Key Benefits */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-orange-900/20 rounded-lg p-3 border border-orange-700/30">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="h-4 w-4 text-orange-400" />
                          <span className="text-orange-300 text-xs font-medium">Kualitas Terjamin</span>
                        </div>
                        <p className="text-orange-200/80 text-xs">Hasil profesional berkualitas tinggi</p>
                      </div>
                      <div className="bg-green-900/20 rounded-lg p-3 border border-green-700/30">
                        <div className="flex items-center space-x-2 mb-1">
                          <Zap className="h-4 w-4 text-green-400" />
                          <span className="text-green-300 text-xs font-medium">Pengerjaan Cepat</span>
                        </div>
                        <p className="text-green-200/80 text-xs">Selesai tepat waktu sesuai deadline</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Provided */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Star className="h-5 w-5 text-orange-400 mr-2" />
                    {t("services.provided")}
                  </h3>
                  <div className="bg-gray-700/20 rounded-lg p-4 border border-gray-600/30">
                    <div className="grid gap-2">
                      {selectedProduct.details.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 text-gray-300 text-sm py-1">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Delivery */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Zap className="h-5 w-5 text-orange-400 mr-2" />
                    {t("price.delivery")}
                  </h3>
                  <div className="bg-gradient-to-r from-gray-700/40 to-gray-600/40 rounded-lg p-4 border border-gray-600/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="bg-orange-900/30 rounded-lg p-3 border border-orange-700/40">
                          <p className="text-gray-300 text-xs mb-1">Harga mulai dari:</p>
                          <p className="text-orange-400 font-bold text-lg">{selectedProduct.details.pricing}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-700/40">
                          <p className="text-gray-300 text-xs mb-1">{t("delivery.time")}</p>
                          <p className="text-blue-400 font-bold text-lg">{selectedProduct.details.delivery}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Steps */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Target className="h-5 w-5 text-orange-400 mr-2" />
                    Proses Pengerjaan
                  </h3>
                  <div className="bg-gray-700/20 rounded-lg p-4 border border-gray-600/30">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          1
                        </div>
                        <span className="text-gray-300 text-sm">Konsultasi & Brief Kebutuhan</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          2
                        </div>
                        <span className="text-gray-300 text-sm">Pengerjaan Sesuai Spesifikasi</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          3
                        </div>
                        <span className="text-gray-300 text-sm">Review & Revisi (Jika Diperlukan)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          4
                        </div>
                        <span className="text-gray-300 text-sm">Pengiriman File Final</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Quote */}
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/40 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Gem className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-amber-300 text-sm font-medium mb-1">{t("custom.quote")}</p>
                      <p className="text-amber-200/80 text-xs leading-relaxed">{t("contact.pricing")}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={() => {
                    window.open(
                      `https://wa.me/6287721916495?text=Halo, saya tertarik dengan layanan ${t(selectedProduct.titleKey)}. Bisa konsultasi lebih lanjut?`,
                      "_blank",
                    )
                    playSuccess()
                  }}
                  onMouseEnter={playHover}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 glow-hover"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Hubungi Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Modal */}
      {isWhyChooseUsModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-2xl border border-gray-600 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                <button
                  onClick={closeWhyChooseUsModal}
                  onMouseEnter={playHover}
                  className="absolute top-4 right-4 w-8 h-8 bg-orange-700/80 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-all duration-300 glow-hover"
                >
                  <X className="h-4 w-4" />
                </button>
                <h2 className="text-2xl font-bold text-white pr-10">{t("why.choose.us")}</h2>
                <p className="text-orange-100 text-sm">{t("detailed.explanation")}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {whyChooseUsDetails.map((item, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <span className="mr-2 text-2xl">{item.emoji}</span>
                          {t(item.titleKey)}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{t(item.detailKey)}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-500/30 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{t("ready.to.start")}</h3>
                  <p className="text-gray-300 mb-4">{t("contact.us.today")}</p>
                  <button
                    onClick={() => {
                      window.open("https://wa.me/6287721916495", "_blank")
                      playSuccess()
                      closeWhyChooseUsModal()
                    }}
                    onMouseEnter={playHover}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto glow-hover"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{t("contact.now")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Footer with Smooth Animations */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 animate-pulse"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300/3 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Layout with Staggered Animations */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 mb-12">
              {/* Left Column - Brand Section with Slide-in Animation */}
              <div className="animate-slide-in-left">
                <div className="flex items-center space-x-4 mb-6 group">
                  <div className="w-16 h-16 rounded-xl border-2 border-orange-500 flex items-center justify-center overflow-hidden glow-hover shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-orange-500/25">
                    <Image
                      src="/sayba-square-logo.png"
                      alt="Sayba Arc Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="transition-all duration-300 group-hover:translate-x-2">
                    <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-400">
                      {t("sayba.arc")}
                    </h3>
                    <p className="text-orange-400 font-medium transition-all duration-300 group-hover:text-orange-300">
                      {t("art.you.believe")}
                    </p>
                  </div>
                </div>
                <p
                  className="text-gray-300 leading-relaxed mb-8 cursor-pointer hover:text-gray-200 transition-all duration-500 text-justify transform hover:scale-[1.02] hover:bg-gray-800/20 rounded-lg p-2 -m-2"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                >
                  {t("hero.description")}
                </p>

                {/* Social Media Links with Staggered Animation */}
                <div className="flex space-x-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      onMouseEnter={playHover}
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg glow-hover interactive-scale transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl animate-bounce-in`}
                      style={{ animationDelay: `${index * 150}ms` }}
                      title={social.label}
                    >
                      <div className="transition-transform duration-300 hover:scale-110">{social.icon}</div>
                    </a>
                  ))}
                </div>

                {/* Why Choose Us Button with Pulse Animation */}
                <button
                  onClick={openWhyChooseUsModal}
                  onMouseEnter={playHover}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/25 shadow-lg flex items-center space-x-2 glow-hover interactive-scale animate-pulse-gentle group"
                >
                  <Briefcase className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="transition-all duration-300">{t("why.choose.us")}</span>
                  <Info className="h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-180" />
                </button>
              </div>

              {/* Right Column - Contact Info with Slide-in Animation */}
              <div className="animate-slide-in-right">
                <h4 className="text-2xl font-semibold text-white mb-8 flex items-center group transition-all duration-300 hover:text-orange-400">
                  <Mail className="h-6 w-6 text-orange-400 mr-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="transition-all duration-300 group-hover:translate-x-2">{t("get.in.touch")}</span>
                </h4>
                <div className="space-y-4">
                  {/* Email Button with Enhanced Animations */}
                  <a
                    href="mailto:sayba.help@gmail.com"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-600 rounded-xl px-6 py-4 transition-all duration-500 group glow-hover transform hover:scale-105 hover:translate-x-2 hover:shadow-2xl hover:shadow-amber-500/20 animate-fade-in-up"
                    style={{ animationDelay: "200ms" }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-800/60 rounded-lg flex items-center justify-center group-hover:bg-amber-700/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Mail className="h-6 w-6 text-orange-300 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-orange-300 font-medium transition-all duration-300 group-hover:text-orange-200">
                        sayba.help@gmail.com
                      </span>
                    </div>
                    <ExternalLink className="h-5 w-5 text-orange-300/70 group-hover:text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:translate-x-1" />
                  </a>

                  {/* Phone Button with Enhanced Animations */}
                  <a
                    href="tel:+6287721916495"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-600 rounded-xl px-6 py-4 transition-all duration-500 group glow-hover transform hover:scale-105 hover:translate-x-2 hover:shadow-2xl hover:shadow-amber-500/20 animate-fade-in-up"
                    style={{ animationDelay: "400ms" }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-800/60 rounded-lg flex items-center justify-center group-hover:bg-amber-700/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Phone className="h-6 w-6 text-orange-300 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-orange-300 font-medium transition-all duration-300 group-hover:text-orange-200">
                        +62 877-2191-6495
                      </span>
                    </div>
                    <ExternalLink className="h-5 w-5 text-orange-300/70 group-hover:text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:translate-x-1" />
                  </a>

                  {/* Website Button with Enhanced Animations */}
                  <a
                    href="https://sayba.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-600 rounded-xl px-6 py-4 transition-all duration-500 group glow-hover transform hover:scale-105 hover:translate-x-2 hover:shadow-2xl hover:shadow-amber-500/20 animate-fade-in-up"
                    style={{ animationDelay: "600ms" }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-800/60 rounded-lg flex items-center justify-center group-hover:bg-amber-700/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Globe className="h-6 w-6 text-orange-300 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-orange-300 font-medium transition-all duration-300 group-hover:text-orange-200">
                        sayba.shop
                      </span>
                    </div>
                    <ExternalLink className="h-5 w-5 text-orange-300/70 group-hover:text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Layout with Enhanced Animations */}
            <div className="lg:hidden space-y-8 mb-8">
              {/* Brand Section with Fade-in Animation */}
              <div className="text-center animate-fade-in-up">
                <div className="flex items-center justify-center space-x-4 mb-4 group">
                  <div className="w-14 h-14 rounded-xl border-2 border-orange-500 flex items-center justify-center overflow-hidden glow-hover shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src="/sayba-square-logo.png"
                      alt="Sayba Arc Logo"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="transition-all duration-300 group-hover:translate-x-1">
                    <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-400">
                      {t("sayba.arc")}
                    </h3>
                    <p className="text-orange-400 font-medium text-sm transition-all duration-300 group-hover:text-orange-300">
                      {t("art.you.believe")}
                    </p>
                  </div>
                </div>
                <p
                  className="text-gray-300 text-sm leading-relaxed mb-6 cursor-pointer hover:text-gray-200 transition-all duration-500 text-justify px-2 transform hover:scale-[1.02] hover:bg-gray-800/20 rounded-lg py-2 -mx-2"
                  onClick={handleLinkClick}
                  onMouseEnter={playHover}
                >
                  {t("hero.description")}
                </p>

                {/* Social Media Links with Staggered Animation */}
                <div className="flex justify-center space-x-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      onMouseEnter={playHover}
                      className={`w-10 h-10 ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg glow-hover interactive-scale transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl animate-bounce-in`}
                      style={{ animationDelay: `${index * 150}ms` }}
                      title={social.label}
                    >
                      <div className="transition-transform duration-300 hover:scale-110">{social.icon}</div>
                    </a>
                  ))}
                </div>

                {/* Why Choose Us Button with Pulse Animation */}
                <button
                  onClick={openWhyChooseUsModal}
                  onMouseEnter={playHover}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/25 shadow-lg flex items-center space-x-2 mx-auto glow-hover interactive-scale animate-pulse-gentle group"
                >
                  <Briefcase className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm transition-all duration-300">{t("why.choose.us")}</span>
                  <Info className="h-3 w-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-180" />
                </button>
              </div>

              {/* Contact Info with Fade-in Animation */}
              <div className="animate-fade-in-up">
                <h4 className="text-xl font-semibold text-white mb-6 flex items-center justify-center group transition-all duration-300 hover:text-orange-400">
                  <Mail className="h-5 w-5 text-orange-400 mr-2 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="transition-all duration-300 group-hover:translate-x-1">{t("get.in.touch")}</span>
                </h4>
                <div className="space-y-3">
                  {/* Email Button with Enhanced Animations */}
                  <a
                    href="mailto:sayba.help@gmail.com"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-600 rounded-xl px-4 py-3 transition-all duration-500 group glow-hover transform hover:scale-105 hover:translate-x-1 hover:shadow-2xl hover:shadow-amber-500/20 animate-fade-in-up"
                    style={{ animationDelay: "200ms" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-800/60 rounded-lg flex items-center justify-center group-hover:bg-amber-700/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Mail className="h-5 w-5 text-orange-300 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-orange-300 font-medium text-sm transition-all duration-300 group-hover:text-orange-200">
                        sayba.help@gmail.com
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-orange-300/70 group-hover:text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:translate-x-0.5" />
                  </a>

                  {/* Phone Button with Enhanced Animations */}
                  <a
                    href="tel:+6287721916495"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-600 rounded-xl px-4 py-3 transition-all duration-500 group glow-hover transform hover:scale-105 hover:translate-x-1 hover:shadow-2xl hover:shadow-amber-500/20 animate-fade-in-up"
                    style={{ animationDelay: "400ms" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-800/60 rounded-lg flex items-center justify-center group-hover:bg-amber-700/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Phone className="h-5 w-5 text-orange-300 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-orange-300 font-medium text-sm transition-all duration-300 group-hover:text-orange-200">
                        +62 877-2191-6495
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-orange-300/70 group-hover:text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:translate-x-0.5" />
                  </a>

                  {/* Website Button with Enhanced Animations */}
                  <a
                    href="https://sayba.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-600 rounded-xl px-4 py-3 transition-all duration-500 group glow-hover transform hover:scale-105 hover:translate-x-1 hover:shadow-2xl hover:shadow-amber-500/20 animate-fade-in-up"
                    style={{ animationDelay: "600ms" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-800/60 rounded-lg flex items-center justify-center group-hover:bg-amber-700/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Globe className="h-5 w-5 text-orange-300 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-orange-300 font-medium text-sm transition-all duration-300 group-hover:text-orange-200">
                        sayba.shop
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-orange-300/70 group-hover:text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright Section with Fade-in Animation */}
            <div className="text-center animate-fade-in-up">
              <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Sayba Arc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
