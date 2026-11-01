"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Download, ArrowUpRight, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Sun, Moon, SunMoon } from "lucide-react"
import { useState, useEffect } from "react"
import { getIcon } from "@/lib/icons"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about")
  const [scroll, setScroll] = useState(0)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const isScrolled = scroll > 50

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight

      setScroll(scrollY)
      setProgress(
        scrollHeight > 0 ? Math.min((scrollY / scrollHeight) * 100, 100) : 0
      )
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const [theme, setTheme] = useState<"light" | "dark" | "">(() => {
    if (typeof window === "undefined") return ""
    return (localStorage.getItem("theme") as "light" | "dark" | "") || ""
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typeof event.key !== "string" || event.key.toLowerCase() !== "d") {
        return
      }

      if (event.key.toLowerCase() === "d") {
        const theme = localStorage.getItem("theme")
        setTheme(theme as "light" | "dark" | "")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 transition-all duration-300 ease-in-out sm:px-6 ${
        !isScrolled ? "pt-5" : "pt-15"
      }`}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-foreground/70 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <nav
        className={`metallic-navbar mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border border-border py-4"
            : "border border-transparent py-3"
        }`}
      >
        <span
          className="group flex items-center gap-3"
          aria-label="Go to homepage"
        >
          <div>
            <p className="text-center font-bold tracking-wider">
              Mathew<span className="text-zinc-400">.</span>
            </p>

            <p className="text-[10px] tracking-[0.2em] text-muted-foreground">
              DEVELOPER PORTFOLIO
            </p>
          </div>
        </span>

        <div
          className={`hidden items-center transition-all duration-300 ease-in-out ${
            !isScrolled ? "gap-5 " : "gap-8"
          } lg:flex`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.href.slice(1))}
                className={`nav-link text-lg ${
                  isActive ? "nav-link-active" : ""
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:block">
          <AlertDialog>
            <article className="flex gap-2">
              <Tooltip>
                <TooltipTrigger className="rounded bg-primary p-2 text-primary-foreground">
                  {theme === "dark" ? (
                    <SunMoon className="h-4 w-4" />
                  ) : theme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Press &quot;d&quot; to toggle {theme} mode</p>{" "}
                </TooltipContent>
              </Tooltip>
              <AlertDialogTrigger asChild>
                <Button className="h-10 rounded-lg border border-border bg-primary px-6 font-medium tracking-wide text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90">
                  <Eye className="mr-2 h-4 w-4 opacity-60" />
                  View CV
                  <span className="ml-3 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                </Button>
              </AlertDialogTrigger>
            </article>

            <AlertDialogContent className="flex h-[95vh] w-screen max-w-6xl flex-col gap-0 overflow-hidden border border-border bg-background p-0 text-foreground sm:rounded-2xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <AlertDialogTitle className="text-lg font-semibold">
                    My Resume
                  </AlertDialogTitle>

                  <AlertDialogDescription className="mt-1 text-xs text-muted-foreground">
                    My experience, skills, and qualifications.
                  </AlertDialogDescription>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:opacity-90"
                  >
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>

                  <AlertDialogCancel className="mt-0 border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground">
                    <X />
                    Close
                  </AlertDialogCancel>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-muted">
                <iframe
                  src="/resume.pdf#toolbar=1&navpanes=0&view=FitH"
                  className="h-full w-full"
                  title="My Resume"
                />
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="metallic-mobile-trigger lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="metallic-mobile-panel w-[300px] border-l border-border"
          >
            {/* <SheetTitle className="text-lg font-bold tracking-wider text-foreground">
              NAVIGATION
            </SheetTitle> */}

            <div className="mt-10 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)

                return (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setActiveSection(link.href.slice(1))}
                      className={`mobile-nav-link ${
                        isActive ? "mobile-nav-active" : ""
                      }`}
                    >
                      {link.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </SheetClose>
                )
              })}
            </div>

            <div className="mt-8">
              <Button asChild className="metallic-button w-full rounded-xl px-4">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            <div className="absolute bottom-8 left-6 text-xs tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} MATHEW
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
