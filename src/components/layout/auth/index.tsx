"use client";
import ShaderGradient from "@/components/ShaderGradient";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-3 p-3">
      <div className="relative overflow-hidden flex flex-col justify-between gap-6 bg-rose-900 lg:w-1/2 rounded-[2rem_2rem_5rem_2rem] lg:rounded-[3rem_3rem_10rem_3rem] p-8 lg:p-12 text-rose-50">
        <ShaderGradient
          variant="ink"
          className="absolute inset-0 h-full w-full"
        />
        <p className="relative font-mono text-xs uppercase tracking-[0.35em] text-rose-200/80">
          № 06 — a library system
        </p>
        <p className="relative font-serif italic text-5xl lg:text-7xl xl:text-8xl leading-[0.85] tracking-tight">
          tak ada yang
          <br />
          lebih <span className="text-yellow-300">arif</span>
          <br />
          dari hujan
          <br />
          bulan juni.
        </p>
        <span className="relative hidden lg:block font-mono text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} jaffarjjati.
        </span>
      </div>
      <main className="flex-1 flex items-center justify-center px-4 py-10 lg:px-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
