// backend/routes/todoRoutes.js
const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/todos', authenticateToken, getTodos);
router.post('/todos', authenticateToken, createTodo);
router.put('/todos/:id', authenticateToken, updateTodo);
router.delete('/todos/:id', authenticateToken, deleteTodo);

module.exports = router;
