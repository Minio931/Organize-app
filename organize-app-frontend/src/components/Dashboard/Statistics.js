import useMenu from "../../hooks/useMenu";

import classes from "./Statistics.module.css";
import TaskStats from "./TaskStats";

const Statistics = (props) => {
  const { state: activeState, activeHandler } = useMenu([
    "isTasks",
    "isHabits",
    "isBudget",
  ]);

  let tasks = props.tasks;
  if (props.tasks.status === 404) {
    tasks = [];
  }

  const tasksHandler = () => {
    activeHandler("isTasks");
  };
  const habitHandler = () => {
    activeHandler("isHabits");
  };
  const budgetHandler = () => {
    activeHandler("isBudget");
  };

  let todoClass = `${classes["statistics-menu-item"]} `;
  let habitClass = `${classes["statistics-menu-item"]} `;
  let budgetClass = `${classes["statistics-menu-item"]} `;

  if (activeState.isTasks) {
    todoClass = `${classes["statistics-menu-item"]} ${classes["statistics-menu-item-active"]}`;
  }
  if (activeState.isHabits) {
    habitClass = `${classes["statistics-menu-item"]} ${classes["statistics-menu-item-active"]}`;
  }
  if (activeState.isBudget) {
    budgetClass = `${classes["statistics-menu-item"]} ${classes["statistics-menu-item-active"]}`;
  }
  return (
    <div className={classes["statistics-wrapper"]}>
      <h1>Statistics</h1>
      <div className={classes["statistics-container"]}>
        <div className={classes["statistics-menu"]}>
          <ul className={classes["statistics-menu-list"]}>
            <li onClick={tasksHandler} className={todoClass}>
              Tasks
            </li>
            <li onClick={habitHandler} className={habitClass}>
              Habits
            </li>
            <li onClick={budgetHandler} className={budgetClass}>
              Budget
            </li>
          </ul>
        </div>
        <div className={classes["statistics-content"]}>
          {activeState.isTasks && <TaskStats tasks={tasks} />}
          {activeState.isHabits && <h1>Habits</h1>}
          {activeState.isBudget && <h1>Budget</h1>}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
