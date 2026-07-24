import React from "react"
import { Award, Lock, Star, CheckCircle2, Play, Sparkles, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const NODES = [
  {
    id: "node-1",
    levelNumber: 1,
    title: "Kinematics & 1D Motion",
    subject: "Physics",
    exam: "JEE Mains",
    unlocked: true,
    completed: true,
    stars: 3,
  },
  {
    id: "node-2",
    levelNumber: 2,
    title: "Vectors & Projectile Motion",
    subject: "Physics",
    exam: "JEE Mains",
    unlocked: true,
    completed: true,
    stars: 3,
  },
  {
    id: "node-3",
    levelNumber: 3,
    title: "Newton's Laws & Friction",
    subject: "Physics",
    exam: "JEE Mains",
    unlocked: true,
    completed: true,
    stars: 2,
  },
  {
    id: "node-4",
    levelNumber: 4,
    title: "Work, Power & Energy",
    subject: "Physics",
    exam: "JEE Advanced",
    unlocked: true,
    completed: false,
    stars: 0,
  },
  {
    id: "node-5",
    levelNumber: 5,
    title: "Rotational Dynamics & Torque",
    subject: "Physics",
    exam: "JEE Advanced",
    unlocked: false,
    completed: false,
    stars: 0,
  },
  {
    id: "node-6",
    levelNumber: 6,
    title: "Electrodynamics & Gauss Law",
    subject: "Physics",
    exam: "JEE Advanced",
    unlocked: false,
    completed: false,
    stars: 0,
  }
]

import { useOutletContext } from "react-router"

export function LevelsScreen(props) {
  const context = useOutletContext() || {}
  const onStartSprint = props.onStartSprint || context.onStartSprint || (() => {})
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER HERO */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card via-card to-emerald-500/10 border border-border shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Award className="w-6 h-6 text-emerald-500" />
            <h1 className="text-2xl font-black tracking-tight">Syllabus Skill-Tree Progression</h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Unlock higher level STEM nodes by scoring 2+ stars in speed sprints.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs bg-muted/80 p-3 rounded-xl border border-border">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>PROGRESS: <strong className="text-emerald-500 font-bold">3 / 6 NODES UNLOCKED</strong></span>
        </div>
      </div>

      {/* MAP NODE TREE */}
      <div className="relative space-y-6">
        
        {/* Connecting spine line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-border/60 -translate-x-1/2 z-0" />

        {NODES.map((node, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={node.id}
              className={`relative z-10 flex flex-col md:flex-row items-center gap-6 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              
              {/* NODE BADGE CIRCLE */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center font-black font-mono shadow-md z-20 transition-transform hover:scale-110">
                {node.completed ? (
                  <div className="w-full h-full rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : node.unlocked ? (
                  <div className="w-full h-full rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {node.levelNumber}
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* CARD CONTENT */}
              <div className="w-full md:w-[45%] pl-16 md:pl-0">
                <Card className={`border-2 transition-all ${
                  node.completed
                    ? "border-emerald-500/40 bg-emerald-500/5 shadow-xs"
                    : node.unlocked
                    ? "border-primary/50 bg-card shadow-md hover:border-primary"
                    : "border-border/60 bg-muted/40 opacity-70"
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] font-mono">
                        LEVEL {node.levelNumber} • {node.exam}
                      </Badge>
                      
                      {/* STAR RATING */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map(star => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= node.stars
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <CardTitle className="text-base font-bold">{node.title}</CardTitle>
                    <CardDescription className="text-xs font-mono">{node.subject}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    {node.unlocked ? (
                      <Button
                        onClick={onStartSprint}
                        size="sm"
                        className={`w-full font-bold text-xs ${
                          node.completed
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                        {node.completed ? "Replay Level Sprint" : "Play Level Sprint"}
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-muted text-xs font-mono text-muted-foreground">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Complete Level {node.levelNumber - 1} to Unlock</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}
