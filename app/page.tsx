"use client"

import { useState, useEffect } from "react"
import { LoaderIcon } from "lucide-react"
import Header from "@/components/header";
import DarkVeil from "@/components/DarkVeil";
import Content from "@/components/content";

export default function Page() {
  const [showHello, setShowHello] = useState(true)
  const [grow, setGrow] = useState(false)

  useEffect(() => {
    const growTimer = setTimeout(() => {
      setGrow(true)
    }, 100)

    const hideTimer = setTimeout(() => {
      setShowHello(false)
    }, 100)

    return () => {
      clearTimeout(growTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <main className="border-box m-0 p-0">
      <div>
        {showHello ? (
          <div className="flex h-screen items-center justify-center">
            <LoaderIcon
              className={`animate-spin transition-all duration-[3000ms] ${
                grow ? "size-32" : "size-4 "
              }`}
            />
            
          </div>
        ) : (
          <div>
              <Header/>
              <Content/>
          </div>
        )}
      </div>
    </main>
  )
}
