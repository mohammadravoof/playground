// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    axios.post('http://localhost:3000/register', { username, password })
      .then(response => setToken(response.data.token))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
