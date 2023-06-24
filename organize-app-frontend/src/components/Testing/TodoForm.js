import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";

const TodoForm = () => {
  return (
    <div>
      <Form
        method="PUT"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "12rem",
          gap: "1rem",
        }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" />

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export async function action({ request, params }) {
  const todo = await request.formData();
  const data = {
    id: 20,
    name: todo.get("name"),
    description: todo.get("description"),
    startDate: todo.get("date"),
    frequency: 1,
    goal: "3km",
  };

  const response = await fetch("http://localhost:3001/habit/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
}

export default TodoForm;
