const express = require('express');
require('./db/mongoose'); //connecting to database
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT


app.use(express.json());//automatically parses incoming json into objects
app.use(userRouter);
app.use(taskRouter);


app.listen(port,()=>{
	console.log('Server is up on port ' + port);
})












