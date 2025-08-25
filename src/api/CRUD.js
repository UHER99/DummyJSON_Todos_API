import axios from "axios";
import ApiPath from "./ApiPath.js";

export const GetAllTodosApi = async () => {
  try {
    const response = await axios.get(ApiPath.getAllTodos, {});
    // console.log("Res In TodosApi => ", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error Res In TodosApi => ", error);
    throw error;
  }
};

export const GetUserIdTodosApi = async (id) => {
  try {
    const response = await axios.get(ApiPath.getUserIdTodos(id), {});
    // console.log("Res In TodosApi => ", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error Res In TodosApi => ", error);
    throw error;
  }
};

export const UpdateUserIdTodosApi = async (id, data) => {
  try {
    const response = await axios.put(ApiPath.updateUserIdTodos(id), data);
    // console.log("UpdateUserIdTodosApi => ", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error Res In TodosApi => ", error);
    throw error;
  }
};

export const DeleteTodosApi = async (id) => {
  try {
    const response = await axios.delete(ApiPath.deleteTodos(id));
    // console.log("DeleteTodosApi => ", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error Res In TodosApi => ", error);
    throw error;
  }
};

export const CreateTodosApi = async (data) => {
  try {
    const response = await axios.post(ApiPath.createTodos, data);
    console.log("CreateTodosApi => ", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error Res In TodosApi => ", error);
    throw error;
  }
};
