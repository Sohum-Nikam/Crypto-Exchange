"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  Lock, 
  User, 
  AtSign, 
  Wallet, 
  Loader2,
  Eye,
  EyeOff,
  Chrome,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const DEFAULT_CREDENTIALS = {
  name: "Admin",
  username: "admin",
  email: "admin@gmail.com",
  password: "admin@123"
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // If it's sign up, just ignore
      if (isSignUp) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setError("Sign up is currently disabled")
        setIsLoading(false)
        return
      }

      // Validate credentials
      if (
        formData.email !== DEFAULT_CREDENTIALS.email ||
        formData.password !== DEFAULT_CREDENTIALS.password
      ) {
        throw new Error("Invalid email or password")
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success state
      setIsSuccess(true)
      localStorage.setItem("auth", JSON.stringify(DEFAULT_CREDENTIALS))
      
      // Wait for success animation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to dashboard with animation
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-gray-900/30 border-gray-800/50 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </motion.div>
                  <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Welcome to Vaultify!
                  </h2>
                  <p className="text-gray-400">
                    Redirecting to your dashboard...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {isSignUp ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p className="text-gray-400 mt-2">
                      {isSignUp ? "Sign up to get started" : "Sign in to continue"}
                    </p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <p className="text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                      <>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="pl-10 bg-gray-800/30 border-gray-700/50 text-white"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="pl-10 bg-gray-800/30 border-gray-700/50 text-white"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </>
                    )}
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="pl-10 bg-gray-800/30 border-gray-700/50 text-white"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="pl-10 bg-gray-800/30 border-gray-700/50 text-white"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        isSignUp ? "Sign Up" : "Sign In"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700/50"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-900/30 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="bg-gray-800/30 border-gray-700/50 text-white hover:bg-gray-800/50 group"
                      >
                        <Chrome className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-800/30 border-gray-700/50 text-white hover:bg-gray-800/50 group"
                      >
                        <Wallet className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-800/30 border-gray-700/50 text-white hover:bg-gray-800/50 group"
                      >
                        <Shield className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 