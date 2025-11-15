"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LifeBuoy, Mail, MessageSquare, Phone } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            How can we help you?
          </h1>
          <p className="text-gray-400">
            Get in touch with our support team or browse our FAQ section
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-400 mb-4">support@vaultify.com</p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                Send Email
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-400 mb-4">Available 24/7</p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                Start Chat
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-400 mb-4">+1 (555) 123-4567</p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                Call Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Subject</label>
              <Input
                type="text"
                placeholder="How can we help?"
                className="mt-1 bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Message</label>
              <Textarea
                placeholder="Describe your issue..."
                className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                rows={4}
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Send Message
            </Button>
          </form>
        </Card>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-lg font-medium mb-2">How do I deposit funds?</h3>
              <p className="text-gray-400">
                You can deposit funds by navigating to the Wallet section and clicking on the "Deposit" button. Follow the instructions to complete your deposit.
              </p>
            </Card>
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-lg font-medium mb-2">What are the trading fees?</h3>
              <p className="text-gray-400">
                Our trading fees are 0.1% for makers and 0.2% for takers. We offer reduced fees for high-volume traders.
              </p>
            </Card>
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-lg font-medium mb-2">How do I withdraw my funds?</h3>
              <p className="text-gray-400">
                To withdraw funds, go to your Wallet, select the asset you want to withdraw, and click the "Withdraw" button. Enter the amount and destination address.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 