import React, { useState } from "react"
import { Settings, ShieldAlert, Lock, Moon, Sun, Monitor, Bell, Key, CheckCircle2, Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

import { useOutletContext } from "react-router"

export function SettingsScreen(props) {
  const context = useOutletContext() || {}
  const theme = props.theme || context.theme || "dark"
  const toggleTheme = props.toggleTheme || context.toggleTheme || (() => {})
  const watermark = props.watermark || context.watermark || "#X7P"
  const [strictness, setStrictness] = useState("Kiosk")
  const [preventCopy, setPreventCopy] = useState(true)
  const [preventBlur, setPreventBlur] = useState(true)
  const [fullscreenReq, setFullscreenReq] = useState(true)
  const [savedMessage, setSavedMessage] = useState(false)

  const handleSave = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER HERO */}
      <div className="flex items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-black tracking-tight">System Settings & Kiosk Specs</h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Configure Anti-Cheat Window Lock strictness, theme mode, and session parameters.
          </p>
        </div>

        <Badge variant="neon" className="font-mono text-xs border-emerald-500/40">
          SESSION WATERMARK {watermark}
        </Badge>
      </div>

      {/* WINDOW LOCK STRICTNESS SETTINGS */}
      <Card className="border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-500" />
            <span>Anti-Cheat Window Lock Engine (`useWindowLock`)</span>
          </CardTitle>
          <CardDescription className="text-xs font-mono">
            Control tab switch detection (`visibilitychange`), focus loss (`window.onblur`), and copy-paste blocking.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          
          {/* STRICTNESS MODE SELECTOR */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Security Strictness Tier:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(["Strict", "Kiosk", "Lenient"]).map(mode => {
                const isActive = strictness === mode
                return (
                  <button
                    key={mode}
                    onClick={() => setStrictness(mode)}
                    className={`p-4 rounded-xl border-2 text-left font-mono transition-all ${
                      isActive
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold shadow-xs"
                        : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">{mode} Mode</span>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-[11px] font-normal opacity-80">
                      {mode === "Kiosk" && "Full anti-cheat with 2-strike system & 5-min handwritten scan requirement."}
                      {mode === "Strict" && "Immediate termination on 1st tab switch or blur."}
                      {mode === "Lenient" && "Warning dialog only without session lockout."}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="divide-y divide-border/60">
            {/* PREVENT COPY PASTE */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm">Disable Text Selection & Copy/Paste</p>
                <p className="text-xs text-muted-foreground font-mono">Enforces `user-select: none` and blocks clipboard events during test runs.</p>
              </div>
              <Switch checked={preventCopy} onCheckedChange={setPreventCopy} />
            </div>

            {/* PREVENT BLUR */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm">Monitor Window Blur (`window.onblur`)</p>
                <p className="text-xs text-muted-foreground font-mono">Detects dual-monitor clicks and external app overlays.</p>
              </div>
              <Switch checked={preventBlur} onCheckedChange={setPreventBlur} />
            </div>

            {/* FULLSCREEN REQUIRED */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm">Require Browser Fullscreen Mode</p>
                <p className="text-xs text-muted-foreground font-mono">Automatically triggers `requestFullscreen()` on sprint start.</p>
              </div>
              <Switch checked={fullscreenReq} onCheckedChange={setFullscreenReq} />
            </div>
          </div>

        </CardContent>

        <CardFooter className="flex justify-between items-center bg-muted/30 border-t border-border pt-4">
          <span className="text-xs font-mono text-muted-foreground">
            Changes apply to all future sprint test runs.
          </span>
          <Button onClick={handleSave} className="font-bold bg-primary">
            {savedMessage ? "Saved Successfully!" : "Save Security Configuration"}
          </Button>
        </CardFooter>
      </Card>

      {/* THEME & INTERFACE SETTINGS */}
      <Card className="border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Monitor className="w-5 h-5 text-indigo-400" />
            <span>Theme & Display Preferences</span>
          </CardTitle>
          <CardDescription className="text-xs font-mono">
            Toggle between High-Energy Dark Mode and Clean Light Mode.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-6 h-6 text-indigo-400" />
              ) : (
                <Sun className="w-6 h-6 text-amber-500" />
              )}
              <div>
                <p className="font-bold text-sm">Active Theme: {theme.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground font-mono">Uses default `oklch` theme variables defined in `index.css`.</p>
              </div>
            </div>
            <Button variant="outline" onClick={toggleTheme} className="font-bold">
              Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
