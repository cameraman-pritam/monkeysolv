import React, { useState } from "react"
import { BookOpen, Compass, Filter, Play, Check, Sparkles, Layers, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const EXAMS = ["NCERT", "Boards", "JEE Mains", "JEE Advanced", "NEET"]
const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"]
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Extreme"]

const PRACTICE_MODULES = [
  {
    id: "p1",
    title: "Rotational Dynamics & Torque",
    exam: "JEE Advanced",
    subject: "Physics",
    qCount: 15,
    difficulty: "Hard",
    avgSolveTime: "45s",
    tags: ["Moment of Inertia", "Rolling Without Slipping", "Angular Momentum"]
  },
  {
    id: "p2",
    title: "Integration & King's Property",
    exam: "JEE Advanced",
    subject: "Mathematics",
    qCount: 20,
    difficulty: "Extreme",
    avgSolveTime: "50s",
    tags: ["Definite Integrals", "Symmetry", "Reduction Formulas"]
  },
  {
    id: "p3",
    title: "Electrochemistry & Nernst Eqn",
    exam: "JEE Mains",
    subject: "Chemistry",
    qCount: 25,
    difficulty: "Medium",
    avgSolveTime: "30s",
    tags: ["Galvanic Cells", "Kohlrausch Law", "Electrolysis"]
  },
  {
    id: "p4",
    title: "Genetics & Inheritance Laws",
    exam: "NEET",
    subject: "Biology",
    qCount: 30,
    difficulty: "Medium",
    avgSolveTime: "20s",
    tags: ["Mendelian Ratios", "Linkage", "Pedigree Analysis"]
  },
  {
    id: "p5",
    title: "Electric Charges & Fields",
    exam: "Boards",
    subject: "Physics",
    qCount: 18,
    difficulty: "Easy",
    avgSolveTime: "35s",
    tags: ["Coulomb's Law", "Gauss Theorem", "Electric Dipole"]
  }
]

import { useOutletContext } from "react-router"

export function PracticeScreen(props) {
  const context = useOutletContext() || {}
  const onStartSprint = props.onStartSprint || context.onStartSprint || (() => {})
  const [selectedExam, setSelectedExam] = useState("JEE Advanced")
  const [selectedSubject, setSelectedSubject] = useState("Physics")
  const [selectedDiff, setSelectedDiff] = useState("Hard")

  const filteredModules = PRACTICE_MODULES.filter(m => {
    if (selectedExam && m.exam !== selectedExam) return false
    if (selectedSubject && m.subject !== selectedSubject) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* HEADER HERO */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card via-card to-primary/10 border border-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-black tracking-tight">Practice & Custom Sprints</h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Filter by Exam Track, Subject, or Difficulty to generate custom question sets.
          </p>
        </div>

        <Button
          onClick={onStartSprint}
          size="lg"
          className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
        >
          <Play className="w-4 h-4 mr-2 fill-primary-foreground" />
          START TAILORED SPRINT NOW
        </Button>
      </div>

      {/* FILTER CHIPS */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4 text-primary" />
            Filter Syllabus Targets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* EXAM TRACK FILTER */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">Exam Target:</span>
            <div className="flex flex-wrap gap-2">
              {EXAMS.map(exam => {
                const isActive = selectedExam === exam
                return (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5" />}
                    <span>{exam}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* SUBJECT FILTER */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">Subject:</span>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(sub => {
                const isActive = selectedSubject === sub
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5" />}
                    <span>{sub}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* DIFFICULTY FILTER */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-foreground">Difficulty:</span>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(diff => {
                const isActive = selectedDiff === diff
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDiff(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-amber-500 text-black shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5" />}
                    <span>{diff}</span>
                  </button>
                )
              })}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* MODULE CARDS GRID */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          <span>Available Topic Modules ({filteredModules.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map(mod => (
            <Card key={mod.id} className="border border-border/80 hover:border-primary/50 transition-all hover:shadow-md flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                    {mod.exam}
                  </Badge>
                  <Badge variant={mod.difficulty === 'Extreme' ? 'destructive' : 'warning'} className="text-[10px]">
                    {mod.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-base font-bold">{mod.title}</CardTitle>
                <CardDescription className="text-xs font-mono">{mod.subject} • {mod.qCount} Questions</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {mod.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  onClick={onStartSprint}
                  variant="outline"
                  className="w-full font-bold border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Play className="w-3.5 h-3.5 mr-2" /> Launch Module Sprint
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}
