import { Form, json, useLoaderData } from "react-router-dom";
import classes from "./BudgetForm.module.css";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";

const BudgetForm = ({ config, onClose, categories }) => {
  let categoriestList = categories.budgetCategories;
  const navigate = useNavigate();

  let formPayload = config.payload;

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

  formPayload = config.category ? config.category : formPayload;

  const deleteCategoryHandler = () => {
    console.log(formPayload);
    fetch(`http://localhost:3001/budget/category/delete/${formPayload.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Category deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    navigate(0);
  };
  let categoryForm = (
    <>
      {config.request === "PUT" && (
        <Button
          className={classes["delete-icon"]}
          onClick={deleteCategoryHandler}
        >
          <IconTrash />
        </Button>
      )}
      <input type="hidden" name="type" value={config.type} />
      <input
        type="hidden"
        name="id"
        defaultValue={formPayload ? formPayload.id : ""}
      />
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="name">
          Category Name
        </label>
        <input
          className={classes["form-input"]}
          type="text"
          id="name"
          name="name"
          defaultValue={formPayload ? formPayload.name : ""}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="actualStatus">
          Actual Status
        </label>
        <input
          type="number"
          className={classes["form-input"]}
          id="actualStatus"
          name="actualStatus"
          defaultValue={formPayload ? formPayload.expenses : 0}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="planned">
          Planned
        </label>
        <input
          type="number"
          className={classes["form-input"]}
          id="planned"
          name="planned"
          defaultValue={formPayload ? formPayload.planned : 0}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="planned">
          Choose Icon Type:
        </label>
        <select
          name="icon"
          className={classes["select"]}
          defaultValue={formPayload ? formPayload.icon : ""}
        >
          <option value="IconDeviceGamePad">Entertainment</option>
          <option value="IconShoppingCart">Shopping</option>
          <option value="IconActivity">Health &amp; Fitness</option>
          <option value="IconHome2">Home</option>
          <option value="IconCash">Money</option>
          <option value="IconBusStop">Transport</option>
          <option value="IconGift">Gifts</option>
          <option value="IconPizza">Food</option>
        </select>
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="color">
          Choose Color:
        </label>
        <input
          type="color"
          name="color"
          defaultValue={formPayload ? formPayload.color : ""}
          className={classes["color"]}
        />
      </div>
    </>
  );

  formPayload = config.balance ? config.balance : formPayload;

  const expensesForm = (
    <>
      <input type="hidden" name="type" value={config.type} />
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="amount">
          balance
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="amount"
          name="balance"
          defaultValue={formPayload ? formPayload.balance : ""}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="income">
          income
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="income"
          name="income"
          defaultValue={formPayload ? formPayload.income : ""}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="expenses">
          expenses
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="expenses"
          name="expenses"
          defaultValue={formPayload ? formPayload.expenses : ""}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="planned">
          planned
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          id="planned"
          name="planned"
          defaultValue={formPayload ? formPayload.planned : ""}
        />
      </div>
    </>
  );

  formPayload = config.transaction ? config.transaction : formPayload;

  const transactionDeleteHandler = () => {
    fetch(
      `http://localhost:3001/budget//transaction/delete/${formPayload.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Transaction deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    navigate(0);
  };

  let transactionForm = (
    <>
      {config.request === "PUT" && (
        <Button
          className={classes["delete-icon"]}
          onClick={transactionDeleteHandler}
        >
          <IconTrash />
        </Button>
      )}

      <input type="hidden" name="type" value={config.type} />
      <input
        type="hidden"
        name="id"
        defaultValue={formPayload ? formPayload.id : ""}
      />
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="name">
          Transaction Name
        </label>
        <input
          className={classes["form-input"]}
          id="name"
          name="name"
          defaultValue={formPayload ? formPayload.name : ""}
        />
      </div>
      <select name="category" className={classes["select"]}>
        {categoriestList.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="name">
          Status
        </label>
        <select name="status" className={classes["select"]}>
          <option value="incoming">Incoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="amount">
          Amount
        </label>
        <input
          className={classes["form-input"]}
          id="amount"
          name="amount"
          defaultValue={formPayload ? formPayload.amount : 0}
        />
      </div>
      <div className={classes["form-group"]}>
        <label className={classes["form-label"]} htmlFor="date">
          Date
        </label>
        <input
          type="date"
          className={classes["form-input"]}
          id="date"
          name="date"
          defaultValue={formPayload ? new Date(formPayload.date) : ""}
        />
      </div>
    </>
  );

  console.log(config.type);
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
          {config.type === "category" && categoryForm}
          {config.type === "transaction" && transactionForm}
          {config.type === "expenses" && expensesForm}
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
  function refreshPage() {
    window.location.reload(false);
  }
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

    refreshPage();
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
    refreshPage();
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
    refreshPage();
    return result;
  }

  if (type === "category" && request.method === "POST") {
    const category = {
      name: data.get("name"),
      actualStatus: data.get("actualStatus"),
      planned: data.get("planned"),
      icon: data.get("icon"),
      color: data.get("color"),
      userId,
    };

    const response = await fetch(
      "http://localhost:3001/budget/category/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();
    refreshPage();
    return result;
  }

  if (type === "category" && request.method === "PUT") {
    const category = {
      categoryId: parseInt(data.get("id")),
      name: data.get("name"),
      actualStatus: data.get("actualStatus"),
      planned: data.get("planned"),
      icon: data.get("icon"),
      color: data.get("color"),
      userId,
    };

    const response = await fetch("http://localhost:3001/budget/category/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();
    refreshPage();
    return result;
  }

  if (type === "transaction" && request.method === "POST") {
    const transaction = {
      name: data.get("name"),
      value: data.get("amount"),
      transactionDate: data.get("date"),
      status: data.get("status"),
      budgetCategoryId: parseInt(data.get("category")),
      userId,
    };

    console.log(transaction);
    const response = await fetch(
      "http://localhost:3001/budget/transaction/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();
    refreshPage();
    return result;
  }
  if (type === "transaction" && request.method === "PUT") {
    const transaction = {
      transactionId: parseInt(data.get("id")),
      name: data.get("name"),
      value: data.get("amount"),
      transactionDate: data.get("date"),
      status: data.get("status"),
      budgetCategoryId: parseInt(data.get("category")),
      userId,
    };

    const response = await fetch(
      "http://localhost:3001/budget/transaction/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();
    refreshPage();
    return result;
  }
  if (type === "expenses" && request.method === "PUT") {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const expense = {
      userId,
      income: data.get("income"),
      expenses: data.get("expenses"),
      balance: data.get("balance"),
      planned: data.get("planned"),
    };

    const response = await fetch("http://localhost:3001/budget/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    console.log(response);

    if (!response.ok) {
      return json({ message: "Something went wrong", status: 500 });
    }

    const result = await response.json();

    refreshPage();
    return result;
  }
  return json({ message: "Something went wrong", status: 500 });
}

export default BudgetForm;
