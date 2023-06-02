const userService = require("../services/user.service");

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  get,
};
