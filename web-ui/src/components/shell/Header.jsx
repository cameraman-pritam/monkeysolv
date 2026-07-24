import React from "react"
import { Flame, ShieldCheck, Moon, Sun, User, Settings, LogOut, Trophy, Award, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip } from "@/components/ui/tooltip"

export function Header({
  theme,
  toggleTheme,
  currentScreen,
  onNavigate,
  watermark = "#X7P",
  streak = 12,
  userTier = "JEE Adv • Target #100",
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LEFT: BRANDING LOGO */}
        <div 
          onClick={() => onNavigate("practice")} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-indigo-500 to-amber-400 text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-tighter">🐒</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase leading-none -mb-0.5">
              Monkey see
            </span>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              MonkeySolv<span className="text-primary text-xs font-mono ml-0.5 font-bold">.ai</span>
            </span>
          </div>
        </div>

        {/* CENTER: QUICK STATUS BADGES */}
        <div className="hidden md:flex items-center gap-3">
          <Tooltip content="Active Competitive Track">
            <Badge variant="outline" className="px-3 py-1 bg-muted/50 border-primary/20 text-xs font-medium font-sans gap-1.5 shadow-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{userTier}</span>
            </Badge>
          </Tooltip>

          <Tooltip content="Cryptographic Kiosk Session Watermark">
            <Badge variant="neon" className="px-3 py-1 font-mono text-xs gap-1.5 border-emerald-500/40">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>PROOF: <strong className="text-emerald-400 font-bold">{watermark}</strong></span>
            </Badge>
          </Tooltip>
        </div>

        {/* RIGHT: STREAK, THEME TOGGLE, PROFILE AVATAR */}
        <div className="flex items-center gap-3">
          {/* Streak Counter */}
          <Tooltip content="12 Days Continuous Solving Streak!">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span>{streak}d streak</span>
            </div>
          </Tooltip>

          {/* Light / Dark Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-full border border-border/50">
            <Sun className={`w-3.5 h-3.5 ml-1 transition-colors ${theme === 'light' ? 'text-amber-500 font-bold' : 'text-muted-foreground'}`} />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
            <Moon className={`w-3.5 h-3.5 mr-1 transition-colors ${theme === 'dark' ? 'text-indigo-400 font-bold' : 'text-muted-foreground'}`} />
          </div>

          {/* Profile Avatar Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 border border-primary/30 hover:ring-2 hover:ring-primary/40 transition-all">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=MonkeySolv99" alt="User Avatar" />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">MS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none">Pritam (Aspirant)</p>
                  <p className="text-xs leading-none text-muted-foreground font-mono">#X7P • Verified Kiosk User</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate("settings")}>
                <User className="mr-2 h-4 w-4 text-primary" />
                <span>Profile & Stats</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate("levels")}>
                <Award className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Skill Tree Progression</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate("settings")}>
                <Settings className="mr-2 h-4 w-4 text-indigo-400" />
                <span>Window Lock Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Lock & Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </div>
    </header>
  )
}
