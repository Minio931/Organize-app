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

const createUser = (body) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, firstName, lastName } = body;
    pool.query(
      "INSERT INTO users (username, email, password, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, password, firstName, lastName],
      (error, results) => {
        if (error) {
          reject(error);
        }

        if (results.rows && results.rows[0]) {
          resolve(`A new user has been added added: ${results.rows[0]}`);
        } else {
          reject(new Error("No rows returned from database"));
        }
      }
    );
  });
};

const deleteUser = (request, response) => {
  return new Promise((resolve, reject) => {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM habits WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`User deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  createUser,
  deleteUser,
};
