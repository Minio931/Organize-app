import { IconCheck, IconX } from '@tabler/icons-react';

import classes from './HabitsList.module.css';

const dateDiffInDays = (date1, date2) => {
   const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
   const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

   return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

const HabitButton = ({ habitId, completionDate, isCompleted, onDoneHabit }) => {
   const config = {
      icon: {
         primary: null,
         secondary: null,
      },
   };

   if (isCompleted) {
      config.icon.primary = <IconCheck />;
      config.icon.secondary = <IconX />;
   } else {
      config.icon.primary = null;
      config.icon.secondary = <IconCheck />;
   }

   const onClick = () => {
      onDoneHabit(habitId, completionDate, isCompleted);
   };

   return (
      <div
         className={isCompleted ? `${classes.habitButton} ${classes.completed}` : classes.habitButton}
         onClick={onClick}
      >
         <div className={classes.primary}>{config.icon.primary}</div>
         <div className={classes.secondary}>{config.icon.secondary}</div>
      </div>
   );
};

const Habit = ({ id, userId, name, goal, startDate, frequency, completedDates, onDoneHabit, onEditHabit, week }) => {
   const days = {
      monday: { date: null, isPossible: null, isCompleted: null },
      tuesday: { date: null, isPossible: null, isCompleted: null },
      wednesday: { date: null, isPossible: null, isCompleted: null },
      thursday: { date: null, isPossible: null, isCompleted: null },
      friday: { date: null, isPossible: null, isCompleted: null },
      saturday: { date: null, isPossible: null, isCompleted: null },
      sunday: { date: null, isPossible: null, isCompleted: null },
   };
   const weekStart = new Date(week.start);
   for (const day in days) {
      days[day].date = new Date(weekStart);
      days[day].isPossible =
         dateDiffInDays(new Date(startDate), days[day].date) >= 0 &&
         dateDiffInDays(new Date(startDate), days[day].date) % frequency === 0;
      days[day].isCompleted = completedDates.find((date) => {
         const dateObj = new Date(date);
         dateObj.setHours(2);
         return dateObj.toISOString().slice(0, 10) === days[day].date.toISOString().slice(0, 10);
      })
         ? true
         : false;
      weekStart.setDate(weekStart.getDate() + 1);
   }
   console.log(name, days);

   const possibleDaysCount = Object.values(days).filter((day) => day.isPossible).length;
   const completedDaysCount = Object.values(days).filter((day) => day.isCompleted).length;

   const editHandler = () => {
      const habit = {
         id,
         userId,
         name,
         goal,
         startDate,
         frequency,
      };
      onEditHabit(habit);
   };

   return (
      <tr>
         <td>
            <div className={classes.habit} onClick={editHandler}>
               <p className={classes['habit--name']}>{name}</p>
               <p className={classes['habit--goal']}>{goal}</p>
            </div>
         </td>
         <td>
            {days.monday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.monday.date}
                  isCompleted={days.monday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            {days.tuesday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.tuesday.date}
                  isCompleted={days.tuesday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            {days.wednesday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.wednesday.date}
                  isCompleted={days.wednesday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            {days.thursday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.thursday.date}
                  isCompleted={days.thursday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            {days.friday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.friday.date}
                  isCompleted={days.friday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            {days.saturday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.saturday.date}
                  isCompleted={days.saturday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            {days.sunday.isPossible && (
               <HabitButton
                  habitId={id}
                  completionDate={days.sunday.date}
                  isCompleted={days.sunday.isCompleted}
                  onDoneHabit={onDoneHabit}
               />
            )}
         </td>
         <td>
            <p className={classes['days']}>
               <span className={classes['days--completed']}>{completedDaysCount}</span>/
               <span className={classes['days--possible']}>{possibleDaysCount}</span>
            </p>
         </td>
      </tr>
   );
};

const HabitsList = ({ habits, onDoneHabit, onEditHabit, week }) => {
   return (
      <table className={classes.habitsTable}>
         <thead>
            <tr>
               <th></th>
               <th>Monday</th>
               <th>Tuesday</th>
               <th>Wednesday</th>
               <th>Thursday</th>
               <th>Friday</th>
               <th>Saturday</th>
               <th>Sunday</th>
               <th></th>
            </tr>
         </thead>
         <tbody>
            {habits.map((habit) => (
               <Habit key={habit.id} {...habit} week={week} onDoneHabit={onDoneHabit} onEditHabit={onEditHabit} />
            ))}
         </tbody>
      </table>
   );
};

export default HabitsList;
