import ArrowButtons from '../UI/ArrowButtons';
import Button from '../UI/Button';

import { IconPlus } from '@tabler/icons-react';

import classes from './Navigation.module.css';

const getGBDate = (date) => {
   const localDateString = date.toLocaleDateString('en-GB');
   return localDateString;
};

const Navigation = ({ week, onBack, onNext, onAddHabit }) => {
   const weekStart = getGBDate(week.start);
   const weekEnd = getGBDate(week.end);

   return (
      <div className={classes.navigation}>
         <ArrowButtons onNext={onNext} onBack={onBack} />
         <h2>
            Monday, <strong>{weekStart}</strong> - Sunday, <strong>{weekEnd}</strong>
         </h2>
         <Button className={classes.button} onClick={onAddHabit}>
            <IconPlus />
            Add Habit
         </Button>
      </div>
   );
};

export default Navigation;
