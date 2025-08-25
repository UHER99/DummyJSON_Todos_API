import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image, Input, message, Modal, } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SearchOutlined } from "@ant-design/icons";
import ListTodos from "./ListTodos";
import { useListTodosStore } from "../../stores/useListTodosStore";
import { useProfile } from "../hook/useProfile";
import { useListTodos } from "../hook/useListTodos .js";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { useCreateTodos } from "../../hooks/useCRUD.js";


const ViewUserTodos = () => {
    const { id, profileImg } = useParams();
    const profileImages = Object.values(useProfile);
    const Profile = profileImages.find((img) => img.endsWith(profileImg));
    const { statusTodos, setStatusTodos, searchText, setSearchText } = useListTodosStore();
    const { completedTodos, notCompletedTodos, dataTodosApi: data, } = useListTodos(id);
    const { mutate: createTodo } = useCreateTodos();


    const handleSearch = () => {
        setSearchText(searchText);
    };

    const [isModalAdd, setIsModalAdd] = useState(false);
    const [newTodo, setNewTodo] = useState("");



    const showModalAdd = () => setIsModalAdd(true);
    const handleOkAdd = () => {
        if (newTodo.trim() === "") {
            message.warning("ກະລຸນາໃສ່ Todo ໃໝ່");
            return;
        }
        createTodo({ userId: id, todo: newTodo, completed: false });

        setNewTodo("");
        setIsModalAdd(false);

    };
    const handleCancelAdd = () => {
        setNewTodo("");
        setIsModalAdd(false);
    };





    return (
        <div>
            <hr className="my-2 border-t border-2 border-gray-500" />

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Profile Panel */}
                <div className="flex lg:flex-col w-full lg:w-[210px] lg:min-h-screen bg-slate-200 rounded-[10px]">
                    <div className="pt-4 flex flex-col items-center">
                        <p>My Profile</p>
                        <div className="w-[150px] h-[150px] mx-auto mt-4 rounded-full overflow-hidden border-2 p-4 border-gray-100">
                            <Image src={Profile} alt="Profile" />
                        </div>
                        <p className="mt-4">User ID: {id}</p>
                    </div>

                    {/* Add New Todo */}
                    <div className="w-full p-6 mt-6 flex flex-col items-center justify-center space-y-4">
                        <p>Add New Todo</p>
                        <div className="w-full h-[140px] bg-white hover:bg-slate-300 rounded-[10px] flex items-center justify-center">
                            <IoIosAddCircleOutline
                                size={50}
                                className="text-gray-500 hover:text-white cursor-pointer"
                                onClick={showModalAdd}
                            />
                        </div>
                        {/* Modal Add */}
                        <Modal
                            title="ເພີ່ມ Todo ໃໝ່ :"
                            open={isModalAdd}
                            onOk={handleOkAdd}
                            onCancel={handleCancelAdd}
                            okText="ເພີ່ມ"
                            cancelText="ຍົກເລີກ"
                        >
                            <Input
                                placeholder="ໃສ່ Todo ໃໝ່"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                        </Modal>
                    </div>
                </div>

                {/* Todos List */}
                <div className="w-full mt-6 text-[14px] ">
                    <div className="flex justify-around gap-6">
                        <div
                            onClick={() => setStatusTodos("1")}
                            className={`w-full h-[100px] bg-slate-200 hover:bg-slate-300 ${searchText ? "bg-slate-200" : statusTodos === "1" ? "bg-slate-300" : ""
                                } rounded-[10px] flex items-center justify-center`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col md:flex-row items-center">
                                    <p>Todos </p>
                                    <p>ທັງໝັດ</p>
                                </div>

                                <p>{data?.length || 0}</p>
                                {statusTodos === "1" ? <BiCheckboxChecked color="green" size={25} /> : <BiCheckbox color="gray" size={25} />}

                            </div>

                        </div>
                        <div
                            onClick={() => setStatusTodos("2")}
                            className={`w-full h-[100px] bg-slate-200 hover:bg-slate-300 ${searchText ? "bg-slate-200" : statusTodos === "2" ? "bg-slate-300" : ""
                                } rounded-[10px] flex items-center justify-center`}

                        >
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col md:flex-row items-center">
                                    <p>Todos </p>
                                    <p>ເຮັດສໍາເລັດ</p>
                                </div>
                                <p>{completedTodos?.length || 0}</p>
                                {statusTodos === "2" ? <BiCheckboxChecked color="green" size={25} /> : <BiCheckbox color="gray" size={25} />}

                            </div>

                        </div>
                        <div
                            onClick={() => setStatusTodos("3")}
                            className={`w-full h-[100px] bg-slate-200 hover:bg-slate-300 ${searchText ? "bg-slate-200" : statusTodos === "3" ? "bg-slate-300" : ""
                                } rounded-[10px] flex items-center justify-center`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col md:flex-row items-center">
                                    <p>Todos</p>
                                    <p>ຍັງບໍ່ສໍາເລັດ</p>
                                </div>

                                <p>{notCompletedTodos?.length || 0}</p>
                                {statusTodos === "3" ? <BiCheckboxChecked color="green" size={25} /> : <BiCheckbox color="gray" size={25} />}
                            </div>
                        </div>
                    </div>

                    {/* List Detail */}
                    <div className="mt-6">
                        <div>
                            <p className="text-[16px]">My list Todos</p>
                            <div className="flex justify-center items-center ">
                                <p>ຄົ້ນຫາ Text Todos ທີ່ນີ່ </p>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="ໃສ່ Text Todos..."
                                        suffix={<SearchOutlined />}
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <Button type="primary" onClick={handleSearch}>Search</Button>
                                </div>
                            </div>
                        </div>

                        {/* All Todos */}
                        <div>
                            <ListTodos />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserTodos;
