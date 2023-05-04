import Arrow from "../../assets/Arrow";
import classes from "./TodoView.module.css";
import { useState } from "react";

const DUMMY_TODOS = [
  {
    id: "t1",
    name: "Todo 1",
    completed: false,
  },
  {
    id: "t2",
    name: "Todo 2",
    completed: false,
  },
  {
    id: "t3",
    name: "Todo 3",
    completed: true,
  },
  {
    id: "t4",
    name: "Todo 4",
    completed: false,
  },
  {
    id: "t5",
    name: "Todo 5",
    completed: false,
  },
  {
    id: "t6",
    name: "Todo 6",
    completed: false,
  },
];

const TodoView = () => {
  const [doneTodos, setDoneTodos] = useState([]);
  const [undoneTodos, setUndoneTodos] = useState([]);
  const onDoneClickHandler = (event) => {
    DUMMY_TODOS.forEach((todo) => {
      if (todo.id === event.target.id) {
        todo.completed = !todo.completed;
        setDoneTodos((prev) => [...prev, todo]);
      }
    });
  };
  const onUndoneClickHandler = (event) => {
    DUMMY_TODOS.forEach((todo) => {
      if (todo.id === event.target.id) {
        todo.completed = !todo.completed;
        setUndoneTodos((prev) => [...prev, todo]);
      }
    });
  };
  return (
    <div className={classes["todos-wrapper"]}>
      <header className={classes["todos-header"]}>
        <h2>Today's Todos</h2>
      </header>
      <div className={classes["todo-container"]}>
        <ul className={classes["todos-list-not-done"]}>
          {DUMMY_TODOS.map((todo) => {
            if (todo.completed) return null;
            return (
              <li className={classes["todo-item"]} key={todo.id}>
                <input
                  type="checkbox"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={onDoneClickHandler}
                />
                <label htmlFor={todo.id}></label>
                <p>{todo.name}</p>
              </li>
            );
          })}
        </ul>
        <div className={classes["todo-divider"]}>
          <div className={classes["todo-divider-line"]}></div>
          <span className={classes["not-done-arrow"]}>
            <Arrow />
          </span>
        </div>
        <ul className={classes["todos-list-done"]}>
          {DUMMY_TODOS.map((todo) => {
            if (!todo.completed) return null;
            return (
              <li className={classes["todo-item"]} key={todo.id}>
                <input
                  type="checkbox"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={onUndoneClickHandler}
                />
                <label htmlFor={todo.id}></label>
                <p>{todo.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoView;