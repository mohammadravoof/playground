// backend/models/todo.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Todo = sequelize.define('Todo', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = Todo;
