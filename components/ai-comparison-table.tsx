"use client"

import { useProviders } from "./providers"
import { Check, X, Code } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function AIComparisonTable() {
  const { language } = useProviders()

  const models = [
    {
      name: "ChatGPT (GPT-4o)",
      strengths:
        language === "tr"
          ? ["Genel bilgi", "Kod yazma", "Yaratıcı içerik", "Çok dilli destek"]
          : ["General knowledge", "Code writing", "Creative content", "Multilingual support"],
      weaknesses: language === "tr" ? ["Veri kesim tarihi", "Halüsinasyonlar"] : ["Data cutoff date", "Hallucinations"],
      features: {
        multimodal: true,
        reasoning: 5,
        creativity: 5,
        factuality: 4,
        coding: 5,
      },
      isOpenSource: false,
    },
    {
      name: "Claude (Sonnet)",
      strengths:
        language === "tr"
          ? ["Uzun bağlam penceresi", "Doğruluk", "Etik kılavuzlar", "Belge analizi"]
          : ["Long context window", "Accuracy", "Ethical guidelines", "Document analysis"],
      weaknesses:
        language === "tr"
          ? ["Kod yazma", "Bazı dillerde sınırlı destek"]
          : ["Code writing", "Limited support in some languages"],
      features: {
        multimodal: true,
        reasoning: 5,
        creativity: 4,
        factuality: 5,
        coding: 3,
      },
      isOpenSource: false,
    },
    {
      name: "Google Gemini",
      strengths:
        language === "tr"
          ? ["Çok modlu anlama", "Güncel bilgi", "Google entegrasyonu"]
          : ["Multimodal understanding", "Up-to-date information", "Google integration"],
      weaknesses:
        language === "tr"
          ? ["Yaratıcı içerik", "Bazı dil sınırlamaları"]
          : ["Creative content", "Some language limitations"],
      features: {
        multimodal: true,
        reasoning: 4,
        creativity: 3,
        factuality: 5,
        coding: 4,
      },
      isOpenSource: false,
    },
    {
      name: "DeepSeek",
      strengths:
        language === "tr"
          ? ["Açık kaynak", "Özelleştirilebilir", "Kod anlama"]
          : ["Open source", "Customizable", "Code understanding"],
      weaknesses:
        language === "tr"
          ? ["Sınırlı çok modlu destek", "Daha az yaygın kullanım"]
          : ["Limited multimodal support", "Less widespread usage"],
      features: {
        multimodal: false,
        reasoning: 4,
        creativity: 3,
        factuality: 4,
        coding: 5,
      },
      isOpenSource: true,
    },
    {
      name: "Meta Llama 3",
      strengths:
        language === "tr"
          ? ["Açık kaynak", "Özelleştirilebilir", "Yerel çalıştırma imkanı"]
          : ["Open source", "Customizable", "Local deployment"],
      weaknesses:
        language === "tr"
          ? ["Daha küçük bağlam penceresi", "Sınırlı çok modlu destek"]
          : ["Smaller context window", "Limited multimodal support"],
      features: {
        multimodal: false,
        reasoning: 4,
        creativity: 4,
        factuality: 3,
        coding: 4,
      },
      isOpenSource: true,
    },
  ]

  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-2 w-5 rounded-sm mr-0.5 ${i < rating ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">{language === "tr" ? "Model" : "Model"}</TableHead>
            <TableHead>{language === "tr" ? "Güçlü Yönler" : "Strengths"}</TableHead>
            <TableHead>{language === "tr" ? "Zayıf Yönler" : "Weaknesses"}</TableHead>
            <TableHead className="text-center">{language === "tr" ? "Çok Modlu" : "Multimodal"}</TableHead>
            <TableHead className="text-center">{language === "tr" ? "Akıl Yürütme" : "Reasoning"}</TableHead>
            <TableHead className="text-center">{language === "tr" ? "Yaratıcılık" : "Creativity"}</TableHead>
            <TableHead className="text-center">{language === "tr" ? "Doğruluk" : "Factuality"}</TableHead>
            <TableHead className="text-center">{language === "tr" ? "Kodlama" : "Coding"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.name}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {model.name}
                  {model.isOpenSource && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      {language === "tr" ? "Açık Kaynak" : "Open Source"}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {model.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {model.weaknesses.map((weakness, i) => (
                    <li key={i}>{weakness}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-center">
                {model.features.multimodal ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-500" />
                )}
              </TableCell>
              <TableCell className="text-center">{renderRating(model.features.reasoning)}</TableCell>
              <TableCell className="text-center">{renderRating(model.features.creativity)}</TableCell>
              <TableCell className="text-center">{renderRating(model.features.factuality)}</TableCell>
              <TableCell className="text-center">{renderRating(model.features.coding)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
