"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Users, Package, MapPin, Settings, LogOut, Bell, Search, User, Shield } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/i18n/client"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(3)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const isLoading = status === "loading"

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const handleLogout = async () => {
    await signOut({ redirect: false })
    toast({
      title: t("dashboard.loggedOut"),
      description: t("dashboard.logoutSuccess"),
    })
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  const menuItems = [
    { title: t("dashboard.dashboard"), icon: BarChart3, path: "/dashboard" },
    { title: t("dashboard.personnel"), icon: Users, path: "/dashboard/personnel" },
    { title: t("dashboard.equipment"), icon: Package, path: "/dashboard/equipment" },
    { title: t("dashboard.location"), icon: MapPin, path: "/dashboard/location" },
    { title: t("dashboard.settings"), icon: Settings, path: "/dashboard/settings" },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-muted/30">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary"></div>
              <span className="text-xl font-bold">RMS</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t("dashboard.mainMenu")}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.title}>
                        <a href={item.path} className="transition-colors duration-200">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>{t("dashboard.reports")}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/reports/daily" className="transition-colors duration-200">
                        <BarChart3 className="h-5 w-5" />
                        <span>{t("dashboard.dailyReports")}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/reports/monthly" className="transition-colors duration-200">
                        <BarChart3 className="h-5 w-5" />
                        <span>{t("dashboard.monthlyReports")}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="mb-4 flex items-center justify-between">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>{t("dashboard.logout")}</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <AnimatePresence initial={false}>
                {isSearchExpanded ? (
                  <motion.div
                    initial={{ width: 64, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 64, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={t("dashboard.search")}
                      className="pl-8 pr-8"
                      autoFocus
                      onBlur={() => setIsSearchExpanded(false)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setIsSearchExpanded(false)}
                    >
                      <span className="sr-only">Close</span>
                      &times;
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ width: 320, opacity: 0 }}
                    animate={{ width: 40, opacity: 1 }}
                    exit={{ width: 320, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchExpanded(true)}
                      className="transition-all hover:bg-muted"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">{t("dashboard.search")}</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <Badge
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                        variant="destructive"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>{t("dashboard.notifications")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-auto">
                    {[...Array(notifications)].map((_, i) => (
                      <DropdownMenuItem key={i} className="flex flex-col items-start p-4">
                        <div className="flex w-full items-center justify-between">
                          <span className="font-medium">{t("dashboard.notificationTitle")}</span>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{t("dashboard.notificationContent")}</p>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setNotifications(0)}>
                      {t("dashboard.markAllAsRead")}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2" size="sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session?.user?.image || "/placeholder.svg?height=32&width=32"}
                        alt={session?.user?.name || "User"}
                      />
                      <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{session?.user?.email || ""}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    {t("dashboard.profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    {t("dashboard.settings")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/security")}>
                    <Shield className="mr-2 h-4 w-4" />
                    {t("dashboard.security")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("dashboard.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

