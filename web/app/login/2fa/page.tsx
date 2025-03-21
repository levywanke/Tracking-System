"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, KeyRound } from "lucide-react"
import { verify2FA } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/lib/i18n/client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function TwoFactorAuthPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { toast } = useToast()

  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await verify2FA(code)

      if (success) {
        toast({
          title: t("2fa.success"),
          description: t("2fa.verified"),
        })
        router.push("/dashboard")
      } else {
        setError(t("2fa.invalidCode"))
        toast({
          variant: "destructive",
          title: t("2fa.error"),
          description: t("2fa.invalidCode"),
        })
      }
    } catch (err) {
      setError(t("2fa.errorOccurred"))
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would call an API to resend the code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: t("2fa.codeSent"),
        description: t("2fa.checkEmail"),
      })

      setCountdown(30)
    } catch (error) {
      console.error("Error resending code:", error)
      toast({
        variant: "destructive",
        title: t("2fa.error"),
        description: t("2fa.resendFailed"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t("2fa.title")}</CardTitle>
            <CardDescription>{t("2fa.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">{t("2fa.verificationCode")}</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full transition-all hover:scale-[1.02]" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("2fa.verifying")}
                  </>
                ) : (
                  t("2fa.verify")
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">{t("2fa.didntReceive")}</p>
              <Button
                variant="link"
                className="mt-1 h-auto p-0"
                onClick={handleResendCode}
                disabled={countdown > 0 || isLoading}
              >
                {countdown > 0 ? `${t("2fa.resendIn")} ${countdown}s` : t("2fa.resendCode")}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" asChild>
              <Link href="/login">{t("2fa.backToLogin")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

