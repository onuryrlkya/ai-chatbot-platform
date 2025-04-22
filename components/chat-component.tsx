"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Basit AI sağlayıcı listesi
const AI_PROVIDERS = [
  { id: "openai", name: "ChatGPT" },
  { id: "claude", name: "Claude" },
  { id: "gemini", name: "Google Gemini" },
]

export function ChatComponent() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ])
  const [input, setInput] = useState("")
  const [provider, setProvider] = useState("openai")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Kullanıcı mesajını ekle
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // API'ye istek gönder
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          provider,
        }),
      })

      if (!response.ok) {
        throw new Error("API yanıt vermedi")
      }

      const data = await response.json()

      // AI yanıtını ekle
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
    } catch (error) {
      console.error("Hata:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Sohbet</span>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="AI Seçin" />
            </SelectTrigger>
            <SelectContent>
              {AI_PROVIDERS.map((ai) => (
                <SelectItem key={ai.id} value={ai.id}>
                  {ai.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 h-[400px] overflow-y-auto p-4 rounded-lg border">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
              } max-w-[80%] ${message.role === "user" ? "ml-auto" : ""}`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-3 rounded-lg max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Mesajınızı yazın..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Gönder
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
