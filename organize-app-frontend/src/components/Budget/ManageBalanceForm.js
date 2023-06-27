import { json } from "react-router-dom";
import { Form } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./ManageBalanceForm.module.css";

const ManageBalanceForm = ({ type }) => {
  return (
    <Form method="PATCH" className={classes["balance-form"]}>
      <label htmlFor="amount">{type}: </label>
      <input type="number" id="amount" name="amount" />
      <input type="hidden" id="type" name="type" value={type} />
      <Button type="submit">Set</Button>
    </Form>
  );
};

export async function action({ request, params }) {
  const balance = await request.formData();
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const type = balance.get("type");
  console.log(type);
  const data = {
    amount: balance.get("amount"),
    userId,
  };

  const response = await fetch(`http://localhost:3001/budget/${type}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 404) {
    return json({ message: "Balance not found", status: 404 });
  }

  if (!response.ok) {
    return json({ message: "Something went wrong", status: 500 });
  }

  const result = await response.json();

  return result;
}

export default ManageBalanceForm;
