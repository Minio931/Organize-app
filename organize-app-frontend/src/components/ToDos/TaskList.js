import classes from './TaskList.module.css';

import { IconCircleHalf2, IconChecks, IconCheckbox, IconSquare, IconPlus } from '@tabler/icons-react';

const Task = ({
   id,
   task,
   description,
   iconPrimary: IconPrimary,
   iconSecondary: IconSecondary,
   onEditTask,
   onDoneTask,
}) => {
   const editHandler = (event) => {
      event.stopPropagation();
      onEditTask(id);
   };

   const doneHandler = (event) => {
      event.stopPropagation();
      onDoneTask(id);
   };

   return (
      <li className={classes.task} onClick={editHandler}>
         <div className={classes['task--header']}>
            <div className={classes['task--icon']} onClick={doneHandler}>
               <IconPrimary className={classes['icon--primary']} />
               <IconSecondary className={classes['icon--secondary']} />
            </div>
            {task}
         </div>
         <div className={classes['task--description']}>{description}</div>
      </li>
   );
};

const TaskList = ({ type, tasks, onAddTask, onEditTask, onDoneTask }) => {
   const config = {
      header: {
         icon: undefined,
         text: undefined,
      },
      task: {
         iconPrimary: undefined,
         iconSecondary: undefined,
      },
   };

   if (type === 'inProgress') {
      config.header.icon = IconCircleHalf2;
      config.header.text = 'Tasks in progress';
      config.task.iconPrimary = IconSquare;
      config.task.iconSecondary = IconCheckbox;
   } else if (type === 'completed') {
      config.header.icon = IconChecks;
      config.header.text = 'Completed';
      config.task.iconPrimary = IconCheckbox;
      config.task.iconSecondary = IconSquare;
   } else {
      throw new Error('You must provide type for this element. Eligible values: inProgress, completed');
   }
   if (tasks === undefined || !Array.isArray(tasks))
      throw new Error('You must provide tasks for this element. Eligible values: Array');

   const taskList = tasks.filter((task) => task.status === type);
   const taskCount = taskList.length === 1 ? '1 task' : `${taskList.length} tasks`;

   return (
      <div className={classes.taskList}>
         <h2 className={classes['taskList-header']}>
            <config.header.icon />
            {config.header.text}
            <span>{taskCount}</span>
            {type === 'inProgress' && (
               <button onClick={onAddTask}>
                  <IconPlus size={16} color="var(--white)" />
               </button>
            )}
         </h2>
         <ul className={classes['taskList-list']}>
            {taskList.map((task) => (
               <Task
                  key={task.id}
                  id={task.id}
                  task={task.task}
                  description={task.description}
                  iconPrimary={config.task.iconPrimary}
                  iconSecondary={config.task.iconSecondary}
                  onEditTask={onEditTask}
                  onDoneTask={onDoneTask}
               />
            ))}
         </ul>
      </div>
   );
};

export default TaskList;
