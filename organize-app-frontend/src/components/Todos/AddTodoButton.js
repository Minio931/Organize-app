import classes from "./AddTodoButton.module.css";

const AddTodoButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={classes.btn}>
      Add Todo
    </button>
  );
};

export default AddTodoButton;
