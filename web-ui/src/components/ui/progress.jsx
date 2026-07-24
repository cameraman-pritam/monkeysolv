import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value = 0, max = 100, colorClass = "bg-primary", ...props }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/50",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full transition-all duration-300 ease-in-out", colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
