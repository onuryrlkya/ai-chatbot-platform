"use client"

import { Button } from "@/components/ui/button"
import { useProviders } from "./providers"
import { useEffect, useState } from "react"

export function LanguageToggle() {
  const { language, setLanguage } = useProviders()
  const [mounted, setMounted] = useState(false)

  // Hydration için
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-12" disabled>
        TR
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "tr" ? "en" : "tr")} className="w-12">
      {language === "tr" ? "EN" : "TR"}
    </Button>
  )
}
