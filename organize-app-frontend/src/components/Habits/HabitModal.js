import { useState } from 'react';

import { IconTrash } from '@tabler/icons-react';

import Divider from '../UI/Divider';
import Modal from '../UI/Modal';
import classes from './HabitModal.module.css';
import Button from '../UI/Button';

const HabitModal = (props) => {
   const [name, setName] = useState(props.name ? props.name : '');
   const [goal, setGoal] = useState(props.goal ? props.goal : '');

   const [startDate, setStartDate] = useState(props.startDate.toISOString().slice(0, 10));
   const [frequency, setFrequency] = useState(props.frequency ? props.frequency : 1);

   const submitHandler = (event) => {
      event.preventDefault();
      if (props.action === 'add') {
         props.onAddHabit({
            name,
            goal,
            startDate: new Date(startDate),
            frequency,
         });
      } else if (props.action === 'edit') {
         props.onEditHabit({
            id: props.id,
            name,
            goal,
            startDate: new Date(startDate),
            frequency,
         });
      }
   };

   const deleteHandler = () => {
      props.onDeleteHabit(props.id);
   };

   const nameChangeHandler = (event) => {
      setName(event.target.value);
   };

   const goalChangeHandler = (event) => {
      setGoal(event.target.value);
   };

   const startDateChangeHandler = (event) => {
      setStartDate(event.target.value);
   };

   const frequencyChangeHandler = (event) => {
      setFrequency(event.target.value);
   };

   const headerText = props.action === 'add' ? 'Add new habit' : 'Edit habit';
   const headerDescription =
      props.action === 'add'
         ? 'The new habit will be added directly to the habit tracker starting on the chosen day.'
         : 'The habit will be edited in the habit tracker.';

   return (
      <Modal onClose={props.onClose}>
         <div className={classes.habitModal}>
            <header>
               <h2>{headerText}</h2>
               <p>{headerDescription}</p>
            </header>
            <Divider />
            <form className={classes.form} onSubmit={submitHandler}>
               <div className={classes['form--section']}>
                  <label htmlFor="name">Habit:</label>
                  <input
                     id="name"
                     type="text"
                     placeholder="Workout"
                     minLength={3}
                     required
                     value={name}
                     onChange={nameChangeHandler}
                  />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="goal">Goal:</label>
                  <input
                     id="goal"
                     type="text"
                     placeholder="Exercise for 30 minutes"
                     maxLength={30}
                     value={goal}
                     onChange={goalChangeHandler}
                  />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="startDate">Date:</label>
                  <input id="startDate" type="date" value={startDate} onChange={startDateChangeHandler} required />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="frequency">Frequency:</label>
                  <div className={classes['input--suffix']}>
                     <input
                        id="frequency"
                        type="number"
                        value={frequency}
                        onChange={frequencyChangeHandler}
                        required
                        step={1}
                        min={1}
                     />
                     <label htmlFor="frequency">days</label>
                  </div>
               </div>
               <div className={classes.buttons}>
                  <Button type="button" onClick={props.onClose} color="secondary">
                     Close
                  </Button>
                  <Button type="submit">{props.action === 'add' ? 'Add' : 'Edit'}</Button>
                  {props.action === 'edit' && (
                     <Button type="button" className={classes.delete} onClick={deleteHandler}>
                        <IconTrash size={16} color="var(--white)" />
                     </Button>
                  )}
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default HabitModal;
