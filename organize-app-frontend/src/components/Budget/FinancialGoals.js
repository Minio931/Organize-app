import classes from "./FinancialGoals.module.css";
import { IconDotsVertical } from "@tabler/icons-react";
import ProgressBar from "../UI/ProgressBar";
import { useState } from "react";

export const FinancialGoalItem = ({ title, current, goal }) => {
  const progress =
    (parseInt(current.slice(1).replaceAll(",", "")) /
      parseInt(goal.slice(1).replaceAll(",", ""))) *
    100;

  return (
    <div className={classes["financial-goal-item-wrapper"]}>
      <div className={classes["financial-goal-item-header"]}>
        <div className={classes["financial-goal-item-title"]}>{title}</div>
        <div className={classes["goal-wrapper"]}>
          <span className={classes["current"]}>{current.slice(1)}zł</span>
          <span className={classes["divider"]}> of </span>
          <span className={classes["goal"]}>{goal.slice(1)}zł</span>
        </div>
      </div>
      <ProgressBar fillPercent={progress} className={classes["progress-bar"]} />
    </div>
  );
};

export const FinancialMenuOptions = ({ onClick }) => {
  const addClickHandler = () => {
    onClick();
  };

  const editClickHandler = () => {
    onClick();
  };
  return (
    <div className={classes["financial-menu-options-wrapper"]}>
      <div
        className={classes["financial-menu-option"]}
        onClick={addClickHandler}
      >
        Add
      </div>
      <div className={classes["divider-options"]}></div>
      <div
        className={classes["financial-menu-option"]}
        onClick={editClickHandler}
      >
        Edit
      </div>
    </div>
  );
};

const FinancialGoals = ({ className, financialGoals, onClick }) => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const financialGoalsClasses = `${classes["financial-goals-wrapper"]} ${className}`;

  const financialGoalsList = financialGoals.financialGoals;

  const menuClickHandler = () => {
    setIsMenuShown((prevState) => !prevState);
  };
  //clicking outside of menu closes it
  window.onclick = (event) => {
    if (!event.target.matches(`.${classes["financial-goals-icon"]}`)) {
      setIsMenuShown(false);
    }
  };

  return (
    <div className={financialGoalsClasses}>
      {isMenuShown && <FinancialMenuOptions onClick={onClick} />}
      <div className={classes["header-wrapper"]}>
        <h3 className={classes["financial-goals-header"]}>Financial Goals</h3>
        <IconDotsVertical
          className={classes["financial-goals-icon"]}
          onClick={menuClickHandler}
        />
      </div>
      <div className={classes["financial-goals-container"]}>
        {financialGoalsList.map((financialGoal) => (
          <FinancialGoalItem
            className={classes["financial-goal-item"]}
            key={financialGoal.id}
            id={financialGoal.id}
            title={financialGoal.name}
            current={financialGoal.actual_deposit}
            goal={financialGoal.goal}
          />
        ))}
      </div>
    </div>
  );
};

export default FinancialGoals;
