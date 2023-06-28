import classes from './ArrowButtons.module.css';

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

const ArrowButtons = (props) => {
   return (
      <div className={classes.buttons}>
         <Button direction="left" onClick={props.onBack} />
         <Button direction="right" onClick={props.onNext} />
      </div>
   );
};

export default ArrowButtons;
