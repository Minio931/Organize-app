import { Link } from "react-router-dom";
import BudgetIcon from "../assets/BudgetIcon";
import HabitIcon from "../assets/HabitIcons";
import HomeIcon from "../assets/HomeIcons";
import LogoutIcon from "../assets/LogoutIcon";
import TasksIcon from "../assets/TasksIcon";
import classes from "./AsideNavigation.module.css";

import useMenu from "../hooks/useMenu";

const AsideNavigation = ({ onClick }) => {
  const { state: activeState, activeHandler } = useMenu([
    "isHome",
    "isHabit",
    "isTask",
    "isBudget",
  ]);

  const homeHandler = () => {
    activeHandler("isHome");
  };
  const habitHandler = () => {
    activeHandler("isHabit");
  };
  const taskHandler = () => {
    activeHandler("isTask");
  };
  const budgetHandler = () => {
    activeHandler("isBudget");
  };

  let homeClass = `${classes["nav-item-icon"]} `;
  let habitClass = `${classes["nav-item-icon"]} `;
  let taskClass = `${classes["nav-item-icon"]} `;
  let budgetClass = `${classes["nav-item-icon"]} `;

  if (activeState.isHome) {
    homeClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  if (activeState.isHabit) {
    habitClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  if (activeState.isTask) {
    taskClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }
  if (activeState.isBudget) {
    budgetClass = `${classes["nav-item-icon"]} ${classes["nav-item-active"]}`;
  }

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
