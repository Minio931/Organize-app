import HabitItem from "./HabitItem";
import classes from "./HabitsView.module.css";

const HabitsView = () => {
  return (
    <div className={classes["habits-wrapper"]}>
      <h2 className={classes["habits-header"]}>Your Habits</h2>
      <div className={classes["habits-container"]}>
        <HabitItem />
      </div>
    </div>
  );
};

export default HabitsView;
