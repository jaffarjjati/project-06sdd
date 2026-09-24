"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookStore } from "@/store/book";
import CardBookWithDesc from "@/components/card/CardBookWithDesc";
import Dropdown from "@/components/common/Dropdown";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import PageHero from "@/components/zine/PageHero";
import SectionTitle from "@/components/zine/SectionTitle";
import MarqueeTapes from "@/components/zine/MarqueeTapes";
import {
  CheckIcon,
  PlusIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const options = [
  { name: "Option 1", icon: CheckIcon },
  { name: "Option 2", icon: XMarkIcon },
  { name: "Option 3", icon: StarIcon },
];

const options1 = [
  { label: "Option 1", value: "option1", icon: CheckIcon },
  { label: "Option 2", value: "option2", icon: XMarkIcon },
  { label: "Option 3", value: "option3", icon: StarIcon },
];

const Books = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { bookList, getBookList } = useBookStore();

  const [selected, setSelected] = useState("sorting by");

  const handleSelection = (selectedItem: string) => {
    setSelected(selectedItem);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const toCreate = () => {
    router.push(`/books/create`);
  };

  useEffect(() => {
    const params = {
      page: 1,
      limit: 6,
      title: "",
    };

    getBookList(params);
  }, [getBookList]);
  return (
    <div>
      <PageHero
        label="02 — the stacks"
        title={
          <>
            Every book,
            <br />
            <em className="text-yellow-300">all at once</em>.
          </>
        }
        subtitle="Browse, sort, and pull something off the shelf. The library never closes."
      >
        <Button
          color="white"
          className="rounded-full px-6! py-3! hover:-rotate-2 transition-all!"
          icon={PlusIcon}
          onClick={toCreate}
        >
          Create Book
        </Button>
      </PageHero>

      <MarqueeTapes
        words={["the stacks", ...(bookList ?? []).map((book) => book.title)]}
      />

      {/* section recommended books */}
      <section className="mt-6">
        <SectionTitle no="01" title="Pinned to the wall" />
        <div className="grid grid-cols-2 gap-8 pt-8">
          {bookList?.slice(0, 2).map((book, index) => (
            <div
              key={index}
              className={`col-span-2 lg:col-span-1 ${index % 2 ? "rotate-1 lg:mt-10" : "-rotate-1"}`}
            >
              <CardBookWithDesc
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageSrc={BASE_URL + book.cover}
                lineClamp={5}
                size="md"
              />
            </div>
          ))}
        </div>
      </section>

      {/* list of all books and filter */}
      <section className="mt-20">
        <SectionTitle no="02" title="The whole shelf" />
        {/* card-catalog strip; z-20 keeps its menus above the tilted cards */}
        <div className="relative z-20 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 rounded-[2rem] md:rounded-full bg-neutral-950 text-rose-100 p-5 md:p-3 md:pl-8 -rotate-[0.5deg] shadow-[0_24px_50px_-20px_rgba(31,6,18,0.7)]">
          <p className="shrink-0 font-serif italic text-4xl leading-none text-yellow-300">
            {bookList?.length ?? 0} <span className="text-rose-100">books</span>
          </p>
          <span className="hidden md:block h-8 w-px bg-rose-100/20" />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-200/70">
              sort
            </span>
            <Dropdown
              className="rounded-full border border-rose-100/30"
              defaultText={selected}
              list={options}
              withBackground={false}
              withIcons={false}
              hideOnMd={false}
              onSelect={handleSelection}
            />
          </div>
          <div className="flex items-center gap-3 md:ml-auto md:w-96">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-200/70">
              filter
            </span>
            <Select
              className="flex-1"
              options={options1}
              withIcons={false}
              defaultOption="Choose one"
              onChange={handleSelect}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-16 pt-16">
          {bookList?.map((book, index) => (
            <div
              key={index}
              className={`col-span-3 lg:col-span-1 ${gridTilts[index % gridTilts.length]}`}
            >
              <CardBookWithDesc
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageSrc={BASE_URL + book.cover}
                lineClamp={2}
                size="sm"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const gridTilts = ["-rotate-1", "rotate-1 lg:mt-8", "-rotate-[0.5deg] lg:mt-3"];

export default Books;
