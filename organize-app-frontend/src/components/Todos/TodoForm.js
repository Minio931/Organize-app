import { Form } from "react-router-dom";
import classes from "./TodoForm.module.css";
import { json } from "react-router-dom";
import { useActionData } from "react-router-dom";

const TodoForm = () => {
  const data = useActionData();
  console.log(data);

  return (
    <Form method="POST" className={classes["todo-form"]}>
      <label htmlFor="todo">Todo</label>
      <input type="text" id="todo" name="todo" required />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" required />
      <label htmlFor="date">Date</label>
      <input type="date" id="date" name="date" required />
      <button type="submit">Add</button>
    </Form>
  );
};

export default TodoForm;

export async function action({ request, params }) {
  const todo = await request.formData();
  const userId = JSON.parse(localStorage.getItem("user")).id;

  console.log(userId);
  const data = {
    userId: userId,
    name: todo.get("todo"),
    description: todo.get("description"),
    executionDate: todo.get("date"),
    creationDate: new Date(),
  };
  const response = await fetch("http://localhost:3001/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response, "response");
  if (!response.ok) {
    return json({ error: "Something went wrong" }, { status: 500 });
  }
  if (response.status === 200) {
    return json({ message: "Todo created" }, { status: 200 });
  }
}
