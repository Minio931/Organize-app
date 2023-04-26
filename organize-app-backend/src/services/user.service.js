const db = require("../config/db.config.js");
const {
  UserExistError,
  UserNotFoundError,
  UsernameAlreadyExistError,
} = require("../utils/errors.utils.js");

const createUser = async (user) => {
  const { username, email, password, firstName, lastName } = user;

  const userNameExist = await db.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );
  if (userNameExist.rows.length > 0) {
    throw new UsernameAlreadyExistError("Username is already taken");
  }
  const userExists = await db.query(
    "SELECT * FROM users WHERE username=$1 OR email=$2",
    [username, email]
  );
  if (userExists.rows.length > 0) {
    throw new UserExistError("User already exists");
  }

  const result = await db.query(
    "INSERT INTO users (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, email, password, firstName, lastName]
  );
  return { message: `A new user has been added: ${result.rows[0]}` };
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
