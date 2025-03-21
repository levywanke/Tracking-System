"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/lib/i18n/client"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Loader2, Shield, Globe, Bell, Moon, User, Sun } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { toast } = useToast()

  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handle2FAToggle = async (checked: boolean) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (checked) {
        setShowQRCode(true)
      } else {
        setShowQRCode(false)
      }

      setIs2FAEnabled(checked)

      toast({
        title: checked ? t("settings.2faEnabled") : t("settings.2faDisabled"),
        description: checked ? t("settings.2faEnabledDesc") : t("settings.2faDisabledDesc"),
      })
    } catch (error) {
      console.error("Error toggling 2FA:", error)
      toast({
        variant: "destructive",
        title: t("settings.error"),
        description: t("settings.errorToggling2FA"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: t("settings.profileUpdated"),
        description: t("settings.profileUpdatedDesc"),
      })
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        variant: "destructive",
        title: t("settings.error"),
        description: t("settings.errorSavingProfile"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: t("settings.passwordChanged"),
        description: t("settings.passwordChangedDesc"),
      })
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        variant: "destructive",
        title: t("settings.error"),
        description: t("settings.errorChangingPassword"),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
        <p className="text-muted-foreground">{t("settings.description")}</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.account")}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.security")}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.notifications")}</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.appearance")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.profileInformation")}</CardTitle>
                <CardDescription>{t("settings.profileDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("settings.name")}</Label>
                    <Input id="name" defaultValue={session?.user?.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("settings.email")}</Label>
                    <Input id="email" type="email" defaultValue={session?.user?.email || ""} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t("settings.bio")}</Label>
                  <Input id="bio" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("settings.saving")}
                    </>
                  ) : (
                    t("settings.saveChanges")
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.changePassword")}</CardTitle>
                <CardDescription>{t("settings.passwordDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t("settings.currentPassword")}</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t("settings.newPassword")}</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("settings.confirmPassword")}</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleChangePassword} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("settings.changing")}
                    </>
                  ) : (
                    t("settings.changePassword")
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("settings.twoFactorAuth")}</CardTitle>
                <CardDescription>{t("settings.2faDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.enable2FA")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.2faExplanation")}</p>
                  </div>
                  <Switch checked={is2FAEnabled} onCheckedChange={handle2FAToggle} disabled={isLoading} />
                </div>

                {showQRCode && (
                  <div className="mt-6 rounded-lg border bg-card p-4">
                    <h3 className="mb-2 text-sm font-medium">{t("settings.scanQRCode")}</h3>
                    <div className="flex justify-center">
                      <QRCodeSVG
                        value="otpauth://totp/RMS:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=RMS"
                        size={200}
                        className="rounded-lg border p-2"
                      />
                    </div>
                    <p className="mt-4 text-center text-sm text-muted-foreground">{t("settings.scanInstructions")}</p>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" size="sm">
                        {t("settings.cannotScan")}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.notificationPreferences")}</CardTitle>
                <CardDescription>{t("settings.notificationDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.emailNotifications")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.emailNotificationsDesc")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.pushNotifications")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.pushNotificationsDesc")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.smsNotifications")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.smsNotificationsDesc")}</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t("settings.savePreferences")}</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="appearance">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.appearanceSettings")}</CardTitle>
                <CardDescription>{t("settings.appearanceDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>{t("settings.theme")}</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        <Sun className="mr-2 h-4 w-4" />
                        {t("settings.light")}
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Moon className="mr-2 h-4 w-4" />
                        {t("settings.dark")}
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <span className="mr-2">🖥️</span>
                        {t("settings.system")}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>{t("settings.language")}</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        English
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        Español
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        Français
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t("settings.savePreferences")}</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

