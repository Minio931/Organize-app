import { useEffect, useState } from 'react';

import classes from './ToDoMain.module.css';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';

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
      text: 'Task ' + i,
      date: getRandomDate(),
      status: getRandomStatus(),
   });
}

const ToDoMain = () => {
   const today = new Date();
   const [day, setDay] = useState(today);
   const [tasks, setTasks] = useState(DUMMY_TASKS);
   const [fillPercent, setFillPercent] = useState(0);
   const [isNewTaskFormShown, setIsNewTaskFormShown] = useState(true);

   useEffect(() => {
      setTasks(DUMMY_TASKS.filter((task) => task.date.toDateString() === day.toDateString()));
   }, [day]);

   useEffect(() => {
      setFillPercent(Math.floor((tasks.filter((task) => task.status === 'completed').length / tasks.length) * 100));
   }, [tasks]);

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
         <TaskList type="inProgress" tasks={tasks} />
         <TaskList type="completed" tasks={tasks} />
         {isNewTaskFormShown && <NewTaskForm date={day} type="inProgress" />}
      </Wrapper>
   );
};

export default ToDoMain;
