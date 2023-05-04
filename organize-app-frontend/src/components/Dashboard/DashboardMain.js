import classes from "./DashboardMain.module.css";
import HabitsView from "./HabitsView";
import TodoView from "./TodoView";

const DashboardMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  return (
    <>
      <div className={classes["dashboard-body"]}>
        <section>
          <header className={classes.header}>
            <h1 className={classes.welcome}>Welcome</h1>
            <p className={classes["username-display"]}>{username}</p>
          </header>
          <HabitsView />
        </section>
        <section>
          <TodoView />
        </section>
      </div>
    </>
  );
};

export default DashboardMain;
