import React from "react"
import { Link, NavLink, Outlet } from "react-router" // [Note: imported from 'react-router' in v7]

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* GLOBAL NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">MyBrand</Link>
        <div className="flex gap-6 text-sm font-medium">
          {/* NavLink automatically tracks active route paths */}
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>About</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Dashboard</NavLink>
        </div>
      </nav>

      {/* RENDER DYNAMIC PAGES HERE */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <Outlet /> 
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="w-full border-t py-6 text-center text-xs text-muted-foreground bg-card">
        &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
      </footer>
    </div>
  )
}
