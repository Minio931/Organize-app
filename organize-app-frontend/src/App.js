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
// import { loader as loadTodos } from "./components/Dashboard/TodoView";
import { loader as dashboardLoaders } from "./components/Dashboard/DashboardMain";
import DashboardPage from "./pages/Dashboard";
import "chartjs-adapter-date-fns";
import ErrorPage from "./pages/Error";

const Router = createBrowserRouter([
  {
    path: "/",
    action: loginUser,
    children: [
      {
        index: true,
        element: <LoginPage />,

        action: loginUser,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerUser,
      },
      {
        path: "organize-app",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
            loader: dashboardLoaders,
          },
          {
            path: "habit-tracker",
            element: <HabitTrackerPage />,
          },
          {
            path: "todo",
            element: <TodoPage />,
          },
          {
            path: "budget",
            element: <BudgetPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
