const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../../src/models/user")
const Task = require("../../src/models/task")

const userOneId= new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name:"potato",
    email: "potato@potato.com",
    password: "friedpotatoes!",
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.JWT_ENV)
    }]
}
const userTwoId= new mongoose.Types.ObjectId();

const userTwo = {
    _id: userTwoId,
    name:"tomato",
    email: "tomato@tomato.com",
    password: "tomatopaste!",
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_ENV)
    }]
}

const taskOne={
    _id: new mongoose.Types.ObjectId(),
    description: "task one",
    completed: false,
    owner: userOne._id
}
const taskTwo={
    _id: new mongoose.Types.ObjectId(),
    description: "second task",
    completed: true,
    owner: userOne._id
}
const taskThree={
    _id: new mongoose.Types.ObjectId(),
    description: "third task",
    completed: true,
    owner: userTwo._id
}

const setupDB = async()=>{
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await Task.deleteMany()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports ={
    userOne,
    userOneId,
    setupDB,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree
}