"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { useState, createContext, useContext, useEffect } from "react"

type Language = "tr" | "en"

interface ProviderContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const ProviderContext = createContext<ProviderContextType>({
  language: "tr",
  setLanguage: () => {},
})

export const useProviders = () => useContext(ProviderContext)

export function Providers({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr")

  // Dil değişikliğini localStorage'a kaydet
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  // Sayfa yüklendiğinde localStorage'dan dil ayarını al
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProviderContext.Provider value={{ language, setLanguage }}>{children}</ProviderContext.Provider>
    </ThemeProvider>
  )
}
