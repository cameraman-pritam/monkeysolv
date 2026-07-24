import React from "react"
import { ShieldAlert, Lock, AlertTriangle, CheckCircle2, Cpu, Terminal, FileText, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { useOutletContext } from "react-router"

export function AboutScreen(props) {
  const context = useOutletContext() || {}
  const onStartSprint = props.onStartSprint || context.onStartSprint || (() => {})
  const watermark = props.watermark || context.watermark || "#X7P"
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HERO SECTION */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/30 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground font-black text-2xl">
            🐒
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase">
              Monkey see
            </span>
            <h1 className="text-3xl font-black tracking-tight">
              MonkeySolv<span className="text-primary text-sm font-mono">.ai</span> — Anti-Cheat Kiosk Platform
            </h1>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          MonkeySolv is a desktop-first competitive STEM solving engine designed for JEE, NEET, and Board aspirants. It enforces absolute test integrity using the custom <code className="font-mono text-primary font-bold">useWindowLock</code> engine and cryptographic watermark proofing.
        </p>
      </div>

      {/* WINDOW LOCK SPECIFICATIONS CARD */}
      <Card className="border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-emerald-500" />
            <span>Window Lock Engine Specs (`useWindowLock`)</span>
          </CardTitle>
          <CardDescription className="text-xs font-mono">
            Technical specification of the client-side anti-cheat kiosk system.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                <span>Strike 1 Warning</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Triggered on first tab switch (<code className="font-mono">visibilitychange</code>) or loss of window focus (<code className="font-mono">window.onblur</code>). Displays a full-screen blurred alert demanding return to test.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-destructive">
                <Lock className="w-4 h-4" />
                <span>Strike 2 Session Lockout</span>
              </div>
              <p className="text-xs text-muted-foreground">
                A second focus violation immediately terminates the sprint session, invalidates points, and locks the screen.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-400">
                <FileText className="w-4 h-4" />
                <span>Clipboard & Selection Lock</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Disables text selection (<code className="font-mono">user-select: none</code>), right-click context menu, and copy/paste handlers during test run.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Watermark Paper Verification</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Requires a 5-minute photo submission post-sprint with session watermark code (e.g. <strong className="text-emerald-500">{watermark}</strong>) handwritten on scratchpad.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Ready to test the Kiosk Engine?</p>
              <p className="text-xs text-muted-foreground font-mono">Launch a 60-second speed sprint to verify anti-cheat handlers.</p>
            </div>
            <Button onClick={onStartSprint} className="font-bold">
              <Zap className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" /> Start Sprint Test
            </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
