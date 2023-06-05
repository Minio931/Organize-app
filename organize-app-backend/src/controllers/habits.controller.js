const habitsService = require("../services/habits.service");

const get = async (req, res, next) => {
  try {
    const habits = await habitsService.getHabits(req.params.userId);
    res.status(200).send(habits);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
};
