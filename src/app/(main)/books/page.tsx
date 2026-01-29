"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useBookStore } from "@/store/book";
import CardBookWithDesc from "@/components/card/CardBookWithDesc";
import Dropdown from "@/components/common/Dropdown";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";

const options = [
  { name: "Option 1", icon: "CheckIcon" },
  { name: "Option 2", icon: "XMarkIcon" },
  { name: "Option 3", icon: "StarIcon" },
];

const options1 = [
  { label: "Option 1", value: "option1", icon: "CheckIcon" },
  { label: "Option 2", value: "option2", icon: "XMarkIcon" },
  { label: "Option 3", value: "option3", icon: "StarIcon" },
];

const Books = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isSidebarOpen } = useSidebar();
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
      {/* section recommended books */}
      <section>
        <div className="grid grid-cols-2 gap-4 pb-4">
          <div
            className={`${isSidebarOpen ? "col-span-2" : "col-span-1"} md:col-span-1`}
          >
            <h1 className="text-xl font-bold py-2">Book Collections</h1>
          </div>
          <div
            className={`${isSidebarOpen ? "col-span-2" : "col-span-1"} md:col-span-1 flex justify-end`}
          >
            <Button className="rounded-full" color="rose" onClick={toCreate}>
              Create Book
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 flex flex-col gap-4">
          {bookList?.slice(0, 2).map((book, index) => (
            <div
              key={index}
              className="col-span-2 lg:col-span-1 px-2 py-4 relative"
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
      <section className="py-4">
        <div className="grid grid-cols-2 justify-between bg-gray-200 p-4 rounded-full">
          <div
            className={`${isSidebarOpen ? "col-span-2 py-1" : "col-span-1"} md:col-span-1 flex items-center`}
          >
            <Dropdown
              defaultText={selected}
              list={options}
              withBackground
              withIcons={false}
              hideOnMd={false}
              onSelect={handleSelection}
            />
          </div>
          <div
            className={`${isSidebarOpen ? "col-span-2 py-1" : "col-span-1"} md:col-span-1 flex justify-end`}
          >
            <Select
              className="w-full md:w-1/2"
              options={options1}
              withIcons={false}
              defaultOption="Choose one"
              onChange={handleSelect}
            />
          </div>
        </div>

        <div className="py-4">
          <div className="grid grid-cols-3 flex flex-col gap-4">
            {bookList?.map((book, index) => (
              <div
                key={index}
                className="col-span-3 lg:col-span-1 px-2 py-4 relative"
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
        </div>
      </section>
    </div>
  );
};

export default Books;
