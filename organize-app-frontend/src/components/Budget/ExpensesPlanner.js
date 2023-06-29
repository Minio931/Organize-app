import ExpeseCategoryItem from "./ExpenseCategoryItem";
import classes from "./ExpensesPlanner.module.css";
import { IconEdit, IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import Button from "../UI/Button";

export const ExpensesData = ({ balance, onClick }) => {
  const balanceAmount = balance.budget[0].balance.slice(1).replaceAll(",", "");
  const expensesAmount = balance.budget[0].expenses
    .slice(1)
    .replaceAll(",", "");
  const plannedAmount = balance.budget[0].planned.slice(1).replaceAll(",", "");
  const incomeAmount = balance.budget[0].income.slice(1).replaceAll(",", "");
  const editBalanceHandler = () => {
    onClick({
      type: "expenses",
      title: "Edit Balance",
      request: "PUT",
      balance: {
        balance: balanceAmount,
        expenses: expensesAmount,
        planned: plannedAmount,
        income: incomeAmount,
      },
    });
  };
  return (
    <>
      <div className={classes["container"]}>
        <Button
          onClick={editBalanceHandler}
          className={classes["expenses-edit"]}
        >
          <IconEdit />
        </Button>
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
  const category = categories.budgetCategories
    ? categories.budgetCategories
    : [];
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
              return <ExpensesData balance={balance} onClick={onClick} />;
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
