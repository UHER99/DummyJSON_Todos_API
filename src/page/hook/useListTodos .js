import { useGetUserIdTods } from "../../hooks/useCRUD.js";
import { useCRUDStore } from "../../stores/useCRUDStore.js";
import { useListTodosStore } from "../../stores/useListTodosStore.js";

export const useListTodos = (userId) => {
  // ดึงข้อมูล API
  const { data, isLoading, isError } = useGetUserIdTods(userId);

  // ดึงค่า status และ searchText จาก store
  const { statusTodos, searchText } = useListTodosStore();

  // ดึง todos จาก store (merge กับ API)
  const { todosStore } = useCRUDStore.getState();
  const todosStoreDelete = useCRUDStore((state) => state.todosStoreDelete);

  // merge todos API กับ store
  const dataTodosApi =
    data?.todos
      .map((todo) => {
        const existInStore = todosStore.find((t) => t.id === todo.id);
        return existInStore ? existInStore : todo;
      })
      .filter((todo) => !todosStoreDelete.includes(todo.id)) || [];

  const dataTodosDelete =
    dataTodosApi.filter((todo) => todosStoreDelete.includes(todo.id)) || [];

  const completedTodosApi = dataTodosApi.filter(
    (todo) => todo.completed === true && !todosStoreDelete.includes(todo.id)
  );
  const notCompletedTodosApi = dataTodosApi.filter(
    (todo) => todo.completed === false && !todosStoreDelete.includes(todo.id)
  );

  // filter by id and merge with store
  const completedTodos = completedTodosApi?.map((todo) => {
    const existInStore = todosStore.find((t) => t.id === todo.id);
    return existInStore ? existInStore : todo;
  });

  const notCompletedTodos = notCompletedTodosApi?.map((todo) => {
    const existInStore = todosStore.find((t) => t.id === todo.id);
    return existInStore ? existInStore : todo;
  });

  const dataSearchText = dataTodosApi?.filter(
    (todo) =>
      todo.todo.toLowerCase().includes(searchText.toLowerCase()) &&
      !todosStoreDelete.includes(todo.id)
  );

  const dataTodos = searchText
    ? dataSearchText || []
    : statusTodos === "1"
    ? dataTodosApi || []
    : statusTodos === "2"
    ? completedTodos
    : notCompletedTodos;

  return {
    dataTodos,
    isLoading,
    isError,
    completedTodos,
    notCompletedTodos,
    data,
    dataTodosApi,
  };
};
