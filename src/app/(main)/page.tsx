"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";
import { useBookStore } from "@/store/book";
import { useBorrowRecordsStore } from "@/store/borrowRecords";
import Button from "@/components/common/Button";
import CardBook from "@/components/card/CardBook";
import CardBookCollection from "@/components/card/CardBookCollection";
import CardBookMustRead from "@/components/card/CardBookMustRead";
import ShaderGradient from "@/components/ShaderGradient";
import MarqueeTapes from "@/components/zine/MarqueeTapes";
import SectionTitle from "@/components/zine/SectionTitle";
import { formatYearOnly } from "@/utils/formatDate";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { lastBorrowedBook, getLastBorrowedBook } = useBorrowRecordsStore();
  const {
    bookNewCollections,
    getNewCollections,
    bookMustRead,
    getMustReadBook,
  } = useBookStore();

  const { isSidebarOpen } = useSidebar();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollAmount = 500;

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      setIsAtStart(isAtStart);
      setIsAtEnd(isAtEnd);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  useEffect(() => {
    getLastBorrowedBook();
    getNewCollections();
    getMustReadBook();
  }, [getLastBorrowedBook, getNewCollections, getMustReadBook]);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(updateScrollButtons);

    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", handleScroll);
      updateScrollButtons();

      return () =>
        sliderRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const tapeWords = [
    "new arrivals",
    ...(bookNewCollections ?? []).map((book) => book.title),
    "must read",
    ...(bookMustRead ?? []).map((book) => book.title),
  ];

  return (
    <div>
      {/* hero */}
      <section className="relative overflow-hidden rounded-[3rem_3rem_3rem_10rem] min-h-[480px] p-8 md:p-14 text-rose-50 shadow-[0_40px_80px_-30px_rgba(136,19,55,0.6)]">
        <ShaderGradient
          variant="ink"
          className="absolute inset-0 h-full w-full"
        />

        <div className="relative max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-rose-200/80">
            № 06 — a library system — vol. {new Date().getFullYear()}
          </p>
          <h1 className="mt-6 font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight">
            Borrow a <em className="text-yellow-300">world</em>,
            <br />
            return it <em>softer</em>.
          </h1>
          <p className="mt-6 max-w-sm text-rose-100/90">
            {bookNewCollections?.length ?? 0} fresh spines just landed on the
            shelf. Nothing overdue, nothing judged.
          </p>
          <Link href="/books" className="inline-block mt-8">
            <Button
              color="white"
              className="rounded-full px-6! py-3! hover:-rotate-2 transition-all!"
              icon={ArrowRightIcon}
              iconPosition="right"
            >
              Browse the shelf
            </Button>
          </Link>
        </div>

        {/* floating covers */}
        <div className="hidden lg:block">
          {bookMustRead?.slice(0, 3).map((book, index) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className={`absolute motion-safe:animate-float hover:z-20 hover:scale-110 transition-transform duration-500 ${heroCovers[index]}`}
            >
              <Image
                src={BASE_URL + book.cover}
                alt={book.title}
                width={320}
                height={480}
                sizes="200px"
                className="w-full h-auto rounded-r-2xl rounded-l-sm shadow-[-20px_30px_40px_rgba(0,0,0,0.5)]"
              />
            </Link>
          ))}
          <svg
            viewBox="0 0 200 200"
            className="absolute right-[36%] bottom-8 w-32 h-32 motion-safe:animate-spin-slow"
            aria-hidden
          >
            <defs>
              <path
                id="badge-circle"
                d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
              />
            </defs>
            <circle cx="100" cy="100" r="98" fill="#fde047" />
            <text
              className="font-mono uppercase"
              fontSize="17"
              letterSpacing="3"
              fill="#1f0612"
            >
              <textPath href="#badge-circle">
                must read ✺ hujan bulan juni ✺ borrow ✺
              </textPath>
            </text>
            <text
              x="100"
              y="118"
              textAnchor="middle"
              fontSize="52"
              className="font-serif italic"
              fill="#be123c"
            >
              06
            </text>
          </svg>
        </div>
      </section>

      <MarqueeTapes words={tapeWords} />

      {/* section last borrowed books */}
      <section className="mt-6">
        <SectionTitle no="01" title="Where you left off" />
        <div className="relative w-full">
          {!isAtStart && (
            <Button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon={ArrowLeftIcon}
              color="opacity10"
              onClick={scrollLeft}
            />
          )}

          <div
            ref={sliderRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 py-4 items-center scroll-smooth scrollbar-hide"
          >
            {!lastBorrowedBook?.length && (
              <p className="font-serif italic text-3xl text-rose-900/50">
                nothing borrowed yet — the shelf is waiting for you.
              </p>
            )}
            {lastBorrowedBook?.map((borrow, index) => (
              <div
                key={index}
                className="relative max-w-[250px] min-w-[250px] md:max-w-[500px] md:min-w-[500px] p-4 rounded-lg
                md:h-56 overflow-hidden rounded-xl"
              >
                <CardBook
                  id={borrow.book.id}
                  title={borrow.book.title}
                  author={borrow.book.author}
                  year={formatYearOnly(borrow.book.published_date)}
                  genre={borrow.book.genres?.[0]}
                  imageSrc={BASE_URL + borrow.book.cover}
                />
              </div>
            ))}
          </div>

          {!isAtEnd && (
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon={ArrowRightIcon}
              color="opacity10"
              onClick={scrollRight}
            />
          )}
        </div>
      </section>

      {/* section newcollections and must-read selections */}
      <section className="mt-12">
        <div className="grid grid-cols-4 gap-8 py-4">
          <div className="col-span-4 lg:col-span-3">
            <SectionTitle no="02" title="New on the shelf" />
            <div className="grid grid-cols-4 md:grid-cols-5 gap-x-8 gap-y-10">
              {bookNewCollections?.map((book, index) => (
                <div
                  key={index}
                  className={`${isSidebarOpen ? "col-span-4" : "col-span-2"} md:col-span-1 transition-transform duration-500 hover:rotate-0 ${shelfTilts[index % shelfTilts.length]}`}
                >
                  <CardBookCollection
                    className="w-full"
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genres?.[0]}
                    imageSrc={BASE_URL + book.cover}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden col-span-4 lg:col-span-1 bg-rose-600 p-6 h-fit rounded-[2rem] rotate-1 text-white shadow-[0_30px_60px_-20px_rgba(136,19,55,0.6)]">
            <ShaderGradient
              variant="rose"
              className="absolute inset-0 h-full w-full"
            />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.3em] text-rose-100/80">
              03 —— top of the pile
            </p>
            <h2 className="relative mt-2 font-serif italic text-5xl leading-none">
              Must-read
            </h2>

            {bookMustRead?.slice(0, 3).map((book, index) => (
              <div
                key={index}
                className="relative flex items-center border-t border-dashed border-white/30 mt-4 pt-2"
              >
                <span className="font-serif italic text-7xl leading-none text-white/30 w-12 shrink-0">
                  {index + 1}
                </span>
                <CardBookMustRead
                  className="flex-1"
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  imageSrc={BASE_URL + book.cover}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const heroCovers = [
  "right-[30%] top-12 w-36 -rotate-12",
  "right-[13%] top-24 w-48 rotate-6 z-10 [animation-delay:-2s]",
  "right-6 top-6 w-36 -rotate-3 [animation-delay:-4s]",
];

const shelfTilts = [
  "-rotate-3",
  "rotate-2 mt-10",
  "-rotate-1 mt-4",
  "rotate-3 mt-12",
  "-rotate-2 mt-2",
];

export default Home;
