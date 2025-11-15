"use client"

import { motion } from "framer-motion"
import { Wallet, Loader2 } from "lucide-react"

export function Preloader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center z-50">
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 animate-pulse"></div>
          <div className="relative bg-gray-900/30 border border-gray-800/50 rounded-full p-4 backdrop-blur-xl">
            <Wallet className="h-8 w-8 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeOut"
          }}
          className="mt-4 text-center"
        >
          <h2 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Vaultify
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            <p className="text-gray-400 text-sm">Loading your dashboard...</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: "easeOut"
          }}
          className="absolute bottom-4 left-0 right-0 text-center"
        >
          <p className="text-xs text-gray-500">Securing your connection...</p>
        </motion.div>
      </div>
    </div>
  )
} 