const express = require('express');
require('./db/mongoose'); //connecting to database
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();


app.use(express.json());//automatically parses incoming json into objects
app.use(userRouter);
app.use(taskRouter);

module.exports = app













