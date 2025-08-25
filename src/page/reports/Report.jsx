import React from "react";
import { Progress, Spin } from "antd";
import ReportMoreTodoUser from "./ReportMoreTodoUer.jsx";
import { useDashboard } from "../hook/useDashbord.js";
import { useCRUDStore } from "../../stores/useCRUDStore.js";

const Report = () => {

    const { todos, userIds, isLoading, isError, } = useDashboard();
    const todosStoreDelete = useCRUDStore((state) => state.todosStoreDelete);
    const reportTodos = todos?.filter(
        (todo) => !todosStoreDelete.includes(todo.id)
    );


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


    const todosCompleted = reportTodos?.filter((todo) => todo.completed).length;
    const todosNotCompleted = reportTodos?.filter((todo) => !todo.completed).length;

    const numbers = [
        { id: 1, value: userIds?.length, text: "ຄົນ", title: "User ທັງໝົດ", color: "#1890ff" }, // blue
        { id: 2, value: reportTodos.length, text: "ລາຍການ", title: "Todos ທັງໝົດ", color: "#faad14" }, // yellow
        { id: 3, value: todosCompleted, text: "ລາຍການ", title: "Todo ທີ່ເຮັດສໍາເລັດ", color: "#52c41a" }, // green
        { id: 4, value: todosNotCompleted, text: "ລາຍການ", title: "Todo ທີ່ຍັງເຮັດບໍ່ສໍາເລັດ", color: "#f5222d" }, // red
    ];

    return (
        <div>
            <p className="text-[40px] font-semibold text-slate-600">Report</p>
            <div className="mt-6 space-y-2">
                <p>ລາຍການ Todos : </p>
                <div className="flex p-2 flex-wrap gap-10 mt-2 ">
                    {numbers.map((item) => (
                        <div className="text-center text-[14px]" key={item.id}>
                            <Progress
                                type="circle"
                                percent={item.value}
                                strokeWidth={12}
                                strokeColor={item.color}
                                format={() => (<>
                                    {item.value}
                                    <span className="text-[12px]">{item.text}</span>
                                </>)}
                            />
                            <p className="mt-3 font-medium">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <ReportMoreTodoUser />
        </div>
    );
};

export default Report;
