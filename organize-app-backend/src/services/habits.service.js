const db = require("../config/db.config.js");
const { NotFoundError } = require("../utils/errors.utils.js");

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
  getHabits,
  completeHabit,
  deleteCompletionDate,
};
