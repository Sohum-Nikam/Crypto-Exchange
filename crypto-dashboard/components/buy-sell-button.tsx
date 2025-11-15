"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function BuySellButton() {
  const router = useRouter()

  return (
    <Button
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
      onClick={() => router.push("/buy")}
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
} 