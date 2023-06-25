import classes from './TaskList.module.css';

import { IconCircleHalf2, IconChecks, IconCheckbox, IconSquare, IconPlus } from '@tabler/icons-react';

import TaskModal from './TaskModal';

const Task = ({ id, icon: Icon, task, description, onEditTask, onDoneTask }) => {
   const taskEditHandler = () => {
      onEditTask(id);
   };

   const taskDoneHandler = (e) => {
      e.stopPropagation();
      onDoneTask(id);
   };

   return (
      <li className={classes.task} onClick={taskEditHandler}>
         <div className={classes['task--header']}>
            <Icon onClick={taskDoneHandler} /> {task}
         </div>
         <div className={classes['task--description']}>{description}</div>
      </li>
   );
};

const TaskList = ({ type, tasks, day, tasksDispatch, taskModalsVisibility, taskModalsVisibilityDispatch }) => {
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

   const taskList = tasks.filter((task) => task.status === type);
   const taskCount = taskList.length === 1 ? '1 task' : `${taskList.length} tasks`;

   const showTaskModalHandler = () => {
      taskModalsVisibilityDispatch({ type: 'ADD' });
   };

   const hideTaskModalHandler = () => {
      taskModalsVisibilityDispatch({ type: 'CLOSE' });
   };

   const addTaskHandler = (task) => {
      tasksDispatch({ type: 'ADD', task: task });
      hideTaskModalHandler();
   };

   const doneTaskHandler = (taskId) => {
      tasksDispatch({ type: 'DONE', taskId: taskId });
   };

   return (
      <div className={classes.taskList}>
         <h2 className={classes['taskList-header']}>
            <config.header.icon />
            {config.header.text}
            <span>{taskCount}</span>
            {type === 'inProgress' && (
               <button onClick={showTaskModalHandler}>
                  <IconPlus size={16} color="var(--white)" />
               </button>
            )}
         </h2>
         <ul className={classes['taskList-list']}>
            {taskList.map((task) => (
               <Task
                  key={task.id}
                  id={task.id}
                  icon={config.task.icon}
                  task={task.task}
                  description={task.description}
                  onDoneTask={doneTaskHandler}
               />
            ))}
         </ul>
         {taskModalsVisibility.add && (
            <TaskModal
               date={day}
               type="inProgress"
               action="add"
               onClose={hideTaskModalHandler}
               onAddTask={addTaskHandler}
            />
         )}
      </div>
   );
};

export default TaskList;
