const db = require("../config/db.config.js");

const createTodo = async (todo) => {
  const { userId, name, description, creationDate, executionDate } = todo;
  const completion = false;
  const result = await db.query(
    "INSERT INTO todos (user_id, name, description, creation_date, execution_date, completion ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [userId, name, description, creationDate, executionDate, completion]
  );
  return { message: `A new todo has been added: ${result.rows[0]}` };
};

const getTodos = async (userId) => {
  const result = await db.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );
  return result.rows;
};
