"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, RefreshCw, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AIProvider } from "@/lib/ai-providers"
import { useProviders } from "./providers"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  provider?: string
}

interface ChatInterfaceProps {
  selectedProviders: AIProvider[]
}

export function ChatInterface({ selectedProviders }: ChatInterfaceProps) {
  const { language } = useProviders()
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({})
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<string>(selectedProviders[0]?.id || "")
  const [copied, setCopied] = useState<Record<string, boolean>>({})

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize messages for each provider
  useEffect(() => {
    const newMessages: Record<string, ChatMessage[]> = {}
    const newIsLoading: Record<string, boolean> = {}

    selectedProviders.forEach((provider) => {
      if (!messages[provider.id]) {
        newMessages[provider.id] = [
          {
            id: `welcome-${provider.id}`,
            role: "assistant",
            content:
              language === "tr"
                ? `Merhaba! Ben ${provider.name}. Size nasıl yardımcı olabilirim?`
                : `Hello! I'm ${provider.name}. How can I help you today?`,
            provider: provider.id,
          },
        ]
      }
      newIsLoading[provider.id] = false
    })

    setMessages((prev) => ({ ...prev, ...newMessages }))
    setIsLoading((prev) => ({ ...prev, ...newIsLoading }))

    // Set active tab to first provider if current active is not in selection
    if (!selectedProviders.some((p) => p.id === activeTab) && selectedProviders.length > 0) {
      setActiveTab(selectedProviders[0].id)
    }
  }, [selectedProviders, language])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || Object.values(isLoading).some((loading) => loading)) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    }

    // Add user message to all selected providers
    const updatedMessages = { ...messages }
    selectedProviders.forEach((provider) => {
      if (!updatedMessages[provider.id]) {
        updatedMessages[provider.id] = []
      }
      updatedMessages[provider.id] = [...updatedMessages[provider.id], { ...userMessage, provider: provider.id }]
    })

    setMessages(updatedMessages)
    setInput("")

    // Set loading state for all selected providers
    const updatedIsLoading = { ...isLoading }
    selectedProviders.forEach((provider) => {
      updatedIsLoading[provider.id] = true
    })
    setIsLoading(updatedIsLoading)

    // Send request to each provider
    selectedProviders.forEach(async (provider) => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages[provider.id],
            provider: provider.id,
          }),
        })

        if (!response.ok) {
          throw new Error("API yanıt vermedi")
        }

        const data = await response.json()

        // Add AI response
        setMessages((prev) => ({
          ...prev,
          [provider.id]: [
            ...prev[provider.id],
            {
              id: `assistant-${Date.now()}-${provider.id}`,
              role: "assistant",
              content: data.content,
              provider: provider.id,
            },
          ],
        }))
      } catch (error) {
        console.error("Hata:", error)
        setMessages((prev) => ({
          ...prev,
          [provider.id]: [
            ...prev[provider.id],
            {
              id: `error-${Date.now()}-${provider.id}`,
              role: "assistant",
              content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
              provider: provider.id,
            },
          ],
        }))
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          [provider.id]: false,
        }))
      }
    })
  }

  const handleCopy = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content)
    setCopied({ [messageId]: true })
    setTimeout(() => setCopied({}), 2000)
  }

  const getProviderById = (id: string) => {
    return selectedProviders.find((p) => p.id === id)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] border rounded-lg overflow-hidden bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <div className="border-b px-4">
          <TabsList className="h-12">
            {selectedProviders.map((provider) => (
              <TabsTrigger
                key={provider.id}
                value={provider.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary/10"
              >
                {provider.icon && <provider.icon className="h-4 w-4" />}
                {provider.name}
                {isLoading[provider.id] && <RefreshCw className="h-3 w-3 animate-spin ml-1" />}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {selectedProviders.map((provider) => (
          <TabsContent key={provider.id} value={provider.id} className="flex-1 flex flex-col overflow-hidden mt-0 p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                <AnimatePresence initial={false}>
                  {messages[provider.id]?.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={cn(
                          "group flex w-full gap-2 rounded-lg px-4 py-3",
                          message.role === "user" ? "bg-primary/10" : "bg-muted/50",
                        )}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {message.role === "user" ? (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium">Sen</span>
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              {getProviderById(provider.id)?.icon && <provider.icon className="h-5 w-5 text-primary" />}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="prose prose-sm dark:prose-invert max-w-none">{message.content}</div>
                          {message.role === "assistant" && (
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleCopy(message.content, message.id)}
                              >
                                {copied[message.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading[provider.id] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex w-full gap-2 rounded-lg px-4 py-3 bg-muted/50"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getProviderById(provider.id)?.icon && <provider.icon className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                <Textarea
                  className="min-h-24 resize-none"
                  placeholder={language === "tr" ? "Mesajınızı yazın..." : "Type your message..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={Object.values(isLoading).some((loading) => loading)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10"
                  disabled={Object.values(isLoading).some((loading) => loading) || !input.trim()}
                >
                  {Object.values(isLoading).some((loading) => loading) ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
