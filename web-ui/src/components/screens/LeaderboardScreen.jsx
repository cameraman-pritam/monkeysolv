import React from "react"
import { Trophy, Flame, ShieldCheck, Zap, Award, Search, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const LEADERBOARD_DATA = [
  {
    rank: 1,
    username: "Aarav_JEE_AIR1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aarav",
    tier: "JEE Adv • AIR #1",
    streakDays: 45,
    accuracy: 98.5,
    speedAvgSec: 14,
    verifiedScans: 120,
  },
  {
    rank: 2,
    username: "Quantum_Ananya",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ananya",
    tier: "JEE Adv • AIR #12",
    streakDays: 32,
    accuracy: 96.2,
    speedAvgSec: 18,
    verifiedScans: 95,
  },
  {
    rank: 3,
    username: "Rohan_PhysX",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Rohan",
    tier: "JEE Adv • Target #50",
    streakDays: 28,
    accuracy: 94.8,
    speedAvgSec: 21,
    verifiedScans: 84,
  },
  {
    rank: 14,
    username: "Pritam (You)",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MonkeySolv99",
    tier: "JEE Adv • Target #100",
    streakDays: 12,
    accuracy: 91.0,
    speedAvgSec: 22,
    verifiedScans: 34,
    isCurrentUser: true,
  },
  {
    rank: 15,
    username: "Dhruv_Calculus",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Dhruv",
    tier: "JEE Mains • Target #500",
    streakDays: 10,
    accuracy: 89.5,
    speedAvgSec: 26,
    verifiedScans: 28,
  }
]

import { useOutletContext } from "react-router"

export function LeaderboardScreen(props) {
  const context = useOutletContext() || {}
  const onStartSprint = props.onStartSprint || context.onStartSprint || (() => {})
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card via-card to-amber-500/10 border border-border shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-black tracking-tight">National Hall of Fame</h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Rankings powered by verified scan accuracy, speed sprint time, and continuous streaks.
          </p>
        </div>

        <Button onClick={onStartSprint} className="font-bold bg-amber-500 hover:bg-amber-600 text-black">
          <Zap className="w-4 h-4 mr-2 fill-black" /> CHALLENGE TOP RANKERS
        </Button>
      </div>

      {/* LEADERBOARD TABLE CARD */}
      <Card className="border border-border shadow-md overflow-hidden">
        <CardHeader className="bg-muted/40 border-b border-border py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Speed & Accuracy Leaderboard</span>
            </CardTitle>
            <Badge variant="outline" className="font-mono text-xs border-emerald-500/40 text-emerald-500">
              LIVE SYNCED • KIOSK VERIFIED
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-muted/60 border-b border-border text-muted-foreground font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Aspirant</th>
                  <th className="py-3 px-4">Competitive Tier</th>
                  <th className="py-3 px-4 text-center">Streak</th>
                  <th className="py-3 px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 text-center">Avg Speed</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {LEADERBOARD_DATA.map(entry => (
                  <tr
                    key={entry.rank}
                    className={`transition-colors ${
                      entry.isCurrentUser
                        ? "bg-primary/10 font-bold border-l-4 border-l-primary"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    {/* RANK */}
                    <td className="py-4 px-4 font-black text-sm">
                      {entry.rank === 1 && <span className="text-amber-500">🥇 #1</span>}
                      {entry.rank === 2 && <span className="text-slate-400">🥈 #2</span>}
                      {entry.rank === 3 && <span className="text-amber-700">🥉 #3</span>}
                      {entry.rank > 3 && <span className="text-muted-foreground">#{entry.rank}</span>}
                    </td>

                    {/* ASPIRANT */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={entry.avatar} />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold font-sans text-sm leading-none text-foreground">
                            {entry.username}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {entry.verifiedScans} Verified Scans
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* TIER */}
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-[10px] bg-muted/50">
                        {entry.tier}
                      </Badge>
                    </td>

                    {/* STREAK */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1 font-bold text-amber-500">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{entry.streakDays}d</span>
                      </div>
                    </td>

                    {/* ACCURACY */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-emerald-500 font-bold">{entry.accuracy}%</span>
                    </td>

                    {/* SPEED */}
                    <td className="py-4 px-4 text-center">
                      <span className="text-indigo-400 font-bold">{entry.speedAvgSec}s/q</span>
                    </td>

                    {/* ACTION */}
                    <td className="py-4 px-4 text-right">
                      <Button size="xs" variant="ghost" className="font-bold text-primary hover:bg-primary/10">
                        Rival Code <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
