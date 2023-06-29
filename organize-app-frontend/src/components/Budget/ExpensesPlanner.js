import ExpeseCategoryItem from "./ExpenseCategoryItem";
import classes from "./ExpensesPlanner.module.css";
import { IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { Suspense } from "react";
import { Await } from "react-router-dom";

export const ExpensesData = ({ balance }) => {
  const balanceAmount = balance.budget[0].balance.slice(1).replaceAll(",", "");
  const expensesAmount = balance.budget[0].expenses
    .slice(1)
    .replaceAll(",", "");
  const plannedAmount = balance.budget[0].planned.slice(1).replaceAll(",", "");
  return (
    <>
      <div className={classes["container"]}>
        <div className={classes["title"]}>Balance</div>
        <div className={classes["amount"]}>{balanceAmount}zł </div>
      </div>
      <div className={classes["container"]}>
        <div className={classes["title"]}>Expenses</div>
        <div className={classes["amount"]}>{expensesAmount}zł </div>
      </div>
      <div className={classes["container"]}>
        <div className={classes["title"]}>Planned</div>
        <div className={classes["amount"]}>{plannedAmount}zł</div>
      </div>
    </>
  );
};

const ExpensesPlanner = ({ className, onClick, categories, balance }) => {
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
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={balance}>
            {(balance) => {
              return <ExpensesData balance={balance} />;
            }}
          </Await>
        </Suspense>
      </div>
      {category.map((category) => {
        return (
          <ExpeseCategoryItem
            key={category.id}
            id={category.id}
            category={category.name}
            expenses={category.actual_status}
            planned={category.planned}
            icon={category.icon}
            color={category.color ? category.color : "#000"}
            EditCategoryHandler={onClick}
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
