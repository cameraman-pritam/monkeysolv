import React from "react"
import { ShieldCheck, Cpu, Lock, Terminal, Activity } from "lucide-react"

export function Footer({ watermark = "#X7P", onNavigate }) {
  return (
    <footer className="w-full border-t border-border/40 bg-card/40 py-4 px-4 lg:px-8 text-xs text-muted-foreground transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Security Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KIOSK ENFORCER: ACTIVE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono">
            <Lock className="w-3 h-3 text-primary" />
            <span>WATERMARK: <strong className="text-foreground">{watermark}</strong></span>
          </div>
        </div>

        {/* Center: System metrics */}
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-amber-500" />
            <span>LATENCY: 14ms</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>LaTeX ENGINE: v4.2</span>
          </div>
        </div>

        {/* Right: Quick Links & Copyright */}
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <button 
            onClick={() => onNavigate("about")}
            className="hover:text-foreground transition-colors underline underline-offset-4"
          >
            Anti-Cheat Rules
          </button>
          <span>•</span>
          <button 
            onClick={() => onNavigate("settings")}
            className="hover:text-foreground transition-colors underline underline-offset-4"
          >
            System Specs
          </button>
          <span>•</span>
          <span>&copy; {new Date().getFullYear()} MonkeySolv.ai</span>
        </div>

      </div>
    </footer>
  )
}
