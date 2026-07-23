import React from "react";
import { NavLink, Link } from "react-router";

export default function Navbar() {
  // Helper for active link styling with your neubrutalist highlight
  const getNavLinkClass = ({isActive}) =>
    `h-full flex items-center px-2 font-['Inter'] text-[14px] leading-[1.4] tracking-wider font-medium transition-all active:translate-x-1 active:translate-y-1 active:shadow-none ${
      isActive
        ? "text-black dark:text-[#b9c7e4] border-b-4 border-[#fed488] bg-[#fed488]/20"
        : "text-[#44474d] dark:text-[#d9e3f4] hover:bg-[#fed488] hover:text-[#785a1a]"
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-[#f8f9ff] dark:bg-[#27313e] border-b-4 border-black dark:border-[#b9c7e4] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Brand Logo & Watermark */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-['Playfair_Display'] text-[32px] leading-[1.3] font-bold tracking-tighter text-black dark:text-[#b9c7e4]"
          >
            MonkeySolve
          </Link>
          <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md border border-white/10 px-2 py-1 rounded">
            <span className="font-['Inter'] text-[14px] leading-none tracking-[0.02em] font-semibold text-[#44474d] dark:text-[#d9e3f4] opacity-70">
              SESS_4920.A
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 h-full">
          <NavLink to="/classroom" className={getNavLinkClass}>
            Classroom
          </NavLink>
          <NavLink to="/leaderboards" className={getNavLinkClass}>
            Leaderboards
          </NavLink>
          <NavLink to="/achievements" className={getNavLinkClass}>
            Achievements
          </NavLink>
        </div>

        {/* Trailing Actions & Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1 rounded border border-[#fed488]/30">
            <span
              className="material-symbols-outlined text-[#fed488]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-['Inter'] text-[14px] leading-none tracking-[0.02em] font-semibold text-[#ffdea5]">
              42
            </span>
          </div>

          <Link
            to="/games"
            aria-label="Games"
            className="p-2 text-black dark:text-[#b9c7e4] hover:bg-[#fed488] hover:text-[#785a1a] transition-all rounded active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span className="material-symbols-outlined">sports_esports</span>
          </Link>

          <Link
            to="/profile"
            aria-label="Profile"
            className="p-2 text-black dark:text-[#b9c7e4] hover:bg-[#fed488] hover:text-[#785a1a] transition-all rounded active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </Link>

          <button className="md:hidden p-2 text-black dark:text-[#b9c7e4] hover:bg-[#fed488] hover:text-[#785a1a] transition-all rounded">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Spacer for fixed top navbar (h-20 = 80px) */}
      <div className="h-20 w-full" />
    </>
  );
}