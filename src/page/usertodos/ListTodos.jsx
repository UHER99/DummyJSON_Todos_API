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
import { useCRUDStore } from "../../stores/useCRUDStore.js";

const ListTodos = () => {
    const { id } = useParams();
    const { dataTodos, isLoading, isError } = useListTodos(id);
    const { mutate: updateTodo } = useUpdateUserIdTods();
    const { mutate: deleteTodo } = useDeleteTodos();
    const removeNewTodo = useCRUDStore((state) => state.removeNewTodo);
    const addTodos = useCRUDStore((state) => state.addTodos);

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
        if (editingTodo.id > 299) {
            addTodos({ id: editingTodo.id, todo: editingTodo.todo, completed: editingTodo.completed, userId: id });
        }
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
        if (deletingTodoId > 299) {
            removeNewTodo(deletingTodoId);
        }
        if (deletingTodoId) {
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
        if (todoId > 299) {
            addTodos({ id: todo.id, todo: todo.todo, completed: value === "true" ? true : false, userId: id });
        }
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
                            className="flex shadow-lg gap-6 items-center border border-gray-300 rounded-[10px] p-4 m-4 justify-between"
                        >
                            {/* Left side: todo text */}
                            <div className="flex items-start gap-2 text-[14px] w-2/3">
                                <GrStatusGoodSmall
                                    color={todo.completed === true ? "green" : "red"}
                                    className="mt-1"
                                />
                                <div className="flex flex-col break-words">
                                    <p className="font-semibold">Todo:</p>
                                    <p className="whitespace-normal break-words">{todo.todo}</p>
                                </div>
                            </div>

                            {/* Right side: actions */}
                            <div className="flex items-center gap-4 flex-nowrap">
                                <hr className="h-14 border-l-2 border-gray-500" />

                                <div className="flex flex-col lg:flex-row items-center gap-6 flex-nowrap">
                                    {/* Status */}
                                    <div className="flex flex-col lg:flex-row items-center text-[14px] gap-2 whitespace-nowrap">
                                        <p>Status:</p>
                                        <Dropdown
                                            menu={{
                                                items: menuItems,
                                                onClick: ({ key }) => handleMenuClick(todo.id, key),
                                            }}
                                        >
                                            <div
                                                className={`flex justify-center items-center shadow-lg gap-1 px-3 py-1 text-white rounded-[5px] cursor-pointer ${todo.completed
                                                        ? "bg-green-600 hover:bg-green-700"
                                                        : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                            >
                                                {todo.completed ? "ເຮັດສໍາເລັດ" : "ຍັງບໍ່ສໍາເລັດ"}
                                                <IoIosArrowDown />
                                            </div>
                                        </Dropdown>
                                    </div>

                                    {/* Edit / Delete */}
                                    <div className="flex gap-4  text-gray-400 text-xl whitespace-nowrap">
                                        <FiEdit
                                            className="hover:text-green-600 cursor-pointer shadow-lg"
                                            onClick={() => showModal(todo)}
                                        />
                                        <RiDeleteBin7Line
                                            onClick={() => showModalDelete(todo.id)}
                                            className="hover:text-red-600 cursor-pointer shadow-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Edit Modal */}
                            <Modal
                                title="Edit Todo"
                                open={isModalVisible}
                                onOk={() => {
                                    if (editingTodo) {
                                        updateTodo({
                                            id: editingTodo.id,
                                            data: { todo: editingTodo.todo },
                                        });
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
