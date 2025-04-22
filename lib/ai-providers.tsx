import type React from "react"
import {
  Bot,
  MessageSquare,
  Sparkles,
  Zap,
  Brain,
  Globe,
  Lightbulb,
  Cpu,
  Layers,
  Atom,
  Code,
  Compass,
  Aperture,
  Rocket,
  Braces,
  Infinity,
  Flame,
  Wand2,
  Radar,
} from "lucide-react"

export interface AIProvider {
  id: string
  name: string
  model: string
  icon?: React.ComponentType<{ className?: string }>
  description: {
    tr: string
    en: string
  }
  isOpenSource?: boolean
}

export const aiProviders: AIProvider[] = [
  {
    id: "openai",
    name: "ChatGPT",
    model: "GPT-4o",
    icon: Sparkles,
    description: {
      tr: "OpenAI'ın en gelişmiş dil modeli",
      en: "OpenAI's most advanced language model",
    },
  },
  {
    id: "anthropic",
    name: "Claude",
    model: "Claude 3.5 Sonnet",
    icon: MessageSquare,
    description: {
      tr: "Anthropic'in güçlü ve yetenekli AI asistanı",
      en: "Anthropic's powerful and capable AI assistant",
    },
  },
  {
    id: "meta",
    name: "Meta AI",
    model: "Llama 3.1 405B",
    icon: Globe,
    description: {
      tr: "Meta'nın açık kaynaklı büyük dil modeli",
      en: "Meta's open-source large language model",
    },
    isOpenSource: true,
  },
  {
    id: "google",
    name: "Google Gemini",
    model: "Gemini Pro",
    icon: Lightbulb,
    description: {
      tr: "Google'ın çok modlu AI sistemi",
      en: "Google's multimodal AI system",
    },
  },
  {
    id: "microsoft",
    name: "Microsoft Copilot",
    model: "GPT-4o",
    icon: Zap,
    description: {
      tr: "Microsoft'un AI destekli asistanı",
      en: "Microsoft's AI-powered assistant",
    },
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    model: "DeepSeek Chat",
    icon: Brain,
    description: {
      tr: "Açık kaynaklı derin öğrenme tabanlı AI modeli",
      en: "Open-source deep learning-based AI model",
    },
    isOpenSource: true,
  },
  {
    id: "mistral",
    name: "Mistral AI",
    model: "Mistral Large",
    icon: Cpu,
    description: {
      tr: "Mistral AI'ın güçlü dil modeli",
      en: "Mistral AI's powerful language model",
    },
    isOpenSource: true,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    model: "pplx-70b",
    icon: Layers,
    description: {
      tr: "Bilgi odaklı AI asistanı",
      en: "Knowledge-focused AI assistant",
    },
  },
  {
    id: "xai",
    name: "Grok",
    model: "Grok-2",
    icon: Atom,
    description: {
      tr: "X (Twitter) tarafından geliştirilen AI modeli",
      en: "AI model developed by X (Twitter)",
    },
  },
  {
    id: "inflection",
    name: "Pi",
    model: "Inflection-2.5",
    icon: Bot,
    description: {
      tr: "Kişisel AI asistanı",
      en: "Personal AI assistant",
    },
  },
  {
    id: "cohere",
    name: "Cohere",
    model: "Command R+",
    icon: Compass,
    description: {
      tr: "İşletmeler için özelleştirilmiş AI çözümü",
      en: "Customized AI solution for businesses",
    },
  },
  {
    id: "stability",
    name: "Stability AI",
    model: "Stable Diffusion 3",
    icon: Aperture,
    description: {
      tr: "Görsel üretim odaklı AI modeli",
      en: "Image generation focused AI model",
    },
    isOpenSource: true,
  },
  {
    id: "together",
    name: "Together AI",
    model: "RedPajama",
    icon: Infinity,
    description: {
      tr: "Açık kaynaklı AI modelleri platformu",
      en: "Open-source AI models platform",
    },
    isOpenSource: true,
  },
  {
    id: "huggingface",
    name: "HuggingFace",
    model: "BLOOM",
    icon: Rocket,
    description: {
      tr: "Açık kaynak AI topluluğu ve modelleri",
      en: "Open-source AI community and models",
    },
    isOpenSource: true,
  },
  {
    id: "anthropic-claude3",
    name: "Claude 3 Opus",
    model: "Claude 3 Opus",
    icon: Braces,
    description: {
      tr: "Anthropic'in en gelişmiş AI modeli",
      en: "Anthropic's most advanced AI model",
    },
  },
  {
    id: "openai-o1",
    name: "OpenAI o1",
    model: "o1",
    icon: Flame,
    description: {
      tr: "OpenAI'ın en yeni ve güçlü modeli",
      en: "OpenAI's newest and most powerful model",
    },
  },
  {
    id: "aleph-alpha",
    name: "Aleph Alpha",
    model: "Luminous",
    icon: Wand2,
    description: {
      tr: "Avrupa merkezli AI araştırma şirketi",
      en: "European AI research company",
    },
  },
  {
    id: "nvidia",
    name: "NVIDIA NeMo",
    model: "NeMo LLM",
    icon: Radar,
    description: {
      tr: "NVIDIA'nın büyük dil modeli çerçevesi",
      en: "NVIDIA's large language model framework",
    },
    isOpenSource: true,
  },
  {
    id: "ai21",
    name: "AI21 Labs",
    model: "Jurassic-2",
    icon: Code,
    description: {
      tr: "Doğal dil işleme odaklı AI modelleri",
      en: "Natural language processing focused AI models",
    },
  },
]
