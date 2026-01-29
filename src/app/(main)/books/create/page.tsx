"use client";

import { useEffect, useState } from "react";
import { useBookStore } from "@/store/book";
import { useGenreStore } from "@/store/genre";
import { useRouter } from "next/navigation";
import InputImage from "@/components/common/InputImage";
import InputText from "@/components/common/InputText";
import TextArea from "@/components/common/TextArea";
import DatePicker from "@/components/common/DatePicker";
import Button from "@/components/common/Button";
import MultiSelect from "@/components/common/MultiSelect";

const CreateBook = () => {
  const router = useRouter();
  const { createBook } = useBookStore();
  const { genreList, getGenreList } = useGenreStore();

  const [formData, setFormData] = useState({
    cover: "",
    title: "",
    author: "",
    genres: [] as string[],
    isbn: "",
    description: "",
    publishDate: null as Date | null,
    publisher: "",
    language: "",
    pages: "",
    availableCopies: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    if (file) form.append("cover", file);
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("isbn", formData.isbn);
    form.append("published_date", formData.publishDate?.toISOString() || "");
    form.append("publisher", formData.publisher);
    form.append("pages", formData.pages);
    form.append("description", formData.description);
    form.append("language", formData.language);
    formData.genres.forEach((g) => form.append("genres", g));
    form.append("available_copies", formData.availableCopies);

    try {
      await createBook(form);

      router.push("/books");
    } catch (e) {
      console.error("create book failed:", e);
    }
  };

  useEffect(() => {
    getGenreList();
  }, [getGenreList]);

  return (
    <div className="pb-6">
      <h1 className="text-xl font-bold py-2">Create Book</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Cover</h3>
            <InputImage
              onUpload={(file) => {
                if (file) {
                  setFile(file);
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setFormData((prev) => ({
                      ...prev,
                      cover: e.target?.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                } else {
                  setFile(null);
                  setFormData((prev) => ({ ...prev, cover: "" }));
                }
              }}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Title</h3>
            <InputText
              name="title"
              placeholder="e.g. A Song of Ice and Fire"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Author</h3>
            <InputText
              name="author"
              placeholder="e.g. George R. R. Martin"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Genres</h3>
            <MultiSelect
              options={(genreList ?? []).map((g) => ({
                label: g.name,
                value: g.id.toString(),
              }))}
              onChange={(selectedGenres) =>
                setFormData((prev) => ({ ...prev, genres: selectedGenres }))
              }
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">ISBN</h3>
            <InputText
              name="isbn"
              placeholder="e.g. 9780553386790"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Description</h3>
            <TextArea
              name="description"
              placeholder="e.g. A Song of Ice and Fire takes place in a fictional world in which seasons.."
              rows={6}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Publish Date</h3>
            <DatePicker
              placeholder="Select date"
              selectedDate={formData.publishDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, publishDate: date }))
              }
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Publisher</h3>
            <InputText
              name="publisher"
              placeholder="e.g. Random House Worlds"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Language</h3>
            <InputText
              name="language"
              placeholder="e.g. English"
              value={formData.language}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Pages</h3>
            <InputText
              name="pages"
              placeholder="e.g. 704"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">
              Available Copies
            </h3>
            <InputText
              name="availableCopies"
              placeholder="e.g. 100"
              value={formData.availableCopies}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-2">
          <Button className="rounded-full" color="opacity10">
            Back
          </Button>
          <Button className="rounded-full" color="rose" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
