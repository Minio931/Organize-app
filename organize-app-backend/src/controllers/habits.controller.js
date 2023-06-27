const habitsService = require("../services/habits.service");

const create = async (req, res, next) => {
  try {
    const habit = await habitsService.createHabit(req.body);
    res.status(200).send(habit);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const habits = await habitsService.getHabits(req.params.userId);
    res.status(200).send(habits);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const habit = await habitsService.getHabit(req.params.habitId);
    res.status(200).send(habit);
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const habit = await habitsService.editHabit(req.body);
    res.status(200).send(habit);
  } catch (error) {
    next(error);
  }
};

const deleteHabit = async (req, res, next) => {
  try {
    const habit = await habitsService.deleteHabit(req.params.habitId);
    res.status(200).send(habit);
  } catch (error) {
    next(error);
  }
};

const complete = async (req, res, next) => {
  try {
    const habit = await habitsService.completeHabit(req.body);
    res.status(200).send(habit);
  } catch (error) {
    next(error);
  }
};

const deleteComplete = async (req, res, next) => {
  try {
    const habit = await habitsService.deleteCompletionDate(req.body);
    res.status(200).send(habit);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  complete,
  edit,
  deleteHabit,
  deleteComplete,
  create,
  getOne,
};
