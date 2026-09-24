"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Navbar from "@/components/layout/main/navbar";
import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  onSidebarToggle: (isOpen: boolean) => void;
}

export default function Sidebar({ onSidebarToggle }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSidebarToggle(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed top-4 bottom-4 left-4 transition-all duration-300 z-40 ${
          isOpen ? "w-48" : "w-16"
        } py-5 rounded-[2rem] bg-white/35 backdrop-blur-2xl border border-white/70 shadow-[0_20px_60px_-20px_rgba(136,19,55,0.35)]`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex justify-center items-start text-center">
            <h1 className="font-serif italic text-3xl leading-none -rotate-6 text-rose-700">
              {isOpen ? "06sdd." : "06"}
            </h1>
          </div>
          <div className="flex-1 flex items-center px-3">
            <Navbar isSidebarOpen={isOpen} />
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-8 left-7 rounded-3xl z-50 bg-white/60!"
        icon={isOpen ? Bars3BottomRightIcon : Bars3BottomLeftIcon}
        color="opacity10"
        onClick={handleToggle}
      />
    </>
  );
}
