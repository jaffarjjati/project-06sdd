"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  description: string | null;
  imageSrc: string;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  size?: "sm" | "md" | "lg";
}

const CardBookWithDesc: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  description,
  imageSrc,
  lineClamp = 4,
  size = "md",
}) => {
  const router = useRouter();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  const sizeClasses = {
    sm: { cover: "w-24", title: "text-2xl", description: "text-sm" },
    md: {
      cover: "w-32 md:w-40",
      title: "text-3xl md:text-4xl",
      description: "text-sm md:text-base",
    },
    lg: { cover: "w-44", title: "text-4xl", description: "text-base" },
  };

  const getLineClampClass = (lines: number) => {
    switch (lines) {
      case 1: {
        return "line-clamp-1";
      }
      case 2: {
        return "line-clamp-2";
      }
      case 3: {
        return "line-clamp-3";
      }
      case 4: {
        return "line-clamp-4";
      }
      case 5: {
        return "line-clamp-5";
      }
      case 6: {
        return "line-clamp-6";
      }
      case 7: {
        return "line-clamp-7";
      }
      case 8: {
        return "line-clamp-8";
      }
      default: {
        return "line-clamp-4";
      }
    }
  };

  return (
    <div
      className={`group cursor-pointer relative flex items-end gap-5 rounded-[2rem] bg-white/55 backdrop-blur-xl
      border border-white/70 p-5 shadow-[0_20px_50px_-25px_rgba(136,19,55,0.5)]
      transition-transform duration-500 hover:-translate-y-2 hover:-rotate-1 ${className}`}
      onClick={toDetail}
    >
      <Image
        src={`${imageSrc}`}
        alt={title}
        width={200}
        height={300}
        className={`${sizeClasses[size].cover} shrink-0 h-auto -mt-12 -rotate-3 rounded-r-xl rounded-l-sm
        shadow-[-14px_18px_24px_-6px_rgba(136,19,55,0.45)] transition-transform duration-500 group-hover:rotate-0`}
      />

      <div className="min-w-0 flex-1 pb-1">
        <h3 className={`font-serif leading-none ${sizeClasses[size].title}`}>
          {title}
        </h3>
        <p className="pt-2 pb-3 font-mono text-[11px] uppercase tracking-widest text-rose-900/70">
          {author}
        </p>
        <p
          className={`text-neutral-700 ${sizeClasses[size].description} ${getLineClampClass(lineClamp)}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardBookWithDesc;
