"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  year: string;
  genre: string;
  imageSrc: string;
}

const CardBook: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  year,
  genre,
  imageSrc,
}) => {
  const router = useRouter();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  return (
    <div className={`group cursor-pointer ${className}`} onClick={toDetail}>
      <div className="absolute bottom-0 left-0 w-full h-[75%] bg-white/55 backdrop-blur-xl border border-white/70 rounded-[2rem]"></div>
      <div className="grid grid-cols-3 min-h-full gap-4 px-4 text-neutral-950 transition-transform duration-500 group-hover:-translate-y-2">
        <div className="col-span-3 md:col-span-1 flex items-end justify-center px-2 z-10">
          <Image
            src={`${imageSrc}`}
            alt={title}
            width={150}
            height={200}
            className="-rotate-3 rounded-r-xl rounded-l-sm shadow-[-14px_18px_24px_-6px_rgba(136,19,55,0.45)] transition-transform duration-500 group-hover:rotate-0"
          />
        </div>

        <div className="col-span-3 md:col-span-2 pt-[14%] flex flex-col justify-between h-full z-10">
          <div className="py-2">
            <h3 className="font-serif text-3xl leading-none">{title}</h3>
            <p className="pt-2 font-mono text-[11px] uppercase tracking-widest text-rose-900/70">
              {author}
            </p>
          </div>

          <div className="pb-3">
            <span className="inline-block -rotate-6 border-2 border-rose-600 rounded-md px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-rose-600 opacity-80">
              {year} ✺ {genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBook;
