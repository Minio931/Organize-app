import { useEffect, useReducer } from 'react';

import classes from './HabitMain.module.css';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import Navigation from './Navigation';
import HabitProgressBar from './HabitProgressBar';
import Divider from '../UI/Divider';
import HabitModal from './HabitModal';

const getWeek = (date) => {
   const today = new Date(date);
   const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
   const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
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
            start: new Date(state.start.getFullYear(), state.start.getMonth(), state.start.getDate() - 7),
            end: new Date(state.end.getFullYear(), state.end.getMonth(), state.end.getDate() - 7),
         };
         return prevWeek;
      }
      case 'NEXT': {
         const nextWeek = {
            start: new Date(state.start.getFullYear(), state.start.getMonth(), state.start.getDate() + 7),
            end: new Date(state.end.getFullYear(), state.end.getMonth(), state.end.getDate() + 7),
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

class Data {
   constructor() {
      this.userId = JSON.parse(localStorage.getItem('user')).id;
      this.url = 'http://localhost:3001/habit';
   }

   async get() {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const response = await fetch(`${this.url}/${userId}`);
      const data = await response.json();
      const tasks = data.message ? [] : data;
      return tasks;
   }

   async add(task) {
      const newTask = {
         ...task,
         userId: this.userId,
      };
      const response = await fetch(`${this.url}/create`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newTask),
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
   const [week, weekDispatch] = useReducer(weekReducer, weekInitialState);
   const [habitModalsVisibility, habitModalsVisibilityDispatch] = useReducer(
      habitModalsVisibilityReducer,
      habitModalsVisibilityInitialState,
   );

   useEffect(() => {
      console.log(week);
   }, [week]);

   useEffect(() => {
      console.log(habitModalsVisibility);
   }, [habitModalsVisibility]);

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

   return (
      <Wrapper>
         <Header>Habit tracker</Header>
         <Navigation week={week} onNext={nextWeekHandler} onBack={prevWeekHandler} onAddHabit={showHabitModal} />
         <HabitProgressBar fillPercent={20} prevFillPercent={20} />
         <Divider />
         {habitModalsVisibility.add && <HabitModal startDate={week.start} onClose={hideHabitModal} />}
      </Wrapper>
   );
};

export default HabitMain;
