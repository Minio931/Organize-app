const db = require("../config/db.config.js");
const { NotFoundError } = require("../utils/errors.utils.js");

const createHabit = async (habit) => {
  const { userId, name, description, startDate, frequency, goal } = habit;

  const result = await db.query(
    "INSERT INTO habits (user_id, name, description, start_date, frequency, goal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [userId, name, description, startDate, frequency, goal]
  );

  return { message: `A new habit has been added: ${result.rows[0]}` };
};

const editHabit = async (habit) => {
  const { id, name, description, startDate, frequency, goal } = habit;
  const result = await db.query(
    "UPDATE habits SET name = $1, description = $2, start_date = $3, frequency = $4, goal = $5 WHERE id = $6 RETURNING *",
    [name, description, startDate, frequency, goal, id]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("Habit not found");
  }

  return { message: `Habit has been updated: ${result.rows[0]}` };
};
const getHabits = async (userId) => {
  const result = await db.query(
    "SELECT * FROM habits WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );
  const completionDates = await db.query(
    'SELECT * FROM habits INNER JOIN "habitsCompletionDates" as HCD ON habits.id = HCD.habit_id WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError("No habits found for this user");
  }
  return { habits: result.rows, completionDates: completionDates.rows };
};

const completeHabit = async ({ habitId }) => {
  const date = new Date();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const todayDate = `${date.getFullYear()}-${month}-${day}`;
  console.log(habitId);
  const result = await db.query(
    'INSERT INTO "habitsCompletionDates" (habit_id, completion_date) VALUES ($1, $2) RETURNING *',
    [habitId, todayDate]
  );
  return result.rows[0];
};
const deleteCompletionDate = async ({ habitId, completionDate }) => {
  const result = await db.query(
    'DELETE FROM "habitsCompletionDates" WHERE habit_id = $1 AND completion_date = $2 RETURNING *',
    [habitId, completionDate]
  );
  console.log(habitId, "habitId");
  console.log(completionDate, "completionDate");
  return result.rows[0];
};

module.exports = {
  createHabit,
  editHabit,
  getHabits,
  completeHabit,
  deleteCompletionDate,
};
