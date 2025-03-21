import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">Gun Tracking System</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Efficient Gun Tracking</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A comprehensive solution for managing personnel, equipment, and resources with advanced tracking and
              reporting capabilities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg" className="gap-2 transition-all hover:scale-105">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="transition-all hover:bg-primary/10">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold">Personnel Management</h3>
              <p className="mt-2 text-muted-foreground">
                Efficiently manage personnel records, assignments, and qualifications.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold">Equipment Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Track equipment assignments, maintenance schedules, and usage history.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold">Location Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor real-time locations and maintain detailed check-in records.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Gun Tracking System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

