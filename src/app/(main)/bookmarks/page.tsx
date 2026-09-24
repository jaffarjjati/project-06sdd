"use client";
import { useEffect } from "react";
import { useBookStore } from "@/store/book";

import CardBookWithDesc from "@/components/card/CardBookWithDesc";
import PageHero from "@/components/zine/PageHero";
import SectionTitle from "@/components/zine/SectionTitle";

const Bookmarks = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bookStore = useBookStore();
  const bookList = bookStore.bookList;

  const getBookList = () => {
    const params = {
      page: 1,
      limit: 6,
      title: "",
    };
    bookStore.getBookList(params);
  };

  useEffect(() => {
    getBookList();
  }, []);
  return (
    <div>
      <PageHero
        label="04 — dog-eared"
        title={
          <>
            Pages you <em className="text-yellow-300">folded</em>
            <br />
            for later.
          </>
        }
        subtitle="A small pile of maybes, somedays, and definitely-nexts."
      />

      {/* section bookmarks */}
      <section className="mt-16">
        <SectionTitle no="01" title="The saved pile" />
        <div className="grid grid-cols-3 gap-x-8 gap-y-16 pt-8">
          {bookList?.map((book, index) => (
            <div
              key={index}
              className={`relative col-span-3 lg:col-span-1 ${pileTilts[index % pileTilts.length]}`}
            >
              <CardBookWithDesc
                className="pr-12"
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageSrc={BASE_URL + book.cover}
                lineClamp={2}
                size="sm"
              />
              {/* ribbon bookmark hanging off the card */}
              <span
                aria-hidden
                className="absolute right-8 -top-2 w-7 h-16 bg-rose-600 shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const pileTilts = ["rotate-1", "-rotate-1 lg:mt-8", "rotate-[0.5deg] lg:mt-3"];

export default Bookmarks;
