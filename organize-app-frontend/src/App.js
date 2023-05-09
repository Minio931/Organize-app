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
import "chartjs-adapter-date-fns";

export const options = {
  tension: 0.4,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
    },
    y: {
      beginAtZero: true,
      fontColor: "rgba(0,0,0,0.5)",
      fontStyle: "bold",
      beginAtZero: true,
      maxTicksLimit: 5,
      padding: 10,

      gridLines: {
        drawTicks: false,
        display: false,
      },
    },
  },
};

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
        children: [
          {
            path: "dashboard",
            element: <DashboardPage options={options} />,
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
