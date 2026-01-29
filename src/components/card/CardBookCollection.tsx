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
    <div
      className={`cursor-pointer transition-transform duration-300 ease-in-out
      hover:translate-y-[-10px] will-change-transform ${className}`}
      onClick={toDetail}
    >
      <Image
        src={`${imageSrc}`}
        alt="Hujan Bulan Juni"
        width={124}
        height={124}
        className="h-auto rounded-lg shadow-[-10px_10px_10px_rgba(0,0,0,0.3)]"
      />
      <h3 className="font-semibold text-xl min-h-[56px] py-2">{title}</h3>
      <p className="text-sm font-normal pb-2">{author}</p>
      <div className="bg-gray-200 px-2 rounded-full inline-block">
        <small className="font-bold text-xs">{genre}</small>
      </div>
    </div>
  );
};

export default CardBookCollection;
