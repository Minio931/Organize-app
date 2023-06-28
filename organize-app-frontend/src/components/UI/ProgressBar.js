import classes from './ProgressBar.module.css';

const ProgressBar = ({ fillPercent, ...props }) => {
   const className = props.className ? `${classes.progressBar} ${props.className}` : `${classes.progressBar}`;

   if (fillPercent === undefined || isNaN(fillPercent) || fillPercent < 0 || fillPercent > 100)
      throw new Error('You need to specify fillPercent! Eligibles values: numbers from 0 to 100.');
   return (
      <div className={className}>
         <span className={classes['progressBar--fill']} style={{ width: `${fillPercent}%` }}></span>
      </div>
   );
};

export default ProgressBar;
