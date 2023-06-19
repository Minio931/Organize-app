import { useState } from 'react';

import classes from './ToDoMain.module.css';

import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';
import TaskList from './TaskList';

const tasks = {
   completed: [
      { id: 1, text: 'Web version' },
      { id: 2, text: 'Mobile version' },
   ],
   inProgress: [
      { id: 1, text: 'Testing the development' },
      { id: 2, text: 'Reviewing logo and branding' },
      { id: 3, text: 'Dashboard, mobile and web DS' },
   ],
};

const ToDoMain = () => {
   const [today, setToday] = useState(new Date());

   const changeDayHandler = (date) => {
      console.log(date);
   };

   return (
      <Wrapper>
         <Header>Todo List</Header>
         <HorizontalDatePicker currentDay={today} numOfDays={19} changeDayHandler={changeDayHandler} />
         <ProgressBarWithButtons fillPercent={69} />
         <Divider />
         <TaskList type="inProgress" tasks={tasks.inProgress} />
         <TaskList type="completed" tasks={tasks.completed} />
      </Wrapper>
   );
};

export default ToDoMain;
