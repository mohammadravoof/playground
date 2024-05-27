// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/index');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(authRoutes);
app.use(todoRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
