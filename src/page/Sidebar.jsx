import { Image } from "antd";
import React from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import { Outlet, NavLink } from "react-router-dom";

const Sidebar = () => {
    const sidebarList = [
        {
            id: 1,
            title: "Dashboard",
            icon: <IoHomeOutline className="text-xl" />,
            path: "/",
        },
        {
            id: 2,
            title: "Report",
            icon: <HiOutlineDocumentReport className="text-xl" />,
            path: "/report",
        },
    ];

    return (
        <div className="flex ">
            {/* Sidebar */}
            <div className="bg-blue-900 w-64 min-h-screen flex flex-col justify-between py-10">
                {/* Top section */}
                <div className="flex flex-col items-center space-y-10">
                    {/* Logo */}
                    <div className="w-[100px] h-[100px] p-2 bg-white rounded-full">
                        <Image
                            src="/src/assets/icons/logo_todos.png"
                            alt="Logo"
                            preview={false}
                        />
                    </div>

                    {/* Sidebar menu */}
                    <ul className="w-full">
                        {sidebarList.map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-6 py-3 cursor-pointer rounded-lg transition-colors ${
                                            isActive
                                                ? "bg-gradient-to-r from-white to-blue-900 text-blue-800"
                                                : "text-white hover:bg-gray-700"
                                        }`
                                    }
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom image as button */}
                <div className="w-full px-6">
                    <button className="w-full rounded-lg overflow-hidden focus:outline-none">
                        <Image
                            src="/src/assets/image/tododashbordimage.png"
                            alt="Bottom Button"
                            preview={false}
                        />
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
