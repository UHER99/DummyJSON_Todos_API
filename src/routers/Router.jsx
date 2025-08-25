import { createHashRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../page/Dashboard.jsx";
import Sidebar from "../page/Sidebar.jsx";
import ViewUserTodos from "../page/usertodos/ViewUserTodos.jsx";
import Report from "../page/reports/Report.jsx";

const routes = [
    {
        path: "/",
        element: <Sidebar />,
        children: [
            { index: true, element: <Dashboard />, },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "report",
                element: <Report />
            },
            {
                path: "/user/:id/:profileImg",
                element: <ViewUserTodos />
            }
        ]
    },
];

export const RouterComponent = () => {
    const router = createHashRouter(routes); // ✅ change here
    return <RouterProvider router={router} />;
};