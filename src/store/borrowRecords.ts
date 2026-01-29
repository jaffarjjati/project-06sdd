import { create } from "zustand";
import Cookies from "js-cookie";
import axiosClient from "@/lib/axiosClient";

interface BorrowRecordsStore {
  lastBorrowedBook: BorrowRecord[] | null;
  loading: boolean;
  error: string | null;
  setLastBorrowedBook: (lastBorrowedBook: BorrowRecord[]) => void;
  getLastBorrowedBook: () => Promise<void>;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const useBorrowRecordsStore = create<BorrowRecordsStore>((set) => ({
  lastBorrowedBook: null,
  loading: false,
  error: null,
  setLastBorrowedBook: (lastBorrowedBook: BorrowRecord[]) =>
    set({ lastBorrowedBook }),

  getLastBorrowedBook: async () => {
    try {
      set({ loading: true, error: null });
      const token = Cookies.get("access");
      const response = await axiosClient.get(`${url}/borrow/last-borrowed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ lastBorrowedBook: response.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
