import classes from "./TodoView.module.css";
import { useState, useRef, useEffect } from "react";
import ProggressBar from "../UI/ProggressBar";
import ResizeIcon from "../../assets/ResizeIcon";
import { parse } from "date-fns";
import { useLoaderData } from "react-router-dom";

const TodoView = () => {
  const [doneTodos, setDoneTodos] = useState([]);
  const [undoneTodos, setUndoneTodos] = useState([]);
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [initialSize2, setInitialSize2] = useState(null);
  const notDoneContainer = useRef(null);
  const doneContainer = useRef(null);
  const data = useLoaderData();
  console.log(data);

  useEffect(() => {
    data.forEach((todo) => {
      if (todo.completed) {
        setDoneTodos((prev) => [...prev, todo]);
      } else {
        setUndoneTodos((prev) => [...prev, todo]);
      }
    });
  }, [data]);
  const onDoneClickHandler = (event) => {
    data.forEach((todo) => {
      if (todo.id === event.target.id) {
        todo.completed = !todo.completed;
        setDoneTodos((prev) => [...prev, todo]);
      }
    });
  };
  const onUndoneClickHandler = (event) => {
    data.forEach((todo) => {
      if (todo.id === event.target.id) {
        todo.completed = !todo.completed;
        setUndoneTodos((prev) => [...prev, todo]);
      }
    });
  };

  const initial = (event) => {
    setInitialPos(event.clientY);
    setInitialSize(notDoneContainer.current.offsetHeight);
    setInitialSize2(doneContainer.current.offsetHeight);
    console.log("initialSize", doneContainer.current.offsetHeight);
  };

  const resize = (event) => {
    notDoneContainer.current.style.height = `${
      parseInt(initialSize) + parseInt(event.clientY - initialPos)
    }px`;

    doneContainer.current.style.height = `${
      parseInt(initialSize2) -
      parseInt(notDoneContainer.current.offsetHeight - initialPos + 148)
    }px`;

    console.log("currentSize", doneContainer.current.offsetHeight);
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
            {undoneTodos.map((todo) => {
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
        </div>
        <div className={classes["todo-divider"]}>
          <div
            onDragStart={initial}
            draggable="true"
            onDrag={resize}
            className={classes["todo-divider-line"]}
          >
            <span className={classes["resize"]}>
              <ResizeIcon />
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
        <div className={classes.proggress}>
          <div className={classes["proggress-bar-wrapper"]}>
            <ProggressBar className={classes.completion} proggress="64" />
            <span>64%</span>
          </div>
          <p>today's proggress</p>
        </div>
      </div>
    </div>
  );
};

export default TodoView;

export async function loader() {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const response = await fetch("http://localhost:3001/todo/" + parseUser.id, {
    method: "GET",
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const responseData = await response.json();
  return responseData;
}
