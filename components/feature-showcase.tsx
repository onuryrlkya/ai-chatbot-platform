"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useProviders } from "./providers"
import { MessageSquare, Sparkles, Zap } from "lucide-react"

export function FeatureShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { language } = useProviders()

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              {language === "tr" ? "Karşılaştırmalı AI Yanıtları" : "Comparative AI Responses"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === "tr"
                ? "Aynı soruyu birden fazla AI modeline sorarak en iyi yanıtı bulun. Farklı modellerin güçlü yanlarını keşfedin ve ihtiyacınıza en uygun modeli seçin."
                : "Find the best answer by asking the same question to multiple AI models. Discover the strengths of different models and choose the one that best suits your needs."}
            </p>
            <ul className="space-y-4">
              {[
                {
                  icon: <Sparkles className="h-5 w-5 text-primary" />,
                  title: language === "tr" ? "Daha İyi Yanıtlar" : "Better Answers",
                  description:
                    language === "tr"
                      ? "Farklı modellerin yanıtlarını karşılaştırarak en doğru ve kapsamlı bilgiye ulaşın."
                      : "Get the most accurate and comprehensive information by comparing responses from different models.",
                },
                {
                  icon: <MessageSquare className="h-5 w-5 text-primary" />,
                  title: language === "tr" ? "Çoklu Perspektif" : "Multiple Perspectives",
                  description:
                    language === "tr"
                      ? "Aynı konuda farklı yaklaşımları görerek daha geniş bir bakış açısı kazanın."
                      : "Gain a broader perspective by seeing different approaches on the same topic.",
                },
                {
                  icon: <Zap className="h-5 w-5 text-primary" />,
                  title: language === "tr" ? "Zaman Tasarrufu" : "Time Saving",
                  description:
                    language === "tr"
                      ? "Farklı uygulamalar arasında geçiş yapmadan tüm yanıtları tek bir arayüzde görün."
                      : "See all responses in a single interface without switching between different applications.",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-muted/30 rounded-lg border p-1"
          >
            <div className="bg-card rounded-md shadow-sm overflow-hidden">
              <div className="border-b px-4 py-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-xs text-muted-foreground">AI Hub - Chat</div>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-primary/10 rounded-lg p-3 ml-auto max-w-[80%]">
                  <p className="text-sm">Yapay zeka teknolojisinin geleceği hakkında ne düşünüyorsun?</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>ChatGPT yanıtlıyor...</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Yapay zeka teknolojisi önümüzdeki yıllarda hayatımızın her alanında daha fazla yer alacak. Özellikle
                    sağlık, eğitim ve ulaşım sektörlerinde büyük dönüşümler bekliyorum.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Claude yanıtlıyor...</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Yapay zeka, insanlığın karşılaştığı en büyük fırsatlardan biri olabilir. Ancak etik kullanım,
                    güvenlik ve eşitlik konularına dikkat etmeliyiz. Doğru yönetilirse, küresel sorunların çözümünde
                    büyük rol oynayabilir.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
