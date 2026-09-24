"use client";

import "@/app/globals.css";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import ShaderGradient from "@/components/ShaderGradient";
import { useSidebar } from "@/context/SidebarContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="relative">
      <ShaderGradient className="fixed inset-0 z-0 h-full w-full" />
      <Sidebar onSidebarToggle={toggleSidebar} />

      <div
        className={`relative flex-1 flex flex-col transition-all duration-300
        ${isSidebarOpen ? "ml-56" : "ml-24"}`}
      >
        <Header />
        <main className="flex-1 pt-24 pl-2 pr-2 mr-6 min-h-[97vh]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
