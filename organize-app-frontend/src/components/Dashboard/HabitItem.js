import ProggressBar from "../UI/ProggressBar";
import classes from "./HabitItem.module.css";
const HabitItem = (props) => {
  const completeTodaysHabitsHandler = (event) => {
    if (event.target.checked) {
      fetch("http://localhost:3001/habit/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habitId: props.id }),
      });
    } else {
      const date = new Date();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const todayDate = `${date.getFullYear()}-${month}-${day}`;
      fetch("http://localhost:3001/habit/deleteComplete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ habitId: props.id, completionDate: todayDate }),
      });
    }
  };

  const styles = props.styles;
  return (
    <div
      className={
        props.render
          ? `${classes["habit-item"]} ${classes["not-show"]}`
          : `${classes["habit-item"]}`
      }
      style={{ ...styles, transition: "all 0.5s ease" }}
    >
      <div className={classes["habit-completion"]}>
        <input
          type="checkbox"
          id={props.id}
          name={props.id}
          onChange={completeTodaysHabitsHandler}
        />
        <label htmlFor={props.id}></label>{" "}
      </div>
      <h2 className={classes["habit-name"]}>{props.name}</h2>
      <p className={classes["habit-goal"]}>Daily goal: {props.goal}</p>
      <div className={classes["habit-streak"]}>
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 79.55 79.8"
          fill="none"
          stroke="#231f20"
          stroke-linecap="round"
          stroke-linejoin=" round"
          stroke-width="4px"
          className={classes["streak-icon"]}
        >
          <path
            className={classes["outer-circle"]}
            class="cls-1"
            d="m44.21,2.25C23.42-.13,4.63,14.8,2.25,35.59s12.55,39.58,33.34,41.96c20.79,2.38,39.58-12.55,41.96-33.34"
          />
          <path
            className={classes["inner-circle"]}
            class="cls-1"
            d="m36.41,70.41c16.85,1.93,32.08-10.17,34.01-27.02S60.25,11.32,43.4,9.39c-16.85-1.93-32.08,10.17-34.01,27.02"
          />
        </svg>
        <span className={classes["habit-streak-count"]}>{props.streak}</span>
        <p className={classes["habit-streak-text"]}>streak</p>
      </div>
      <div className={classes["habit-proggress"]}>
        <div className={classes["proggress"]}>
          <ProggressBar proggress={props.proggress} />
          <span>{props.proggress}%</span>
        </div>
        <p>Monthly proggress</p>
      </div>
    </div>
  );
};

export default HabitItem;
