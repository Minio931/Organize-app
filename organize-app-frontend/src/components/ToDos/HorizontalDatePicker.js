import classes from './HorizontalDatePicker.module.css';

const Day = (props) => {
   const { isChosenDay, date, changeDayHandler, children } = props;

   let className = isChosenDay ? classes.chosenDay : classes.day;

   if (new Date(date.toISOString().slice(0, 10)) < new Date(new Date().toISOString().slice(0, 10)))
      className += ` ${classes.pastDay}`;
   if (date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) && !isChosenDay)
      className += ` ${classes.today}`;

   return (
      <div
         className={className}
         onClick={() => {
            changeDayHandler(isChosenDay, date);
         }}
      >
         {children}
      </div>
   );
};

const HorizontalDatePicker = (props) => {
   const { currentDay, numOfDays, changeDayHandler } = props;
   const days = [];

   for (let i = 0; i < numOfDays; i++) {
      const chosenDay = Math.floor(numOfDays / 2) === i;
      let newDay;
      if (!i) {
         newDay = new Date(currentDay);
         newDay.setDate(currentDay.getDate() - (numOfDays - 1) / 2);
      } else {
         newDay = new Date(days[i - 1].date);
         newDay.setDate(newDay.getDate() + 1);
      }
      days.push({ id: i + 1, date: newDay, chosenDay });
   }

   if (currentDay === undefined || numOfDays === undefined)
      throw new Error('You need to provide a currentDay and numOfDays!');
   else if (numOfDays % 2 === 0) throw new Error('numOfDays must be an odd number!');
   else if (!(currentDay instanceof Date)) throw new Error('currentDay must be a valid Date object!');
   else {
      return (
         <div className={classes['picker']}>
            {days.map((item) => {
               const { id, date, chosenDay } = item;
               let text;
               if (!chosenDay) text = date.getDate();
               else text = `${date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
               return (
                  <Day key={id} isChosenDay={chosenDay} date={date} changeDayHandler={changeDayHandler}>
                     {text}
                  </Day>
               );
            })}
         </div>
      );
   }
};

export default HorizontalDatePicker;
