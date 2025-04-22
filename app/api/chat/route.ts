import { NextResponse } from "next/server"
import OpenAI from "openai"

// OpenAI istemcisini oluştur
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// DeepSeek için OpenAI uyumlu API istemcisi
const deepseekClient = new OpenAI({
  baseURL: "https://api.deepseek.com/v1", // DeepSeek API endpoint
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY, // Eğer ayrı bir anahtar yoksa OpenAI anahtarını kullan (demo amaçlı)
})

export async function POST(req: Request) {
  try {
    const { messages, provider } = await req.json()

    let content = ""

    switch (provider) {
      case "openai":
        const openaiResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
        })
        content = openaiResponse.choices[0]?.message?.content || "Yanıt alınamadı."
        break

      case "deepseek":
        try {
          // DeepSeek API'ye istek gönder
          const deepseekResponse = await deepseekClient.chat.completions.create({
            model: "deepseek-chat", // DeepSeek model adı
            messages: messages.map((msg: any) => ({
              role: msg.role,
              content: msg.content,
            })),
          })
          content = deepseekResponse.choices[0]?.message?.content || "DeepSeek yanıt alınamadı."
        } catch (error) {
          console.error("DeepSeek API hatası:", error)
          content =
            "DeepSeek API'ye bağlanırken bir hata oluştu. API anahtarınızı kontrol edin veya daha sonra tekrar deneyin."
        }
        break

      default:
        // Diğer sağlayıcılar için demo yanıt
        const demoResponses: Record<string, string> = {
          anthropic:
            "Claude yanıtı: Bu soruya kapsamlı bir yanıt vermek gerekirse, birkaç farklı açıdan bakmak önemli. Öncelikle, konuyu tarihsel bağlamda değerlendirmek ve ardından güncel gelişmeleri analiz etmek daha doğru olacaktır.",
          google:
            "Google Gemini yanıtı: Araştırmalarıma göre, bu konuda çeşitli görüşler bulunmaktadır. En güncel veriler ışığında, bilimsel konsensüs şu yöndedir...",
          meta: "Meta Llama yanıtı: Açık kaynak topluluğunun bakış açısıyla, bu konu oldukça ilginç. Farklı yaklaşımlar ve çözümler düşünüldüğünde...",
          microsoft:
            "Microsoft Copilot yanıtı: Microsoft ekosistemi perspektifinden bakıldığında, bu konuda entegre çözümler sunabiliriz. Öncelikle...",
          mistral:
            "Mistral AI yanıtı: Fransız yapay zeka araştırma ekibimizin geliştirdiği modellerle yaptığımız analizlere göre...",
          perplexity:
            "Perplexity yanıtı: İnternet üzerindeki en güncel kaynaklara göre, bu konuda şu bilgiler öne çıkıyor...",
          xai: "Grok yanıtı: Biraz mizahi bir yaklaşımla, bu konuya farklı bir açıdan bakalım. Aslında...",
          inflection: "Pi yanıtı: Kişisel asistanınız olarak, size bu konuda şu bilgileri sunabilirim...",
        }

        content =
          demoResponses[provider] ||
          `Bu bir ${provider} demo yanıtıdır. Şu anda sadece OpenAI ve DeepSeek entegrasyonları aktif durumdadır. Diğer sağlayıcılar için entegrasyonlar yakında eklenecektir.`
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("API hatası:", error)
    return NextResponse.json({ error: "İstek işlenirken bir hata oluştu" }, { status: 500 })
  }
}
