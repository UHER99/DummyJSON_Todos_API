const baseUrl = import.meta.env.VITE_BASE_URL_API;

export default class ApiPath {
  static getAllTodos = `${baseUrl}/todos?limit=254`;
  static getUserIdTodos = (id) => `${baseUrl}/todos/user/${id}`;
  static updateUserIdTodos = (id) => `${baseUrl}/todos/${id}`;
  static deleteTodos = (id) => `${baseUrl}/todos/${id}`;
}
