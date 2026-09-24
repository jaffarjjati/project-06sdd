"use client";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  imageSrc: string;
}

const CardBookMustRead: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  imageSrc,
}) => {
  const router = useRouter();
  const { isSidebarOpen } = useSidebar();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  return (
    <div
      className={`grid grid-cols-3 gap-3 p-4 cursor-pointer transition-transform duration-300 ease-in-out
      hover:translate-x-[-10px] will-change-transform ${className}`}
      onClick={toDetail}
    >
      <div
        className={`${isSidebarOpen ? "col-span-3" : "col-span-1"} md:col-span-1 flex justify-center`}
      >
        <Image
          src={`${imageSrc}`}
          alt={title}
          width={120}
          height={180}
          sizes="60px"
          className="w-[60px] h-auto rounded-r-lg rounded-l-sm rotate-3 shadow-[-10px_10px_14px_rgba(0,0,0,0.35)]"
        />
      </div>
      <div
        className={`${isSidebarOpen ? "col-span-3 text-center" : "col-span-2"} md:col-span-2 md:text-left py-2`}
      >
        <h3 className="font-serif text-2xl leading-none">{title}</h3>
        <p className="pt-2 font-mono text-[11px] uppercase tracking-widest text-rose-100/80">
          {author}
        </p>
      </div>
    </div>
  );
};

export default CardBookMustRead;
