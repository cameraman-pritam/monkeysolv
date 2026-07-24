import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const currentStreak = 12;

  return (
    <header className="w-full bg-card border-b border-border font-mono select-none sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <div className="flex flex-col justify-center -space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
              Monkey see
            </span>
            <span className="text-lg font-black tracking-tight text-foreground">
              MonkeySolv
            </span>
          </div>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-1.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 px-3 text-xs font-bold bg-secondary text-secondary-foreground border border-border hover:bg-accent">
                Quick Start
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover border border-border p-2 w-52.5">
                <NavigationMenuLink
                  href="/sprint"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Instant Sprint
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/practice"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Topic Practice
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 px-3 text-xs font-bold bg-secondary text-secondary-foreground border border-border hover:bg-accent">
                Feed
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover border border-border p-2 w-47.5">
                <NavigationMenuLink
                  href="/feed/global"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Global Solves
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/feed/verified"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Verified Scans
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 px-3 text-xs font-bold bg-secondary text-secondary-foreground border border-border hover:bg-accent">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover border border-border p-2 w-47.5">
                <NavigationMenuLink
                  href="/about/docs"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Rules & Kiosk
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/about/keys"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  WASD Binds
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 px-3 text-xs font-bold bg-primary text-primary-foreground border border-border hover:bg-primary/90">
                Profile ({currentStreak}d streak)
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-popover border border-border p-2 w-50">
                <NavigationMenuLink
                  href="/me"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Dashboard
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/settings"
                  className="block p-2 text-xs rounded hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  Settings
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Navbar;
