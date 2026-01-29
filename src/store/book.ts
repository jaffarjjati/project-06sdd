import { create } from "zustand";
import Cookies from "js-cookie";
import axiosClient from "@/lib/axiosClient";

interface BookStore {
  bookList: Book[] | null;
  book: Book | null;
  bookNewCollections: Book[] | null;
  bookMustRead: Book[] | null;
  loading: boolean;
  error: string | null;
  setBookList: (booklist: Book[]) => void;
  setBook: (book: Book) => void;
  setBookNewCollections: (bookNewCollections: Book[]) => void;
  setBookMustRead: (bookMustRead: Book[]) => void;
  getBookList: (params: any) => Promise<void>;
  getBookById: (id: string) => Promise<void>;
  createBook: (formData: FormData) => Promise<void>;
  getNewCollections: () => Promise<void>;
  getMustReadBook: () => Promise<void>;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const useBookStore = create<BookStore>((set) => ({
  bookList: null,
  book: null,
  bookNewCollections: null,
  bookMustRead: null,
  loading: false,
  error: null,
  setBookList: (bookList: Book[]) => set({ bookList }),
  setBook: (book: Book) => set({ book }),
  setBookNewCollections: (bookNewCollections: Book[]) =>
    set({ bookNewCollections }),
  setBookMustRead: (bookMustRead: Book[]) => set({ bookMustRead }),

  getBookList: async (params: any) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get(`${url}/books/`, { params });
      set({ bookList: response.data.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  getBookById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get(`${url}/books/${id}`);
      set({ book: response.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  createBook: async (formData: FormData) => {
    set({ loading: true, error: null });
    const token = Cookies.get("access");
    try {
      await axiosClient.post(`${url}/books/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  getNewCollections: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get(`${url}/books/new-collections`);
      set({ bookNewCollections: response.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  getMustReadBook: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get(`${url}/books/must-read`);
      set({ bookMustRead: response.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
