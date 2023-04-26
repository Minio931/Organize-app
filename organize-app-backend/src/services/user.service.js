const db = require("../config/db.config.js");

const createUser = async (user) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, firstName, lastName } = user;
    db.query(
      "INSERT INTO users (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, password, firstName, lastName],
      (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(`A new user has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const loginUser = async (user) => {
  return new Promise((resolve, reject) => {
    const { login, password } = user;
    db.query(
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

module.exports = {
  createUser,
  loginUser,
};
