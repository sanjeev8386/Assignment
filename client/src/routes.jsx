import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./views/Home/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";

export const LoggedInRouter = () =>
    useRoutes([
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                { path: "home", element: <Dashboard /> },
            ]
        },
        { path: "*", element: <Navigate to="/dashboard/home" replace /> }
    ])

export const LoggedOutRouter = () =>
    useRoutes([
        {
            path: "/",
            children: [
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: '/', element: <Navigate to="/login" /> },
            ]
        },
        { path: "*", element: <Navigate to="/login" replace /> },
    ]);