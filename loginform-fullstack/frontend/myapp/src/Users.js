import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:3000/users', {
          headers: { Authorization: token }
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Page</h2>
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default Users;
