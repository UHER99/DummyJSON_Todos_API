import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Alert, Modal, Dropdown } from "antd";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsDatabaseExclamation } from "react-icons/bs";
import { useDeleteTodos, useGetUserIdTods, useUpdateUserIdTods } from "../../hooks/useCRUD.js";
import { useListTodos } from "../hook/useListTodos .js";

const ListTodos = () => {
    const { id } = useParams();
    const { dataTodos, isLoading, isError } = useListTodos(id);
    const { mutate: updateTodo } = useUpdateUserIdTods();
    const { mutate: deleteTodo } = useDeleteTodos();

    // modal state
    const [isModalVisible, setIsModalVisible] = useState(false); // edit modal
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [deletingTodoId, setDeletingTodoId] = useState(null);
    const [editingTodo, setEditingTodo] = useState(null);

    const showModal = (todo) => {
        setEditingTodo(todo);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        updateTodo({
            id: editingTodo.id,
            data: { todo: editingTodo.todo, completed: editingTodo.completed },
        });
        setIsModalVisible(false);
    }
    const handleCancel = () => setIsModalVisible(false);

    const showModalDelete = (id) => {
        setDeletingTodoId(id);
        setIsModalDelete(true);
    };

    const handleOkDelete = () => {
        if (deletingTodoId) {
            console.log("Deleting todo with id:", deletingTodoId);
            deleteTodo(deletingTodoId);
        }
        setIsModalDelete(false);
        setDeletingTodoId(null);
    };
    const handleCancelDelete = () => {
        setIsModalDelete(false);
        setDeletingTodoId(null);
    };

    // handle dropdown menu click
    const handleMenuClick = (todoId, value) => {
        const todo = dataTodos.find((t) => t.id === todoId);
        updateTodo({
            id: todoId,
            data: { completed: value === "true" ? true : false, todo: todo?.todo || "" },
        });
    };



    // Handle loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading Todos..." />
            </div>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Alert message="Failed to load Todos" type="error" showIcon />
            </div>
        );
    }

    return (
        <div>
            {dataTodos.length !== 0 ? (
                dataTodos.map((todo) => {
                    const menuItems = [
                        { key: "true", label: "ເຮັດສໍາເລັດ" },
                        { key: "false", label: "ຍັງບໍ່ສໍາເລັດ" },
                    ];

                    return (
                        <div
                            key={todo.id}
                            className="flex gap-6 items-center border border-gray-300 rounded-[10px] p-4 m-4 justify-between"
                        >
                            {/* Left side: todo text */}
                            <div className="flex items-center gap-2">
                                <GrStatusGoodSmall
                                    color={todo.completed === true ? "green" : "red"}
                                />
                                <div key={todo.id}>
                                    <p>Todo:</p>
                                    <p>{todo.todo}</p>

                                </div>
                            </div>

                            {/* Right side: actions */}
                            <div className="flex items-center gap-4">
                                <hr className="w-0 h-12 border-2 border-gray-500" />
                                <p>Status:</p>

                                <Dropdown
                                    menu={{
                                        items: menuItems,
                                        onClick: ({ key }) => handleMenuClick(todo.id, key),
                                    }}
                                >
                                    <div
                                        className={`flex justify-center items-center pt-1 pb-1 pl-3 pr-3 text-white rounded-[2px] cursor-pointer ${todo.completed === true
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-red-600 hover:bg-red-700"
                                            }`}
                                    >
                                        {todo.completed === true
                                            ? "ເຮັດສໍາເລັດ"
                                            : "ຍັງບໍ່ສໍາເລັດ"}{" "}
                                        <IoIosArrowDown />
                                    </div>
                                </Dropdown>

                                {/* Edit / Delete */}
                                <div className="flex gap-4 text-gray-400 text-xl">
                                    <FiEdit
                                        className="hover:text-green-600 cursor-pointer"
                                        onClick={() => showModal(todo)}
                                    />
                                    <RiDeleteBin7Line
                                        onClick={() => showModalDelete(todo.id)}
                                        className="hover:text-red-600 cursor-pointer"
                                    />
                                </div>

                                {/* Edit Modal */}
                                {/* Edit Modal */}
                                <Modal
                                    title="Edit Todo"
                                    open={isModalVisible}
                                    onOk={() => {
                                        if (editingTodo) {
                                            updateTodo({ id: editingTodo.id, data: { todo: editingTodo.todo } });
                                        }
                                        handleOk();
                                    }}
                                    onCancel={handleCancel}
                                    okText="ຕົກລົງ"
                                    cancelText="ປິດ"
                                >
                                    <input
                                        type="text"
                                        value={editingTodo?.todo || ""}
                                        onChange={(e) =>
                                            setEditingTodo((prev) => ({ ...prev, todo: e.target.value }))
                                        }
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Edit your todo"
                                    />
                                </Modal>


                                {/* Delete Modal */}
                                <Modal
                                    title="Delete Todo"
                                    open={isModalDelete}
                                    onOk={handleOkDelete}
                                    onCancel={handleCancelDelete}
                                    okText="ຕົກລົງ"
                                    cancelText="ປິດ"
                                >
                                    <p>ທ່ານຕ້ອງການລົບລາຍການ Todo ນີ້ບໍ?</p>
                                </Modal>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center flex justify-center items-center space-x-4 mt-10">
                    <p>No Todos Found</p>
                    <BsDatabaseExclamation size={25} />
                </div>
            )}
        </div>
    );
};

export default ListTodos;
