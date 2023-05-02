import ProggressBar from "../UI/ProggressBar";
import classes from "./HabitItem.module.css";
const HabitItem = () => {
  return (
    <div className={classes["habit-item"]}>
      <div className={classes["habit-completion"]}>
        <input type="checkbox" id="completion" name="completion" />
        <label htmlFor="completion"></label>{" "}
      </div>
      <h2 className={classes["habit-name"]}>Running</h2>
      <p className={classes["habit-goal"]}>Daily goal: 3km</p>
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
        <span className={classes["habit-streak-count"]}>100</span>
        <p className={classes["habit-streak-text"]}>streak</p>
      </div>
      <div className={classes["habit-proggress"]}>
        <div className={classes["proggress"]}>
          <ProggressBar />
          <span>60%</span>
        </div>
        <p>Monthly proggress</p>
      </div>
    </div>
  );
};

export default HabitItem;
