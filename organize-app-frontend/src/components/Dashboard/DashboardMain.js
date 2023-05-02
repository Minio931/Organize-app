import classes from "./DashboardMain.module.css";
import HabitsView from "./HabitsView";

const DashboardMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  return (
    <section>
      <header className={classes.header}>
        <h1 className={classes.welcome}>Welcome</h1>
        <p className={classes["username-display"]}>{username}</p>
      </header>
      <HabitsView />
    </section>
  );
};

export default DashboardMain;
