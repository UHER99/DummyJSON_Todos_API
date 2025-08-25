import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userCurrentPage = create(
  persist(
    (set) => ({
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "user-current-page",
    }
  )
);
