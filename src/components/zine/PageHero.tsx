import type { ReactNode } from "react";
import ShaderGradient from "@/components/ShaderGradient";

interface PageHeroProps {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

const PageHero = ({ label, title, subtitle, children }: PageHeroProps) => (
  <section className="relative overflow-hidden rounded-[2rem_2rem_2rem_5rem] md:rounded-[3rem_3rem_3rem_8rem] p-8 md:p-12 min-h-[280px] flex flex-col md:flex-row md:items-end justify-between gap-8 text-rose-50 shadow-[0_40px_80px_-30px_rgba(136,19,55,0.6)]">
    <ShaderGradient variant="ink" className="absolute inset-0 h-full w-full" />
    <div className="relative max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-rose-200/80">
        {label}
      </p>
      <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="mt-5 max-w-md text-rose-100/90">{subtitle}</p>}
    </div>
    {children && <div className="relative shrink-0">{children}</div>}
  </section>
);

export default PageHero;
