import { useEffect, useReducer, useState, useMemo } from 'react';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import Navigation from './Navigation';
import HabitProgressBar from './HabitProgressBar';
import Divider from '../UI/Divider';
import HabitModal from './HabitModal';
import HabitsList from './HabitsList';

const getWeek = (date) => {
   const today = new Date(date);
   const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
   start.setHours(2);
   const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
   end.setHours(2);
   return { start, end };
};

const weekInitialState = {
   ...getWeek(new Date()),
};

const weekReducer = (state, action) => {
   switch (action.type) {
      case 'PREV': {
         const prevWeek = {
            start: new Date(state.start.getFullYear(), state.start.getMonth(), state.start.getDate() - 7, 2),
            end: new Date(state.end.getFullYear(), state.end.getMonth(), state.end.getDate() - 7, 2),
         };
         return prevWeek;
      }
      case 'NEXT': {
         const nextWeek = {
            start: new Date(state.start.getFullYear(), state.start.getMonth(), state.start.getDate() + 7, 2),
            end: new Date(state.end.getFullYear(), state.end.getMonth(), state.end.getDate() + 7, 2),
         };
         return nextWeek;
      }
      case 'CURRENT': {
         const nextWeek = getWeek(new Date());
         return nextWeek;
      }
      default:
         throw new Error('Should not get there!');
   }
};

const habitModalsVisibilityInitialState = {
   add: false,
   edit: false,
};

const habitModalsVisibilityReducer = (state, action) => {
   switch (action.type) {
      case 'ADD':
         return { add: true, edit: false };
      case 'EDIT':
         return { add: false, edit: true };
      case 'CLOSE': {
         return { add: false, edit: false };
      }
      default:
         throw new Error('Should not get there!');
   }
};

const getHabitsForWeek = (habits, completionDates, week, type) => {
   const weekHabits = habits.filter((habit) => habit.startDate <= week.end);
   const newWeekHabits = weekHabits.map((habit) => {
      return {
         ...habit,
         completedDates: [],
      };
   });
   const weekCompletedTasks = completionDates.filter((date) => {
      const completionDate = new Date(date.completionDate);
      completionDate.setHours(2);
      return completionDate >= week.start && completionDate <= week.end;
   });
   weekCompletedTasks.forEach((date) => {
      const habitIndex = newWeekHabits.findIndex((habit) => habit.id === date.habitId);
      if (habitIndex !== -1) {
         newWeekHabits[habitIndex].completedDates.push(date.completionDate);
      }
   });
   return newWeekHabits;
};

const dateDiffInDays = (date1, date2) => {
   const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
   const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

   return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

const getFillPercent = (habits, week, type) => {
   console.log(habits);
   let completedDays = 0;
   let possibleDays = 0;
   habits.forEach((habit) => {
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
         if (type === 'current' && habit.name === 'test') {
            console.log('1', dateDiffInDays(new Date(habit.startDate), days[day].date));
            console.log('2', dateDiffInDays(new Date(week.start), days[day].date));
         }
         days[day].isPossible =
            dateDiffInDays(new Date(habit.startDate), days[day].date) >= 0 &&
            dateDiffInDays(new Date(habit.startDate), days[day].date) % habit.frequency === 0;
         days[day].isCompleted = habit.completedDates.find((date) => {
            const dateObj = new Date(date);
            dateObj.setHours(2);
            return dateObj.toISOString().slice(0, 10) === days[day].date.toISOString().slice(0, 10);
         })
            ? true
            : false;
         weekStart.setDate(weekStart.getDate() + 1);
      }
      if (type === 'current' && habit.name === 'test') console.log(days);
      completedDays += Object.values(days).filter((day) => day.isCompleted).length;
      possibleDays += Object.values(days).filter((day) => day.isPossible).length;
   });
   if (type === 'current') {
      console.log(`${type}-completedDays-${completedDays}}`);
      console.log(`${type}-possibleDays-${possibleDays}}`);
   }
   if (possibleDays === 0) return 0;
   else return Math.round((completedDays / possibleDays) * 100);
};

class Data {
   constructor() {
      this.userId = JSON.parse(localStorage.getItem('user')).id;
      this.url = 'http://localhost:3001/habit';
   }

   async get() {
      const response = await fetch(`${this.url}/${this.userId}`);
      const data = await response.json();
      const habits = data.message ? [] : data;
      return habits;
   }

   async add(habit) {
      const newHabit = {
         ...habit,
         userId: this.userId,
      };
      const response = await fetch(`${this.url}/create`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newHabit),
      });
      const data = await response.json();
      return data;
   }

   async edit(habit) {
      const response = await fetch(`${this.url}/edit`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(habit),
      });
      const data = await response.json();
      return data;
   }

   async delete(habitId) {
      const response = await fetch(`${this.url}/delete/${habitId}`, {
         method: 'DELETE',
      });
      const data = await response.json();
      return data;
   }

   async complete(habit) {
      const response = await fetch(`${this.url}/complete`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(habit),
      });
      const data = await response.json();
      return data;
   }

   async uncomplete(habit) {
      const response = await fetch(`${this.url}/deleteComplete`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(habit),
      });
      const data = await response.json();
      return data;
   }
}

