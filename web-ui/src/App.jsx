import React, { useState } from "react"
import { useTheme } from "@/hooks/useTheme"
import { useWindowLock } from "@/hooks/useWindowLock"
import { Header } from "@/components/shell/Header"
import { Navbar } from "@/components/shell/Navbar"
import { Footer } from "@/components/shell/Footer"
import { BootLoader } from "@/components/screens/BootLoader"
import { SprintScreen } from "@/components/screens/SprintScreen"
import { PracticeScreen } from "@/components/screens/PracticeScreen"
import { LevelsScreen } from "@/components/screens/LevelsScreen"
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen"
import { FeedScreen } from "@/components/screens/FeedScreen"
import { SettingsScreen } from "@/components/screens/SettingsScreen"
import { AboutScreen } from "@/components/screens/AboutScreen"
import { AlertTriangle, Lock, ShieldAlert, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [isBooting, setIsBooting] = useState(true)
  const [currentScreen, setCurrentScreen] = useState("practice")
  const [isWindowLockEnabled, setIsWindowLockEnabled] = useState(false)

  // Custom Window Lock Engine
  const {
    strikes,
    isWarningOpen,
    isTerminated,
    watermark,
    requestFullscreen,
    dismissWarning,
    resetLock,
  } = useWindowLock({
    enabled: isWindowLockEnabled,
    watermark: "#X7P",
    onTerminate: () => {
      setIsWindowLockEnabled(false)
    },
    onWarning: (strike) => {
      // Called on strike 1
    }
  })

  const handleStartSprintLock = () => {
    setIsWindowLockEnabled(true)
    requestFullscreen()
  }

  const handleStopSprintLock = () => {
    setIsWindowLockEnabled(false)
  }

  const handleNavigate = (screenId) => {
    setCurrentScreen(screenId)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isBooting) {
    return <BootLoader onComplete={() => setIsBooting(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors selection:bg-primary/20">
      
      {/* 1. PERSISTENT GLOBAL HEADER */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        watermark={watermark}
      />

      {/* 2. PERSISTENT GLOBAL NAVBAR */}
      <Navbar
        activeScreen={currentScreen}
        onNavigate={handleNavigate}
      />

      {/* 3. DYNAMIC SCREEN ROUTE CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {currentScreen === "sprint" && (
          <SprintScreen
            watermark={watermark}
            onStartLock={handleStartSprintLock}
            onStopLock={handleStopSprintLock}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === "practice" && (
          <PracticeScreen
            onStartSprint={() => handleNavigate("sprint")}
          />
        )}

        {currentScreen === "levels" && (
          <LevelsScreen
            onStartSprint={() => handleNavigate("sprint")}
          />
        )}

        {currentScreen === "leaderboard" && (
          <LeaderboardScreen
            onStartSprint={() => handleNavigate("sprint")}
          />
        )}

        {currentScreen === "feed" && (
          <FeedScreen
            onStartSprint={() => handleNavigate("sprint")}
          />
        )}

        {currentScreen === "settings" && (
          <SettingsScreen
            theme={theme}
            toggleTheme={toggleTheme}
            watermark={watermark}
          />
        )}

        {currentScreen === "about" && (
          <AboutScreen
            onStartSprint={() => handleNavigate("sprint")}
            watermark={watermark}
          />
        )}
      </main>

      {/* 4. PERSISTENT GLOBAL FOOTER */}
      <Footer
        watermark={watermark}
        onNavigate={handleNavigate}
      />

      {/* 5. STRIKE 1 WARNING DIALOG (FULL SCREEN BLURRED MODAL) */}
      <Dialog open={isWarningOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md border-amber-500 bg-background/95 backdrop-blur-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xl">
              <AlertTriangle className="w-7 h-7 animate-bounce" />
              <span>WINDOW SWITCH DETECTED!</span>
            </div>
            <DialogDescription className="text-sm font-mono text-foreground mt-2">
              <strong>STRIKE 1 / 2 WARNING:</strong> You clicked away or switched tabs during an active sprint. Returning to test now.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono">
            ⚠️ Warning: A second violation will instantly terminate your session and lock your screen!
          </div>

          <DialogFooter>
            <Button
              onClick={dismissWarning}
              className="w-full font-bold bg-amber-500 hover:bg-amber-600 text-black py-5 text-base"
            >
              RETURN TO TEST RUN NOW
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 6. STRIKE 2 TERMINATION OVERLAY */}
      {isTerminated && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white p-6 font-mono select-none animate-in fade-in duration-300">
          <div className="max-w-md text-center space-y-6">
            <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 text-destructive border border-destructive/40 animate-ping">
              <Lock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-destructive tracking-tight">SESSION TERMINATED</h2>
              <p className="text-sm text-muted-foreground">
                Anti-Cheat Strike 2 Triggered. Multiple focus losses or tab switches detected.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-xs space-y-1 text-left">
              <div>• Session ID: <strong className="text-white">#X7P-LOCKOUT</strong></div>
              <div>• Status: <strong className="text-destructive">TEST TERMINATED</strong></div>
              <div>• Violation: <strong className="text-amber-400">Multiple Window Blur / Tab Switch</strong></div>
            </div>

            <Button
              onClick={() => {
                resetLock()
                setCurrentScreen("practice")
              }}
              className="w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> RESTART NEW KIOSK SESSION
            </Button>
          </div>
        </div>
      )}

    </div>
  )
}
