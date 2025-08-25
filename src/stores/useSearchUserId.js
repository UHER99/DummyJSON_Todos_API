import { create } from "zustand";

export const userSearchUserId = create((set) => ({
  userId: "",
  setUserId: (id) => set({ userId: id }),
}));
