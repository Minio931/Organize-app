import Arrow from "../../assets/Arrow";
import HabitItem from "./HabitItem";
import classes from "./HabitsView.module.css";
import { useState, useEffect } from "react";

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
  {
    id: "h4",
    name: "Meditation",
    goal: "10 minutes",
    streak: 10,
    proggress: 10,
  },
  {
    id: "h5",
    name: "Gym",
    goal: "1 hour",
    streak: 100,
    proggress: 60,
  },
  {
    id: "h6",
    name: "Running",
    goal: "3km",
    streak: 100,
    proggress: 60,
  },
];

const HabitsView = ({ habits }) => {
  console.log(habits, "habits");
  const [habitOnMiddle, setHabitOnMiddle] = useState(1);
  const [visibleHabitsProps, setVisibleHabitsProps] = useState({
    order: [],
    styles: {},
  });

  const totalHabits = habits.length;
  const habitWidth = 14 + 4; // 14rem + 2rem padding on each side
  const habitHeight = 18 / 3;

  const visibleHabitsPropsConstructor = () => {
    const visibleHabits = {};
    visibleHabits.order = [];

    let habitOnTheLeft = habitOnMiddle - 1;
    let habitOnTheRight = habitOnMiddle + 1;

    let isHabitOnTheLeft = true;
    let isHabitOnTheRight = true;
    let isHabitOnTheMiddle = true;

    for (let i = 0; i <= totalHabits - 1; i++) {
      const styles = {};

      let xTranslate = habitWidth;
      let yTranslate = -habitHeight;
      let opacity = 0.5;
      let zIndex = -habitOnMiddle;
      if (habitOnTheLeft >= 0 && isHabitOnTheLeft && i === habitOnTheLeft) {
        styles.transform = `translate(${-xTranslate}rem, ${yTranslate}rem)`;
        styles.opacity = opacity;
        styles.zIndex = zIndex;
        visibleHabits.order.push(habitOnTheLeft);
        visibleHabits[habitOnTheLeft] = { styles };
        isHabitOnTheLeft = false;
      } else if (
        habitOnTheRight < totalHabits &&
        isHabitOnTheRight &&
        i === habitOnTheRight
      ) {
        styles.transform = `translate(${xTranslate / 4}rem, ${yTranslate}rem)`;
        styles.opacity = opacity;
        styles.zIndex = zIndex;
        visibleHabits.order.push(habitOnTheRight);
        visibleHabits[habitOnTheRight] = { styles };
        isHabitOnTheRight = false;
      } else if (isHabitOnTheMiddle && i === habitOnMiddle) {
        visibleHabits.order.push(habitOnMiddle);
        isHabitOnTheMiddle = false;
      } else if (i < habitOnTheLeft && i !== habitOnMiddle) {
        xTranslate = -habitWidth * 2;
        styles.transform = `translate(${xTranslate}rem, ${yTranslate}rem)`;
        opacity = opacity / 2;
        zIndex = zIndex - 1;
        styles.opacity = opacity;
        styles.zIndex = zIndex;
        visibleHabits[i] = { styles };
      } else if (i > habitOnTheRight && i !== habitOnMiddle) {
        xTranslate = habitWidth * 2;
        styles.transform = `translate(${xTranslate / 4}rem, ${yTranslate}rem)`;
        opacity = opacity / 2 - 0.2;
        zIndex = zIndex - 1;
        styles.opacity = opacity;
        styles.zIndex = zIndex;
        visibleHabits[i] = { styles };
      }

      setVisibleHabitsProps(visibleHabits);
    }
  };

  useEffect(() => {
    visibleHabitsPropsConstructor();
  }, [habitOnMiddle]);

  const handleLeftArrowClick = () => {
    if (habitOnMiddle > 0) {
      setHabitOnMiddle((prev) => prev - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (habitOnMiddle < totalHabits - 1) {
      setHabitOnMiddle((prev) => prev + 1);
    }
  };

  return (
    <div className={classes["habits-wrapper"]}>
      <h2 className={classes["habits-header"]}>Your Habits</h2>
      <div className={classes["habits-container"]}>
        {habits.map((habit, index) => {
          const dontRender = visibleHabitsProps.order.indexOf(index) === -1;
          const styles = visibleHabitsProps[index]
            ? visibleHabitsProps[index].styles
            : {};
          return (
            <HabitItem
              key={habit.id}
              id={habit.id}
              name={habit.name}
              goal={habit.goal}
              streak="100"
              proggress="60"
              render={dontRender}
              styles={styles}
            />
          );
        })}
      </div>
      <span className={classes.left} onClick={handleLeftArrowClick}>
        <Arrow className={classes["left-arrow"]} />
      </span>
      <span className={classes.right} onClick={handleRightArrowClick}>
        <Arrow className={classes["right-arrow"]} />
      </span>
    </div>
  );
};

export default HabitsView;
