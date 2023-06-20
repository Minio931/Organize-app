import BudgetView from "./BudgetView";
import classes from "./DashboardMain.module.css";
import HabitsView from "./HabitsView";
import Statistics from "./Statistics";
import TodoView from "./TodoView";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import Wrapper from "../UI/Wrapper";

const DashboardMain = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const { tasks, habitsData } = useLoaderData();

  return (
    <Wrapper>
      <div className={classes["dashboard-body"]}>
        <section>
          <header className={classes.header}>
            <h1 className={classes.welcome}>Welcome</h1>
            <p className={classes["username-display"]}>{username}</p>
          </header>
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
          >
            <Await resolve={habitsData}>
              {(habitsData) => <HabitsView habitsData={habitsData} />}
            </Await>
          </Suspense>

          <BudgetView />
        </section>
        <section>
          <Suspense
            fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
          >
            <Await resolve={tasks}>
              {(tasks) => <TodoView tasks={tasks} />}
            </Await>
          </Suspense>
        </section>
        <section>
          <Statistics />
        </section>
      </div>
    </Wrapper>
  );
};

export default DashboardMain;

async function loadTasks() {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const response = await fetch(
    "http://localhost:3001/todo/today/" + parseUser.id,
    {
      method: "GET",
    }
  );

  if (response.status === 404) {
    return json({ error: "No tasks found for this user" }, { status: 404 });
  }
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const responseData = await response.json();
  console.log(responseData, "responseData");
  return responseData;
}

async function loadHabits() {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const response = await fetch("http://localhost:3001/habit/" + parseUser.id, {
    method: "GET",
  });

  if (response.status === 404) {
    return json({ error: "No habits found for this user" }, { status: 404 });
  }
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const responseData = await response.json();

  return responseData;
}

export function loader() {
  return defer({
    tasks: loadTasks(),
    habitsData: loadHabits(),
  });
}
