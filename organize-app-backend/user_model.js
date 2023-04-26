const Pool = require("pg").Pool;
const pool = new Pool({
  user: "minio",
  host: "postgresql-minio.alwaysdata.net",
  database: "minio_organize_app",
  password: "adminroot",
  port: 5432,
});

const getUser = (request, response) => {
  const { login, password } = request.body;
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT email, username, password FROM users WHERE (email=$1 OR username=$2) AND password=$3 ",
      [login, login, password],
      (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results.rows);
      }
    );
  });
};

const createUser = (body) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, firstName, lastName } = body;
    pool.query(
      "INSERT INTO users (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, password, firstName, lastName],
      (error, results) => {
        if (error) {
          reject(error);
        }
        console.log("results: ", results);
        console.log("Error: ", error);

        resolve(`A new user has been added added: ${results.rows[0]}`);
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
  getUser,
  createUser,
  deleteUser,
};
