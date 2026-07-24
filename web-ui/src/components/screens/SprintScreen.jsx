import React, { useState, useEffect } from "react"
import { Zap, Clock, ShieldAlert, CheckCircle2, XCircle, Camera, Upload, AlertTriangle, ArrowRight, Lock, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const SAMPLE_QUESTIONS = [
  {
    id: "q1",
    subject: "Physics",
    topic: "Rotational Dynamics & Inertia",
    exam: "JEE Advanced",
    difficulty: "Hard",
    timeLimitSeconds: 60,
    latexContent: "A solid sphere of mass \\( M \\) and radius \\( R \\) rolls without slipping down an inclined plane of angle \\( \\theta \\). Calculate the acceleration of the center of mass \\( a_{\\text{cm}} \\).",
    options: [
      "a)  g · sin(θ)",
      "b)  (5/7) · g · sin(θ)",
      "c)  (2/5) · g · sin(θ)",
      "d)  (3/5) · g · sin(θ)"
    ],
    correctAnswer: 1,
    explanation: "Using τ = Iα and F_net = M a_cm, for a solid sphere I = (2/5)MR². Hence, a_cm = (5/7) g sin(θ)."
  },
  {
    id: "q2",
    subject: "Mathematics",
    topic: "Definite Integrals & Symmetry",
    exam: "JEE Advanced",
    difficulty: "Extreme",
    timeLimitSeconds: 60,
    latexContent: "Evaluate the integral: \\( I = \\int_{0}^{\\pi/2} \\frac{\\sin^3 x}{\\sin^3 x + \\cos^3 x} dx \\).",
    options: [
      "a)  π / 2",
      "b)  π / 4",
      "c)  1",
      "d)  π / 3"
    ],
    correctAnswer: 1,
    explanation: "Applying King's Property: ∫a to b f(x)dx = ∫a to b f(a+b-x)dx. 2I = ∫ 1 dx = π/2 => I = π/4."
  },
  {
    id: "q3",
    subject: "Chemistry",
    topic: "Electrochemistry & Nernst Equation",
    exam: "JEE Mains",
    difficulty: "Medium",
    timeLimitSeconds: 60,
    latexContent: "Calculate the cell potential \\( E_{\\text{cell}} \\) for \\( Zn | Zn^{2+} (0.1M) || Cu^{2+} (1.0M) | Cu \\) at 298 K given \\( E^0_{\\text{cell}} = 1.10 \\, V \\).",
    options: [
      "a)  1.10 V",
      "b)  1.13 V",
      "c)  1.07 V",
      "d)  1.20 V"
    ],
    correctAnswer: 1,
    explanation: "E_cell = E^0_cell - (0.0591/2) log([Zn2+]/[Cu2+]) = 1.10 - 0.0295 log(0.1/1.0) = 1.10 + 0.0295 ≈ 1.13 V."
  }
]

import { useOutletContext } from "react-router"

export function SprintScreen(props) {
  const context = useOutletContext() || {}
  const watermark = props.watermark || context.watermark || "#X7P"
  const onStartLock = props.onStartLock || context.onStartLock || (() => {})
  const onStopLock = props.onStopLock || context.onStopLock || (() => {})
  const onNavigate = props.onNavigate || context.onNavigate || (() => {})
  const [sessionState, setSessionState] = useState("idle")
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [photoCountdown, setPhotoCountdown] = useState(300) // 5 mins
  const [score, setScore] = useState(0)
  const [photoUploaded, setPhotoUploaded] = useState(false)

  const currentQ = SAMPLE_QUESTIONS[currentIdx]

  // Countdown timer during test
  useEffect(() => {
    if (sessionState !== "running") return

    onStartLock()

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setSessionState("photo_submission")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [sessionState, onStartLock])

  // Photo submission 5-minute timer
  useEffect(() => {
    if (sessionState !== "photo_submission") return

    onStopLock() // Unlock window so student can upload or switch to camera

    const timer = setInterval(() => {
      setPhotoCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setSessionState("completed")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [sessionState, onStopLock])

  const handleStartSprint = () => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setTimeLeft(60)
    setScore(0)
    setPhotoUploaded(false)
    setPhotoCountdown(300)
    setSessionState("running")
  }

  const handleSelectOption = (idx) => {
    if (sessionState !== "running") return
    setSelectedOption(idx)
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 100)
    }

    if (currentIdx + 1 < SAMPLE_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1)
      setSelectedOption(null)
      setTimeLeft(60)
    } else {
      setSessionState("photo_submission")
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* 1. IDLE STATE START SCREEN */}
      {sessionState === "idle" && (
        <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-2 animate-bounce">
              <Zap className="w-8 h-8 fill-amber-500" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight">
              Speed Sprint Mode
            </CardTitle>
            <CardDescription className="text-sm font-mono">
              60s Per Question • Kiosk Window Lock Armed • Watermark Proof <strong className="text-primary">{watermark}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
              <div className="p-4 rounded-xl bg-muted/60 border border-border/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-500 uppercase">
                  <Clock className="w-4 h-4" /> 60s Countdown
                </div>
                <p className="text-xs text-muted-foreground">High speed problem solving under strict time pressure.</p>
              </div>

              <div className="p-4 rounded-xl bg-muted/60 border border-border/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-500 uppercase">
                  <ShieldAlert className="w-4 h-4" /> Kiosk Anti-Cheat
                </div>
                <p className="text-xs text-muted-foreground">Tab switches & window blur trigger strikes and screen lock.</p>
              </div>

              <div className="p-4 rounded-xl bg-muted/60 border border-border/50 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs text-indigo-400 uppercase">
                  <Camera className="w-4 h-4" /> Handwritten Proof
                </div>
                <p className="text-xs text-muted-foreground">5-minute window post-sprint to upload paper scan with watermark {watermark}.</p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleStartSprint}
              className="px-8 py-6 text-lg font-black tracking-wide rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 group"
            >
              <Zap className="w-5 h-5 mr-2 text-amber-400 fill-amber-400 group-hover:scale-125 transition-transform" />
              LAUNCH INSTANT SPRINT & ENTER KIOSK
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 2. RUNNING SPRINT VIEW */}
      {sessionState === "running" && (
        <div className="space-y-4">
          
          {/* HEADER STATUS BAR */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border shadow-sm">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-xs border-primary/40 bg-primary/10 text-primary">
                Q {currentIdx + 1} / {SAMPLE_QUESTIONS.length}
              </Badge>
              <Badge variant="secondary" className="text-xs font-semibold">
                {currentQ.exam} • {currentQ.subject}
              </Badge>
            </div>

            {/* Live Watermark Overlay */}
            <div className="flex items-center gap-2 font-mono text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
              <Lock className="w-3 h-3" />
              <span>LOCK: ARMED ({watermark})</span>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 animate-spin" />
              <span className={`font-mono text-xl font-black ${timeLeft <= 10 ? "text-destructive animate-ping" : "text-foreground"}`}>
                T-{timeLeft}s
              </span>
            </div>
          </div>

          <Progress value={(timeLeft / 60) * 100} className="h-2" colorClass={timeLeft <= 15 ? "bg-destructive" : "bg-amber-500"} />

          {/* QUESTION CARD */}
          <Card className="border-2 border-border shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                  Topic: {currentQ.topic}
                </span>
                <Badge variant={currentQ.difficulty === 'Extreme' ? 'destructive' : 'warning'}>
                  {currentQ.difficulty}
                </Badge>
              </div>
              
              {/* LaTeX Question Block */}
              <div className="mt-4 p-6 rounded-xl bg-muted/40 border border-border/60 text-lg font-medium leading-relaxed">
                <p className="font-mono text-foreground">{currentQ.latexContent}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Answer:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOption === i
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className={`p-4 rounded-xl border-2 text-left font-mono text-sm transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                          : "border-border/60 bg-card hover:bg-muted/60 text-foreground"
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-muted-foreground">
                Score multiplier: 1x • Instant Validation
              </span>
              <Button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-6 font-bold"
              >
                <span>Submit & Next</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* 3. PHOTO SUBMISSION DIALOG (5-MIN WATERMARK PROOF REQUIREMENT) */}
      <Dialog open={sessionState === "photo_submission"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md border-amber-500/40">
          <DialogHeader>
            <div className="flex items-center gap-2 text-amber-500 font-bold text-lg">
              <Camera className="w-6 h-6 animate-pulse" />
              <span>HANDWRITTEN WATERMARK PROOF REQUIRED</span>
            </div>
            <DialogDescription className="text-xs font-mono">
              Sprint finished! Upload a quick photo of your scratchpad showing watermark <strong className="text-amber-500">{watermark}</strong> to lock your leaderboard score.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs">
              <span>PHOTO WINDOW REMAINING:</span>
              <strong className="text-base">{formatTime(photoCountdown)}</strong>
            </div>

            {/* UPLOAD BOX */}
            <div 
              onClick={() => setPhotoUploaded(true)}
              className={`p-8 rounded-xl border-2 border-dashed text-center cursor-pointer transition-colors ${
                photoUploaded 
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" 
                  : "border-border hover:border-primary bg-muted/40 text-muted-foreground"
              }`}
            >
              {photoUploaded ? (
                <div className="space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
                  <p className="font-bold text-sm">Scan Proof Uploaded & Verified!</p>
                  <p className="text-xs text-muted-foreground font-mono">Watermark {watermark} detected on solution sheet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-10 h-10 mx-auto text-primary" />
                  <p className="font-bold text-sm text-foreground">Click to upload scratchpad scan/photo</p>
                  <p className="text-xs font-mono">Must visibly include watermark code #{watermark}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={!photoUploaded}
              onClick={() => {
                onStopLock()
                setSessionState("completed")
              }}
              className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              LOCK SCORE & VIEW RESULTS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. COMPLETED RESULTS SCREEN */}
      {sessionState === "completed" && (
        <Card className="border-2 border-emerald-500/40 bg-card text-center p-6 space-y-6">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
            <Sparkles className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-black">Sprint Session Complete!</h2>
            <p className="text-xs font-mono text-muted-foreground mt-1">Watermark <strong className="text-emerald-500">{watermark}</strong> verified on global feed.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto font-mono text-center">
            <div className="p-4 rounded-xl bg-muted/60 border border-border">
              <span className="text-xs text-muted-foreground block">SCORE</span>
              <strong className="text-2xl text-primary">{score} pts</strong>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-border">
              <span className="text-xs text-muted-foreground block">ACCURACY</span>
              <strong className="text-2xl text-emerald-500">100%</strong>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-border">
              <span className="text-xs text-muted-foreground block">AVG TIME</span>
              <strong className="text-2xl text-amber-500">22s</strong>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-border">
              <span className="text-xs text-muted-foreground block">STRIKES</span>
              <strong className="text-2xl text-foreground">0 / 2</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button onClick={handleStartSprint} className="font-bold">
              <RefreshCw className="w-4 h-4 mr-2" /> Start Another Sprint
            </Button>
            <Button variant="outline" onClick={() => onNavigate("leaderboard")} className="font-bold">
              View Leaderboard Position
            </Button>
          </div>
        </Card>
      )}

    </div>
  )
}
