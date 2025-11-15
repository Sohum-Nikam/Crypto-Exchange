"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, X, ArrowLeft } from "lucide-react"
import { CryptoList } from "@/components/crypto-list"
import { TopChains } from "@/components/top-chains"
import { Button } from "@/components/ui/button"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-background text-foreground border-border">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center w-full">
            <Search className="h-5 w-5 mr-2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cryptocurrencies..."
              className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              autoFocus
            />
            <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="all" className="mt-2">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Cryptocurrencies</TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Top Performers
            </TabsTrigger>
            <TabsTrigger value="chains">Top Chains</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <CryptoList searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <CryptoList searchQuery="" filterByTrending={true} />
          </TabsContent>

          <TabsContent value="chains" className="mt-0">
            <TopChains />
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={onClose} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
