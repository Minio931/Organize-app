import { useReducer } from "react";
import classes from "./Statistics.module.css";

const Statistics = () => {
  const initialState = {
    isTasks: true,
    isHabits: false,
    isBudget: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "tasks":
        return { isTasks: true, isHabits: false, isBudget: false };
      case "habits":
        return { isTasks: false, isHabits: true, isBudget: false };
      case "budget":
        return { isTasks: false, isHabits: false, isBudget: true };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const tasksHandler = () => {
    dispatch({ type: "tasks" });
  };
  const habitHandler = () => {
    dispatch({ type: "habits" });
  };
  const BudgetHandler = () => {
    dispatch({ type: "budget" });
  };
  let todoClass = `${classes["statistics-menu-item"]} `;
  let habitClass = `${classes["statistics-menu-item"]} `;
  let budgetClass = `${classes["statistics-menu-item"]} `;

  if (state.isTasks) {
    todoClass = `${classes["statistics-menu-item"]} ${classes["statistics-menu-item-active"]}`;
  }
  if (state.isHabits) {
    habitClass = `${classes["statistics-menu-item"]} ${classes["statistics-menu-item-active"]}`;
  }
  if (state.isBudget) {
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
            <li onClick={BudgetHandler} className={budgetClass}>
              Budget
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
