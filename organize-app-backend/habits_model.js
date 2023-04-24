const Pool = require("pg").Pool;
const pool = new Pool({
  user: "minio",
  host: "postgresql-minio.alwaysdata.net",
  database: "minio_organize_app",
  password: "adminroot",
  port: 5432,
});

const getHabits = (request, response) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM habits", (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(results);
      resolve(results.rows);
    });
  });
};

const createHabit = (body) => {
  return new Promise((resolve, reject) => {
    const { name, start_date, repetition, done, not_done } = body;
    pool.query(
      "INSERT INTO habits (name, start_date, repetition, done, not_done) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, start_date, repetition, done, not_done],
      (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(`A new habit has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const deleteHabit = (request, response) => {
  return new Promise((resolve, reject) => {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM habits WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Habit deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getHabits,
  createHabit,
  deleteHabit,
};
