import Arrow from "../../assets/Arrow";
import HabitItem from "./HabitItem";
import classes from "./HabitsView.module.css";

const DUMMY_HABITS = [
  {
    id: "h1",
    name: "Running",
    goal: "3km",
    streak: 100,
    proggress: 60,
  },
  {
    id: "h2",
    name: "Reading",
    goal: "10 pages",
    streak: 50,
    proggress: 30,
  },
  {
    id: "h3",
    name: "Coding",
    goal: "1 hour",
    streak: 200,
    proggress: 100,
  },
];

const HabitsView = () => {
  return (
    <div className={classes["habits-wrapper"]}>
      <h2 className={classes["habits-header"]}>Your Habits</h2>
      <div className={classes["habits-container"]}>
        {DUMMY_HABITS.map((habit) => (
          <HabitItem
            id={habit.id}
            name={habit.name}
            goal={habit.goal}
            streak={habit.streak}
            proggress={habit.proggress}
          />
        ))}
      </div>
      <span className={classes.left}>
        <Arrow className={classes["left-arrow"]} />
      </span>
      <span className={classes.right}>
        <Arrow className={classes["right-arrow"]} />
      </span>
    </div>
  );
};

export default HabitsView;
