const db = require('../config/db.config.js');
const { NotFoundError } = require('../utils/errors.utils.js');

const createHabit = async (habit) => {
   const { userId, name, startDate, frequency, goal } = habit;

   const result = await db.query(
      'INSERT INTO habits (user_id, name, start_date, frequency, goal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, name, startDate, frequency, goal],
   );

   return { message: `A new habit has been added: ${result.rows[0]}` };
};

const editHabit = async (habit) => {
   const { id, name, startDate, frequency, goal } = habit;
   const result = await db.query(
      'UPDATE habits SET name = $1, start_date = $2, frequency = $3, goal = $4 WHERE id = $5 RETURNING *',
      [name, startDate, frequency, goal, id],
   );
   if (result.rows.length === 0) {
      throw new NotFoundError('Habit not found');
   }

   return { message: `Habit has been updated: ${result.rows[0]}` };
};
const getHabits = async (userId) => {
   const result = await db.query('SELECT * FROM habits WHERE user_id = $1 ORDER BY id ASC', [userId]);
   const completionDates = await db.query(
      'SELECT * FROM habits INNER JOIN "habitsCompletionDates" as HCD ON habits.id = HCD.habit_id WHERE user_id = $1',
      [userId],
   );

   if (result.rows.length === 0) {
      throw new NotFoundError('No habits found for this user');
   }
   return { habits: result.rows, completionDates: completionDates.rows };
};

const getHabit = async (habitId) => {
   const result = await db.query('SELECT * FROM habits WHERE id = $1', [habitId]);

   if (result.rows.length === 0) {
      throw new NotFoundError('Habit not found');
   }
   return { habit: result.rows[0] };
};

const deleteHabit = async (habitId) => {
   const result = await db.query('DELETE FROM habits WHERE id = $1 RETURNING *', [habitId]);
   if (result.rows.length === 0) {
      throw new NotFoundError('Habit not found');
   }
   return { message: `Habit has been deleted: ${result.rows[0]}` };
};

const completeHabit = async (habit) => {
   const { habitId, completionDate } = habit;
   const result = await db.query(
      'INSERT INTO "habitsCompletionDates" (habit_id, completion_date) VALUES ($1, $2) RETURNING *',
      [habitId, completionDate],
   );
   return result.rows[0];
};
const deleteCompletionDate = async (habit) => {)
   const { habitId, completionDate } = habit;
   const result = await db.query(
      'DELETE FROM "habitsCompletionDates" WHERE habit_id = $1 AND completion_date = $2 RETURNING *',
      [habitId, completionDate],
   );
   console.log(habitId, 'habitId');
   console.log(completionDate, 'completionDate');
   return result.rows[0];
};

module.exports = {
   createHabit,
   editHabit,
   getHabits,
   getHabit,
   deleteHabit,
   completeHabit,
   deleteCompletionDate,
};
