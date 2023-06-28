import classes from "./FinancialGoals.module.css";
import { IconDotsVertical } from "@tabler/icons-react";
import ProgressBar from "../UI/ProgressBar";

export const FinancialGoalItem = ({ title, current, goal }) => {
  return (
    <div className={classes["financial-goal-item-wrapper"]}>
      <div className={classes["financial-goal-item-header"]}>
        <div className={classes["financial-goal-item-title"]}>New Car</div>
        <div className={classes["goal-wrapper"]}>
          <span className={classes["current"]}>100 000zł</span>
          <span className={classes["divider"]}> of </span>
          <span className={classes["goal"]}>200 000zł</span>
        </div>
      </div>
      <ProgressBar fillPercent={50} className={classes["progress-bar"]} />
    </div>
  );
};

const FinancialGoals = ({ className, financialGoals }) => {
  const financialGoalsClasses = `${classes["financial-goals-wrapper"]} ${className}`;

  return (
    <div className={financialGoalsClasses}>
      <div className={classes["header-wrapper"]}>
        <h3 className={classes["financial-goals-header"]}>Financial Goals</h3>
        <IconDotsVertical className={classes["financial-goals-icon"]} />
      </div>
      <div className={classes["financial-goals-container"]}>
        <FinancialGoalItem className={classes["financial-goal-item"]} />
      </div>
    </div>
  );
};

export default FinancialGoals;
