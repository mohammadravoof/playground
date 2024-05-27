// backend/controllers/todoController.js
const Todo = require('../models/todo');

const getTodos = async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.user.userId } });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { task } = req.body;
  const todo = await Todo.create({ userId: req.user.userId, task });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { task, completed } = req.body;
  const todo = await Todo.findByPk(req.params.id);
  if (todo && todo.userId === req.user.userId) {
    todo.task = task;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } else {
    res.sendStatus(403);
  }
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo && todo.userId === req.user.userId) {
    await todo.destroy();
    res.sendStatus(204);
  } else {
    res.sendStatus(403);
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
