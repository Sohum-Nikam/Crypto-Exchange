"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Bell, Lock, Globe, Shield, Key } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Display Name</label>
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
              <div>
                <label className="text-sm text-gray-400">Bio</label>
                <Input
                  type="text"
                  placeholder="Tell us about yourself"
                  className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive security alerts via email</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-gray-400">Receive security alerts via SMS</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                Change Password
              </Button>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Price Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified when prices reach your targets</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Trade Notifications</h3>
                  <p className="text-sm text-gray-400">Receive updates about your trades</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">News Updates</h3>
                  <p className="text-sm text-gray-400">Stay informed about market news</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* API Settings */}
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <Key className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">API Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">API Key</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="text"
                    placeholder="Your API key"
                    className="bg-gray-800/50 border-gray-700 text-white"
                    readOnly
                  />
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-primary">
                    Generate New
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">API Access</h3>
                  <p className="text-sm text-gray-400">Enable API access for trading bots</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Public Profile</h3>
                  <p className="text-sm text-gray-400">Make your profile visible to other users</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Activity Status</h3>
                  <p className="text-sm text-gray-400">Show when you're active on the platform</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 