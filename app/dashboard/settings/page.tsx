"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Settings, User, Wallet, CreditCard, Shield, FileText } from "lucide-react"

/**
 * Settings page
 * User preferences, wallet management, billing, and security
 */
export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [twoFAEnabled, setTwoFAEnabled] = React.useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Settings</h1>
        <p className="mt-2 text-muted">
          Manage your account, preferences, and security
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Display Name</label>
            <Input placeholder="Your name" className="max-w-md" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input type="email" placeholder="your@email.com" className="max-w-md" />
          </div>
          <Button variant="secondary">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Wallet Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
              <div>
                <p className="font-medium">Main Wallet</p>
                <p className="text-sm text-muted font-mono">0x1234...5678</p>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
            <Button variant="secondary" className="w-full">
              Add Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-white/10 p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">NOVA Credits</span>
              <span className="font-bold">1,250</span>
            </div>
            <Button variant="primary" className="w-full mt-4">
              Buy Credits
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Transaction History</p>
            <p className="text-sm text-muted">No transactions yet</p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted">Add an extra layer of security</p>
            </div>
            <Switch checked={twoFAEnabled} onCheckedChange={setTwoFAEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-muted">Receive security alerts via email</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Recovery Phrases</p>
            <Button variant="secondary" size="sm">
              View Recovery Options
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Request Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

