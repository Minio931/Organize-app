import { useState } from 'react';

import { IconTrash } from '@tabler/icons-react';

import Divider from '../UI/Divider';
import Modal from '../UI/Modal';
import classes from './TaskModal.module.css';
import Button from '../UI/Button';

const TaskModal = (props) => {
   const [task, setTask] = useState(props.task ? props.task : '');
   const [description, setDescription] = useState(props.description ? props.description : '');
   const [date, setDate] = useState(props.date.toISOString().slice(0, 10));
   const [completion, setCompletion] = useState(props.completion ? props.completion : false);

   const submitHandler = (event) => {
      event.preventDefault();
      if (props.action === 'add') {
         props.onAddTask({
            name: task,
            description: description,
            execution_date: new Date(date),
            creation_date: new Date(date),
            completion: completion,
         });
      } else if (props.action === 'edit') {
         props.onEditTask({
            id: props.id,
            name: task,
            description: description,
            execution_date: new Date(date),
            creation_date: new Date(date),
            completion: completion,
         });
      }
   };

   const deleteHandler = () => {
      props.onDeleteTask(props.id);
   };

   const taskChangeHandler = (event) => {
      setTask(event.target.value);
   };

   const descriptionChangeHandler = (event) => {
      setDescription(event.target.value);
   };

   const dateChangeHandler = (event) => {
      setDate(event.target.value);
   };

   const completionChangeHandler = (event) => {
      setCompletion(event.target.value);
   };

   const headerText = props.action === 'add' ? 'Add new task' : 'Edit task';
   const headerDescription =
      props.action === 'add'
         ? 'The new task will be added directly to the to-do list on the chosen day.'
         : 'The task will be edited in the to-do list.';

   return (
      <Modal onClose={props.onClose}>
         <div className={classes.taskModal}>
            <header>
               <h2>{headerText}</h2>
               <p>{headerDescription}</p>
            </header>
            <Divider />
            <form className={classes.form} onSubmit={submitHandler}>
               <div className={classes['form--section']}>
                  <label htmlFor="task">Task:</label>
                  <input
                     id="task"
                     type="text"
                     placeholder="Do the laundry"
                     minLength={4}
                     required
                     value={task}
                     onChange={taskChangeHandler}
                  />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="description">Description:</label>
                  <textarea
                     id="description"
                     placeholder="Don't forget to clean the washmachine filter before that!"
                     value={description}
                     onChange={descriptionChangeHandler}
                  />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="date">Date:</label>
                  <input id="date" type="date" value={date} onChange={dateChangeHandler} required />
               </div>
               <div className={classes['form--section']}>
                  <label htmlFor="status">Status:</label>
                  <select id="status" value={completion} onChange={completionChangeHandler} required>
                     <option value={true}>In Progress</option>
                     <option value={false}>Completed</option>
                  </select>
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

export default TaskModal;
