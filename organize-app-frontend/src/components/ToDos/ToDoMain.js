import { useEffect, useState, useReducer } from 'react';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

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
      console.log(task);
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

const ToDoMain = () => {
   const data = new Data();

   const today = new Date();
   const [day, setDay] = useState(today);
   const [fillPercent, setFillPercent] = useState(0);
   const [tasks, setTasks] = useState([]);
   const [shownTasks, setShownTasks] = useState(tasks);
   const [taskModalsVisibility, taskModalsVisibilityDispatch] = useReducer(
      taskModalsVisibilityReducer,
      taskModalsVisibilityInitialState,
   );
   const [editedTask, setEditedTask] = useState(null);
   const [refresh, setRefresh] = useState(false);

   useEffect(() => {
      data
         .get()
         .then((data) => {
            const newTasks = data.map((task) => {
               const executionDate = new Date(task.execution_date);
               executionDate.setHours(2);
               const creationDate = new Date(task.creation_date);
               creationDate.setHours(2);
               return {
                  id: task.id,
                  name: task.name,
                  description: task.description,
                  userId: task.user_id,
                  completion: task.completion,
                  executionDate,
                  creationDate,
               };
            });
            return newTasks;
         })
         .then((newTasks) => {
            setTasks(newTasks);
         });
   }, [refresh]);

   useEffect(() => {
      console.log(tasks);
      setShownTasks(tasks.filter((task) => task.executionDate.toDateString() === day.toDateString()));
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
      const task = shownTasks.find((task) => task.id === taskId);
      setEditedTask(task);
      taskModalsVisibilityDispatch({ type: 'EDIT' });
   };

   const hideTaskModalHandler = () => {
      taskModalsVisibilityDispatch({ type: 'CLOSE' });
   };

   const addTaskHandler = (task) => {
      data.add(task).then(() => setRefresh(!refresh));
      hideTaskModalHandler();
   };

   const editTaskHandler = (task) => {
      data.edit(task).then(() => setRefresh(!refresh));
      setEditedTask(null);
      hideTaskModalHandler();
   };

   const deleteTaskHandler = (taskId) => {
      data.delete(taskId).then(() => setRefresh(!refresh));
      hideTaskModalHandler();
   };

   const doneTaskHandler = (taskId) => {
      const task = shownTasks.find((task) => task.id === taskId);
      data.update({ id: task.id, completion: !task.completion }).then(() => setRefresh(!refresh));
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
            <TaskModal executionDate={day} action="add" onClose={hideTaskModalHandler} onAddTask={addTaskHandler} />
         )}
         {taskModalsVisibility.edit && (
            <TaskModal
               id={editedTask.id}
               name={editedTask.name}
               description={editedTask.description}
               executionDate={editedTask.executionDate}
               creationDate={editedTask.creationDate}
               completion={editedTask.completion}
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
