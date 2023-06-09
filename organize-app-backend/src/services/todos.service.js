const db = require("../config/db.config.js");
const { TodoNotFoundError } = require("../utils/errors.utils.js");

const createTodo = async (todo) => {
  const { userId, name, description, creationDate, executionDate } = todo;
  const completion = false;
  const result = await db.query(
    "INSERT INTO Todos (user_id, name, description, creation_date, execution_date, completion ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [userId, name, description, creationDate, executionDate, completion]
  );

  return { message: `A new todo has been added: ${result.rows[0]}` };
};

const getTodos = async (userId) => {
  const result = await db.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );
  if (result.rows.length === 0) {
    throw new TodoNotFoundError("No todos found for this user");
  }

  return result.rows;
};

const updateTodo = async (todo) => {
  const { id, completion } = todo;

  const result = await db.query(
    "UPDATE todos SET completion = $1 WHERE id = $2 RETURNING *",
    [completion, id]
  );
  if (result.rows.length === 0) {
    throw new TodoNotFoundError("Todo not found");
  }
  console.log(result.rows[0]);
  return { message: `Todo has been updated: ${result.rows[0]}` };
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
};
