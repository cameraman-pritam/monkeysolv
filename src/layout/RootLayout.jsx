// src/layouts/RootLayout.tsx
import { Outlet } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] dark:bg-[#1b222c]">
      <Navbar />
      
      {/* Dynamic page content renders inside Outlet */}
      <main className="flex-1 pb-16 px-6 py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}