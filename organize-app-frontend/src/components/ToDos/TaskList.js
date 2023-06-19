import classes from './TaskList.module.css';

import { IconCircleHalf2, IconChecks, IconCheckbox, IconSquare, IconPlus } from '@tabler/icons-react';

const Task = (props) => {
   const { icon: Icon, text } = props;
   return (
      <li className={classes.task}>
         <Icon /> {text}
      </li>
   );
};

const TaskList = (props) => {
   const { type, tasks } = props;
   const config = {
      header: {
         icon: undefined,
         text: undefined,
      },
      task: {
         icon: undefined,
      },
   };
   if (type === 'inProgress') {
      config.header.icon = IconCircleHalf2;
      config.header.text = 'Tasks in progress';
      config.task.icon = IconSquare;
   } else if (type === 'completed') {
      config.header.icon = IconChecks;
      config.header.text = 'Completed';
      config.task.icon = IconCheckbox;
   } else {
      throw new Error('You must provide type for this element. Eligible values: inProgress, completed');
   }
   if (tasks === undefined || !Array.isArray(tasks))
      throw new Error('You must provide tasks for this element. Eligible values: Array');
   const taskCount = tasks.length === 1 ? '1 task' : `${tasks.length} tasks`;

   return (
      <div className={classes.taskList}>
         <h2 className={classes['taskList-header']}>
            <config.header.icon />
            {config.header.text}
            <span>{taskCount}</span>
            <button>
               <IconPlus size={16} color="var(--white)" />
            </button>
         </h2>
         <ul className={classes['taskList-list']}>
            {tasks.map((task) => (
               <Task icon={config.task.icon} text={task} />
            ))}
         </ul>
      </div>
   );
};

export default TaskList;
