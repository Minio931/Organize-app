import ProgressBar from '../UI/ProgressBar';

import { IconArrowBigUpLinesFilled, IconArrowBigDownLinesFilled, IconYinYangFilled } from '@tabler/icons-react';

import classes from './HabitProgressBar.module.css';

const Comparison = ({ fillPercent, prevFillPercent }) => {
   const difference = fillPercent - prevFillPercent;
   let information = '';
   if (difference > 0) {
      information = `Up ${Math.abs(difference)}%`;
   } else if (difference < 0) {
      information = `Down ${Math.abs(difference)}%`;
   } else {
      information = 'No change';
   }
   return (
      <div className={classes.comparison}>
         {difference > 0 && <IconArrowBigUpLinesFilled />}
         {difference < 0 && <IconArrowBigDownLinesFilled />}
         {!difference && <IconYinYangFilled />}
         <p>
            <span>{information}</span> from last week
         </p>
      </div>
   );
};

const ProgressText = ({ percent }) => {
   if (percent === undefined || isNaN(percent))
      throw new Error('You need to specify a percent! Eligibles values: numbers from 0 to 100.');
   return <div className={classes.progressText}>{percent}% achieved</div>;
};

const HabitProgressBar = ({ fillPercent, prevFillPercent }) => {
   return (
      <div className={classes.habitProgressBar}>
         <ProgressBar className={classes.progressBar} fillPercent={fillPercent} />
         <div className={classes.information}>
            <Comparison fillPercent={fillPercent} prevFillPercent={prevFillPercent} />
            <ProgressText percent={fillPercent} />
         </div>
      </div>
   );
};

export default HabitProgressBar;
