import classes from "./TodoView.module.css";
import { useState, useRef, useEffect } from "react";
import ProggressBar from "../UI/ProggressBar";
import { IconArrowsMoveVertical } from "@tabler/icons-react";

const TodoView = ({ tasks }) => {
  const [doneTodos, setDoneTodos] = useState([]);
  const [undoneTodos, setUndoneTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [tasksProgress, setTasksProgress] = useState(0);
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [initialSize2, setInitialSize2] = useState(null);
  const notDoneContainer = useRef(null);
  const doneContainer = useRef(null);

  const loadTodos = () => {
    const notDoneTodos = [];
    const doneTodos = [];

    todos.forEach((todo) => {
      if (todo.completion) {
        doneTodos.push(todo);
      } else {
        notDoneTodos.push(todo);
      }
    });
    setDoneTodos(doneTodos);
    setUndoneTodos(notDoneTodos);
  };

  useEffect(() => {
    if (tasks.status === 404) {
      return;
    }
    setTodos(tasks);
    const progress = Math.round((doneTodos.length / todos.length) * 100);
    setTasksProgress(progress);
  });

  useEffect(() => {
    loadTodos();
  }, [todos]);

  const onClickHandler = async (event) => {
    const todoId = parseInt(event.target.id);

    const completion = event.target.checked;
    const todo = { id: todoId, completion };

    const response = await fetch("http://localhost:3001/todo/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      const previosTodos = [...todos];

      previosTodos.forEach((todoItem) => {
        if (todoItem.id === todoId) {
          todoItem.completion = completion;
        }
      });
      setTodos(previosTodos);
    }
  };

  const initial = (event) => {
    setInitialPos(event.clientY);
    setInitialSize(notDoneContainer.current.offsetHeight);
    setInitialSize2(doneContainer.current.offsetHeight);
  };

  const resize = (event) => {
    notDoneContainer.current.style.height = `${
      parseInt(initialSize) + parseInt(event.clientY - initialPos)
    }px`;

    doneContainer.current.style.height = `${
      parseInt(initialSize2) -
      parseInt(notDoneContainer.current.offsetHeight - initialPos + 148)
    }px`;
  };
  return (
    <div className={classes["todos-wrapper"]}>
      <header className={classes["todos-header"]}>
        <h2>Today's Todos</h2>
      </header>
      <div className={classes["todo-container"]}>
        <div
          ref={notDoneContainer}
          className={classes["not-done-container"]}
          onDragStart={initial}
        >
          <ul className={classes["todos-list-not-done"]}>
            {todos.length === 0 && (
              <li className={classes["empty-todo"]}>No todos for today</li>
            )}
            {undoneTodos.map((todo) => {
              return (
                <li className={classes["todo-item"]} key={todo.id}>
                  <input
                    type="checkbox"
                    id={todo.id}
                    onChange={onClickHandler}
                    checked={todo.completion}
                  />
                  <label htmlFor={todo.id}></label>
                  <p>{todo.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes["todo-divider"]}>
          <div
            onDragStart={initial}
            draggable="true"
            onDrag={resize}
            className={classes["todo-divider-line"]}
          >
            <span className={classes["resize"]}>
              <IconArrowsMoveVertical />
            </span>
          </div>
        </div>
        <div ref={doneContainer} className={classes["done-container"]}>
          <ul className={classes["todos-list-done"]}>
            {doneTodos.map((todo) => {
              return (
                <li className={classes["todo-item"]} key={todo.id}>
                  <input
                    type="checkbox"
                    id={todo.id}
                    checked={todo.completion}
                    onChange={onClickHandler}
                  />
                  <label htmlFor={todo.id}></label>
                  <p>{todo.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.proggress}>
          <div className={classes["proggress-bar-wrapper"]}>
            <ProggressBar
              className={classes.completion}
              proggress={tasksProgress}
            />
            <span>{tasksProgress}%</span>
          </div>
          <p>today's proggress</p>
        </div>
      </div>
    </div>
  );
};

export default TodoView;
