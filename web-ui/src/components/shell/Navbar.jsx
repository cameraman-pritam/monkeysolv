import React from "react"
import { Zap, BookOpen, Trophy, ShieldAlert, Award, Compass, Settings, Users, Sparkles } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export function Navbar({ activeScreen, onNavigate }) {
  const screens = [
    { id: "sprint", label: "Speed Run", icon: Zap, highlight: true },
    { id: "practice", label: "Practice", icon: BookOpen },
    { id: "levels", label: "Levels Map", icon: Award },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "feed", label: "Social Feed", icon: Users },
    { id: "about", label: "About & Kiosk", icon: ShieldAlert },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="w-full border-b border-border/40 bg-card/60 backdrop-blur-xs px-4 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* SHADCN NAVIGATION MENU DROPDOWNS */}
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              
              {/* Quick Start Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-8 text-xs font-semibold bg-transparent hover:bg-muted/80">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  Quick Start
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[280px]">
                    <div
                      onClick={() => onNavigate("sprint")}
                      className="group flex flex-col space-y-1 p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2 font-bold text-sm text-primary">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Instant Speed Sprint</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        60s timed STEM solve with full anti-cheat window lock.
                      </p>
                    </div>

                    <div
                      onClick={() => onNavigate("practice")}
                      className="group flex flex-col space-y-1 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Compass className="w-4 h-4 text-indigo-400" />
                        <span>Topic & Exam Practice</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Filter by JEE Mains, JEE Advanced, NEET, or NCERT.
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Feed Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-8 text-xs font-semibold bg-transparent hover:bg-muted/80">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                  Community
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[260px]">
                    <div
                      onClick={() => onNavigate("feed")}
                      className="p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="font-bold text-sm mb-0.5">Global Solves Feed</div>
                      <p className="text-xs text-muted-foreground">See verified scan proofs & rival codes.</p>
                    </div>
                    <div
                      onClick={() => onNavigate("leaderboard")}
                      className="p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="font-bold text-sm mb-0.5">Hall of Fame</div>
                      <p className="text-xs text-muted-foreground">Top accuracy & streak leaderboards.</p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About & Kiosk Specs Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-8 text-xs font-semibold bg-transparent hover:bg-muted/80">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                  Kiosk & Rules
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 w-[280px]">
                    <div
                      onClick={() => onNavigate("about")}
                      className="p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="font-bold text-sm">Window Lock Architecture</div>
                      <p className="text-xs text-muted-foreground">Anti-cheat specs, tab switch detection & strikes.</p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* DIRECT QUICK SCREEN BUTTONS */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {screens.map(screen => {
            const Icon = screen.icon
            const isActive = activeScreen === screen.id
            return (
              <Button
                key={screen.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(screen.id)}
                className={`h-8 px-3 text-xs font-medium rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-bold shadow-xs" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                } ${screen.highlight && !isActive ? "border border-amber-500/40 text-amber-500 hover:bg-amber-500/10" : ""}`}
              >
                <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? "text-primary-foreground" : screen.highlight ? "text-amber-500" : ""}`} />
                {screen.label}
              </Button>
            )
          })}
        </div>

      </div>
    </nav>
  )
}
