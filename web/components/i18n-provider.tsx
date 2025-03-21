"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n/config"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get stored language preference
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage)
    }
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

