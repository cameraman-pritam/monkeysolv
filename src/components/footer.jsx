import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 py-2 px-6 flex justify-between items-center bg-black text-white border-t-4 border-black font-['Inter'] text-[14px] leading-none tracking-[0.02em] font-semibold h-14">
      {/* Left: Copyright */}
      <div className="flex items-center">
        <span>© 2026 MONKEYSOLVE // INPUT: [W][A][S][D] TO NAVIGATE</span>
      </div>

      {/* Right: User Data & Links */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 border-r border-white/30 pr-6 h-6">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[16px] text-white/70"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
            <span>@ApeScholar_99</span>
          </div>
          <div className="flex items-center gap-1 text-[#ffdea5]">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-bold">42 Day Streak</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-[#ffdea5] transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
          </button>
          <button className="text-white/70 hover:text-[#ffdea5] transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>

        <nav className="flex gap-6 ml-4">
          <Link className="text-white/70 hover:text-[#ffdea5] transition-colors" to="/privacy">
            Privacy
          </Link>
          <Link className="text-white/70 hover:text-[#ffdea5] transition-colors" to="/terms">
            Terms
          </Link>
          <Link className="text-white/70 hover:text-[#ffdea5] transition-colors" to="/support">
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}