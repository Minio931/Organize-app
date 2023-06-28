import { useEffect, useReducer, useState, useMemo } from 'react';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import Navigation from './Navigation';
import HabitProgressBar from './HabitProgressBar';
import Divider from '../UI/Divider';
import HabitModal from './HabitModal';

const getWeek = (date) => {
   const today = new Date(date);
   const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
   start.setHours(2);
   const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
   end.setHours(2);
   return { start, end };
};

const weekInitialState = {
   start: getWeek(new Date()).start,
   end: getWeek(new Date()).end,
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
   const weekCompletedTasks = completionDates.filter(
      (date) => date.completionDate >= week.start && date.completionDate <= week.end,
   );
   weekCompletedTasks.forEach((date) => {
      const habitIndex = newWeekHabits.findIndex((habit) => habit.id === date.habitId);
      if (habitIndex !== -1) {
         newWeekHabits[habitIndex].completedDates.push(date.completionDate);
      }
   });
   return newWeekHabits;
};

const getFillPercent = (habits, week, type) => {
   const totalHabits = habits.reduce((acc, habit) => {
      if (habit.startDate <= week.start) {
         return acc + 7;
      } else {
         const difference = Math.round((week.end - habit.startDate) / (1000 * 60 * 60 * 24));
         return acc + difference;
      }
   }, 0);
   console.log(`totalHabits(${type}): ${totalHabits}`);
   const totalCompleted = habits.reduce((acc, habit) => {
      return acc + habit.completedDates.length;
   }, 0);
   console.log(`totalCompleted(${type}): ${totalCompleted}`);
   if (totalHabits === 0) {
      return 0;
   }
   const fillPercent = Math.round((totalCompleted / totalHabits) * 100);
   return fillPercent;
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

   async edit(task) {
      const response = await fetch(`${this.url}/edit`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
   }

   async update(task) {
      const response = await fetch(`${this.url}/update`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
   }

   async delete(taskId) {
      const response = await fetch(`${this.url}/delete/${taskId}`, {
         method: 'DELETE',
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
   const [refresh, setRefresh] = useState(false);

   useEffect(() => {
      console.log('Shown habits: ', shownHabits);
      console.log('Previous week habits: ', previousWeekHabits);
   }, [shownHabits, previousWeekHabits]);

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
      console.log('Current fill percent: ', currentFillPercent);
      console.log('Previous fill percent: ', previousFillPercent);
      setFillPercent({ previous: previousFillPercent, current: currentFillPercent });
   }, [shownHabits, previousWeekHabits, week]);

   const nextWeekHandler = () => {
      weekDispatch({ type: 'NEXT' });
   };

   const prevWeekHandler = () => {
      weekDispatch({ type: 'PREV' });
   };

   const showHabitModal = () => {
      habitModalsVisibilityDispatch({ type: 'ADD' });
   };

   const hideHabitModal = () => {
      habitModalsVisibilityDispatch({ type: 'CLOSE' });
   };

   const addHabitHandler = (habit) => {
      loader.add(habit).then(() => setRefresh(!refresh));
      hideHabitModal();
   };

   return (
      <Wrapper>
         <Header>Habit tracker</Header>
         <Navigation week={week} onNext={nextWeekHandler} onBack={prevWeekHandler} onAddHabit={showHabitModal} />
         <HabitProgressBar fillPercent={fillPercent.current} prevFillPercent={fillPercent.previous} />
         <Divider />

         {habitModalsVisibility.add && (
            <HabitModal startDate={week.start} action="add" onClose={hideHabitModal} onAddHabit={addHabitHandler} />
         )}
      </Wrapper>
   );
};

export default HabitMain;
