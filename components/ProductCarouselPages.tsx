"use client"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAudioFeedback } from "@/hooks/useAudioFeedback"
import { useLanguage } from "@/hooks/useLanguage"

interface Product {
  id: number
  titleKey: string
  subtitleKey: string
  image: string
}

interface ProductCarouselPagesProps {
  products: Product[]
  currentSlide: number
  onSlideChange: (index: number) => void
  onProductClick: (product: Product) => void
  isAutoPlaying: boolean
}

export function ProductCarouselPages({
  products,
  currentSlide,
  onSlideChange,
  onProductClick,
  isAutoPlaying,
}: ProductCarouselPagesProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { playSwipe, playHover, playClick } = useAudioFeedback()
  const { t } = useLanguage()

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    onSlideChange((currentSlide + 1) % products.length)
    playSwipe()
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    onSlideChange((currentSlide - 1 + products.length) % products.length)
    playSwipe()
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    onSlideChange(index)
    playClick()
    setTimeout(() => setIsTransitioning(false), 400)
  }

  return (
    <div className="relative w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-full flex-shrink-0 px-4">
                <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-[1.02] shadow-xl product-card-border cursor-pointer">
                  <button
                    onClick={() => onProductClick(product)}
                    onMouseEnter={playHover}
                    className="w-full group p-0 bg-transparent border-none"
                    disabled={isTransitioning}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-8">
                        {/* Product Image - 1:1 Aspect Ratio */}
                        <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={t(product.titleKey)}
                            width={320}
                            height={320}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 text-left">
                          <div className="bg-gray-700 rounded-xl p-6 h-full flex flex-col justify-center">
                            <h3 className="text-4xl font-bold text-white group-hover:text-orange-400 transition-colors mb-4">
                              {t(product.titleKey)}
                            </h3>
                            <p className="text-2xl text-orange-400 font-medium mb-6">{t(product.subtitleKey)}</p>
                            <div className="bg-gray-600 rounded-lg p-4">
                              <p className="text-gray-300 text-lg leading-relaxed">
                                {t(`${product.titleKey.replace(/\./g, ".")}.description`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-full flex-shrink-0 px-2">
                <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 shadow-lg mobile-product-card-border cursor-pointer">
                  <button
                    onClick={() => onProductClick(product)}
                    className="w-full group p-0 bg-transparent border-none"
                    disabled={isTransitioning}
                  >
                    <CardContent className="p-4">
                      {/* Mobile Product Image - 1:1 Aspect Ratio */}
                      <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg mb-4 transition-all duration-300 relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={t(product.titleKey)}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Mobile Product Info */}
                      <div className="bg-gray-700 rounded-lg p-5 text-center">
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {t(product.titleKey)}
                        </h3>
                        <p className="text-lg text-orange-400 font-medium">{t(product.subtitleKey)}</p>
                      </div>
                    </CardContent>
                  </button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation with Indicators - Desktop & Mobile */}
      <div className="flex justify-center items-center space-x-6 mt-6">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          onMouseEnter={playHover}
          disabled={isTransitioning}
          className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 glow-hover shadow-lg flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Page Indicators */}
        <div className="flex space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={playHover}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 glow-hover interactive-scale disabled:opacity-50 ${
                currentSlide === index
                  ? "bg-orange-500 scale-125 shadow-lg shadow-orange-500/50"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          onMouseEnter={playHover}
          disabled={isTransitioning}
          className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white hover:bg-orange-500/20 hover:border-orange-500 hover:text-orange-400 transition-all duration-300 rounded-full button-glow-bg disabled:opacity-50 glow-hover shadow-lg flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
