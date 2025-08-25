import { useState } from "react";
import { useGetAllTods, useGetUserIdTods } from "../../hooks/useCRUD.js";
import { useProfile } from "./useProfile.js";
import { userCurrentPage } from "../../stores/useCurrentPage.js";
import { userSearchUserId } from "../../stores/useSearchUserId.js";
import { useCRUDStore } from "../../stores/useCRUDStore.js";

export const useDashboard = () => {
  const { data, isLoading, isError } = useGetAllTods();

  const { currentPage, setCurrentPage } = userCurrentPage();
  const { userId, setUserId } = userSearchUserId();

  const { data: userIdTodos } = useGetUserIdTods(userId);

  // ดึง todos จาก store (merge กับ API)
  const { todosStore } = useCRUDStore.getState();

  const todosApi = userIdTodos ? userIdTodos?.todos || [] : data?.todos || [];

  const todos =
    todosApi?.map((todo) => {
      const existInStore = todosStore.find((t) => t.id === todo.id);
      return existInStore ? existInStore : todo;
    }) || [];


  // Get unique userIds and sort ascending
  const userIds = [...new Set(todos.map((todo) => todo.userId))].sort(
    (a, b) => a - b
  );
  const profileImages = Object.values(useProfile);

  // Pagination state
  const pageSize = 10;

  // Calculate start/end slice for current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = userIds.slice(startIndex, endIndex);

  return {
    currentUsers,
    isLoading,
    isError,
    setCurrentPage,
    profileImages,
    userId,
    setUserId,
    userIds,
    todos,
    startIndex,
    endIndex,
    pageSize,
  };
};
