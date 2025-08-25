// useCRUDStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCRUDStore = create(
  persist(
    (set, get) => ({
      todosStore: [],
      // เก็บ todo ที่ถูกลบ
      todosStoreDelete: [],

      newTodos: [],
      addTodos: (todo) =>
        set((state) => {
          const index = state.newTodos.findIndex((t) => t.id === todo.id);
          if (index !== -1) {
            // update todo เดิม
            const updatedTodos = [...state.newTodos];
            updatedTodos[index] = todo;
            return { newTodos: updatedTodos };
          } else {
            // add ใหม่
            return { newTodos: [...state.newTodos, todo] };
          }
        }),

      removeNewTodo: (id) =>
        set((state) => ({
          newTodos: state.newTodos.filter((todo) => todo.id !== id),
        })),

      // add or update todo by id
      saveTodo: (newTodo) => {
        set((state) => {
          const index = state.todosStore.findIndex(
            (todo) => todo.id === newTodo.id
          );

          if (index === -1) {
            // todo not exist, add new
            return { todosStore: [...state.todosStore, newTodo] };
          } else {
            // todo exists, update old one
            const updatedTodos = [...state.todosStore];
            updatedTodos[index] = { ...updatedTodos[index], ...newTodo };
            return { todosStore: updatedTodos };
          }
        });
      },

      // remove todo by id → ย้ายไป todosStoreDelete
      removeTodo: (id) => {
        set((state) => ({
          todosStore: state.todosStore.filter((todo) => todo.id !== id),
          todosStoreDelete: [...state.todosStoreDelete, id], // ✅ เก็บเฉพาะ id
        }));
      },

      // clear all todos
      clearTodos: () =>
        set({ todosStore: [], todosStoreDelete: [], newTodos: [] }),

      // clear deleted list
      clearDeleted: () => set({ todosStoreDelete: [] }),
    }),
    {
      name: "crud-todos-storage", // key in localStorage
    }
  )
);
