import classes from './ProgressBarWithButtons.module.css';

import ProgressBar from '../UI/ProgressBar';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

const Button = (props) => {
   const { direction, onClick } = props;
   if (direction !== 'left' && direction !== 'right')
      throw new Error('You need to specify direction! Eligible values: "left", "right".');
   return (
      <button className={classes.button} onClick={onClick}>
         {direction === 'left' ? <IconArrowLeft /> : <IconArrowRight />}
      </button>
   );
};

const ProgressText = (props) => {
   const { percent } = props;
   if (percent === undefined || isNaN(percent))
      throw new Error('You need to specify a percent! Eligibles values: numbers from 0 to 100.');
   return <div className={classes.progressText}>{percent}% achieved</div>;
};

const ProgressBarWithButtons = (props) => {
   const { fillPercent, nextDayHandler, prevDayHandler } = props;

   return (
      <div className={classes.progressBarWithButtons}>
         <div className={classes.buttons}>
            <Button direction="left" onClick={prevDayHandler} />
            <Button direction="right" onClick={nextDayHandler} />
         </div>
         <ProgressBar fillPercent={fillPercent} />
         <ProgressText percent={fillPercent} />
      </div>
   );
};

export default ProgressBarWithButtons;
