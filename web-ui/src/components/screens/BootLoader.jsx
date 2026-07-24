import React, { useEffect, useState } from "react"
import { ShieldCheck, Cpu, Terminal, Sparkles, CheckCircle2, Lock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function BootLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const bootSteps = [
      { pct: 15, msg: "Initializing Kiosk Window Lock Kernel..." },
      { pct: 35, msg: "Connecting to Cryptographic Watermark Generator (#X7P)..." },
      { pct: 55, msg: "Mounting LaTeX / MathJax Rendering Core..." },
      { pct: 75, msg: "Verifying Anti-Cheat Blur & Focus Event Listeners..." },
      { pct: 90, msg: "Fetching Active Exam Syllabus & Leaderboards..." },
      { pct: 100, msg: "MonkeySolv Engine Ready. Launching Kiosk..." },
    ]

    let stepIdx = 0
    const interval = setInterval(() => {
      if (stepIdx < bootSteps.length) {
        const step = bootSteps[stepIdx]
        setProgress(step.pct)
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${step.msg}`])
        stepIdx++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6 font-mono select-none">
      <div className="w-full max-w-md space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* LOGO & HEADING */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary via-indigo-500 to-amber-400 text-white shadow-xl shadow-primary/20 animate-pulse">
            <span className="text-3xl">🐒</span>
          </div>
          <span className="text-xs tracking-widest text-muted-foreground uppercase mt-2">
            Monkey see
          </span>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            MonkeySolv<span className="text-primary text-sm">.ai</span>
          </h1>
          <p className="text-xs text-muted-foreground">High-Speed STEM Competitive Platform</p>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2 text-left bg-card p-4 rounded-xl border border-border/60 shadow-lg">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-primary">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              SYSTEM BOOT SEQUENCE
            </span>
            <span>{progress}%</span>
          </div>

          <Progress value={progress} className="h-3" colorClass="bg-gradient-to-r from-primary to-indigo-500" />

          {/* LOG CONSOLE */}
          <div className="h-32 overflow-y-auto mt-3 p-3 bg-muted/70 rounded-lg text-[11px] space-y-1 font-mono border border-border/40 text-muted-foreground">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER STATS */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-500" /> KIOSK ENFORCED
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400" /> WATERMARK #X7P
          </span>
        </div>

      </div>
    </div>
  )
}
