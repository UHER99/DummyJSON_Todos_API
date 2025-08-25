import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CreateTodosApi,
  DeleteTodosApi,
  GetAllTodosApi,
  GetUserIdTodosApi,
  UpdateUserIdTodosApi,
} from "../api/CRUD.js";
import { message } from "antd";
import { useCRUDStore } from "../stores/useCRUDStore.js";

export const key = "todos";

export const useGetAllTods = () => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      return await GetAllTodosApi();
    },
    onError: (error) => {
      console.error("Error fetching todos:", error);
    },
  });
};

export const useGetUserIdTods = (id) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: async () => {
      return await GetUserIdTodosApi(id);
    },
    onError: (error) => {
      console.error("Error fetching todos for userId:", error);
    },
  });
};

export const useUpdateUserIdTods = () => {
  const queryClient = useQueryClient();
  const { todosStore, saveTodo } = useCRUDStore();
  return useMutation({
    mutationKey: ["update-todo"],
    mutationFn: async ({ id, data }) => {
      return await UpdateUserIdTodosApi(id, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(key);
      saveTodo(data);
      message.success("Todo updated successfully");
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    },
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  const removeTodo = useCRUDStore((state) => state.removeTodo);

  return useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: async (id) => {
      return await DeleteTodosApi(id);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries(key);
      removeTodo(id?.id);
      message.success("Todo deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });
};

export const useCreateTodos = () => {
  const queryClient = useQueryClient();
  const addTodos = useCRUDStore((state) => state.addTodos);

  function random3Digits() {
    const num = Math.floor(Math.random() * (1000 - 300)) + 300; // 300–999
    return num;
  }

  return useMutation({
    mutationKey: ["create-todo"],
    mutationFn: async (data) => {
      return await CreateTodosApi(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(key);

      const todoWithRandomId = {
        ...data,
        id: random3Digits(),
        userId: Number(data.userId),
      };
      addTodos(todoWithRandomId);

      message.success("Todo created successfully");
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
    },
  });
};
