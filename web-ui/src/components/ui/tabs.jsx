import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext({
  activeTab: "",
  setActiveTab: (value) => {},
})

const Tabs = ({ defaultValue, value, onValueChange, className, children, ...props }) => {
  const [selected, setSelected] = React.useState(value || defaultValue || "")

  const currentTab = value !== undefined ? value : selected

  const handleTabChange = (val) => {
    if (value === undefined) setSelected(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab: currentTab, setActiveTab: handleTabChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-background/50 hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab } = React.useContext(TabsContext)
  if (activeTab !== value) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
