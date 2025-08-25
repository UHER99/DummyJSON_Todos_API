import { useMutation, useQuery, useQueryClient } from "react-query";
import {
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
  const { todosStore, saveTodo } = useCRUDStore();
  return useMutation({
    mutationKey: ["update-todo"],
    mutationFn: async ({ id, data }) => {
      return await UpdateUserIdTodosApi(id, data);
    },
    onSuccess: (data) => {
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
