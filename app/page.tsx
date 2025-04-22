import type React from "react"
import Link from "next/link"
import { ArrowRight, Bot, BrainCircuit, Cpu, Layers, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { AIComparisonTable } from "@/components/ai-comparison-table"
import { HeroSection } from "@/components/hero-section"
import { FeatureShowcase } from "@/components/feature-showcase"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AI Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Ana Sayfa
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Özellikler
            </Link>
            <Link href="#comparison" className="text-sm font-medium hover:text-primary">
              Karşılaştırma
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              Hakkında
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/chat">
              <Button>
                Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Neden AI Hub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Tüm AI'lar Tek Platformda"
                description="ChatGPT, Claude, Gemini, Llama ve daha fazlası - hepsi tek bir arayüzde. Farklı uygulamalar arasında geçiş yapmaya son."
              />
              <FeatureCard
                icon={<Layers className="h-10 w-10 text-primary" />}
                title="Karşılaştırmalı Yanıtlar"
                description="Aynı soruyu birden fazla AI'a sorarak en iyi yanıtı bulun. Farklı modellerin güçlü yanlarını keşfedin."
              />
              <FeatureCard
                icon={<Cpu className="h-10 w-10 text-primary" />}
                title="Özelleştirilebilir Deneyim"
                description="Favori AI modellerinizi seçin, kişiselleştirilmiş ayarlar yapın ve tercihlerinize göre platformu şekillendirin."
              />
            </div>
          </div>
        </section>

        <FeatureShowcase />

        <section id="comparison" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">AI Modelleri Karşılaştırması</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Farklı AI modellerinin güçlü ve zayıf yönlerini karşılaştırın. Hangi model hangi görev için en iyisi?
            </p>
            <AIComparisonTable />
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Proje Hakkında</h2>
                <p className="text-muted-foreground mb-6">
                  AI Hub, farklı yapay zeka modellerini tek bir platformda birleştirerek kullanıcılara benzersiz bir
                  deneyim sunmayı amaçlayan yenilikçi bir projedir. Bu platform, kullanıcıların çeşitli AI modellerini
                  karşılaştırmasına, güçlü yönlerini keşfetmesine ve ihtiyaçlarına en uygun modeli seçmesine olanak
                  tanır.
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Onur Yerlikaya</h3>
                    <p className="text-sm text-muted-foreground">Proje Geliştiricisi</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-lg border">
                <h3 className="font-bold text-xl mb-4">Avantajlar ve Dezavantajlar</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Avantajlar</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Tüm AI modelleri tek bir arayüzde</li>
                      <li>Farklı modellerin yanıtlarını karşılaştırma imkanı</li>
                      <li>Zaman tasarrufu ve verimlilik artışı</li>
                      <li>Kullanıcı dostu arayüz ve kolay geçiş</li>
                      <li>Özelleştirilebilir deneyim</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Dezavantajlar</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Her model için ayrı API anahtarı gereksinimi</li>
                      <li>Bazı özel model özelliklerinin sınırlı desteği</li>
                      <li>API kullanım maliyetleri</li>
                      <li>Modellerin güncellenme hızına bağımlılık</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-none shadow-none bg-background">
      <CardHeader>
        <div className="mb-4 rounded-lg w-16 h-16 flex items-center justify-center bg-primary/10">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
