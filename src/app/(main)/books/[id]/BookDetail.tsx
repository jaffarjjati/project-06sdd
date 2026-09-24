"use client";

import { useEffect } from "react";
import { useBookStore } from "@/store/book";
import Image from "next/image";
import Button from "@/components/common/Button";
import ShaderGradient from "@/components/ShaderGradient";
import MarqueeTapes from "@/components/zine/MarqueeTapes";
import SectionTitle from "@/components/zine/SectionTitle";
import { formatFullDate, formatYearOnly } from "@/utils/formatDate";
import {
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

interface BookDetailProps {
  id: string;
}

const BookDetail: React.FC<BookDetailProps> = ({ id }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { book, getBookById } = useBookStore();

  useEffect(() => {
    getBookById(id);
  }, [getBookById, id]);

  const catalog = [
    [
      "Published",
      book?.published_date ? formatFullDate(book.published_date) : "-",
    ],
    ["Publisher", book?.publisher || "-"],
    ["Language", book?.language || "-"],
    ["Pages", book?.pages || "-"],
    ["ISBN", book?.isbn || "-"],
  ];

  return (
    <div>
      {/* hero: ink block with the cover floating out of it */}
      <section className="relative mt-10 rounded-[2rem_2rem_2rem_5rem] md:rounded-[3rem_3rem_3rem_10rem] text-rose-50 shadow-[0_40px_80px_-30px_rgba(136,19,55,0.6)]">
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <ShaderGradient
            variant="ink"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="relative grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 p-8 md:p-12">
          <div className="flex justify-center md:-mt-24">
            {book?.cover && (
              <Image
                src={BASE_URL + book.cover}
                alt={book.title}
                width={480}
                height={720}
                sizes="280px"
                className="w-52 md:w-72 h-auto -rotate-6 rounded-r-2xl rounded-l-sm shadow-[-24px_34px_50px_rgba(0,0,0,0.55)] motion-safe:animate-float"
              />
            )}
          </div>

          <div className="flex flex-col justify-end">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-rose-200/80">
              № 06 — the book —{" "}
              {book?.published_date ? formatYearOnly(book.published_date) : ""}
            </p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
              {book?.title || "-"}
            </h1>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.25em] text-rose-100/90">
              by {book?.author || "-"}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {book?.genres?.map((genre, index) => (
                <span
                  key={genre}
                  className={`bg-yellow-300 text-neutral-950 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm ${index % 2 ? "rotate-2" : "-rotate-2"}`}
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                color="white"
                className="rounded-full px-8! py-3! text-lg! hover:-rotate-2 transition-all!"
              >
                Borrow it
              </Button>
              {[BookmarkIcon, ShareIcon, ChatBubbleLeftEllipsisIcon].map(
                (icon, index) => (
                  <Button
                    key={index}
                    className="rounded-full bg-white/15! text-rose-50! border border-white/30 backdrop-blur-md hover:bg-white! hover:text-neutral-950!"
                    icon={icon}
                    color="transparent"
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* copies-left sticker */}
        <div className="absolute -top-6 right-6 md:right-12 rotate-12 bg-yellow-300 text-neutral-950 rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-xl">
          <span className="font-serif italic text-5xl leading-none">
            {book?.available_copies ?? "-"}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest">
            copies left
          </span>
        </div>
      </section>

      <MarqueeTapes
        words={[
          book?.title || "",
          book?.author || "",
          ...(book?.genres ?? []),
        ].filter(Boolean)}
      />

      <section className="mt-6 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <SectionTitle no="01" title="The blurb" />
          <div className="relative pl-6 md:pl-10">
            <span
              aria-hidden
              className="absolute -left-2 -top-8 font-serif text-[9rem] leading-none text-rose-600/25 select-none"
            >
              &ldquo;
            </span>
            <p className="relative font-serif text-2xl md:text-3xl leading-snug text-neutral-800">
              {book?.description || "-"}
            </p>
          </div>
        </div>

        {/* library index card: ruled lines, typewriter fields, a stamp, a punch hole */}
        <div className="relative rotate-2 self-start rounded-md bg-[#fffaf0] p-6 pt-5 shadow-[0_24px_50px_-20px_rgba(136,19,55,0.5)] border-t-4 border-rose-600">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-rose-700">
            02 —— catalog card
          </p>
          <dl className="mt-4 font-mono text-sm bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_35px,rgba(59,130,246,0.25)_35px,rgba(59,130,246,0.25)_36px)]">
            {catalog.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 h-9 items-end pb-1"
              >
                <dt className="uppercase tracking-widest text-[11px] text-neutral-500">
                  {label}
                </dt>
                <dd className="text-neutral-900 text-right truncate">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <span className="absolute -bottom-4 right-6 -rotate-12 border-2 border-rose-600 rounded-md px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-rose-600 bg-[#fffaf0]/80">
            project-06sdd ✺ library
          </span>
          <span
            aria-hidden
            className="absolute right-5 top-5 w-4 h-4 rounded-full bg-rose-100 shadow-inner"
          />
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
