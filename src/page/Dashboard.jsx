import React, { useState } from 'react';
import { Input, Button, Image, Card, Pagination, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { userCurrentPage } from '../stores/useCurrentPage.js';
import { userSearchUserId } from '../stores/useSearchUserId.js';
import { useDashboard } from './hook/useDashbord.js';
import { BsDatabaseExclamation } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCRUDStore } from '../stores/useCRUDStore.js';

const Dashboard = () => {
    // Pagination state
    const { currentPage, setCurrentPage } = userCurrentPage();
    const { userId, setUserId } = userSearchUserId();
    const { clearTodos } = useCRUDStore();

    const { currentUsers, isLoading, isError, profileImages, userIds, todos, startIndex, pageSize } = useDashboard();

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

    const handleSearch = () => {
        setUserId(userId);
    };
    const handleRefresh = () => {
        clearTodos()
        setUserId('');
    };

    return (
        <div className='pl-4 pr-4'>
            {/* head */}
            <div className='flex justify-between items-center'>
                {/* search */}
                <div className='flex-1 space-y-2'>
                    <p>ຄົ້ນຫາ User ທີ່ນີ່ :</p>
                    <div className='flex gap-2'>
                        <Input
                            placeholder="ໃສ່ userId..."
                            suffix={<SearchOutlined />}
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <Button type="primary" onClick={handleSearch}>Search</Button>

                    </div>
                    <div className='mt-4 flex items-center justify-center'>
                        <p className='mr-2'>Refresh ເພື່ອຮັບຂໍ້ມູນເດີມຈາກ dummyjson.com API</p>
                        <Button type="primary" onClick={handleRefresh}>Refresh</Button>

                    </div>
                </div>

                {/* image */}
                <div className='w-[200px]'>
                    <Image src="/src/assets/image/​cloud.png" preview={false} alt="Dashboard" />
                </div>
            </div>

            {/* long horizontal line */}
            <hr className="my-2 border-t border-2 border-gray-500" />
            <p>ຈໍານວນ User ທັງໝົດ: {userIds.length}</p>

            {/* Cards */}
            {userIds.length !== 0
                ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4'>
                    {currentUsers.map((userId, index) => {
                        const userTodos = todos.filter(todo => todo.userId === userId);
                        const completedCount = userTodos.filter(todo => todo.completed === true).length;
                        const notCompletedCount = userTodos.filter(todo => todo.completed === false).length;
                        const profileImg = profileImages[(startIndex + index) % profileImages.length];

                        return (
                            <Link
                                to={`/user/${userId}/${profileImg.split('/').pop()}`}>
                                <Card key={userId} className="p-2 shadow-lg hover:bg-gray-100">
                                    <div className="flex flex-col items-center text-[14px]">
                                        <Image src={profileImg} width={50} preview={false} />
                                        <p>UserID: {userId}</p>
                                        <p>Todosທັງໝັດ: {userTodos.length}</p>
                                        <p>ເຮັດສໍາເເລັດ: {completedCount}</p>
                                        <p>ຍັງບໍ່ສໍາເເລັດ: {notCompletedCount}</p>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                : <div className="text-center flex justify-center items-center space-x-4">
                    <p>No users found</p>
                    <BsDatabaseExclamation size={25} />
                </div>}

            {/* Pagination control */}
            <div className="flex justify-center mt-6">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={userIds.length}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Dashboard;
