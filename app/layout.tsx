import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mathew De Mesa | Full Stack Developer",
  description:
    "Welcome to the portfolio of Mathew A. De Mesa, an aspiring Full Stack Developer and third-year college student showcasing skills, projects, and development experience.",
  keywords: [
    "Mathew De Mesa",
    "Web Developer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Mathew A. De Mesa" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
