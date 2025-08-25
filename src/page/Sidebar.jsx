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
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="bg-blue-900 w-full md:w-64 flex flex-col justify-between py-6 md:py-10">
                {/* Top section */}
                <div className="flex md:flex md:flex-col  items-center justify-around md:items-center space-x-4  md:space-y-10">
                    {/* Logo */}
                    <div className="w-[60px] h-[50px] md:w-[100px] md:h-[100px] p-2 ml-2 md:ml-0 bg-white rounded-full flex items-center justify-center">
                        <Image
                            src="/src/assets/icons/logo_todos.png"
                            alt="Logo"
                            preview={false}
                            className="object-contain"
                        />
                    </div>

                    {/* Sidebar menu */}
                    <ul className="flex flex-row md:flex-col w-full justify-center md:justify-start gap-3 md:gap-2">
                        {sidebarList.map((item) => (
                            <li key={item.id} className="w-full">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors w-full ${isActive
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

                {/* Bottom image/button */}
                <div className="w-full px-6 mt-auto hidden md:block">
                    <button className="w-full rounded-lg overflow-hidden focus:outline-none">
                        <Image
                            src="/src/assets/image/tododashbordimage.png"
                            alt="Bottom Button"
                            preview={false}
                            className="object-cover"
                        />
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
