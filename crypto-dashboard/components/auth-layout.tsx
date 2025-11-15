"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Preloader } from "./preloader"
import { motion, AnimatePresence } from "framer-motion"

const DEFAULT_CREDENTIALS = {
  name: "Admin",
  username: "admin",
  email: "admin@gmail.com",
  password: "admin@123"
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const storedAuth = localStorage.getItem("auth")
        const isAuth = storedAuth === JSON.stringify(DEFAULT_CREDENTIALS)
        setIsAuthenticated(isAuth)
        
        // Add a small delay before hiding preloader for smooth transition
        await new Promise(resolve => setTimeout(resolve, 500))
        setShowPreloader(false)
        
        // Redirect to auth page if not authenticated
        if (!isAuth && pathname !== "/auth") {
          router.push("/auth")
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
        setShowPreloader(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {!isAuthenticated && pathname !== "/auth" ? null : children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 