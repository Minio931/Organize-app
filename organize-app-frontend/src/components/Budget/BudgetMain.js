import { Suspense, useState } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import Modal from "../UI/Modal";
import Wrapper from "../UI/Wrapper";
import BudgetForm from "./BudgetForm";
import classes from "./BudgetMain.module.css";
import CurrentBalance from "./CurrentBalance";
import ExpensesPlanner from "./ExpensesPlanner";
import FinancialGoals from "./FinancialGoals";
import ManageBalanceForm from "./ManageBalanceForm";

const BudgetMain = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isFormShow, setIsFormShown] = useState(false);

  const { balance, financialGoals } = useLoaderData();
  const [formConfig, setFormConfig] = useState({
    type: "",
    title: "",
    request: "",
  });

  const hideFormHandler = () => {
    setIsFormShown(false);
  };

  const showFormHandler = (formConfig) => {
    setIsFormShown(true);
    setFormConfig(formConfig);
  };

  return (
    <Wrapper className={classes.budget}>
      <h1 className={classes.header}>Budget</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={balance}>
          {(balance) => (
            <CurrentBalance
              onClick={showFormHandler}
              balance={balance}
              className={classes["current-balance"]}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={financialGoals}>
          {(financialGoals) => (
            <FinancialGoals
              className={classes["financial-goals"]}
              financialGoals={financialGoals}
              onClick={showFormHandler}
            />
          )}
        </Await>
      </Suspense>

      <ExpensesPlanner className={classes["expenses-planner"]} />
      {isFormShow && (
        <Modal onClose={hideFormHandler}>
          <BudgetForm onClose={hideFormHandler} config={formConfig} />
        </Modal>
      )}
    </Wrapper>
  );
};

export async function loadBudgetData() {
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const response = await fetch("http://localhost:3001/budget/" + userId);

  if (!response.ok) {
    return json({ message: "Something went wrong", status: 500 });
  }

  const responseData = await response.json();

  return responseData;
}

export async function loadFinancialGoalsData() {
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const response = await fetch(
    "http://localhost:3001/budget/financialGoal/" + userId
  );

  if (response.status === 404) {
    return json({ message: "No financial goals found", status: 404 });
  }
  if (!response.ok) {
    return json({ message: "Something went wrong", status: 500 });
  }

  const responseData = await response.json();

  return responseData;
}

export function loader() {
  return defer({
    balance: loadBudgetData(),
    financialGoals: loadFinancialGoalsData(),
  });
}

export default BudgetMain;
