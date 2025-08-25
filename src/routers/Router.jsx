import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../page/Dashboard.jsx";
import Sidebar from "../page/Sidebar.jsx";
import Report from "../page/Report.jsx";
import ViewUserTodos from "../page/usertodos/ViewUserTodos.jsx";

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
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;
};