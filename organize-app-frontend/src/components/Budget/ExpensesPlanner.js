import ExpeseCategoryItem from "./ExpenseCategoryItem";
import classes from "./ExpensesPlanner.module.css";
import { IconPlus, IconShoppingCart } from "@tabler/icons-react";

const ExpensesPlanner = ({ className, onClick, categories }) => {
  const category = categories.budgetCategories;
  const addCategoryHandler = () => {
    onClick({
      type: "category",
      title: "Add Category",
      request: "POST",
    });
  };

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
      {category.map((category) => {
        return (
          <ExpeseCategoryItem
            category={category.name}
            expenses={category.actual_status}
            planned={category.planned}
            icon={category.icon}
            color={category.color ? category.color : "#000"}
          />
        );
      })}

      <div className={classes["add-category"]} onClick={addCategoryHandler}>
        <IconPlus />
      </div>
    </div>
  );
};

export default ExpensesPlanner;
