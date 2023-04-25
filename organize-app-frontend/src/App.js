import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage from "./pages/Login";
import HabitTrackerPage from "./pages/HabitTracker";
import TodoPage from "./pages/Todo";
import BudgetPage from "./pages/Budget";
import RegisterPage from "./pages/Register";
import { action as registerUser } from "./components/RegisterForm";
import { action as loginUser } from "./components/LoginForm";
import DashboardPage from "./pages/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        action: loginUser,
      },
      {
        path: "/habit-tracker",
        element: <HabitTrackerPage />,
      },
      {
        path: "/todo",
        element: <TodoPage />,
      },
      {
        path: "/budget",
        element: <BudgetPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerUser,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
