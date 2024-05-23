const express = require('express');

const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middleware/');
const userRouter = require('./routes/user');


// // Now we use Mongo db
// const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));

// Middleware - Plugin
app.use( express.urlencoded({ extended: false}) );
app.use( logReqRes("log.txt") );

// Router
app.use( "/api/users", userRouter );



app.listen( PORT, ()=> console.log(`Server started at PORT: ${PORT}`) );