import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useListTodosStore = create(
  persist(
    (set) => ({
      statusTodos: "1",
      searchText: "",
      setStatusTodos: (status) => set({ statusTodos: status }),
      setSearchText: (text) => set({ searchText: text }),
    }),
    {
      name: "list-todos-storage",
    }
  )
);
