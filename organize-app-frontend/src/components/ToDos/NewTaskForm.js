import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Divider from '../UI/Divider';
import classes from './NewTaskForm.module.css';

const Backdrop = (props) => {
   return <div className={classes.backdrop} onClick={props.onClose} />;
};

const Form = (props) => {
   const { type, onAddTask } = props;

   const [task, setTask] = useState('');
   const [date, setDate] = useState(props.date);
   const [status, setStatus] = useState(props.type);

   const submitHandler = (event) => {
      event.preventDefault();
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
      <div className={classes.newTaskForm}>
         <header>
            <h2>Add new task</h2>
            <p>The new task will be added directly to the to-do list on the chosen day.</p>
         </header>
         <Divider />
         <form className={classes.form} onSubmit={submitHandler}>
            <label htmlFor="task">Task description:</label>
            <input id="task" type="text" placeholder="Do the laundry" value={task} onChange={taskChangeHandler} />
            <label htmlFor="date">Date:</label>
            <input id="date" type="date" value={date} onChange={dateChangeHandler} />
            <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={statusChangeHandler}>
               <option value="inProgress">In Progress</option>
               <option value="completed">Completed</option>
            </select>
            <button type="submit">Add</button>
         </form>
      </div>
   );
};

const NewTaskForm = (props) => {
   const { type, date, onAddTask, onClose } = props;
   return (
      <>
         {createPortal(<Backdrop onClose={props.onClose} />, document.getElementById('overlays'))}
         {createPortal(<Form type={type} date={date} onAddTask={onAddTask} />, document.getElementById('overlays'))}
      </>
   );
};

export default NewTaskForm;
