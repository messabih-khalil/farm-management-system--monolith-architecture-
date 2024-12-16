"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // TODO: Implement actual authentication check
    // For now, we'll just check if there's a user item in localStorage
    const user = localStorage.getItem("user")
    setIsSignedIn(!!user)
  }, [])

  const handleSignOut = () => {
    // TODO: Implement actual sign-out logic
    localStorage.removeItem("user")
    setIsSignedIn(false)
    router.push("/signin")
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Link href="/dashboard" className="text-2xl font-bold">
        Milk Farm Management
      </Link>
      {isSignedIn ? (
        <Button onClick={handleSignOut}>Sign Out</Button>
      ) : (
        <Button onClick={() => router.push("/signin")}>Sign In</Button>
      )}
    </header>
  )
}