const HabitMain = () => {
   const loader = useMemo(() => new Data(), []);

   const [habits, setHabits] = useState([]);
   const [completionDates, setCompletionDates] = useState([]);

   const [shownHabits, setShownHabits] = useState([]);
   const [previousWeekHabits, setPreviousWeekHabits] = useState([]);
   const [fillPercent, setFillPercent] = useState({ previous: 0, current: 0 });
   const [week, weekDispatch] = useReducer(weekReducer, weekInitialState);
   const [habitModalsVisibility, habitModalsVisibilityDispatch] = useReducer(
      habitModalsVisibilityReducer,
      habitModalsVisibilityInitialState,
   );
   const [editedHabit, setEditedHabit] = useState(null);
   const [refresh, setRefresh] = useState(false);

   useEffect(() => {
      console.log(`shownHabits:`, shownHabits);
      console.log(`previousWeekHabits:`, previousWeekHabits);
      console.log(`fillPercent:`, fillPercent);
   }, [shownHabits, previousWeekHabits, fillPercent]);

   useEffect(() => {
      loader
         .get()
         .then((data) => {
            if (data.habits && data.completionDates) {
               const newHabits = data.habits.map((habit) => {
                  const startDate = new Date(habit.start_date);
                  startDate.setHours(2);
                  return {
                     id: habit.id,
                     userId: habit.user_id,
                     name: habit.name,
                     frequency: habit.frequency,
                     goal: habit.goal,
                     startDate,
                  };
               });
               const newCompletionDates = data.completionDates.map((date) => {
                  const startDate = new Date(date.start_date);
                  startDate.setHours(2);
                  const completionDate = new Date(date.completion_date);
                  startDate.setHours(2);
                  return {
                     id: date.id,
                     userId: date.user_id,
                     habitId: date.habit_id,
                     name: date.name,
                     frequency: date.frequency,
                     goal: date.goal,
                     startDate,
                     completionDate,
                  };
               });
               return { newHabits, newCompletionDates };
            }
            return {};
         })
         .then(({ newHabits, newCompletionDates }) => {
            if (newHabits && newCompletionDates) {
               setHabits(newHabits);
               setCompletionDates(newCompletionDates);
            }
         });
   }, [loader, refresh]);

   useEffect(() => {
      const previousWeek = { start: new Date(week.start), end: new Date(week.end) };
      previousWeek.start.setDate(previousWeek.start.getDate() - 7);
      previousWeek.end.setDate(previousWeek.end.getDate() - 7);
      setShownHabits(getHabitsForWeek(habits, completionDates, week, 'current'));
      setPreviousWeekHabits(getHabitsForWeek(habits, completionDates, previousWeek, 'previous'));
   }, [habits, completionDates, week]);

   useEffect(() => {
      const previousWeek = { start: new Date(week.start), end: new Date(week.end) };
      previousWeek.start.setDate(previousWeek.start.getDate() - 7);
      previousWeek.end.setDate(previousWeek.end.getDate() - 7);
      const currentFillPercent = getFillPercent(shownHabits, week, 'current');
      const previousFillPercent = getFillPercent(previousWeekHabits, previousWeek, 'previous');
      setFillPercent({ previous: previousFillPercent, current: currentFillPercent });
   }, [shownHabits, previousWeekHabits, week]);

   const nextWeekHandler = () => {
      weekDispatch({ type: 'NEXT' });
   };

   const prevWeekHandler = () => {
      weekDispatch({ type: 'PREV' });
   };

   const currentWeekHandler = () => {
      weekDispatch({ type: 'CURRENT' });
   };

   const showHabitAddModal = () => {
      habitModalsVisibilityDispatch({ type: 'ADD' });
   };

   const showHabitEditModal = (habit) => {
      setEditedHabit(habit);
      habitModalsVisibilityDispatch({ type: 'EDIT' });
   };

   const hideHabitModals = () => {
      habitModalsVisibilityDispatch({ type: 'CLOSE' });
   };

   const addHabitHandler = (habit) => {
      loader.add(habit).then(() => setRefresh(!refresh));
      hideHabitModals();
   };

   const editHabitHandler = (habit) => {
      loader.edit(habit).then(() => setRefresh(!refresh));
      setEditedHabit(null);
      hideHabitModals();
   };

   const deleteHabitHandler = (habitId) => {
      loader.delete(habitId).then(() => setRefresh(!refresh));
      setEditedHabit(null);
      hideHabitModals();
   };

   const doneHabitHandler = (habitId, completionDate, isCompleted) => {
      const habit = { habitId, completionDate };
      if (isCompleted) {
         loader.uncomplete(habit).then(() => setRefresh(!refresh));
      } else {
         loader.complete(habit).then(() => setRefresh(!refresh));
      }
   };

   return (
      <Wrapper>
         <Header>Habit tracker</Header>
         <Navigation
            week={week}
            onNext={nextWeekHandler}
            onBack={prevWeekHandler}
            onAddHabit={showHabitAddModal}
            onCurrentWeek={currentWeekHandler}
         />
         <HabitProgressBar fillPercent={fillPercent.current} prevFillPercent={fillPercent.previous} />
         <Divider />
         <HabitsList habits={shownHabits} week={week} onDoneHabit={doneHabitHandler} onEditHabit={showHabitEditModal} />
         {habitModalsVisibility.add && (
            <HabitModal startDate={week.start} action="add" onClose={hideHabitModals} onAddHabit={addHabitHandler} />
         )}
         {habitModalsVisibility.edit && (
            <HabitModal
               id={editedHabit.id}
               name={editedHabit.name}
               goal={editedHabit.goal}
               startDate={editedHabit.startDate}
               frequency={editedHabit.frequency}
               action="edit"
               onClose={hideHabitModals}
               onEditHabit={editHabitHandler}
               onDeleteHabit={deleteHabitHandler}
            />
         )}
      </Wrapper>
   );
};

export default HabitMain;
