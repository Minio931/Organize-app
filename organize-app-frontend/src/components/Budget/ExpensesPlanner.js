import ExpeseCategoryItem from "./ExpenseCategoryItem";
import classes from "./ExpensesPlanner.module.css";
import { IconShoppingCart } from "@tabler/icons-react";

const ExpensesPlanner = ({ className }) => {
  const expensesPlannerClasses = `${classes["expenses-planner-wrapper"]} ${className}`;
  return (
    <div className={expensesPlannerClasses}>
      <h3 className={classes["expenses-planner-header"]}>Planned Expenses</h3>
      <div className={classes["planned-money"]}>
        <div className={classes["container"]}>
          <div className={classes["title"]}>Balance</div>
          <div className={classes["amount"]}>2000zł </div>
        </div>
        <div className={classes["container"]}>
          <div className={classes["title"]}>Expenses</div>
          <div className={classes["amount"]}>3000zł </div>
        </div>
        <div className={classes["container"]}>
          <div className={classes["title"]}>Planned</div>
          <div className={classes["amount"]}> 4000zł</div>
        </div>
      </div>
      <ExpeseCategoryItem
        category={"Shopping"}
        expenses="2000"
        planned="3000"
        icon={<IconShoppingCart className="category-icon" />}
        color="#FFB800"
      />
    </div>
  );
};

export default ExpensesPlanner;
