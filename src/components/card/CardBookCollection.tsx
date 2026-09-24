"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  imageSrc: string;
}

const CardBookCollection: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  genre,
  imageSrc,
}) => {
  const router = useRouter();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  return (
    <div className={`group cursor-pointer ${className}`} onClick={toDetail}>
      <Image
        src={`${imageSrc}`}
        alt={title}
        width={248}
        height={372}
        sizes="200px"
        loading="eager"
        className="w-full h-auto rounded-r-xl rounded-l-sm shadow-[-14px_18px_24px_-6px_rgba(136,19,55,0.45)]
        transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-[1.04]"
      />
      <h3 className="font-serif text-2xl leading-none pt-4 pb-1 break-normal">
        {title}
      </h3>
      <p className="font-mono text-[11px] uppercase tracking-widest text-rose-900/70 pb-3">
        {author}
      </p>
      <span className="inline-block -rotate-3 bg-yellow-300 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
        {genre}
      </span>
    </div>
  );
};

export default CardBookCollection;
