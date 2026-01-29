"use client";
import { useRef, useState, useEffect } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useBookStore } from "@/store/book";
import { useBorrowRecordsStore } from "@/store/borrowRecords";
import Button from "@/components/common/Button";
import CardBook from "@/components/card/CardBook";
import CardBookCollection from "@/components/card/CardBookCollection";
import CardBookMustRead from "@/components/card/CardBookMustRead";
import { formatYearOnly } from "@/utils/formatDate";

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

  return (
    <div>
      {/* section last borrowed books */}
      <section>
        <h1 className="text-xl font-bold py-2">Last Borrowed Books</h1>
        <div className="relative w-full">
          {!isAtStart && (
            <Button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowLeftIcon"
              color="opacity10"
              onClick={scrollLeft}
            />
          )}

          <div
            ref={sliderRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 py-4 items-center scroll-smooth scrollbar-hide"
          >
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
              icon="ArrowRightIcon"
              color="opacity10"
              onClick={scrollRight}
            />
          )}
        </div>
      </section>

      {/* section newcollections and must-read selections */}
      <section>
        <div className="grid grid-cols-4 gap-4 py-4">
          <div className="col-span-4 md:col-span-3">
            <h1 className="text-xl font-bold py-4">New Collections</h1>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
              {bookNewCollections?.map((book, index) => (
                <div
                  key={index}
                  className={`${isSidebarOpen ? "col-span-4" : "col-span-2"} md:col-span-1 flex flex-col items-center p-2`}
                >
                  <CardBookCollection
                    className="w-full break-all"
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
          <div className="col-span-4 md:col-span-1 bg-rose-600 p-4 h-full rounded-lg text-white">
            <h1 className="text-xl font-bold">Must-Read Selections</h1>

            {bookMustRead
              ?.slice(0, 3)
              .map((book, index) => (
                <CardBookMustRead
                  key={index}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  imageSrc={BASE_URL + book.cover}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
