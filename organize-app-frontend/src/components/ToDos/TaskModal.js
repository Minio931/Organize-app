import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Divider from '../UI/Divider';
import Modal from '../UI/Modal';
import classes from './TaskModal.module.css';
import Button from '../UI/Button';

const NewTaskForm = (props) => {
   const [task, setTask] = useState('');
   const [date, setDate] = useState(props.date);
   const [status, setStatus] = useState(props.type);

   const submitHandler = (event) => {
      event.preventDefault();
      props.onAddTask({});
   };

   const taskChangeHandler = (event) => {
      setTask(event.target.value);
   };

   const dateChangeHandler = (event) => {
      setDate(event.target.value);
   };

   const statusChangeHandler = (event) => {
      setStatus(event.target.value);
   };

   return (
      <Modal onClose={props.onClose}>
         <div className={classes.taskModal}>
            <header>
               <h2>Add new task</h2>
               <p>The new task will be added directly to the to-do list on the chosen day.</p>
            </header>
            <Divider />
            <form className={classes.form} onSubmit={[submitHandler]}>
               <div className={classes['form--section']}>
                  <label htmlFor="task">Task description:</label>
                  <input id="task" type="text" placeholder="Do the laundry" value={task} onChange={taskChangeHandler} />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="date">Date:</label>
                  <input id="date" type="date" value={date} onChange={dateChangeHandler} />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="status">Status:</label>
                  <select id="status" value={status} onChange={statusChangeHandler}>
                     <option value="inProgress">In Progress</option>
                     <option value="completed">Completed</option>
                  </select>
               </div>
               <div className={classes.buttons}>
                  <Button type="button" onClick={props.onClose} color="secondary">
                     Close
                  </Button>
                  <Button type="submit">Add</Button>
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default NewTaskForm;
