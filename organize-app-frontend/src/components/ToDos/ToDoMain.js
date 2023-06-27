import { useEffect, useState, useReducer } from 'react';

import { useLoaderData } from 'react-router-dom';

import classes from './ToDoMain.module.css';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

const tasksReducer = (state, action) => {
   switch (action.type) {
      case 'ADD': {
         if (!action.task) throw new Error('task is undefined! Please provide task!');
         const newTask = { ...action.task, id: state.length + 1 };
         return [...state, newTask];
      }
      case 'EDIT': {
         if (!action.task) throw new Error('task is undefined! Please provide task!');
         const newTasks = state.filter((task) => task.id !== action.task.id);
         newTasks.push(action.task);
         return newTasks;
      }
      case 'DONE': {
         if (!action.taskId) throw new Error('taskId is undefined! Please provide id!');
         const task = state.find((task) => task.id === action.taskId);
         task.status = task.status === 'completed' ? 'inProgress' : 'completed';
         const newTasks = state.filter((task) => task.id !== action.taskId);
         newTasks.push(task);
         return newTasks;
      }
      case 'DELETE': {
         if (!action.taskId) throw new Error('taskId is undefined! Please provide id!');
         return state.filter((task) => task.id !== action.taskId);
      }
      case 'REPLACE': {
         if (!action.tasks) throw new Error('tasks is undefined! Please provide tasks!');
         return action.tasks;
      }
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
      this.url = 'http://localhost:3001/todo';
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
         body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
   }
}

const ToDoMain = () => {
   const today = new Date();
   const [day, setDay] = useState(today);
   const [fillPercent, setFillPercent] = useState(0);
   const [tasks, tasksDispatch] = useReducer(tasksReducer, []);
   const [shownTasks, setShownTasks] = useState(tasks);
   const [taskModalsVisibility, taskModalsVisibilityDispatch] = useReducer(
      taskModalsVisibilityReducer,
      taskModalsVisibilityInitialState,
   );
   const [editedTask, setEditedTask] = useState(null);

   useEffect(() => {
      const data = new Data();
      data
         .get()
         .then((data) => {
            const newTasks = data.map((task) => {
               const execution_date = new Date(task.execution_date);
               const creation_date = new Date(task.creation_date);
               return {
                  ...task,
                  execution_date,
                  creation_date,
               };
            });
            return newTasks;
         })
         .then((newTasks) => {
            tasksDispatch({ type: 'REPLACE', tasks: newTasks });
         });
   }, []);

   useEffect(() => {
      console.log(tasks);
      setShownTasks(tasks.filter((task) => task.execution_date.toDateString() === day.toDateString()));
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

   const showAddTaskModalHandler = () => {
      taskModalsVisibilityDispatch({ type: 'ADD' });
   };

   const showEditTaskModalHandler = (taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      setEditedTask(task);
      taskModalsVisibilityDispatch({ type: 'EDIT' });
   };

   const hideTaskModalHandler = () => {
      taskModalsVisibilityDispatch({ type: 'CLOSE' });
   };

   const addTaskHandler = (task) => {
      tasksDispatch({ type: 'ADD', task: task });
      hideTaskModalHandler();
   };

   const editTaskHandler = (task) => {
      tasksDispatch({ type: 'EDIT', task: task });
      setEditedTask(null);
      hideTaskModalHandler();
   };

   const deleteTaskHandler = (taskId) => {
      tasksDispatch({ type: 'DELETE', taskId: taskId });
      hideTaskModalHandler();
   };

   const doneTaskHandler = (taskId) => {
      tasksDispatch({ type: 'DONE', taskId: taskId });
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
            onAddTask={showAddTaskModalHandler}
            onEditTask={showEditTaskModalHandler}
            onDoneTask={doneTaskHandler}
         />
         <TaskList
            type="completed"
            tasks={shownTasks}
            onEditTask={showEditTaskModalHandler}
            onDoneTask={doneTaskHandler}
         />
         {taskModalsVisibility.add && (
            <TaskModal date={day} action="add" onClose={hideTaskModalHandler} onAddTask={addTaskHandler} />
         )}
         {taskModalsVisibility.edit && (
            <TaskModal
               id={editedTask.id}
               task={editedTask.task}
               description={editedTask.description}
               date={editedTask.date}
               status={editedTask.status}
               action="edit"
               onClose={hideTaskModalHandler}
               onEditTask={editTaskHandler}
               onDeleteTask={deleteTaskHandler}
            />
         )}
      </Wrapper>
   );
};

export default ToDoMain;
