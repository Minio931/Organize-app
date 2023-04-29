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
  const { login, password } = user;

  const userExists = await db.query(
    "SELECT * FROM users WHERE ((username=$1 OR email=$1) AND password=$2) ",
    [login, password]
  );

  if (userExists.rows.length === 0) {
    throw new UserNotFoundError("User not found");
  }

  return { user: userExists.rows[0] };
};

module.exports = {
  createUser,
  loginUser,
};
