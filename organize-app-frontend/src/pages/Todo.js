import { useState } from "react";
import AddTodoButton from "../components/Todos/AddTodoButton";
import TodoForm from "../components/Todos/TodoForm";
import Modal from "../components/UI/Modal";

const TodoPage = () => {
  const [isShown, setIsShown] = useState(false);

  const showMOdalHandler = () => {
    setIsShown(true);
  };
  const hideModalHandler = () => {
    setIsShown(false);
  };
  return (
    <>
      <h1>Todo Page</h1>
      <AddTodoButton onClick={showMOdalHandler} />
      {isShown && (
        <Modal onClose={hideModalHandler}>
          <TodoForm />
        </Modal>
      )}
    </>
  );
};

export default TodoPage;
