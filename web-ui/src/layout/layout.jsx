import { Footer } from "@/components/footer";
import Navbar from "@/components/parts/navbar";
import React from "react";
import { Outlet } from "react-router"; // [Note: imported from 'react-router' in v7]

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* GLOBAL NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <Navbar />
      </nav>

      {/* RENDER DYNAMIC PAGES HERE */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <Outlet />
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="w-full border-t py-6 text-center text-xs text-muted-foreground bg-card">
        <Footer />
      </footer>
    </div>
  );
}
