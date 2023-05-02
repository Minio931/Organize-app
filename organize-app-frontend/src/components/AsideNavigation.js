import { Link } from "react-router-dom";
import BudgetIcon from "../assets/BudgetIcon";
import HabitIcon from "../assets/HabitIcons";
import HomeIcon from "../assets/HomeIcons";
import LogoutIcon from "../assets/LogoutIcon";
import TasksIcon from "../assets/TasksIcon";
import classes from "./AsideNavigation.module.css";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AsideNavigation = ({ onClick }) => {
  const initialState = {
    isHome: true,
    isHabit: false,
    isTask: false,
    isBudget: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "home":
        return { isHome: true, isHabit: false, isTask: false, isBudget: false };
      case "habit":
        return { isHome: false, isHabit: true, isTask: false, isBudget: false };
      case "task":
        return { isHome: false, isHabit: false, isTask: true, isBudget: false };
      case "budget":
        return { isHome: false, isHabit: false, isTask: false, isBudget: true };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const homeHandler = () => {
    dispatch({ type: "home" });
  };
  const habitHandler = () => {
    dispatch({ type: "habit" });
  };
  const taskHandler = () => {
    dispatch({ type: "task" });
  };
  const budgetHandler = () => {
    dispatch({ type: "budget" });
  };

  let homeClass = `${classes["nav-item-icon"]} `;
  let habitClass = `${classes["nav-item-icon"]} `;
  let taskClass = `${classes["nav-item-icon"]} `;
  let budgetClass = `${classes["nav-item-icon"]} `;

  if (state.isHome) {
    homeClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  if (state.isHabit) {
    habitClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  if (state.isTask) {
    taskClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  if (state.isBudget) {
    budgetClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  const navigate = useNavigate();

  return (
    <aside className={classes["nav_wrapper"]}>
      <nav className={classes["nav"]}>
        <ul className={classes["nav-list"]}>
          <div className={classes["nav-main"]}>
            <li onClick={homeHandler} className={classes["nav-item"]}>
              <Link
                className={classes["nav-link"]}
                to="/organize-app/dashboard"
              >
                <HomeIcon className={homeClass} />
              </Link>
            </li>
            <li onClick={habitHandler} className={classes["nav-item"]}>
              <Link
                className={classes["nav-link"]}
                to="/organize-app/habit-tracker"
              >
                <HabitIcon className={habitClass} />
              </Link>
            </li>
            <li onClick={taskHandler} className={classes["nav-item"]}>
              <Link className={classes["nav-link"]} to="/organize-app/todo">
                <TasksIcon className={taskClass} />
              </Link>
            </li>
            <li onClick={budgetHandler} className={classes["nav-item"]}>
              <Link className={classes["nav-link"]} to="/organize-app/budget">
                <BudgetIcon className={budgetClass} />
              </Link>
            </li>
          </div>
          <div className={classes["nav-action"]}>
            <li className={classes["nav-item"]}>
              <button onClick={onClick}>
                <LogoutIcon className={classes["nav-item-icon"]} />
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default AsideNavigation;
