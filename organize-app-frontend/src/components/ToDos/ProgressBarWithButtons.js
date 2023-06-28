import classes from './ProgressBarWithButtons.module.css';

import ProgressBar from '../UI/ProgressBar';
import ArrowButtons from '../UI/ArrowButtons';

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
         <ArrowButtons onBack={prevDayHandler} onNext={nextDayHandler} />
         <ProgressBar className={classes.progressBar} fillPercent={fillPercent} />
         <ProgressText percent={fillPercent} />
      </div>
   );
};

export default ProgressBarWithButtons;
