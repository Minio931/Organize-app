const todosService = require("../services/todos.service.js");

const create = async (req, res, next) => {
  try {
    const todo = await todosService.createTodo(req.body);
    console.log(todo, "todo");
    console.log(req.body, "req.body");
    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
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

const getTodo = async (req, res, next) => {
  try {
    const todo = await todosService.getTodoById(req.params.id);
    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

const getToday = async (req, res, next) => {
  try {
    const todos = await todosService.getTodayTodos(req.params.userId);
    console.log(todos, "todos");
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

const edit = async (req, res, next) => {
  try {
    console.log(req.body, "req.body");
    const todo = await todosService.editTodo(req.body);

    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

//delete is not allowed as name :(
const deleteTodo = async (req, res, next) => {
  try {
    console.log(req.params.id, "req.params.id");
    const todo = await todosService.deleteTodo(req.params.id);
    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  create,
  get,
  update,
  getToday,
  getTodo,
  edit,
  deleteTodo,
};
