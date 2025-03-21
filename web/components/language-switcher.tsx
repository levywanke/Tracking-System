"use client"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/i18n/client"
import { useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    // In a real app, you might want to store the language preference
    localStorage.setItem("language", lng)
    // Force a refresh to update all translations
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-all hover:bg-muted">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("language.switch")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <span className="mr-2">🇺🇸</span>
          {t("language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          <span className="mr-2">🇪🇸</span>
          {t("language.spanish")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("fr")}>
          <span className="mr-2">🇫🇷</span>
          {t("language.french")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

