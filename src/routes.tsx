import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/app/dashboard/Dashboard";
import SignIn from "./pages/auth/Sign-in";
import SignUp from "./pages/auth/Sign-up";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);
