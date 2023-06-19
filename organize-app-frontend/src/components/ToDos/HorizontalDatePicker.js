import classes from './HorizontalDatePicker.module.css';

const Day = (props) => {
   const { isToday, date, changeDayHandler, children } = props;
   return (
      <div
         className={isToday ? classes.today : classes.day}
         onClick={() => {
            changeDayHandler(isToday, date);
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
      const today = Math.floor(numOfDays / 2) === i;
      let newDay;
      if (!i) {
         newDay = new Date(currentDay);
         newDay.setDate(currentDay.getDate() - (numOfDays - 1) / 2);
      } else {
         newDay = new Date(days[i - 1].date);
         newDay.setDate(newDay.getDate() + 1);
      }
      days.push({ id: i + 1, date: newDay, today });
   }

   if (currentDay === undefined || numOfDays === undefined)
      throw new Error('You need to provide a currentDay and numOfDays!');
   else if (numOfDays % 2 === 0) throw new Error('numOfDays must be an odd number!');
   else if (!(currentDay instanceof Date)) throw new Error('currentDay must be a valid Date object!');
   else {
      return (
         <div className={classes['picker']}>
            {days.map((item) => {
               const { id, date, today } = item;
               let text;
               if (!today) text = date.getDate();
               else text = `${date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
               return (
                  <Day key={id} isToday={today} date={date} changeDayHandler={changeDayHandler}>
                     {text}
                  </Day>
               );
            })}
         </div>
      );
   }
};

export default HorizontalDatePicker;
