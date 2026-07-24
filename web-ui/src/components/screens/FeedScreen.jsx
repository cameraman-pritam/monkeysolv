import React, { useState } from "react"
import { Users, ShieldCheck, Heart, Share2, Zap, Clock, Tag, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const FEED_POSTS = [
  {
    id: "f1",
    user: {
      name: "Aarav Sharma",
      handle: "@aarav_jee",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aarav",
      tier: "JEE Adv • AIR #1"
    },
    timeAgo: "12m ago",
    topic: "Rotational Dynamics — Solid Sphere Rolling",
    exam: "JEE Advanced",
    solveTimeSec: 14,
    watermark: "#X7P99",
    scanThumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    challengeCode: "RIVAL-ROT-99",
    likes: 42,
    verified: true,
  },
  {
    id: "f2",
    user: {
      name: "Ananya Gupta",
      handle: "@ananya_math",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ananya",
      tier: "JEE Adv • AIR #12"
    },
    timeAgo: "45m ago",
    topic: "Definite Integrals — King's Property",
    exam: "JEE Advanced",
    solveTimeSec: 19,
    watermark: "#X7P42",
    scanThumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    challengeCode: "RIVAL-INT-42",
    likes: 38,
    verified: true,
  },
  {
    id: "f3",
    user: {
      name: "Rohan V.",
      handle: "@rohan_chem",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Rohan",
      tier: "JEE Mains • Target #50"
    },
    timeAgo: "2h ago",
    topic: "Electrochemistry — Nernst Potential",
    exam: "JEE Mains",
    solveTimeSec: 25,
    watermark: "#X7P11",
    scanThumbnailUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    challengeCode: "RIVAL-ELE-11",
    likes: 19,
    verified: true,
  }
]

import { useOutletContext } from "react-router"

export function FeedScreen(props) {
  const context = useOutletContext() || {}
  const onStartSprint = props.onStartSprint || context.onStartSprint || (() => {})
  const [likesMap, setLikesMap] = useState({
    f1: 42,
    f2: 38,
    f3: 19,
  })

  const handleLike = (id) => {
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER HERO */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card via-card to-indigo-500/10 border border-border shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-black tracking-tight">Verified Solves & Feed</h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Live stream of handwritten solutions verified with Kiosk Watermark proof.
          </p>
        </div>

        <Button onClick={onStartSprint} className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
          <Zap className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" /> SHARE YOUR SOLVE
        </Button>
      </div>

      {/* POSTS LIST */}
      <div className="space-y-6">
        {FEED_POSTS.map(post => (
          <Card key={post.id} className="border border-border shadow-md hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                
                {/* USER PROFILE INFO */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-primary/30">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <span>{post.user.name}</span>
                      <span className="text-xs text-muted-foreground font-normal font-mono">{post.user.handle}</span>
                      {post.verified && (
                        <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-mono gap-1">
                          <ShieldCheck className="w-3 h-3" /> VERIFIED SCAN
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{post.user.tier} • {post.timeAgo}</p>
                  </div>
                </div>

                {/* WATERMARK PROOF */}
                <Badge variant="neon" className="font-mono text-xs border-emerald-500/40">
                  {post.watermark}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              
              {/* TOPIC & SOLVE STATS */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block">Syllabus Topic</span>
                  <strong className="text-sm font-sans font-bold text-foreground">{post.topic}</strong>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-[10px] text-muted-foreground block">SOLVE TIME</span>
                    <strong className="text-sm text-amber-500 font-bold">{post.solveTimeSec}s</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-muted-foreground block">EXAM TRACK</span>
                    <strong className="text-sm text-primary font-bold">{post.exam}</strong>
                  </div>
                </div>
              </div>

              {/* HANDWRITTEN PAPER SCAN THUMBNAIL */}
              <div className="relative rounded-xl overflow-hidden border border-border bg-black max-h-64 group">
                <img
                  src={post.scanThumbnailUrl}
                  alt="Handwritten solution scan proof"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400 font-bold border border-emerald-500/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>WATERMARK MATCHED: {post.watermark}</span>
                </div>
              </div>

            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-border/40 pt-3">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleLike(post.id)}
                  className="text-xs font-bold text-rose-500 hover:bg-rose-500/10"
                >
                  <Heart className="w-4 h-4 mr-1.5 fill-rose-500" />
                  <span>{likesMap[post.id]} Respects</span>
                </Button>

                <Button size="sm" variant="ghost" className="text-xs font-mono text-muted-foreground">
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  <span>Share Rival Code</span>
                </Button>
              </div>

              <Button
                size="sm"
                onClick={onStartSprint}
                className="font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-400 fill-amber-400" />
                Beat ({post.solveTimeSec}s) Time
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  )
}
