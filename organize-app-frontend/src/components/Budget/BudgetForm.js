import { Form, json, redirect, useActionData } from "react-router-dom";
import classes from "./BudgetForm.module.css";
import Button from "../UI/Button";

const BudgetForm = ({ config, onClose }) => {
  const data = useActionData();
  const formPayload = config.payload;

  let financialGoalForm = (
    <>
      <input type="hidden" name="type" value={config.type} />
      <input
        type="hidden"
        name="id"
        defaultValue={formPayload ? formPayload.id : ""}
      />
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="goal-name">
          Goal Name
        </label>
        <input
          className={classes["form-input"]}
          id="name"
          name="name"
          defaultValue={formPayload ? formPayload.name : ""}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="goal-amount">
          Goal Amount
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="amount"
          name="amount"
          defaultValue={
            formPayload
              ? parseInt(formPayload.goal.slice(1).replaceAll(",", ""))
              : null
          }
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="actual-deposit">
          Actual Deposit
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="deposit"
          name="deposit"
          defaultValue={
            formPayload
              ? parseInt(
                  formPayload.actual_deposit.slice(1).replaceAll(",", "")
                )
              : null
          }
        />
      </div>
    </>
  );

  let balanceForm = (
    <>
      <input type="hidden" name="type" value={config.type} />
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="amount">
          {config.type}:{" "}
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="amount"
          name="amount"
        />
      </div>
    </>
  );

  return (
    <Form method={config.request}>
      <div className={classes["form-wrapper"]}>
        <div className={classes["form-header"]}>
          <h2 className={classes["form-title"]}>{config.title}</h2>
        </div>
        <hr className={classes["form-divider"]} />
        <div className={classes["form-content"]}>
          {config.type === "financialGoal" && financialGoalForm}
          {(config.type === "balance" || config.type === "income") &&
            balanceForm}
          <div className={classes["form-action"]}>
            <Button type="submit">Submit</Button>
            <Button
              className={classes["close-button"]}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export async function action({ request, params }) {
  const data = await request.formData();
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const type = data.get("type");

  if (type === "financialGoal" && request.method === "POST") {
    const financialGoal = {
      name: data.get("name"),
      goal: data.get("amount"),
      actualDeposit: data.get("deposit"),
      userId,
    };

    const response = await fetch(
      "http://localhost:3001/budget/financialGoal/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(financialGoal),
      }
    );

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();

    return result;
  }
  if (type === "financialGoal" && request.method === "PUT") {
    const financialGoal = {
      financialGoalId: parseInt(data.get("id")),
      name: data.get("name"),
      goal: data.get("amount"),
      actualDeposit: data.get("deposit"),
      userId,
    };

    const response = await fetch(
      "http://localhost:3001/budget/financialGoal/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(financialGoal),
      }
    );

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();

    return result;
  }
  if ((type === "balance" || type === "income") && request.method === "PATCH") {
    const balance = {
      amount: data.get("amount"),
      userId,
    };

    const response = await fetch(
      `http://localhost:3001/budget/${type}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(balance),
      }
    );

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();

    return result;
  }
}

export default BudgetForm;
