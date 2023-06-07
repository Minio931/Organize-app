const todosService = require("../services/todos.service.js");

const create = async (req, res, next) => {
  try {
    const todo = await todosService.createTodo(req.body);
    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const todos = await todosService.getTodos(req.params.userId);

    res.status(200).send(todos);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const todo = await todosService.updateTodo(req.body);
    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  get,
  update,
};
