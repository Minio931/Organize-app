const db = require("../config/db.config.js");
const { NotFoundError } = require("../utils/errors.utils.js");

const getHabits = async (userId) => {
  const result = await db.query(
    "SELECT * FROM habits WHERE user_id = $1 ORDER BY id ASC",
    [userId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundError("No habits found for this user");
  }
  return result.rows;
};

module.exports = {
  getHabits,
};
