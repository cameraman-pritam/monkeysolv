import React from "react"
import { useRouteError, useLocation, useNavigate } from "react-router"
import { AlertTriangle, Terminal, Zap, Home, Bug, ArrowLeft, Copy, ShieldAlert, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function NotFoundScreen() {
  const error = useRouteError()
  const location = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = React.useState(false)

  // Extract error details if thrown, or construct fallback for unmatched routes
  const status = error?.status || 404
  const statusText = error?.statusText || "Route Not Found"
  const errorMessage =
    error?.message ||
    error?.data ||
    `The requested path "${location.pathname}" could not be located in the MonkeySolv routing matrix.`

  const errorDetails = JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      path: location.pathname,
      status: status,
      statusText: statusText,
      message: errorMessage,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
      kioskStatus: "WATERMARK_LOCK_ARMED",
    },
    null,
    2
  )

  const handleCopyTrace = () => {
    navigator.clipboard.writeText(errorDetails)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 font-mono select-none">
      <Card className="w-full max-w-2xl border-2 border-destructive/40 bg-card/95 shadow-2xl backdrop-blur-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* HEADER BADGE & ICON */}
        <CardHeader className="text-center pb-2 bg-destructive/10 border-b border-destructive/20">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/20 text-destructive border border-destructive/40 mb-2 animate-bounce">
            <Bug className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="destructive" className="font-mono text-xs px-3 py-1 uppercase tracking-widest">
              HTTP {status}: {statusText}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-foreground mt-2">
            404 — ROUTE MATRIX EXCEPTION
          </CardTitle>
          <CardDescription className="text-xs font-mono text-muted-foreground">
            Target location <code className="text-destructive font-bold">{location.pathname}</code> does not exist on MonkeySolv.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          
          {/* LIVE ERROR LOG CONSOLE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span className="flex items-center gap-1.5 text-destructive">
                <Terminal className="w-3.5 h-3.5" />
                AUTOMATIC ROUTE EXCEPTION TRACE
              </span>
              <button
                onClick={handleCopyTrace}
                className="hover:text-foreground transition-colors flex items-center gap-1 text-[11px] underline"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Error JSON"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/90 text-emerald-400 text-xs font-mono border border-border/80 shadow-inner overflow-x-auto max-h-48 leading-relaxed">
              <pre>{errorDetails}</pre>
            </div>
          </div>

          {/* DIAGNOSTIC SUMMARY */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-1 text-xs text-muted-foreground font-sans">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>What happened?</span>
            </div>
            <p>
              The client attempted to navigate to an unmapped path or an internal component threw an uncaught error. The Kiosk Window Lock remains active.
            </p>
          </div>

        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 border-t border-border p-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto font-bold border-border/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto font-bold bg-primary hover:bg-primary/90"
            >
              <Home className="w-4 h-4 mr-2" /> Return to Practice
            </Button>
            <Button
              onClick={() => navigate("/sprint")}
              className="w-full sm:w-auto font-bold bg-amber-500 hover:bg-amber-600 text-black"
            >
              <Zap className="w-4 h-4 mr-1.5 fill-black" /> Instant Sprint
            </Button>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}
