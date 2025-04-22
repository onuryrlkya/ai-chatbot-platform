import Link from "next/link"
import { BrainCircuit, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AI Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tüm yapay zeka modellerini tek bir platformda birleştiren yenilikçi çözüm. Farklı AI'ları karşılaştırın ve
              ihtiyacınıza en uygun modeli seçin.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Özellikler
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Kaynaklar</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dokümantasyon
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    API Referansı
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 md:col-span-1">
              <h3 className="font-medium">İletişim</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="mailto:yrlkyaonur@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    yrlkyaonur@gmail.com
                  </Link>
                </li>
                <li className="flex items-center gap-4 pt-2">
                  <Link
                    href="https://github.com/onuryrlkya"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/onuryerlikaya06"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Hub. Tüm hakları saklıdır. Onur Yerlikaya tarafından geliştirilmiştir.</p>
        </div>
      </div>
    </footer>
  )
}
