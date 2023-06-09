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

module.exports = {
  getHabits,
};
