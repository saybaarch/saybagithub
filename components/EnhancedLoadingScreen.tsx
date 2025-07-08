"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface EnhancedLoadingScreenProps {
  onLoadingComplete: () => void
}

export function EnhancedLoadingScreen({ onLoadingComplete }: EnhancedLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Show logo immediately
    setShowLogo(true)

    // Show text after a short delay
    setTimeout(() => setShowText(true), 500)
  }, [])

  useEffect(() => {
    // Smooth progress animation over 3 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5
        const newProgress = Math.min(prev + increment, 100)

        if (newProgress >= 100) {
          setTimeout(onLoadingComplete, 800)
          return 100
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-orange-400/6 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-sm mx-auto px-6">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            showLogo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
          }`}
        >
          <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-orange-500/50 shadow-2xl flex items-center justify-center overflow-hidden relative bg-gray-800/50 backdrop-blur-sm">
            <Image
              src="/sayba-square-logo.png"
              alt="Sayba Arc"
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-xl"></div>
          </div>
        </div>

        {/* Text */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out delay-300 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">Sayba Arc</span>
          </h1>
          <p className="text-orange-400 text-lg font-medium mb-4">Art You Believe</p>
          <p className="text-gray-400 text-sm">Loading your creative experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="relative mb-4">
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-center">
            <span className="text-orange-400 font-mono text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-orange-500/60 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
