const userService = require("../services/user.service");

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.error("Error while creating user", err.message);
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.error("Error while logging user", err.message);
    next(err);
  }
};

module.exports = {
  create,
  get,
};
