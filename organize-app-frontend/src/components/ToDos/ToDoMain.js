import Wrapper from '../UI/Wrapper';
import Header from '../UI/Header';
import HorizontalDatePicker from './HorizontalDatePicker';

import classes from './ToDoMain.module.css';
import ProgressBarWithButtons from './ProgressBarWithButtons';
import Divider from '../UI/Divider';

const ToDoMain = () => {
   const today = new Date();

   return (
      <Wrapper>
         <Header>Todo List</Header>
         <HorizontalDatePicker currentDay={today} numOfDays={19} />
         <ProgressBarWithButtons fillPercent={69} />
         <Divider />
      </Wrapper>
   );
};

export default ToDoMain;
