import { useEffect, useState, useReducer } from 'react';

import classes from './ToDoMain.module.css';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';
import TaskList from './TaskList';

const DUMMY_TASKS = [];

function getRandomDate() {
   const startDate = new Date(2023, 5, 20);
   const endDate = new Date(2023, 5, 31);
   const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
   return new Date(randomTime);
}
function getRandomStatus() {
   return Math.random() < 0.5 ? 'inProgress' : 'completed';
}

for (let i = 1; i <= 100; i++) {
   DUMMY_TASKS.push({
      id: i,
      task: 'Task ' + i,
      description:
         'Ut excepteur eiusmod eu laborum consectetur quis sint aliqua do. Consectetur nisi nisi elit et occaecat non. Dolor adipisicing esse minim et culpa in dolor non incididunt. Excepteur magna ut aute nulla aliquip mollit pariatur adipisicing reprehenderit non nostrud sit reprehenderit nisi. Et id laborum do in labore aliquip voluptate.',
      date: getRandomDate(),
      status: getRandomStatus(),
   });
}
const tasksReducer = (state, action) => {
   switch (action.type) {
      case 'ADD': {
         if (!action.task) throw new Error('task is undefined! Please provide task!');
         const newTask = { ...action.task, id: state.length + 1 };
         return [...state, newTask];
      }
      case 'EDIT': {
         if (!action.task) throw new Error('task is undefined! Please provide task!');
         if (!action.taskId) throw new Error('taskId is undefined! Please provide taskId!');
         const task = state.find((task) => task.id === action.taskId);
         const newTasks = state.filter((task) => task.id !== action.taskId);
         newTasks.push(task);
         return newTasks;
      }
      case 'DONE': {
         if (!action.taskId) throw new Error('taskId is undefined! Please provide id!');
         const task = state.find((task) => task.id === action.taskId);
         task.status = task.status === 'inProgress' ? 'completed' : 'inProgress';
         const newTasks = state.filter((task) => task.id !== action.taskId);
         newTasks.push(task);
         return newTasks;
      }
      case 'DELETE':
         return state.filter((task) => task.id !== action.id);
      default:
         throw new Error('Should not get there!');
   }
};

const taskModalsVisibilityInitialState = {
   add: false,
   edit: false,
};

const taskModalsVisibilityReducer = (state, action) => {
   switch (action.type) {
      case 'ADD':
         return { add: true, edit: false };
      case 'EDIT':
         return { add: false, edit: true };
      case 'CLOSE':
         return { add: false, edit: false };
      default:
         throw new Error('Should not get there!');
   }
};

const ToDoMain = () => {
   const today = new Date();
   const [day, setDay] = useState(today);
   const [fillPercent, setFillPercent] = useState(0);
   const [tasks, tasksDispatch] = useReducer(tasksReducer, DUMMY_TASKS);
   const [shownTasks, setShownTasks] = useState(tasks);
   const [taskModalsVisibility, taskModalsVisibilityDispatch] = useReducer(
      taskModalsVisibilityReducer,
      taskModalsVisibilityInitialState,
   );

   useEffect(() => {
      console.log(taskModalsVisibility);
   }, [taskModalsVisibility]);

   useEffect(() => {
      setShownTasks(tasks.filter((task) => task.date.toDateString() === day.toDateString()));
   }, [day, tasks]);

   useEffect(() => {
      setFillPercent(
         shownTasks.length !== 0
            ? Math.floor((shownTasks.filter((task) => task.status === 'completed').length / shownTasks.length) * 100)
            : 0,
      );
   }, [shownTasks]);

   const changeDayHandler = (isToday, date) => {
      setDay(isToday ? today : date);
   };

   const nextDayHandler = () => {
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      setDay(nextDay);
   };

   const prevDayHandler = () => {
      const prevDay = new Date(day);
      prevDay.setDate(day.getDate() - 1);
      setDay(prevDay);
   };

   return (
      <Wrapper>
         <Header>Todo List</Header>
         <HorizontalDatePicker currentDay={day} numOfDays={19} changeDayHandler={changeDayHandler} />
         <ProgressBarWithButtons
            fillPercent={fillPercent}
            nextDayHandler={nextDayHandler}
            prevDayHandler={prevDayHandler}
         />
         <Divider />
         <TaskList
            type="inProgress"
            tasks={shownTasks}
            day={day}
            tasksDispatch={tasksDispatch}
            taskModalsVisibility={taskModalsVisibility}
            taskModalsVisibilityDispatch={taskModalsVisibilityDispatch}
         />
         <TaskList
            type="completed"
            tasks={shownTasks}
            day={day}
            tasksDispatch={tasksDispatch}
            taskModalsVisibility={taskModalsVisibility}
            taskModalsVisibilityDispatch={taskModalsVisibilityDispatch}
         />
      </Wrapper>
   );
};

export default ToDoMain;
