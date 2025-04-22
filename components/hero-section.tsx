"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, BrainCircuit, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProviders } from "./providers"

export function HeroSection() {
  const { language } = useProviders()
  const [currentIndex, setCurrentIndex] = useState(0)

  const aiNames = [
    { name: "ChatGPT", icon: Sparkles },
    { name: "Claude", icon: MessageSquare },
    { name: "Gemini", icon: BrainCircuit },
    { name: "Llama", icon: Bot },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aiNames.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [aiNames.length])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-primary/10 p-3"
            >
              <BrainCircuit className="h-10 w-10 text-primary" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            {language === "tr" ? "Tüm Yapay Zekalar" : "All AI Models"}
            <span className="block text-primary">{language === "tr" ? "Tek Platformda" : "One Platform"}</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            {language === "tr"
              ? "Farklı yapay zeka modellerini tek bir arayüzde kullanın, karşılaştırın ve en iyi sonuçları alın. Artık farklı uygulamalar arasında geçiş yapmanıza gerek yok."
              : "Use and compare different AI models in a single interface to get the best results. No need to switch between different applications anymore."}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link href="/chat">
              <Button size="lg" className="h-12 px-6">
                {language === "tr" ? "Hemen Başla" : "Get Started"}
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="h-12 px-6">
                {language === "tr" ? "Daha Fazla Bilgi" : "Learn More"}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <p className="text-sm text-muted-foreground">
              {language === "tr" ? "Desteklenen AI Modelleri:" : "Supported AI Models:"}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {aiNames.map((ai, index) => (
                <motion.div
                  key={ai.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentIndex === index ? 1 : 0.5 }}
                  className="flex items-center gap-2"
                >
                  <ai.icon className="h-5 w-5 text-primary" />
                  <span className={currentIndex === index ? "font-medium" : "text-muted-foreground"}>{ai.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
