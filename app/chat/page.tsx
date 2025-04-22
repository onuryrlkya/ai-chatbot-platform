"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BrainCircuit, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ChatInterface } from "@/components/chat-interface"
import { type AIProvider, aiProviders } from "@/lib/ai-providers"
import { useProviders } from "@/components/providers"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function ChatPage() {
  const { language } = useProviders()
  const [selectedProviders, setSelectedProviders] = useState<AIProvider[]>([aiProviders[0]])

  const handleProviderToggle = (provider: AIProvider) => {
    if (selectedProviders.some((p) => p.id === provider.id)) {
      // Remove if already selected
      if (selectedProviders.length > 1) {
        setSelectedProviders(selectedProviders.filter((p) => p.id !== provider.id))
      }
    } else {
      // Add if not selected (max 3)
      if (selectedProviders.length < 3) {
        setSelectedProviders([...selectedProviders, provider])
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AI Hub</span>
            </Link>
            <Button variant="ghost" size="sm" asChild className="ml-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === "tr" ? "Ana Sayfa" : "Home"}
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <div className="lg:col-span-5">
            <ChatInterface selectedProviders={selectedProviders} />
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-muted/40 rounded-lg p-4 border">
                <h3 className="font-medium mb-3">{language === "tr" ? "AI Modelleri" : "AI Models"}</h3>
                <div className="space-y-2">
                  {aiProviders.map((provider) => (
                    <Button
                      key={provider.id}
                      variant={selectedProviders.some((p) => p.id === provider.id) ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleProviderToggle(provider)}
                    >
                      {provider.icon && <provider.icon className="h-4 w-4 mr-2" />}
                      <span className="flex-1 text-left">{provider.name}</span>
                      {provider.isOpenSource && (
                        <Badge variant="outline" className="ml-2 flex items-center gap-1">
                          <Code className="h-3 w-3" />
                          {language === "tr" ? "AK" : "OS"}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {language === "tr" ? "En fazla 3 model seçebilirsiniz." : "You can select up to 3 models."}
                </p>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 border">
                <h3 className="font-medium mb-3">{language === "tr" ? "İpuçları" : "Tips"}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    •{" "}
                    {language === "tr"
                      ? "Farklı modelleri karşılaştırmak için birden fazla model seçin."
                      : "Select multiple models to compare responses."}
                  </li>
                  <li>
                    •{" "}
                    {language === "tr"
                      ? "Karmaşık sorular için daha gelişmiş modelleri tercih edin."
                      : "Prefer advanced models for complex questions."}
                  </li>
                  <li>
                    •{" "}
                    {language === "tr"
                      ? "Yaratıcı içerik için ChatGPT veya Claude'u deneyin."
                      : "Try ChatGPT or Claude for creative content."}
                  </li>
                  <li>
                    •{" "}
                    {language === "tr"
                      ? "Kod yazma için DeepSeek gibi açık kaynak modelleri kullanın."
                      : "Use open source models like DeepSeek for coding."}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
