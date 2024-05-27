// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos', { headers: { Authorization: token } })
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, [token]);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { task }, { headers: { Authorization: token } })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <input type="text" value={task} onChange={e => setTask(e.target.value)} />
      <button onClick={addTodo}>Add Task</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => {/* Update or delete functionality */ }}>Complete/Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
