import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';

import classes from './ToDoMain.module.css';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';
import TaskList from './TaskList';

const ToDoMain = () => {
   const today = new Date();

   return (
      <Wrapper>
         <Header>Todo List</Header>
         <HorizontalDatePicker currentDay={today} numOfDays={19} />
         <ProgressBarWithButtons fillPercent={69} />
         <Divider />
         <TaskList
            type="inProgress"
            tasks={['Testing the development', 'Reviewing logo and branding', 'Dashboard, mobile and web DS']}
         />
         <TaskList type="completed" tasks={['Web version', 'Mobile version']} />
      </Wrapper>
   );
};

export default ToDoMain;
