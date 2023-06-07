import Arrow from "../../assets/Arrow";
import HabitItem from "./HabitItem";
import classes from "./HabitsView.module.css";
import { useState, useEffect } from "react";

const HabitsView = ({ habitsData }) => {
  const { habits, completionDates } = habitsData;

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  ).getDate();
  const habitStats = {};
  for (let i = 0; i <= habits.length - 1; i++) {
    let completionDatesForHabit = completionDates.filter((item) => {
      let date = new Date(item.completion_date);

      if (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear() &&
        parseInt(item.habit_id) === habits[i].id
      ) {
        return item;
      }
    });

    let streak = () => {
      let streak = 0;
      for (let i = 0; i <= completionDatesForHabit.length - 2; i++) {
        let date = new Date(completionDatesForHabit[i].completion_date);
        let nextDate = new Date(completionDatesForHabit[i + 1].completion_date);

        let difference = date.getDate() - nextDate.getDate();
        console.log(difference);
        if (difference === parseInt(habits[i].frequency)) {
          streak += 1;
        } else {
          streak = 0;
        }
      }
      return streak;
    };

    habitStats[habits[i].name] = {
      monthlyProggress: Math.round(
        (completionDatesForHabit.length /
          Math.floor(daysInMonth / parseInt(habits[i].frequency))) *
          100
      ),
      streak: streak(),
    };
  }
  console.log(habitStats);

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
              streak={habitStats[habit.name].streak}
              proggress={habitStats[habit.name].monthlyProggress}
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
