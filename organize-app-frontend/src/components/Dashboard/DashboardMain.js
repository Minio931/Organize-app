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
  const { tasks, todayTasks, habitsData } = useLoaderData();

  return (
    <>
      <Wrapper className={classes.wrapper}>
        <div className={classes["dashboard-body"]}>
          <section>
            <header className={classes.header}>
              <h1 className={classes.welcome}>Welcome </h1>
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
              <Await resolve={todayTasks}>
                {(todayTasks) => <TodoView tasks={todayTasks} />}
              </Await>
            </Suspense>
          </section>
          <section>
            <Suspense
              fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
            >
              <Await resolve={tasks}>
                {(tasks) => <Statistics tasks={tasks} />}
              </Await>
            </Suspense>
          </section>
        </div>
      </Wrapper>
    </>
  );
};

export default DashboardMain;

async function loadTodayTasks() {
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

  const { habits, completionDates } = responseData;
  const today = new Date();
  const todayHabits = habits.filter((habit) => {
    habit.start_date = new Date(habit.start_date);
    const difference = today.getTime() - habit.start_date.getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));
    return days % habit.frequency === 0;
  });
  responseData.habits = todayHabits;

  return responseData;
}

export async function loadTasks() {
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

  const response = await fetch("http://localhost:3001/todo/" + parseUser.id, {
    method: "GET",
  });

  if (response.status === 404) {
    return json({ error: "No tasks found for this user" }, { status: 404 });
  }
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const responseData = await response.json();
  return responseData;
}

export function loader() {
  return defer({
    todayTasks: loadTodayTasks(),
    habitsData: loadHabits(),
    tasks: loadTasks(),
  });
}
