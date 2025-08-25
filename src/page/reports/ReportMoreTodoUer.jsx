import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import * as XLSX from "xlsx";
import { useDashboard } from "../hook/useDashbord.js";
import { useCRUDStore } from "../../stores/useCRUDStore.js";

const ReportMoreTodoUser = () => {
    const { todos } = useDashboard();
    const todosStoreDelete = useCRUDStore((state) => state.todosStoreDelete);
    const reportTodos = todos?.filter(
        (todo) => !todosStoreDelete.includes(todo.id)
    );

    // Group todos by userId and count completed/notCompleted correctly
    const grouped = reportTodos?.reduce((acc, todo) => {
        const { userId, completed } = todo;
        if (!acc[userId]) {
            acc[userId] = { userId, allTodos: 0, completed: 0, notCompleted: 0 };
        }
        acc[userId].allTodos += 1;
        const isCompleted = completed === true || completed === "true";
        if (isCompleted) acc[userId].completed += 1;
        else acc[userId].notCompleted += 1;
        return acc;
    }, {});

    // Sort by allTodos descending and add index/key
    const sortedData = Object.values(grouped)
        .sort((a, b) => b.allTodos - a.allTodos)
        .map((item, index) => ({ key: index + 1, index: index + 1, ...item }));

    const [searchValue, setSearchValue] = useState(5);
    const [filteredData, setFilteredData] = useState(sortedData.slice(0, searchValue));

    const handleSearch = () => {
        const value = Number(searchValue);
        if (!isNaN(value) && value > 0) {
            setFilteredData(sortedData.slice(0, value));
        }
    };

    const columns = [
        { title: "ລຳດັບ", dataIndex: "index", key: "index" },
        { title: "User ID", dataIndex: "userId", key: "userId" },
        { title: "Todos ທັງໝົດ", dataIndex: "allTodos", key: "allTodos" },
        { title: "Todos ເຮັດສໍາເລັດ", dataIndex: "completed", key: "completed" },
        { title: "Todos ຍັງບໍ່ສໍາເລັດ", dataIndex: "notCompleted", key: "notCompleted" },
    ];

    // Export Excel
    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData.map(({ index, ...rest }) => rest));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        XLSX.writeFile(wb, "todo_report.xlsx");
    };

    return (
        <div className="p-6 space-y-2">
            <p>Uer ທີ່ມີລາຍການ Todo ຫຼາຍສຸດ</p>
            <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                <Input
                    type="number"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter number of users"
                    style={{ width: 200 }}
                />
                <Button type="primary" onClick={handleSearch}>Search</Button>
                <Button onClick={exportExcel}>Export Excel</Button>
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                bordered
                pagination={false}
            />
        </div>
    );
};

export default ReportMoreTodoUser;
