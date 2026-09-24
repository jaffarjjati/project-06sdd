import type { ReactNode } from "react";

interface SectionTitleProps {
  no: string;
  title: string;
  children?: ReactNode;
}

const SectionTitle = ({ no, title, children }: SectionTitleProps) => (
  <div className="flex flex-wrap items-baseline gap-4 mb-6">
    <span className="font-mono text-xs tracking-[0.3em] text-rose-700">
      {no} ——
    </span>
    <h2 className="font-serif text-4xl md:text-6xl tracking-tight">{title}</h2>
    {children}
  </div>
);

export default SectionTitle;
