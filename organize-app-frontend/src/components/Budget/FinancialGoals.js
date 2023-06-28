import classes from "./FinancialGoals.module.css";
import { IconDotsVertical } from "@tabler/icons-react";

const FinancialGoals = ({ className }) => {
  const financialGoalsClasses = `${classes["financial-goals-wrapper"]} ${className}`;

  return (
    <div className={financialGoalsClasses}>
      <div className={classes["header-wrapper"]}>
        <h3 className={classes["financial-goals-header"]}>Financial Goals</h3>
        <IconDotsVertical className={classes["financial-goals-icon"]} />
      </div>
    </div>
  );
};

export default FinancialGoals;
