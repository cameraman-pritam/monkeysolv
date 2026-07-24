import * as React from "react"
import { cn } from "@/lib/utils"

const Tooltip = ({ content, children, side = "top" }) => {
  const [visible, setVisible] = React.useState(false)

  const positionClasses = {
    top: "-top-9 left-1/2 -translate-x-1/2",
    bottom: "-bottom-9 left-1/2 -translate-x-1/2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs text-popover-foreground shadow-md border border-border/40 pointer-events-none animate-in fade-in-0 zoom-in-95",
            positionClasses[side] || positionClasses.top
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { Tooltip }
