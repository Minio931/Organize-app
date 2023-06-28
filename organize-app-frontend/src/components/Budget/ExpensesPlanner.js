import classes from "./ExpensesPlanner.module.css";

const ExpensesPlanner = ({ className }) => {
  const expensesPlannerClasses = `${classes["expenses-planner-wrapper"]} ${className}`;
  return (
    <div className={expensesPlannerClasses}>
      <h3 className={classes["expenses-planner-header"]}>Expenses Planner</h3>
    </div>
  );
};

export default ExpensesPlanner;
